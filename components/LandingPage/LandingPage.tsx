"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Mic, FileText, Users, Zap, CheckCircle, Clock, Loader2, PlayCircle } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      {/* Hero Section — wordmark lockup leads the hero; the global header is hidden inside /dashboard. */}
      <section className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 sm:pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="flex flex-col items-start gap-4">
                  <Image
                src="/Cidien.svg"
                alt="Cidien"
                width={200}
                height={60}
                priority
                className="h-24 w-auto sm:h-28"
              />
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600 ring-1 ring-inset ring-emerald-100">
                  AI-Powered Healthcare Documentation
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Less time on{" "}
                  <span className="text-emerald-600">Charting</span>,
                  <br />
                  more time{" "}
                  <span className="text-emerald-600">Caring</span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Cidien reduces the overall time nurses spend on documentation through AI. 
                Focus more on patient care without the constant stress of documenting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
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
                  <Button size="lg" variant="outline" className="text-gray-700 border-2 text-lg px-8 py-6">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">70%</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">99.5%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">24/7</div>
                  <div className="text-sm text-gray-600">Real-time</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  {/* Mock Dashboard Preview */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Mic className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Live Recording</div>
                        <div className="text-sm text-gray-500">Room 3127, Bed A</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-full mb-2"></div>
                          <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-gray-700">Auto-save enabled</span>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Generate PDF
                    </Button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Healthcare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to streamline documentation and enhance patient care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - Voice Transcription */}
            <div className="group p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Voice Transcription</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Speak naturally and watch as AI instantly converts your voice into accurate, 
                structured medical documentation in real-time.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  99.5% accuracy rate
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Medical terminology trained
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Real-time processing
                </li>
              </ul>
            </div>

            {/* Feature 2 - PDF Chart Generation */}
            <div className="group p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">PDF Chart Generation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Automatically generate professional PDF nursing progress reports with 
                proper formatting, timestamps, and patient information.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  One-click PDF export
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Professional formatting
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Secure archiving
                </li>
              </ul>
            </div>

            {/* Feature 3 - Real-time Collaboration */}
            <div className="group p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Dashboard</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Monitor all patient data across multiple rooms and beds with live updates, 
                instant synchronization, and team collaboration features.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Live sync across devices
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Multi-room management
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                  Team collaboration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How Cidien Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your documentation workflow
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 transform -translate-y-1/2"></div>

            <div className="grid lg:grid-cols-3 gap-12 relative">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    1
                  </div>
                  <div className="mt-4">
                    <Mic className="w-12 h-12 text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Speak Naturally</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Simply speak your observations and notes as you would normally communicate. 
                      No special commands or formatting needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    2
                  </div>
                  <div className="mt-4">
                    <Zap className="w-12 h-12 text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Processes</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our advanced AI instantly transcribes and structures your speech into 
                      proper medical documentation with timestamps and patient details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    3
                  </div>
                  <div className="mt-4">
                    <FileText className="w-12 h-12 text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Approve & Export</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Review your documentation on the real-time dashboard, make any edits, 
                      and generate professional PDF reports with a single click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join healthcare facilities already saving hours of documentation time every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
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
          </div>
          <p className="text-emerald-100 mt-6 text-sm">Start from the home page anytime with Try Demo.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 pb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
            <div className="max-w-md">
              <p className="text-base font-semibold tracking-tight text-white">Cidien</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                AI-powered documentation for nurses—less time charting, more time with patients.
              </p>
            </div>
            <nav
              className="flex flex-col gap-3 text-sm sm:min-w-[12rem] sm:items-end sm:text-right"
              aria-label="Footer"
            >
              <Link href="/" className="text-gray-400 transition-colors hover:text-emerald-400">
                Home
              </Link>
              <Link href="#how-it-works" className="text-gray-400 transition-colors hover:text-emerald-400">
                How it works
              </Link>
            </nav>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Cidien. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

