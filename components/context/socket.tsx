"use client"
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  isReceiving: boolean  // Add this
  transcriptions: any[]
  addTranscription: (data: any) => void
  removeTranscription: (id: string) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isReceiving: false,  // Add default
  transcriptions: [],
  addTranscription: () => {},
  removeTranscription: () => {}
})

export function SocketProvider({ children }: { children: React.ReactNode }) {
  console.log('🚀 SocketProvider mounting...', Date.now())
  
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isReceiving, setIsReceiving] = useState(false)  // Add this state
  const [transcriptions, setTranscriptions] = useState<any[]>([])
  const [processingAudios, setProcessingAudios] = useState<Set<string>>(new Set())
  const processingRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    console.log('🔧 SocketProvider useEffect running...', Date.now())
    const socketInstance = io('http://localhost:5001', {
      transports: ['polling'], 
      timeout: 60000,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    const onConnect = () => {
      console.log('Socket.io connected successfully')
      console.log('Socket ID:', socketInstance.id)
      setIsConnected(true)
    }
    const onDisconnect = () => {
      console.log('Socket.io disconnected')
      setIsConnected(false)
    }
    const onConnectError = (error: any) => {
      console.error('Socket.io connection error:', error)
      setIsConnected(false)
    }
    
    const onTranscriptionStart = () => setIsReceiving(true)
    const onTranscriptionComplete = async (data: any) => {
      console.log('🎯 New transcription received via Socket.io:', data)
      
      // Create a more comprehensive deduplication key
      const audioKey = data.audioUrl || data.upload_path || data.column4 || JSON.stringify(data)
      console.log('🔑 Using deduplication key:', audioKey)
      console.log('📋 Currently processing audios:', Array.from(processingRef.current))
      
      // IMMEDIATE check and mark to prevent any race conditions
      if (processingRef.current.has(audioKey)) {
        console.log('❌ DUPLICATE DETECTED - Already processing this transcription, skipping:', audioKey)
        return
      }
      
      // Mark immediately before any async operations
      console.log('✅ New transcription - adding to processing set immediately:', audioKey)
      processingRef.current.add(audioKey)
      setProcessingAudios(prev => new Set([...prev, audioKey]))
      setIsReceiving(true)
      
      // Auto-save new transcriptions to database immediately as unapproved
      try {
        const session_id = Math.floor(Math.random() * 2000000000)
        const autoSaveResponse = await fetch(`/api/staff/transcriptions/new_transcription_auto/approve`, {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patient_id: 1, // API will find a valid patient
            session_id,
            upload_path: data.audioUrl || '',
            patient_notes: data.column4 || '',
            upload_time: new Date().toISOString(),
            is_approved: false // Save as unapproved
          })
        })

        if (autoSaveResponse.ok) {
          const savedData = await autoSaveResponse.json()
          console.log('Auto-saved new transcription:', savedData)
          
          // Use the database ID for consistency
          const databaseId = `${savedData.patient_id}_${savedData.session_id}`
          
          setTranscriptions(prev => {
            // Check if this transcription already exists to prevent duplicates
            const existing = prev.find(t => t.id === databaseId)
            if (existing) {
              console.log('Transcription already exists in global context, skipping:', databaseId)
              return prev
            }
            
            const newTranscription = {
              ...data,
              id: databaseId,
              patient_id: savedData.patient_id,
              session_id: savedData.session_id,
              isNew: true,
              isApproved: false
            }
            
            console.log('Adding new transcription to global context:', newTranscription)
            return [...prev, newTranscription]
          })
        } else {
          console.error('Failed to auto-save transcription')
          // Fallback to temporary ID
          const tempId = `new_transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          setTranscriptions(prev => {
            console.log('Adding transcription with temp ID (fallback):', tempId)
            return [...prev, {
              ...data,
              id: tempId,
              isNew: true,
              isApproved: false
            }]
          })
        }
      } catch (error) {
        console.error('Error auto-saving transcription:', error)
        // Fallback to temporary ID
        const errorTempId = `new_transcription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        setTranscriptions(prev => {
          console.log('Adding transcription with temp ID (error fallback):', errorTempId)
          return [...prev, {
            ...data,
            id: errorTempId,
            isNew: true,
            isApproved: false
          }]
        })
      }
      
      // Remove from processing set (both ref and state)
      console.log('Removing from processing set:', audioKey)
      processingRef.current.delete(audioKey)
      setProcessingAudios(prev => {
        const newSet = new Set(prev)
        newSet.delete(audioKey)
        console.log('Processing set after removal:', Array.from(newSet))
        return newSet
      })
      
      setIsReceiving(false)
    }

    console.log('Setting up Socket.io event listeners...')
    
    // Remove any existing listeners first to prevent duplicates
    socketInstance.off('connect')
    socketInstance.off('disconnect') 
    socketInstance.off('connect_error')
    socketInstance.off('error')
    socketInstance.off('transcription_start')
    socketInstance.off('new_transcription')
    
    // Add fresh listeners
    socketInstance.on('connect', onConnect)
    socketInstance.on('disconnect', onDisconnect)
    socketInstance.on('connect_error', onConnectError)
    socketInstance.on('error', onConnectError)
    socketInstance.on('transcription_start', onTranscriptionStart)
    socketInstance.on('new_transcription', onTranscriptionComplete)
    
    // Add a test listener to see if ANY events are being received
    socketInstance.onAny((eventName, ...args) => {
      console.log('Socket.io event received:', eventName, args)
    })

    // Fetch initial data from our API
    fetch('/api/staff/transcriptions')
      .then(res => res.json())
      .then(data => {
        console.log('Initial transcriptions loaded from API:', data.length, 'items')
        const processedData = Array.isArray(data) ? data.map((item: any, index: number) => ({
          ...item,
          id: item.id || `${item.patient_id}_${item.session_id}`,
          index: index + 1
        })) : []
        console.log('Processed initial transcriptions:', processedData)
        setTranscriptions(processedData)
      })
      .catch(err => console.error('Failed to load initial transcriptions:', err))

    setSocket(socketInstance)

    return () => {
      socketInstance.off('connect', onConnect)
      socketInstance.off('disconnect', onDisconnect)
      socketInstance.off('connect_error', onConnectError)
      socketInstance.off('error', onConnectError)
      socketInstance.off('transcription_start', onTranscriptionStart)
      socketInstance.off('new_transcription', onTranscriptionComplete)
      socketInstance.disconnect()
    }
  }, [])

  const addTranscription = (data: any) => {
    setTranscriptions(prev => [...prev, data])
  }

  const removeTranscription = (id: string) => {
    console.log('Removing transcription from global context:', id)
    setTranscriptions(prev => {
      const filtered = prev.filter(t => t.id !== id)
      console.log('Global transcriptions after removal:', filtered.length, 'items')
      return filtered
    })
  }

  return (
    <SocketContext.Provider value={{ 
      socket, 
      isConnected, 
      isReceiving,  // Include in provider
      transcriptions, 
      addTranscription,
      removeTranscription 
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)