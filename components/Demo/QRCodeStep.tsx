"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { subscribeMobileConnected, unsubscribeChannel } from "@/lib/realtime/mobileSignal";
import { isPhoneUserAgent } from "@/lib/isPhoneUserAgent";
import { IS_PHONE_COOKIE } from "@/lib/constants";
import { getCookie } from "@/utils/getCookie";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { ArrowRight, Monitor, MonitorSmartphone, QrCode, Smartphone } from "lucide-react";

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
  // Role: null while UA hasn't been read yet (SSR / first render); resolved to
  // true/false after mount. Gates the QR token fetch so phones don't burn a
  // demo credit on a step that's meant for desktop.
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    // Prefer the middleware's verdict (stamped on every page response) so this
    // UI can never disagree with the /mobile routing rule about the same device.
    // Fall back to navigator.userAgent only if the cookie is somehow missing
    // (e.g. the page was served before middleware was deployed, or a stale tab).
    const stamped = getCookie(IS_PHONE_COOKIE);
    if (stamped === "1" || stamped === "0") {
      setIsMobileDevice(stamped === "1");
    } else {
      setIsMobileDevice(isPhoneUserAgent(navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    if (isMobileDevice === null) return;
    if (isMobileDevice) {
      setIsLoading(false);
      return;
    }

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
  }, [onContinue, isMobileDevice]);

  // Layer 3: phone-class device landed on the desktop QR step — redirect them
  // verbally rather than rendering an unscannable QR code at their own screen.
  if (isMobileDevice) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/40 p-6">
        <div className="w-full max-w-md space-y-5 rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <MonitorSmartphone className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              This step is meant for your desktop
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Open <span className="font-semibold text-gray-900">cidien.ca</span> on a computer,
              then use your phone to scan the QR code it shows you. The two screens work together
              to demo Cidien&apos;s charting flow.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || isMobileDevice === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/40">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-lg text-gray-700">Preparing nurse QR code...</p>
        </div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/40 p-6">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-red-700">QR step failed</h2>
          <p className="text-sm text-gray-700">{error}</p>
          <Button onClick={onContinue}>Skip to dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/40">
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-6 md:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
            <QrCode className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Step 2 of 3</p>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Mobile Charting Device</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 md:px-8">
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100">
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
            You&apos;re on desktop - perfect
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Now grab your phone and scan this code to start charting
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 md:text-base">
            You&apos;ll sign in as{" "}
            <span className="font-semibold text-gray-900">{token.staffName}</span> at{" "}
            <span className="font-semibold text-gray-900">{token.hospitalName}</span>. Once your
            phone connects, this screen turns into the live charting dashboard.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[320px,1fr] lg:items-start">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-xl border-2 border-emerald-200 bg-white p-4">
                <QRCodeSVG
                  value={mobileUrl}
                  size={220}
                  level="M"
                  includeMargin={false}
                />
              </div>
              {!scanned && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                  <span>Waiting for phone to connect...</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {scanned ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-lg font-semibold text-emerald-700">Phone connected!</p>
                  <p className="mt-1 text-sm text-emerald-800/80">Redirecting to dashboard...</p>
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-emerald-600" />
                      <p className="text-sm font-semibold text-gray-900">Session details</p>
                    </div>
                    <div className="space-y-2 text-sm">
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
                  </div>
                  <p className="text-sm text-gray-600">
                    If you do not have a phone available right now, you can continue and access the dashboard directly.
                  </p>
                  <Button variant="outline" onClick={onContinue}>
                    Skip to dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {!scanned && (
          <div className="flex justify-end">
            <Button onClick={onContinue}>
              Continue to dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
