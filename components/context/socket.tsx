"use client"
import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  isReceiving: boolean  // Add this
  transcriptions: any[]
  addTranscription: (data: any) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isReceiving: false,  // Add default
  transcriptions: [],
  addTranscription: () => {}
})

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isReceiving, setIsReceiving] = useState(false)  // Add this state
  const [transcriptions, setTranscriptions] = useState<any[]>([])

  useEffect(() => {
    const socketInstance = io('http://localhost:5001', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)
    
    const onTranscriptionStart = () => setIsReceiving(true)
    const onTranscriptionComplete = (data: any) => {
      setTranscriptions(prev => [...prev, {
        ...data,
        id: Date.now(),
        isNew: true
      }])
      setIsReceiving(false)
    }

    socketInstance.on('connect', onConnect)
    socketInstance.on('disconnect', onDisconnect)
    socketInstance.on('transcription_start', onTranscriptionStart)  // New event
    socketInstance.on('new_transcription', onTranscriptionComplete)

    // Fetch initial data
    fetch('http://localhost:5001/transcriptions')
      .then(res => res.json())
      .then(data => setTranscriptions(data))

    setSocket(socketInstance)

    return () => {
      socketInstance.off('connect', onConnect)
      socketInstance.off('disconnect', onDisconnect)
      socketInstance.off('transcription_start', onTranscriptionStart)
      socketInstance.off('new_transcription', onTranscriptionComplete)
      socketInstance.disconnect()
    }
  }, [])

  const addTranscription = (data: any) => {
    setTranscriptions(prev => [...prev, data])
  }

  return (
    <SocketContext.Provider value={{ 
      socket, 
      isConnected, 
      isReceiving,  // Include in provider
      transcriptions, 
      addTranscription 
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)