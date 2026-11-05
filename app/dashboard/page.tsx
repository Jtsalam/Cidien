"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/getCookie";
import HospitalOverviewStep from "@/components/Demo/HospitalOverviewStep";
import QRCodeStep from "@/components/Demo/QRCodeStep";
import StaffDashboard from "../Staff/dashboard/StaffDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [isDemoSession, setIsDemoSession] = useState(false);
  const [demoStep, setDemoStep] = useState<"hospital" | "qr" | null>(null);
  const [qrCompleted, setQrCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRole = getCookie("user_role");
    const demoSessionId = getCookie("demo_session_id");
    setRole(userRole ?? null);
    const hasDemoSession = Boolean(demoSessionId);
    setIsDemoSession(hasDemoSession);
    setDemoStep(hasDemoSession ? "hospital" : null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const allowed =
      isDemoSession || qrCompleted || role === "Staff" || role === "Admin";
    if (!allowed) router.replace("/");
  }, [isLoading, isDemoSession, qrCompleted, role, router]);

  if (isLoading) {
    return (
      <div data-app-shell className="flex min-h-screen items-center justify-center bg-white">
        <span className="relative flex h-12 w-12 items-center justify-center" role="status" aria-label="Loading">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-200/60" />
          <span className="relative h-3 w-3 rounded-full bg-emerald-500" />
        </span>
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

  if (qrCompleted) return <StaffDashboard />;

  if (role === "Staff" || role === "Admin") {
    return <StaffDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-3 p-6">
      <p className="text-gray-600 text-center">Use Try Demo from the home page to continue.</p>
    </div>
  );
}
