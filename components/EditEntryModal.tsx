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
import { Calendar, Clock, DoorOpen, Loader2, NotebookPen, Save, User } from "lucide-react"

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

  const meta = [
    { Icon: DoorOpen, text: `Room ${roomNumber != null && roomNumber !== "" ? roomNumber : "—"} · Bed ${bedLetter || "—"}` },
    { Icon: User, text: patientName || "Unassigned" },
    { Icon: Calendar, text: date || "—" },
    { Icon: Clock, text: timestamp || "—" },
  ]
  const words = note.trim() ? note.trim().split(/\s+/).length : 0

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !saving) onCancel()
      }}
    >
      <DialogContent className="gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="flex-row items-start gap-4 space-y-0 p-6 pb-4 text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <NotebookPen className="h-5 w-5" aria-hidden />
          </span>
          <div className="space-y-1">
            <DialogTitle className="text-lg font-bold tracking-tight text-gray-900">Edit note</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Changes are saved to this transcription record.</DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4 px-6 pb-6">
          <ul className="flex flex-wrap gap-2">
            {meta.map(({ Icon, text }) => (
              <li
                key={text + Icon.displayName}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-slate-900/[0.06]"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                {text}
              </li>
            ))}
          </ul>

          <div>
            <label htmlFor="edit-entry-note" className="sr-only">
              Patient note
            </label>
            <textarea
              id="edit-entry-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canSave) {
                  e.preventDefault()
                  void onSave(note)
                }
              }}
              disabled={saving}
              rows={10}
              autoFocus
              className="w-full resize-y rounded-xl border border-slate-900/15 bg-white p-4 text-[15px] leading-relaxed text-gray-900 shadow-sm outline-none transition-[border-color,box-shadow] duration-150 ease-settle focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Enter the patient note…"
            />
            <div className="mt-1.5 flex justify-between text-xs text-gray-400">
              <span>{hasChanges ? "Unsaved changes" : "No changes yet"}</span>
              <span className="tabular-nums">{words} words</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse gap-2 border-t border-slate-900/[0.06] bg-gray-50/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-0 sm:rounded-b-2xl">
          <span className="hidden text-xs text-gray-400 sm:block">
            <kbd className="rounded border border-slate-900/10 bg-white px-1.5 py-0.5 font-sans">⌘</kbd>{" "}
            <kbd className="rounded border border-slate-900/10 bg-white px-1.5 py-0.5 font-sans">Enter</kbd> to save
          </span>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button type="button" variant="outline" onClick={onCancel} disabled={saving} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="button" onClick={() => void onSave(note)} disabled={!canSave} className="w-full sm:w-auto">
              {saving ? <Loader2 className="animate-spin" aria-hidden /> : <Save aria-hidden />}
              {saving ? "Saving…" : "Save note"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
