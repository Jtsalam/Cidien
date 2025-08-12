"use client"

import Image from "next/image"
import { getCookie } from "@/utils/getCookie"
import { orgMap } from "@/lib/constants"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Hospital, User, Upload, Database, Bed, DoorOpen } from "lucide-react"
import LogoutConfirmationModal from "@/components/Dashboard/LogoutConfirmationModal"
import DataTable from "@/components/Dashboard/DataTable"
import { Mic, StopCircle } from "lucide-react"
import { processRoomAudio, processClinicalNote } from "@/lib/api"

export default function MainPanel() {
  const [displayName, setDisplayName] = useState("")
  const [roomId, setRoomId] = useState("")
  const [orgImage, setOrgImage] = useState("")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'room' | 'note' | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false)


  const startRecording = async (type: 'room' | 'note') => {
    try {
      setRecordingType(type);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        if (type === 'room') {
          await processRoomAudio(audioBlob);
        } else {
          await processClinicalNote(audioBlob);
        }
        setAudioChunks([]);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setAudioChunks(chunks);
    } catch (error) {
      console.error('Recording failed:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsProcessing(true)
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsProcessing(false)
      setRecordingType(null);
    }
  };

  // Mock fetching session data (replace with actual logic)
  useEffect(() => {
    // fetch session info here
    const cookieOrg = getCookie("organization") ?? ""
    console.log("Organization from cookie:", cookieOrg)
    setDisplayName(orgMap[cookieOrg.trim()])

    const cookieId = getCookie("room_Id") ?? ""
    console.log("Room Id from cookie:", cookieId)
    setRoomId(cookieId.trim())

    setOrgImage(`${cookieOrg.trim()}`)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/staff/logout", { method: "POST" })
    window.location.href = "/Staff/sign-in"
  }

  // Map paths to tab values for active state
  const tabRoutes = [
    {
      value: "data",
      path: "/Mobile-Charter/StaffDashboard/data.php",
      icon: Database,
      label: "Data",
    },
    {
      value: "uploads",
      path: "/Mobile-Charter/uploads/uploadview.php",
      icon: Upload,
      label: "Uploads",
    },
    {
      value: "clients",
      path: "/Mobile-Charter/StaffDashboard/clients.php",
      icon: Bed,
      label: "All Beds",
    },
  ]

  // Determine the active tab based on the current pathname
  const activeTab = tabRoutes.find((route) => pathname === route.path)?.value || "data"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg border-b">
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                {orgImage && (
                    <Image 
                      src={`/centerImages/${orgImage}.png`}
                      alt="Organization logo"
                      width={60}
                      height={60}
                    />
                  )}
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold">Room Dashboard</h1>
                  <p className="text-emerald-100 text-sm">
                    <i>View Patient data in real-time</i>
                  </p>
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
                    <DoorOpen className="w-4 h-4 text-emerald-200" />
                    <span className="text-sm font-medium text-emerald-100">Room ID</span>
                  </div>
                  <p className="font-semibold">{roomId || "Loading..."}</p>
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
                    <span className="text-emerald-100">Room ID</span>
                  </div>
                  <p className="font-medium">{roomId || "Loading..."}</p>
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
                      onClick={() => router.push(tab.path)}
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
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end space-y-3">
          {isRecording ? (
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full shadow-lg animate-pulse"
              onClick={stopRecording}
            >
              <StopCircle className="w-5 h-5 mr-2" />
              Stop Recording
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                size="lg"
                className="rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => startRecording('room')}
              >
                <Mic className="w-5 h-5 mr-2" />
                Record Room Number
              </Button>
              {roomId && (
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white mt-2"
                  onClick={() => startRecording('note')}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Record Clinical Note
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Content Area - Show DataTable only when data tab is active */}
      {activeTab === "data" && <DataTable />}

      <LogoutConfirmationModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}