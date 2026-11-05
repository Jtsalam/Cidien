"use client"

import MainPanel from "@/components/Staff/Dashboard/MainPanel";
// import InactivityTracker from "@/components/InactivityTracker";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Dashboard() {
  return (
    <ErrorBoundary>
      {/* data-staff-dashboard marker: app/globals.css uses body:has([data-staff-dashboard])
          to hide the global SiteHeader while this dashboard is mounted. */}
      <div
        data-staff-dashboard
        className="min-h-screen bg-[#f6f8f7]"
      >
        <MainPanel />
        {/* <InactivityTracker /> */}
      </div>
    </ErrorBoundary>
  )
}