import speech_recognition as sr
from pydub import AudioSegment
import os
import pandas as pd
import time
import csv
import json

def convert_audio(file_path, target_format='wav'):
    """Convert audio file to the target format."""
    audio = AudioSegment.from_file(file_path)
    new_file_path = file_path.rsplit('.', 1)[0] + '.' + target_format
    audio.export(new_file_path, format=target_format)
    return new_file_path

def recognize_speech_from_audio(file_path):
    """Recognize speech from an audio file."""
    recognizer = sr.Recognizer()
    
    # Convert audio file to WAV format if necessary
    if not file_path.lower().endswith('.wav'):
        file_path = convert_audio(file_path)
    
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)
    
    try:
        # Recognize speech using Google Web Speech API
        text = recognizer.recognize_google(audio_data)
        return(f"{text}")
    except sr.UnknownValueError:
        return("Audio not properly heard")
    except sr.RequestError as e:
        return(f"Could not request results from Google Web Speech API; {e}")

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
    time_info = time.ctime(aud_time)
    time_info = time_info.split(" ")
    date = f"{time_info[1]} {time_info[2]} {time_info[-1]}"
    d_time = time_info[3]
    chart = recognize_speech_from_audio(folder_path)
    return [date, d_time, chart]