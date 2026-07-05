"use client";

import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import JobCard from "./JobCard";
import ApplyModal from "./ApplyModal";
import { Job } from "@/types";
import { fetchJobs, MAX_APPLICATIONS_PER_JOB } from "@/lib/jobsApi";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { JOB_CREATED_EVENT } from "@/lib/events";

export default function JobsGrid({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loadedFromDb, setLoadedFromDb] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    fetchJobs()
      .then((dbJobs) => {
        if (cancelled) return;
        if (dbJobs.length > 0) {
          setJobs(dbJobs);
          setLoadedFromDb(true);
        }
      })
      .catch(() => {
        // Fall back silently to the seed jobs already shown.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleJobCreated = (e: Event) => {
      const job = (e as CustomEvent<Job>).detail;
      setJobs((prev) => [job, ...prev]);
      setLoadedFromDb(true);
    };
    window.addEventListener(JOB_CREATED_EVENT, handleJobCreated);
    return () => window.removeEventListener(JOB_CREATED_EVENT, handleJobCreated);
  }, []);

  const openApply = (job: Job) => {
    setApplyJob(job);
    setApplyOpen(true);
  };

  const handleApplied = (jobId: string, newAppliedCount: number) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, applied: newAppliedCount, spotsLeft: Math.max(j.totalSlots - newAppliedCount, 0) }
          : j
      )
    );
  };

  return (
    <>
      <Carousel itemClassName="w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
        {jobs.map((job) => {
          // Only jobs that actually exist in Supabase can accept real
          // applications. Until the DB has at least one job, the seed cards
          // are shown purely as a visual preview (Apply is a no-op, same as
          // before this feature existed) so we never try to insert an
          // application against a fake job id.
          const canApply = isSupabaseConfigured && loadedFromDb;
          return (
            <JobCard
              key={job.id}
              job={job}
              onApply={canApply ? () => openApply(job) : undefined}
              disabled={canApply && job.applied >= (job.totalSlots || MAX_APPLICATIONS_PER_JOB)}
            />
          );
        })}
      </Carousel>

      {!isSupabaseConfigured && (
        <p className="text-xs text-muted text-center mt-4">
          Showing demo jobs. Connect Supabase (see .env.local) to post real jobs and accept applications.
        </p>
      )}
      {isSupabaseConfigured && !loadedFromDb && (
        <p className="text-xs text-muted text-center mt-4">
          Showing demo jobs — post the first real job to replace them.
        </p>
      )}

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        job={applyJob}
        onApplied={handleApplied}
      />
    </>
  );
}
