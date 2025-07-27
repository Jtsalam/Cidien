// components/RoomList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, User, Bed, AlertCircle, Stethoscope } from 'lucide-react';
import AssignBedPopup from '@/components/Dashboard/AssignBedPopup';

interface Room {
  id: number;
  room_number: string;
  is_full: boolean;
  organization_id: number;
}

interface Bed {
  id: number;
  bed_id: number; // Add this to match AssignBedPopup expectations
  bed_letter: string;
  room_id: number;
  is_assigned: boolean;
  is_available: boolean;
  assigned_patient?: {
    patient_id: number;
    patient_name: string;
  } | null;
  assigned_nurse?: {
    user_id: number;
    user_name: string;
  } | null;
}

interface RoomWithBeds extends Room {
  beds: Bed[];
}

interface RoomListProps {
  centerId: number;
}

type FilterType = 'all' | 'available' | 'occupied';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

const RoomList: React.FC<RoomListProps> = ({ centerId }) => {
  const [rooms, setRooms] = useState<RoomWithBeds[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<RoomWithBeds[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast function
  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Fetch rooms and beds data
  useEffect(() => {
    const fetchRoomsAndBeds = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/rooms?organizationId=${centerId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        
        const data = await response.json();
        setRooms(data.rooms);
        setFilteredRooms(data.rooms);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsAndBeds();
  }, [centerId]);

  // Apply filter when filter type changes
  useEffect(() => {
    let filtered = rooms;
    
    switch (filter) {
      case 'available':
        filtered = rooms.filter(room => !room.is_full);
        break;
      case 'occupied':
        filtered = rooms.filter(room => room.is_full);
        break;
      case 'all':
      default:
        filtered = rooms;
        break;
    }
    
    setFilteredRooms(filtered);
  }, [filter, rooms]);

  const handleRoomClick = (roomId: number) => {
    setSelectedRoom(selectedRoom === roomId ? null : roomId);
  };

  const handleBedClick = (bed: Bed) => {
    setSelectedBed(bed);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBed(null);
  };
  
  const handleSave = async (data: {
    patientName: string;
    nurseId: number | null;
    assignToAllBeds: boolean;
  }) => {
    console.log('Saving data:', data);
  
    try {
      const response = await fetch('/api/assign-bed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bedId: selectedBed?.id,
          roomId: selectedRoom,
          centerId,
          patientName: data.patientName,
          nurseId: data.nurseId,
          assignToAllBeds: data.assignToAllBeds,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to assign bed');
      }

      // Refresh the room data
      const refreshResponse = await fetch(`/api/rooms?organizationId=${centerId}`);
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setRooms(refreshData.rooms);
      }
  
      addToast('Bed assigned successfully!', 'success');
      handleClosePopup();
    } catch (error) {
      addToast(`Error saving: ${(error as Error).message}`, 'error');
    }
  };

  const handleDischarge = async (data: { dischargePatient: boolean }) => {
    try {
      const response = await fetch('/api/discharge-bed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bedId: selectedBed?.id,
          centerId,
          dischargePatient: data.dischargePatient,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to discharge bed');
      }

      // Refresh the room data
      const refreshResponse = await fetch(`/api/rooms?organizationId=${centerId}`);
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setRooms(refreshData.rooms);
      }

      const message = data.dischargePatient ? 'Patient discharged successfully!' : 'Bed assignment cleared!';
      addToast(message, 'success');
      handleClosePopup();
    } catch (error) {
      addToast(`Error discharging: ${(error as Error).message}`, 'error');
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
    setSelectedRoom(null);
  };

  const getFilterLabel = (filterType: FilterType): string => {
    switch (filterType) {
      case 'all':
        return 'All Rooms';
      case 'available':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      default:
        return 'Filter';
    }
  };

  const getBedStatusColor = (bed: Bed) => {
    if (!bed.is_available) return 'text-red-600 bg-red-50';
    if (bed.is_assigned) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getBedStatusText = (bed: Bed) => {
    if (!bed.is_available) return 'Unavailable';
    if (bed.is_assigned) return 'Assigned';
    return 'Available';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Management</h1>
        
        {/* Filter Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {getFilterLabel(filter)}
            <ChevronDown 
              className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="py-1">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                    filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  All Rooms
                </button>
                <button
                  onClick={() => handleFilterChange('available')}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                    filter === 'available' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => handleFilterChange('occupied')}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                    filter === 'occupied' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  Occupied
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Showing {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Rooms List */}
      <div className="space-y-4">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No rooms found for the selected filter.
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div key={room.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Room Header */}
              <button
                onClick={() => handleRoomClick(room.id)}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 hover:text-blue-800 font-medium">
                      Room {room.room_number}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        room.is_full
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {room.is_full ? 'Full' : 'Available'}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      selectedRoom === room.id ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Bed Details */}
              {selectedRoom === room.id && (
                <div className="px-4 py-3 bg-white border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Beds in Room {room.room_number}:
                  </h3>
                  {room.beds.length === 0 ? (
                    <p className="text-sm text-gray-500">No beds found in this room.</p>
                  ) : (
                    <div className="space-y-3">
                      {room.beds.map((bed) => (
                        <div
                          key={bed.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleBedClick(bed)}
                        >
                          <div className="flex items-center space-x-3">
                            <Bed className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Bed {bed.bed_letter}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBedStatusColor(bed)}`}>
                              {getBedStatusText(bed)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            {bed.assigned_patient && (
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>{bed.assigned_patient.patient_name}</span>
                              </div>
                            )}
                            {bed.assigned_nurse && (
                              <div className="flex items-center space-x-1">
                                <Stethoscope className="w-3 h-3 text-blue-600" />
                                <span className="text-blue-600">{bed.assigned_nurse.user_name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {showPopup && selectedBed && (
        <AssignBedPopup
          open={showPopup}
          bed={selectedBed}
          centerId={centerId}
          roomId={selectedRoom!}
          onClose={handleClosePopup}
          onSave={handleSave}
          onDischarge={handleDischarge}
        />
      )}
    </div>
  );
};

export default RoomList;