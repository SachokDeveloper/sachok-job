"use client";

import { useState } from "react";
import PostJobModal from "./PostJobModal";
import { Job } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { JOB_CREATED_EVENT } from "@/lib/events";

export default function EmployerCta() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline px-6 py-3"
        onClick={() => {
          if (!isSupabaseConfigured) {
            setNotice(true);
            return;
          }
          setOpen(true);
        }}
      >
        I&apos;m an Employer
      </button>

      {notice && !isSupabaseConfigured && (
        <p className="text-xs text-red-600 mt-2 w-full">
          Connect Supabase first — add your project URL and anon key to .env.local, then restart the app.
        </p>
      )}

      <PostJobModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={(job) => {
          window.dispatchEvent(new CustomEvent<Job>(JOB_CREATED_EVENT, { detail: job }));
        }}
      />
    </>
  );
}
