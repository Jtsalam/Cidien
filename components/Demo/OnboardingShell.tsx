"use client"

import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Check } from "lucide-react"

const STEPS = ["Hospital", "Connect phone", "Dashboard"] as const

type Props = {
  /** 0-based index of the current step. */
  step: 0 | 1 | 2
  children: ReactNode
  /** Optional sticky action bar pinned to the bottom of the viewport. */
  footer?: ReactNode
}

/**
 * Frame for the demo onboarding steps: logo + stepper bar, the landing hero's
 * dot-grid backdrop, and a centred column. `data-app-shell` hides the global
 * SiteHeader (see app/globals.css) so the stepper is the only bar on screen.
 */
export default function OnboardingShell({ step, children, footer }: Props) {
  return (
    <div data-app-shell className="relative isolate min-h-screen bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(15_23_42/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-16rem] h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-900/[0.06] bg-white/75 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/" aria-label="Cidien home" className="shrink-0 rounded-md">
            <Image src="/Cidien.svg" alt="Cidien" width={375} height={225} priority className="h-9 w-auto" />
          </Link>

          <ol className="flex items-center gap-1.5 sm:gap-3" aria-label="Demo progress">
            {STEPS.map((label, i) => {
              const done = i < step
              const current = i === step
              return (
                <li key={label} className="flex items-center gap-1.5 sm:gap-3">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className={`h-px w-4 transition-colors duration-500 sm:w-8 ${done || current ? "bg-emerald-400" : "bg-slate-900/10"}`}
                    />
                  )}
                  <span
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-1 text-sm font-medium transition-colors duration-300 sm:pr-3 ${
                      current ? "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200" : done ? "text-emerald-700" : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                        done
                          ? "bg-emerald-600 text-white"
                          : current
                            ? "bg-emerald-600 text-white shadow-[0_0_0_4px_rgb(16_185_129/0.15)]"
                            : "bg-slate-900/[0.06] text-gray-500"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5 animate-pop" aria-hidden /> : i + 1}
                    </span>
                    <span className={current ? "" : "hidden sm:inline"}>{label}</span>
                  </span>
                </li>
              )
            })}
          </ol>

          <Link href="/" className="hidden shrink-0 text-sm text-gray-500 transition-colors hover:text-gray-800 md:block">
            Exit demo
          </Link>
        </div>
      </header>

      <main className={`mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12 ${footer ? "pb-32" : ""}`}>{children}</main>

      {footer && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-900/[0.06] bg-white/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
            {footer}
          </div>
        </div>
      )}
    </div>
  )
}
