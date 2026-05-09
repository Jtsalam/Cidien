"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/getCookie';
import HospitalOverviewStep from "@/components/Demo/HospitalOverviewStep";
import QRCodeStep from "@/components/Demo/QRCodeStep";

// Import the dashboard components
import StaffDashboard from "../Staff/dashboard/StaffDashboard";
import AdminDashboard from "../Admin/dashboard/AdminDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [isDemoSession, setIsDemoSession] = useState(false);
  // Role: Track which demo onboarding step is active: "hospital" → "qr" → null (dashboard).
  const [demoStep, setDemoStep] = useState<"hospital" | "qr" | null>(null);
  // Role: QR step always selects a nurse; force StaffDashboard regardless of the session's own role cookie.
  const [qrCompleted, setQrCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user role from cookie
    const userRole = getCookie('user_role');
    const demoSessionId = getCookie("demo_session_id");
    // const staffSubmitted = getCookie('staffSubmitted');

    // if (!staffSubmitted) {
    //   // If not signed in, redirect to sign-in page
    //   router.push('/sign-in');
    //   return;
    // }

    setRole(userRole);
    const hasDemoSession = Boolean(demoSessionId);
    setIsDemoSession(hasDemoSession);
    setDemoStep(hasDemoSession ? "hospital" : null);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isDemoSession && demoStep === "hospital") {
    return <HospitalOverviewStep onContinue={() => setDemoStep("qr")} />;
  }

  if (isDemoSession && demoStep === "qr") {
    return (
      <QRCodeStep
        onContinue={() => {
          setQrCompleted(true);
          setDemoStep(null);
        }}
      />
    );
  }

  // After the QR step the selected user is always a nurse — show StaffDashboard directly.
  if (qrCompleted) return <StaffDashboard />;

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