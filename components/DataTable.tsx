// components/Datable
"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import io from "socket.io-client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Database, Mic, Wifi, WifiOff, Bed, Trash, Edit } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { getCookie } from "@/utils/getCookie"

interface RowData {
  index: number
  audioUrl: string
  column1: string
  column2: string
  column3: string
  column4: string
  id?: string | number
  isNew?: boolean
}

interface DataTableProps {
  selectedRoom?: string | null;
  initialData?: RowData[];
}

export default function DataTable({ selectedRoom, initialData }: DataTableProps) {
  const [data, setData] = useState<RowData[]>([])
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [isReceiving, setIsReceiving] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const tableEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const [staffId, setStaffId] = useState<string>("");
  const cacheRef = useRef<Record<string, RowData[]>>({})
  const fetchControllerRef = useRef<AbortController | null>(null)
  const selectedRoomRef = useRef<string | null | undefined>(selectedRoom)
  const preloadedAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map())
  const preloadedObjectUrlRef = useRef<Map<string, string>>(new Map())
  const prefetchPromisesRef = useRef<Map<string, Promise<void>>>(new Map())
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState<string>("")

  // Initial seed
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const key = selectedRoom ? `room:${selectedRoom}` : 'all'
      const normalized: RowData[] = initialData.map((item, idx) => ({
        ...item,
        index: idx + 1,
        isNew: false,
      }))
      cacheRef.current[key] = normalized
      setData(normalized)
      setLoading(false)
      preloadForDataset(normalized)
    }
  }, [])

  useEffect(() => {
    selectedRoomRef.current = selectedRoom
  }, [selectedRoom])

  // Play/Pause handling
  const handlePlay = useCallback((url: string, index: number) => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause()
        currentAudioRef.current.currentTime = 0
      } catch {}
      if (playingIndex === index) {
        setPlayingIndex(null)
        setAudio(null)
        currentAudioRef.current = null
        return
      }
    }

    setLoadingIndex(index)
    const fullUrl = `http://localhost:5001${url}`
    const objectUrl = preloadedObjectUrlRef.current.get(fullUrl)
    const preferredSrc = objectUrl ?? fullUrl
    const audioEl = preloadedAudioRef.current.get(preferredSrc) ?? new Audio(preferredSrc)

    currentAudioRef.current = audioEl
    audioEl.preload = "auto"

    audioEl.play()
      .then(() => {
        setAudio(audioEl)
        setPlayingIndex(index)
        setLoadingIndex(null)
        if (!preloadedAudioRef.current.has(preferredSrc)) {
          preloadedAudioRef.current.set(preferredSrc, audioEl)
        }
      })
      .catch(err => {
        console.error("Playback error:", err)
        setLoadingIndex(null)
      })

    audioEl.onended = () => {
      setPlayingIndex(null)
      setAudio(null)
      currentAudioRef.current = null
    }
  }, [playingIndex])

  const preloadForDataset = useCallback((rows: RowData[]) => {
    const PREFETCH_COUNT = 3
    const MAX_CACHE = 10
    const map = preloadedAudioRef.current
    const targets = rows.slice(0, PREFETCH_COUNT)
    for (const row of targets) {
      const fullUrl = `http://localhost:5001${row.audioUrl}`
      if (!preloadedObjectUrlRef.current.has(fullUrl)) {
        if (!prefetchPromisesRef.current.has(fullUrl)) {
          const promise = fetch(fullUrl)
            .then(async res => {
              if (!res.ok) throw new Error("prefetch failed")
              const blob = await res.blob()
              const objUrl = URL.createObjectURL(blob)
              preloadedObjectUrlRef.current.set(fullUrl, objUrl)
              if (preloadedObjectUrlRef.current.size > 12) {
                const firstKey = preloadedObjectUrlRef.current.keys().next().value
                const oldUrl = preloadedObjectUrlRef.current.get(firstKey)
                if (oldUrl) URL.revokeObjectURL(oldUrl)
                preloadedObjectUrlRef.current.delete(firstKey)
              }
            })
            .catch(() => {})
            .finally(() => prefetchPromisesRef.current.delete(fullUrl))
          prefetchPromisesRef.current.set(fullUrl, promise)
        }
      }
      if (!map.has(fullUrl)) {
        const el = new Audio(fullUrl)
        el.preload = 'auto'
        map.set(fullUrl, el)
        if (map.size > MAX_CACHE) {
          const firstKey = map.keys().next().value
          const old = map.get(firstKey)
          try { old?.pause() } catch {}
          map.delete(firstKey)
        }
      }
    }
  }, [])

  const handleRowDoubleClick = useCallback((audioUrl: string, index: number) => {
    handlePlay(audioUrl, index)
  }, [handlePlay])

  const loadTranscriptions = async (roomFilter?: string) => {
    try {
      const cacheKey = roomFilter ? `room:${roomFilter}` : 'all'
      const cached = cacheRef.current[cacheKey]
      if (cached && cached.length > 0) {
        setData(cached)
        setLoading(false)
        preloadForDataset(cached)
      } else if (roomFilter && cacheRef.current['all']) {
        const derived = cacheRef.current['all'].filter(r => r.column1?.split(' ')[0] === roomFilter)
        cacheRef.current[cacheKey] = derived
        setData(derived)
        setLoading(false)
        preloadForDataset(derived)
      } else {
        setLoading(true)
      }

      if (fetchControllerRef.current) fetchControllerRef.current.abort()
      const controller = new AbortController()
      fetchControllerRef.current = controller

      const url = roomFilter
        ? `/api/staff/transcriptions-by-room?room=${encodeURIComponent(roomFilter)}`
        : '/api/staff/transcriptions'

      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json = await response.json()

      const existingIds = new Set((cacheRef.current[cacheKey] || []).map(item => String(item.id)))

      const processedData = json
        .filter((item: any) => !existingIds.has(String(item.id || item.audioUrl)))
        .map((item: any, idx: number) => ({
          ...item,
          id: item.id || `transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${idx}`,
          isNew: false,
          index: idx + 1,
        }))

      cacheRef.current[cacheKey] = processedData
      setData(processedData)
      preloadForDataset(processedData)
      setIsConnected(true)
      setLoading(false)
    } catch (err: any) {
      if (err?.name === 'AbortError') return
      console.error('Failed to load data:', err)
      setIsConnected(false)
      setLoading(false)
    }
  }

  // Socket connection
  useEffect(() => {
    const staffIdFromCookie = getCookie("staff_Id") || "";
    setStaffId(staffIdFromCookie);

    const socket = io("http://localhost:5001", { transports: ['polling'], timeout: 60000 })
    socketRef.current = socket

    socket.on("connect", () => {
      setIsConnected(true)
      if (staffIdFromCookie) socket.emit('join_staff_room', { user_id: staffIdFromCookie })
    })
    socket.on("disconnect", () => setIsConnected(false))
    socket.on("connect_error", () => setIsConnected(false))
    socket.on("error", () => setIsConnected(false))
    socket.on("reconnect", () => {
      setIsConnected(true)
      if (staffIdFromCookie) socket.emit('join_staff_room', { user_id: staffIdFromCookie })
    })

    socket.on("new_transcription", (payload: any) => {
      setIsReceiving(true)
      if (!payload || typeof payload !== 'object') { setIsReceiving(false); return }
      const currentSelected = selectedRoomRef.current
      if (currentSelected && payload.column1?.split(' ')[0] !== currentSelected) { setIsReceiving(false); return }

      setTimeout(() => {
        const uniqueId = payload.id || `new_transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const newRow: RowData = {
          index: 0,
          audioUrl: payload.audioUrl || "—",
          column1: payload.column1 || "—",
          column2: payload.column2 || "—",
          column3: payload.column3 || "—",
          column4: payload.column4 || "—",
          id: uniqueId,
          isNew: true,
        }

        setData(prev => {
          if (prev.some(item => item.id === uniqueId || item.audioUrl === newRow.audioUrl)) return prev
          const updated = [...prev, { ...newRow, index: prev.length + 1 }]
          return updated
        })
        setIsReceiving(false)

        setTimeout(() => {
          tableEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)

        setTimeout(() => {
          setData(prev => prev.map(item => item.id === uniqueId ? { ...item, isNew: false } : item))
        }, 3000)
      }, 800)
    })

    return () => {
      socket.disconnect() 
    }
  }, [])

  useEffect(() => {
    loadTranscriptions(selectedRoom || undefined)
    return () => {
      if (fetchControllerRef.current) fetchControllerRef.current.abort()
      preloadedAudioRef.current.forEach(a => { try { a.pause() } catch {} })
      preloadedAudioRef.current.clear()
      preloadedObjectUrlRef.current.forEach(u => { try { URL.revokeObjectURL(u) } catch {} })
      preloadedObjectUrlRef.current.clear()
    }
  }, [selectedRoom])

  const [bedFilter, setBedFilter] = useState<string>('ALL')

  const processedData = useMemo(() => {
    const base = data
    const filtered = selectedRoom && bedFilter !== 'ALL'
      ? base.filter(row => row.column1?.split(' ')[1] === bedFilter)
      : base
    return filtered.map((row, index) => ({ ...row, index: index + 1 }))
  }, [data, bedFilter, selectedRoom])

  // --- Actions handlers ---
  const handleDelete = async (row: RowData) => {
    if (!confirm("Are you sure you want to delete this transcription?")) return
    try {
      if (!row.id?.toString().startsWith("new_transcription")) {
        await fetch(`/api/transcriptions/${row.id}`, { method: "DELETE" })
      }
      setData(prev => prev.filter(r => r.id !== row.id))
    } catch (err) {
      console.error("Failed to delete:", err)
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Transcriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-y-auto max-h-96 border rounded-md">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="bg-gray-50">
                  <TableHead>Index</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Patient Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.map((row, i) => {
                  const isEditing = editingRowId === row.id
  
                  return (
                    <TableRow
                      key={row.id || `fallback_${i}_${row.column2}_${row.column3}`}
                      className={row.isNew ? "bg-emerald-50 border-l-4 border-l-emerald-400" : ""}
                    >
                      <TableCell>{row.index}</TableCell>
                      <TableCell>{row.column2}</TableCell>
                      <TableCell>{row.column3}</TableCell>
                      <TableCell className={row.isNew ? "text-red-500 font-medium" : ""}>
                        {isEditing ? (
                          <textarea
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            className="border rounded p-1 w-full"
                          />
                        ) : (
                          row.column4
                        )}
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        {/* Play button */}
                        <button onClick={() => handleRowDoubleClick(row.audioUrl, i)}
                        title="Play/Pause"
                        >
                          <Play className="w-4 h-4 text-emerald-600" />
                        </button>
  
                        {/* Edit/Save/Cancel buttons */}
                        {isEditing ? (
                          <>
                            <button
                              onClick={async () => {
                                try {
                                  if (!row.id?.toString().startsWith("new_transcription")) {
                                    await fetch(`/api/transcriptions/${row.id}`, {
                                      method: "PATCH",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ column4: editingValue }),
                                    })
                                  }
                                  setData(prev =>
                                    prev.map(r =>
                                      r.id === row.id ? { ...r, column4: editingValue } : r
                                    )
                                  )
                                  setEditingRowId(null)
                                  setEditingValue("")
                                } catch (err) {
                                  console.error("Failed to save:", err)
                                }
                              }}
                            >
                              <Badge variant="default" className="text-xs">Save</Badge>
                            </button>
                            <button
                              onClick={() => { setEditingRowId(null); setEditingValue("") }}
                            >
                              <Badge variant="secondary" className="text-xs">Cancel</Badge>
                            </button>
                          </>
                        ) : (
                          <button
                          onClick={() => { 
                            setEditingRowId(row.id != null ? row.id.toString() : null);
                            setEditingValue(row.column4);
                          }}
                          title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
  
                        {/* Delete button */}
                        <button onClick={() => handleDelete(row)}
                        title="Delete"
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <div ref={tableEndRef} />
        </CardContent>
      </Card>
    </div>
  )
}  
