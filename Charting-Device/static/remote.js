let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let buttonColor = '';
let currentRoom = '';
let socket; // To hold the socket instance
let liveTranscriptionText = ''; // To store transcription without displaying it

// Connect to the Socket.IO server
try {
    socket = io.connect(window.location.origin);
    
    socket.on('connect', () => {
        console.log('Successfully connected to WebSocket server.');
    });

    socket.on('stream-transcription', (data) => {
        if (isRecording && buttonColor === 'red') {
            // Store the live transcription without updating the UI
            liveTranscriptionText = data.transcription;
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server.');
    });

} catch (e) {
    console.error("Failed to connect to WebSocket server:", e);
}


async function initAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        mediaRecorder.ondataavailable = async (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
                // If streaming, send data over WebSocket
                if (socket && socket.connected && buttonColor === 'red') {
                    socket.emit('stream-audio', event.data);
                }
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            
            // For red button, use the stored transcription text
            if (buttonColor === 'red') {
                const finalTranscription = liveTranscriptionText;
                document.getElementById('status').innerText = `Processing completed and emitted to dashboard.`;
            }

            // Reset audio chunks for the next recording
            audioChunks = [];

            // Send the complete audio file to the server for saving
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');

            try {
                let btn_color = `${buttonColor}`;
                let endpoint;
                if (btn_color === 'green') {
                    endpoint = `/process_audio/room_num`;
                } else if (btn_color === 'red') {
                    endpoint = `/process_audio/room_data`;
                } else {
                    return; // Don't send if color is invalid
                }

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
        liveTranscriptionText = ''; // Reset for new recording
        
        // Use a smaller timeslice for smoother streaming on red button
        if (color === 'red') {
            if (socket && socket.connected) socket.emit('start-stream');
            mediaRecorder.start(250); // Send audio every 250ms
        } else {
            mediaRecorder.start(); // No timeslice for green button (collects all at the end)
        }

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
        if (color === 'red' && socket && socket.connected) {
            socket.emit('end-stream');
        }
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