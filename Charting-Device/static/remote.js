let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let buttonColor = '';
let currentRoom = '';

async function initAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioChunks = [];

            // Send audio file to the server
            const formData = new FormData();
            // Ensure the key 'audio' matches what the server expects
            formData.append('audio', audioBlob, 'recording.webm');

            try {
                let btn_color = `${buttonColor}`;

                // Check btn_color value correctly
                let endpoint;
                if (btn_color === 'green') {
                    endpoint = `/process_audio/room_num`;
                } else if (btn_color === 'red') { // Corrected syntax for comparing btn_color with 'red'
                    endpoint = `/process_audio/room_data`;
                } else {
                    throw new Error('Invalid button color');
                }

                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    if(result.message){
                        document.getElementById('status').innerText = result.message;
                    }
                    if (result.room_number) {
                        currentRoom = result.room_number;
                    }
                } else {
                    console.error('Failed to send file to server:', response.statusText);
                    document.getElementById('status').innerText = 'Failed to send file to server';
                }
            } catch (error) {
                console.error('Error sending file to server', error);
                document.getElementById('status').innerText = 'Error sending file to server';
            }
        };
    } catch (error) {
        console.error('Error accessing microphone', error);
        alert('Error accessing microphone: ' + error.message);
    }
}

function startRecording(color) {
    buttonColor = color;
    if (!mediaRecorder) {
        initAudio().then(() => startRecording(color));
        return;
    }

    if (!isRecording) {
        mediaRecorder.start();
        let statusText;
        if (color === 'green') {
            statusText = "Recording room information....";
        } else if (color === 'red') {
            if (currentRoom) {
                statusText = `Charting to ${currentRoom}......`;
            } else {
                statusText = "Charting note... (No room specified)";
            }
        }
        document.getElementById('status').innerText = statusText;
        isRecording = true;
        console.log(`Recording started with ${color} button`);
    }
}

function stopRecording(color) {
    if (isRecording) {
        mediaRecorder.stop();
        document.getElementById('status').innerText = `Recording from ${color} button stopped`;
        isRecording = false;
        console.log(`Recording stopped with ${color} button`);
    }
}

function clearStatus() {
    document.getElementById('status').innerText = '';
    console.log('Cleared');
    isRecording = false;
}