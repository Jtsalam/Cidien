const API_BASE = 'http://localhost:5001'; // Must match Flask port

export const fetchTranscriptions = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE}/transcriptions`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch transcriptions:', error);
    return [];
  }
};

export const processAudio = async (endpoint: 'room_num' | 'room_data', audioBlob: Blob, filename: string) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, filename);

  try {
    const response = await fetch(`${API_BASE}/process_audio/${endpoint}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Audio processing failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error in ${endpoint} processing:`, error);
    throw error;
  }
};

// Updated convenience methods
export const processRoomAudio = (audioBlob: Blob) => 
  processAudio('room_num', audioBlob, 'room_recording.webm');

export const processClinicalNote = (audioBlob: Blob) => 
  processAudio('room_data', audioBlob, 'clinical_note.webm');