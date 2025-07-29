"use client"

import { useEffect, useState, useRef } from "react"
import io from "socket.io-client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Database, Mic, Wifi, WifiOff } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"

// Initialize socket connection once
const socket = io("http://localhost:5000") // Adjust to your Flask server address if needed

interface RowData {
  index: number
  audioUrl: string
  column1: string
  column2: string
  column3: string
  column4: string
  id?: number
  isNew?: boolean
}

export default function DataTable() {
  const [data, setData] = useState<RowData[]>([])
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [isReceiving, setIsReceiving] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const tableEndRef = useRef<HTMLDivElement>(null);

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
    const newAudio = new Audio(`http://localhost:5000${url}`)
    
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

  useEffect(() => {
    // Load existing transcriptions
    fetch("http://localhost:5000/transcriptions")
      .then((res) => res.json())
      .then((json) => {
        setData(
          json.map((item: any, index: number) => ({
            ...item,
            id: item.id || Date.now() + index,
            isNew: false,
          })),
        )
        setIsConnected(true)
      })
      .catch((err) => {
        console.error("Failed toload data:", err)
        setIsConnected(false)
      })

    socket.on("connect", () => {
      console.log("Connected to Flask WebSocket")
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from Flask WebSocket")
      setIsConnected(false)
    })

    socket.on("new_transcription", (payload) => {
      console.log("Incoming payload:", payload)
      console.log("Incoming payload:", payload)
      setIsReceiving(true)

      // Simulate processing delay for better UX
      setTimeout(() => {
        const newRow = {
          index: data.length + 1,
          audioUrl: payload.audioUrl || "—",
          column1: payload.column1 || "—",
          column2: payload.column2 || "—",
          column3: payload.column3 || "—",
          column4: payload.column4 || "—",
          id: Date.now(),
          isNew: true,
        }

        setData((prevData) => [...prevData, newRow])
        setIsReceiving(false)

        // Auto-scroll to new entry
        setTimeout(() => {
          tableEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)

        // Remove "new" status after 3 seconds
        setTimeout(() => {
          setData((prevData) => prevData.map((item) => (item.id === newRow.id ? { ...item, isNew: false } : item)))
        }, 3000)
      }, 800)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

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
                  {data.length > 0 ? (
                    data.map((row, i) => (
                      <TableRow
                        key={row.id || `${row.column2}-${row.column3}-${i}`}
                        className={`
                          hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer relative
                          ${row.isNew ? "animate-in slide-in-from-bottom-2 duration-500 bg-emerald-50 border-l-4 border-l-emerald-400" : ""}
                        `}
                        onDoubleClick={() => handleRowDoubleClick(row.audioUrl, i)}
                        title="Double-click to play audio"
                      >
                        <TableCell className="relative font-medium w-16 text-center group">
                          <span
                            className={`transition-opacity ${playingIndex === i ? "opacity-0" : "group-hover:opacity-0"}`}
                          >
                            {i + 1}
                          </span>
                          {row.isNew && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          )}
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlay(row.audioUrl, i)
                                }}
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 hover:text-emerald-800"
                              >
                                {loadingIndex === i ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : playingIndex === i ? (
                                  <Pause className="w-5 h-5" />
                                ) : (
                                  <Play className="w-5 h-5" />
                                )}
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className="bg-gray-800 text-white px-2 py-1 text-xs rounded shadow-md z-50"
                              side="top"
                            >
                              {playingIndex === i ? "Click to pause" : "Click to play"}
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </TableCell>
                        <TableCell className={row.isNew ? "font-medium" : ""}>{row.column2}</TableCell>
                        <TableCell className={row.isNew ? "font-medium" : ""}>{row.column3}</TableCell>
                        <TableCell className={row.isNew ? "font-medium" : ""}>
                          {row.column4}
                          {row.isNew && (
                            <Badge variant="secondary" className="ml-2 text-xs bg-emerald-100 text-emerald-800">
                              New
                            </Badge>
                          )}
                        </TableCell>
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
