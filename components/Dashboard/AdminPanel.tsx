"use client"

import Image from "next/image"
import { getCookie } from "@/utils/getCookie"
import { orgMap } from "@/lib/constants"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Hospital, User, Home, Upload, Database, Users } from "lucide-react"
import DataTable from "@/components/Dashboard/DataTable"
import LogoutConfirmationModal from "@/components/Dashboard/LogoutConfirmationModal";
import RoomList from '@/components/Dashboard/RoomList';

export default function MainPanel() {
  const [displayName, setDisplayName] = useState("")
  const [nurseId, setNurseId] = useState("")
  const [orgImage, setOrgImage] = useState("")
  const [centerId, setCenterId] = useState<number | null>(null)
  const [loadingCenterId, setLoadingCenterId] = useState(true)
  const [centerError, setCenterError] = useState<string | null>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  // usEffect to fetch rooms of an organization
  useEffect(() => {
    const fetchCenterId = async () => {
      try {
        setLoadingCenterId(true)
        const res = await fetch("/api/staff/RoomMngr/rooms", { method: "POST" })
  
        if (!res.ok) {
          throw new Error("Failed to fetch center ID")
        }
  
        const data = await res.json()
  
        if (data.success) {
          setCenterId(data.centerId)
        } else {
          setCenterError(data.message || "Center ID not found")
        }
      } catch (err) {
        setCenterError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoadingCenterId(false)
      }
    }
  
    fetchCenterId()
  }, [])
  
  // Mock fetching session data (replace with actual logic)
  useEffect(() => {
    // fetch session info here
    const cookieOrg = getCookie("organization") ?? ""
    console.log("Organization from cookie:", cookieOrg)
    setDisplayName(orgMap[cookieOrg.trim()])

    const cookieId = getCookie("staff_Id") ?? ""
    console.log("Staff Id from cookie:", cookieId)
    setNurseId(cookieId.trim())
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
        path: "",
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
      icon: Users,
      label: "Patients",
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
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
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
      
      {/* Content Area */}
      {activeTab === "data" && <DataTable />}
      {activeTab === "home" && (
        <>
          {loadingCenterId ? (
            <div className="p-6 text-gray-600">Loading rooms...</div>
          ) : centerError || centerId === null ? (
            <div className="p-6 bg-red-100 border border-red-300 text-red-700 rounded">
              Error: {centerError || "Center ID not found"}
            </div>
          ) : (
            <RoomList centerId={centerId} />
          )}
        </>
      )}
      
      <LogoutConfirmationModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}