"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2, X } from "lucide-react";

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
  title = "Approved notes report",
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
      className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4 animate-in fade-in-0 duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-pdf-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-5xl h-[90vh] max-h-[90vh] rounded-2xl shadow-float ring-1 ring-slate-900/[0.06] flex flex-col overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex shrink-0 items-center gap-3 border-b border-slate-900/[0.06] px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <FileText className="h-4 w-4" aria-hidden />
          </span>
          <h2 id="session-pdf-modal-title" className="min-w-0 flex-1 truncate font-semibold text-gray-900">
            {title}
          </h2>
          <Button type="button" disabled={downloading} onClick={() => void handleDownload()}>
            {downloading ? <Loader2 className="animate-spin" aria-hidden /> : <Download aria-hidden />}
            {downloading ? "Preparing…" : "Download"}
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close preview">
            <X aria-hidden />
          </Button>
        </div>
        <iframe src={pdfUrl} className="flex-1 w-full min-h-0 border-0 bg-gray-100" title={title} />
      </div>
    </div>
  );
}
