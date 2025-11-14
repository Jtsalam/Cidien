"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader as AlertDialogHeaderComponent,
  AlertDialogFooter as AlertDialogFooterComponent,
  AlertDialogTitle as AlertDialogTitleComponent,
  AlertDialogDescription as AlertDialogDescriptionComponent,
  AlertDialogAction as AlertDialogActionComponent,
  AlertDialogCancel as AlertDialogCancelComponent,
} from "@/components/ui/alert-dialog"

type ApproveNotesModalProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void | Promise<void>
  room: string
  bed?: string   // <-- new
}

export default function ApproveNotesModal({
  open,
  onCancel,
  onConfirm,
  room,
  bed,
}: ApproveNotesModalProps) {
  // Determine the description based on filter
  const description = "Are you sure you want to approve these notes? This action cannot be undone.";
  const pdfInfo = "";
  
  // if (room === "All rooms") {
  //   pdfInfo = " A separate PDF chart will be generated for each bed across all rooms with notes.";
  // } else if (bed === "ALL" || !bed) {
  //   pdfInfo = " A separate PDF chart will be generated for each bed with notes in this room.";
  // } else {
  //   pdfInfo = " A PDF chart will be generated for this bed.";
  // }

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeaderComponent>
          <AlertDialogTitleComponent>
            Approve Notes for {room}
            {bed && bed !== "ALL" ? `, Bed ${bed}` : ""} 
          </AlertDialogTitleComponent>
          <AlertDialogDescriptionComponent>
            {description}
            {pdfInfo && (
              <span className="block mt-2 text-sm text-emerald-600 font-medium">
                {pdfInfo}
              </span>
            )}
          </AlertDialogDescriptionComponent>
        </AlertDialogHeaderComponent>
        <AlertDialogFooterComponent>
          <AlertDialogCancelComponent onClick={onCancel}>Cancel</AlertDialogCancelComponent>
          <AlertDialogActionComponent onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            Approve Notes
          </AlertDialogActionComponent>
        </AlertDialogFooterComponent>
      </AlertDialogContent>
    </AlertDialog>
  )
}