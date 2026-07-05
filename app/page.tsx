import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Users,
  Briefcase,
  Building2,
  FileText,
  Search,
  Send,
  Bell,
  Plus,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonCard from "@/components/PersonCard";
import FindJobBar from "@/components/FindJobBar";
import Carousel from "@/components/Carousel";
import EmployerCta from "@/components/EmployerCta";
import JobsGrid from "@/components/JobsGrid";
import { jobs, people } from "@/lib/data";

const stats = [
  { icon: Users, value: "12,847", label: "Invited to interview today" },
  { icon: Briefcase, value: "3,256", label: "Got a job today" },
  { icon: Building2, value: "24,531", label: "Companies on the platform" },
  { icon: FileText, value: "68,742", label: "Active job vacancies" },
];

const companies = ["Google", "Microsoft", "Amazon", "Airbnb", "Meta", "Spotify", "Booking.com", "IBM"];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden hero-glow">
        {/* decorative dot grid, matching the reference backdrop */}
        <div
          className="dot-grid-bg pointer-events-none absolute -right-10 top-0 h-[420px] w-[560px] opacity-60"
          style={{
            maskImage: "radial-gradient(closest-side, black, transparent)",
            WebkitMaskImage: "radial-gradient(closest-side, black, transparent)",
          }}
        />
        <div className="container-page relative pt-12 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="pill mb-4">
              <Star size={12} className="fill-brand" /> Only 10 candidates per job
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
              The best jobs.<br />
              <span className="text-brand">Real opportunities.</span>
            </h1>
            <p className="mt-4 text-muted max-w-md">
              Sachok Job is a service where employers receive only 10 relevant applications per job,
              and job seekers get a real chance to stand out.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn btn-primary px-6 py-3">Find a Job</button>
              <EmployerCta />
            </div>
          </div>

          <div className="relative">
            <div className="card p-6 max-w-sm ml-auto">
              <span className="pill mb-3">
                <Users size={12} /> 3 spots left
              </span>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-ink">Marketing Manager</h3>
                  <p className="text-sm text-muted flex items-center gap-1">
                    Digital Agency <CheckCircle2 size={13} className="text-brand" />
                  </p>
                </div>
                <span className="w-11 h-11 rounded-xl bg-brand text-white flex items-center justify-center">
                  <Briefcase size={18} />
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted mt-3">
                <span>Remote</span>
                <span>Full-time</span>
              </div>
              <p className="text-brand font-semibold mt-2">$1500 - $2500 / month</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="tag">Marketing</span>
                <span className="tag">SMM</span>
                <span className="tag">Analytics</span>
                <span className="tag">Strategy</span>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-muted">
                <span className="flex -space-x-2">
                  {[47, 12, 32, 8].map((n) => (
                    <Image key={n} src={`https://i.pravatar.cc/40?img=${n}`} alt="" width={26} height={26} className="rounded-full border-2 border-white object-cover" />
                  ))}
                  <span className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold">+6</span>
                </span>
                <span className="font-medium">7 / 10 candidates applied</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page pb-10">
        <div className="card p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-bold text-ink leading-tight">{value}</p>
                <p className="text-xs text-muted leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Find a job */}
      <section className="container-page pb-8">
        <h2 className="flex items-center gap-2 font-semibold text-ink mb-4">
          <Briefcase size={18} className="text-brand" /> Find a Job
        </h2>
        <FindJobBar />
      </section>

      {/* Job grid */}
      <section id="jobs" className="container-page pb-14">
        <JobsGrid initialJobs={jobs} />
      </section>

      {/* People from social media */}
      <section id="social-people" className="container-page pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 font-semibold text-ink">
            <Star size={16} className="text-pinkbrand fill-pinkbrand" /> People from Social Media
            <span className="text-muted font-normal text-sm hidden sm:inline">They are looking for a job</span>
          </h2>
          <Link href="/people" className="text-brand text-sm font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <Carousel itemClassName="w-full sm:w-[calc(50%-10px)] lg:w-[calc(20%-16px)]">
          {people.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </Carousel>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container-page pb-16 text-center">
        <h2 className="text-2xl font-bold text-ink">How it works</h2>
        <p className="text-muted mt-1">A simple process for job seekers and employers</p>

        <div className="grid md:grid-cols-2 gap-10 mt-10 text-left">
          <div id="seekers">
            <p className="text-brand font-semibold mb-6 text-center md:text-left">For Job Seekers</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Search, n: 1, title: "Find a job", desc: "Choose the right vacancy" },
                { icon: Send, n: 2, title: "Apply", desc: "If there are spots, you're in" },
                { icon: Bell, n: 3, title: "Get a response", desc: "Employers will get back to you directly" },
              ].map(({ icon: Icon, n, title, desc }) => (
                <div key={n} className="text-center">
                  <span className="relative inline-flex w-12 h-12 rounded-xl bg-brand/10 text-brand items-center justify-center mb-3">
                    <Icon size={20} />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand text-white text-[10px] flex items-center justify-center font-semibold">{n}</span>
                  </span>
                  <p className="font-medium text-sm text-ink">{title}</p>
                  <p className="text-xs text-muted mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="employers">
            <p className="text-brand font-semibold mb-6 text-center md:text-left">For Employers</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Plus, n: 1, title: "Post a job", desc: "Create a vacancy in a few minutes" },
                { icon: Users, n: 2, title: "Receive 10 candidates", desc: "Only the first 10 can apply" },
                { icon: CheckCircle2, n: 3, title: "Choose the best", desc: "Focus on quality, not quantity" },
              ].map(({ icon: Icon, n, title, desc }) => (
                <div key={n} className="text-center">
                  <span className="relative inline-flex w-12 h-12 rounded-xl bg-brand/10 text-brand items-center justify-center mb-3">
                    <Icon size={20} />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand text-white text-[10px] flex items-center justify-center font-semibold">{n}</span>
                  </span>
                  <p className="font-medium text-sm text-ink">{title}</p>
                  <p className="text-xs text-muted mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="container-page pb-14">
        <div className="card p-6 grid sm:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Only 10 candidates", desc: "Maximum per vacancy" },
            { icon: Zap, title: "Quick response", desc: "Solution in days, not weeks" },
            { icon: ShieldCheck, title: "Quality, not quantity", desc: "The best candidates for the best companies" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-semibold text-ink text-sm">{title}</p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Companies */}
      <section className="container-page pb-16 text-center">
        <h3 className="font-semibold text-muted mb-6">Companies that trust us</h3>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ink/60 font-semibold text-lg">
          {companies.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
