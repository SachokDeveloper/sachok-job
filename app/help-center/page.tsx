"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  UserSquare2,
  Users,
  Briefcase,
  ClipboardList,
  Settings,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Headphones,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { icon: UserSquare2, label: "Getting Started" },
  { icon: Users, label: "Job Seekers" },
  { icon: Briefcase, label: "Employers" },
  { icon: ClipboardList, label: "Applications" },
  { icon: Settings, label: "Account & Settings" },
  { icon: CreditCard, label: "Billing & Payments" },
  { icon: HelpCircle, label: "General" },
];

const faqs = [
  {
    q: "What is Sachok Job?",
    a: "Sachok Job is a platform that connects employers with skilled professionals and job seekers with opportunities. Employers can post jobs and find the right candidates, while job seekers can discover tailored job listings and grow their careers.",
  },
  { q: "How does Sachok Job work?", a: "Employers post a job and receive up to 10 candidate applications. Job seekers browse open roles and apply directly, so every application gets real attention." },
  { q: "Is Sachok Job free to use?", a: "Creating an account and browsing jobs is free for job seekers. Employers can post a limited number of jobs for free, with paid plans for higher volume." },
  { q: "How do I create an account?", a: "Click Create Account in the top right corner, choose whether you're a job seeker or employer, and follow the on-screen steps." },
  { q: "How do I reset my password?", a: "Go to the login page and select Forgot password to receive a reset link by email." },
  { q: "How do I update my profile?", a: "Open your account settings from your profile menu and edit any section, then save your changes." },
  { q: "How do I upload my resume?", a: "From your job seeker dashboard, go to Profile → Resume and upload a PDF or Word document." },
  { q: "How do I change my email?", a: "Go to Account & Settings, update your email address, and confirm the change via the verification link we send you." },
  { q: "How do I delete my account?", a: "Go to Account & Settings → Delete Account. This action is permanent and removes all your data." },
];

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Header />
      <section className="container-page py-14 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink">Help Center</h1>
          <p className="text-muted mt-2">Find answers to common questions</p>
          <div className="flex items-center gap-2 border border-line rounded-xl px-4 py-3 max-w-md mx-auto mt-5 bg-white">
            <Search size={16} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for articles..."
              className="outline-none text-sm w-full placeholder:text-muted"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <nav className="space-y-1">
            {categories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`w-full flex items-center gap-2 text-sm rounded-lg px-3 py-2.5 text-left ${
                  activeCategory === label ? "bg-brand/10 text-brand font-medium" : "text-ink/70 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </nav>

          <div className="card p-2">
            <p className="font-semibold text-ink px-4 pt-4 pb-2">{activeCategory}</p>
            {filtered.map((f, i) => (
              <div key={f.q} className="border-t border-line first:border-t-0">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left text-sm font-medium text-ink"
                >
                  {f.q}
                  {openIndex === i ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </button>
                {openIndex === i && (
                  <p className="px-4 pb-4 text-sm text-muted leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-sm text-muted">No articles match your search.</p>
            )}
          </div>
        </div>

        <div className="card p-6 mt-8 flex items-center justify-between flex-wrap gap-4 bg-brand/5">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-white text-brand flex items-center justify-center">
              <Headphones size={20} />
            </span>
            <div>
              <p className="font-semibold text-ink">Still need help?</p>
              <p className="text-sm text-muted">Can&apos;t find the answer you&apos;re looking for? Contact our support team.</p>
            </div>
          </div>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
