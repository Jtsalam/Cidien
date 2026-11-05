"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { subscribeMobileConnected, unsubscribeChannel } from "@/lib/realtime/mobileSignal";
import { isPhoneUserAgent } from "@/lib/isPhoneUserAgent";
import { IS_PHONE_COOKIE } from "@/lib/constants";
import { getCookie } from "@/utils/getCookie";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { ArrowRight, Camera, Check, MonitorSmartphone, RefreshCw, ScanLine, Smartphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import OnboardingShell from "./OnboardingShell";

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
      <OnboardingShell step={1}>
        <div className="mx-auto mt-6 max-w-md animate-fade-up rounded-3xl border border-slate-900/[0.07] bg-white p-7 text-center shadow-card">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-8 ring-emerald-50/50">
            <MonitorSmartphone className="h-7 w-7 text-emerald-600" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">This step is meant for your desktop</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Open <span className="font-semibold text-gray-900">cidien.ca</span> on a computer, then use your phone to
            scan the QR code it shows you. The two screens work together to demo Cidien&apos;s charting flow.
          </p>
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back to home
          </Button>
        </div>
      </OnboardingShell>
    );
  }

  if (isLoading || isMobileDevice === null) {
    return (
      <OnboardingShell step={1}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]" aria-busy="true" aria-label="Preparing QR code">
          <div className="flex flex-col items-center rounded-3xl border border-slate-900/[0.07] bg-white p-8 shadow-card">
            <Skeleton className="h-[244px] w-[244px] rounded-2xl" />
            <Skeleton className="mt-6 h-8 w-48 rounded-full" />
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-900/[0.07] bg-white p-8 shadow-card">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </OnboardingShell>
    );
  }

  if (error || !token) {
    return (
      <OnboardingShell step={1}>
        <div className="mx-auto mt-6 max-w-md animate-fade-up rounded-3xl border border-slate-900/[0.07] bg-white p-7 text-center shadow-card">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 ring-8 ring-amber-50/50">
            <ScanLine className="h-7 w-7 text-amber-600" aria-hidden />
          </span>
          <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-900">We couldn&apos;t create your QR code</h2>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => {
                window.location.reload();
              }}
            >
              <RefreshCw aria-hidden />
              Try again
            </Button>
            <Button onClick={onContinue}>Skip to dashboard</Button>
          </div>
        </div>
      </OnboardingShell>
    );
  }

  const steps = [
    { Icon: Camera, title: "Open your phone's camera", body: "No app to install. Any QR scanner works." },
    { Icon: ScanLine, title: "Point it at the code", body: "Tap the link that pops up." },
    {
      Icon: Smartphone,
      title: `You're in as ${token.staffName}`,
      body: "Your phone becomes the charting device. This screen becomes the live dashboard.",
    },
  ];

  return (
    <OnboardingShell step={1}>
      <div className="mb-8 max-w-2xl animate-fade-up">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Connect your phone</h1>
        <p className="mt-2 text-gray-600 md:text-lg">
          Scan the code to sign in as <span className="font-semibold text-gray-900">{token.staffName}</span> at{" "}
          <span className="font-semibold text-gray-900">{token.hospitalName}</span>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* QR card: scanner frame while waiting, a success state once the phone checks in. */}
        <section
          className={`relative flex animate-fade-up flex-col items-center overflow-hidden rounded-3xl border p-8 shadow-card transition-colors duration-500 [animation-delay:60ms] ${
            scanned ? "border-emerald-200 bg-emerald-50/60" : "border-slate-900/[0.07] bg-white"
          }`}
          aria-live="polite"
        >
          {scanned ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <span className="relative flex h-24 w-24 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30 [animation-iteration-count:2]" />
                <span className="relative flex h-24 w-24 animate-pop items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_16px_40px_-12px_rgb(5_150_105/0.7)]">
                  <Check className="h-12 w-12" strokeWidth={2.5} aria-hidden />
                </span>
              </span>
              <p className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Phone connected</p>
              <p className="mt-1 text-gray-600">Signed in as {token.staffName}</p>
              <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full origin-left animate-fill-bar rounded-full bg-emerald-600" />
              </div>
              <p className="mt-2 text-xs text-gray-500">Opening your dashboard…</p>
            </div>
          ) : (
            <>
              <div className="relative p-5">
                {/* Scanner corners */}
                {[
                  "left-0 top-0 border-l-[3px] border-t-[3px] rounded-tl-2xl",
                  "right-0 top-0 border-r-[3px] border-t-[3px] rounded-tr-2xl",
                  "bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-2xl",
                  "bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-2xl",
                ].map((pos) => (
                  <span key={pos} aria-hidden className={`absolute h-10 w-10 border-emerald-500 ${pos}`} />
                ))}
                <div className="relative overflow-hidden rounded-xl bg-white p-3">
                  <QRCodeSVG value={mobileUrl} size={220} level="M" includeMargin={false} />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-[scan_2.6s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-emerald-400/15 to-transparent"
                  />
                </div>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900/[0.04] px-4 py-2 text-sm font-medium text-gray-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Waiting for your phone…
              </p>
            </>
          )}
        </section>

        {/* Instructions */}
        <section className="flex animate-fade-up flex-col rounded-3xl border border-slate-900/[0.07] bg-white p-6 shadow-card [animation-delay:120ms] sm:p-8">
          <ol className="relative space-y-5">
            <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-emerald-200 via-emerald-200 to-transparent" />
            {steps.map(({ Icon, title, body }, i) => {
              const done = scanned;
              return (
                <li key={title} className="relative flex gap-4">
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                      done ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 ring-4 ring-white"
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    {done ? <Check className="h-5 w-5 animate-pop" aria-hidden /> : <Icon className="h-5 w-5" aria-hidden />}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <dl className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-gray-50 p-4 text-sm ring-1 ring-inset ring-slate-900/[0.04]">
            <div className="min-w-0">
              <dt className="text-xs text-gray-500">Nurse</dt>
              <dd className="truncate font-medium text-gray-900">{token.staffName}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-xs text-gray-500">Staff ID</dt>
              <dd className="truncate font-mono font-medium text-gray-900">{token.staffId}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-xs text-gray-500">Hospital</dt>
              <dd className="truncate font-medium text-gray-900" title={token.hospitalName}>
                {token.hospitalName}
              </dd>
            </div>
          </dl>

          {!scanned && (
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-sm">
              <span className="text-gray-500">No phone handy?</span>
              <button
                type="button"
                onClick={onContinue}
                className="group inline-flex items-center gap-1.5 font-medium text-emerald-700 transition-colors hover:text-emerald-800"
              >
                Skip to dashboard
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-settle group-hover:translate-x-0.5" aria-hidden />
              </button>
            </div>
          )}
        </section>
      </div>
    </OnboardingShell>
  );
}
