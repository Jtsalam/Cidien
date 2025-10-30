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
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeaderComponent>
          <AlertDialogTitleComponent>
            Approve Notes for {room}
            {bed && bed !== "ALL" ? `, bed ${bed}` : ""} 
          </AlertDialogTitleComponent>
          <AlertDialogDescriptionComponent>
            Are you sure you want to approve these notes? This action cannot be undone.
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
