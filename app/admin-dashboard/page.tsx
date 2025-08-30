"use client"

import AdminPanel from "@/components/Admin/Dashboard/MainPanel";
import InactivityTracker from "@/components/InactivityTracker";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminPanel />
      {/* <InactivityTracker /> */}
    </div>
  );
}