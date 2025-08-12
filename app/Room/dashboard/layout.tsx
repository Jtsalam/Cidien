// app/Room/dashboard/layout.tsx
import { SocketProvider } from '@/components/context/socket'
import  InactivityTracker from '@/components/Dashboard/InactivityTracker'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
        <InactivityTracker />
      </div>
    </SocketProvider>
  )
}