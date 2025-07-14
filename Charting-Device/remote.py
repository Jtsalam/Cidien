import os
import threading
from flask import Flask, request, render_template, jsonify, send_from_directory, send_file
from flask_socketio import SocketIO
from flask_cors import CORS
from functions import no_of_files, recognize_speech_from_audio, all_rooms, aud_info
import warnings
from urllib3.exceptions import NotOpenSSLWarning
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

warnings.filterwarnings("ignore", category=NotOpenSSLWarning)

# Setup Flask app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize recording counters for each room
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
recording_counters = {
    'room_aud': no_of_files(os.path.join(BASE_DIR, 'uploads', 'room_aud')),
    '3438': no_of_files(os.path.join(BASE_DIR, 'uploads', '3438')),
    '3439': no_of_files(os.path.join(BASE_DIR, 'uploads', '3439')),
    '3461': no_of_files(os.path.join(BASE_DIR, 'uploads', '3461')),
    '3463': no_of_files(os.path.join(BASE_DIR, 'uploads', '3463')),
    'Unassigned': no_of_files(os.path.join(BASE_DIR, 'uploads', 'Unassigned')),
}

# Globals for state
room_exists = False
room_number = ""
audio_path = ""
transcriptions = []  # Global list to store all transcriptions

@app.route("/", methods=['GET'])
def index():
    return render_template("login_form.html")

@app.route("/login_val", methods=['POST', 'GET'])
def submit_btn():
    return render_template("remote.html")

@app.route('/process_audio/room_num', methods=['POST'])
def room_btn_fn():
    global room_exists, room_number, audio_path

    recording_counters['room_aud'] += 1

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join(BASE_DIR, 'uploads', 'room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_file.save(audio_path)

    # Get list of valid rooms
    valid_rooms = all_rooms(os.path.join(BASE_DIR, 'uploads'))
    
    # Recognize speech with room number validation
    result = recognize_speech_from_audio(audio_path, valid_rooms)
    
    if not result['success']:
        room_exists = False
        return jsonify({'message': result['error']}), 400
    
    room_number = result['transcription']
    logger.info(f"Recognized room number: {room_number}")
    
    # Verify room exists
    if room_number in valid_rooms:
        room_exists = True
        return jsonify({
            'message': 'Room audio processed successfully!',
            'room_number': room_number
        })
    else:
        room_exists = False
        return jsonify({
            'message': 'Recognized room does not exist!',
            'recognized_room': room_number,
            'valid_rooms': valid_rooms
        }), 400

@app.route('/audio/<filename>')
def serve_audio(filename):
    folders = ['3438', '3439', '3461', '3463', 'Unassigned', 'room_aud']
    for folder in folders:
        full_path = os.path.join(BASE_DIR, 'uploads', folder, filename)
        if os.path.exists(full_path):
            return send_file(full_path, mimetype='audio/webm')
    return "File not found", 404

@app.route('/transcriptions', methods=['GET'])
def get_transcriptions():
    return jsonify(transcriptions)

@app.route('/process_audio/room_data', methods=['POST'])
def room_data_btn():
    global audio_path, room_number, room_exists

    if not room_number:
        return jsonify({'message': 'No room number detected'}), 400

    # Determine where to store the file
    room_name = room_number if room_exists else "Unassigned"
    recording_counters[room_name] += 1

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join(BASE_DIR, 'uploads', room_name, f'room.recording_{recording_counters[room_name]}.webm')
    audio_file.save(audio_path)
    filename = os.path.basename(audio_path)

    # Process and emit transcription data
    chart_info = aud_info(audio_path)
    chart_data = {
        'room_id': room_number,
        'date': chart_info[0],
        'time': chart_info[1],
        'note': chart_info[2],
    }

    data = {
        "column1": chart_data['room_id'],
        "column2": chart_data['date'],
        "column3": chart_data['time'],
        "column4": chart_data['note'],
        "audioUrl": f"/audio/{filename}"
    }

    transcriptions.append(data)
    socketio.emit('new_transcription', data)

    return jsonify({'message': 'Room data audio processed and emitted!'})
    
if __name__ == '__main__':
    print("Running server...")
    os.makedirs('uploads', exist_ok=True)
    # Create all required room directories if they don't exist
    for room in ['3438', '3439', '3461', '3463', 'Unassigned', 'room_aud']:
        os.makedirs(os.path.join('uploads', room), exist_ok=True)
    socketio.run(app, host='0.0.0.0', port=3000)