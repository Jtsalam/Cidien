"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader as AlertDialogHeaderComponent,
  AlertDialogFooter as AlertDialogFooterComponent,
  AlertDialogTitle as AlertDialogTitleComponent,
  AlertDialogAction as AlertDialogActionComponent,
  AlertDialogCancel as AlertDialogCancelComponent,
} from "@/components/ui/alert-dialog";
import { CheckCheck, DoorOpen, FileText, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type ApprovePreviewTarget = {
  roomNumber: number;
  bedLetter: string;
  pendingCount: number;
};

type ApproveNotesModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  room: string;
  bed?: string;
  previewTargets: ApprovePreviewTarget[];
  previewLoading: boolean;
};

export default function ApproveNotesModal({
  open,
  onCancel,
  onConfirm,
  room,
  bed,
  previewTargets,
  previewLoading,
}: ApproveNotesModalProps) {
  const total = previewTargets.reduce((n, t) => n + t.pendingCount, 0);

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent className="flex max-h-[85vh] max-w-lg flex-col gap-0 p-0">
        <AlertDialogHeaderComponent className="flex-row items-start gap-4 space-y-0 p-6 pb-4 text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCheck className="h-5 w-5" aria-hidden />
          </span>
          <div className="space-y-1">
            <AlertDialogTitleComponent className="text-lg font-bold tracking-tight text-gray-900">
              {previewLoading ? "Approve notes" : `Approve ${total} note${total === 1 ? "" : "s"}`}
            </AlertDialogTitleComponent>
            <p className="text-sm text-gray-500">
              {room}
              {bed && bed !== "ALL" ? ` · Bed ${bed}` : ""}
            </p>
          </div>
        </AlertDialogHeaderComponent>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-5">
          {previewLoading ? (
            <div className="space-y-2" aria-busy="true">
              <p className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-600" aria-hidden />
                Finding beds with pending notes…
              </p>
              {[0, 1].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : previewTargets.length === 0 ? (
            <p className="text-sm text-gray-600">No pending notes in scope.</p>
          ) : (
            <ul className="space-y-2">
              {previewTargets.map((t) => (
                <li
                  key={`${t.roomNumber}-${t.bedLetter}`}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 ring-1 ring-inset ring-slate-900/[0.05]"
                >
                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-slate-900/[0.06]">
                    <DoorOpen className="h-3 w-3" aria-hidden />
                    {t.roomNumber} · {t.bedLetter}
                  </span>
                  <span className="flex-1 text-sm text-gray-700">
                    Room {t.roomNumber}, Bed {t.bedLetter}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-emerald-800">
                    {t.pendingCount} note{t.pendingCount === 1 ? "" : "s"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {!previewLoading && previewTargets.length > 0 && (
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-gray-500">
              <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              {previewTargets.length > 1
                ? "A separate PDF report is filed in the Archive for each bed. This can't be undone."
                : "A PDF report is filed in the Archive for this bed. This can't be undone."}
            </p>
          )}
        </div>

        <AlertDialogFooterComponent className="gap-2 border-t border-slate-900/[0.06] bg-gray-50/60 px-6 py-4 sm:space-x-0 sm:rounded-b-2xl">
          <AlertDialogCancelComponent onClick={onCancel} className="mt-0">
            Cancel
          </AlertDialogCancelComponent>
          <AlertDialogActionComponent onClick={onConfirm} disabled={previewLoading || previewTargets.length === 0}>
            <CheckCheck aria-hidden />
            Approve{total ? ` ${total}` : ""}
          </AlertDialogActionComponent>
        </AlertDialogFooterComponent>
      </AlertDialogContent>
    </AlertDialog>
  );
}
