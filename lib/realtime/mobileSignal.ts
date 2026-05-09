// Role: Supabase broadcast helpers for the phone→desktop QR scan signal.
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabaseClient";

export function unsubscribeChannel(channel: RealtimeChannel | null | undefined) {
  if (!channel) return;
  supabaseClient.removeChannel(channel);
}

const BROADCAST_EVENT = "mobile_connected";

// Role: Colons are reserved by Supabase Realtime for postgres topic routing;
// use a plain hyphen separator for broadcast channel names.
function channelName(sessionId: string) {
  return `mobile-signal-${sessionId}`;
}

// Role: Desktop subscribes; callback fires when a phone scans the QR and connects.
export function subscribeMobileConnected(
  sessionId: string,
  onConnected: (staffId: string) => void,
): RealtimeChannel {
  return supabaseClient
    .channel(channelName(sessionId), {
      config: { broadcast: { self: true } },
    })
    .on(
      "broadcast",
      { event: BROADCAST_EVENT },
      (msg: { payload?: { staffId?: string } }) => {
        if (msg.payload?.staffId) {
          onConnected(msg.payload.staffId);
        }
      },
    )
    .subscribe((status) => {
      console.log("[desktop] broadcast channel status:", status);
    });
}

// Role: Mobile page broadcasts once it has bypassed login and is ready.
export async function emitMobileConnected(
  sessionId: string,
  staffId: string,
): Promise<void> {
  const channel = supabaseClient.channel(channelName(sessionId), {
    config: { broadcast: { self: true } },
  });

  await new Promise<void>((resolve) => {
    channel.subscribe((status) => {
      console.log("[mobile] broadcast channel status:", status);
      if (status === "SUBSCRIBED") resolve();
    });
  });

  // Retry loop — desktop subscription may not have reached SUBSCRIBED on the first emit.
  for (let i = 0; i < 3; i++) {
    await channel.send({
      type: "broadcast",
      event: BROADCAST_EVENT,
      payload: { staffId },
    });
    await new Promise<void>((resolve) => setTimeout(resolve, 800));
  }

  supabaseClient.removeChannel(channel);
}