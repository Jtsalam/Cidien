import { Inbox, Sparkles } from "lucide-react"

/** Unassigned tab: notes recorded without a confirmed room will land here. Not built yet. */
export default function NothingToSee() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-700">Needs a room</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Unassigned</h1>
        <p className="mt-1 text-gray-600">Notes that couldn&apos;t be matched to a room and bed.</p>
      </div>

      <div className="relative isolate flex flex-col items-center overflow-hidden rounded-3xl border border-slate-900/[0.07] bg-white px-6 py-20 text-center shadow-card">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(15_23_42/0.06)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        />
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-8 ring-emerald-50/50">
          <Inbox className="h-8 w-8 text-emerald-600" aria-hidden />
        </span>
        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Coming soon
        </span>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-gray-900">Nothing needs sorting</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
          When a note can&apos;t be matched to a room, it will wait here so you can assign it in one tap.
        </p>
      </div>
    </div>
  )
}
