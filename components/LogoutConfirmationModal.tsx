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
import { LogOut, AlertCircle } from "lucide-react"

type LogoutConfirmationModalProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void | Promise<void>
}

export default function LogoutConfirmationModal({ open, onCancel, onConfirm }: LogoutConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <LogOut className="w-8 h-8 text-red-600" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-xl font-semibold text-gray-900">Confirm Logout</DialogTitle>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Are you sure you want to log out of your account? You&apos;ll need to sign in again to access your dashboard.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2 py-4">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <p className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-md">Any unsaved changes will be lost</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto order-2 sm:order-1 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full sm:w-auto order-1 sm:order-2 bg-red-600 hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}