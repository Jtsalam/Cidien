"use client";

// Role: Convert Flask login + recorder UI into a single Next.js mobile page.
import { FormEvent, useRef, useState } from "react";
import { LogIn, Mic, Trash2, UserRound } from "lucide-react";
import styles from "./mobile.module.css";

const ORGANIZATIONS = [
  "Starlane General Hospital",
  "Northcrest Medical Center",
  "Evergreen Health Institute",
  "NovaCare Institute",
  "Havenridge General Hospital",
] as const;

const CHARTING_API_BASE = process.env.NEXT_PUBLIC_CHARTING_API_BASE ?? "";

type Step = "login" | "recording";

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
  const [buttonColor, setButtonColor] = useState<"green" | "red" | "">("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

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
      await uploadRecording(blob);
    };

    mediaRecorderRef.current = mediaRecorder;
    return mediaRecorder;
  };

  // Role: Send completed audio blobs to the same endpoints used by Flask UI.
  const uploadRecording = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    const endpoint =
      buttonColor === "green" ? "/process_audio/room_num" : "/process_audio/room_data";

    try {
      const response = await fetch(`${CHARTING_API_BASE}${endpoint}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        setStatus("Failed to send file to server.");
        return;
      }

      if (buttonColor === "green") {
        const result = (await response.json()) as {
          message?: string;
          room_number?: string;
        };
        setStatus(result.message || "Room audio processed successfully.");
        if (result.room_number) {
          setCurrentRoom(result.room_number);
        }
      } else {
        setStatus("Processing completed and emitted to dashboard.");
      }
    } catch {
      setStatus("Error sending file to server.");
    }
  };

  // Role: Start recording and update converted status messaging.
  const startRecording = async (color: "green" | "red") => {
    if (isRecording) return;
    setButtonColor(color);

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
    streamRef.current?.getTracks().forEach((track) => track.stop());
    mediaRecorderRef.current = null;
    streamRef.current = null;
    audioChunksRef.current = [];
    setStep("login");
    setCurrentRoom("");
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
