import os
import psycopg2
from flask import Flask, request, render_template, jsonify,send_file
from flask_socketio import SocketIO
from flask_cors import CORS
from functions import no_of_files, recognize_speech_from_audio, all_rooms, aud_info

# Setup Flask app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

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
    selectedOrg = request.form["Organization Name"]
    staffID = request.form.get("staff_id")
    cur.execute("SELECT center_id, center_name FROM medicalcenter_info")
    centerRows = cur.fetchall()
    center_found = False

    for center_id, center_name in centerRows:
        if selectedOrg == center_name:
            center_found = True
            cur.execute("SELECT staff_id FROM user_info WHERE center_id = %s", (center_id,))
            staff_rows = cur.fetchall()
            staff_ids = [row[0] for row in staff_rows]
            
            if staffID not in staff_ids:
                return render_template('login_form.html', error="Invalid Staff ID!")
            break  # no need to keep looping once found

    if not center_found:
        return render_template('login_form.html', error="Invalid Center ID!")

    return render_template("remote.html")


@app.route('/process_audio/room_num', methods=['POST'])
def room_btn_fn():
    global room_exists, room_number

    recording_counters['room_aud'] += 1

    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400

    audio_file = request.files['audio']
    # audio_path = os.path.join(f'{root}/uploads/room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_path = os.path.join(BASE_DIR, 'uploads', 'room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_file.save(audio_path)

    room_number = recognize_speech_from_audio(audio_path)
    try:
        room_number = room_number['transcription']
    except:
        Exception
        room_exists = False
        return jsonify({'message': "Room not heard properly, please try again."})
        
    # room_list = all_rooms(f'{root}/uploads')
    room_list = all_rooms(os.path.join(BASE_DIR, 'uploads'))
    print(room_list)
    print(room_number)

    if room_number in room_list:
        room_exists = True
    elif room_number == "Audio not properly heard":
        room_exists = False
        return jsonify({'message': "Room not heard properly, please try again."})
    else:
        room_exists = False
        return jsonify({'message': "Room does not exist!"})

    return jsonify({'message': 'Room audio processed successfully!'})


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
    global audio_path

    # Determine where to store the file
    room_name = room_number if room_exists else "Unassigned"
    recording_counters[room_name] += 1

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
    os.makedirs('uploads', exist_ok=True)
    socketio.run(app, host='0.0.0.0', port=5000)
