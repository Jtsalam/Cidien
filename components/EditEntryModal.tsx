"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bed, Calendar, Clock, DoorOpen, Loader2, Save, User } from "lucide-react"

export type EditEntryModalProps = {
  open: boolean
  date: string
  timestamp: string
  roomNumber?: number | string | null
  bedLetter?: string | null
  patientName?: string | null
  initialNote: string
  saving?: boolean
  onCancel: () => void
  onSave: (note: string) => void | Promise<void>
}

export default function EditEntryModal({
  open,
  date,
  timestamp,
  roomNumber,
  bedLetter,
  patientName,
  initialNote,
  saving = false,
  onCancel,
  onSave,
}: EditEntryModalProps) {
  const [note, setNote] = useState<string>(initialNote)

  // Reset note whenever the modal is opened for a different entry.
  useEffect(() => {
    if (open) setNote(initialNote)
  }, [open, initialNote])

  const hasChanges = note !== initialNote
  const canSave = !saving && hasChanges && note.trim().length > 0

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !saving) onCancel()
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Edit Patient Note
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Update the patient note for this entry. Changes are saved to the
            transcription record.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-gray-500">Date:</span>
            <span className="font-medium text-gray-900">{date || "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-gray-500">Time:</span>
            <span className="font-medium text-gray-900">{timestamp || "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DoorOpen className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-gray-500">Room:</span>
            <span className="font-medium text-gray-900">
              {roomNumber != null && roomNumber !== "" ? roomNumber : "—"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Bed className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-gray-500">Bed:</span>
            <span className="font-medium text-gray-900">{bedLetter || "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:col-span-2">
            <User className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-gray-500">Patient:</span>
            <span className="truncate font-medium text-gray-900">
              {patientName || "Unassigned"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="edit-entry-note"
            className="text-sm font-medium text-gray-700"
          >
            Patient Note
          </label>
          <textarea
            id="edit-entry-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={saving}
            rows={12}
            autoFocus
            className="w-full resize-y rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-900 leading-relaxed shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Enter the patient note…"
          />
        </div>

        <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => void onSave(note)}
            disabled={!canSave}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" aria-hidden />
                Save
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
