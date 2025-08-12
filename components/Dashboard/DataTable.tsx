"use client"
import { useRef, useState } from "react"
import { useSocket } from '@/components/context/socket'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Database, Mic, Wifi, WifiOff } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"

interface RowData {
  id: number
  audioUrl: string
  column1: string
  column2: string
  column3: string
  column4: string
  isNew?: boolean
}

export default function DataTable() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const tableEndRef = useRef<HTMLDivElement>(null)
  
  // Get data from socket context
  const { transcriptions, isConnected, isReceiving } = useSocket()

  const handlePlay = (url: string, index: number) => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0

      if (playingIndex === index) {
        setPlayingIndex(null)
        setAudio(null)
        return
      }
    }

    setLoadingIndex(index)
    const newAudio = new Audio(`http://localhost:5001${url}`) // Match Flask port
    
    newAudio
      .play()
      .then(() => {
        setAudio(newAudio)
        setPlayingIndex(index)
        setLoadingIndex(null)
      })
      .catch((err) => {
        console.error("Playback error:", err)
        setLoadingIndex(null)
      })

    newAudio.onended = () => {
      setPlayingIndex(null)
      setAudio(null)
    }
  }

  const handleRowDoubleClick = (audioUrl: string, index: number) => {
    handlePlay(audioUrl, index)
  }

  return (
    <Tooltip.Provider>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <span>Real-time Transcriptions</span>
              </div>
              <div className="flex items-center space-x-3">
                {isReceiving && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Mic className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-medium">Processing...</span>
                  </div>
                )}
                <Badge
                  variant={isConnected ? "default" : "destructive"}
                  className={`flex items-center space-x-1 ${isConnected ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : ""}`}
                >
                  {isConnected ? (
                    <>
                      <Wifi className="w-3 h-3" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3" />
                      <span>Reconnecting...</span>
                    </>
                  )}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Index</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Timestamp</TableHead>
                    <TableHead className="font-semibold text-gray-700">Patient Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transcriptions.length > 0 ? (
                    transcriptions.map((row, i) => (
                      <TableRow
                        key={row.id || `${row.column2}-${row.column3}-${i}`}
                        className={`
                          hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer relative
                          ${row.isNew ? "animate-in slide-in-from-bottom-2 duration-500 bg-emerald-50 border-l-4 border-l-emerald-400" : ""}
                        `}
                        onDoubleClick={() => handleRowDoubleClick(row.audioUrl, i)}
                        title="Double-click to play audio"
                      >
                        {/* ... rest of your table row JSX ... */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                          <span>Waiting for real-time data...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div ref={tableEndRef} />
            {isReceiving && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600 bg-blue-50 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">Processing new transcription...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Tooltip.Provider>
  )
}