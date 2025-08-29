"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Trash, RotateCcw, Wifi, WifiOff } from "lucide-react"

interface RowData {
  index: number
  audioUrl: string
  column1: string
  column2: string
  column3: string
  column4: string
  id?: string
  isApproved?: boolean
  patient_id?: number
  session_id?: number
}

interface ArchivedNotesProps {
  selectedRoom?: string | null
}

const AudioPlayerButton = ({
  url,
  index,
  playingIndex,
  loadingIndex,
  onClick
}: {
  url: string
  index: number
  playingIndex: number | null
  loadingIndex: number | null
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    aria-label={playingIndex === index ? "Pause audio" : "Play audio"}
    disabled={loadingIndex === index}
    className="p-1 rounded hover:bg-gray-100"
  >
    {loadingIndex === index ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : playingIndex === index ? (
      <Pause className="w-4 h-4 text-emerald-600" />
    ) : (
      <Play className="w-4 h-4 text-emerald-600" />
    )}
  </button>
)

export default function ArchivedNotes({ selectedRoom }: ArchivedNotesProps) {
  const [archivedData, setArchivedData] = useState<RowData[]>([])
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentAudioRef = useRef<HTMLAudioElement | null>(null)
  const preloadedAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map())
  const preloadedObjectUrlRef = useRef<Map<string, string>>(new Map())
  const prefetchPromisesRef = useRef<Map<string, Promise<void>>>(new Map())

  const handlePlay = useCallback((url: string, index: number) => {
    if (currentAudioRef.current) {
      try { currentAudioRef.current.pause(); currentAudioRef.current.currentTime = 0 } catch {}
      if (playingIndex === index) {
        setPlayingIndex(null)
        setAudio(null)
        currentAudioRef.current = null
        return
      }
    }

    setLoadingIndex(index)
    const fullUrl = `http://localhost:5001${url}`
    const objectUrl = preloadedObjectUrlRef.current.get(fullUrl)
    const preferredSrc = objectUrl ?? fullUrl
    const audioEl = preloadedAudioRef.current.get(preferredSrc) ?? new Audio(preferredSrc)

    currentAudioRef.current = audioEl
    audioEl.preload = "auto"

    audioEl.play()
      .then(() => {
        setAudio(audioEl)
        setPlayingIndex(index)
        setLoadingIndex(null)
        if (!preloadedAudioRef.current.has(preferredSrc)) {
          preloadedAudioRef.current.set(preferredSrc, audioEl)
        }
      })
      .catch(err => {
        console.error("Playback error:", err)
        setError("Failed to play audio")
        setLoadingIndex(null)
        setTimeout(() => setError(null), 3000)
      })

    audioEl.onended = () => {
      setPlayingIndex(null)
      setAudio(null)
      currentAudioRef.current = null
    }
  }, [playingIndex])

  const loadArchivedTranscriptions = async () => {
    try {
      setLoading(true)
      setError(null)

      const url = selectedRoom
        ? `/api/staff/transcriptions-by-room?room=${encodeURIComponent(selectedRoom)}`
        : '/api/staff/transcriptions'

      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const json = await response.json()
      
      // Only get approved transcriptions
      const approved = json.filter((item: any) => item.is_approved === true)

      const processedArchived = approved.map((item: any, idx: number) => ({
        ...item,
        id: `${item.patient_id}_${item.session_id}`,
        isNew: false,
        isApproved: true,
        index: idx + 1,
      }))

      setArchivedData(processedArchived)
      setIsConnected(true)
      setLoading(false)
    } catch (err: any) {
      console.error('Failed to load archived transcriptions:', err)
      setError('Failed to load archived transcriptions. Please try again.')
      setIsConnected(false)
      setLoading(false)
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    loadArchivedTranscriptions()
  }, [selectedRoom])

  const handleDelete = async (row: RowData) => {
    if (!confirm("Are you sure you want to delete this transcription?")) return
    if (!row.id) return
    
    try {
      const [patientId, sessionId] = row.id.split('_')
      await fetch(`/api/staff/transcriptions/${patientId}/${sessionId}`, { method: "DELETE" })
      setArchivedData(prev => prev.filter(r => r.id !== row.id))
    } catch (err) {
      console.error("Failed to delete:", err)
      setError("Failed to delete transcription")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleRestore = async (rowId: string) => {
    const row = archivedData.find(r => r.id === rowId)
    if (!row) return
    try {
      const response = await fetch(`/api/staff/transcriptions/${rowId}/restore`, { 
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_approved: false })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      // Remove from archived data - user will need to go to Data tab to see it in Live Notes
      setArchivedData(prev => prev.filter(r => r.id !== rowId))
    } catch (err) {
      console.error('Restore error:', err)
      setError("Failed to restore")
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Archived Notes</span>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="w-[80px]">Audio</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Patient Note</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    <Loader2 className="animate-spin inline mr-2 h-4 w-4" />
                    Loading archived transcriptions...
                  </TableCell>
                </TableRow>
              )}
              {!loading && archivedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No archived transcriptions available
                  </TableCell>
                </TableRow>
              ) : (
                archivedData.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>
                      <AudioPlayerButton
                        url={row.audioUrl}
                        index={idx}
                        playingIndex={playingIndex}
                        loadingIndex={loadingIndex}
                        onClick={() => handlePlay(row.audioUrl, idx)}
                      />
                    </TableCell>
                    <TableCell>{row.column1}</TableCell>
                    <TableCell>{row.column2}</TableCell>
                    <TableCell>{row.column3}</TableCell>
                    <TableCell>{row.column4}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleRestore(row.id!)} 
                          title="Restore to Live Notes"
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <RotateCcw className="w-4 h-4 text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(row)} 
                          title="Delete"
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          {error && (
            <div className="p-2 text-center text-sm text-red-500 bg-red-50 rounded mt-4">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}