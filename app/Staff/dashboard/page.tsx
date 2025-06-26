"use client"

import MainPanel from "@/components/Dashboard/MainPanel";
import InactivityTracker from "@/components/Dashboard/InactivityTracker";
import { Smartphone, Zap } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MainPanel />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Device Management</h1>
            <p className="text-gray-600">Access your device dashboard and monitoring tools</p>
          </div>

          <button className="group w-full">
            <div className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Smartphone className="w-8 h-8 text-emerald-600" />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Dashboard</h2>
                  <p className="text-gray-600 mb-4">Monitor and manage your connected devices</p>

                  <div className="flex items-center justify-center space-x-2 text-emerald-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">Quick Access</span>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Click above to access your device management tools</p>
          </div>
        </div>
      </main>

      <InactivityTracker />
    </div>
  )
}

//bg-[#87a96b]

// "use client";

// import MainPanel from "@/components/Dashboard/MainPanel";

// export default function DevicePage() {
//   return (
//     <div className="min-h-screen font-sans bg-gray-100 flex flex-col">
//       <MainPanel />
//       <div className="flex-1 flex items-center justify-center py-2">
//         <div className="text-center font-bold text-lg text-white bg-[#87a96b] rounded-lg p-6 w-[500px] max-w-full shadow-md">
//           <p>Device</p>
//         </div>
//       </div>
//     </div>
//   );
// }