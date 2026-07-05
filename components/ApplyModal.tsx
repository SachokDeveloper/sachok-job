"use client";

import { useState } from "react";
import Modal from "./Modal";
import { createApplication } from "@/lib/jobsApi";
import { Job } from "@/types";

const fieldClass =
  "w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand transition-colors placeholder:text-muted";

export default function ApplyModal({
  open,
  onClose,
  job,
  onApplied,
}: {
  open: boolean;
  onClose: () => void;
  job: Job | null;
  onApplied: (jobId: string, newAppliedCount: number) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const newCount = await createApplication({
        jobId: job.id,
        applicantName: name,
        applicantEmail: email,
        message,
      });
      onApplied(job.id, newCount);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!job) return null;

  return (
    <Modal open={open} onClose={handleClose} title={`Apply — ${job.title}`} widthClass="max-w-sm">
      {success ? (
        <div className="text-center py-4">
          <p className="font-semibold text-ink">Application sent 🎉</p>
          <p className="text-sm text-muted mt-1">{job.company} will get back to you directly.</p>
          <button type="button" onClick={handleClose} className="btn btn-primary w-full mt-5">
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm text-muted">
            {job.applied} / {job.totalSlots} candidates applied so far.
          </p>
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Your name *</label>
            <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Your email *</label>
            <input
              type="email"
              className={fieldClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Message (optional)</label>
            <textarea
              className={fieldClass}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Why are you a great fit?"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={handleClose} className="btn btn-outline flex-1" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-1" disabled={submitting}>
              {submitting ? "Sending…" : "Send Application"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
