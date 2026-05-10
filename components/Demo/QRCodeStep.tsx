"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { subscribeMobileConnected, unsubscribeChannel } from "@/lib/realtime/mobileSignal";
import type { RealtimeChannel } from "@supabase/supabase-js";

type MobileToken = {
  sessionId: string;
  staffId: string;
  staffName: string;
  hospitalName: string;
};

type Props = {
  onContinue: () => void;
};

export default function QRCodeStep({ onContinue }: Props) {
  const [token, setToken] = useState<MobileToken | null>(null);
  const [mobileUrl, setMobileUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/demo/mobile-token");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Could not load nurse token.");

        if (!cancelled) {
          const t = data as MobileToken;
          setToken(t);

          // Role: Build the full bypass URL the phone will open when it scans the QR code.
          const base = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
          setMobileUrl(
            `${base}/mobile?session=${encodeURIComponent(t.sessionId)}&staffId=${encodeURIComponent(t.staffId)}&bypass=true`,
          );

          // Role: Subscribe to the broadcast channel so we know the instant the phone connects.
          channelRef.current = subscribeMobileConnected(t.sessionId, async (connectedStaffId) => {
            if (cancelled) return;
            setScanned(true);

            // Role: Mirror the nurse's session into the desktop's cookies so StaffDashboard
            // loads with the correct staff ID, rooms, and realtime session filter.
            try {
              await fetch("/api/mobile/bypass", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sessionId: t.sessionId,
                  staffId: connectedStaffId,
                }),
              });
            } catch (e) {
              console.warn("Desktop cookie sync failed, continuing anyway:", e);
            }

            setTimeout(() => onContinue(), 1500);
          });
        }
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Unknown error.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
      unsubscribeChannel(channelRef.current);
      channelRef.current = null;
    };
  }, [onContinue]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-700">Preparing nurse QR code…</p>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-red-700">QR step failed</h2>
          <p className="text-sm text-gray-700">{error}</p>
          <Button onClick={onContinue}>Skip to dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-start justify-center">
      <div className="max-w-xl w-full space-y-6">

        {/* Header card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-emerald-700 font-medium">Step 2: Mobile Charting Device</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            Scan to start charting
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Open the camera on your phone and scan the code below. You will be logged in as{" "}
            <span className="font-semibold text-gray-900">{token.staffName}</span> at{" "}
            <span className="font-semibold text-gray-900">{token.hospitalName}</span>.
          </p>
        </div>

        {/* QR card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm flex flex-col items-center space-y-6">
          {scanned ? (
            <div className="flex flex-col items-center space-y-3 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-emerald-700">Phone connected!</p>
              <p className="text-sm text-gray-500">Redirecting to dashboard…</p>
            </div>
          ) : (
            <>
              <div className="p-4 border-2 border-emerald-200 rounded-xl">
                <QRCodeSVG
                  value={mobileUrl}
                  size={220}
                  level="M"
                  includeMargin={false}
                />
              </div>

              {/* Pulse ring to signal "waiting" */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span>Waiting for phone to connect…</span>
              </div>

              {/* Nurse info */}
              <div className="w-full rounded-lg bg-gray-50 px-4 py-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nurse</span>
                  <span className="font-medium text-gray-900">{token.staffName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Staff ID</span>
                  <span className="font-medium text-gray-900">{token.staffId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hospital</span>
                  <span className="font-medium text-gray-900">{token.hospitalName}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Skip link */}
        {!scanned && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={onContinue}>
              Skip to dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
