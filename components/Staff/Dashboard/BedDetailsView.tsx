"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gray-50 animate-in slide-in-from-right duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Assigned Rooms
          </Button>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Room {roomNumber} — Bed {bedLetter}
            </h1>
            <p className="text-gray-600 mt-1">
              Each row is one approval: created date and time are when notes were approved; open the file to
              preview.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-emerald-600" />
            <p className="text-gray-600 mt-4">Loading archive…</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : archives.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No approved PDF exports yet for this bed.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Index
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Created date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Created time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {archives.map((row) => (
                    <tr key={row.exportId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.created_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.created_time}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          type="button"
                          className="text-left text-emerald-700 hover:text-emerald-900 hover:underline font-medium disabled:opacity-50"
                          disabled={openingExportId === row.exportId}
                          onClick={() => void openExportPreview(row.exportId)}
                        >
                          {openingExportId === row.exportId ? "Opening…" : row.displayName}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <SessionPdfPreviewModal
        pdfUrl={sessionPdfPreviewUrl}
        onClose={() => setSessionPdfPreviewUrl(null)}
      />
    </div>
  );
};

export default BedDetailsView;
