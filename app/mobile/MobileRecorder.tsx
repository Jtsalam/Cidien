"use client";

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LogIn, Menu, Mic, Trash2, UserRound } from "lucide-react";
import styles from "./mobile.module.css";
import MobileTutorial from "./MobileTutorial";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { subscribeToRecording, unsubscribeChannel } from "@/lib/realtime/recordings";
import { emitMobileConnected } from "@/lib/realtime/mobileSignal";

const MOBILE_TUTORIAL_STORAGE_KEY = "cidien-mobile-tutorial-complete";
const REPO_URL = "https://github.com/Jtsalam/Cidien";
/** Room (green) recording auto-stops so silent/long clips do not run indefinitely. */
const ROOM_RECORDING_AUTO_STOP_MS = 20_000;
/** If transcript is longer than this, status line shows first N chars + ellipsis only. */
const HEARD_STATUS_MAX_CHARS = 30;
const HEARD_STATUS_TRUNCATE_LEN = 5;

function formatHeardForStatus(raw: string): string {
  const t = raw.replace(/"/g, "'").trim();
  if (t.length <= HEARD_STATUS_MAX_CHARS) return t;
  return `${t.slice(0, HEARD_STATUS_TRUNCATE_LEN)}…`;
}

class TranscriptionLimitError extends Error {
  repoUrl: string;
  retryAt: string | null;
  constructor(message: string, repoUrl: string, retryAt: string | null = null) {
    super(message);
    this.name = "TranscriptionLimitError";
    this.repoUrl = repoUrl;
    this.retryAt = retryAt;
  }
}

/** Raised when transcription returns no usable text (e.g. silence or inaudible audio). */
class EmptyTranscriptError extends Error {
  constructor() {
    super("EMPTY_TRANSCRIPT");
    this.name = "EmptyTranscriptError";
  }
}

function formatRetryAt(retryAtIso: string | null): string {
  if (!retryAtIso) return "";
  const retryAt = new Date(retryAtIso);
  if (Number.isNaN(retryAt.getTime())) return "";
  const diffMs = retryAt.getTime() - Date.now();
  if (diffMs <= 0) return "";
  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  const minutes = Math.ceil((diffMs % (60 * 60 * 1000)) / (60 * 1000));
  if (hours >= 1) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

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
  const raw = transcript.trim();
  if (!raw) return null;
  // Normalize inner whitespace; trim trailing periods (e.g. "205A." / "Room … Bed C.")
  const spaced = raw.replace(/\s+/g, " ").replace(/\.+$/, "").trim();

  const fromGroups = (m: RegExpMatchArray) =>
    ({ roomNumber: m[1], bedLetter: m[2].toUpperCase() } as ParsedRoomBed);

  // Room + digits + Bed + letter (any 1–5 digit room, any bed letter); substring OK
  const roomBedWord = spaced.match(/\broom\s*(\d{1,5})\s*[^a-z\d]*\s*bed\s*([a-z])\b/i);
  if (roomBedWord) return fromGroups(roomBedWord);

  // Digits + Bed + letter without leading "Room"
  const digitsBedWord = spaced.match(/\b(\d{1,5})\s*[^a-z\d]*\s*bed\s*([a-z])\b/i);
  if (digitsBedWord) return fromGroups(digitsBedWord);

  // "Room" + digits + letter (tight "Room205A" or spaced "Room 205 A"); \b avoids the letter in "Bed"
  const roomDigitsLetter = spaced.match(/\broom\s*(\d{1,5})\s*([a-z])\b/i);
  if (roomDigitsLetter) return fromGroups(roomDigitsLetter);

  // Whole utterance only: digits + optional space + one letter (e.g. "12C", "12 C")
  const bareLine = spaced.match(/^(\d{1,5})\s*([a-z])$/i);
  if (bareLine) return fromGroups(bareLine);

  return null;
}

type AssignedRoomsBedsPayload = {
  nurseName?: string | null;
  staffId?: string;
  rooms?: Array<{
    room_number: string;
    beds: Array<{ bed_id: number; bed_letter: string; patient_name?: string }>;
  }>;
  error?: string;
};

type MenuAssignmentRow = {
  room_number: string;
  bed_letter: string;
  patient_label: string;
};

function pickRandomAssignmentExample(rows: MenuAssignmentRow[]): { long: string; short: string } | null {
  if (!rows.length) return null;
  const row = rows[Math.floor(Math.random() * rows.length)];
  return {
    long: `Room ${row.room_number} Bed ${row.bed_letter}`,
    short: `${row.room_number} ${row.bed_letter}`,
  };
}

function formatPatientLabel(patientName: string | undefined): string {
  const raw = (patientName ?? "").trim();
  if (!raw || raw.toLowerCase() === "unassigned") return "—";
  const parts = raw.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0];
  const first = parts[0];
  const last = parts[parts.length - 1];
  const initial = first[0];
  if (!initial) return raw;
  return `${initial.toUpperCase()}. ${last}`;
}

function buildMenuAssignmentRows(
  rooms: NonNullable<AssignedRoomsBedsPayload["rooms"]>,
  limit: number,
): MenuAssignmentRow[] {
  const sortedRooms = [...rooms].sort((a, b) => {
    const na = Number.parseInt(a.room_number, 10);
    const nb = Number.parseInt(b.room_number, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return a.room_number.localeCompare(b.room_number, undefined, { numeric: true });
  });
  const rows: MenuAssignmentRow[] = [];
  for (const r of sortedRooms) {
    const beds = [...r.beds].sort((a, b) => a.bed_letter.localeCompare(b.bed_letter));
    for (const b of beds) {
      rows.push({
        room_number: r.room_number,
        bed_letter: b.bed_letter,
        patient_label: formatPatientLabel(b.patient_name),
      });
      if (rows.length >= limit) return rows;
    }
  }
  return rows;
}

function WaveformBars() {
  return (
    <span className={styles.waveform} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={styles.waveformBar} style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
    </span>
  );
}

export default function MobileRecorder() {
  // Role: useSearchParams is safe here because this component is wrapped in Suspense by page.tsx.
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("login");
  const [organization, setOrganization] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [status, setStatusLine] = useState<string>("");
  const [statusShowMenuLink, setStatusShowMenuLink] = useState(false);
  const [transcriptionLimit, setTranscriptionLimit] = useState<{
    reached: boolean;
    retryAt: string | null;
  }>({ reached: false, retryAt: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  /** Idle, which color is actively recording, or upload/transcribe in flight after stop. */
  type RecordingPhase = "idle" | "green" | "red" | "processing";
  const [recordingPhase, setRecordingPhase] = useState<RecordingPhase>("idle");
  const [roomRecordingId, setRoomRecordingId] = useState<string>("");
  const [parsedRoomBed, setParsedRoomBed] = useState<ParsedRoomBed | null>(null);
  const [verifiedBedId, setVerifiedBedId] = useState<number | null>(null);
  const activeButtonRef = useRef<"green" | "red" | "">("");
  const startInProgressRef = useRef(false);
  const roomAutoStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recordingRealtimeRef = useRef<ReturnType<typeof subscribeToRecording> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  // Role: Always point at the latest uploadRecording so the stale onstop closure
  // still calls the current version (with up-to-date state in its closure).
  const uploadRecordingRef = useRef<(blob: Blob, color: "green" | "red" | "") => Promise<void>>(
    async () => {},
  );

  function setStatus(message: string, options?: { showMenuLink?: boolean }) {
    setStatusLine(message);
    setStatusShowMenuLink(Boolean(options?.showMenuLink));
  }

  const openAssignmentsMenu = () => {
    setMenuOpen(true);
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(30);
  };

  const clearRoomAutoStopTimer = () => {
    if (roomAutoStopTimerRef.current != null) {
      clearTimeout(roomAutoStopTimerRef.current);
      roomAutoStopTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearRoomAutoStopTimer();
      unsubscribeChannel(recordingRealtimeRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (step !== "recording") return;
    try {
      if (!localStorage.getItem(MOBILE_TUTORIAL_STORAGE_KEY)) setTutorialOpen(true);
    } catch {
      setTutorialOpen(true);
    }
  }, [step]);

  const completeTutorial = () => {
    try {
      localStorage.setItem(MOBILE_TUTORIAL_STORAGE_KEY, "1");
    } catch {
      /* private mode */
    }
    setTutorialOpen(false);
  };

  const restartTutorial = () => setTutorialOpen(true);

  const [nurseMenu, setNurseMenu] = useState<{
    loading: boolean;
    error: string | null;
    nurseName: string | null;
    staffIdDisplay: string;
    assignments: MenuAssignmentRow[];
  }>({
    loading: false,
    error: null,
    nurseName: null,
    staffIdDisplay: "",
    assignments: [],
  });

  useEffect(() => {
    if (step !== "recording" || !staffId) return;
    let cancelled = false;
    setNurseMenu((prev) => ({
      ...prev,
      loading: true,
      error: null,
      staffIdDisplay: staffId,
    }));
    const url = `/api/staff/assigned-rooms-beds?nurseId=${encodeURIComponent(staffId)}`;
    void fetch(url)
      .then(async (res) => {
        const data = (await res.json()) as AssignedRoomsBedsPayload;
        if (!res.ok) throw new Error(data.error ?? "Unable to load your assignments.");
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        setNurseMenu({
          loading: false,
          error: null,
          nurseName: data.nurseName ?? null,
          staffIdDisplay: data.staffId ?? staffId,
          assignments: buildMenuAssignmentRows(data.rooms ?? [], 3),
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setNurseMenu({
          loading: false,
          error: err instanceof Error ? err.message : "Unable to load assignments.",
          nurseName: null,
          staffIdDisplay: staffId,
          assignments: [],
        });
      });
    return () => {
      cancelled = true;
    };
  }, [step, staffId]);

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
          setStatus("Connected via QR code. Tap green or red mic to record - tap again to stop.");
          await emitMobileConnected(sessionParam, staffIdParam);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "QR bypass failed.");
      } finally {
        if (!cancelled) setSubmitting(false);
      }
    }

    void activateBypass();
    return () => {
      cancelled = true;
    };
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
      setStatus("Signed in. Tap green or red to record — tap again to stop.");
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
      if (color === "red" && blob.size > 0) {
        setStatus("Processing audio transcription");
      }
      try {
        // Call through the ref so we always get the latest uploadRecording (fresh state closure).
        await uploadRecordingRef.current(blob, color);
      } finally {
        setRecordingPhase("idle");
      }
    };
    mediaRecorderRef.current = mediaRecorder;
    return mediaRecorder;
  };

  const uploadBlob = async (audioBlob: Blob, type: "ROOM" | "NOTE") => {
    const formData = new FormData();
    formData.append("file", audioBlob, `${type.toLowerCase()}.webm`);
    formData.append("type", type);
    const uploadResponse = await fetch("/api/recordings/upload", { method: "POST", body: formData });
    const uploadData = (await uploadResponse.json()) as {
      recordingId?: string;
      error?: string;
      limitReached?: boolean;
      repoUrl?: string;
      retryAt?: string;
    };
    if (uploadResponse.status === 429 && uploadData.limitReached) {
      throw new TranscriptionLimitError(
        uploadData.error || "Demo transcription limit reached.",
        uploadData.repoUrl || REPO_URL,
        uploadData.retryAt ?? null,
      );
    }
    if (!uploadResponse.ok || !uploadData.recordingId) throw new Error(uploadData.error || "Upload failed");
    return uploadData.recordingId;
  };

  const transcribeRecording = async (recordingId: string) => {
    const response = await fetch("/api/recordings/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingId }),
    });
    const data = (await response.json()) as {
      transcript?: string;
      error?: string;
      limitReached?: boolean;
      repoUrl?: string;
      retryAt?: string;
    };
    if (response.status === 429 && data.limitReached) {
      throw new TranscriptionLimitError(
        data.error || "Demo transcription limit reached.",
        data.repoUrl || REPO_URL,
        data.retryAt ?? null,
      );
    }
    if (!response.ok) throw new Error(data.error || "Transcription failed");
    const trimmed = (data.transcript ?? "").trim();
    if (!trimmed) throw new EmptyTranscriptError();
    return trimmed;
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

  // Role: Charge the demo transcription counter only after green-button room access
  // is confirmed (parse + bed assignment both succeeded). Throws TranscriptionLimitError
  // on 429 so the existing outer catch surfaces the banner + disables the buttons.
  const confirmRoomAccess = async (recordingId: string) => {
    const response = await fetch("/api/recordings/confirm-room-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordingId }),
    });
    const data = (await response.json()) as {
      success?: boolean;
      error?: string;
      limitReached?: boolean;
      repoUrl?: string;
      retryAt?: string;
    };
    if (response.status === 429 && data.limitReached) {
      throw new TranscriptionLimitError(
        data.error || "Demo transcription limit reached.",
        data.repoUrl || REPO_URL,
        data.retryAt ?? null,
      );
    }
    if (!response.ok) throw new Error(data.error || "Room access confirmation failed");
  };

  const uploadRecording = async (audioBlob: Blob, color: "green" | "red" | "") => {
    try {
      if (color === "green") {
        setStatus("Processing room recording...");
        const newRoomRecordingId = await uploadBlob(audioBlob, "ROOM");
        const roomTranscript = await transcribeRecording(newRoomRecordingId);
        const parsed = parseRoomBedFromTranscript(roomTranscript);
        const heardForStatus = formatHeardForStatus(roomTranscript);
        if (!parsed) {
          setRoomRecordingId("");
          setParsedRoomBed(null);
          setVerifiedBedId(null);
          const example = pickRandomAssignmentExample(nurseMenu.assignments);
          const hint = example
            ? `Try saying something like "${example.long}" or "${example.short}" (use one of your assigned rooms).`
            : "Open the menu to see your assigned rooms, then try again.";
          setStatus(`Couldn't identify a room — heard "${heardForStatus}". ${hint}`, { showMenuLink: true });
          return;
        }

        setStatus("Checking room assignment...");
        const bedId = await resolveBedId(parsed.roomNumber, parsed.bedLetter);
        if (!bedId) {
          setRoomRecordingId("");
          setParsedRoomBed(null);
          setVerifiedBedId(null);
          setStatus(`Room Access Denied — heard "${heardForStatus}". Please try again.`, {
            showMenuLink: true,
          });
          return;
        }

        // Only now does this attempt cost a demo credit. If we're already at the cap
        // this call throws TranscriptionLimitError (handled by the outer catch) and
        // we leave room state unset so the user can't proceed to the red button.
        await confirmRoomAccess(newRoomRecordingId);

        setRoomRecordingId(newRoomRecordingId);
        setParsedRoomBed(parsed);
        setVerifiedBedId(bedId);
        setStatus(`Room ${parsed.roomNumber}, Bed ${parsed.bedLetter} – Room audio processed successfully`);
        return;
      }

      if (!roomRecordingId || !parsedRoomBed || !verifiedBedId) {
        setStatus("Record room information first.");
        return;
      }

      const noteRecordingId = await uploadBlob(audioBlob, "NOTE");

      const createResponse = await fetch("/api/room-data/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bed_id: verifiedBedId, roomRecordingId, noteRecordingId }),
      });
      const createData = (await createResponse.json()) as { error?: string };
      if (!createResponse.ok) throw new Error(createData.error || "Failed to create room data");

      void transcribeRecording(noteRecordingId)
        .catch((e) => {
          console.error("Deferred transcription failed:", e);
          if (e instanceof EmptyTranscriptError) {
            setStatus("Audio not heard properly, please try again.");
            return;
          }
          if (e instanceof TranscriptionLimitError) {
            setTranscriptionLimit({ reached: true, retryAt: e.retryAt });
            setStatus(
              "Demo transcription limit reached. The note was saved with a placeholder; clone the repo to self-host with no limits.",
            );
          }
        });

      unsubscribeChannel(recordingRealtimeRef.current);
      recordingRealtimeRef.current = subscribeToRecording(noteRecordingId, () => {
        setStatus(`Transcription complete for Room ${parsedRoomBed.roomNumber}, Bed ${parsedRoomBed.bedLetter}.`);
      });

      setStatus(`Note uploaded for Room ${parsedRoomBed.roomNumber}, Bed ${parsedRoomBed.bedLetter}. Transcription in progress...`);
    } catch (error) {
      if (error instanceof TranscriptionLimitError) {
        setTranscriptionLimit({ reached: true, retryAt: error.retryAt });
        setStatus("Demo transcription limit reached. Clone the repo to self-host with no limits.");
        return;
      }
      if (error instanceof EmptyTranscriptError) {
        setRoomRecordingId("");
        setParsedRoomBed(null);
        setVerifiedBedId(null);
        setStatus("Audio not heard properly, please try again.", { showMenuLink: true });
        return;
      }
      setStatus(error instanceof Error ? error.message : "Audio workflow failed.");
    }
  };

  // Keep the ref pointing at the latest uploadRecording on every render.
  uploadRecordingRef.current = uploadRecording;

  const startRecording = async (color: "green" | "red") => {
    if (isRecording || recordingPhase === "processing" || startInProgressRef.current) return;
    if (transcriptionLimit.reached) {
      setStatus("Demo transcription limit reached. Clone the repo to self-host with no limits.");
      return;
    }

    startInProgressRef.current = true;
    if (navigator.vibrate) navigator.vibrate(100);

    activeButtonRef.current = color;
    try {
      const recorder = await initAudio();
      audioChunksRef.current = [];
      clearRoomAutoStopTimer();
      recorder.start();
      setIsRecording(true);
      setRecordingPhase(color);
      if (color === "green") {
        setStatus("Listening — say room and bed, then tap green again to stop.");
        roomAutoStopTimerRef.current = setTimeout(() => {
          roomAutoStopTimerRef.current = null;
          const mr = mediaRecorderRef.current;
          if (!mr || activeButtonRef.current !== "green") return;
          if (mr.state === "recording" || mr.state === "paused") {
            stopRecording();
          }
        }, ROOM_RECORDING_AUTO_STOP_MS);
      } else if (parsedRoomBed) setStatus(`Listening — charting to Room ${parsedRoomBed.roomNumber}, Bed ${parsedRoomBed.bedLetter}. Tap red again to stop.`);
      else setStatus("Listening — dictate your note, then tap red again to stop.");
    } catch (recordingError) {
      clearRoomAutoStopTimer();
      activeButtonRef.current = "";
      setRecordingPhase("idle");
      setStatus(`Error accessing microphone: ${recordingError instanceof Error ? recordingError.message : "Microphone access failed."}`);
    } finally {
      startInProgressRef.current = false;
    }
  };

  const stopRecording = () => {
    const mr = mediaRecorderRef.current;
    if (!mr) return;
    // Do not rely on React `isRecording` here — auto-stop runs from a timer created inside
    // `startRecording`, where that state can still be stale in the closure.
    if (mr.state !== "recording" && mr.state !== "paused") return;

    clearRoomAutoStopTimer();
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

    const releasingColor = activeButtonRef.current;
    setRecordingPhase("processing");
    mr.stop();
    if (releasingColor !== "red") setStatus("Processing recording...");
    setIsRecording(false);
  };

  const clearStatus = () => {
    if (recordingPhase !== "idle") return;
    setStatus("");
    setMenuOpen(false);
  };

  const handleGreenTap = () => {
    if (transcriptionLimit.reached || recordingPhase === "processing") return;
    if (recordingPhase === "green") {
      stopRecording();
      return;
    }
    if (recordingPhase === "red") return;
    void startRecording("green");
  };

  const canRecordCharting =
    Boolean(roomRecordingId) && Boolean(parsedRoomBed) && verifiedBedId != null;

  const handleRedTap = () => {
    if (transcriptionLimit.reached || recordingPhase === "processing") return;
    if (recordingPhase === "red") {
      stopRecording();
      return;
    }
    if (recordingPhase === "green") return;
    if (!canRecordCharting) {
      setStatus("Record room information first.");
      if (navigator.vibrate) navigator.vibrate(25);
      return;
    }
    void startRecording("red");
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
            <div className={styles.recordingHeader}>
              <div className={styles.recordingBrand}>
                <Image
                  src="/Cidien.svg"
                  alt="Cidien"
                  width={375}
                  height={225}
                  priority
                  className={styles.recordingLogo}
                />
                <span className={styles.recordingBadge}>Mobile</span>
              </div>
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button type="button" className={styles.menuTrigger} aria-label="Open menu">
                    <div className="icon-menu">
                      <Menu size={22} aria-hidden />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={cn(styles.mobileMenuContent, "p-0")}>
                  <div className={styles.menuPanelInner}>
                    <div className={styles.menuProfileBlock}>
                      {nurseMenu.loading ? (
                        <p className={styles.menuProfileLine}>Loading your profile…</p>
                      ) : (
                        <p className={styles.menuProfileLine}>
                          <span className={styles.menuProfileName}>{nurseMenu.nurseName ?? "Nurse"}</span>
                          <span className={styles.menuProfileSep} aria-hidden>
                            ·
                          </span>
                          <span className={styles.menuProfileId}>{nurseMenu.staffIdDisplay}</span>
                        </p>
                      )}
                      {nurseMenu.error ? <p className={styles.menuAssignmentsError}>{nurseMenu.error}</p> : null}
                    </div>
                    {!nurseMenu.loading && !nurseMenu.error ? (
                      nurseMenu.assignments.length > 0 ? (
                        nurseMenu.assignments.map((row) => (
                          <p key={`${row.room_number}-${row.bed_letter}`} className={styles.menuAssignmentRow}>
                            <span className={styles.menuAssignmentMeta}>
                              Room {row.room_number} Bed {row.bed_letter}
                            </span>
                            <span className={styles.menuAssignmentArrow} aria-hidden>
                              →
                            </span>
                            <span className={styles.menuAssignmentPatient}>{row.patient_label}</span>
                          </p>
                        ))
                      ) : (
                        <p className={styles.menuAssignmentsEmpty}>No bed assignments on file for this account.</p>
                      )
                    ) : null}
                  </div>
                  <DropdownMenuSeparator className="m-0" />
                  <div className={styles.menuActionsArea}>
                    <DropdownMenuItem className={styles.restartTutorialItem} onSelect={restartTutorial}>
                      Restart tutorial
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className={styles.subtitle}>
              {recordingPhase === "processing"
                ? "Processing…"
                : recordingPhase === "green"
                  ? "Tap green again to stop"
                  : recordingPhase === "red"
                    ? "Tap red again to stop"
                    : "Tap to start - tap again to stop"}
            </p>
            {transcriptionLimit.reached ? (
              <div className={styles.limitBanner} role="alert" aria-live="polite">
                <p className={styles.limitBannerTitle}>Demo transcription limit reached</p>
                <p className={styles.limitBannerBody}>
                  You&apos;ve used the 10 free transcriptions for this 24-hour window
                  {formatRetryAt(transcriptionLimit.retryAt)
                    ? ` (resets in ~${formatRetryAt(transcriptionLimit.retryAt)})`
                    : ""}
                  . Clone the repo to self-host Cidien with no limits.
                </p>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.limitBannerCta}
                  aria-label="Open the Cidien GitHub repository to self-host"
                >
                  Open the repo on GitHub →
                </a>
              </div>
            ) : null}
            <div className={styles.statusArea} role="status" aria-live="polite">
              <p className={styles.status}>
                {status}
                {statusShowMenuLink ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className={styles.statusMenuLink}
                      onClick={openAssignmentsMenu}
                      aria-label="Open menu to see your assigned rooms and profile"
                    >
                      Check menu for assigned rooms.
                    </button>
                  </>
                ) : null}
              </p>
            </div>
            <div className={styles.buttonRow}>
              <div className={styles.recordSlot}>
                <button
                  type="button"
                  className={cn(
                    styles.recordButton,
                    styles.green,
                    recordingPhase === "green" && styles.recordButtonActiveGreen,
                    recordingPhase !== "idle" && recordingPhase !== "green" && styles.recordButtonDimmed,
                  )}
                  onClick={handleGreenTap}
                  disabled={
                    transcriptionLimit.reached ||
                    recordingPhase === "processing" ||
                    recordingPhase === "red"
                  }
                  aria-pressed={recordingPhase === "green"}
                  aria-label={
                    recordingPhase === "green"
                      ? "Stop recording room information"
                      : "Record room information"
                  }
                >
                  {recordingPhase === "green" ? <WaveformBars /> : <Mic size={30} />}
                </button>
                {recordingPhase === "green" ? (
                  <span className={styles.listeningLabelGreen}>Listening…</span>
                ) : (
                  <span className={styles.recordSlotSpacer} aria-hidden />
                )}
              </div>
              <div className={styles.recordSlot}>
                <button
                  type="button"
                  className={cn(
                    styles.recordButton,
                    styles.red,
                    recordingPhase === "red" && styles.recordButtonActiveRed,
                    recordingPhase !== "idle" && recordingPhase !== "red" && styles.recordButtonDimmed,
                    recordingPhase === "idle" && !canRecordCharting && styles.recordButtonAwaitingRoom,
                  )}
                  onClick={handleRedTap}
                  disabled={
                    transcriptionLimit.reached ||
                    recordingPhase === "processing" ||
                    recordingPhase === "green"
                  }
                  aria-pressed={recordingPhase === "red"}
                  aria-label={
                    recordingPhase === "red" ? "Stop recording patient note" : "Record patient note"
                  }
                >
                  {recordingPhase === "red" ? <WaveformBars /> : <Mic size={30} />}
                </button>
                {recordingPhase === "red" ? (
                  <span className={styles.listeningLabelRed}>Listening…</span>
                ) : (
                  <span className={styles.recordSlotSpacer} aria-hidden />
                )}
              </div>
              <div className={styles.recordSlot}>
                <button
                  type="button"
                  className={cn(
                    styles.recordButton,
                    styles.gray,
                    recordingPhase !== "idle" && styles.recordButtonDimmed,
                  )}
                  onClick={clearStatus}
                  disabled={recordingPhase !== "idle"}
                  aria-label="Clear status text"
                >
                  <Trash2 size={28} />
                </button>
                <span className={styles.recordSlotSpacer} aria-hidden />
              </div>
            </div>
            <div className={styles.legend}>
              <div
                className={cn(
                  styles.legendItem,
                  recordingPhase !== "idle" && recordingPhase !== "green" && styles.legendItemDimmed,
                )}
              >
                <span className={styles.dot} style={{ background: "#16a34a" }} />
                Green: tap to record room and bed - tap again to stop
              </div>
              <div
                className={cn(
                  styles.legendItem,
                  recordingPhase !== "idle" && recordingPhase !== "red" && styles.legendItemDimmed,
                )}
              >
                <span className={styles.dot} style={{ background: "#dc2626" }} />
                Red: tap to chart a note - tap again to stop (after room is confirmed)
              </div>
              <div
                className={cn(
                  styles.legendItem,
                  recordingPhase !== "idle" && styles.legendItemDimmed,
                )}
              >
                <span className={styles.dot} style={{ background: "#6b7280" }} />
                Grey: clear status
              </div>
            </div>
            <MobileTutorial open={tutorialOpen} onFinish={completeTutorial} />
          </div>
        )}
      </section>
    </main>
  );
}
