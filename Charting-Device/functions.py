import speech_recognition as sr
from pydub import AudioSegment
from datetime import datetime
import os
import re
import logging
import wave
import contextlib

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

def recognize_speech_from_audio(file_path, expected_rooms=None):
    """Recognize speech with improved reliability for room numbers."""
    recognizer = sr.Recognizer()
    
    # Configure recognizer settings
    recognizer.dynamic_energy_threshold = True
    recognizer.pause_threshold = 0.8
    
    # Convert to WAV if needed
    if not file_path.lower().endswith('.wav'):
        file_path = convert_audio(file_path)
        if not file_path:
            return {"success": False, "error": "Audio conversion failed"}

    try:
        # Verify audio file properties
        with contextlib.closing(wave.open(file_path, 'r')) as audio_file:
            frames = audio_file.getnframes()
            if frames < 1600:  # Less than 0.1s of audio at 16kHz
                return {"success": False, "error": "Audio too short"}

        with sr.AudioFile(file_path) as source:
            # Adjust for ambient noise and record
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio_data = recognizer.record(source)
            
            # First try with Google Web Speech API
            try:
                text = recognizer.recognize_google(audio_data, show_all=False)
                text = text.strip().upper()
                
                # If we have expected rooms, validate against them
                if expected_rooms:
                    # Extract all 4-digit numbers from transcription
                    found_numbers = re.findall(r'\b\d{4}\b', text)
                    for number in found_numbers:
                        if number in expected_rooms:
                            return {"success": True, "transcription": number}
                    
                    # If no valid room found
                    return {"success": False, "error": "No valid room number detected"}
                
                return {"success": True, "transcription": text}
                
            except sr.UnknownValueError:
                return {"success": False, "error": "Audio not clear"}
            except sr.RequestError as e:
                logger.warning(f"Google API failed, trying Sphinx: {e}")
                # Fallback to CMU Sphinx if Google fails
                try:
                    text = recognizer.recognize_sphinx(audio_data)
                    return {"success": True, "transcription": text.strip()}
                except:
                    return {"success": False, "error": "All recognition attempts failed"}

    except Exception as e:
        logger.error(f"Recognition error: {e}")
        return {"success": False, "error": f"Processing error: {e}"}

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