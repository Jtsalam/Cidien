// components/DataTable.tsx
"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import io from "socket.io-client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Trash, Edit, Wifi, WifiOff, Check, RotateCcw, Mic } from "lucide-react"
import { getCookie } from "@/utils/getCookie"

interface RowData {
  index: number
  audioUrl: string
  column1: string
  column2: string
  column3: string
  column4: string
  id?: string
  isNew?: boolean
  isApproved?: boolean
  patient_id?: number
  session_id?: number
}

interface DataTableProps {
  selectedRoom?: string | null
  initialData?: RowData[]
}

const AudioPlayerButton = ({
  url,
  index,
  playingIndex,
  loadingIndex,
  onClick
}: {
  url: string
  index: number
  playingIndex: number | null
  loadingIndex: number | null
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    aria-label={playingIndex === index ? "Pause audio" : "Play audio"}
    disabled={loadingIndex === index}
    className="p-1 rounded hover:bg-gray-100"
  >
    {loadingIndex === index ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : playingIndex === index ? (
      <Pause className="w-4 h-4 text-emerald-600" />
    ) : (
      <Play className="w-4 h-4 text-emerald-600" />
    )}
  </button>
)

const EditableCell = ({
  value,
  isEditing,
  onChange,
  onSave,
  onCancel
}: {
  value: string
  isEditing: boolean
  onChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
}) => (
  <div className="flex flex-col space-y-2">
    {isEditing ? (
      <>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-1 w-full min-h-[80px]"
          autoFocus
        />
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <div className="whitespace-pre-wrap">{value}</div>
    )}
  </div>
)

const TableStatusBar = ({ loading, error }: { loading: boolean; error: string | null }) => (
  <>
    {loading && (
      <div className="p-2 text-center text-sm text-gray-500 flex items-center justify-center">
        <Loader2 className="animate-spin inline mr-2 h-4 w-4" />
        Loading transcriptions...
      </div>
    )}
    {error && (
      <div className="p-2 text-center text-sm text-red-500 bg-red-50 rounded">
        {error}
      </div>
    )}
  </>
)

export default function DataTable({ selectedRoom, initialData }: DataTableProps) {
  const [data, setData] = useState<RowData[]>([])
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [isReceiving, setIsReceiving] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState<string>("")
  const [bedFilter, setBedFilter] = useState<string>('ALL')

  const tableEndRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<any>(null)
  const staffIdRef = useRef<string>("")
  const cacheRef = useRef<Record<string, RowData[]>>({})
  const fetchControllerRef = useRef<AbortController | null>(null)
  const selectedRoomRef = useRef<string | null | undefined>(selectedRoom)
  const preloadedAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map())
  const preloadedObjectUrlRef = useRef<Map<string, string>>(new Map())
  const prefetchPromisesRef = useRef<Map<string, Promise<void>>>(new Map())
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const staffId = getCookie("staff_Id") || ""
    staffIdRef.current = staffId

    if (initialData && initialData.length > 0) {
      const key = selectedRoom ? `room:${selectedRoom}` : 'all'
      
      // Only get non-approved items for Live Notes
      const live = initialData.filter(item => item.isApproved !== true)
      
      const normalizedLive: RowData[] = live.map((item, idx) => ({
        ...item,
        index: idx + 1,
        id: `${item.patient_id}_${item.session_id}`,
        isNew: false,
      }))
      
      cacheRef.current[key] = normalizedLive
      setData(normalizedLive)
      setLoading(false)
      preloadForDataset(normalizedLive)
    }
  }, [initialData, selectedRoom])

  useEffect(() => {
    selectedRoomRef.current = selectedRoom
    loadTranscriptions(selectedRoom || undefined)
  }, [selectedRoom])

  const handlePlay = useCallback((url: string, index: number) => {
    if (currentAudioRef.current) {
      try { currentAudioRef.current.pause(); currentAudioRef.current.currentTime = 0 } catch {}
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
        setError("Failed to play audio")
        setLoadingIndex(null)
        setTimeout(() => setError(null), 3000)
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

    targets.forEach(row => {
      const fullUrl = `http://localhost:5001${row.audioUrl}`
      if (!preloadedObjectUrlRef.current.has(fullUrl) && !prefetchPromisesRef.current.has(fullUrl)) {
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
    })
  }, [])

  const loadTranscriptions = async (roomFilter?: string) => {
    try {
      const cacheKey = roomFilter ? `room:${roomFilter}` : 'all'
      const cached = cacheRef.current[cacheKey]
      if (cached && cached.length > 0) {
        setData(cached)
        setLoading(false)
        preloadForDataset(cached)
        return
      }

      setLoading(true)
      setError(null)
      if (fetchControllerRef.current) fetchControllerRef.current.abort()
      const controller = new AbortController()
      fetchControllerRef.current = controller

      const url = roomFilter
        ? `/api/staff/transcriptions-by-room?room=${encodeURIComponent(roomFilter)}`
        : '/api/staff/transcriptions'

      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const json = await response.json()
      
      // Only get non-approved items for Live Notes
      const live = json.filter((item: any) => item.is_approved !== true)

      const processedLive = live.map((item: any, idx: number) => ({
        ...item,
        id: `${item.patient_id}_${item.session_id}`,
        isNew: false,
        isApproved: false,
        index: idx + 1,
      }))

      cacheRef.current[cacheKey] = processedLive
      setData(processedLive)
      preloadForDataset(processedLive)
      setIsConnected(true)
      setLoading(false)
    } catch (err: any) {
      if (err?.name === 'AbortError') return
      console.error('Failed to load data:', err)
      setError('Failed to load transcriptions. Please try again.')
      setIsConnected(false)
      setLoading(false)
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const socket = io("http://localhost:5001", { transports: ['polling'], timeout: 60000 })
    socketRef.current = socket

    const handleConnect = () => {
      setIsConnected(true)
      if (staffIdRef.current) socket.emit('join_staff_room', { user_id: staffIdRef.current })
    }

    const handleNewTranscription = (payload: any) => {
      setIsReceiving(true)
      if (!payload || typeof payload !== 'object') {
        setIsReceiving(false)
        return
      }

      const currentSelected = selectedRoomRef.current
      if (currentSelected && payload.column1?.split(' ')[0] !== currentSelected) {
        setIsReceiving(false)
        return
      }

      setTimeout(() => {
        const uniqueId = payload.patient_id && payload.session_id
          ? `${payload.patient_id}_${payload.session_id}`
          : `new_transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        const newRow: RowData = {
          index: 0,
          audioUrl: payload.audioUrl || "—",
          column1: payload.column1 || "—",
          column2: payload.column2 || "—",
          column3: payload.column3 || "—",
          column4: payload.column4 || "—",
          id: uniqueId,
          isNew: true,
          isApproved: false,
        }

        setData(prev => {
          if (prev.some(item => item.id === uniqueId || item.audioUrl === newRow.audioUrl)) return prev
          return [...prev, { ...newRow, index: prev.length + 1 }]
        })

        setIsReceiving(false)
        setTimeout(() => tableEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
        setTimeout(() => {
          setData(prev => prev.map(item => item.id === uniqueId ? { ...item, isNew: false } : item))
        }, 3000)
      }, 800)
    }

    socket.on("connect", handleConnect)
    socket.on("disconnect", () => setIsConnected(false))
    socket.on("connect_error", () => setIsConnected(false))
    socket.on("error", () => setIsConnected(false))
    socket.on("reconnect", handleConnect)
    socket.on("new_transcription", handleNewTranscription)

    return () => {
      socket.disconnect()
      socket.off("connect", handleConnect)
      socket.off("new_transcription", handleNewTranscription)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (fetchControllerRef.current) fetchControllerRef.current.abort()
      preloadedAudioRef.current.forEach(audio => { try { audio.pause(); audio.src='' } catch{} })
      preloadedAudioRef.current.clear()
      preloadedObjectUrlRef.current.forEach(url => { try { URL.revokeObjectURL(url) } catch{} })
      preloadedObjectUrlRef.current.clear()
    }
  }, [])

  const processedData = useMemo(() => {
    const filtered = selectedRoom && bedFilter !== 'ALL'
      ? data.filter(row => row.column1?.split(' ')[1] === bedFilter)
      : data
    return filtered.map((row, index) => ({ ...row, index: index + 1 }))
  }, [data, bedFilter, selectedRoom])

  const handleDelete = async (row: RowData) => {
    if (!confirm("Are you sure you want to delete this transcription?")) return
    if (!row.id) return // Guard against undefined id
    
    try {
      if (!row.id.toString().startsWith("new_transcription")) {
        const [patientId, sessionId] = row.id.split('_')
        await fetch(`/api/staff/transcriptions/${patientId}/${sessionId}`, { method: "DELETE" })
      }
      setData(prev => prev.filter(r => r.id !== row.id))
    } catch (err) {
      console.error("Failed to delete:", err)
      setError("Failed to delete transcription")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleSaveEdit = async (rowId: string) => {
    try {
      const [patientId, sessionId] = rowId.split('_')
      await fetch(`/api/staff/transcriptions/${patientId}/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ column4: editingValue }),
      })
      setData(prev => prev.map(r => r.id === rowId ? { ...r, column4: editingValue } : r))
      setEditingRowId(null)
      setEditingValue("")
    } catch (err) {
      console.error("Failed to save:", err)
      setError("Failed to save changes")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleApprove = async (rowId: string) => {
    const row = data.find(r => r.id === rowId)
    if (!row) return
    try {
      let apiUrl: string
      let requestBody: any = { is_approved: true }

      if (rowId.startsWith('new_transcription')) {
        // For new transcriptions, we need to create the database record
        const session_id = Math.floor(Math.random() * 2000000000) // Random 32-bit safe integer
        
        apiUrl = `/api/staff/transcriptions/${rowId}/approve`
        requestBody = {
          patient_id: 1, // API will find a valid patient, this is just to satisfy the check
          session_id, 
          upload_path: row.audioUrl,
          patient_notes: row.column4,
          upload_time: new Date().toISOString()
        }
      } else {
        // For existing transcriptions
        const [patientId, sessionId] = rowId.split('_')
        apiUrl = `/api/staff/transcriptions/${patientId}/${sessionId}/approve`
      }

      await fetch(apiUrl, { 
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      })
      
      // Remove from live data - it will now appear in the top-level Archived Notes tab
      setData(prev => prev.filter(r => r.id !== rowId))
    } catch (err) {
      console.error(err)
      setError("Failed to approve")
      setTimeout(() => setError(null), 3000)
    }
  }


  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Live Notes {data.length > 0 && `(${data.length})`}</span>
            <div className="flex items-center space-x-2">
              {isReceiving && (
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  <Mic className="mr-1 h-4 w-4 animate-pulse" /> Receiving
                </Badge>
              )}
              {isConnected ? (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Wifi className="mr-1 h-4 w-4" /> Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-300">
                  <WifiOff className="mr-1 h-4 w-4" /> Offline
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead className="w-[80px]">Audio</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Patient Note</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                        No live transcriptions available
                      </TableCell>
                    </TableRow>
                  ) : (
                    processedData.map((row, idx) => (
                      <TableRow key={row.id} className={!row.isApproved ? "text-red-600" : ""}>
                        <TableCell>{row.index}</TableCell>
                        <TableCell>
                          <AudioPlayerButton
                            url={row.audioUrl}
                            index={idx}
                            playingIndex={playingIndex}
                            loadingIndex={loadingIndex}
                            onClick={() => handlePlay(row.audioUrl, idx)}
                          />
                        </TableCell>
                        <TableCell>{row.column1}</TableCell>
                        <TableCell>{row.column2}</TableCell>
                        <TableCell>{row.column3}</TableCell>
                        <TableCell>
                          <EditableCell
                            value={editingRowId === row.id ? editingValue : row.column4}
                            isEditing={editingRowId === row.id}
                            onChange={setEditingValue}
                            onSave={() => handleSaveEdit(row.id!)}
                            onCancel={() => { setEditingRowId(null); setEditingValue('') }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingRowId !== row.id && (
                              <button 
                                onClick={() => {
                                  setEditingRowId(row.id!)
                                  setEditingValue(row.column4)
                                }} 
                                title="Edit"
                                className="p-1 rounded hover:bg-gray-100"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleApprove(row.id!)} 
                              title="Approve"
                              className="p-1 rounded hover:bg-gray-100"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </button>
                            <button 
                              onClick={() => handleDelete(row)} 
                              title="Delete"
                              className="p-1 rounded hover:bg-gray-100"
                            >
                              <Trash className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
          
          <TableStatusBar loading={loading} error={error} />
          <div ref={tableEndRef} />
        </CardContent>
      </Card>
    </div>
  )
}