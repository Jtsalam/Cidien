"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import OnboardingShell from "./OnboardingShell";
import {
  AlertTriangle,
  ArrowRight,
  BedDouble,
  Building2,
  ChevronDown,
  Hash,
  RefreshCw,
  Stethoscope,
  UserCircle,
  Users,
} from "lucide-react";

/** Counts from 0 up to `value` once on mount; non-numbers render as-is. */
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!Number.isFinite(value) || value <= 0) {
      setShown(value);
      return;
    }
    let frame = 0;
    const started = performance.now();
    const duration = 700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{shown}</>;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

type Bed = {
  bedLabel: string;
  patientName: string;
};

type AssignedRoom = {
  roomNumber: number;
  beds: Bed[];
};

type StaffPreview = {
  nurseName: string;
  staffId: string;
  assignedRooms: AssignedRoom[];
};

type HospitalOverview = {
  hospitalName: string;
  adminName: string;
  adminId: string;
  nurseCount: number;
  roomCount: number;
  staff: StaffPreview[];
};

type Props = {
  onContinue: () => void;
};

export default function HospitalOverviewStep({ onContinue }: Props) {
  const [overview, setOverview] = useState<HospitalOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingHospital, setIsChangingHospital] = useState(false);
  const [expandedStaff, setExpandedStaff] = useState<string | null>(null);

  const noStaffAssigned = useMemo(
    () => overview && overview.staff.length === 0,
    [overview],
  );

  const loadOverview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/demo/hospital-overview", {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load hospital overview.");
      }
      setOverview(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error.";
      setError(message);
      setOverview(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadOverview();
  }, []);

  const handleChangeHospital = async () => {
    setIsChangingHospital(true);
    setError(null);
    try {
      const response = await fetch("/api/demo/hospital-overview", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to change hospital.");
      }
      await loadOverview();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error.";
      setError(message);
    } finally {
      setIsChangingHospital(false);
    }
  };

  const toggleStaffExpanded = (staffId: string) => {
    setExpandedStaff((current) => (current === staffId ? null : staffId));
  };

  if (isLoading) {
    return (
      <OnboardingShell step={0}>
        <div className="space-y-6" aria-busy="true" aria-label="Loading hospital overview">
          <div className="rounded-3xl bg-emerald-950 p-8">
            <Skeleton className="h-4 w-32 bg-none bg-white/10" />
            <Skeleton className="mt-4 h-9 w-2/3 max-w-md bg-none bg-white/10" />
            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-white/[0.06]" />
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-900/[0.07] bg-white p-6 shadow-card">
            <Skeleton className="h-5 w-40" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-900/[0.06] p-4">
                <Skeleton className="h-11 w-11 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </OnboardingShell>
    );
  }

  if (error || !overview) {
    return (
      <OnboardingShell step={0}>
        <div className="mx-auto mt-10 max-w-lg animate-fade-up rounded-3xl border border-slate-900/[0.07] bg-white p-8 text-center shadow-card">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 ring-8 ring-amber-50/50">
            <AlertTriangle className="h-6 w-6 text-amber-600" aria-hidden />
          </span>
          <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-900">We couldn&apos;t load the demo hospital</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{error ?? "Unknown loading issue."}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => void loadOverview()}>
              <RefreshCw aria-hidden />
              Try again
            </Button>
            <Button variant="outline" onClick={onContinue}>
              Continue to dashboard
            </Button>
          </div>
        </div>
      </OnboardingShell>
    );
  }

  const figures = [
    { label: "Admin", value: overview.adminName, Icon: UserCircle },
    { label: "Admin ID", value: overview.adminId, Icon: Hash, mono: true },
    { label: "Nurses", value: overview.nurseCount, Icon: Users, count: true },
    { label: "Rooms", value: overview.roomCount, Icon: BedDouble, count: true },
  ];

  return (
    <OnboardingShell
      step={0}
      footer={
        <>
          <Button variant="ghost" onClick={handleChangeHospital} disabled={isChangingHospital} className="text-gray-600">
            <RefreshCw className={isChangingHospital ? "animate-spin" : ""} aria-hidden />
            {isChangingHospital ? "Finding another hospital…" : "Try a different hospital"}
          </Button>
          <Button size="lg" onClick={onContinue} className="group">
            Continue
            <ArrowRight className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5" aria-hidden />
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Hero: one flat dark panel, the hospital and its four figures. */}
        <section className="relative isolate animate-fade-up overflow-hidden rounded-3xl bg-emerald-950 p-6 text-white shadow-[0_30px_60px_-30px_rgb(2_44_34/0.6)] sm:p-8">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_left,black,transparent_70%)]" />

          <p className="flex items-center gap-2 text-sm font-medium text-emerald-300">
            <Building2 className="h-4 w-4" aria-hidden />
            Your demo hospital
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{overview.hospitalName}</h1>
          <p className="mt-2 max-w-xl text-emerald-100/75">
            Here&apos;s the team you&apos;ll chart with. Have a look, then connect your phone.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {figures.map(({ label, value, Icon, mono, count }, i) => (
              <div
                key={label}
                className="animate-fade-up rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10 backdrop-blur-sm"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-200/70">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </div>
                <p
                  className={`mt-2 truncate font-semibold ${count ? "text-3xl tabular-nums" : "text-lg"} ${mono ? "font-mono" : ""}`}
                  title={String(value)}
                >
                  {count && typeof value === "number" ? <CountUp value={value} /> : value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Staff */}
        <section className="animate-fade-up rounded-3xl border border-slate-900/[0.07] bg-white p-5 shadow-card [animation-delay:120ms] sm:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">Nursing team</h2>
            <p className="text-sm text-gray-500">
              {overview.staff.length} {overview.staff.length === 1 ? "nurse" : "nurses"} with assignments
            </p>
          </div>

          {noStaffAssigned ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-900/15 py-12 text-center">
              <Stethoscope className="mx-auto mb-3 h-10 w-10 text-gray-300" aria-hidden />
              <p className="text-gray-600">No staff assignments found.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {overview.staff.map((staffMember) => {
                const isExpanded = expandedStaff === staffMember.staffId;
                const bedCount = staffMember.assignedRooms.reduce((n, r) => n + r.beds.length, 0);
                return (
                  <li
                    key={staffMember.staffId}
                    className={`overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ease-settle ${
                      isExpanded ? "border-emerald-200 bg-emerald-50/40" : "border-slate-900/[0.07] hover:border-slate-900/[0.12] hover:bg-gray-50/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleStaffExpanded(staffMember.staffId)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center gap-4 p-4 text-left"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-semibold text-white shadow-[0_4px_12px_-4px_rgb(5_150_105/0.6)]">
                        {initials(staffMember.nurseName)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-gray-900">{staffMember.nurseName}</span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-gray-500">
                          <span className="font-mono">{staffMember.staffId}</span>
                          <span aria-hidden>·</span>
                          <span>
                            {staffMember.assignedRooms.length} room{staffMember.assignedRooms.length !== 1 ? "s" : ""}, {bedCount} bed
                            {bedCount !== 1 ? "s" : ""}
                          </span>
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ease-settle ${isExpanded ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>

                    {isExpanded && staffMember.assignedRooms.length > 0 && (
                      <div className="grid animate-in gap-2 px-4 pb-4 fade-in-0 slide-in-from-top-1 duration-200 sm:grid-cols-2 lg:grid-cols-3">
                        {staffMember.assignedRooms.map((room) => (
                          <div
                            key={`${staffMember.staffId}-${room.roomNumber}`}
                            className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-900/[0.06]"
                          >
                            <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                              <BedDouble className="h-4 w-4 text-emerald-600" aria-hidden />
                              Room {room.roomNumber}
                            </p>
                            <ul className="mt-2 space-y-1.5">
                              {room.beds.map((bed) => (
                                <li key={`${room.roomNumber}-${bed.bedLabel}`} className="flex items-center gap-2 text-sm">
                                  <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">
                                    {bed.bedLabel}
                                  </span>
                                  <span className="truncate text-gray-700">{bed.patientName}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </OnboardingShell>
  );
}
