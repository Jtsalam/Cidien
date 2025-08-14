# Charting-Device/functions.py
import os
from datetime import datetime
import tempfile

import speech_recognition as sr
from pydub import AudioSegment
import noisereduce as nr
import librosa
import soundfile as sf

def ensure_dir(path: str):
    """Ensure a directory exists."""
    os.makedirs(path, exist_ok=True)

def convert_audio(file_path, target_format='wav'):
    """Convert audio file to the target format (requires ffmpeg installed)."""
    audio = AudioSegment.from_file(file_path)
    new_file_path = file_path.rsplit('.', 1)[0] + '.' + target_format
    audio.export(new_file_path, format=target_format)
    return new_file_path

def denoise_audio(input_path):
    """Apply noise reduction to an audio file."""
    # Avoid shadowing the speech_recognition alias 'sr'
    y, sample_rate = librosa.load(input_path, sr=None)
    reduced = nr.reduce_noise(y=y, sr=sample_rate)

    # Save to a temporary cleaned wav file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
    sf.write(temp_file.name, reduced, sample_rate)
    return temp_file.name

def recognize_speech_from_audio(file_path):
    """
    Recognize speech from an audio file (WAV preferred) with noise reduction.
    Returns a dict: { success: bool, transcription?: str, error?: str }
    """
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
        # Clean up temporary file
        try:
            os.remove(cleaned_file)
        except Exception:
            pass

def all_rooms(directory_path):
    try:
        entries = os.listdir(directory_path)
        folders = [
            entry for entry in entries
            if (os.path.isdir(os.path.join(directory_path, entry))) and entry.isnumeric()
        ]
        return folders
    except FileNotFoundError:
        return []
    except PermissionError:
        return []

def no_of_files(folder_path):
    if not os.path.isdir(folder_path):
        return 0
    items = os.listdir(folder_path)
    files = [item for item in items if os.path.isfile(os.path.join(folder_path, item))]
    return len(files)

def aud_info(file_path):
    """Return [date, time, transcription-or-error] for an audio file path."""
    try:
        aud_time = os.path.getmtime(file_path)
        dt = datetime.fromtimestamp(aud_time)
        date_str = dt.strftime("%B %d, %Y")
        time_str = dt.strftime("%I:%M %p")
    except Exception:
        date_str = "Unknown Date"
        time_str = "Unknown Time"

    result = recognize_speech_from_audio(file_path)
    if isinstance(result, dict) and result.get("success"):
        chart = result["transcription"]
    else:
        chart = (result.get("error") if isinstance(result, dict) else "Could not transcribe") or "Could not transcribe"

    return [date_str, time_str, chart]
