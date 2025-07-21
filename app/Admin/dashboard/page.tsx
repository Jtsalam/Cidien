"use client"

import AdminPanel from "@/components/Dashboard/AdminPanel";
import InactivityTracker from "@/components/Dashboard/InactivityTracker";

export default function RoomDashboard() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminPanel />
        <InactivityTracker />
    </div>
    )





}