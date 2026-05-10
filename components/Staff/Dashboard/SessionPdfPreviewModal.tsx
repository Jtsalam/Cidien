"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

const DEFAULT_DOWNLOAD_NAME = "session-approved-notes.pdf";

type SessionPdfPreviewModalProps = {
  pdfUrl: string | null;
  onClose: () => void;
  title?: string;
};

/**
 * Full-screen modal: iframe preview of a signed Supabase PDF URL + download (blob fallback).
 */
export default function SessionPdfPreviewModal({
  pdfUrl,
  onClose,
  title = "Session Export PDF",
}: SessionPdfPreviewModalProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!pdfUrl) return;
    setDownloading(true);
    try {
      const res = await fetch(pdfUrl);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const obj = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = obj;
      a.download = DEFAULT_DOWNLOAD_NAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(obj);
    } catch {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = DEFAULT_DOWNLOAD_NAME;
      a.rel = "noopener noreferrer";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setDownloading(false);
    }
  }, [pdfUrl]);

  if (!pdfUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-pdf-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-5xl h-[90vh] max-h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden">
        <div className="flex justify-between items-center gap-3 p-4 border-b shrink-0">
          <h2 id="session-pdf-modal-title" className="text-lg font-semibold text-gray-900 truncate pr-2">
            {title}
          </h2>
          <div className="flex gap-2 shrink-0">
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={downloading}
              onClick={() => void handleDownload()}
            >
              {downloading ? "Preparing…" : "Download"}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <iframe src={pdfUrl} className="flex-1 w-full min-h-0 border-0 bg-gray-100" title={title} />
      </div>
    </div>
  );
}
