"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn, Mic, Trash2, UserRound } from "lucide-react";
import styles from "./mobile.module.css";
import { subscribeToRecording, unsubscribeChannel } from "@/lib/realtime/recordings";
import { emitMobileConnected } from "@/lib/realtime/mobileSignal";

const ORGANIZATIONS = [
  "Starlane General Hospital",
  "Northcrest Medical Center",
  "Evergreen Health Institute",
  "NovaCare Institute",
  "Havenridge General Hospital",
] as const;

type Step = "login" | "recording";

type ParsedRoomBed = {
  roomNumber: string;
  bedLetter: string;
};

function parseRoomBedFromTranscript(transcript: string): ParsedRoomBed | null {
  // Primary: "Room 1011 Bed B" / "Room 1011, Bed B."
  const withKeywords = transcript.match(/room\s*(\d{1,5})[^a-z\d]*bed\s*([a-z])/i);
  if (withKeywords) return { roomNumber: withKeywords[1], bedLetter: withKeywords[2].toUpperCase() };

  // Fallback: bare "1011B" or "1011 B" when OpenAI drops the keywords
  const bare = transcript.trim().match(/^(\d{1,5})\s*([a-z])\.?$/i);
  if (bare) return { roomNumber: bare[1], bedLetter: bare[2].toUpperCase() };

  return null;
}

export default function MobileRecorder() {
  // Role: useSearchParams is safe here because this component is wrapped in Suspense by page.tsx.
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("login");
  const [organization, setOrganization] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [roomRecordingId, setRoomRecordingId] = useState<string>("");
  const [parsedRoomBed, setParsedRoomBed] = useState<ParsedRoomBed | null>(null);
  const [verifiedBedId, setVerifiedBedId] = useState<number | null>(null);
  const [buttonColor, setButtonColor] = useState<"green" | "red" | "">("");
  const activeButtonRef = useRef<"green" | "red" | "">("");
  const recordingRealtimeRef = useRef<ReturnType<typeof subscribeToRecording> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  // Role: Always point at the latest uploadRecording so the stale onstop closure
  // still calls the current version (with up-to-date state in its closure).
  const uploadRecordingRef = useRef<(blob: Blob, color: "green" | "red" | "") => Promise<void>>(
    async () => {},
  );

  useEffect(() => {
    return () => { unsubscribeChannel(recordingRealtimeRef.current); };
  }, []);

  // Role: QR bypass — fires once searchParams are available after hydration.
  useEffect(() => {
    const bypass = searchParams.get("bypass");
    const sessionParam = searchParams.get("session");
    const staffIdParam = searchParams.get("staffId");

    if (bypass !== "true" || !sessionParam || !staffIdParam) return;

    let cancelled = false;

    async function activateBypass() {
      if (!sessionParam || !staffIdParam) return;
      setSubmitting(true);
      setError("");
      try {
        const res = await fetch("/api/mobile/bypass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionParam, staffId: staffIdParam }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Bypass failed.");

        if (!cancelled) {
          setStaffId(staffIdParam);
          setStep("recording");
          setStatus("Connected via QR code. Hold a button to start recording.");
          await emitMobileConnected(sessionParam, staffIdParam);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "QR bypass failed.");
      } finally {
        if (!cancelled) setSubmitting(false);
      }
    }

    void activateBypass();
    return () => { cancelled = true; };
  // searchParams object reference is stable; this runs once after hydration when params are present.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
      if (!res.ok) throw new Error(data.error || "Sign in failed");
      setStep("recording");
      setStatus("Signed in. Hold a button to start recording.");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  const initAudio = async () => {
    if (mediaRecorderRef.current) return mediaRecorderRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) audioChunksRef.current.push(event.data);
    };
    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      audioChunksRef.current = [];
      // Capture color before clearing — stopRecording() runs synchronously before onstop fires.
      const color = activeButtonRef.current;
      activeButtonRef.current = "";
      console.log("[MobileRecorder] onstop fired — color:", color, "blob size:", blob.size);
      // Call through the ref so we always get the latest uploadRecording (fresh state closure).
      await uploadRecordingRef.current(blob, color);
    };
    mediaRecorderRef.current = mediaRecorder;
    return mediaRecorder;
  };

  const uploadBlob = async (audioBlob: Blob, type: "ROOM" | "NOTE") => {
    const formData = new FormData();
    formData.append("file", audioBlob, `${type.toLowerCase()}.webm`);
    formData.append("type", type);
    const uploadResponse = await fetch("/api/recordings/upload", { method: "POST", body: formData });
    const uploadData = (await uploadResponse.json()) as { recordingId?: string; error?: string };
    if (!uploadResponse.ok || !uploadData.recordingId) throw new Error(uploadData.error || "Upload failed");
    return uploadData.recordingId;
  };

  const transcribeRecording = async (recordingId: string) => {
    const response = await fetch("/api/recordings/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingId }),
    });
    const data = (await response.json()) as { transcript?: string; error?: string };
    if (!response.ok || !data.transcript) throw new Error(data.error || "Transcription failed");
    return data.transcript;
  };

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

  const uploadRecording = async (audioBlob: Blob, color: "green" | "red" | "") => {
    console.log("[MobileRecorder] uploadRecording — color:", color, "blob size:", audioBlob.size);
    try {
      if (color === "green") {
        setStatus("Processing room recording...");
        console.log("[MobileRecorder] GREEN — uploading room audio...");
        const newRoomRecordingId = await uploadBlob(audioBlob, "ROOM");
        console.log("[MobileRecorder] GREEN — recordingId:", newRoomRecordingId, "— transcribing...");
        const roomTranscript = await transcribeRecording(newRoomRecordingId);
        console.log("[MobileRecorder] GREEN — raw transcript:", roomTranscript);
        const parsed = parseRoomBedFromTranscript(roomTranscript);
        console.log("[MobileRecorder] GREEN — parsed room/bed:", parsed);
        if (!parsed) {
          setRoomRecordingId("");
          setParsedRoomBed(null);
          setCurrentRoom("");
          setVerifiedBedId(null);
          // No room+bed combination heard — treat as denied (transcript was: roomTranscript)
          console.log("[MobileRecorder] GREEN — no room+bed parsed from transcript, denying");
          setStatus("Room Access Denied");
          return;
        }

        setStatus("Checking room assignment...");
        console.log("[MobileRecorder] GREEN — checking assignment for nurse:", staffId, "room:", parsed.roomNumber, "bed:", parsed.bedLetter);
        const bedId = await resolveBedId(parsed.roomNumber, parsed.bedLetter);
        console.log("[MobileRecorder] GREEN — resolved bedId:", bedId);
        if (!bedId) {
          setRoomRecordingId("");
          setParsedRoomBed(null);
          setCurrentRoom("");
          setVerifiedBedId(null);
          setStatus("Room Access Denied");
          return;
        }

        setRoomRecordingId(newRoomRecordingId);
        setParsedRoomBed(parsed);
        setCurrentRoom(`Room ${parsed.roomNumber}, Bed ${parsed.bedLetter}`);
        setVerifiedBedId(bedId);
        setStatus(`Room ${parsed.roomNumber}, Bed ${parsed.bedLetter} – Room audio processed successfully`);
        console.log("[MobileRecorder] GREEN — room verified, bedId:", bedId);
        return;
      }

      if (!roomRecordingId || !parsedRoomBed || !verifiedBedId) {
        console.warn("[MobileRecorder] RED — missing room context:", { roomRecordingId, parsedRoomBed, verifiedBedId });
        setStatus("Record the room first (green button).");
        return;
      }

      console.log("[MobileRecorder] RED — uploading note for room:", parsedRoomBed.roomNumber, "bed:", parsedRoomBed.bedLetter, "bedId:", verifiedBedId);
      const noteRecordingId = await uploadBlob(audioBlob, "NOTE");
      console.log("[MobileRecorder] RED — noteRecordingId:", noteRecordingId);

      const createResponse = await fetch("/api/room-data/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bed_id: verifiedBedId, roomRecordingId, noteRecordingId }),
      });
      const createData = (await createResponse.json()) as { error?: string };
      console.log("[MobileRecorder] RED — room_data create response:", createData);
      if (!createResponse.ok) throw new Error(createData.error || "Failed to create room data");

      console.log("[MobileRecorder] RED — note submitted, starting deferred transcription...");
      void transcribeRecording(noteRecordingId).then((t) => {
        console.log("[MobileRecorder] RED — deferred transcript:", t);
      }).catch((e) => console.error("Deferred transcription failed:", e));

      unsubscribeChannel(recordingRealtimeRef.current);
      recordingRealtimeRef.current = subscribeToRecording(noteRecordingId, () => {
        setStatus(`Transcription complete for Room ${parsedRoomBed.roomNumber}, Bed ${parsedRoomBed.bedLetter}.`);
      });

      setStatus(`Note uploaded for Room ${parsedRoomBed.roomNumber}, Bed ${parsedRoomBed.bedLetter}. Transcription in progress...`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Audio workflow failed.");
    }
  };

  // Keep the ref pointing at the latest uploadRecording on every render.
  uploadRecordingRef.current = uploadRecording;

  const startRecording = async (color: "green" | "red") => {
    if (isRecording) return;
    setButtonColor(color);
    activeButtonRef.current = color;
    console.log("[MobileRecorder] startRecording — color:", color);
    try {
      const recorder = await initAudio();
      audioChunksRef.current = [];
      recorder.start();
      setIsRecording(true);
      console.log("[MobileRecorder] recorder started — state:", recorder.state);
      if (color === "green") setStatus("Recording room information...");
      else if (parsedRoomBed) setStatus(`Charting to Room ${parsedRoomBed.roomNumber}, Bed ${parsedRoomBed.bedLetter}...`);
      else setStatus("Charting note... (No room specified)");
    } catch (recordingError) {
      setStatus(`Error accessing microphone: ${recordingError instanceof Error ? recordingError.message : "Microphone access failed."}`);
    }
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;
    console.log("[MobileRecorder] stopRecording — activeButtonRef:", activeButtonRef.current);
    mediaRecorderRef.current.stop();
    if (buttonColor !== "red") setStatus("Processing recording...");
    setIsRecording(false);
  };

  const clearStatus = () => { setStatus(""); setIsRecording(false); };

  const logoutLocal = () => {
    unsubscribeChannel(recordingRealtimeRef.current);
    recordingRealtimeRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    mediaRecorderRef.current = null;
    streamRef.current = null;
    audioChunksRef.current = [];
    setStep("login");
    setCurrentRoom("");
    setRoomRecordingId("");
    setParsedRoomBed(null);
    setVerifiedBedId(null);
    setStatus("");
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {step === "login" ? (
          <>
            <div className={styles.header}>
              <div className={styles.avatar}><UserRound size={36} /></div>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>Please sign in to your account</p>
            </div>
            <form className={styles.form} onSubmit={handleLogin}>
              <div>
                <label htmlFor="organization" className={styles.fieldLabel}>Medical Center</label>
                <select id="organization" className={styles.fieldInput} value={organization}
                  onChange={(e) => setOrganization(e.target.value)} required>
                  <option value="" disabled>Select your Organization</option>
                  {ORGANIZATIONS.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="staffId" className={styles.fieldLabel}>Staff ID</label>
                <input id="staffId" type="text" className={styles.fieldInput} value={staffId}
                  onChange={(e) => setStaffId(e.target.value)} placeholder="Enter your Staff ID"
                  autoComplete="username" required />
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
              <button className={`${styles.recordButton} ${styles.green}`}
                onMouseDown={() => startRecording("green")} onMouseUp={stopRecording}
                onTouchStart={() => startRecording("green")} onTouchEnd={stopRecording}
                aria-label="Record room information"><Mic size={30} /></button>
              <button className={`${styles.recordButton} ${styles.red}`}
                onMouseDown={() => startRecording("red")} onMouseUp={stopRecording}
                onTouchStart={() => startRecording("red")} onTouchEnd={stopRecording}
                aria-label="Record patient note"><Mic size={30} /></button>
              <button className={`${styles.recordButton} ${styles.gray}`}
                onClick={clearStatus} aria-label="Clear status text"><Trash2 size={28} /></button>
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
            <button className={styles.logoutButton} onClick={logoutLocal}>Switch User</button>
          </div>
        )}
      </section>
    </main>
  );
}
