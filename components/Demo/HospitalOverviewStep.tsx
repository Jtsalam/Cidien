"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

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
  // Role: Drive the first dashboard step UI for demo users with hospital/staff preview.
  const [overview, setOverview] = useState<HospitalOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingHospital, setIsChangingHospital] = useState(false);

  const noStaffAssigned = useMemo(
    () => overview && overview.staff.length === 0,
    [overview],
  );

  const loadOverview = async () => {
    // Role: Fetch the current demo hospital summary for this first-step screen.
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
    // Role: Rotate to a new random hospital while keeping the same demo session.
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-700">Loading hospital overview...</div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-xl w-full rounded-2xl border border-red-200 bg-white p-6 shadow-sm space-y-4">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-emerald-700 font-medium">Step 1: Hospital Overview</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            {overview.hospitalName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-500">Admin Name</p>
              <p className="font-semibold text-gray-900">{overview.adminName}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-500">Admin ID</p>
              <p className="font-semibold text-gray-900">{overview.adminId}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-500">Number of Nurses</p>
              <p className="font-semibold text-gray-900">{overview.nurseCount}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-500">Number of Rooms</p>
              <p className="font-semibold text-gray-900">{overview.roomCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Nurses / Staff Preview (3)</h2>
          <p className="text-sm text-gray-600 mt-1">
            Expand any room to view assigned beds and patients.
          </p>

          {noStaffAssigned ? (
            <p className="mt-4 text-sm text-gray-600">No staff assignments found.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {overview.staff.map((staffMember) => (
                <div key={staffMember.staffId} className="border rounded-xl p-4">
                  <p className="font-semibold text-gray-900">{staffMember.nurseName}</p>
                  <p className="text-sm text-gray-600 mb-3">Staff ID: {staffMember.staffId}</p>
                  {staffMember.assignedRooms.length === 0 ? (
                    <p className="text-sm text-gray-500">No rooms currently assigned.</p>
                  ) : (
                    <div className="space-y-2">
                      {staffMember.assignedRooms.map((room) => (
                        <details key={`${staffMember.staffId}-${room.roomNumber}`} className="group">
                          <summary className="cursor-pointer text-sm font-medium text-emerald-700">
                            Assigned Room: {room.roomNumber}
                          </summary>
                          <ul className="mt-2 space-y-1 text-sm text-gray-700">
                            {room.beds.map((bed) => (
                              <li key={`${room.roomNumber}-${bed.bedLabel}`}>
                                {bed.bedLabel}: {bed.patientName}
                              </li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleChangeHospital} disabled={isChangingHospital}>
              {isChangingHospital ? "Changing hospital..." : "Change Hospital"}
            </Button>
            <Button variant="outline" onClick={onContinue}>
              Continue to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
