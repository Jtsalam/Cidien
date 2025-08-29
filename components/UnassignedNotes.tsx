"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TriangleAlert, FileText, Wifi, WifiOff } from "lucide-react"

interface UnassignedNotesProps {
  selectedRoom?: string | null
}

export default function UnassignedNotes({ selectedRoom }: UnassignedNotesProps) {
  const isConnected = true // TODO: Connect to actual connection status

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Unassigned Notes</span>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Wifi className="mr-1 h-4 w-4" /> Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-300">
                  <WifiOff className="mr-1 h-4 w-4" /> Offline
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <TriangleAlert className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unassigned Notes
            </h3>
            <p className="text-gray-600 max-w-md mb-4">
              This section will display transcriptions that haven't been assigned to specific patients or rooms yet.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>No unassigned notes available</span>
            </div>
            {selectedRoom && (
              <div className="mt-4 text-xs text-gray-400">
                Filtering by room: {selectedRoom}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}