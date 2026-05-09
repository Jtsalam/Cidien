// Role: Create a server-side Supabase client used by recording APIs.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DATABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing DATABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const AUDIO_RECORDINGS_BUCKET =
  process.env.SUPABASE_AUDIO_RECORDINGS_BUCKET ?? "audio-recordings";
