"use client"

import MainPanel from "@/components/Staff/Dashboard/MainPanel";
// import InactivityTracker from "@/components/InactivityTracker";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <MainPanel />
        {/* <InactivityTracker /> */}
      </div>
    </ErrorBoundary>
  )
}