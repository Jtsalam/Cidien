"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

type LogoutConfirmationModalProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void | Promise<void>
}

export default function LogoutConfirmationModal({ open, onCancel, onConfirm }: LogoutConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center space-y-3 text-center sm:text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-8 ring-red-50/50">
            <LogOut className="h-5 w-5" aria-hidden />
          </span>
          <DialogTitle className="text-lg font-bold tracking-tight text-gray-900">Log out of Cidien?</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-gray-500">
            You&apos;ll need to start the demo again to get back to this dashboard. Anything you haven&apos;t saved will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 flex-col-reverse gap-2 sm:flex-row sm:space-x-0">
          <Button variant="outline" onClick={onCancel} className="w-full">
            Stay
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="w-full">
            <LogOut aria-hidden />
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
