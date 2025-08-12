import speech_recognition as sr
from pydub import AudioSegment
from datetime import datetime
import os
import re
import logging
import wave
import contextlib
import noisereduce as nr
import librosa
import soundfile as sf
import tempfile

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def convert_audio(file_path, target_format='wav'):
    """Convert audio file to WAV format with consistent parameters."""
    try:
        audio = AudioSegment.from_file(file_path)
        
        # Standardize audio parameters
        audio = audio.set_frame_rate(16000)  # 16kHz sample rate
        audio = audio.set_channels(1)       # Mono
        audio = audio.set_sample_width(2)   # 16-bit
        
        new_file_path = file_path.rsplit('.', 1)[0] + '.' + target_format
        audio.export(new_file_path, format=target_format, parameters=[
            '-ar', '16000',     # Audio sample rate
            '-ac', '1',         # Audio channels
            '-acodec', 'pcm_s16le'  # Audio codec
        ])
        return new_file_path
    except Exception as e:
        logger.error(f"Audio conversion failed: {e}")
        return None

def denoise_audio(input_path):
    """Apply noise reduction to an audio file."""
    y, sr = librosa.load(input_path, sr=None)
    reduced = nr.reduce_noise(y=y, sr=sr)
    
    # Save to a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
    sf.write(temp_file.name, reduced, sr)
    return temp_file.name

def recognize_speech_from_audio(file_path):
    """Recognize speech from an audio file (WAV preferred) with noise reduction."""
    recognizer = sr.Recognizer()

    # Step 1: Convert to WAV if needed
    if not file_path.lower().endswith('.wav'):
        file_path = convert_audio(file_path)
        if not file_path:
            return {"success": False, "error": "Audio conversion failed"}

    # Step 2: Denoise audio
    try:
        cleaned_file = denoise_audio(file_path)
    except Exception as e:
        return {"success": False, "error": f"Noise reduction failed: {e}"}

    # Step 3: Transcribe
    try:
        with sr.AudioFile(cleaned_file) as source:
            audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        return {"success": True, "transcription": text}
    except sr.UnknownValueError:
        return {"success": False, "error": "Audio not properly heard"}
    except sr.RequestError as e:
        return {"success": False, "error": f"Google API error: {e}"}
    finally:
        os.remove(cleaned_file)  # Clean up temporary file





def all_rooms(directory_path):
    """Get list of valid room numbers from directory structure."""
    try:
        entries = os.listdir(directory_path)
        return [
            entry for entry in entries 
            if (
                os.path.isdir(os.path.join(directory_path, entry)) 
                and entry.isdigit() 
                and len(entry) == 4
            )
        ]  # Only 4-digit room numbers
    except Exception as e:
        logger.error(f"Error listing rooms: {e}")
        return []

def no_of_files(folder_path):
    """Count files in directory with error handling."""
    try:
        return len([name for name in os.listdir(folder_path) 
                  if os.path.isfile(os.path.join(folder_path, name))])
    except Exception as e:
        logger.error(f"Error counting files: {e}")
        return 0

def aud_info(audio_path):
    """Get audio metadata and transcription with improved reliability."""
    try:
        # Get file metadata
        aud_time = os.path.getmtime(audio_path)
        dt = datetime.fromtimestamp(aud_time)
        date = dt.strftime("%B %d, %Y")
        d_time = dt.strftime("%I:%M %p")
        
        # Get transcription with room number validation
        valid_rooms = all_rooms(os.path.dirname(os.path.dirname(audio_path)))
        result = recognize_speech_from_audio(audio_path, valid_rooms)
        
        if result["success"]:
            chart = result["transcription"]
        else:
            chart = result.get("error", "Transcription failed")
            logger.warning(f"Transcription failed for {audio_path}: {chart}")
        
        return [date, d_time, chart]
    except Exception as e:
        logger.error(f"Error in aud_info: {e}")
        return ["Date error", "Time error", "Info error"]