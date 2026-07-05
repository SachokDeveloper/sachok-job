import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// We don't throw at import time so the app (and the build) never crashes if
// env vars are missing — instead, calls to lib/jobsApi.ts will surface a
// friendly error message that guides the user to set up .env.local.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  client = createClient(supabaseUrl as string, supabaseAnonKey as string, {
    auth: {
      persistSession: false,
    },
  });
}

export const supabase = client;
