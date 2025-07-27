"use client"

import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, User } from "lucide-react"

export default function InactivityTracker() {
  const [showPopup, setShowPopup] = useState(false)
  const [countdown, setCountdown] = useState(300) // 10 seconds,300 seconds(5 minutes) realistically
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleLogout = async () => {
    await fetch("/api/staff/logout", { method: "POST" })
    window.location.href = "/Staff/sign-in"
  }

  const resetInactivityTimer = () => {
    // Don't reset inactivity timer if the popup is already shown
    if (showPopup) return

    clearTimeout(inactivityTimerRef.current!)
    inactivityTimerRef.current = setTimeout(() => {
      setShowPopup(true)
      setCountdown(300) // reset countdown
    }, 10 * 60 * 1000) // 5 seconds for testing, 10 minutes realistically
  }

  const handleStay = () => {
    setShowPopup(false)
    resetInactivityTimer()
  }

  // Watch when popup opens, start countdown
  useEffect(() => {
    if (showPopup) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!)
            handleLogout() // auto logout
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(countdownRef.current!)
      setCountdown(300) // reset for next time
    }

    return () => clearInterval(countdownRef.current!)
  }, [showPopup])

  // Setup initial and ongoing activity tracking
  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "scroll", "click"]

    activityEvents.forEach((event) => window.addEventListener(event, resetInactivityTimer))

    resetInactivityTimer() // initialize

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetInactivityTimer))
      clearTimeout(inactivityTimerRef.current!)
    }
  }, [])

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">Session Timeout Warning</DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6 py-4">
          <p className="text-gray-600 leading-relaxed">
            You've been inactive for a while. For your security, we'll automatically log you out soon.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-800">Auto logout in:</span>
            </div>
            <div className="text-3xl font-bold text-red-600 tabular-nums">{countdown}</div>
            <div className="text-sm text-red-600 mt-1">{countdown === 1 ? "second" : "seconds"}</div>
          </div>

          <p className="text-sm text-gray-500">Click "Stay Logged In" to continue your session.</p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
          <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto order-2 sm:order-1">
            Logout Now
          </Button>
          <Button onClick={handleStay} className="w-full sm:w-auto order-1 sm:order-2 bg-blue-600 hover:bg-blue-700">
            <User className="w-4 h-4 mr-2" />
            Stay Logged In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
