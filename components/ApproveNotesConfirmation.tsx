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
import { Loader2 } from "lucide-react";

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
  const hasMultipleTargets = previewTargets.length > 1;

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent className="max-w-lg max-h-[85vh] flex flex-col">
        <AlertDialogHeaderComponent>
          <AlertDialogTitleComponent>Approve pending notes</AlertDialogTitleComponent>
        </AlertDialogHeaderComponent>
        <div className="space-y-3 text-left text-sm text-gray-600 px-1">
          <p>
            Filter: <span className="font-medium text-gray-800">{room}</span>
            {bed && bed !== "ALL" ? (
              <>
                {" "}
                · Bed <span className="font-medium text-gray-800">{bed}</span>
              </>
            ) : null}
          </p>

          {previewLoading ? (
            <div className="flex items-center gap-2 py-6 text-gray-700">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
              Finding rooms and beds with pending notes…
            </div>
          ) : hasMultipleTargets ? (
            <>
              <p className="text-gray-800 font-medium">
                The following room and bed pairs will be approved. A separate PDF export will be created for each pair.
                This cannot be undone.
              </p>
              <ul className="max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 py-2 px-3 space-y-2 list-none">
                {previewTargets.map((t) => (
                  <li key={`${t.roomNumber}-${t.bedLetter}`} className="text-sm text-gray-800">
                    <span className="font-medium">Room {t.roomNumber}</span>,{" "}
                    <span className="font-medium">Bed {t.bedLetter}</span>
                    <span className="text-gray-500"> — {t.pendingCount} note{t.pendingCount === 1 ? "" : "s"}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : previewTargets.length === 1 ? (
            <p>
              Approve <span className="font-semibold text-gray-900">{previewTargets[0].pendingCount}</span> pending note
              {previewTargets[0].pendingCount === 1 ? "" : "s"} for{" "}
              <span className="font-medium text-gray-900">
                Room {previewTargets[0].roomNumber}, Bed {previewTargets[0].bedLetter}
              </span>
              . This cannot be undone.
            </p>
          ) : (
            <p>No pending notes in scope.</p>
          )}
        </div>
        <AlertDialogFooterComponent>
          <AlertDialogCancelComponent onClick={onCancel}>Cancel</AlertDialogCancelComponent>
          <AlertDialogActionComponent
            onClick={onConfirm}
            disabled={previewLoading || previewTargets.length === 0}
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
          >
            Approve notes
          </AlertDialogActionComponent>
        </AlertDialogFooterComponent>
      </AlertDialogContent>
    </AlertDialog>
  );
}
