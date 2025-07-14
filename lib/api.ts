const API_BASE = 'http://localhost:3000';

export const fetchTranscriptions = async () => {
  const response = await fetch(`${API_BASE}/transcriptions`);
  return await response.json();
};

export const processRoomAudio = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'room_recording.webm');
  
  const response = await fetch(`${API_BASE}/process_audio/room_num`, {
    method: 'POST',
    body: formData
  });
  return await response.json();
};

export const processClinicalNote = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'clinical_note.webm');
  
  const response = await fetch(`${API_BASE}/process_audio/room_data`, {
    method: 'POST',
    body: formData
  });
  return await response.json();
};