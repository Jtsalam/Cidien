import os
import pymysql
from flask import Flask, request, render_template, jsonify
from functions import *
from flask_cors import CORS

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='medicalcentersdb'
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize counters for each Room file
recording_counters = {
    'room_aud': no_of_files('Flask/device_uploads/room_aud'), #All device audios
    '3438':no_of_files('Flask/device_uploads/3438'),
    '3439':no_of_files('Flask/device_uploads/3439'),
    '3461':no_of_files('Flask/device_uploads/3461'),
    '3463':no_of_files('Flask/device_uploads/3463'),
    'Unassigned':no_of_files('Flask/device_uploads/Unassigned'),  
}


@app.route("/", methods=['GET'])
def index():
    return render_template("login_form.html")

@app.route("/login_val", methods= ['POST', 'GET'])
def submit_btn():
    global charter_id
    charter_id = request.form.get("charter_id")
    return(render_template("remote.html"))
    

@app.route('/process_audio/room_num', methods=['POST'])
def room_btn_fn():
    global room_exists
    global room_number
    # Increment the room_aud file recording counter
    recording_counters['room_aud'] += 1

    # Ensure the audio file is in the request
    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400
    audio_file = request.files['audio']
    
    # Define the file path using the counter
    audio_path = os.path.join('Flask/device_uploads/room_aud', f'room.recording_{recording_counters["room_aud"]}.webm')
    audio_file.save(audio_path)
    room_number = recognize_speech_from_audio(audio_path)
    room_list = all_rooms('Flask/device_uploads')

    if room_number in room_list:
        room_exists = True
    elif room_number == "Audio not properly heard":
        room_exists = False
        return jsonify({'message': "Room not heard properly, Please try again."})
    else:
        room_exists = False
        return jsonify({"message": "Room does not exist!"})
    print(room_exists)
    
    return jsonify({'message': 'Room audio processed successfully!'})

@app.route('/process_audio/room_data', methods= ['POST','GET'])
def room_data_btn():
    # Increment the red button recording counter
    global audio_path
    if room_exists:
        room_name = room_number
    else:
        room_name = "Unassigned"
    recording_counters[room_name] += 1

    # Ensure the audio file is in the request
    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file found in request'}), 400
    
    audio_file = request.files['audio']
    # Define the file path using the counter
    # Save audio to room number if room exists, else, save to 'Unassigned folder'
    audio_path = os.path.join(f'Flask/device_uploads/{room_name}', f'room.recording_{recording_counters[room_name]}.webm')
    audio_file.save(audio_path)
    return jsonify({'message': 'Room data audio processed successfully!'})

#Function to get chart data from roomdashboard.php
@app.route('/get_data', methods=['GET'])
def get_data():
    if room_exists:
        #aud_info function returns chart infoormation: {Date, time, transcribed and filtered audio.}
        chart_info = aud_info(audio_path)
    
    #Mysql query to get Nurse name from charter Id
    with connection.cursor() as cursor:
        try:
            sql = f"SELECT * FROM `user-info` WHERE `charterId` = '{charter_id}' "
            cursor.execute(sql)
            result = cursor.fetchall()
            Nurse = result[0][1]
        except IndexError:
                Nurse = 'None'

        chart_data = {
            'room_id': room_number,
            'nurse': Nurse,
            'date': chart_info[0],
            'time': chart_info[1],
            'note': chart_info[2],
            'message': 'Room data audio processed successfully!'
        }
        #Send chart data to roomdashboard.php
        return jsonify(chart_data)

if __name__ == '__main__':
    os.makedirs('Flask/device_uploads/room_aud', exist_ok=True)
    os.makedirs('Flask/device_uploads/3438', exist_ok=True)
    os.makedirs('Flask/device_uploads/3439', exist_ok=True)
    os.makedirs('Flask/device_uploads/3461', exist_ok=True)
    os.makedirs('Flask/device_uploads/3463', exist_ok=True)
    os.makedirs('Flask/device_uploads/Unassigned', exist_ok=True)
    app.run(debug=True, port=5000)