"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import io from "socket.io-client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Database, Mic, Wifi, WifiOff } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { getCookie } from "@/utils/getCookie"

// Socket will be initialized inside the component

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

  // Seed initial cache for instant first render if provided
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const key = selectedRoom ? `room:${selectedRoom}` : 'all'
      // Normalize indices and flags
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    selectedRoomRef.current = selectedRoom
  }, [selectedRoom])

  const handlePlay = useCallback((url: string, index: number) => {
    // Stop any in-flight or playing audio immediately
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause()
        currentAudioRef.current.currentTime = 0
        currentAudioRef.current.src = ''
        currentAudioRef.current.load()
      } catch {}
      currentAudioRef.current = null
    }
    if (audio) {
      try {
        audio.pause()
        audio.currentTime = 0
      } catch {}
      if (playingIndex === index) {
        setPlayingIndex(null)
        setAudio(null)
        return
      }
    }

    setLoadingIndex(index)
    const fullUrl = `http://localhost:5000${url}`

    // Prefer blob URL if preloaded for instant start
    const objectUrl = preloadedObjectUrlRef.current.get(fullUrl)
    const preferredSrc = objectUrl ?? fullUrl

    const audioEl = preloadedAudioRef.current.get(preferredSrc) ?? new Audio(preferredSrc)
    currentAudioRef.current = audioEl

    audioEl
      .play()
      .then(() => {
        setAudio(audioEl)
        setPlayingIndex(index)
        setLoadingIndex(null)
        // Cache this audio element for faster subsequent plays
        if (!preloadedAudioRef.current.has(preferredSrc)) {
          preloadedAudioRef.current.set(preferredSrc, audioEl)
        }
      })
      .catch((err) => {
        console.error('Playback error:', err)
        setLoadingIndex(null)
      })

    audioEl.onended = () => {
      setPlayingIndex(null)
      setAudio(null)
      currentAudioRef.current = null
    }
  }, [audio, playingIndex])

  const preloadForDataset = useCallback((rows: RowData[]) => {
    const PREFETCH_COUNT = 3
    const MAX_CACHE = 10
    const map = preloadedAudioRef.current
    const targets = rows.slice(0, PREFETCH_COUNT)
    for (const row of targets) {
      const fullUrl = `http://localhost:5000${row.audioUrl}`
      // Start a high-priority fetch to blob for instant play when clicked
      const existingUrl = preloadedObjectUrlRef.current.get(fullUrl)
      if (!existingUrl) {
        const existingPromise = prefetchPromisesRef.current.get(fullUrl)
        if (!existingPromise) {
          const promise = fetch(fullUrl)
            .then(async (res) => {
              if (!res.ok) throw new Error('prefetch failed')
              const blob = await res.blob()
              const objUrl = URL.createObjectURL(blob)
              preloadedObjectUrlRef.current.set(fullUrl, objUrl)
              // Maintain small cache
              const MAX_URLS = 12
              if (preloadedObjectUrlRef.current.size > MAX_URLS) {
                const iterator = preloadedObjectUrlRef.current.keys()
                const first = iterator.next()
                if (!first.done) {
                  const key = first.value as string
                  const oldUrl = preloadedObjectUrlRef.current.get(key)
                  if (oldUrl) URL.revokeObjectURL(oldUrl)
                  preloadedObjectUrlRef.current.delete(key)
                }
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
          const iterator = map.keys()
          const first = iterator.next()
          if (!first.done) {
            const firstKey = first.value as string
            const old = map.get(firstKey)
            try { old?.pause() } catch {}
            map.delete(firstKey)
          }
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

      // Show cached data immediately if available
      const cached = cacheRef.current[cacheKey]
      if (cached && cached.length > 0) {
        setData(cached)
        setLoading(false)
        preloadForDataset(cached)
      } else {
        // If filtering to a room and we already have 'all' cached, derive immediately
        if (roomFilter && cacheRef.current['all'] && cacheRef.current['all'].length > 0) {
          const derived = cacheRef.current['all'].filter((row) => row.column1?.split(' ')[0] === roomFilter)
          cacheRef.current[cacheKey] = derived
          setData(derived)
          setLoading(false)
          preloadForDataset(derived)
        } else {
          setLoading(true)
        }
      }

      // Abort any in-flight request
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort()
      }
      const controller = new AbortController()
      fetchControllerRef.current = controller

      let transcriptionsUrl: string
      if (roomFilter) {
        transcriptionsUrl = `/api/staff/transcriptions-by-room?room=${encodeURIComponent(roomFilter)}`
        console.log(`Loading transcriptions for room: ${roomFilter}`)
      } else {
        // Use Next API which reads cookie server-side
        transcriptionsUrl = '/api/staff/transcriptions'
        console.log('Loading all transcriptions via Next API')
      }

      console.log(`Fetching from: ${transcriptionsUrl}`)
      const response = await fetch(transcriptionsUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const json = await response.json()
      console.log(`Loaded ${json.length} transcriptions`)

      // Create a Set to track unique IDs and prevent duplicates
      const existingIds = new Set((cacheRef.current[cacheKey] || []).map(item => String(item.id)))

      const processedData = json
        .filter((item: any) => !existingIds.has(String(item.id || item.audioUrl)))
        .map((item: any, index: number) => ({
          ...item,
          id: item.id || `transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${index}`,
          isNew: false,
          index: index + 1,
        }))

      cacheRef.current[cacheKey] = processedData
      setData(processedData)
      preloadForDataset(processedData)
      setIsConnected(true)
      setLoading(false)
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return
      }
      console.error('Failed to load data:', err)
      setIsConnected(false)
      setLoading(false)
    }
  }

  // Initialize socket once
  useEffect(() => {
    const staffIdFromCookie = getCookie("staff_Id") || "";
    setStaffId(staffIdFromCookie);

    socketRef.current = io("http://localhost:5000", {
      transports: ['polling'],
      timeout: 60000,
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to Flask WebSocket")
      console.log("Socket ID:", socket.id)
      setIsConnected(true)
      
      // Join staff-specific room if staff ID is available
      if (staffId) {
        socket.emit('join_staff_room', { user_id: staffId });
      }
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from Flask WebSocket")
      setIsConnected(false)
    })

    socket.on("connect_error", (error: any) => {
      console.error("WebSocket connection error:", error)
      setIsConnected(false)
      // Attempt to reconnect after a delay
      setTimeout(() => {
        if (socketRef.current && !socketRef.current.connected) {
          console.log('Attempting to reconnect...');
          socketRef.current.connect();
        }
      }, 5000);
    })

    socket.on("error", (error: any) => {
      console.error("WebSocket error:", error)
      setIsConnected(false)
    })

    socket.on("reconnect", (attemptNumber: number) => {
      console.log(`Reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
      if (staffIdFromCookie) {
        socket.emit('join_staff_room', { user_id: staffIdFromCookie });
      }
    })

    socket.on("new_transcription", (payload: any) => {
      console.log('Received new transcription:', payload);
      setIsReceiving(true)

      // Validate payload
      if (!payload || typeof payload !== 'object') {
        console.warn('Invalid transcription payload received:', payload);
        setIsReceiving(false);
        return;
      }

      // Check if the new transcription belongs to the currently selected room
      const currentSelected = selectedRoomRef.current
      if (currentSelected) {
        // Extract room number from column1 (format: "room_number bed_letter")
        const roomFromTranscription = payload.column1?.split(' ')[0];
        if (roomFromTranscription !== currentSelected) {
          console.log(`Ignoring transcription for room ${roomFromTranscription}, current filter: ${currentSelected}`);
          setIsReceiving(false);
          return;
        }
      }

      // Simulate processing delay for better UX
      setTimeout(() => {
        const uniqueId = `new_transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newRow: RowData = {
          index: 0, // Will be calculated in setData
          audioUrl: payload.audioUrl || "—",
          column1: payload.column1 || "—",
          column2: payload.column2 || "—",
          column3: payload.column3 || "—",
          column4: payload.column4 || "—",
          id: uniqueId,
          isNew: true,
        }

        setData((prevData) => {
          // Check for duplicates before adding
          const isDuplicate = prevData.some(item => 
            item.audioUrl === newRow.audioUrl && 
            item.column1 === newRow.column1 && 
            item.column2 === newRow.column2 && 
            item.column3 === newRow.column3
          );
          
          if (isDuplicate) {
            console.log('Duplicate transcription detected, skipping');
            return prevData;
          }
          
          const updatedData = [...prevData, { ...newRow, index: prevData.length + 1 }]
          return updatedData
        })
        setIsReceiving(false)

        // Auto-scroll to new entry
        setTimeout(() => {
          tableEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)

        // Remove "new" status after 3 seconds
        setTimeout(() => {
          setData((prevData) => prevData.map((item) => (String(item.id) === String(uniqueId) ? { ...item, isNew: false } : item)))
        }, 3000)
      }, 800)
    })

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  // Load data on mount and whenever room filter changes
  useEffect(() => {
    loadTranscriptions(selectedRoom || undefined)
    return () => {
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort()
      }
      preloadedAudioRef.current.forEach((a) => { try { a.pause() } catch {} })
      preloadedAudioRef.current.clear()
      // Revoke blob URLs
      preloadedObjectUrlRef.current.forEach((u) => { try { URL.revokeObjectURL(u) } catch {} })
      preloadedObjectUrlRef.current.clear()
    }
  }, [selectedRoom])

  

  // Memoize filtered and processed data
  const processedData = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index: index + 1
    }));
  }, [data]);

  return (
    <Tooltip.Provider>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <span>
                  {selectedRoom ? `Room ${selectedRoom} Transcriptions` : "All Rooms Transcriptions"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {isReceiving && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Mic className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-medium">Processing...</span>
                  </div>
                )}

                <Badge
                  variant={isConnected ? "default" : "destructive"}
                  className={`flex items-center space-x-1 ${isConnected ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : ""}`}
                >
                  {isConnected ? (
                    <>
                      <Wifi className="w-3 h-3" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3" />
                      <span>Reconnecting...</span>
                    </>
                  )}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Index</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Timestamp</TableHead>
                    <TableHead className="font-semibold text-gray-700">Patient Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        <div className="flex flex-col items-center space-y-3 py-8">
                          <div className="relative">
                            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                            <div className="absolute inset-0 w-8 h-8 border-2 border-emerald-200 rounded-full animate-pulse"></div>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-700">
                              {selectedRoom 
                                ? `Loading Room ${selectedRoom} Data` 
                                : "Loading Transcription Data"
                              }
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Please wait while we fetch the latest information...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : processedData.length > 0 ? (
                    processedData.map((row, i) => (
                      <TableRow
                        key={row.id || `fallback_${i}_${row.column2}_${row.column3}_${Date.now()}`}
                        className={`
                          hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer relative
                          ${row.isNew ? "animate-in slide-in-from-bottom-2 duration-500 bg-emerald-50 border-l-4 border-l-emerald-400" : ""}
                        `}
                        onDoubleClick={() => handleRowDoubleClick(row.audioUrl, i)}
                        title="Double-click to play audio"
                      >
                        <TableCell className="relative font-medium w-16 text-center group">
                          <span
                            className={`transition-opacity ${playingIndex === i ? "opacity-0" : "group-hover:opacity-0"}`}
                          >
                            {row.index}
                          </span>
                          {row.isNew && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          )}
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlay(row.audioUrl, i)
                                }}
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 hover:text-emerald-800"
                              >
                                {loadingIndex === i ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : playingIndex === i ? (
                                  <Pause className="w-5 h-5" />
                                ) : (
                                  <Play className="w-5 h-5" />
                                )}
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className="bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-md z-50"
                              side="top"
                            >
                              {playingIndex === i ? "Click to pause" : "Click to play"}
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </TableCell>
                        <TableCell className={row.isNew ? "font-medium" : ""}>{row.column2}</TableCell>
                        <TableCell className={row.isNew ? "font-medium" : ""}>{row.column3}</TableCell>
                        <TableCell className={row.isNew ? "font-medium" : ""}>
                          {row.column4}
                          {row.isNew && (
                            <Badge variant="secondary" className="ml-2 text-xs bg-emerald-100 text-emerald-800">
                              New
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        <div className="flex flex-col items-center space-y-3 py-12">
                          <div className="flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full">
                            <Database className="w-8 h-8 text-emerald-600" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-700">
                              {selectedRoom 
                                ? `Monitoring Room ${selectedRoom}` 
                                : "Monitoring All Rooms"
                              }
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Listening for new transcriptions...
                            </p>
                            <div className="flex justify-center mt-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div ref={tableEndRef} />
            {isReceiving && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600 bg-blue-50 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">Processing new transcription...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Tooltip.Provider>
  )
}