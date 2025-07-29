"use client"

import Image from "next/image"
import { getCookie } from "@/utils/getCookie"
import { orgMap } from "@/lib/constants"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Hospital, User, Home, Upload, Database, Bed, DoorOpen, ArrowLeftRight } from "lucide-react"
import LogoutConfirmationModal from "@/components/Dashboard/LogoutConfirmationModal"
import DataTable from "@/components/Dashboard/DataTable"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

export default function MainPanel() {
  const [displayName, setDisplayName] = useState("")
  const [nurseId, setNurseId] = useState("")
  const [roomId, setRoomId] = useState("")
  const [orgImage, setOrgImage] = useState("")
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  // Mock fetching session data (replace with actual logic)
  useEffect(() => {
    // fetch session info here
    const cookieOrg = getCookie("organization") ?? ""
    console.log("Organization from cookie:", cookieOrg)
    setDisplayName(orgMap[cookieOrg.trim()])

    const staffCookie = getCookie("staff_Id") ?? ""
    console.log("Staff Id from cookie:", staffCookie)
    setNurseId(staffCookie.trim())

    const roomCookie = getCookie("room_Id") ?? ""
    console.log("Room Id from cookie:", roomCookie)
    setRoomId(roomCookie.trim())

    setOrgImage(`${cookieOrg.trim()}`)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/staff/logout", { method: "POST" })
    window.location.href = "/sign-in"
  }

  // Map paths to tab values for active state
  const tabRoutes = [
    {
      value: "home",
      path: "/Mobile-Charter/StaffDashboard/userdashboard.php",
      icon: Home,
      label: "Home",
    },
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
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="bg-white shadow-lg border-b">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <Image
                  src={`/centerImages/${orgImage}.png`}
                  alt="Organization logo"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              </div>
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
                  <p className="font-semibold flex justify-end items-center">
                    {roomId || "No rooms assigned"}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => console.log("Switch room clicked")}
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
                          <ArrowLeftRight
                            className="w-4 h-4 text-emerald-200 
                                     group-hover:text-white
                                     transition-all duration-300 ease-out
                                     relative z-10"
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
                  </p>
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
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border h-12">
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
      {activeTab === "data" && <DataTable />}
      
      <LogoutConfirmationModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}