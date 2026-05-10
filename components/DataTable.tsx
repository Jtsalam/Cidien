"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Database, Mic, Wifi, WifiOff, Bed, Edit, Trash2, Save, XCircle, MoreVertical } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { RealtimeChannel } from "@supabase/supabase-js"
import { supabaseClient } from "@/lib/supabaseClient"

// Socket will be initialized inside the component

interface RowData {
  index: number
  audioUrl: string | null
  column1: string
  column2: string
  column3: string
  column4: string
  /** Stable bed identifier for filtering; column1 may be room transcript text. */
  bedLetter?: string | null
  noteRecordingId?: string | null
  roomRecordingId?: string | null
  id?: string | number
  isNew?: boolean
}

interface CachedData extends Array<RowData> {
  lastUpdated?: number
}

interface DataTableProps {
  selectedRoom?: string | null
  initialData?: RowData[]
  onBedChange?: (bed: string) => void   // new
}


export default function DataTable({ selectedRoom, initialData, onBedChange, }: DataTableProps) {
  const [data, setData] = useState<RowData[]>([])
  // Role: Mirror of data state in a ref so loadTranscriptions can read current rows
  // without needing data in its useCallback deps (which would cause a fetch loop).
  const dataRef = useRef<RowData[]>([])
  const [realtimeSessionId, setRealtimeSessionId] = useState<string | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [isReceiving, setIsReceiving] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingRowId, setEditingRowId] = useState<string | number | null>(null);
  const [editedNote, setEditedNote] = useState<string>('');
  const tableEndRef = useRef<HTMLDivElement>(null);
  const realtimeChannelsRef = useRef<RealtimeChannel[]>([]);
  const cacheRef = useRef<Record<string, CachedData>>({})
  const fetchControllerRef = useRef<AbortController | null>(null)
  const selectedRoomRef = useRef<string | null | undefined>(selectedRoom)
  const preloadedAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map())
  const preloadedObjectUrlRef = useRef<Map<string, string>>(new Map())
  const prefetchPromisesRef = useRef<Map<string, Promise<void>>>(new Map())
  // Tracks row IDs already shown so subsequent loads can mark genuinely new rows.
  const knownIdsRef = useRef<Set<string | number>>(new Set())
  const newRowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // True only while we are waiting for a brand-new room_data INSERT to get its
  // transcript.  Prevents intermediate reloads (room_data UPDATE, stale callbacks,
  // etc.) from prematurely hiding the "Processing new transcription..." banner.
  const pendingTranscriptionRef = useRef(false)
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      const dataWithTimestamp = normalized as CachedData
      dataWithTimestamp.lastUpdated = Date.now()
      cacheRef.current[key] = dataWithTimestamp
      setData(normalized)
      setLoading(false)
      preloadForDataset(normalized)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    selectedRoomRef.current = selectedRoom
  }, [selectedRoom])

  useEffect(() => {
    dataRef.current = data
  }, [data])

  // Role: Resolve demo session id for Supabase Realtime filters (same logic as room_data creation).
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/staff/session-id")
        const body = (await res.json()) as { sessionId?: string | null }
        if (!cancelled) setRealtimeSessionId(body.sessionId ?? null)
      } catch {
        if (!cancelled) setRealtimeSessionId(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handlePlay = useCallback((url: string, index: number) => {
    const fullUrl = url;

    // Case 1: Interacting with the currently active audio track
    if (activeUrl === fullUrl && audio) {
      if (audio.paused) {
        // If it's paused, the user wants to play from the beginning.
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Playback error:", e));
        setPlayingIndex(index);
      } else {
        // If it's playing, the user wants to pause/stop it.
        audio.pause();
        setPlayingIndex(null);
      }
      return;
    }

    // Case 2: A different audio is already playing or we are playing a new one.
    // Stop and clean up any existing audio element.
    if (audio) {
      audio.pause();
    }

    // Play a new audio file
    setLoadingIndex(index);
    setActiveUrl(fullUrl); // Set the new active URL

    const objectUrl = preloadedObjectUrlRef.current.get(fullUrl);
    const preferredSrc = objectUrl ?? fullUrl;
    
    const newAudioEl = new Audio(preferredSrc);
    
    newAudioEl.play()
      .then(() => {
        setAudio(newAudioEl);
        setPlayingIndex(index);
        setLoadingIndex(null);
      })
      .catch((err) => {
        console.error('Playback error:', err);
        setLoadingIndex(null);
        setPlayingIndex(null);
        setActiveUrl(null); // Reset on error
      });

    newAudioEl.onended = () => {
      setPlayingIndex(null);
      setActiveUrl(null); // Reset so it can be played again from the start
    };
    
    // Store the new audio element in state.
    setAudio(newAudioEl);

  }, [audio, activeUrl]);

  const preloadForDataset = useCallback((rows: RowData[]) => {
    const PREFETCH_COUNT = 3
    const MAX_CACHE = 10
    const map = preloadedAudioRef.current
    const targets = rows.slice(0, PREFETCH_COUNT)
    for (const row of targets) {
      if (!row.audioUrl) continue
      const fullUrl = row.audioUrl
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

  const handleSaveEdit = async (rowId: string | number) => {
    try {
      const response = await fetch(`/api/staff/transcriptions/${rowId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_note: editedNote }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes.');
      }

      // Update local state with the saved note (functional update avoids stale closure)
      setData((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, column4: editedNote } : row)),
      );
    } catch (error) {
      console.error("Error saving edit:", error);
      // Optionally, show an error message to the user
    } finally {
      setEditingRowId(null);
    }
  };

  const handleDeleteRow = async (rowId: string | number) => {
    // Optional: Add a confirmation dialog here
    if (!confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/staff/transcriptions/${rowId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the entry.');
      }

      // Update local state by removing the row and re-indexing
      setData(prevData => 
        prevData
          .filter(row => row.id !== rowId)
          .map((row, index) => ({ ...row, index: index + 1 }))
      );
    } catch (error) {
      console.error("Error deleting row:", error);
      // Optionally, show an error message to the user
    }
  };

  const loadTranscriptions = useCallback(async (roomFilter?: string) => {
    try {
      const cacheKey = roomFilter ? `room:${roomFilter}` : 'all'
      const currentData = dataRef.current
      const previousCacheKey = currentData.length > 0 ? (selectedRoomRef.current ? `room:${selectedRoomRef.current}` : 'all') : null

      // Only clear data if switching between different rooms/views to prevent flickering
      if (previousCacheKey && previousCacheKey !== cacheKey) {
        setData([])
      }
      setLoading(true)

      // Check for fresh cached data (within last 30 seconds for better UX)
      const cached = cacheRef.current[cacheKey]
      const now = Date.now()
      const cacheAge = cached?.lastUpdated ? now - cached.lastUpdated : Infinity

      // Skip cache if live state has more rows than the cache
      const liveDataLength = currentData.length
      const cacheIsAheadOfLive = cached ? liveDataLength <= cached.length : false
      
      if (cached && cached.length > 0 && cacheAge < 30000 && cacheIsAheadOfLive) {
        setData(cached)
        setLoading(false)
        preloadForDataset(cached)
        return // Use cache and skip API call
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
        console.error(`API Error - ${response.status}: ${errorText}`)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const json = await response.json()
      console.log(`Successfully loaded ${json.length} transcriptions for ${roomFilter ? `room ${roomFilter}` : 'all rooms'}`)

      // Treat the API response as the source of truth — no deduplication.
      // Deduplication was filtering out updated rows and blocking realtime refreshes.
      const isInitialLoad = knownIdsRef.current.size === 0
      const processedData = json.map((item: RowData, index: number) => {
        const id = item.id || `transcription_${Date.now()}_${Math.random().toString(36).slice(2)}_${index}`
        const isNew = !isInitialLoad && !knownIdsRef.current.has(id)
        return { ...item, id, isNew, index: index + 1 }
      })

      // Register all IDs as known so the next reload doesn't re-flag them.
      processedData.forEach((row: RowData) => { if (row.id != null) knownIdsRef.current.add(row.id) })

      // Clear the NEW badge after 4 seconds so it doesn't linger.
      const hasNew = processedData.some((r: RowData) => r.isNew)
      if (hasNew) {
        if (newRowTimeoutRef.current) clearTimeout(newRowTimeoutRef.current)
        newRowTimeoutRef.current = setTimeout(() => {
          setData((prev) => prev.map((r) => r.isNew ? { ...r, isNew: false } : r))
        }, 4000)
      }

      // Store data with timestamp for cache freshness
      const dataWithTimestamp = processedData as CachedData
      dataWithTimestamp.lastUpdated = Date.now()
      cacheRef.current[cacheKey] = dataWithTimestamp
      console.log('[loadTranscriptions] setData — rows:', processedData.length, 'new:', processedData.filter((r: RowData) => r.isNew).length)
      setData(processedData)
      preloadForDataset(processedData)
      setLoading(false)

      if (hasNew) {
        // A brand-new row arrived — the transcription we were waiting for is here.
        // Clear the pending flag, cancel the safety timeout, hide the banner.
        pendingTranscriptionRef.current = false
        if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current)
        setIsReceiving(false)
      } else if (!pendingTranscriptionRef.current) {
        // No INSERT is in-flight — clear any stale banner that old subscription
        // callbacks may have set (e.g. a DELETE event triggering setIsReceiving(true)
        // from a pre-Fast-Refresh closure).
        setIsReceiving(false)
      }
      // If pendingTranscriptionRef is true but no new row arrived yet, the banner
      // intentionally stays visible until the next reload that brings the new row.
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }
      console.error('Failed to load data:', err)
      setLoading(false)
    }
  }, [preloadForDataset])

  // Role: Stable ref always pointing at the latest loadTranscriptions + selectedRoom so
  // subscription callbacks never capture a stale closure.
  const reloadRef = useRef<() => void>(() => {})
  const reloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  reloadRef.current = () => {
    if (reloadTimeoutRef.current) clearTimeout(reloadTimeoutRef.current)
    reloadTimeoutRef.current = setTimeout(() => {
      const room = selectedRoomRef.current
      const cacheKey = room ? `room:${room}` : 'all'
      delete cacheRef.current[cacheKey]
      console.log('[reload] calling loadTranscriptions — room:', room ?? 'all')
      void loadTranscriptions(room || undefined)
    }, 300)
  }

  // Role: Subscribe to room_data changes for the current demo session.
  // Catches INSERTs (new submission), UPDATEs (recording linked / approved).
  useEffect(() => {
    if (!realtimeSessionId) {
      setIsConnected(false)
      return
    }

    const channel = supabaseClient
      .channel(`room-data-${realtimeSessionId}`)
      .on(
        'postgres_changes',
        // No server-side filter — camelCase column names ("sessionId") can silently
        // fail Supabase filter matching. Check the session client-side instead.
        { event: '*', schema: 'public', table: 'room_data' },
        (payload) => {
          const row = (payload.new ?? payload.old) as Record<string, unknown> | undefined
          const rowSession = row?.sessionId as string | undefined
          if (rowSession && rowSession !== realtimeSessionId) return
          console.log('[realtime] room_data change:', payload.eventType)
          if (payload.eventType === 'INSERT') {
            // New room_data row — transcript not ready yet. Mark as pending and show
            // the banner. The Recording UPDATE triggers the reload that clears it.
            pendingTranscriptionRef.current = true
            setIsReceiving(true)
            // Safety valve: if the Recording UPDATE never fires (e.g. transcription
            // error), clear the banner and reload after 15 s.
            if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current)
            pendingTimeoutRef.current = setTimeout(() => {
              pendingTranscriptionRef.current = false
              setIsReceiving(false)
              reloadRef.current()
            }, 15000)
          } else {
            // UPDATE (e.g. patient_note written) or DELETE — reload silently.
            reloadRef.current()
          }
        },
      )
      .subscribe((status) => {
        console.log('[realtime] room_data channel status:', status)
        if (status === 'SUBSCRIBED') setIsConnected(true)
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          setIsConnected(false)
        }
      })

    return () => { supabaseClient.removeChannel(channel) }
  }, [realtimeSessionId])

  // Role: Subscribe to Recording table UPDATEs to catch transcript completion.
  // When transcription finishes, the backend updates Recording.transcript and this fires.
  useEffect(() => {
    const channel = supabaseClient
      .channel('recording-updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'recording' },
        (payload) => {
          // transcript is undefined when REPLICA IDENTITY is not FULL — reload regardless.
          console.log('[realtime] Recording updated — id:', payload.new?.id, 'transcript present:', !!payload.new?.transcript)
          reloadRef.current()
        },
      )
      .subscribe((status) => {
        console.log('[realtime] Recording channel status:', status)
      })

    return () => { supabaseClient.removeChannel(channel) }
  }, [])

  // Load data on mount and whenever room filter changes
  useEffect(() => {
    // Copy refs to local variables at effect start for cleanup
    const audioMap = preloadedAudioRef.current
    const urlMap = preloadedObjectUrlRef.current
    
    loadTranscriptions(selectedRoom || undefined)
    return () => {
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort()
      }
      
      audioMap.forEach((a) => { try { a.pause() } catch {} })
      audioMap.clear()
      // Revoke blob URLs
      urlMap.forEach((u) => { try { URL.revokeObjectURL(u) } catch {} })
      urlMap.clear()
    }
  }, [selectedRoom, loadTranscriptions])


  
  // Memoize filtered and processed data
  const [bedFilter, setBedFilter] = useState<string>('ALL')
  useEffect(() => {
    if (onBedChange) {
      onBedChange(bedFilter)
    }
  }, [bedFilter, onBedChange])
  
  const processedData = useMemo(() => {
    const base = data
    const filtered = selectedRoom && bedFilter !== 'ALL'
      ? base.filter((row) => {
          if (row.bedLetter != null && row.bedLetter !== '') {
            return row.bedLetter === bedFilter
          }
          const parts = row.column1?.trim().split(/\s+/)
          const bed = parts?.length >= 2 ? parts[parts.length - 1] : undefined
          return bed === bedFilter
        })
      : base
    return filtered.map((row, index) => ({
      ...row,
      index: index + 1,
    }))
  }, [data, bedFilter, selectedRoom])


  

  // Beds dropdown options
  const [bedOptions, setBedOptions] = useState<string[]>([])

  useEffect(() => {
    if (!selectedRoom) {
      setBedOptions([])
      setBedFilter('ALL')
      return
    }

    // Fetch assigned beds for the selected room
    const controller = new AbortController()
    fetch(`/api/staff/assigned-beds?room=${encodeURIComponent(selectedRoom)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const beds: string[] = Array.isArray(json?.beds) ? json.beds : []
        setBedOptions(beds)
        // Keep selection if still valid; otherwise reset to ALL
        setBedFilter((prev) => (prev === 'ALL' || beds.includes(prev) ? prev : 'ALL'))
      })
      .catch((e: Error) => {
        if (e.name !== 'AbortError') {
          console.warn('Failed to load beds', e)
        }
        setBedOptions([])
        setBedFilter('ALL')
      })
    return () => controller.abort()
  }, [selectedRoom])

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
                {selectedRoom && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600"><Bed className="w-5 h-5 text-black" /></span>
                    <div className="relative">
                      <button
                        className="px-3 py-1.5 text-sm border rounded-md bg-white hover:bg-gray-50"
                        onClick={(e) => {
                          e.preventDefault()
                          const menu = document.getElementById('bed-filter-menu')
                          if (menu) {
                            const isHidden = menu.getAttribute('data-open') !== 'true'
                            menu.setAttribute('data-open', isHidden ? 'true' : 'false')
                            menu.style.display = isHidden ? 'block' : 'none'
                          }
                        }}
                        title="Filter by bed"
                      >
                        {bedFilter === 'ALL' ? 'All beds' : `Bed ${bedFilter}`}
                      </button>
                      <div
                        id="bed-filter-menu"
                        data-open="false"
                        className="absolute right-0 mt-1 w-36 bg-white border rounded-md shadow z-20"
                        style={{ display: 'none' }}
                      >
                        <button
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${bedFilter === 'ALL' ? 'font-semibold' : ''}`}
                          onClick={() => {
                            setBedFilter('ALL')
                            const menu = document.getElementById('bed-filter-menu')
                            if (menu) { menu.setAttribute('data-open', 'false'); (menu as HTMLElement).style.display = 'none' }
                          }}
                        >
                          All beds
                        </button>
                        {bedOptions.map((b) => (
                          <button
                            key={b}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${bedFilter === b ? 'font-semibold' : ''}`}
                            onClick={() => {
                              setBedFilter(b)
                              const menu = document.getElementById('bed-filter-menu')
                              if (menu) { menu.setAttribute('data-open', 'false'); (menu as HTMLElement).style.display = 'none' }
                            }}
                          >
                            Bed {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
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
                          group hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer relative
                          ${row.isNew ? "animate-in slide-in-from-bottom-2 duration-500 bg-emerald-50 border-l-4 border-l-emerald-400" : ""}
                        `}
                        onDoubleClick={() => row.audioUrl && handleRowDoubleClick(row.audioUrl, i)}
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
                                  if (row.audioUrl) handlePlay(row.audioUrl, i)
                                }}
                                disabled={!row.audioUrl}
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
                          {editingRowId === row.id ? (
                            <textarea
                              value={editedNote}
                              onChange={(e) => setEditedNote(e.target.value)}
                              className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              rows={3}
                              autoFocus
                            />
                          ) : (
                            <>
                              {row.column4}
                              {row.isNew && (
                                <Badge variant="secondary" className="ml-2 text-xs bg-emerald-100 text-emerald-800">
                                  New
                                </Badge>
                              )}
                            </>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingRowId === row.id ? (
                            <div className="flex items-center justify-end space-x-2">
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => handleSaveEdit(row.id!)}>
                                    <Save className="w-4 h-4 text-emerald-600" />
                                  </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content className="bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-md z-50">Save</Tooltip.Content>
                              </Tooltip.Root>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <Button size="icon" variant="ghost" onClick={() => setEditingRowId(null)}>
                                  <XCircle className="w-4 h-4 text-gray-500" />
                                  </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content className="bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-md z-50">Cancel</Tooltip.Content>
                              </Tooltip.Root>
                            </div>
                          ) : (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => { setEditingRowId(row.id!); setEditedNote(row.column4); }}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteRow(row.id!)} className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
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