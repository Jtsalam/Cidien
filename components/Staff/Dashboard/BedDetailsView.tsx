"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SessionPdfPreviewModal from "./SessionPdfPreviewModal";
import { toast } from "sonner";

interface ArchiveRow {
  index: number;
  exportId: string;
  created_date: string;
  created_time: string;
  displayName: string;
}

interface BedDetailsViewProps {
  roomNumber: string;
  bedLetter: string;
  onBack: () => void;
}

const BedDetailsView: React.FC<BedDetailsViewProps> = ({ roomNumber, bedLetter, onBack }) => {
  const [archives, setArchives] = useState<ArchiveRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionPdfPreviewUrl, setSessionPdfPreviewUrl] = useState<string | null>(null);
  const [openingExportId, setOpeningExportId] = useState<string | null>(null);

  const openExportPreview = useCallback(async (exportId: string) => {
    setOpeningExportId(exportId);
    try {
      const linkRes = await fetch(`/api/staff/pdf?exportId=${encodeURIComponent(exportId)}`);
      const body = (await linkRes.json()) as { signedUrl?: string; error?: string };
      if (!linkRes.ok || !body.signedUrl) {
        throw new Error(body.error || "Could not open PDF.");
      }
      setSessionPdfPreviewUrl(body.signedUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not open PDF.");
    } finally {
      setOpeningExportId(null);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/staff/approved-notes?room=${encodeURIComponent(roomNumber)}&bed=${encodeURIComponent(bedLetter)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load archive");
        }

        const data = (await response.json()) as {
          archives?: ArchiveRow[];
        };
        setArchives(data.archives || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [roomNumber, bedLetter]);

  return (
    <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-lg py-1 pr-2 font-medium text-emerald-700 transition-colors hover:text-emerald-900"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Archive
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" aria-hidden />
        <span>Room {roomNumber}</span>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" aria-hidden />
        <span className="font-medium text-gray-900">Bed {bedLetter}</span>
      </nav>

      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-bold text-white shadow-[0_8px_20px_-8px_rgb(5_150_105/0.7)]">
          {bedLetter}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Room {roomNumber} · Bed {bedLetter}
          </h1>
          <p className="mt-0.5 text-gray-600">Each report is one approval. Open it to preview or download.</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-label="Loading reports">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-900/[0.07] bg-white p-4 shadow-card">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      ) : error || archives.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-slate-900/[0.07] bg-white px-6 py-16 text-center shadow-card">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-8 ring-emerald-50/50">
            <FileText className="h-7 w-7 text-emerald-600" aria-hidden />
          </span>
          <p className="mt-5 text-lg font-semibold text-gray-900">{error ? "We couldn't load this archive" : "No reports yet"}</p>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {error ?? "Approve notes for this bed from Live notes and the PDF report will be filed here."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {archives.map((row, i) => {
            const opening = openingExportId === row.exportId;
            return (
              <li key={row.exportId} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                <button
                  type="button"
                  disabled={opening}
                  onClick={() => void openExportPreview(row.exportId)}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-slate-900/[0.07] bg-white p-4 text-left shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-settle hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-card-hover disabled:opacity-70"
                >
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <FileText className="h-5 w-5" aria-hidden />
                    <span className="absolute -bottom-1 -right-1 rounded bg-red-500 px-1 text-[9px] font-bold text-white">PDF</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-gray-900">{row.displayName}</span>
                    <span className="mt-0.5 block text-sm text-gray-500">
                      Approved {row.created_date} · {row.created_time}
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors group-hover:bg-emerald-50 sm:inline-flex">
                    {opening ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                    {opening ? "Opening…" : "Open"}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 sm:hidden" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <SessionPdfPreviewModal pdfUrl={sessionPdfPreviewUrl} onClose={() => setSessionPdfPreviewUrl(null)} />
    </div>
  );
};

export default BedDetailsView;
