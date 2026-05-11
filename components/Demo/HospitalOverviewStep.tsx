"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BedDouble,
  Building2,
  ChevronRight,
  Hash,
  RefreshCw,
  Stethoscope,
  UserCircle,
  Users,
} from "lucide-react";

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/40">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="font-medium text-gray-600">Loading hospital overview...</p>
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/40 p-6">
        <div className="w-full max-w-xl space-y-4 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-red-700">Unable to load demo step</h2>
          <p className="text-sm text-gray-700">{error ?? "Unknown loading issue."}</p>
          <div className="flex gap-3">
            <Button onClick={() => void loadOverview()}>Retry</Button>
            <Button variant="outline" onClick={onContinue}>
              Continue to dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/40">
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-6 md:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Step 1 of 3</p>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Hospital Overview</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{overview.hospitalName}</h2>
          <p className="mt-2 text-gray-600">
            Review your hospital details and staff assignments before continuing to the dashboard.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <UserCircle className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Admin</p>
              <p className="font-semibold text-gray-900">{overview.adminName}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Hash className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Admin ID</p>
              <p className="font-mono font-semibold text-gray-900">{overview.adminId}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Users className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Nurses</p>
              <p className="text-2xl font-bold text-gray-900">{overview.nurseCount}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <BedDouble className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{overview.roomCount}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Staff Preview</h2>
          <p className="mt-1 text-sm text-gray-600">
            {overview.staff.length} staff members with room assignments
          </p>

          {noStaffAssigned ? (
            <div className="mt-5 rounded-xl border border-dashed border-gray-300 py-12 text-center">
              <Stethoscope className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-gray-600">No staff assignments found.</p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {overview.staff.map((staffMember) => {
                const isExpanded = expandedStaff === staffMember.staffId;
                return (
                  <div
                    key={staffMember.staffId}
                    className={`rounded-xl border transition-all ${
                      isExpanded ? "border-emerald-200 bg-emerald-50/40" : "border-gray-200 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => toggleStaffExpanded(staffMember.staffId)}
                      className="flex w-full items-center justify-between rounded-xl p-5 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                          <span className="text-lg font-semibold text-emerald-700">{staffMember.nurseName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{staffMember.nurseName}</p>
                          <p className="text-sm text-gray-600">
                            ID: {staffMember.staffId} - {staffMember.assignedRooms.length} room
                            {staffMember.assignedRooms.length !== 1 ? "s" : ""} assigned
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>

                    {isExpanded && staffMember.assignedRooms.length > 0 && (
                      <div className="px-5 pb-5">
                        <div className="space-y-3 border-t pt-4">
                          {staffMember.assignedRooms.map((room) => (
                            <div key={`${staffMember.staffId}-${room.roomNumber}`} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                              <div className="mb-3 flex items-center gap-2">
                                <BedDouble className="h-4 w-4 text-emerald-600" />
                                <span className="font-medium text-gray-900">Room {room.roomNumber}</span>
                                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-gray-500">
                                  {room.beds.length} bed{room.beds.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {room.beds.map((bed) => (
                                  <div key={`${room.roomNumber}-${bed.bedLabel}`} className="flex items-center gap-3 text-sm">
                                    <span className="w-16 text-gray-500">{bed.bedLabel}</span>
                                    <span className="text-gray-900">{bed.patientName}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={handleChangeHospital} disabled={isChangingHospital}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isChangingHospital ? "animate-spin" : ""}`} />
              {isChangingHospital ? "Changing..." : "Change Hospital"}
            </Button>
            <Button onClick={onContinue}>
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
