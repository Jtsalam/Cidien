"use client"

import AdminPanel from "@/components/Dashboard/AdminPanel";
import RoomList from '@/components/Dashboard/RoomList';
import InactivityTracker from "@/components/Dashboard/InactivityTracker";
import { useState, useEffect } from 'react';

export default function RoomDashboard() {
    const [centerId, setCenterId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCenterId = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/rooms", {
                    method: "POST",
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch center ID');
                }

                const data = await res.json();
                
                if (data.success) {
                    setCenterId(data.centerId);
                } else {
                    setError(data.message || 'Failed to get center ID');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCenterId();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <AdminPanel />
                <div className="flex items-center justify-center p-8">
                    <div className="animate-pulse text-gray-600">Loading...</div>
                </div>
                <InactivityTracker />
            </div>
        );
    }

    if (error || centerId === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <AdminPanel />
                <div className="flex items-center justify-center p-8">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        Error: {error || 'Center ID not found'}
                    </div>
                </div>
                <InactivityTracker />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <AdminPanel />
            <RoomList centerId={centerId} />
            <InactivityTracker />
        </div>
    );
}