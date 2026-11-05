"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Loader2,
  Lock,
  Mic,
  MonitorSmartphone,
  PlayCircle,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Reveal from "./Reveal"

/* Bar heights (%) for the illustrative waveform; fixed so server and client render the same. */
const WAVE = [38, 62, 84, 52, 70, 96, 58, 44, 76, 88, 50, 66, 92, 60, 40, 72, 86, 54, 68, 46, 80, 62, 36, 58]

const ROOMS = [
  { room: "3125", bed: "A", status: "live" },
  { room: "3125", bed: "B", status: "approved" },
  { room: "3126", bed: "A", status: "pending" },
  { room: "3126", bed: "B", status: "live" },
  { room: "3127", bed: "A", status: "approved" },
  { room: "3127", bed: "B", status: "idle" },
] as const

const STATUS_STYLE = {
  live: { label: "Live", dot: "bg-emerald-500", text: "text-emerald-700", ping: true },
  approved: { label: "Approved", dot: "bg-sky-500", text: "text-sky-700", ping: false },
  pending: { label: "Pending", dot: "bg-amber-500", text: "text-amber-700", ping: false },
  idle: { label: "Idle", dot: "bg-gray-300", text: "text-gray-500", ping: false },
} as const

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">{children}</p>
  )
}

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-700">
      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
      {children}
    </li>
  )
}

/* Card shell shared by the feature tiles: hairline, soft shadow, lift and a corner glow on hover. */
function FeatureCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-3xl border border-slate-900/[0.07] bg-white p-7 shadow-card transition-[transform,box-shadow] duration-300 ease-settle hover:-translate-y-1 hover:shadow-card-hover sm:p-8 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-300/0 blur-3xl transition-colors duration-500 group-hover:bg-emerald-300/30"
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function FeatureIcon({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[0_8px_20px_-8px_rgb(5_150_105/0.7)] transition-transform duration-300 ease-spring group-hover:scale-105 group-hover:-rotate-3">
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [isStartingDemo, setIsStartingDemo] = useState(false)

  const handleStartDemo = async () => {
    try {
      setIsStartingDemo(true)
      const response = await fetch("/api/demo/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unable to start demo.")
      }

      window.location.href = data.redirectUrl || "/dashboard"
    } catch (error) {
      console.error("Failed to start demo:", error)
      setIsStartingDemo(false)
    }
  }

  const demoIcon = isStartingDemo ? (
    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
  ) : (
    <PlayCircle className="h-5 w-5" aria-hidden />
  )

  return (
    <div className="min-h-screen bg-white">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative isolate overflow-hidden px-4 pb-28 pt-14 sm:px-6 sm:pb-36 sm:pt-20 lg:px-8">
        {/* Backdrop: a fading dot grid and a soft emerald glow. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgb(15_23_42/0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
          <div className="absolute left-1/2 top-[-14rem] h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-emerald-300/25 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="mx-auto max-w-7xl text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI-Powered Healthcare Documentation
            </span>

            <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Less time on{" "}
              <span className="relative inline-block text-gray-400">
                Charting
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-[54%] h-[0.07em] origin-left animate-strike rounded-full bg-gray-400"
                />
              </span>
              ,
              <br />
              more time{" "}
              <span className="relative inline-block bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text pb-2 text-transparent">
                Caring
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-emerald-400 sm:h-4"
                >
                  <path
                    d="M3 9 C 55 2, 125 1, 197 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1"
                    className="animate-draw"
                  />
                </svg>
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Cidien reduces the overall time nurses spend on documentation through AI. Focus more on
              patient care without the constant stress of documenting.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group h-12 w-full rounded-xl bg-emerald-600 px-7 text-base text-white shadow-[0_10px_28px_-10px_rgb(5_150_105/0.7)] hover:bg-emerald-700 hover:shadow-[0_14px_32px_-10px_rgb(5_150_105/0.75)] sm:w-auto"
                onClick={handleStartDemo}
                disabled={isStartingDemo}
              >
                {demoIcon}
                Try Demo
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-settle group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl px-7 text-base text-gray-700 sm:w-auto"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
              <MonitorSmartphone className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Best experienced on desktop + phone
            </p>
          </div>

          {/* Product showcase: the real dashboard in a browser frame, the phone recorder beside it. */}
          <div className="relative mx-auto mt-16 max-w-6xl animate-fade-up text-left [animation-delay:120ms] sm:mt-20">
            <div
              aria-hidden
              className="absolute inset-x-8 bottom-0 top-12 -z-10 rounded-[3rem] bg-gradient-to-tr from-emerald-400/35 via-teal-300/20 to-emerald-200/10 blur-3xl"
            />

            <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-[0_40px_90px_-35px_rgb(15_23_42/0.45),0_1px_3px_rgb(15_23_42/0.08)]">
              <div className="flex items-center gap-2 border-b border-slate-900/[0.06] bg-gray-50/90 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-white text-xs text-gray-500 ring-1 ring-slate-900/[0.06]">
                  <Lock className="h-3 w-3" aria-hidden />
                  cidien.ca/dashboard
                </div>
                <span className="w-[52px] shrink-0" aria-hidden />
              </div>
              <div className="relative aspect-[1919/620] overflow-hidden bg-gray-50">
                <Image
                  src="/screenshots/dashboard.png"
                  alt="Cidien staff dashboard listing live transcribed patient notes across rooms"
                  fill
                  priority
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="absolute -bottom-12 right-3 w-[27%] max-w-[220px] sm:-bottom-16 sm:right-8 lg:-right-6">
              <div className="animate-float rounded-[2rem] bg-gray-900 p-[5px] shadow-[0_30px_60px_-20px_rgb(15_23_42/0.55)] ring-1 ring-white/10 sm:rounded-[2.4rem] sm:p-[7px]">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[1.7rem] bg-white sm:rounded-[2rem]">
                  <Image
                    src="/screenshots/mobile.jpeg"
                    alt="Cidien mobile recorder with record and clear buttons"
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -left-4 top-[38%] hidden animate-float items-center gap-3 rounded-2xl border border-slate-900/[0.06] bg-white/90 px-4 py-3 shadow-float backdrop-blur [animation-delay:-2s] md:flex lg:-left-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <Mic className="h-4 w-4 text-emerald-600" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Voice note captured</p>
                <p className="text-xs text-gray-500">Room 3127 · Bed A</p>
              </div>
              <div className="ml-1 flex h-6 items-center gap-[3px]" aria-hidden>
                {[60, 100, 45, 85, 55].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] animate-wave rounded-full bg-emerald-500"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 hidden animate-float items-center gap-3 rounded-2xl border border-slate-900/[0.06] bg-white/90 px-4 py-3 shadow-float backdrop-blur [animation-delay:-4s] md:flex lg:left-16">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <FileText className="h-4 w-4 text-emerald-600" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Progress report ready</p>
                <p className="text-xs text-gray-500">Approved · PDF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Features ───────────────────────── */}
      <section id="features" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>Features</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Everything you need to streamline documentation and enhance patient care
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Voice Transcription */}
            <Reveal className="lg:col-span-2">
              <FeatureCard>
                <div className="grid h-full gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <FeatureIcon>
                      <Mic className="h-6 w-6" aria-hidden />
                    </FeatureIcon>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Voice Transcription</h3>
                    <p className="mt-3 leading-relaxed text-gray-600">
                      Speak naturally and watch as AI instantly converts your voice into accurate, structured
                      medical documentation in real-time.
                    </p>
                    <ul className="mt-5 space-y-2">
                      <Check>Medical terminology trained</Check>
                      <Check>Real-time processing</Check>
                    </ul>
                  </div>

                  <div aria-hidden className="rounded-2xl bg-gray-50 p-5 ring-1 ring-inset ring-slate-900/[0.05]">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="flex items-center gap-2 text-red-600">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        Recording
                      </span>
                      <span className="font-mono text-gray-500">Room 3127 · A</span>
                    </div>
                    <div className="mt-4 flex h-14 items-center justify-between gap-[3px]">
                      {WAVE.map((h, i) => (
                        <span
                          key={i}
                          className="w-full max-w-[6px] animate-wave rounded-full bg-gradient-to-t from-emerald-600 to-teal-400"
                          style={{ height: `${h}%`, animationDelay: `${(i % 8) * 0.11}s` }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl bg-white p-3.5 text-sm leading-relaxed text-gray-700 shadow-sm ring-1 ring-slate-900/[0.05]">
                      Patient&apos;s dressing is clean, dry, and intact. No active bleeding noted.
                      <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-emerald-600" />
                    </div>
                  </div>
                </div>
              </FeatureCard>
            </Reveal>

            {/* PDF Chart Generation */}
            <Reveal delay={80}>
              <FeatureCard>
                <div aria-hidden className="relative mx-auto mb-7 h-36 w-32">
                  <div className="absolute inset-0 rotate-[-8deg] rounded-lg bg-emerald-100 transition-transform duration-500 ease-settle group-hover:rotate-[-12deg]" />
                  <div className="absolute inset-0 rotate-[5deg] rounded-lg bg-emerald-200/70 transition-transform duration-500 ease-settle group-hover:rotate-[9deg]" />
                  <div className="absolute inset-0 flex flex-col gap-1.5 rounded-lg bg-white p-3 shadow-float ring-1 ring-slate-900/[0.06]">
                    <div className="h-1.5 w-3/4 rounded-full bg-emerald-600" />
                    <div className="mb-1 h-1 w-1/2 rounded-full bg-gray-200" />
                    {[100, 90, 95, 70, 100, 80].map((w, i) => (
                      <div key={i} className="h-1 rounded-full bg-gray-200" style={{ width: `${w}%` }} />
                    ))}
                    <span className="absolute -bottom-2 -right-3 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      PDF
                    </span>
                  </div>
                </div>
                <FeatureIcon>
                  <FileText className="h-6 w-6" aria-hidden />
                </FeatureIcon>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">PDF Chart Generation</h3>
                <p className="mt-3 leading-relaxed text-gray-600">
                  Automatically generate professional PDF nursing progress reports with proper formatting,
                  timestamps, and patient information.
                </p>
                <ul className="mt-5 space-y-2">
                  <Check>One-click PDF export</Check>
                  <Check>Secure archiving</Check>
                </ul>
              </FeatureCard>
            </Reveal>

            {/* Real-time Dashboard */}
            <Reveal className="lg:col-span-3" delay={120}>
              <FeatureCard>
                <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:items-center">
                  <div>
                    <FeatureIcon>
                      <Users className="h-6 w-6" aria-hidden />
                    </FeatureIcon>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Real-time Dashboard</h3>
                    <p className="mt-3 leading-relaxed text-gray-600">
                      Monitor all patient data across multiple rooms and beds with live updates, instant
                      synchronization, and team collaboration features.
                    </p>
                    <ul className="mt-5 space-y-2">
                      <Check>Live sync across devices</Check>
                      <Check>Multi-room management</Check>
                    </ul>
                  </div>

                  <div aria-hidden className="rounded-2xl bg-gray-50 p-4 ring-1 ring-inset ring-slate-900/[0.05] sm:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">All rooms</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Live
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {ROOMS.map(({ room, bed, status }) => {
                        const s = STATUS_STYLE[status]
                        return (
                          <div
                            key={`${room}${bed}`}
                            className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-900/[0.05] transition-transform duration-200 ease-settle hover:-translate-y-0.5"
                          >
                            <p className="text-xs text-gray-500">Room {room}</p>
                            <p className="font-semibold text-gray-900">Bed {bed}</p>
                            <p className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${s.text}`}>
                              <span className="relative flex h-2 w-2">
                                {s.ping && (
                                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${s.dot}`} />
                                )}
                                <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`} />
                              </span>
                              {s.label}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </FeatureCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────── How it works ───────────────────────── */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-gradient-to-b from-white via-emerald-50/50 to-emerald-50/70 px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">How Cidien Works</h2>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Three simple steps to transform your documentation workflow
            </p>
          </Reveal>

          <div className="relative">
            {/* Connector, visible in the gaps between the cards */}
            <div
              aria-hidden
              className="absolute left-[12%] right-[12%] top-[3.75rem] hidden border-t-2 border-dashed border-emerald-300/70 lg:block"
            />

            <div className="relative grid gap-6 lg:grid-cols-3 lg:gap-10">
              {[
                {
                  n: "01",
                  Icon: Mic,
                  title: "Speak Naturally",
                  body: "Simply speak your observations and notes as you would normally communicate. No special commands or formatting needed.",
                },
                {
                  n: "02",
                  Icon: Zap,
                  title: "AI Processes",
                  body: "Our advanced AI instantly transcribes and structures your speech into proper medical documentation with timestamps and patient details.",
                },
                {
                  n: "03",
                  Icon: FileText,
                  title: "Approve & Export",
                  body: "Review your documentation on the real-time dashboard, make any edits, and generate professional PDF reports with a single click.",
                },
              ].map(({ n, Icon, title, body }, i) => (
                <Reveal key={n} delay={i * 100}>
                  <div className="group h-full rounded-3xl border border-slate-900/[0.07] bg-white p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-settle hover:-translate-y-1 hover:shadow-card-hover">
                    <div className="flex items-center justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[0_8px_20px_-8px_rgb(5_150_105/0.7)] ring-8 ring-emerald-50 transition-transform duration-300 ease-spring group-hover:scale-105">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="font-mono text-4xl font-semibold text-emerald-600/15 transition-colors duration-300 group-hover:text-emerald-600/30">
                        {n}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">{title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-600">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="bg-gradient-to-b from-emerald-50/70 to-white px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-16 text-center shadow-[0_40px_80px_-30px_rgb(2_44_34/0.65)] sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/40 blur-3xl"
            />

            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Transform Your Workflow?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100/80">
              Walk through a demo hospital on your computer, then chart a note from your phone.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group h-12 w-full rounded-xl bg-white px-7 text-base text-emerald-700 shadow-float hover:bg-emerald-50 sm:w-auto"
                onClick={handleStartDemo}
                disabled={isStartingDemo}
              >
                {demoIcon}
                Try Demo
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-settle group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 w-full rounded-xl border border-white/20 px-7 text-base text-white hover:bg-white/10 sm:w-auto"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-emerald-200/60">Start from the home page anytime with Try Demo.</p>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── Footer ───────────────────────── */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 pb-10 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
            <div className="max-w-md">
              <Image
                src="/Cidien.svg"
                alt="Cidien"
                width={375}
                height={225}
                className="h-12 w-auto brightness-0 invert"
              />
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                AI-powered documentation for nurses - less time charting, more time with patients.
              </p>
            </div>
            <nav className="flex flex-col gap-3 text-sm sm:min-w-[12rem] sm:items-end sm:text-right" aria-label="Footer">
              <Link href="/" className="text-gray-400 transition-colors hover:text-emerald-400">
                Home
              </Link>
              <Link href="#how-it-works" className="text-gray-400 transition-colors hover:text-emerald-400">
                How it works
              </Link>
              <Link href="#features" className="text-gray-400 transition-colors hover:text-emerald-400">
                Features
              </Link>
            </nav>
          </div>
          <div className="border-t border-white/[0.08] pt-6">
            <p className="text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Cidien. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
