# Database Integration for Room Data

## Overview

The system has been updated to use a database-driven approach for storing and retrieving room data, replacing the previous in-memory transcriptions system.

## Key Changes

### 1. Database Schema
- Added `room_data` table in `prisma/schema.prisma`
- Stores `bed_id` and `audio_path` for each recording
- Links to `bed_info` table to associate recordings with specific beds

### 2. Flask Server Updates (`Charting-Device/remote.py`)
- Removed global `transcriptions` list
- Added database operations to store room data
- Updated `/room-data` endpoint to fetch data from database
- Modified audio processing to store data in database instead of memory
- Added staff ID tracking for proper data filtering

### 3. Frontend Updates (`components/DataTable.tsx`)
- Updated interface from `RowData` to `RoomData`
- Changed data source from `/transcriptions` to `/api/room-data`
- Updated table columns to show bed information
- Modified socket events from `new_transcription` to `new_room_data`

### 4. API Integration (`app/api/room-data/route.ts`)
- New Next.js API endpoint that proxies to Flask server
- Handles staff authentication via cookies
- Passes staff ID to Flask server for data filtering

## How It Works

### 1. Room Validation
- When a nurse logs in, their assigned rooms/beds are loaded
- Room audio is processed and validated against assigned rooms
- Only valid rooms are allowed to proceed

### 2. Data Storage
- Valid room recordings are stored in the `room_data` table
- Audio files are saved to appropriate folders based on organization
- Database entry links the audio file to the specific bed

### 3. Data Retrieval
- Frontend fetches data via Next.js API
- API calls Flask server with staff ID
- Flask server queries database for staff's assigned beds
- Returns room data with audio paths, dates, times, and transcriptions

### 4. Real-time Updates
- New recordings trigger `new_room_data` socket events
- Frontend receives real-time updates for new entries
- Data is displayed with visual indicators for new entries

## Benefits

1. **Persistence**: Data is stored in database, not lost on server restart
2. **Filtering**: Easy to filter by staff member, room, or bed
3. **Scalability**: Database can handle large amounts of data efficiently
4. **Querying**: Can easily search and filter historical data
5. **Performance**: Database queries are faster than file system operations

## Database Schema

```sql
CREATE TABLE room_data (
  id SERIAL PRIMARY KEY,
  bed_id INTEGER REFERENCES bed_info(bed_id),
  audio_path VARCHAR(400)
);
```

## API Endpoints

- `GET /api/room-data` - Fetch room data for authenticated staff member
- `GET /room-data?staff_id=X` - Flask endpoint for room data (called by Next.js API)
- `POST /process_audio/room_data` - Process and store room audio data

## Socket Events

- `new_room_data` - Emitted when new room data is processed and stored 