"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/getCookie';

// Role-based routing - redirects to avoid duplicate components

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user role from cookie
    const userRole = getCookie('user_role');
    const staffSubmitted = getCookie('staffSubmitted');

    if (!staffSubmitted) {
      // If not signed in, redirect to sign-in page
      router.push('/sign-in');
      return;
    }

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

  // Route based on role - redirect to avoid duplicate SocketProviders
  if (role === "Staff") {
    router.replace('/staff-dashboard');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl">Redirecting to Staff Dashboard...</div>
      </div>
    );
  }
  if (role === "Admin") {
    router.replace('/admin-dashboard');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl">Redirecting to Admin Dashboard...</div>
      </div>
    );
  }

  // Unauthorized access
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-xl text-red-600">Unauthorized access</div>
    </div>
  );
}