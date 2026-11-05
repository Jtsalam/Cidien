"use client"

import Image from "next/image"
import { getCookie } from "@/utils/getCookie"
import { orgMap } from "@/lib/constants"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Hospital, User, Home, TriangleAlert, Database, FileArchive } from "lucide-react"
import NothingToSee from "@/components/NothingTosee"
import LogoutConfirmationModal from "@/components/LogoutConfirmationModal";
import RoomList from '@/components/Admin/Dashboard/Home/RoomList';

export default function MainPanel() {
  const [displayName, setDisplayName] = useState("")
  const [nurseId, setNurseId] = useState("")
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
    const demoOrgName = getCookie("demo_org_name") ?? ""
    setDisplayName(demoOrgName ? decodeURIComponent(demoOrgName) : (orgMap[cookieOrg.trim()] ?? cookieOrg.trim()))

    const cookieId = getCookie("staff_Id") ?? ""
    setNurseId(cookieId.trim())
  }, [])

  const handleLogout = async () => {
    await fetch("/api/staff/logout", { method: "POST", credentials: "include" })
    window.location.href = "/"
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
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_0_rgb(4_120_87/0.35)]">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur-sm">
                <Image
                  src="/cidien-logo-white.svg"
                  alt="Cidien"
                  width={358}
                  height={80}
                  priority
                  className="h-6 w-auto sm:h-7"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold leading-tight">Admin Dashboard</h1>
                <p className="text-sm text-emerald-100/90">Welcome back to your workspace</p>
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
              className="text-white hover:bg-white/10 border border-white/20 hover:border-white/30"
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
      <div className="border-b border-slate-900/[0.06] bg-gray-50/80 px-6 py-3">
        <div className="flex justify-center">
          <Tabs value={activeTab} className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-4 h-12 rounded-xl bg-slate-900/[0.05] p-1 ring-1 ring-inset ring-slate-900/[0.04]">
              {tabRoutes.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-600 rounded-lg transition-[color,background-color,box-shadow] duration-200 ease-settle hover:bg-white/70 hover:text-gray-900 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-[0_1px_3px_rgb(4_120_87/0.35)] data-[state=active]:hover:bg-emerald-700"
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
      {activeTab === "data" && <NothingToSee />}
      {activeTab === "unassigned" && <NothingToSee />}
      {activeTab === "archive" && <NothingToSee />}
      {activeTab === "home" && (
        <>
          {loadingCenterId ? (
            <div className="p-6 text-gray-600">Loading rooms...</div>
          ) : centerError || centerId === null ? (
            <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
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
