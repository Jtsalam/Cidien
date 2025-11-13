"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, Download, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApprovedNote {
  id: number;
  approved_date: string;
  approved_time: string;
  pdf_path: string;
  patient_note: string;
}

interface BedDetailsViewProps {
  roomNumber: string;
  bedLetter: string;
  onBack: () => void;
}

const PDFChip: React.FC<{ pdfPath: string; index: number }> = ({ pdfPath, index }) => {
  const [showViewer, setShowViewer] = useState(false);
  
  // Extract filename from path
  const filename = pdfPath.split(/[/\\]/).pop() || 'document.pdf';
  
  // Convert Windows path to URL path
  // Example: C:\...\Charting-Device\uploads\PDFs\NCI\file.pdf -> /uploads/PDFs/NCI/file.pdf
  const pathParts = pdfPath.replace(/\\/g, '/').split('/');
  const uploadsIndex = pathParts.findIndex(part => part === 'uploads');
  const relativePath = uploadsIndex >= 0 ? pathParts.slice(uploadsIndex).join('/') : pdfPath;
  const pdfUrl = `http://localhost:5000/${relativePath}`;

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    link.click();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* PDF Chip Button */}
        <button
          onClick={() => setShowViewer(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-full transition-colors group"
          aria-label={`View PDF: ${filename}`}
          title={filename}
        >
          <FileText className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-red-700 max-w-[150px] truncate">
            {filename}
          </span>
        </button>

        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleOpenInNewTab}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title="Open in new tab"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showViewer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900 truncate max-w-md" title={filename}>
                  {filename}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.print()}
                  className="gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowViewer(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="w-full h-full border-0"
                title={`PDF Viewer: ${filename}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const BedDetailsView: React.FC<BedDetailsViewProps> = ({ roomNumber, bedLetter, onBack }) => {
  const [approvedNotes, setApprovedNotes] = useState<ApprovedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/staff/approved-notes?room=${encodeURIComponent(roomNumber)}&bed=${encodeURIComponent(bedLetter)}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch approved notes');
        }
        
        const data = await response.json();
        setApprovedNotes(data.notes || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedNotes();
  }, [roomNumber, bedLetter]);

  return (
    <div className="min-h-screen bg-gray-50 animate-in slide-in-from-right duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assigned Rooms
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Room {roomNumber} - Bed {bedLetter}
            </h1>
            <p className="text-gray-600 mt-1">
              Approved medical notes and documentation
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-emerald-600"></div>
            <p className="text-gray-600 mt-4">Loading approved notes...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : approvedNotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No approved notes found for this bed.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Index
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Approved Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Approved Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      File Log
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {approvedNotes.map((note, index) => (
                    <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {note.approved_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {note.approved_time}
                      </td>
                      <td className="px-6 py-4">
                        <PDFChip pdfPath={note.pdf_path} index={index} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedDetailsView;

