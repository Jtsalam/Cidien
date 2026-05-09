// Role: Encapsulate Recording realtime subscriptions for transcript updates.
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabaseClient";

export function subscribeToRecording(
  recordingId: string,
  onTranscript: (transcript: string) => void,
) {
  const channel = supabaseClient
    .channel(`recording:${recordingId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "Recording",
        filter: `id=eq.${recordingId}`,
      },
      (payload) => {
        const transcript = payload.new?.transcript;
        if (typeof transcript === "string" && transcript.trim().length > 0) {
          onTranscript(transcript);
        }
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribeChannel(channel: RealtimeChannel | null | undefined) {
  if (!channel) return;
  supabaseClient.removeChannel(channel);
}
