How the whole flow looks in the frontend
1. Upload room audio (Recording comes from Holding and releasing from the Green button)
const formData = new FormData();
formData.append("file", roomBlob, "room.webm");
formData.append("type", "ROOM");

const uploadRes = await fetch("/api/recordings/upload", {
  method: "POST",
  body: formData,
});

const { recordingId: roomRecordingId } = await uploadRes.json();

2. Upload note audio (Recording comes from Holding and releasing from the Red button)
const formData2 = new FormData();
formData2.append("file", noteBlob, "note.webm");
formData2.append("type", "NOTE");

const uploadRes2 = await fetch("/api/recordings/upload", {
  method: "POST",
  body: formData2,
});

const { recordingId: noteRecordingId } = await uploadRes2.json();

3. Transcribe both
await fetch("/api/recordings/transcribe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ recordingId: roomRecordingId }),
});

await fetch("/api/recordings/transcribe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ recordingId: noteRecordingId }),
});

4. Create the room_data row
await fetch("/api/room-data/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    bed_id: selectedBedId,
    roomRecordingId,
    noteRecordingId,
  }),
});