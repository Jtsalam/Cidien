// components/Datable.tsx
"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import io from "socket.io-client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Trash, Edit, Wifi, WifiOff, Mic, Check } from "lucide-react"
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
  isApproved?: boolean

}

interface DataTableProps {
  selectedRoom?: string | null;
  initialData?: RowData[];
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
  // State management
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
  const [archivedData, setArchivedData] = useState<RowData[]>([])


  // Refs
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

  // Initial data setup
  useEffect(() => {
    const staffId = getCookie("staff_Id") || ""
    staffIdRef.current = staffId

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
  }, [initialData, selectedRoom])


  // Room change effect
  useEffect(() => {
    selectedRoomRef.current = selectedRoom
    loadTranscriptions(selectedRoom || undefined)
  }, [selectedRoom])

  // Audio playback handler
  const handlePlay = useCallback((url: string, index: number) => {
    // Clean up previous audio
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause()
        currentAudioRef.current.currentTime = 0
      } catch {}
      
      // Toggle off if clicking same row
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

  // Data preloading
  const preloadForDataset = useCallback((rows: RowData[]) => {
    const PREFETCH_COUNT = 3
    const MAX_CACHE = 10
    const map = preloadedAudioRef.current
    const targets = rows.slice(0, PREFETCH_COUNT)

    targets.forEach(row => {
      const fullUrl = `http://localhost:5001${row.audioUrl}`
      
      // Prefetch audio blob if not already cached
      if (!preloadedObjectUrlRef.current.has(fullUrl) && !prefetchPromisesRef.current.has(fullUrl)) {
        const promise = fetch(fullUrl)
          .then(async res => {
            if (!res.ok) throw new Error("prefetch failed")
            const blob = await res.blob()
            const objUrl = URL.createObjectURL(blob)
            preloadedObjectUrlRef.current.set(fullUrl, objUrl)
            
            // Clean up oldest if cache is full
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

      // Preload audio element if not already cached
      if (!map.has(fullUrl)) {
        const el = new Audio(fullUrl)
        el.preload = 'auto'
        map.set(fullUrl, el)
        
        // Clean up oldest if cache is full
        if (map.size > MAX_CACHE) {
          const firstKey = map.keys().next().value
          const old = map.get(firstKey)
          try { old?.pause() } catch {}
          map.delete(firstKey)
        }
      }
    })
  }, [])

  // Data loading function
  const loadTranscriptions = async (roomFilter?: string) => {
    try {
      const cacheKey = roomFilter ? `room:${roomFilter}` : 'all'
      const cached = cacheRef.current[cacheKey]
      
      // Use cached data if available
      if (cached && cached.length > 0) {
        setData(cached)
        setLoading(false)
        preloadForDataset(cached)
        return
      }

      setLoading(true)
      setError(null)

      // Abort previous request if exists
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort()
      }

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
      setError('Failed to load transcriptions. Please try again.')
      setIsConnected(false)
      setLoading(false)
      setTimeout(() => setError(null), 5000)
    }
  }

  // Socket connection management
  useEffect(() => {
    const socket = io("http://localhost:5001", { 
      transports: ['polling'], 
      timeout: 60000 
    })
    socketRef.current = socket

    const handleConnect = () => {
      setIsConnected(true)
      if (staffIdRef.current) {
        socket.emit('join_staff_room', { user_id: staffIdRef.current })
      }
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
          if (prev.some(item => item.id === uniqueId || item.audioUrl === newRow.audioUrl)) {
            return prev
          }
          return [...prev, { ...newRow, index: prev.length + 1 }]
        })

        setIsReceiving(false)

        setTimeout(() => {
          tableEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)

        setTimeout(() => {
          setData(prev => prev.map(item => 
            item.id === uniqueId ? { ...item, isNew: false } : item
          ))
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

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Clean up fetch requests
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort()
      }

      // Clean up audio objects
      preloadedAudioRef.current.forEach(audio => {
        try {
          audio.pause()
          audio.src = ''
        } catch {}
      })
      preloadedAudioRef.current.clear()

      // Clean up object URLs
      preloadedObjectUrlRef.current.forEach(url => {
        try {
          URL.revokeObjectURL(url)
        } catch {}
      })
      preloadedObjectUrlRef.current.clear()
    }
  }, [])

  // Processed data with filtering
  const processedData = useMemo(() => {
    const base = data
    const filtered = selectedRoom && bedFilter !== 'ALL'
      ? base.filter(row => row.column1?.split(' ')[1] === bedFilter)
      : base
    return filtered.map((row, index) => ({ ...row, index: index + 1 }))
  }, [data, bedFilter, selectedRoom])

  // Action handlers
  const handleDelete = async (row: RowData) => {
    if (!confirm("Are you sure you want to delete this transcription?")) return
    
    try {
      if (!row.id?.toString().startsWith("new_transcription")) {
        await fetch(`/api/transcriptions/${row.id}`, { 
          method: "DELETE" 
        })
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
      if (!rowId.toString().startsWith("new_transcription")) {
        await fetch(`/api/transcriptions/${rowId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ column4: editingValue }),
        })
      }
      
      setData(prev =>
        prev.map(r =>
          r.id === rowId ? { ...r, column4: editingValue } : r
        )
      )
      setEditingRowId(null)
      setEditingValue("")
    } catch (err) {
      console.error("Failed to save:", err)
      setError("Failed to save changes")
      setTimeout(() => setError(null), 3000)
    }
  }
  const handleApprove = async (rowId: string) => {
    const row = data.find(r => r.id === rowId);
    if (!row) return;
  
    try {
      await fetch(`/api/transcriptions/${rowId}/approve`, { method: 'PATCH' });
      
      // Move to archive
      setData(prev => prev.filter(r => r.id !== rowId));
      setArchivedData(prev => [...prev, { ...row, isApproved: true }]);
    } catch (err) {
      console.error(err);
      setError("Failed to approve");
      setTimeout(() => setError(null), 3000);
    }
  };
  

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Transcriptions</span>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Wifi className="w-4 h-4 mr-1" /> Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-300">
                  <WifiOff className="w-4 h-4 mr-1" /> Disconnected
                </Badge>
              )}
              {isReceiving && (
                <Badge variant="outline" className="animate-pulse">
                  <Mic className="w-4 h-4 mr-1" /> Receiving
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableStatusBar loading={loading} error={error} />

          <div className="overflow-y-auto max-h-[calc(100vh-200px)] border rounded-md">
            <Table>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '55%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="bg-gray-50">
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      No transcriptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  processedData.map((row, i) => {
                    const rowKey = row.id || `row_${i}_${row.column2}_${row.column3}`
                    const isEditing = editingRowId === row.id?.toString()

                    return (
                      <TableRow
                        key={rowKey}
                        className={row.isNew ? "bg-emerald-50 border-l-4 border-l-emerald-400" : ""}
                      >
                        <TableCell>{row.index}</TableCell>
                        <TableCell>{row.column2}</TableCell>
                        <TableCell>{row.column3}</TableCell>
                        <TableCell className={!row.isApproved ? "text-red-500 font-medium" : ""}>
                          <EditableCell
                            value={isEditing ? editingValue : row.column4}
                            isEditing={isEditing}
                            onChange={setEditingValue}
                            onSave={() => handleSaveEdit(row.id!.toString())}
                            onCancel={() => {
                              setEditingRowId(null)
                              setEditingValue("")
                            }}
                          />
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <AudioPlayerButton
                            url={row.audioUrl}
                            index={i}
                            playingIndex={playingIndex}
                            loadingIndex={loadingIndex}
                            onClick={() => handlePlay(row.audioUrl, i)}
                          />

                          {!isEditing && (
                            <button
                              onClick={() => {
                                setEditingRowId(row.id?.toString() || null)
                                setEditingValue(row.column4)
                              }}
                              className="p-1 rounded hover:bg-gray-100"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                          )}

                          {!row.isApproved && (
                            <button
                              onClick={() => handleApprove(row.id?.toString() || '')}
                              className="p-1 rounded hover:bg-gray-100"
                              title="Approve"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(row)}
                            className="p-1 rounded hover:bg-gray-100"
                            title="Delete"
                          >
                            <Trash className="w-4 h-4 text-red-600" />
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <div ref={tableEndRef} />
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Archived Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] border rounded-md">
            <Table>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '55%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="bg-gray-50">
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archivedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      No archived notes
                    </TableCell>
                  </TableRow>
                ) : (
                  archivedData.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.column2}</TableCell>
                      <TableCell>{row.column3}</TableCell>
                      <TableCell>{row.column4}</TableCell>
                      <TableCell className="flex space-x-2">
                        <AudioPlayerButton
                          url={row.audioUrl}
                          index={i}
                          playingIndex={playingIndex}
                          loadingIndex={loadingIndex}
                          onClick={() => handlePlay(row.audioUrl, i)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}