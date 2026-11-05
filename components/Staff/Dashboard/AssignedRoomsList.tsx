import React, { useEffect, useState } from 'react';
import { ChevronRight, DoorOpen, FileArchive } from 'lucide-react';
import BedDetailsView from './BedDetailsView';
import { Skeleton } from '@/components/ui/skeleton';

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
  /** Room numbers (string) that received a new approval — show NEW until the room header is expanded. */
  roomsWithNewApproval?: Set<string>;
  onClearNewBadgeForRoom?: (roomNumber: string) => void;
}

const AssignedRoomsList: React.FC<AssignedRoomsListProps> = ({
  nurseId,
  selectedRoom,
  roomsWithNewApproval,
  onClearNewBadgeForRoom,
}) => {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBed, setSelectedBed] = useState<{ room: string; bed: string } | null>(null);

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

  const handleBedClick = (roomNumber: string, bedLetter: string) => {
    // Opening a bed counts as seeing the room's new approval.
    onClearNewBadgeForRoom?.(roomNumber);
    setSelectedBed({ room: roomNumber, bed: bedLetter });
  };

  const handleBackToList = () => {
    setSelectedBed(null);
  };

  // If a bed is selected, show the BedDetailsView
  if (selectedBed) {
    return (
      <BedDetailsView
        roomNumber={selectedBed.room}
        bedLetter={selectedBed.bed}
        onBack={handleBackToList}
      />
    );
  }

  const header = (
    <div className="mb-6">
      <p className="text-sm font-medium text-emerald-700">{selectedRoom ? `Room ${selectedRoom}` : 'All rooms'}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Archive</h1>
      <p className="mt-1 text-gray-600">Approved notes, filed by room and bed. Pick a bed to see its reports.</p>
    </div>
  );

  if (loading) {
    return (
      <div className="animate-fade-up">
        {header}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading rooms">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-slate-900/[0.07] bg-white p-5 shadow-card">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || rooms.length === 0) {
    return (
      <div className="animate-fade-up">
        {header}
        <div className="flex flex-col items-center rounded-3xl border border-slate-900/[0.07] bg-white px-6 py-16 text-center shadow-card">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-8 ring-emerald-50/50">
            <FileArchive className="h-7 w-7 text-emerald-600" aria-hidden />
          </span>
          <p className="mt-5 text-lg font-semibold text-gray-900">
            {error ? "We couldn't load your rooms" : 'No rooms assigned yet'}
          </p>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {error ?? 'Once you have bed assignments, their approved notes will be filed here.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      {header}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room, idx) => {
          const isNew = roomsWithNewApproval?.has(room.room_number);
          return (
            <section
              key={room.room_number}
              className={`animate-fade-up rounded-2xl border bg-white p-5 shadow-card transition-shadow duration-200 ease-settle hover:shadow-card-hover ${
                isNew ? 'border-emerald-300 ring-4 ring-emerald-100' : 'border-slate-900/[0.07]'
              }`}
              style={{ animationDelay: `${Math.min(idx, 8) * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <DoorOpen className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold tracking-tight text-gray-900">Room {room.room_number}</h2>
                  <p className="text-xs text-gray-500">
                    {room.beds.length} bed{room.beds.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {isNew && (
                  <span className="animate-pop rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    New
                  </span>
                )}
              </div>

              {room.beds.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">No beds assigned in this room.</p>
              ) : (
                <ul className="mt-4 space-y-1.5">
                  {room.beds.map((bed) => (
                    <li key={bed.bed_letter}>
                      <button
                        type="button"
                        onClick={() => handleBedClick(room.room_number, bed.bed_letter)}
                        className="group flex w-full items-center gap-3 rounded-xl bg-gray-50/80 px-3 py-2.5 text-left ring-1 ring-inset ring-slate-900/[0.04] transition-[background-color,box-shadow,transform] duration-150 ease-settle hover:bg-emerald-50 hover:ring-emerald-200 active:scale-[0.99]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-emerald-700 shadow-sm ring-1 ring-slate-900/[0.06]">
                          {bed.bed_letter}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">
                          {bed.patient_name || 'Unassigned'}
                        </span>
                        <ChevronRight
                          className="h-4 w-4 text-gray-400 transition-transform duration-150 ease-settle group-hover:translate-x-0.5 group-hover:text-emerald-600"
                          aria-hidden
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AssignedRoomsList;
