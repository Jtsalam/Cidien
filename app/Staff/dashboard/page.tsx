"use client"

import MainPanel from "@/components/Dashboard/MainPanel";
import InactivityTracker from "@/components/Dashboard/InactivityTracker";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MainPanel />
      <InactivityTracker />
    </div>
  )
}