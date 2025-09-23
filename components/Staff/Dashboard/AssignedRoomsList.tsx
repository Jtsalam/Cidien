import React, { useEffect, useState } from 'react';

interface BedInfo {
  bed_letter: string;
  patient_name?: string;
}

interface RoomInfo {
  room_number: string;
  beds: BedInfo[];
}

interface AssignedRoomsListProps {
  nurseId: string;
  selectedRoom: string | null;
}

const AssignedRoomsList: React.FC<AssignedRoomsListProps> = ({ nurseId, selectedRoom }) => {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [expandedRooms, setExpandedRooms] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nurseId) return;
    setLoading(true);
    setError(null);
    let url = `/api/staff/assigned-rooms-beds?nurseId=${encodeURIComponent(nurseId)}`;
    if (selectedRoom) {
      url += `&room=${encodeURIComponent(selectedRoom)}`;
    }
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch assigned rooms/beds');
        const data = await res.json();
        setRooms(data.rooms || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [nurseId, selectedRoom]);

  const toggleRoom = (room_number: string) => {
    setExpandedRooms((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(room_number)) {
        newSet.delete(room_number);
      } else {
        newSet.add(room_number);
      }
      return newSet;
    });
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading assigned rooms...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }
  if (rooms.length === 0) {
    return <div className="p-6 text-gray-500">No assigned rooms or beds found.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Assigned Rooms & Beds</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.room_number} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleRoom(room.room_number)}
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset flex justify-between items-center"
            >
              <span className="font-medium text-emerald-700">Room {room.room_number}</span>
              <span className={`transition-transform ${expandedRooms.has(room.room_number) ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {expandedRooms.has(room.room_number) && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                {room.beds.length === 0 ? (
                  <p className="text-sm text-gray-500">No beds assigned in this room.</p>
                ) : (
                  <ul className="space-y-2">
                    {room.beds.map((bed) => (
                      <li key={bed.bed_letter} className="flex items-center space-x-4">
                        <span className="font-medium">Bed {bed.bed_letter}</span>
                        <span className="text-gray-600">→</span>
                        <span className="text-emerald-700 font-semibold">{bed.patient_name || 'Unassigned'}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedRoomsList;
