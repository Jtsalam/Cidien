"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/getCookie';

// Import the dashboard components
import StaffDashboard from "../Staff/dashboard/StaffDashboard";
import AdminDashboard from "../Admin/dashboard/AdminDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user role from cookie
    const userRole = getCookie('user_role');
    // const staffSubmitted = getCookie('staffSubmitted');

    // if (!staffSubmitted) {
    //   // If not signed in, redirect to sign-in page
    //   router.push('/sign-in');
    //   return;
    // }

    setRole(userRole);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Route based on role
  if (role === "Staff") return <StaffDashboard />;
  if (role === "Admin") return <AdminDashboard />;

  // Unauthorized access
  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
  //     <div className="text-xl text-red-600">Unauthorized access</div>
  //   </div>
  // );
}