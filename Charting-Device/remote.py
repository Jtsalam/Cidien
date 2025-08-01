import os
import psycopg2
from flask import Flask, request, render_template, jsonify, send_file, session
from flask_socketio import SocketIO
from flask_cors import CORS
from functions import no_of_files, recognize_speech_from_audio, all_rooms, aud_info
import uuid

# Setup Flask app
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for sessions
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

# Organization name mapping
ORG_MAPPING = {
    'EHC': 'EHC',
    'EMC': 'EMC', 
    'JPCH': 'JPCH',
    'KMC': 'KMC',
    'PVM': 'PVM',
    # Add full names that might be in the database
    "Erindale Health Center": "EHC",
    "Parkville Manor": "PVM",
    "Kenderdine Medical Clinic": "KMC",
    "Jim Pattison Children's Hospital": "JPCH",
    "Evergreen Medical Clinic": "EMC"
}

# Replace these values with your actual DB credentials
conn = psycopg2.connect(
    dbname="medicalcentersdb",
    user="postgres",
    password="PostSQL@2025",
    host="localhost",  # or your DB server
    port="5432"         # default port
)
cur = conn.cursor()



# Initialize recording counters for each room
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # This resolves to /Charting-Device
recording_counters = {
    'room_aud': no_of_files(os.path.join(BASE_DIR, 'uploads', 'room_aud')),
    'Unassigned': no_of_files(os.path.join(BASE_DIR, 'uploads', 'Unassigned')),
}



# Globals for state
room_exists = False
room_number = ""
audio_path = ""
transcriptions = []  # Global list to store all transcriptions

def load_transcriptions_from_database():
    """Load all transcriptions from the database on startup"""
    try:
        cur.execute("""
            SELECT rd.id, rd.audio_path, rd.bed_id, 
                   bi.bed_letter, ri.room_number, ui.user_id, ui.staff_id
            FROM room_data rd
            JOIN bed_info bi ON rd.bed_id = bi.bed_id
            JOIN room_info ri ON bi.room_id = ri.room_id
            JOIN user_info ui ON bi.assigned_nurse_id = ui.user_id
            ORDER BY rd.id DESC
        """)
        rows = cur.fetchall()
        
        loaded_transcriptions = []
        for row in rows:
            # Process each transcription
            audio_path = row[1]
            if os.path.exists(audio_path):
                try:
                    chart_info = aud_info(audio_path)
                    transcription_data = {
                        "column1": f"{row[4]} {row[3]}",  # room_number bed_letter
                        "column2": chart_info[0],  # date
                        "column3": chart_info[1],  # time
                        "column4": chart_info[2],  # note
                        "audioUrl": f"/audio/{os.path.basename(audio_path)}",
                        "bed_id": row[2],
                        "user_id": row[5]
                    }
                    loaded_transcriptions.append(transcription_data)
                except Exception as e:
                    print(f"Error processing transcription for {audio_path}: {e}")
                    # If audio processing fails, still include basic info
                    transcription_data = {
                        "column1": f"{row[4]} {row[3]}",  # room_number bed_letter
                        "column2": "Unknown Date",
                        "column3": "Unknown Time",
                        "column4": "Audio file exists but transcription failed",
                        "audioUrl": f"/audio/{os.path.basename(audio_path)}",
                        "bed_id": row[2],
                        "user_id": row[5]
                    }
                    loaded_transcriptions.append(transcription_data)
            else:
                print(f"Audio file not found: {audio_path}")
                # Remove from database if file doesn't exist
                try:
                    cur.execute("DELETE FROM room_data WHERE id = %s", (row[0],))
                    conn.commit()
                    print(f"Removed missing audio file record from database: {row[0]}")
                except Exception as db_error:
                    print(f"Error removing missing audio record: {db_error}")
        
        return loaded_transcriptions
    except Exception as e:
        print(f"Error loading transcriptions from database: {e}")
        return []

def get_staff_assigned_rooms(user_id):
    """Get list of rooms and bed letters assigned to a staff member"""
    cur.execute("""
        SELECT r.room_number, b.bed_letter 
        FROM bed_info b 
        JOIN room_info r ON b.room_id = r.room_id 
        WHERE b.assigned_nurse_id = %s
    """, (user_id,))
    assignments = cur.fetchall()
    return [f"{room} {bed}" for room, bed in assignments]

def get_bed_id_from_room_bed(room_number, bed_letter, center_id):
    """Get bed_id from room number and bed letter"""
    cur.execute("""
        SELECT b.bed_id 
        FROM bed_info b 
        JOIN room_info r ON b.room_id = r.room_id 
        WHERE r.room_number = %s AND b.bed_letter = %s AND r.center_id = %s
    """, (room_number, bed_letter, center_id))
    result = cur.fetchone()
    return result[0] if result else None

def get_user_id_from_staff_id(staff_id):
    """Get user_id from staff_id"""
    cur.execute("SELECT user_id FROM user_info WHERE staff_id = %s", (staff_id,))
    result = cur.fetchone()
    return result[0] if result else None

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

    # Check if user is logged in
    if 'user_id' not in session:
        return jsonify({'message': 'Please log in first'}), 401

    recording_counters['room_aud'] += 1

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join(BASE_DIR, 'uploads', 'room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_file.save(audio_path)

    room_number = recognize_speech_from_audio(audio_path)
    try:
        room_number = room_number['transcription']
    except:
        Exception
        room_exists = False
        return jsonify({'message': "Room not heard properly, please try again."})
    
    # Get staff's assigned rooms
    assigned_rooms = get_staff_assigned_rooms(session['user_id'])
    print(f"Staff assigned rooms: {assigned_rooms}")
    print(f"Recorded room: {room_number}")

    # Check if room is in staff's assigned list
    if room_number in assigned_rooms:
        room_exists = True
    elif room_number == "Audio not properly heard":
        room_exists = False
        return jsonify({'message': "Room not heard properly, please try again."})
    else:
        room_exists = False
        return jsonify({'message': "Room Access Denied! Please try again."})

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
            socketio.join_room(room)
        else:
            print(f'No user_id found for staff_id: {staff_id}')

@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room')
    if room:
        socketio.join_room(room)

@socketio.on('ping')
def handle_ping():
    socketio.emit('pong', {'message': 'pong'})


@app.route('/process_audio/room_data', methods=['POST'])
def room_data_btn():
    global audio_path

    # Check if user is logged in
    if 'user_id' not in session:
        return jsonify({'message': 'Please log in first'}), 401

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    
    # Process and emit transcription data if room exists
    if room_exists:
        # Parse room number and bed letter from room_number (e.g., "3438 B")
        try:
            room_parts = room_number.split()
            room_num = room_parts[0]
            bed_letter = room_parts[1] if len(room_parts) > 1 else "A"
        except:
            return jsonify({'message': 'Invalid room format'}), 400

        # Get bed_id
        bed_id = get_bed_id_from_room_bed(room_num, bed_letter, session['center_id'])
        if not bed_id:
            return jsonify({'message': 'Bed not found'}), 400

        # Get organization folder name
        org_folder = ORG_MAPPING.get(session['center_name'], 'Unassigned')
        
        # Create organization folder if it doesn't exist
        org_audio_path = os.path.join(BASE_DIR, 'uploads', 'Audio', org_folder)
        os.makedirs(org_audio_path, exist_ok=True)
        
        # Save audio file to organization folder with a unique name
        unique_id = uuid.uuid4().hex
        filename = f'room.recording_{unique_id}.webm'
        audio_path = os.path.join(org_audio_path, filename)
        audio_file.save(audio_path)

        # Store in database
        try:
            cur.execute("INSERT INTO room_data (bed_id, audio_path) VALUES (%s, %s)", 
                       (bed_id, audio_path))
            conn.commit()
        except Exception as e:
            print(f"Database error: {e}")
            conn.rollback()

        # Process transcription
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
            "audioUrl": f"/audio/{filename}",
            "bed_id": bed_id,
            "user_id": session['user_id']
        }

        transcriptions.append(data)
        
        # Emit to both user_id and staff_id rooms to ensure delivery
        user_room = f"staff_{session['user_id']}"
        staff_room = f"staff_{session['staff_id']}"
        
        socketio.emit('new_transcription', data, room=user_room)
        socketio.emit('new_transcription', data, room=staff_room)
        
        # Also broadcast to all clients as fallback to ensure delivery
        socketio.emit('new_transcription', data, broadcast=True)

    return jsonify({'message': 'Room data audio processed and emitted!'})
    
if __name__ == '__main__':
    print("Running server...")
    
    # Ensure all necessary directories exist
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('uploads/Audio', exist_ok=True)
    os.makedirs('uploads/Audio/EHC', exist_ok=True)
    os.makedirs('uploads/Audio/EMC', exist_ok=True)
    os.makedirs('uploads/Audio/JPCH', exist_ok=True)
    os.makedirs('uploads/Audio/KMC', exist_ok=True)
    os.makedirs('uploads/Audio/PVM', exist_ok=True)
    os.makedirs('uploads/Audio/Unassigned', exist_ok=True)
    os.makedirs('uploads/room_aud', exist_ok=True)
    os.makedirs('uploads/Unassigned', exist_ok=True)
    
    # Load existing transcriptions from database
    print("Loading transcriptions from database...")
    transcriptions.extend(load_transcriptions_from_database())
    print(f"Loaded {len(transcriptions)} transcriptions from database")
    
    socketio.run(app, host='0.0.0.0', port=5000)