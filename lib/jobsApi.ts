import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { Job } from "@/types";

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file and restart the dev server."
    );
    this.name = "SupabaseNotConfiguredError";
  }
}

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new SupabaseNotConfiguredError();
  }
  return supabase;
}

// Shape returned by Supabase for a job row joined with its applications count.
interface JobRow {
  id: string;
  title: string;
  company: string;
  employment: string;
  remote: boolean;
  salary: string;
  tags: string[] | null;
  total_slots: number;
  created_at: string;
  applications: { count: number }[] | null;
}

const MAX_APPLICATIONS_PER_JOB = 10;

function mapRowToJob(row: JobRow): Job {
  const applied = row.applications?.[0]?.count ?? 0;
  const totalSlots = row.total_slots ?? MAX_APPLICATIONS_PER_JOB;
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    verified: true,
    remote: row.remote,
    employment: row.employment,
    salary: row.salary,
    tags: row.tags ?? [],
    spotsLeft: Math.max(totalSlots - applied, 0),
    applied,
    totalSlots,
  };
}

/**
 * Fetches all jobs from Supabase, newest first, together with a live count
 * of how many applications each job has received.
 */
export async function fetchJobs(): Promise<Job[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from("jobs")
    .select("*, applications(count)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as unknown as JobRow[]).map(mapRowToJob);
}

export interface CreateJobInput {
  title: string;
  company: string;
  employment: string;
  remote: boolean;
  salary: string;
  tags: string[];
  employerName: string;
  employerEmail: string;
  totalSlots?: number;
}

/**
 * Finds (or creates) an employer by email, then creates a job owned by that
 * employer. This is the "demo employer" flow used in place of full auth.
 */
export async function createJob(input: CreateJobInput): Promise<Job> {
  const client = requireSupabase();
  const email = input.employerEmail.trim().toLowerCase();

  const { data: existingEmployer, error: findError } = await client
    .from("employers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (findError) throw findError;

  let employerId = existingEmployer?.id as string | undefined;

  if (!employerId) {
    const { data: newEmployer, error: insertEmployerError } = await client
      .from("employers")
      .insert({ name: input.employerName.trim(), email })
      .select("id")
      .single();

    if (insertEmployerError) throw insertEmployerError;
    employerId = newEmployer.id as string;
  }

  const { data: jobRow, error: insertJobError } = await client
    .from("jobs")
    .insert({
      employer_id: employerId,
      title: input.title.trim(),
      company: input.company.trim(),
      employment: input.employment,
      remote: input.remote,
      salary: input.salary.trim(),
      tags: input.tags,
      total_slots: input.totalSlots ?? MAX_APPLICATIONS_PER_JOB,
    })
    .select("*, applications(count)")
    .single();

  if (insertJobError) throw insertJobError;
  return mapRowToJob(jobRow as unknown as JobRow);
}

export interface CreateApplicationInput {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  message?: string;
}

export class ApplicationLimitReachedError extends Error {
  constructor() {
    super("This job already has 10 applications. The limit has been reached.");
    this.name = "ApplicationLimitReachedError";
  }
}

export class AlreadyAppliedError extends Error {
  constructor() {
    super("You've already applied to this job with this email.");
    this.name = "AlreadyAppliedError";
  }
}

/**
 * Creates an application for a job. The 10-applications-per-job limit is
 * enforced both here (for a fast UX message) and, authoritatively, by a
 * Postgres trigger (see supabase.sql) so it holds even under concurrent
 * requests.
 */
export async function createApplication(input: CreateApplicationInput): Promise<number> {
  const client = requireSupabase();

  const currentCount = await getApplicationsCount(input.jobId);
  if (currentCount >= MAX_APPLICATIONS_PER_JOB) {
    throw new ApplicationLimitReachedError();
  }

  const { error } = await client.from("applications").insert({
    job_id: input.jobId,
    applicant_name: input.applicantName.trim(),
    applicant_email: input.applicantEmail.trim().toLowerCase(),
    message: input.message?.trim() || null,
  });

  if (error) {
    // Unique violation -> duplicate application for this job+email.
    if (error.code === "23505") throw new AlreadyAppliedError();
    // Custom exception raised by the limit-enforcing trigger.
    if (error.code === "P0001") throw new ApplicationLimitReachedError();
    throw error;
  }

  return currentCount + 1;
}

export async function getApplicationsCount(jobId: string): Promise<number> {
  const client = requireSupabase();
  const { count, error } = await client
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("job_id", jobId);

  if (error) throw error;
  return count ?? 0;
}

export { MAX_APPLICATIONS_PER_JOB };
