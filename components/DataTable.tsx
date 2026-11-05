"use client"

import { Fragment, useEffect, useState, useRef, useMemo, useCallback, type ReactNode } from "react"
import { Play, Pause, Loader2, Mic, WifiOff, Edit, Trash2, MoreHorizontal, NotebookPen, DoorOpen, Users, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import * as Tooltip from "@radix-ui/react-tooltip"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import EditEntryModal from "@/components/EditEntryModal"
import { supabaseClient } from "@/lib/supabaseClient"
import { getCookie } from "@/utils/getCookie"

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
  roomNumber?: number | string | null
  patientName?: string | null
  noteRecordingId?: string | null
  roomRecordingId?: string | null
  id?: string | number
  isNew?: boolean
}

interface CachedData extends Array<RowData> {
  lastUpdated?: number
}

type AssignedRoomsBedsPayload = {
  rooms?: Array<{
    beds?: Array<{ bed_id?: number }>
  }>
}

interface DataTableProps {
  selectedRoom?: string | null
  initialData?: RowData[]
  staffId?: string
  onBedChange?: (bed: string) => void   // new
  /** Human label for the current room filter, shown above the title. */
  roomLabel?: string
  /** Primary action rendered in the page header (e.g. Approve notes). */
  headerAction?: ReactNode
}

function formatSynced(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000))
  if (s < 5) return "just now"
  if (s < 60) return `${s}s ago`
  return `${Math.floor(s / 60)} min ago`
}


export default function DataTable({ selectedRoom, initialData, staffId, onBedChange, roomLabel, headerAction }: DataTableProps) {
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
  const [editingInitialNote, setEditingInitialNote] = useState<string>('');
  const [editSaving, setEditSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | number | null>(null);
  const [deleteInFlight, setDeleteInFlight] = useState(false);
  // Role: Gates the realtime subscription so it never reads assignedBedIdsRef
  // before the staff member's assigned bed_ids have finished loading.
  const [assignedBedIdsReady, setAssignedBedIdsReady] = useState(false);
  const tableEndRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<Record<string, CachedData>>({})
  const fetchControllerRef = useRef<AbortController | null>(null)
  const selectedRoomRef = useRef<string | null | undefined>(selectedRoom)
  const preloadedAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map())
  const preloadedObjectUrlRef = useRef<Map<string, string>>(new Map())
  const prefetchPromisesRef = useRef<Map<string, Promise<void>>>(new Map())
  const assignedBedIdsRef = useRef<Set<number>>(new Set())
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

  // Role: Keep the realtime "processing" banner scoped to beds assigned to this staff member.
  // assignedBedIdsReady is flipped after this resolves (success or failure) so the
  // realtime subscription waits for the bed-id set before binding its handler.
  useEffect(() => {
    let cancelled = false
    setAssignedBedIdsReady(false)
    ;(async () => {
      const resolvedStaffId = staffId?.trim() || getCookie("staff_Id")?.trim()
      if (!resolvedStaffId) {
        if (!cancelled) {
          assignedBedIdsRef.current = new Set()
          setAssignedBedIdsReady(true)
        }
        return
      }

      try {
        const res = await fetch(`/api/staff/assigned-rooms-beds?nurseId=${encodeURIComponent(resolvedStaffId)}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const body = (await res.json()) as AssignedRoomsBedsPayload
        const ids = new Set<number>()
        for (const room of body.rooms ?? []) {
          for (const bed of room.beds ?? []) {
            if (typeof bed.bed_id === "number") ids.add(bed.bed_id)
          }
        }
        if (!cancelled) {
          assignedBedIdsRef.current = ids
          setAssignedBedIdsReady(true)
        }
      } catch (error) {
        console.warn("Failed to load assigned bed ids for realtime filtering", error)
        if (!cancelled) {
          assignedBedIdsRef.current = new Set()
          setAssignedBedIdsReady(true)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [staffId])

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

  const editingRow = editingRowId != null ? data.find((r) => r.id === editingRowId) : undefined;

  const closeEditModal = useCallback(() => {
    if (editSaving) return;
    setEditingRowId(null);
    setEditingInitialNote('');
  }, [editSaving]);

  const handleSaveEdit = useCallback(async (note: string) => {
    if (editingRowId == null) return;
    const rowId = editingRowId;
    setEditSaving(true);
    try {
      const response = await fetch(`/api/staff/transcriptions/${rowId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_note: note }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes.');
      }

      setData((prev) =>
        prev.map((row) => (row.id === rowId ? { ...row, column4: note } : row)),
      );
      toast.success('Note saved successfully.');
      setEditingRowId(null);
      setEditingInitialNote('');
    } catch (error) {
      console.error("Error saving edit:", error);
      toast.error(error instanceof Error ? error.message : 'Failed to save note.');
    } finally {
      setEditSaving(false);
    }
  }, [editingRowId]);

  const pendingDeleteRow = deleteTargetId != null ? data.find((r) => r.id === deleteTargetId) : undefined;

  const closeDeleteDialog = useCallback(() => {
    if (!deleteInFlight) setDeleteTargetId(null);
  }, [deleteInFlight]);

  const confirmDeleteRow = useCallback(async () => {
    if (deleteTargetId == null) return;
    setDeleteInFlight(true);
    try {
      const response = await fetch(`/api/staff/transcriptions/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the entry.");
      }

      setData((prevData) =>
        prevData
          .filter((row) => row.id !== deleteTargetId)
          .map((row, index) => ({ ...row, index: index + 1 })),
      );
      setDeleteTargetId(null);
    } catch (error) {
      console.error("Error deleting row:", error);
    } finally {
      setDeleteInFlight(false);
    }
  }, [deleteTargetId]);

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
      } else {
        // Use Next API which reads cookie server-side
        transcriptionsUrl = '/api/staff/transcriptions'
      }

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
      void loadTranscriptions(room || undefined)
    }, 300)
  }

  // Role: Subscribe to room_data changes for the current demo session.
  // Catches INSERTs (new submission), UPDATEs (recording linked / approved).
  // Waits for assignedBedIdsReady so the INSERT handler can never run against an
  // empty bed-id set (which would silently suppress the processing banner).
  useEffect(() => {
    if (!realtimeSessionId || !assignedBedIdsReady) {
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
          if (payload.eventType === 'INSERT') {
            const insertedBedId =
              typeof row?.bed_id === 'number'
                ? row.bed_id
                : typeof row?.bed_id === 'string'
                  ? Number.parseInt(row.bed_id, 10)
                  : null
            if (
              insertedBedId == null ||
              Number.isNaN(insertedBedId) ||
              !assignedBedIdsRef.current.has(insertedBedId)
            ) {
              reloadRef.current()
              return
            }
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
        if (status === 'SUBSCRIBED') setIsConnected(true)
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          setIsConnected(false)
        }
      })

    return () => { supabaseClient.removeChannel(channel) }
  }, [realtimeSessionId, assignedBedIdsReady])

  // Role: Subscribe to Recording table UPDATEs to catch transcript completion.
  // When transcription finishes, the backend updates Recording.transcript and this fires.
  useEffect(() => {
    const channel = supabaseClient
      .channel('recording-updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'recording' },
        () => {
          // transcript is undefined when REPLICA IDENTITY is not FULL — reload regardless.
          reloadRef.current()
        },
      )
      .subscribe()

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

  // "Synced" ticker: when the feed last received data on this client.
  const [syncedAt, setSyncedAt] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { setSyncedAt(Date.now()) }, [data])
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000)
    return () => clearInterval(t)
  }, [])

  const figures = useMemo(() => {
    const rooms = new Set(processedData.map((r) => r.roomNumber).filter((v) => v != null && v !== ""))
    const patients = new Set(processedData.map((r) => r.patientName).filter(Boolean))
    const latest = processedData[0]
    return [
      { label: "Notes", value: processedData.length, sub: bedFilter !== "ALL" ? `Bed ${bedFilter}` : "In this view", Icon: NotebookPen },
      { label: "Rooms", value: rooms.size, sub: "With notes", Icon: DoorOpen },
      { label: "Patients", value: patients.size, sub: "Charted", Icon: Users },
      { label: "Latest note", value: latest?.column3 ?? "—", sub: `Synced ${formatSynced(now - syncedAt)}`, Icon: Clock },
    ]
  }, [processedData, bedFilter, now, syncedAt])

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="animate-fade-up space-y-6">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">{roomLabel ?? (selectedRoom ? `Room ${selectedRoom}` : "All rooms")}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Live notes</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {isConnected ? (
              <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-50 px-3 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            ) : (
              <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-amber-50 px-3 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-200/70">
                <WifiOff className="h-4 w-4" aria-hidden />
                Reconnecting…
              </span>
            )}
            {headerAction}
          </div>
        </div>

        {/* Figures */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {figures.map(({ label, value, sub, Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-900/[0.07] bg-white p-4 shadow-card">
              <div className="flex items-center justify-between text-sm text-gray-500">
                {label}
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-gray-900">{value}</p>
              <p className="mt-0.5 truncate text-xs text-gray-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* Bed filter chips */}
        {selectedRoom && bedOptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by bed">
            {["ALL", ...bedOptions].map((b) => {
              const active = bedFilter === b
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBedFilter(b)}
                  aria-pressed={active}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 ease-settle active:scale-[0.97] ${
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-white text-gray-700 ring-1 ring-inset ring-slate-900/10 hover:ring-slate-900/20"
                  }`}
                >
                  {b === "ALL" ? "All beds" : `Bed ${b}`}
                </button>
              )
            })}
          </div>
        )}

        {/* Feed */}
        <section className="overflow-hidden rounded-3xl border border-slate-900/[0.07] bg-white shadow-card" aria-label="Notes">
          {isReceiving && (
            <div
              className="flex animate-in items-center gap-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-emerald-50/40 to-white px-5 py-4 fade-in-0 slide-in-from-top-2 duration-300 sm:px-6"
              role="status"
              aria-live="polite"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center gap-[3px] rounded-xl bg-emerald-600 shadow-[0_8px_20px_-8px_rgb(5_150_105/0.7)]" aria-hidden>
                {[55, 100, 70, 90].map((h, k) => (
                  <span key={k} className="w-[3px] animate-wave rounded-full bg-white" style={{ height: `${h * 0.45}%`, animationDelay: `${k * 0.12}s` }} />
                ))}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-emerald-900">Transcribing a new note…</p>
                <div className="mt-2 space-y-1.5">
                  <Skeleton className="h-2.5 w-4/5 max-w-md" />
                  <Skeleton className="h-2.5 w-1/2 max-w-xs" />
                </div>
              </div>
            </div>
          )}

          {loading && data.length === 0 ? (
            <div className="divide-y divide-slate-900/[0.05]" aria-busy="true" aria-label="Loading notes">
              {[0, 1, 2, 3].map((k) => (
                <div key={k} className="grid grid-cols-[56px_1fr] gap-4 px-5 py-5 sm:grid-cols-[72px_1fr] sm:px-6">
                  <Skeleton className="h-4 w-12" />
                  <div className="space-y-2.5">
                    <Skeleton className="h-5 w-40 rounded-full" />
                    <Skeleton className="h-3.5 w-full max-w-xl" />
                    <Skeleton className="h-3.5 w-2/3 max-w-sm" />
                  </div>
                </div>
              ))}
            </div>
          ) : processedData.length > 0 ? (
            <ol>
              {processedData.map((row, i) => {
                const showDay = i === 0 || processedData[i - 1].column2 !== row.column2
                const isPlaying = playingIndex === i
                return (
                  <Fragment key={row.id ?? `fallback_${i}_${row.column2}_${row.column3}`}>
                    {showDay && (
                      <li className="border-b border-slate-900/[0.05] bg-gray-50/80 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                        {row.column2}
                      </li>
                    )}
                    <li
                      className={`group grid grid-cols-[56px_1fr] gap-x-4 px-5 transition-colors duration-300 sm:grid-cols-[72px_1fr] sm:px-6 ${
                        row.isNew ? "animate-in fade-in-0 slide-in-from-top-3 bg-emerald-50/70 duration-500" : "hover:bg-gray-50/70"
                      }`}
                      onDoubleClick={() => row.audioUrl && handleRowDoubleClick(row.audioUrl, i)}
                    >
                      <div className="pt-5 text-right">
                        <p className="text-sm font-semibold tabular-nums text-gray-900">{row.column3}</p>
                        <p className="mt-0.5 text-xs tabular-nums text-gray-400">#{row.index}</p>
                      </div>

                      <div className="relative border-l-2 border-emerald-100 py-4 pl-5">
                        <span
                          aria-hidden
                          className={`absolute -left-[7px] top-6 h-3 w-3 rounded-full ring-4 ${
                            row.isNew ? "bg-emerald-500 ring-emerald-100" : "bg-white ring-white"
                          } border-2 border-emerald-500`}
                        />
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {(row.roomNumber != null || row.bedLetter) && (
                                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-100">
                                  <DoorOpen className="h-3 w-3" aria-hidden />
                                  {row.roomNumber ?? "—"}
                                  {row.bedLetter ? ` · ${row.bedLetter}` : ""}
                                </span>
                              )}
                              {row.patientName && <span className="text-sm font-medium text-gray-700">{row.patientName}</span>}
                              {row.isNew && (
                                <span className="animate-pop rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-800">{row.column4}</p>
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (row.audioUrl) handlePlay(row.audioUrl, i)
                                  }}
                                  disabled={!row.audioUrl}
                                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-[background-color,color,transform] duration-150 ease-settle active:scale-95 disabled:opacity-30 ${
                                    isPlaying ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  }`}
                                >
                                  {loadingIndex === i ? (
                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                  ) : isPlaying ? (
                                    <Pause className="h-4 w-4" aria-hidden />
                                  ) : (
                                    <Play className="ml-0.5 h-4 w-4" aria-hidden />
                                  )}
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Content className="z-50 rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-float" side="top">
                                {row.audioUrl ? (isPlaying ? "Pause recording" : "Play recording") : "No audio"}
                              </Tooltip.Content>
                            </Tooltip.Root>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label="Note actions"
                                  className="text-gray-400 hover:text-gray-700 sm:opacity-60 sm:group-hover:opacity-100"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="z-[200]">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingRowId(row.id!);
                                    setEditingInitialNote(row.column4);
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Edit note</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDeleteTargetId(row.id!)} className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Fragment>
                )
              })}
            </ol>
          ) : (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-200/60 [animation-duration:2.4s]" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
                  <Mic className="h-7 w-7 text-emerald-600" aria-hidden />
                </span>
              </span>
              <p className="mt-6 text-lg font-semibold text-gray-900">
                Listening for notes{selectedRoom ? ` in Room ${selectedRoom}` : ""}
              </p>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Record from Cidien Mobile — new notes appear here the moment they&apos;re transcribed.
              </p>
            </div>
          )}
        </section>
        <div ref={tableEndRef} />
      </div>

      <EditEntryModal
        open={editingRowId !== null}
        date={editingRow?.column2 ?? ''}
        timestamp={editingRow?.column3 ?? ''}
        roomNumber={editingRow?.roomNumber ?? null}
        bedLetter={editingRow?.bedLetter ?? null}
        patientName={editingRow?.patientName ?? null}
        initialNote={editingInitialNote}
        saving={editSaving}
        onCancel={closeEditModal}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={deleteTargetId !== null} onOpenChange={(open) => !open && closeDeleteDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the transcription row
              {pendingDeleteRow
                ? ` dated ${pendingDeleteRow.column2} · ${pendingDeleteRow.column3}.`
                : "."}{" "}
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteInFlight}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteInFlight}
              onClick={() => void confirmDeleteRow()}
              className="sm:mt-0"
            >
              {deleteInFlight ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tooltip.Provider>
  )
}