"use client";

import { useState } from "react";
import Modal from "./Modal";
import { createJob } from "@/lib/jobsApi";
import { Job } from "@/types";

const fieldClass =
  "w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand transition-colors placeholder:text-muted";

export default function PostJobModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (job: Job) => void;
}) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [employment, setEmployment] = useState("Full-time");
  const [remote, setRemote] = useState(true);
  const [salary, setSalary] = useState("");
  const [tags, setTags] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [employerEmail, setEmployerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setTitle("");
    setCompany("");
    setEmployment("Full-time");
    setRemote(true);
    setSalary("");
    setTags("");
    setEmployerName("");
    setEmployerEmail("");
    setError(null);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !employerName.trim() || !employerEmail.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const job = await createJob({
        title,
        company,
        employment,
        remote,
        salary: salary || "Salary not specified",
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        employerName,
        employerEmail,
      });
      onCreated(job);
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Post a Job" widthClass="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-ink mb-1 block">Job title *</label>
          <input className={fieldClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Marketing Manager" />
        </div>

        <div>
          <label className="text-sm font-medium text-ink mb-1 block">Company *</label>
          <input className={fieldClass} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Digital Agency" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Employment</label>
            <select className={fieldClass} value={employment} onChange={(e) => setEmployment(e.target.value)}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Location</label>
            <select
              className={fieldClass}
              value={remote ? "remote" : "onsite"}
              onChange={(e) => setRemote(e.target.value === "remote")}
            >
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink mb-1 block">Salary</label>
          <input className={fieldClass} value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="$1500 - $2500 / month" />
        </div>

        <div>
          <label className="text-sm font-medium text-ink mb-1 block">Tags (comma separated)</label>
          <input className={fieldClass} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Marketing, SMM, Analytics" />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-line">
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Your name *</label>
            <input className={fieldClass} value={employerName} onChange={(e) => setEmployerName(e.target.value)} placeholder="Jane Doe" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink mb-1 block">Your email *</label>
            <input
              type="email"
              className={fieldClass}
              value={employerEmail}
              onChange={(e) => setEmployerEmail(e.target.value)}
              placeholder="jane@company.com"
            />
          </div>
        </div>
        <p className="text-xs text-muted">
          No account needed for this demo — we use your email to identify you as the employer for this job.
        </p>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn btn-outline flex-1" disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1" disabled={submitting}>
            {submitting ? "Posting…" : "Post Job"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
