import speech_recognition as sr
from pydub import AudioSegment
from datetime import datetime
import os
import noisereduce as nr
import librosa
import soundfile as sf
import tempfile
import re

def convert_audio(file_path, target_format='wav'):
    """Convert audio file to the target format."""
    audio = AudioSegment.from_file(file_path)
    new_file_path = file_path.rsplit('.', 1)[0] + '.' + target_format
    audio.export(new_file_path, format=target_format)
    return new_file_path

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
        try:
            file_path = convert_audio(file_path)
            if not file_path or not os.path.exists(file_path):
                return {"success": False, "error": "Audio conversion failed."}
        except Exception as e:
            return {"success": False, "error": f"Conversion error: {e}"}

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
    try:
        # List all entries in the given directory
        entries = os.listdir(directory_path)
        
        # Filter out entries that are directories
        folders = [entry for entry in entries if (os.path.isdir(os.path.join(directory_path, entry))) and entry.isnumeric() == True]
        
        return folders
    except FileNotFoundError:
        return f"The directory {directory_path} does not exist."
    except PermissionError:
        return f"Permission denied for accessing the directory {directory_path}."
def no_of_files(folder_path):
    # List all items in the folder
    items = os.listdir(folder_path)
    # Filter out only files
    files = [item for item in items if os.path.isfile(os.path.join(folder_path, item))]
    return len(files)

def aud_info(folder_path):
    aud_time = os.path.getmtime(folder_path)
    dt = datetime.fromtimestamp(aud_time)

    # Format date like "July 1, 2025"
    date = dt.strftime("%B %d, %Y")

    # Format time like "6:14 PM"
    d_time = dt.strftime("%I:%M %p")

    result = recognize_speech_from_audio(folder_path)
    if isinstance(result, dict) and result.get("success"):
        chart = result["transcription"]
    else:
        chart = result.get("error", "Could not transcribe")

    return [date, d_time, chart]

def extract_room_bed(text: str) -> str | None:
    # Regex pattern: optional "room", digits, optional "bed"/space, single letter
    pattern = re.compile(r'(?:room\s*)?(\d{2,5})(?:\s*bed\s*|\s*)([a-zA-Z])', re.IGNORECASE)
    
    match = pattern.search(text)
    if not match:
        return None
    
    room = match.group(1)
    bed = match.group(2).upper()
    
    return f"{room} {bed}"