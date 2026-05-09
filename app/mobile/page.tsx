"use client";

// Role: Convert Flask login + recorder UI into a single Next.js mobile page.
import { FormEvent, useEffect, useRef, useState } from "react";
import { LogIn, Mic, Trash2, UserRound } from "lucide-react";
import styles from "./mobile.module.css";
import { subscribeToRecording, unsubscribeChannel } from "@/lib/realtime/recordings";

const ORGANIZATIONS = [
  "Starlane General Hospital",
  "Northcrest Medical Center",
  "Evergreen Health Institute",
  "NovaCare Institute",
  "Havenridge General Hospital",
] as const;

type Step = "login" | "recording";

// Role: Represent parsed room and bed output from ROOM transcription.
type ParsedRoomBed = {
  roomNumber: string;
  bedLetter: string;
};

function parseRoomBedFromTranscript(transcript: string): ParsedRoomBed | null {
  // Role: Parse "Room <number> Bed <letter>" from model transcript output.
  const match = transcript.match(/room\D*(\d{1,5})\D*bed\D*([a-z])/i);
  if (!match) return null;
  return {
    roomNumber: match[1],
    bedLetter: match[2].toUpperCase(),
  };
}

export default function MobilePage() {
  // Role: Track screen state and user inputs for converted login flow.
  const [step, setStep] = useState<Step>("login");
  const [organization, setOrganization] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Role: Keep recording session state and UI status for converted recorder flow.
  const [status, setStatus] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [roomRecordingId, setRoomRecordingId] = useState<string>("");
  const [parsedRoomBed, setParsedRoomBed] = useState<ParsedRoomBed | null>(null);
  const [buttonColor, setButtonColor] = useState<"green" | "red" | "">("");
  const activeButtonRef = useRef<"green" | "red" | "">("");
  const recordingRealtimeRef = useRef<ReturnType<typeof subscribeToRecording> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    return () => {
      unsubscribeChannel(recordingRealtimeRef.current);
    };
  }, []);

  // Role: Authenticate user via Next API, then reveal recorder screen.
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/center/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organization, staffId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Sign in failed");
      }

      setStep("recording");
      setStatus("Signed in. Hold a button to start recording.");
    } catch (loginError) {
      const message =
        loginError instanceof Error ? loginError.message : "Unable to sign in.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Role: Lazily request microphone access and configure recorder callbacks.
  const initAudio = async () => {
    if (mediaRecorderRef.current) {
      return mediaRecorderRef.current;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      audioChunksRef.current = [];
      await uploadRecording(blob, activeButtonRef.current);
    };

    mediaRecorderRef.current = mediaRecorder;
    return mediaRecorder;
  };

  // Role: Upload audio blob and return recording ID for downstream transcription.
  const uploadBlob = async (audioBlob: Blob, type: "ROOM" | "NOTE") => {
    const formData = new FormData();
    formData.append("file", audioBlob, `${type.toLowerCase()}.webm`);
    formData.append("type", type);

    const uploadResponse = await fetch("/api/recordings/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = (await uploadResponse.json()) as {
      recordingId?: string;
      error?: string;
    };
    if (!uploadResponse.ok || !uploadData.recordingId) {
      throw new Error(uploadData.error || "Upload failed");
    }

    return uploadData.recordingId;
  };

  // Role: Transcribe one recording via gpt-4o-mini-transcribe and return plain transcript text.
  const transcribeRecording = async (recordingId: string) => {
    const response = await fetch("/api/recordings/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingId }),
    });

    const data = (await response.json()) as {
      transcript?: string;
      error?: string;
    };
    if (!response.ok || !data.transcript) {
      throw new Error(data.error || "Transcription failed");
    }

    return data.transcript;
  };

  // Role: Resolve bed_id from staff assignment API using parsed room and bed values.
  const resolveBedId = async (roomNumber: string, bedLetter: string) => {
    const response = await fetch(
      `/api/staff/assigned-rooms-beds?nurseId=${encodeURIComponent(staffId)}&room=${encodeURIComponent(roomNumber)}`,
    );
    const data = (await response.json()) as {
      rooms?: Array<{ beds: Array<{ bed_letter: string; bed_id: number }> }>;
    };
    if (!response.ok || !data.rooms?.length) return null;

    const bed = data.rooms[0].beds.find((item) => item.bed_letter === bedLetter);
    return bed?.bed_id ?? null;
  };

  // Role: Execute full frontend flow: upload -> transcribe -> link room_data.
  const uploadRecording = async (audioBlob: Blob, color: "green" | "red" | "") => {
    try {
      if (color === "green") {
        const newRoomRecordingId = await uploadBlob(audioBlob, "ROOM");
        const roomTranscript = await transcribeRecording(newRoomRecordingId);
        const parsed = parseRoomBedFromTranscript(roomTranscript);

        if (!parsed) {
          setStatus("Room not heard properly, please try again.");
          return;
        }

        setRoomRecordingId(newRoomRecordingId);
        setParsedRoomBed(parsed);
        setCurrentRoom(`${parsed.roomNumber} ${parsed.bedLetter}`);
        setStatus(`Room verified: ${parsed.roomNumber} ${parsed.bedLetter}`);
        return;
      }

      if (!roomRecordingId || !parsedRoomBed) {
        setStatus("Record the room first (green button).");
        return;
      }

      const noteRecordingId = await uploadBlob(audioBlob, "NOTE");

      const bedId = await resolveBedId(parsedRoomBed.roomNumber, parsedRoomBed.bedLetter);
      if (!bedId) {
        setStatus("Room access denied or bed not assigned to this staff.");
        return;
      }

      const createResponse = await fetch("/api/room-data/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bed_id: bedId,
          roomRecordingId,
          noteRecordingId,
        }),
      });

      const createData = (await createResponse.json()) as { error?: string };
      if (!createResponse.ok) {
        throw new Error(createData.error || "Failed to create room data");
      }

      // Role: Kick off NOTE transcription after row creation so dashboard can update in real time.
      void transcribeRecording(noteRecordingId).catch((transcribeError) => {
        console.error("Deferred note transcription failed:", transcribeError);
      });

      unsubscribeChannel(recordingRealtimeRef.current);
      recordingRealtimeRef.current = subscribeToRecording(noteRecordingId, () => {
        setStatus(
          `Transcription complete for Room ${parsedRoomBed.roomNumber} Bed ${parsedRoomBed.bedLetter}.`,
        );
      });

      setStatus(`Note uploaded for Room ${parsedRoomBed.roomNumber} Bed ${parsedRoomBed.bedLetter}. Transcription in progress...`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Audio workflow failed.";
      setStatus(message);
    }
  };

  // Role: Start recording and update converted status messaging.
  const startRecording = async (color: "green" | "red") => {
    if (isRecording) return;
    setButtonColor(color);
    activeButtonRef.current = color;

    try {
      const recorder = await initAudio();
      audioChunksRef.current = [];
      recorder.start();
      setIsRecording(true);

      if (color === "green") {
        setStatus("Recording room information...");
      } else if (currentRoom) {
        setStatus(`Charting to ${currentRoom}...`);
      } else {
        setStatus("Charting note... (No room specified)");
      }
    } catch (recordingError) {
      const message =
        recordingError instanceof Error
          ? recordingError.message
          : "Microphone access failed.";
      setStatus(`Error accessing microphone: ${message}`);
    }
  };

  // Role: Stop an active recording and trigger upload flow.
  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    activeButtonRef.current = "";
    if (buttonColor !== "red") {
      setStatus("Processing recording...");
    }
    setIsRecording(false);
  };

  // Role: Clear local recorder state without mutating server-side session.
  const clearStatus = () => {
    setStatus("");
    setIsRecording(false);
  };

  // Role: Reset UI to login screen and release local media resources.
  const logoutLocal = () => {
    unsubscribeChannel(recordingRealtimeRef.current);
    recordingRealtimeRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    mediaRecorderRef.current = null;
    streamRef.current = null;
    audioChunksRef.current = [];
    setStep("login");
    setCurrentRoom("");
    setRoomRecordingId("");
    setParsedRoomBed(null);
    setStatus("");
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {step === "login" ? (
          <>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <UserRound size={36} />
              </div>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>Please sign in to your account</p>
            </div>

            <form className={styles.form} onSubmit={handleLogin}>
              <div>
                <label htmlFor="organization" className={styles.fieldLabel}>
                  Medical Center
                </label>
                <select
                  id="organization"
                  className={styles.fieldInput}
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your Organization
                  </option>
                  {ORGANIZATIONS.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="staffId" className={styles.fieldLabel}>
                  Staff ID
                </label>
                <input
                  id="staffId"
                  type="text"
                  className={styles.fieldInput}
                  value={staffId}
                  onChange={(event) => setStaffId(event.target.value)}
                  placeholder="Enter your Staff ID"
                  autoComplete="username"
                  required
                />
              </div>

              <button className={styles.submitButton} type="submit" disabled={submitting}>
                <LogIn size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
                {submitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {error ? <div className={styles.error}>{error}</div> : null}
          </>
        ) : (
          <div className={styles.recordingShell}>
            <h1 className={styles.title}>Cidien Mobile</h1>
            <p className={styles.subtitle}>Hold a button to record</p>

            <div className={styles.buttonRow}>
              <button
                className={`${styles.recordButton} ${styles.green}`}
                onMouseDown={() => startRecording("green")}
                onMouseUp={stopRecording}
                onTouchStart={() => startRecording("green")}
                onTouchEnd={stopRecording}
                aria-label="Record room information"
              >
                <Mic size={30} />
              </button>

              <button
                className={`${styles.recordButton} ${styles.red}`}
                onMouseDown={() => startRecording("red")}
                onMouseUp={stopRecording}
                onTouchStart={() => startRecording("red")}
                onTouchEnd={stopRecording}
                aria-label="Record patient note"
              >
                <Mic size={30} />
              </button>

              <button
                className={`${styles.recordButton} ${styles.gray}`}
                onClick={clearStatus}
                aria-label="Clear status text"
              >
                <Trash2 size={28} />
              </button>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ background: "#16a34a" }} />
                Green button: record room information
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ background: "#dc2626" }} />
                Red button: chart patient information
              </div>
              <div className={styles.legendItem}>
                <span className={styles.dot} style={{ background: "#6b7280" }} />
                Grey button: clear status text
              </div>
            </div>

            <p className={styles.status}>{status}</p>

            <button className={styles.logoutButton} onClick={logoutLocal}>
              Switch User
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
