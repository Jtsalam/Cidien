"use client"

import Image from "next/image"
import Link from "next/link"
import { Activity, DoorOpen, FileArchive, Inbox, LayoutGrid, LogOut, type LucideIcon } from "lucide-react"

export type DashboardTab = "data" | "unassigned" | "archive"

export const DASHBOARD_TABS: { value: DashboardTab; label: string; Icon: LucideIcon }[] = [
  { value: "data", label: "Live notes", Icon: Activity },
  { value: "unassigned", label: "Unassigned", Icon: Inbox },
  { value: "archive", label: "Archive", Icon: FileArchive },
]

type ShellProps = {
  displayName: string
  nurseId: string
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  rooms: string[]
  isLoadingRooms: boolean
  selectedRoom: string | null
  onSelectRoom: (room: string | null) => void
  roomsWithNewApproval: Set<string>
  onLogout: () => void
}

function initialsOf(id: string) {
  const letters = id.replace(/[^a-z]/gi, "")
  return (letters.slice(0, 2) || id.slice(0, 2) || "?").toUpperCase()
}

/** Desktop sidebar (lg and up): brand, nav, rooms, and the signed-in nurse. */
export function DashboardSidebar({
  displayName,
  nurseId,
  activeTab,
  onTabChange,
  rooms,
  isLoadingRooms,
  selectedRoom,
  onSelectRoom,
  roomsWithNewApproval,
  onLogout,
}: ShellProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col bg-emerald-950 text-emerald-50 lg:flex">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative px-5 pb-4 pt-6">
        <Link href="/" aria-label="Cidien home" className="inline-block rounded-md">
          <Image src="/cidien-logo-white.svg" alt="Cidien" width={358} height={80} className="h-8 w-auto" priority />
        </Link>
        <p className="mt-3 truncate text-sm text-emerald-200/70" title={displayName}>
          {displayName || " "}
        </p>
      </div>

      <nav className="relative space-y-1 px-3" aria-label="Dashboard">
        {DASHBOARD_TABS.map(({ value, label, Icon }) => {
          const active = activeTab === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => onTabChange(value)}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-white/[0.1] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]"
                  : "text-emerald-100/70 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${active ? "text-emerald-300" : ""}`} aria-hidden />
              {label}
              {value === "data" && (
                <span className="relative ml-auto flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="relative mt-7 flex min-h-0 flex-1 flex-col px-3">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200/50">Your rooms</p>
        <div className="-mr-1 min-h-0 flex-1 space-y-0.5 overflow-y-auto pr-1 [scrollbar-color:rgb(255_255_255/0.15)_transparent]">
          {isLoadingRooms ? (
            [0, 1, 2].map((i) => <div key={i} className="mx-3 my-2 h-5 animate-pulse rounded-md bg-white/[0.06]" />)
          ) : rooms.length === 0 ? (
            <p className="px-3 py-2 text-sm text-emerald-100/50">No rooms assigned yet</p>
          ) : (
            <>
              <RoomButton
                label="All rooms"
                Icon={LayoutGrid}
                active={selectedRoom === null}
                onClick={() => onSelectRoom(null)}
              />
              {rooms.map((room) => (
                <RoomButton
                  key={room}
                  label={`Room ${room}`}
                  Icon={DoorOpen}
                  active={selectedRoom === room}
                  hasNew={roomsWithNewApproval.has(room)}
                  onClick={() => onSelectRoom(room)}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="relative m-3 flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-inset ring-white/[0.06]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-emerald-950">
          {initialsOf(nurseId)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{nurseId || "Nurse"}</p>
          <p className="truncate text-xs text-emerald-200/60">On shift</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Log out"
          title="Log out"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-100/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </aside>
  )
}

function RoomButton({
  label,
  Icon,
  active,
  hasNew,
  onClick,
}: {
  label: string
  Icon: LucideIcon
  active: boolean
  hasNew?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
        active ? "bg-emerald-500/15 font-semibold text-white" : "text-emerald-100/70 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-emerald-300" : "text-emerald-200/40"}`} aria-hidden />
      <span className="truncate">{label}</span>
      {hasNew && (
        <span className="ml-auto rounded-full bg-emerald-400 px-1.5 py-px text-[10px] font-bold uppercase tracking-wide text-emerald-950">
          New
        </span>
      )}
    </button>
  )
}

/** Below lg: a light top bar, segmented nav and scrolling room chips. */
export function DashboardTopBar({
  displayName,
  nurseId,
  activeTab,
  onTabChange,
  rooms,
  selectedRoom,
  onSelectRoom,
  roomsWithNewApproval,
  onLogout,
}: ShellProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-900/[0.06] bg-white/85 backdrop-blur-md backdrop-saturate-150 lg:hidden">
      <div className="flex h-14 items-center gap-3 px-4">
        <Image src="/cidien-logo.svg" alt="Cidien" width={358} height={80} className="h-6 w-auto" priority />
        <div className="min-w-0 flex-1 border-l border-slate-900/10 pl-3 text-xs leading-tight">
          <p className="truncate font-semibold text-gray-900">{displayName}</p>
          <p className="truncate text-gray-500">{nurseId}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Log out"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-slate-900/[0.05] hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="px-4 pb-3">
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-900/[0.05] p-1" role="tablist">
          {DASHBOARD_TABS.map(({ value, label, Icon }) => {
            const active = activeTab === value
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(value)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-[background-color,color,box-shadow] duration-200 ease-settle sm:text-sm ${
                  active ? "bg-white text-emerald-700 shadow-[0_1px_3px_rgb(15_23_42/0.12)]" : "text-gray-600"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            )
          })}
        </div>

        {rooms.length > 0 && (
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none]">
            {[null, ...rooms].map((room) => {
              const active = selectedRoom === room
              return (
                <button
                  key={room ?? "all"}
                  type="button"
                  onClick={() => onSelectRoom(room)}
                  aria-pressed={active}
                  className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 ${
                    active ? "bg-emerald-600 text-white" : "bg-white text-gray-700 ring-1 ring-inset ring-slate-900/10"
                  }`}
                >
                  {room ? `Room ${room}` : "All rooms"}
                  {room && roomsWithNewApproval.has(room) && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
