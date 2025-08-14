# Charting-Device/remote.py
import os
import uuid

from flask import Flask, request, render_template, jsonify, send_file, session
from flask_socketio import SocketIO, join_room
from flask_cors import CORS

from functions import no_of_files, recognize_speech_from_audio, all_rooms, aud_info, ensure_dir
from db import get_connection, insert_room_data

# ----------------------------------
# Flask app setup
# ----------------------------------
app = Flask(__name__, template_folder="templates", static_folder="static")
app.secret_key = 'your-secret-key-here'  # Required for sessions
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

# ----------------------------------
# Organization mapping (full name -> short code folder)
# ----------------------------------
ORG_MAPPING = {
    "Erindale Health Center": "EHC",
    "Parkville Manor": "PVM",
    "Kenderdine Medical Clinic": "KMC",
    "Jim Pattison Children's Hospital": "JPCH",
    "Evergreen Medical Clinic": "EMC",
}

# ----------------------------------
# Paths & counters
# ----------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # /Charting-Device

# Ensure required dirs exist
ensure_dir(os.path.join(BASE_DIR, 'uploads'))
ensure_dir(os.path.join(BASE_DIR, 'uploads', 'Audio'))
for code in ["EHC", "EMC", "JPCH", "KMC", "PVM", "Unassigned"]:
    ensure_dir(os.path.join(BASE_DIR, 'uploads', 'Audio', code))
ensure_dir(os.path.join(BASE_DIR, 'uploads', 'room_aud'))
ensure_dir(os.path.join(BASE_DIR, 'uploads', 'Unassigned'))

recording_counters = {
    'room_aud': no_of_files(os.path.join(BASE_DIR, 'uploads', 'room_aud')),
    'Unassigned': no_of_files(os.path.join(BASE_DIR, 'uploads', 'Unassigned')),
}

# ----------------------------------
# Globals for simple state
# ----------------------------------
room_exists = False
room_number = ""
audio_path = ""
transcriptions = []  # in-memory cache for current run

# ----------------------------------
# Helpers that use DB per-call connections
# ----------------------------------
def load_transcriptions_from_database():
    """Load all transcriptions from the database on startup (and repair missing files)."""
    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT rd.id, rd.audio_path, rd.bed_id, 
                           bi.bed_letter, ri.room_number, ui.user_id, ui.staff_id
                    FROM room_data rd
                    JOIN bed_info bi ON rd.bed_id = bi.bed_id
                    JOIN room_info ri ON bi.room_id = ri.room_id
                    JOIN user_info ui ON bi.assigned_nurse_id = ui.user_id
                    ORDER BY rd.id ASC
                """)
                rows = cur.fetchall()

        loaded = []
        for row in rows:
            rec_id, path, bed_id, bed_letter, room_num, user_id, staff_id = row
            if os.path.exists(path):
                try:
                    chart_info = aud_info(path)
                    loaded.append({
                        "column1": f"{room_num} {bed_letter}",
                        "column2": chart_info[0],
                        "column3": chart_info[1],
                        "column4": chart_info[2],
                        "audioUrl": f"/audio/{os.path.basename(path)}",
                        "bed_id": bed_id,
                        "user_id": user_id
                    })
                except Exception as e:
                    print(f"Error processing transcription for {path}: {e}")
                    loaded.append({
                        "column1": f"{room_num} {bed_letter}",
                        "column2": "Unknown Date",
                        "column3": "Unknown Time",
                        "column4": "Audio file exists but transcription failed",
                        "audioUrl": f"/audio/{os.path.basename(path)}",
                        "bed_id": bed_id,
                        "user_id": user_id
                    })
            else:
                print(f"Audio file not found: {path}")
                # Remove the orphan DB record
                try:
                    conn = get_connection()
                    with conn:
                        with conn.cursor() as cur:
                            cur.execute("DELETE FROM room_data WHERE id = %s", (rec_id,))
                    print(f"Removed missing audio record id={rec_id}")
                except Exception as db_error:
                    print(f"Error removing missing audio record: {db_error}")
        return loaded
    except Exception as e:
        print(f"Error loading transcriptions from database: {e}")
        return []

def get_staff_assigned_rooms(user_id: int):
    """Get list of rooms and bed letters assigned to a staff member."""
    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT r.room_number, b.bed_letter 
                    FROM bed_info b 
                    JOIN room_info r ON b.room_id = r.room_id 
                    WHERE b.assigned_nurse_id = %s
                """, (user_id,))
                assignments = cur.fetchall()
        return [f"{room} {bed}" for room, bed in assignments]
    except Exception as e:
        print(f"Error fetching staff assigned rooms: {e}")
        return []

def get_bed_id_from_room_bed(room_num: str, bed_letter: str, center_id: int):
    """Get bed_id from room number and bed letter."""
    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT b.bed_id 
                    FROM bed_info b 
                    JOIN room_info r ON b.room_id = r.room_id 
                    WHERE r.room_number = %s AND b.bed_letter = %s AND r.center_id = %s
                """, (room_num, bed_letter, center_id))
                result = cur.fetchone()
        return result[0] if result else None
    except Exception as e:
        print(f"Error fetching bed_id: {e}")
        return None

def get_user_id_from_staff_id(staff_id: str):
    """Get user_id from staff_id."""
    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT user_id FROM user_info WHERE staff_id = %s", (staff_id,))
                result = cur.fetchone()
        return result[0] if result else None
    except Exception as e:
        print(f"Error fetching user_id from staff_id: {e}")
        return None

# ----------------------------------
# Routes
# ----------------------------------
@app.route("/", methods=['GET'])
def index():
    return render_template("login_form.html")

@app.route("/login_val", methods=['POST', 'GET'])
def submit_btn():
    selectedOrg = request.form.get("Organization Name")
    staffID = request.form.get("staff_id")

    if not selectedOrg or not staffID:
        return render_template('login_form.html', error="Organization and Staff ID are required")

    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT center_id, center_name FROM medicalcenter_info")
                centers = cur.fetchall()
    except Exception as e:
        return render_template('login_form.html', error=f"Database error: {e}")

    center_found = False
    for center_id, center_name in centers:
        if selectedOrg == center_name:
            center_found = True
            try:
                conn = get_connection()
                with conn:
                    with conn.cursor() as cur:
                        cur.execute(
                            "SELECT user_id, staff_id FROM user_info WHERE center_id = %s AND staff_id = %s",
                            (center_id, staffID)
                        )
                        user_row = cur.fetchone()
            except Exception as e:
                return render_template('login_form.html', error=f"Database error: {e}")

            if not user_row:
                return render_template('login_form.html', error="Invalid Staff ID!")

            # Store session data
            session['user_id'] = user_row[0]
            session['staff_id'] = user_row[1]
            session['center_id'] = center_id
            session['center_name'] = center_name
            break

    if not center_found:
        return render_template('login_form.html', error="Invalid Center ID!")

    return render_template("remote.html")

@app.route('/process_audio/room_num', methods=['POST'])
def room_btn_fn():
    global room_exists, room_number

    if 'user_id' not in session:
        return jsonify({'message': 'Please log in first'}), 401

    recording_counters['room_aud'] += 1

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    save_path = os.path.join(BASE_DIR, 'uploads', 'room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_file.save(save_path)

    result = recognize_speech_from_audio(save_path)
    if not isinstance(result, dict) or not result.get("success"):
        room_exists = False
        return jsonify({'message': result.get("error", "Room not heard properly, please try again.")})

    room_number = result['transcription']

    # Validate against staff's assigned rooms
    assigned_rooms = get_staff_assigned_rooms(session['user_id'])
    print(f"Staff assigned rooms: {assigned_rooms}")
    print(f"Recorded room: {room_number}")

    if room_number in assigned_rooms:
        room_exists = True
        return jsonify({'message': 'Room audio processed successfully!'})
    else:
        room_exists = False
        return jsonify({'message': "Room Access Denied! Please try again."})

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

    # If file not found, clean dangling DB record
    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id FROM room_data WHERE audio_path LIKE %s", (f"%{filename}",))
                result = cur.fetchone()
                if result:
                    cur.execute("DELETE FROM room_data WHERE id = %s", (result[0],))
                    print(f"Removed database record for missing audio file: {filename}")
    except Exception as e:
        print(f"Error checking database for missing file: {e}")

    return "File not found", 404

@app.route('/transcriptions', methods=['GET'])
def get_transcriptions():
    if 'user_id' not in session:
        return jsonify([])
    staff_transcriptions = [t for t in transcriptions if t.get('user_id') == session['user_id']]
    return jsonify(staff_transcriptions)

@app.route('/transcriptions/<staff_id>', methods=['GET'])
def get_staff_transcriptions(staff_id):
    user_id = get_user_id_from_staff_id(staff_id)
    if not user_id:
        return jsonify([])
    staff_transcriptions = [t for t in transcriptions if t.get('user_id') == user_id]
    return jsonify(staff_transcriptions)

# -------- Socket.IO --------
@socketio.on('connect')
def handle_connect():
    print('Client connected to WebSocket')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected from WebSocket')

@socketio.on('join_staff_room')
def handle_join_staff_room(data):
    staff_id = data.get('user_id')  # frontend sends staff_id here
    if staff_id:
        user_id = get_user_id_from_staff_id(staff_id)
        if user_id:
            join_room(f"staff_{user_id}")
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
    global audio_path

    if 'user_id' not in session:
        return jsonify({'message': 'Please log in first'}), 401

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']

    if not room_exists:
        return jsonify({'message': 'No valid room selected yet'}), 400

    try:
        room_parts = room_number.split()
        room_num = room_parts[0]
        bed_letter = room_parts[1] if len(room_parts) > 1 else "A"
    except Exception:
        return jsonify({'message': 'Invalid room format'}), 400

    bed_id = get_bed_id_from_room_bed(room_num, bed_letter, session['center_id'])
    if not bed_id:
        return jsonify({'message': 'Bed not found'}), 400

    # Determine org folder by center_name in session
    org_folder = ORG_MAPPING.get(session.get('center_name', ''), 'Unassigned')
    org_audio_path = os.path.join(BASE_DIR, 'uploads', 'Audio', org_folder)
    ensure_dir(org_audio_path)

    unique_id = uuid.uuid4().hex
    filename = f'room.recording_{unique_id}.webm'
    audio_path = os.path.join(org_audio_path, filename)
    audio_file.save(audio_path)

    # Insert DB record
    success = insert_room_data(bed_id, audio_path)
    if not success:
        return jsonify({'message': 'Database insert failed'}), 500

    # Build chart/transcription info
    chart_info = aud_info(audio_path)
    data = {
        "column1": f"{room_num} {bed_letter}",
        "column2": chart_info[0],
        "column3": chart_info[1],
        "column4": chart_info[2],
        "audioUrl": f"/audio/{filename}",
        "bed_id": bed_id,
        "user_id": session['user_id']
    }

    transcriptions.append(data)

    # Emit to rooms
    user_room = f"staff_{session['user_id']}"
    staff_room = f"staff_{session['staff_id']}"
    socketio.emit('new_transcription', data, room=user_room)
    socketio.emit('new_transcription', data, room=staff_room)
    socketio.emit('new_transcription', data)

    return jsonify({'message': 'Room data audio processed and emitted!'})

@app.route('/staff/assigned-rooms', methods=['GET'])
def get_staff_assigned_rooms_api():
    staff_id = request.args.get('staff_id')
    if not staff_id:
        return jsonify({'error': 'Staff ID is required'}), 400

    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT user_id FROM user_info WHERE staff_id = %s", (staff_id,))
                user_result = cur.fetchone()
        if not user_result:
            return jsonify({'error': 'Staff member not found'}), 404

        user_id = user_result[0]
        rooms = get_staff_assigned_rooms(user_id)
        # Return only room numbers (de-duplicated by construction)
        room_numbers = sorted({r.split()[0] for r in rooms})
        return jsonify({'rooms': room_numbers})
    except Exception as e:
        print(f"Error getting assigned rooms: {e}")
        return jsonify({'error': 'Database error'}), 500

@app.route('/staff/transcriptions/<room_number_param>', methods=['GET'])
def get_staff_transcriptions_by_room(room_number_param):
    staff_id = request.args.get('staff_id')
    if not staff_id:
        return jsonify([])

    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("SELECT user_id FROM user_info WHERE staff_id = %s", (staff_id,))
                user_row = cur.fetchone()
        if not user_row:
            return jsonify([])

        user_id = user_row[0]

        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT rd.id, rd.audio_path, rd.bed_id, 
                           bi.bed_letter, ri.room_number, ui.user_id, ui.staff_id
                    FROM room_data rd
                    JOIN bed_info bi ON rd.bed_id = bi.bed_id
                    JOIN room_info ri ON bi.room_id = ri.room_id
                    JOIN user_info ui ON bi.assigned_nurse_id = ui.user_id
                    WHERE ri.room_number = %s AND ui.user_id = %s
                    ORDER BY rd.id ASC
                """, (room_number_param, user_id))
                rows = cur.fetchall()

        payload = []
        for row in rows:
            rec_id, path, bed_id, bed_letter, room_num, u_id, _staff = row
            if os.path.exists(path):
                try:
                    chart = aud_info(path)
                    payload.append({
                        "column1": f"{room_num} {bed_letter}",
                        "column2": chart[0],
                        "column3": chart[1],
                        "column4": chart[2],
                        "audioUrl": f"/audio/{os.path.basename(path)}",
                        "bed_id": bed_id,
                        "user_id": u_id
                    })
                except Exception as e:
                    print(f"Error processing transcription for {path}: {e}")
                    payload.append({
                        "column1": f"{room_num} {bed_letter}",
                        "column2": "Unknown Date",
                        "column3": "Unknown Time",
                        "column4": "Audio file exists but transcription failed",
                        "audioUrl": f"/audio/{os.path.basename(path)}",
                        "bed_id": bed_id,
                        "user_id": u_id
                    })
            else:
                # Clean orphan record
                try:
                    conn = get_connection()
                    with conn:
                        with conn.cursor() as cur:
                            cur.execute("DELETE FROM room_data WHERE id = %s", (rec_id,))
                    print(f"Removed missing audio record id={rec_id}")
                except Exception as db_error:
                    print(f"Error removing missing audio record: {db_error}")

        return jsonify(payload)
    except Exception as e:
        print(f"Error getting transcriptions by room: {e}")
        return jsonify([])

# ----------------------------------
# Entrypoint
# ----------------------------------
if __name__ == '__main__':
    print("Running server...")

    # Load existing transcriptions from database into in-memory cache
    print("Loading transcriptions from database...")
    transcriptions.extend(load_transcriptions_from_database())
    print(f"Loaded {len(transcriptions)} transcriptions from database")

    # Use 5001 to avoid common conflicts (5000 often used)
    socketio.run(app, host='0.0.0.0', port=5001)
