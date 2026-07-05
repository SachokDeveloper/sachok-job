-- ============================================================================
-- Sachok Job — Supabase schema (MVP)
-- Paste this whole file into: Supabase Dashboard -> SQL Editor -> New query
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. employers
-- ----------------------------------------------------------------------------
create table if not exists employers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. jobs
-- ----------------------------------------------------------------------------
create table if not exists jobs (
  id           uuid primary key default gen_random_uuid(),
  employer_id  uuid not null references employers(id) on delete cascade,
  title        text not null,
  company      text not null,
  employment   text not null default 'Full-time',
  remote       boolean not null default true,
  salary       text not null default '',
  tags         text[] not null default '{}',
  total_slots  integer not null default 10,
  created_at   timestamptz not null default now()
);

create index if not exists jobs_employer_id_idx on jobs(employer_id);
create index if not exists jobs_created_at_idx on jobs(created_at desc);

-- ----------------------------------------------------------------------------
-- 3. applications
-- ----------------------------------------------------------------------------
create table if not exists applications (
  id               uuid primary key default gen_random_uuid(),
  job_id           uuid not null references jobs(id) on delete cascade,
  applicant_name   text not null,
  applicant_email  text not null,
  message          text,
  created_at       timestamptz not null default now(),
  -- Prevents the same person from applying twice to the same job.
  unique (job_id, applicant_email)
);

create index if not exists applications_job_id_idx on applications(job_id);

-- ----------------------------------------------------------------------------
-- 4. Hard limit: max 10 applications per job (enforced in the database so it
--    holds even if two people apply at the exact same time).
-- ----------------------------------------------------------------------------
create or replace function enforce_application_limit()
returns trigger as $$
declare
  current_count integer;
  slot_limit integer;
begin
  select count(*) into current_count from applications where job_id = new.job_id;
  select total_slots into slot_limit from jobs where id = new.job_id;

  if current_count >= coalesce(slot_limit, 10) then
    raise exception 'Application limit reached for this job' using errcode = 'P0001';
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_enforce_application_limit on applications;
create trigger trg_enforce_application_limit
  before insert on applications
  for each row execute function enforce_application_limit();

-- ----------------------------------------------------------------------------
-- 5. Row Level Security
--    MVP note: there is no real auth yet, so we use permissive policies that
--    allow the app's anon key to read/insert everything. This is fine for a
--    demo/MVP but should be tightened (e.g. with Supabase Auth + policies
--    scoped to auth.uid()) before handling real user data in production.
-- ----------------------------------------------------------------------------
alter table employers enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;

drop policy if exists "Public read employers" on employers;
create policy "Public read employers" on employers for select using (true);
drop policy if exists "Public insert employers" on employers;
create policy "Public insert employers" on employers for insert with check (true);

drop policy if exists "Public read jobs" on jobs;
create policy "Public read jobs" on jobs for select using (true);
drop policy if exists "Public insert jobs" on jobs;
create policy "Public insert jobs" on jobs for insert with check (true);

drop policy if exists "Public read applications" on applications;
create policy "Public read applications" on applications for select using (true);
drop policy if exists "Public insert applications" on applications;
create policy "Public insert applications" on applications for insert with check (true);

-- ----------------------------------------------------------------------------
-- 6. Optional: seed a demo job so the homepage isn't empty on first load.
-- ----------------------------------------------------------------------------
with demo_employer as (
  insert into employers (name, email)
  values ('Digital Agency', 'demo-employer@sachok.job')
  on conflict (email) do update set name = excluded.name
  returning id
)
insert into jobs (employer_id, title, company, employment, remote, salary, tags, total_slots)
select id, 'Marketing Manager', 'Digital Agency', 'Full-time', true, '$1500 - $2500 / month',
       array['Marketing', 'SMM', 'Analytics', 'Strategy'], 10
from demo_employer
where not exists (select 1 from jobs where title = 'Marketing Manager' and company = 'Digital Agency');
