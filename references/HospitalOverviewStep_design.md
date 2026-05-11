"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  BedDouble,
  UserCircle,
  ChevronRight,
  RefreshCw,
  ArrowRight,
  Stethoscope,
  Hash,
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
    [overview]
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
      const response = await fetch("/api/demo/hospital-overview", {
        method: "POST",
      });
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
    setExpandedStaff(expandedStaff === staffId ? null : staffId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-muted-foreground font-medium">
            Loading hospital overview...
          </p>
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-xl w-full border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                !
              </span>
              Unable to load demo step
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {error ?? "Unknown loading issue."}
            </p>
            <div className="flex gap-3">
              <Button onClick={() => void loadOverview()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <Button variant="outline" onClick={onContinue}>
                Continue to dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-wider">
                Step 1 of 3
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Hospital Overview
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Hospital Name Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
            {overview.hospitalName}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Review your hospital details and staff assignments below
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Admin
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {overview.adminName}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Hash className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Admin ID
                  </p>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    {overview.adminId}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Nurses
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {overview.nurseCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BedDouble className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Rooms
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {overview.roomCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Staff Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Staff Preview
              </h3>
              <p className="text-sm text-muted-foreground">
                {overview.staff.length} staff members with room assignments
              </p>
            </div>
          </div>

          {noStaffAssigned ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  No staff assignments found.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {overview.staff.map((staffMember) => {
                const isExpanded = expandedStaff === staffMember.staffId;
                return (
                  <Card
                    key={staffMember.staffId}
                    className={`border-0 shadow-sm transition-all duration-200 ${
                      isExpanded ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleStaffExpanded(staffMember.staffId)}
                        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-lg">
                              {staffMember.nurseName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {staffMember.nurseName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ID: {staffMember.staffId} •{" "}
                              {staffMember.assignedRooms.length} room
                              {staffMember.assignedRooms.length !== 1
                                ? "s"
                                : ""}{" "}
                              assigned
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && staffMember.assignedRooms.length > 0 && (
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t pt-4 space-y-3">
                            {staffMember.assignedRooms.map((room) => (
                              <div
                                key={`${staffMember.staffId}-${room.roomNumber}`}
                                className="bg-muted/50 rounded-lg p-4"
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <BedDouble className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-foreground">
                                    Room {room.roomNumber}
                                  </span>
                                  <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
                                    {room.beds.length} bed
                                    {room.beds.length !== 1 ? "s" : ""}
                                  </span>
                                </div>
                                <div className="grid gap-2">
                                  {room.beds.map((bed) => (
                                    <div
                                      key={`${room.roomNumber}-${bed.bedLabel}`}
                                      className="flex items-center gap-3 text-sm"
                                    >
                                      <span className="text-muted-foreground w-16">
                                        {bed.bedLabel}
                                      </span>
                                      <span className="text-foreground">
                                        {bed.patientName}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleChangeHospital}
            disabled={isChangingHospital}
            className="sm:order-1"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isChangingHospital ? "animate-spin" : ""}`}
            />
            {isChangingHospital ? "Changing..." : "Change Hospital"}
          </Button>
          <Button onClick={onContinue} className="sm:order-2">
            Continue to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </main>
    </div>
  );
}
