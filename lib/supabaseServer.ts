// Role: Create a server-side Supabase client used by recording APIs.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const AUDIO_RECORDINGS_BUCKET =
  process.env.SUPABASE_AUDIO_RECORDINGS_BUCKET ?? "audio-recordings";

/** Private bucket for demo session approved-notes PDF exports. */
export const SESSION_PDFS_BUCKET =
  process.env.SUPABASE_SESSION_PDFS_BUCKET ?? "session-pdfs";