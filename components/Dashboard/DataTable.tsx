'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

// Initialize socket connection once
const socket = io('http://localhost:5000'); // Adjust to your Flask server address if needed

interface RowData {
  index: number;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}

export default function DataTable() {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Flask WebSocket');
    });

    socket.on('new_transcription', (payload) => {
      console.log("Incoming payload:", payload);
      
      setData((prevData) => [
        ...prevData,
        {
          index: prevData.length + 1,
          column1: payload.column1 || "—",
          column2: payload.column2 || "—",
          column3: payload.column3 || "—",
          column4: payload.column4 || "—"
        }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
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
                  <TableHead className="font-semibold text-gray-700">Transcription</TableHead>
                  <TableHead className="font-semibold text-gray-700">Confidence</TableHead>
                  <TableHead className="font-semibold text-gray-700">Timestamp</TableHead>
                  <TableHead className="font-semibold text-gray-700">Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <TableRow key={row.index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{row.index}</TableCell>
                      <TableCell>{row.column1}</TableCell>
                      <TableCell>{row.column2}</TableCell>
                      <TableCell>{row.column3}</TableCell>
                      <TableCell>{row.column4}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Waiting for transcriptions...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}