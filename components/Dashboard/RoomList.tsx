// components/RoomList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Room {
  id: number;
  room_number: string;
  is_full: boolean;
  organization_id: number;
}

interface Bed {
  id: number;
  bed_letter: string;
  room_id: number;
}

interface RoomWithBeds extends Room {
  beds: Bed[];
}

interface RoomListProps {
  centerId: number;
}

type FilterType = 'all' | 'available' | 'occupied';

const RoomList: React.FC<RoomListProps> = ({ centerId }) => {
  const [rooms, setRooms] = useState<RoomWithBeds[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<RoomWithBeds[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleBedClick = (bedId: number, bedLetter: string) => {
    console.log(`Bed ${bedLetter} clicked (ID: ${bedId})`);
    // Add your bed click logic here
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
    setSelectedRoom(null); // Close any open room details
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
    <div className="p-6 max-w-4xl mx-auto">
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
                      [{room.room_number}]
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        room.is_full
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {room.is_full ? 'Occupied' : 'Available'}
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
                    <div className="space-y-2">
                      {room.beds.map((bed) => (
                        <button
                          key={bed.id}
                          onClick={() => handleBedClick(bed.id, bed.bed_letter)}
                          className="block text-left text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1"
                        >
                          Bed {bed.bed_letter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomList;