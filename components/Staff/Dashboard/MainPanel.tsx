"use client"

import { getCookie } from "@/utils/getCookie"
import { orgMap } from "@/lib/constants"
import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { CheckCheck } from "lucide-react"
import LogoutConfirmationModal from "@/components/LogoutConfirmationModal"
import ApproveNotesModal, { type ApprovePreviewTarget } from "@/components/ApproveNotesConfirmation"
import DataTable from "@/components/DataTable"
import AssignedRoomsList from "./AssignedRoomsList"
import NothingToSee from "@/components/NothingTosee"
import { DashboardSidebar, DashboardTopBar, type DashboardTab } from "./Sidebar"
import { toast } from "sonner"

interface RowData {
  index: number
  audioUrl: string
  column1: string
  column2: string
  column3: string
  column4: string
  bedLetter?: string | null
  id?: string | number
  isNew?: boolean
}

export default function MainPanel() {
  const [displayName, setDisplayName] = useState("")
  const [nurseId, setNurseId] = useState("")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showApproveNotesModal, setShowApproveNotesModal] = useState(false)
  const [assignedRooms, setAssignedRooms] = useState<string[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)
  const transcriptionCacheRef = useRef<Record<string, RowData[]>>({})
  const prefetchControllerRef = useRef<AbortController | null>(null)
  const [selectedBed, setSelectedBed] = useState<string>("ALL")
  /** Increment after approve to remount DataTable and drop stale transcription cache. */
  const [dashboardRefreshNonce, setDashboardRefreshNonce] = useState(0)
  const [approvePreviewTargets, setApprovePreviewTargets] = useState<ApprovePreviewTarget[]>([])
  const [approvePreviewLoading, setApprovePreviewLoading] = useState(false)
  const [roomsWithNewApproval, setRoomsWithNewApproval] = useState<Set<string>>(() => new Set())


  const cacheKeyForRoom = useCallback((room?: string | null) => (room ? `room:${room}` : 'all'), [])

  const prefetchTranscriptions = useCallback(async (room?: string | null) => {
    try {
      // Abort any previous prefetch to prioritize newest selection
      if (prefetchControllerRef.current) prefetchControllerRef.current.abort()
      const controller = new AbortController()
      prefetchControllerRef.current = controller

      const url = room
        ? `/api/staff/transcriptions-by-room?room=${encodeURIComponent(room)}`
        : `/api/staff/transcriptions`

      const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' }, signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      transcriptionCacheRef.current[cacheKeyForRoom(room)] = Array.isArray(json) ? json : []
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') return
      // Silent failure; DataTable will still fetch on mount
      console.warn('Prefetch failed', e)
    }
  }, [cacheKeyForRoom])

  // Mock fetching session data (replace with actual logic)
  useEffect(() => {
    // fetch session info here
    const cookieOrg = getCookie("organization") ?? ""
    const demoOrgName = getCookie("demo_org_name") ?? ""
    setDisplayName(demoOrgName ? decodeURIComponent(demoOrgName) : (orgMap[cookieOrg.trim()] ?? cookieOrg.trim()))

    const staffCookie = getCookie("staff_Id") ?? ""
    setNurseId(staffCookie.trim())
  }, [])

  // Fetch assigned rooms for the staff member
  useEffect(() => {
    const fetchAssignedRooms = async () => {
      if (!nurseId) return;
      
      setIsLoadingRooms(true);
      try {
        const response = await fetch('/api/staff/assigned-rooms');

        if (response.ok) {
          const data = await response.json();
          setAssignedRooms(data.rooms || []);
        } else {
          console.error('Failed to fetch assigned rooms:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching assigned rooms:', error);
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchAssignedRooms();
  }, [nurseId]);


  const handleLogout = useCallback(async () => {
    await fetch("/api/staff/logout", { method: "POST", credentials: "include" })
    window.location.href = "/"
  }, [])

  const clearRoomNewBadge = useCallback((roomNumber: string) => {
    setRoomsWithNewApproval((prev) => {
      const next = new Set(prev);
      next.delete(roomNumber);
      return next;
    });
  }, []);

  const openApproveNotesModal = useCallback(async () => {
    setApprovePreviewLoading(true);
    setApprovePreviewTargets([]);
    setShowApproveNotesModal(true);
    try {
      const res = await fetch('/api/staff/approve-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: selectedRoom,
          bed: selectedBed,
          dryRun: true,
        }),
      });
      const data = (await res.json()) as {
        targets?: ApprovePreviewTarget[];
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || 'Could not load approval preview');
      const targets = data.targets ?? [];
      setApprovePreviewTargets(targets);
      if (targets.length === 0) {
        toast.info('No pending notes to approve for the current filter.');
        setShowApproveNotesModal(false);
      }
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : 'Could not load approval preview');
      setShowApproveNotesModal(false);
    } finally {
      setApprovePreviewLoading(false);
    }
  }, [selectedRoom, selectedBed]);

  const handleCloseApproveModal = useCallback(() => {
    setShowApproveNotesModal(false);
    setApprovePreviewTargets([]);
  }, []);

  const handleNoteApproval = useCallback(async () => {
    const loadingId = toast.loading('Approving notes…');
    try {
      const room = selectedRoom;
      const bed = selectedBed;
      const res = await fetch('/api/staff/approve-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room, bed, dryRun: false }),
      });
      const result = (await res.json()) as {
        updated?: number;
        message?: string;
        newlyApprovedRoomNumbers?: string[];
        error?: string;
      };
      if (!res.ok) throw new Error(result.error || 'Failed to approve notes');

      const updated = result.updated ?? 0;
      toast.dismiss(loadingId);
      if (updated > 0) {
        toast.success(result.message || `Approved ${updated} note(s).`);
        if (result.newlyApprovedRoomNumbers?.length) {
          setRoomsWithNewApproval((prev) => {
            const next = new Set(prev);
            for (const r of result.newlyApprovedRoomNumbers!) {
              next.add(String(r));
            }
            return next;
          });
        }
        transcriptionCacheRef.current = {};
        setDashboardRefreshNonce((n) => n + 1);
      } else {
        toast.info(result.message || 'No notes found to approve.');
      }

      handleCloseApproveModal();
      setActiveTab('archive');
    } catch (e) {
      console.error('Error approving notes:', e);
      toast.dismiss(loadingId);
      toast.error(e instanceof Error ? e.message : 'Failed to approve notes. Please try again.');
    }
  }, [selectedRoom, selectedBed, handleCloseApproveModal]);

  const handleRoomSelect = useCallback((room: string) => {
    setSelectedRoom(room);
    // Warm cache for selected room and also keep 'all' warm
    prefetchTranscriptions(room)
    prefetchTranscriptions(null)
  }, [prefetchTranscriptions]);

  const handleShowAllRooms = useCallback(() => {
    setSelectedRoom(null);
    // Warm 'all' cache
    prefetchTranscriptions(null)
  }, [prefetchTranscriptions]);

  const [activeTab, setActiveTab] = useState<DashboardTab>("data")

  const roomLabel = selectedRoom ? `Room ${selectedRoom}` : "All rooms"

  const shellProps = {
    displayName,
    nurseId,
    activeTab,
    onTabChange: setActiveTab,
    rooms: assignedRooms,
    isLoadingRooms,
    selectedRoom,
    onSelectRoom: (room: string | null) => (room ? handleRoomSelect(room) : handleShowAllRooms()),
    roomsWithNewApproval,
    onLogout: () => setShowLogoutModal(true),
  }

  return (
    <div className="min-h-screen lg:pl-[264px]">
      <DashboardSidebar {...shellProps} />
      <DashboardTopBar {...shellProps} />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        {activeTab === "data" && (
          <DataTable
            key={dashboardRefreshNonce}
            selectedRoom={selectedRoom}
            initialData={transcriptionCacheRef.current[cacheKeyForRoom(selectedRoom)] || []}
            staffId={nurseId}
            onBedChange={setSelectedBed}
            roomLabel={roomLabel}
            headerAction={
              <Button size="lg" onClick={() => void openApproveNotesModal()} className="h-10 rounded-xl px-4">
                <CheckCheck aria-hidden />
                Approve notes
              </Button>
            }
          />
        )}

        {activeTab === "archive" && (
          <AssignedRoomsList
            nurseId={nurseId}
            selectedRoom={selectedRoom}
            roomsWithNewApproval={roomsWithNewApproval}
            onClearNewBadgeForRoom={clearRoomNewBadge}
          />
        )}

        {activeTab === "unassigned" && <NothingToSee />}
      </main>

      <LogoutConfirmationModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <ApproveNotesModal
        open={showApproveNotesModal}
        onCancel={handleCloseApproveModal}
        onConfirm={handleNoteApproval}
        room={roomLabel}
        bed={selectedBed}
        previewTargets={approvePreviewTargets}
        previewLoading={approvePreviewLoading}
      />
    </div>
  )
}
