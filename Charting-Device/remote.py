import os
import psycopg2
from flask import Flask, request, render_template, jsonify, send_file, session
from flask_socketio import SocketIO, join_room
from flask_cors import CORS
from functions import no_of_files, recognize_speech_from_audio, all_rooms, aud_info

# Setup Flask app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize recording counters for each room
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
recording_counters = {
    'room_aud': no_of_files(os.path.join(BASE_DIR, 'uploads', 'room_aud')),
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
    selectedOrg = request.form["Organization Name"]
    staffID = request.form.get("staff_id")
    cur.execute("SELECT center_id, center_name FROM medicalcenter_info")
    centerRows = cur.fetchall()
    center_found = False

    for center_id, center_name in centerRows:
        if selectedOrg == center_name:
            center_found = True
            cur.execute("SELECT user_id, staff_id FROM user_info WHERE center_id = %s AND staff_id = %s", (center_id, staffID))
            user_row = cur.fetchone()
            
            if not user_row:
                return render_template('login_form.html', error="Invalid Staff ID!")
            
            # Store session data
            session['user_id'] = user_row[0]
            session['staff_id'] = user_row[1]
            session['center_id'] = center_id
            session['center_name'] = center_name
            break  # no need to keep looping once found

    if not center_found:
        return render_template('login_form.html', error="Invalid Center ID!")

    return render_template("remote.html")


@app.route('/process_audio/room_num', methods=['POST'])
def room_btn_fn():
    global room_exists, room_number

    recording_counters['room_aud'] += 1

    if 'audio' not in request.files:
        logger.error("No audio file in request")
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join(BASE_DIR, 'uploads', 'room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_file.save(audio_path)

    room_number = recognize_speech_from_audio(audio_path)
    room_number = room_number['transcription']
    # room_list = all_rooms(f'{root}/uploads')
    room_list = all_rooms(os.path.join(BASE_DIR, 'uploads'))
    print(room_list)
    print(room_number)

    if room_number in room_list:
        room_exists = True
    elif room_number == "Audio not properly heard":
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
        return jsonify({'message': "Room does not exist!"})

    return jsonify({'message': 'Room audio processed successfully!'})


@app.route('/audio/<filename>')
def serve_audio(filename):
    # Check organization folders first (new structure)
    org_folders = ['EHC', 'EMC', 'JPCH', 'KMC', 'PVM', 'Unassigned']
    
    for org_folder in org_folders:
        full_path = os.path.join(BASE_DIR, 'uploads', 'Audio', org_folder, filename)
        if os.path.exists(full_path):
            return send_file(full_path, mimetype='audio/webm')
    
    # Check old folders as fallback
    old_folders = ['3438', '3439', '3461', '3463', 'Unassigned', 'room_aud']
    for folder in old_folders:
        full_path = os.path.join(BASE_DIR, 'uploads', folder, filename)
        if os.path.exists(full_path):
            return send_file(full_path, mimetype='audio/webm')
    
    # If file not found, check if it's in the database and remove the record
    try:
        cur.execute("SELECT id FROM room_data WHERE audio_path LIKE %s", (f"%{filename}",))
        result = cur.fetchone()
        if result:
            cur.execute("DELETE FROM room_data WHERE id = %s", (result[0],))
            conn.commit()
            print(f"Removed database record for missing audio file: {filename}")
    except Exception as e:
        print(f"Error checking database for missing file: {e}")
    
    return "File not found", 404

@app.route('/transcriptions', methods=['GET'])
def get_transcriptions():
    # Check if user is logged in
    if 'user_id' not in session:
        return jsonify([])
    
    # Filter transcriptions for the logged-in staff member
    staff_transcriptions = [t for t in transcriptions if t.get('user_id') == session['user_id']]
    return jsonify(staff_transcriptions)

@app.route('/transcriptions/<staff_id>', methods=['GET'])
def get_staff_transcriptions(staff_id):
    # Get user_id from staff_id
    user_id = get_user_id_from_staff_id(staff_id)
    if not user_id:
        return jsonify([])
    
    # Filter transcriptions for the specific staff member
    staff_transcriptions = [t for t in transcriptions if t.get('user_id') == user_id]
    return jsonify(staff_transcriptions)



@socketio.on('connect')
def handle_connect():
    print('Client connected to WebSocket')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected from WebSocket')

@socketio.on('join_staff_room')
def handle_join_staff_room(data):
    staff_id = data.get('user_id')  # This is actually staff_id from frontend
    if staff_id:
        user_id = get_user_id_from_staff_id(staff_id)
        if user_id:
            room = f"staff_{user_id}"
            join_room(room)
        else:
            print(f'No user_id found for staff_id: {staff_id}')

@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room')
    if room:
        join_room(room)

@socketio.on('ping')
def handle_ping():
    socketio.emit('pong', {'message': 'pong'})

@app.route('/process_audio/room_data', methods=['POST'])
def room_data_btn():
    global audio_path, room_number, room_exists

    if not room_number:
        return jsonify({'message': 'No room number detected'}), 400

    # Check if user is logged in
    if 'user_id' not in session:
        return jsonify({'message': 'Please log in first'}), 401

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    # audio_path = os.path.join(f'{root}/uploads/{room_name}', f'room.recording_{recording_counters[room_name]}.webm')
    audio_path = os.path.join(BASE_DIR, 'uploads', room_name, f'room.recording_{recording_counters[room_name]}.webm')
    audio_file.save(audio_path)
    filename = os.path.basename(audio_path)

    # Process and emit transcription data if room exists
    if room_exists:
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
    
    # Ensure all necessary directories exist
    os.makedirs('uploads', exist_ok=True)
    socketio.run(app, host='0.0.0.0', port=5000)
