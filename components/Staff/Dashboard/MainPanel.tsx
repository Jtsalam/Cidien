"use client"

import Image from "next/image"
import Link from "next/link"
import { getCookie } from "@/utils/getCookie"
import { orgMap } from "@/lib/constants"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Hospital, User, TriangleAlert, Database,  FileArchive, DoorOpen, ArrowLeftRight, ChevronDown } from "lucide-react"
import LogoutConfirmationModal from "@/components/LogoutConfirmationModal"
import ApproveNotesModal from "@/components/ApproveNotesConfirmation"
import DataTable from "@/components/DataTable"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import AssignedRoomsList from "./AssignedRoomsList"
import NothingToSee from "@/components/NothingTosee"
import { toast } from "sonner"

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

export default function MainPanel() {
  const [displayName, setDisplayName] = useState("")
  const [nurseId, setNurseId] = useState("")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showApproveNotesModal, setShowApproveNotesModal] = useState(false)
  const [assignedRooms, setAssignedRooms] = useState<string[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [showRoomDropdown, setShowRoomDropdown] = useState(false)
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const transcriptionCacheRef = useRef<Record<string, RowData[]>>({})
  const prefetchControllerRef = useRef<AbortController | null>(null)
  const [selectedBed, setSelectedBed] = useState<string>("ALL")


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
    console.log("Organization from cookie:", cookieOrg)
    setDisplayName(orgMap[cookieOrg.trim()])

    const staffCookie = getCookie("staff_Id") ?? ""
    console.log("Staff Id from cookie:", staffCookie)
    setNurseId(staffCookie.trim())
  }, [])

  // Fetch assigned rooms for the staff member
  useEffect(() => {
    const fetchAssignedRooms = async () => {
      if (!nurseId) return;
      
      setIsLoadingRooms(true);
      try {
        console.log(`Fetching assigned rooms for staff ID: ${nurseId}`);
        const response = await fetch('/api/staff/assigned-rooms');
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Loaded ${data.rooms?.length || 0} assigned rooms:`, data.rooms);
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

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRoomDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/staff/logout", { method: "POST" })
    window.location.href = "/sign-in"
  }, [])

  const handleNoteApproval = useCallback(async () => {
    // Approve notes for current room/bed or all
    try {
      const staffId = nurseId;
      const room = selectedRoom;
      const bed = selectedBed;
      const res = await fetch('/api/staff/approve-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff_id: staffId, room, bed }),
      });
      if (!res.ok) throw new Error('Failed to approve notes');
      
      const result = await res.json();
      console.log('Notes approved successfully:', result);
      
      // Show toast notifications for PDF generation
      if (result.pdfs_generated && result.pdfs_generated > 0 && result.pdf_paths) {
        // Extract room and bed info from each PDF path and show individual toasts
        result.pdf_paths.forEach((pdfPath: string) => {
          // Extract room and bed from filename pattern: chart_S001_20251104_143025_Room3127_BedA.pdf
          const match = pdfPath.match(/Room(\d+)_Bed([A-Z])/);
          if (match) {
            const roomNum = match[1];
            const bedLetter = match[2];
            toast.success(`Medical Data Approved for Room ${roomNum}, Bed ${bedLetter}`, {
              duration: 3000,
            });
          }
        });
      } else if (result.updated > 0) {
        console.log('Notes approved but no PDFs generated');
        toast.warning('Notes approved, but PDF generation failed.');
      } else {
        console.log('No notes to approve');
        toast.info('No notes found to approve.');
      }
    } catch (e) {
      console.error('Error approving notes:', e);
      toast.error('Failed to approve notes. Please try again.');
    }
    setActiveTab("archive");
  }, [nurseId, selectedRoom, selectedBed]);

  const handleRoomSelect = useCallback((room: string) => {
    console.log(`Switching to room: ${room}`);
    setSelectedRoom(room);
    setShowRoomDropdown(false);
    // Warm cache for selected room and also keep 'all' warm
    prefetchTranscriptions(room)
    prefetchTranscriptions(null)
  }, [prefetchTranscriptions]);

  const handleShowAllRooms = useCallback(() => {
    console.log('Switching to all rooms');
    setSelectedRoom(null);
    setShowRoomDropdown(false);
    // Warm 'all' cache
    prefetchTranscriptions(null)
  }, [prefetchTranscriptions]);

  // Map paths to tab values for active state
  const tabRoutes = [
    {
      value: "data",
      path: "/Mobile-Charter/StaffDashboard/data.php",
      icon: Database,
      label: "Data",
    },
    {
      value: "unassigned",
      path: "/Mobile-Charter/uploads/uploadview.php",
      icon: TriangleAlert,
      label: "Unnasigned Notes",
    },
    {
      value: "archive",
      path: "/Mobile-Charter/uploads/uploadview.php",
      icon: FileArchive,
      label: "Archived Notes",
    },
  ]

  // Determine the active tab based on the current pathname
  const [activeTab, setActiveTab] = useState("data")

  const getRoomDisplayText = useMemo(() => {
    if (isLoadingRooms) return "Loading...";
    if (assignedRooms.length === 0) return "No rooms assigned";
    if (selectedRoom) return `Room ${selectedRoom}`;
    return "All rooms";
  }, [isLoadingRooms, assignedRooms.length, selectedRoom]);

  return (
    <div className="bg-white shadow-lg border-b">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-colors cursor-pointer">
                <Image
                  src={`/centerImages/Cidien.png`}
                  alt="Organization logo"
                  width={100}
                  height={60}
                  className="rounded-md"
                />
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">Staff Dashboard</h1>
                <p className="text-emerald-100 text-sm">Welcome back to your workspace</p>
              </div>
            </div>

            {/* Organization Info */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <Hospital className="w-4 h-4 text-emerald-200" />
                  <span className="text-sm font-medium text-emerald-100">Organization</span>
                </div>
                <p className="font-semibold">{displayName || "Loading..."}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <User className="w-4 h-4 text-emerald-200" />
                  <span className="text-sm font-medium text-emerald-100">Staff ID</span>
                </div>
                <p className="font-semibold">{nurseId || "Loading..."}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <DoorOpen className="w-4 h-4 text-emerald-200" />
                  <span className="text-sm font-medium text-emerald-100">Room ID</span>
                </div>
                <TooltipProvider>
                  <div className="relative" ref={dropdownRef}>
                    <p className="font-semibold flex justify-end items-center">
                      {getRoomDisplayText}
                      {assignedRooms.length > 0 && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => setShowRoomDropdown(!showRoomDropdown)}
                              variant="ghost"
                              size="sm"
                              className="ml-3 h-9 w-9 p-0 
                                       bg-emerald-500/15 hover:bg-emerald-500/25 
                                       border border-emerald-400/40 hover:border-emerald-300/60
                                       rounded-lg shadow-sm hover:shadow-md
                                       transition-all duration-300 ease-out
                                       group relative overflow-hidden
                                       hover:scale-105 active:scale-95"
                            >
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-emerald-300/10 
                                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              />
                              <ChevronDown
                                className={`w-4 h-4 text-emerald-200 
                                         group-hover:text-white
                                         transition-all duration-300 ease-out
                                         relative z-10 ${showRoomDropdown ? 'rotate-180' : ''}`}
                              />
                              <span className="sr-only">Switch to a different room</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="bg-slate-800 text-white border-slate-700">
                            <div className="flex items-center gap-2">
                              <ArrowLeftRight className="w-3 h-3" />
                              <span>Switch Room</span>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </p>
                    
                    {/* Room Dropdown */}
                    {showRoomDropdown && assignedRooms.length > 0 && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button
                            onClick={handleShowAllRooms}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                          >
                            <span>All rooms</span>
                            {!selectedRoom && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            )}
                          </button>
                          {assignedRooms.map((room) => (
                            <button
                              key={room}
                              onClick={() => handleRoomSelect(room)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                            >
                              <span>Room {room}</span>
                              {selectedRoom === room && (
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-200"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

          {/* Mobile Organization Info */}
          <div className="md:hidden mt-4 pt-4 border-t border-emerald-500/30">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Hospital className="w-3 h-3 text-emerald-200" />
                  <span className="text-emerald-100">Organization</span>
                </div>
                <p className="font-medium truncate">{displayName || "Loading..."}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <User className="w-3 h-3 text-emerald-200" />
                  <span className="text-emerald-100">Staff ID</span>
                </div>
                <p className="font-medium">{nurseId || "Loading..."}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-50 px-6 py-3">
        <div className="flex justify-center">
          <Tabs value={activeTab} className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border h-12">
              {tabRoutes.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-600 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-md transition-all duration-200 hover:bg-gray-100 data-[state=active]:hover:bg-emerald-700"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Content Area - Show DataTable only when data tab is active */}
      {activeTab === "data" && (
        <DataTable
          selectedRoom={selectedRoom}
          initialData={transcriptionCacheRef.current[cacheKeyForRoom(selectedRoom)] || []}
          onBedChange={setSelectedBed}  // capture bed from DataTable
        />
      )}

      {/* Assigned Rooms List for Archive Tab */}
      {activeTab === "archive" && (
        <AssignedRoomsList nurseId={nurseId} selectedRoom={selectedRoom} />
      )}
      
      <LogoutConfirmationModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <ApproveNotesModal
      open={showApproveNotesModal}
      onCancel={() => setShowApproveNotesModal(false)}
      onConfirm={handleNoteApproval}
      room={getRoomDisplayText}
      bed={selectedBed}
      />
      
      {activeTab === "data" && (
      <div className="flex justify-end pr-8">   {/* or pr-6, pr-8 */}
        <Button 
          variant="ghost"
          size="sm"
          className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded shadow -mt-2"
          onClick={() => setShowApproveNotesModal(true)}   
        >
        <span>Approve Notes</span>
        </Button>
      </div>)}
      {activeTab === "unassigned" && <NothingToSee />}




    </div>
  )
}