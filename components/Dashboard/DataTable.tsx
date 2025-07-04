'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Loader2, Database } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"

// Initialize socket connection once
const socket = io('http://localhost:5000'); // Adjust to your Flask server address if needed

interface RowData {
  index: number;
  audioUrl: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}

export default function DataTable() {
  const [data, setData] = useState<RowData[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handlePlay = (url: string, index: number) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
  
      if (playingIndex === index) {
        setPlayingIndex(null);
        setAudio(null);
        return;
      }
    }
  
    setLoadingIndex(index);
    const newAudio = new Audio(`http://localhost:5000${url}`);
    newAudio.play()
      .then(() => {
        setAudio(newAudio);
        setPlayingIndex(index);
        setLoadingIndex(null);
      })
      .catch((err) => {
        console.error("Playback error:", err);
        setLoadingIndex(null);
      });
  
    newAudio.onended = () => {
      setPlayingIndex(null);
      setAudio(null);
    };
  };
  
  const handleRowDoubleClick = (audioUrl: string, index: number) => {
    handlePlay(audioUrl, index)
  }

  useEffect(() => {
    // Load existing transcriptions
    fetch('http://localhost:5000/transcriptions')
    .then(res => res.json())
    .then(json => setData(json))
    .catch(err => console.error("Failed to load data:", err));

    socket.on('connect', () => {
      console.log('Connected to Flask WebSocket');
    });

    socket.on('new_transcription', (payload) => {
      console.log("Incoming payload:", payload);
      
      setData((prevData) => [
        ...prevData,
        {
          index: prevData.length + 1,
          audioUrl: payload.audioUrl || "—", // <-- Use audioUrl directly from payload
          column1: payload.column1 || "—",    // room_id (not displayed)
          column2: payload.column2 || "—",    // date
          column3: payload.column3 || "—",    // time
          column4: payload.column4 || "—"     // note
        }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Tooltip.Provider>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <span>Real-time Transcriptions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
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
                        key={`${row.column2}-${row.column3}-${row.audioUrl}`}
                        className="hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer relative"
                        onDoubleClick={() => handleRowDoubleClick(row.audioUrl, i)}
                        title="Double-click to play audio"
                      >
                        <TableCell className="relative font-medium w-16 text-center group">
                          {/* Index number fades out on hover of cell */}
                          <span
                            className={`transition-opacity ${playingIndex === i ? "opacity-0" : "group-hover:opacity-0"}`}
                          >
                            {i + 1}
                          </span>
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
                        <TableCell>{row.column2}</TableCell>
                        <TableCell>{row.column3}</TableCell>
                        <TableCell>{row.column4}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        Waiting for data...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Tooltip.Provider>
  );
}