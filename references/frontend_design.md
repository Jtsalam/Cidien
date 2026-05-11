"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Mic, FileText, Users, Zap, CheckCircle, Loader2, PlayCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Image
                src="/Cidien.svg"
                alt="Cidien"
                width={120}
                height={36}
                priority
                className="h-8 w-auto invert"
              />
              <nav className="hidden md:flex items-center gap-6">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How it works
                </Link>
              </nav>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={handleStartDemo}
              disabled={isStartingDemo}
            >
              {isStartingDemo ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            AI-Powered Healthcare Documentation
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            Less time on{" "}
            <span className="text-accent">Charting</span>,
            <br />
            more time{" "}
            <span className="text-accent">Caring</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Cidien reduces the overall time nurses spend on documentation through AI. 
            Focus more on patient care without the constant stress of documenting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8"
              onClick={handleStartDemo}
              disabled={isStartingDemo}
            >
              {isStartingDemo ? (
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              ) : (
                <PlayCircle className="mr-2 w-5 h-5" />
              )}
              Try Demo
            </Button>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { value: "70%", label: "Time Saved", sublabel: "on documentation" },
              { value: "99.5%", label: "Accuracy", sublabel: "transcription rate" },
              { value: "24/7", label: "Real-time", sublabel: "processing" },
              { value: "5min", label: "Setup", sublabel: "to get started" },
            ].map((stat, i) => (
              <div key={i} className="px-8 py-10 text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to streamline documentation and enhance patient care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group relative p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Mic className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Voice Transcription</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Speak naturally and watch as AI instantly converts your voice into accurate, 
                structured medical documentation in real-time.
              </p>
              <ul className="space-y-3">
                {["99.5% accuracy rate", "Medical terminology trained", "Real-time processing"].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">PDF Chart Generation</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Automatically generate professional PDF nursing progress reports with 
                proper formatting, timestamps, and patient information.
              </p>
              <ul className="space-y-3">
                {["One-click PDF export", "Professional formatting", "Secure archiving"].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Dashboard</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Monitor all patient data across multiple rooms and beds with live updates, 
                instant synchronization, and team collaboration features.
              </p>
              <ul className="space-y-3">
                {["Live sync across devices", "Multi-room management", "Team collaboration"].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How Cidien Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your documentation workflow
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Mic,
                title: "Speak Naturally",
                description: "Simply speak your observations and notes as you would normally communicate. No special commands or formatting needed."
              },
              {
                step: "02",
                icon: Zap,
                title: "AI Processes",
                description: "Our advanced AI instantly transcribes and structures your speech into proper medical documentation with timestamps."
              },
              {
                step: "03",
                icon: FileText,
                title: "Approve & Export",
                description: "Review your documentation on the real-time dashboard, make any edits, and generate professional PDF reports."
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="p-8 rounded-2xl bg-secondary/50 border border-border h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-accent/30">{item.step}</span>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The teams we empower.
            </h2>
          </div>
          
          <div className="flex justify-center mb-16">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleStartDemo}
              disabled={isStartingDemo}
            >
              Get a Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "What once took an hour to document now takes just 15 minutes, and the accuracy is remarkable.",
                author: "Sarah M.",
                role: "Head Nurse, City Hospital"
              },
              {
                quote: "We spend so much less time on paperwork because of the AI transcription Cidien offers us.",
                author: "Dr. James Chen",
                role: "Medical Director"
              },
              {
                quote: "With Cidien, our team reduced documentation time by 70% and improved patient satisfaction.",
                author: "Emily R.",
                role: "Nursing Supervisor"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl border border-border bg-card">
                <p className="text-lg text-foreground/90 italic mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join healthcare facilities already saving hours of documentation time every day.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8"
            onClick={handleStartDemo}
            disabled={isStartingDemo}
          >
            {isStartingDemo ? (
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            ) : (
              <PlayCircle className="mr-2 w-5 h-5" />
            )}
            Try Demo
          </Button>
          <p className="text-muted-foreground mt-6 text-sm">Start from the home page anytime with Try Demo.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <Image
                src="/Cidien.svg"
                alt="Cidien"
                width={100}
                height={30}
                className="h-6 w-auto invert mb-4"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered documentation for nurses—less time charting, more time with patients.
              </p>
            </div>
            <nav className="flex flex-col gap-3 text-sm sm:items-end sm:text-right">
              <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="#features" className="text-muted-foreground hover:text-accent transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors">
                How it works
              </Link>
            </nav>
          </div>
          <div className="border-t border-border mt-8 pt-8">
            <p className="text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Cidien. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
