"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPrivacyPage() {
  const [audience, setAudience] = useState<"seeker" | "employer">("seeker");

  const cards = [
    {
      title: "Terms of Service",
      subtitle: audience === "seeker" ? "For Job Seekers" : "For Employers",
      desc:
        audience === "seeker"
          ? "Read the terms and conditions for using Sachok Job as a job seeker."
          : "Read the terms and conditions for using Sachok Job as an employer.",
    },
    {
      title: "Privacy Policy",
      subtitle: audience === "seeker" ? "For Job Seekers" : "For Employers",
      desc:
        audience === "seeker"
          ? "Learn how we collect, use, and protect your personal information."
          : "Learn how we collect, use, and protect your company's information.",
    },
  ];

  return (
    <>
      <Header />
      <section className="container-page py-14 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink">Terms &amp; Privacy Pages</h1>
          <p className="text-muted mt-2">View important policies and terms related to using Sachok Job.</p>

          <div className="inline-flex bg-slate-100 rounded-xl p-1 mt-6">
            <button
              onClick={() => setAudience("seeker")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                audience === "seeker" ? "bg-brand text-white" : "text-ink/70"
              }`}
            >
              I&apos;m a Job Seeker
            </button>
            <button
              onClick={() => setAudience("employer")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                audience === "employer" ? "bg-brand text-white" : "text-ink/70"
              }`}
            >
              I&apos;m an Employer
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="card p-8 text-center flex flex-col items-center">
              <span className="w-14 h-14 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                <FileText size={24} />
              </span>
              <h2 className="text-lg font-bold text-ink">{c.title}</h2>
              <p className="text-sm font-medium text-muted">{c.subtitle}</p>
              <p className="text-sm text-muted mt-3 mb-6">{c.desc}</p>
              <button className="btn btn-primary w-full">
                <FileText size={15} /> View Document
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
