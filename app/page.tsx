"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Star,
  Briefcase,
  Users,
  Building2,
  FileText,
  MapPin,
  Calendar,
  Hash,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  Send,
  Bell,
  Plus,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { JobCard } from "@/components/JobCard";
import { CandidateCard } from "@/components/CandidateCard";
import { SearchDropdown } from "@/components/SearchDropdown";
import { FilterModal } from "@/components/FilterModal";
import { jobs, candidates, locations, industries } from "@/lib/data";

const extendedJobs = [
  ...jobs,
  ...jobs.map((j, i) => ({ ...j, id: `${j.id}-b${i}` })),
  ...jobs.map((j, i) => ({ ...j, id: `${j.id}-c${i}` })),
];
const extendedCandidates = [...candidates];

export default function HomePage() {
  const [candidatePage, setCandidatePage] = useState(0);
  const [locationModal, setLocationModal] = useState(false);
  const [zipModal, setZipModal] = useState(false);
  const [industryModal, setIndustryModal] = useState(false);
  const [location, setLocation] = useState("New York, NY");
  const [zip, setZip] = useState("11219");
  const [industry, setIndustry] = useState("Technology");

  // Job carousel (slider) state — shared by both control panels
  const jobTrackRef = useRef<HTMLDivElement>(null);
  const [jobSlide, setJobSlide] = useState(0);
  const jobsPerView = 4;
  const jobSlideCount = Math.max(1, Math.ceil(extendedJobs.length / jobsPerView));

  const scrollJobsTo = (index: number) => {
    const el = jobTrackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(jobSlideCount - 1, index));
    const child = el.children[clamped * jobsPerView] as HTMLElement | undefined;
    if (child) {
      el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
    setJobSlide(clamped);
  };

  const handleJobsScroll = () => {
    const el = jobTrackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const idx = Math.round((el.scrollLeft / maxScroll) * (jobSlideCount - 1));
    setJobSlide(Math.max(0, Math.min(jobSlideCount - 1, idx)));
  };

  const candidatesPerPage = 5;
  const candidatePages = Math.ceil(extendedCandidates.length / candidatesPerPage);
  const visibleCandidates = extendedCandidates.slice(
    candidatePage * candidatesPerPage,
    candidatePage * candidatesPerPage + candidatesPerPage
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full px-3 py-1.5 mb-5">
                  <Star size={13} className="fill-primary-600" /> Only 10 candidates per job
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-[1.1]">
                  The best jobs.
                  <br />
                  <span className="text-primary-600">Real opportunities.</span>
                </h1>
                <p className="text-gray-500 mt-5 max-w-md leading-relaxed">
                  Sachok Job is a service where employers receive only 10 relevant
                  applications per job, and job seekers get a real chance to stand out.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <Button href="#find-a-job" size="lg">
                    Find a Job
                  </Button>
                  <Button href="/register?type=employer" variant="outline" size="lg">
                    I&apos;m an Employer
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -right-4 top-6 grid grid-cols-6 gap-2 opacity-40 pointer-events-none">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary-300" />
                  ))}
                </div>
                <div className="relative bg-white border border-gray-100 rounded-2xl shadow-soft p-6 max-w-sm mx-auto transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full px-2.5 py-1">
                      <Users size={12} /> 3 spots left
                    </span>
                    <span className="h-11 w-11 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                      <Briefcase size={20} />
                    </span>
                  </div>
                  <h3 className="font-bold text-ink-900 text-lg">Marketing Manager</h3>
                  <p className="flex items-center gap-1 text-sm text-ink-700 mt-1">
                    Digital Agency
                    <CheckCircle2 size={14} className="text-primary-500 fill-primary-500 text-white" />
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2.5">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> Remote
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={13} /> Full-time
                    </span>
                  </div>
                  <p className="text-primary-600 font-semibold text-sm mt-2.5">$1500 - $2500 / month</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {["Marketing", "SMM", "Analytics", "Strategy"].map((t) => (
                      <span key={t} className="text-xs font-medium bg-gray-100 text-ink-700 rounded-full px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="flex -space-x-2">
                      {[23, 44, 15, 8].map((s) => (
                        <img
                          key={s}
                          src={`https://i.pravatar.cc/64?img=${s}`}
                          alt=""
                          className="h-6 w-6 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                      <span className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-500">
                        +6
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">
                      <span className="font-semibold text-ink-800">7/10</span> candidates applied
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-10 bg-white border border-gray-100 rounded-2xl shadow-card px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: Users, value: "12,847", label: "Invited to interview today" },
                { icon: Briefcase, value: "3,256", label: "Got a job today" },
                { icon: Building2, value: "24,531", label: "Companies on the platform" },
                { icon: FileText, value: "68,742", label: "Active job vacancies" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl p-1.5 -m-1.5 transition-all duration-200 hover:bg-primary-50/50 hover:scale-[1.03] cursor-default">
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                    <s.icon size={19} />
                  </span>
                  <div>
                    <p className="font-extrabold text-ink-900 text-xl leading-tight">{s.value}</p>
                    <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIND A JOB */}
        <section id="find-a-job" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="flex items-center gap-2 font-bold text-ink-900 text-lg mb-4">
            <Briefcase size={18} className="text-primary-600" /> Find a Job
          </h2>

          <div className="flex flex-col lg:flex-row gap-3 mb-8">
            <button
              onClick={() => setLocationModal(true)}
              className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 text-left transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] ${
                locationModal ? "border-primary-400 ring-2 ring-primary-100" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                <MapPin size={16} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-primary-600">{location}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  Current open positions <ChevronDown size={12} />
                </span>
              </span>
            </button>

            <div className="flex-1">
              <SearchDropdown placeholder="Find job" />
            </div>

            <button
              onClick={() => setZipModal(true)}
              className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 text-left transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] ${
                zipModal ? "border-primary-400 ring-2 ring-primary-100" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                <Hash size={16} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-ink-900">{zip}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  ZIP CODE <ChevronDown size={12} />
                </span>
              </span>
            </button>

            <button
              onClick={() => setIndustryModal(true)}
              className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 text-left transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] ${
                industryModal ? "border-primary-400 ring-2 ring-primary-100" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                <Briefcase size={16} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-primary-600">{industry}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  Industry <ChevronDown size={12} />
                </span>
              </span>
            </button>
          </div>

          {/* TOP control panel — controls the same slider as the bottom one */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-ink-800">{extendedJobs.length}</span> open positions
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollJobsTo(jobSlide - 1)}
                className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-150"
                disabled={jobSlide === 0}
                aria-label="Previous jobs (top control)"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="hidden sm:flex items-center gap-1.5">
                {Array.from({ length: jobSlideCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollJobsTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === jobSlide ? "w-6 bg-primary-600" : "w-2 bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to job slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => scrollJobsTo(jobSlide + 1)}
                className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-150"
                disabled={jobSlide === jobSlideCount - 1}
                aria-label="Next jobs (top control)"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Slidable / scrollable job cards track */}
          <div
            ref={jobTrackRef}
            onScroll={handleJobsScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-2 -mx-1 px-1"
          >
            {extendedJobs.map((job) => (
              <div
                key={job.id}
                className="snap-start shrink-0 w-[80%] sm:w-[47%] lg:w-[calc(25%-15px)]"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>

          {/* BOTTOM control panel — same slider state as the top one */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => scrollJobsTo(jobSlide - 1)}
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-150"
              disabled={jobSlide === 0}
              aria-label="Previous jobs"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: jobSlideCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollJobsTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === jobSlide ? "w-6 bg-primary-600" : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to job slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollJobsTo(jobSlide + 1)}
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-150"
              disabled={jobSlide === jobSlideCount - 1}
              aria-label="Next jobs"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* PEOPLE FROM SOCIAL MEDIA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-9 w-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                <Star size={17} className="fill-pink-500" />
              </span>
              <div>
                <h2 className="font-bold text-ink-900 text-lg leading-tight">People from Social Media</h2>
                <p className="text-xs text-gray-400">They are looking for a job</p>
              </div>
            </div>
            <Link
              href="/social-media-candidates"
              className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:gap-2 whitespace-nowrap transition-all duration-200"
            >
              View all <ChevronRight size={15} />
            </Link>
          </div>

          <div key={candidatePage} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 animate-fade-in">
            {visibleCandidates.map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCandidatePage((p) => Math.max(0, p - 1))}
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-150"
              disabled={candidatePage === 0}
              aria-label="Previous candidates"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: candidatePages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCandidatePage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === candidatePage ? "w-6 bg-primary-600" : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCandidatePage((p) => Math.min(candidatePages - 1, p + 1))}
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-150"
              disabled={candidatePage === candidatePages - 1}
              aria-label="Next candidates"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900">How it works</h2>
            <p className="text-gray-500 mt-2">A simple process for job seekers and employers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />
            <div>
              <p className="text-center font-bold text-primary-600 mb-6">For Job Seekers</p>
              <div className="flex items-start justify-between gap-2">
                {[
                  { icon: SearchIcon, title: "Find a job", desc: "Choose the right vacancy" },
                  { icon: Send, title: "Apply", desc: "If there are spots, you're in" },
                  { icon: Bell, title: "Get a response", desc: "Employers will get back to you directly" },
                ].map((step, i) => (
                  <div key={step.title} className="flex-1 flex flex-col items-center text-center relative group">
                    <span className="relative h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-3 transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-hover">
                      <step.icon size={22} />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </span>
                    <p className="font-semibold text-ink-900 text-sm">{step.title}</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[110px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-center font-bold text-primary-600 mb-6">For Employers</p>
              <div className="flex items-start justify-between gap-2">
                {[
                  { icon: Plus, title: "Post a job", desc: "Create a vacancy in a few minutes" },
                  { icon: Users, title: "Receive 10 candidates", desc: "Only the first 10 can apply" },
                  { icon: CheckCircle2, title: "Choose the best", desc: "Focus on quality, not quantity" },
                ].map((step, i) => (
                  <div key={step.title} className="flex-1 flex flex-col items-center text-center relative group">
                    <span className="relative h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-3 transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-hover">
                      <step.icon size={22} />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </span>
                    <p className="font-semibold text-ink-900 text-sm">{step.title}</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[120px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl px-6 py-6 mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Only 10 candidates", desc: "Maximum per vacancy" },
              { icon: Zap, title: "Quick response", desc: "Solution in days, not weeks" },
              { icon: ShieldCheck, title: "Quality, not quantity", desc: "The best candidates for the best companies" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 rounded-xl p-2 -m-2 transition-all duration-200 hover:bg-white hover:shadow-card hover:scale-[1.02] cursor-default">
                <span className="h-11 w-11 shrink-0 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                  <f.icon size={19} />
                </span>
                <div>
                  <p className="font-semibold text-ink-900 text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer showBrands />

      <FilterModal
        open={locationModal}
        onClose={() => setLocationModal(false)}
        title="Select Location"
        searchPlaceholder="Search location..."
        options={locations.map((l) => ({ label: l }))}
        otherLabel="Other location"
        otherPlaceholder="Enter city or state..."
        currentValue={location}
        onApply={setLocation}
      />
      <FilterModal
        open={zipModal}
        onClose={() => setZipModal(false)}
        title="Select ZIP Code"
        searchPlaceholder="Search ZIP code..."
        options={["11219", "10001", "10002", "10003", "11375"].map((z) => ({ label: z }))}
        otherLabel="Enter ZIP code"
        otherPlaceholder="Enter ZIP code..."
        currentValue={zip}
        onApply={setZip}
      />
      <FilterModal
        open={industryModal}
        onClose={() => setIndustryModal(false)}
        title="Select Industry"
        searchPlaceholder="Search industry..."
        options={industries.map((i) => ({ label: i }))}
        otherPlaceholder="Enter industry..."
        currentValue={industry}
        onApply={setIndustry}
      />
    </>
  );
}
