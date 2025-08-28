let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let buttonColor = '';
let currentRoom = '';

async function initAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioChunks = [];

            if (buttonColor === 'red') {
                document.getElementById('status').innerText = `Processing completed and emitted to dashboard.`;
            }

            // Send the complete audio file to the server for saving
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');

            try {
                const endpoint = buttonColor === 'green' 
                    ? `/process_audio/room_num` 
                    : `/process_audio/room_data`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok && buttonColor === 'green') {
                    const result = await response.json();
                    document.getElementById('status').innerText = result.message || 'Processing complete.';
                    if (result.room_number) {
                        currentRoom = result.room_number;
                    }
                } else if (!response.ok) {
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
        audioChunks = [];
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
        if (buttonColor !== 'red') {
             document.getElementById('status').innerText = 'Processing recording...';
        }
        isRecording = false;
        console.log(`Recording stopped with ${color} button`);
    }
}

function clearStatus() {
    document.getElementById('status').innerText = '';
    console.log('Cleared');
    isRecording = false;
}