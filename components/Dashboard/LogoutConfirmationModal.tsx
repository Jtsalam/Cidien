"use client";

import { Dialog,
        DialogContent,
        DialogTitle,
        DialogDescription,
        DialogHeader,
        DialogFooter,
     } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type LogoutConfirmationModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function LogoutConfirmationModal({
  open,
  onCancel,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
            Are you sure you want to log out?
        </DialogTitle>
    </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button className="hover:bg-[#e8e8e8]" variant="outline" onClick={onCancel}>
            No
          </Button>
          <Button
            variant="destructive"
            className="bg-[#6d8a55] hover:bg-[#5c784a] text-white"
            onClick={onConfirm}
            >
            Yes
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}