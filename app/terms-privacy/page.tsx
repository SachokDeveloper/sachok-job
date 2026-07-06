"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TermsCard } from "@/components/TermsCard";
import { DocumentViewer } from "@/components/DocumentViewer";

export default function TermsPrivacyPage() {
  const [tab, setTab] = useState<"jobseeker" | "employer">("jobseeker");
  const [viewer, setViewer] = useState<{ title: string } | null>(null);

  const cards =
    tab === "jobseeker"
      ? [
          {
            title: "Terms of Service\nFor Job Seekers",
            description: "Read the terms and conditions for using Sachok Job as a job seeker.",
          },
          {
            title: "Privacy Policy\nFor Job Seekers",
            description: "Learn how we collect, use, and protect your personal information.",
          },
        ]
      : [
          {
            title: "Terms of Service\nFor Companies",
            description: "Read the terms and conditions for using Sachok Job as an employer.",
          },
          {
            title: "Privacy Policy\nFor Companies",
            description: "Learn how we collect, use, and protect company and candidate data.",
          },
        ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 text-center">
          <h1 className="text-4xl font-extrabold text-ink-900">Terms & Privacy Pages</h1>
          <p className="text-gray-500 mt-3">View important policies and terms related to using Sachok Job.</p>

          <div className="inline-flex bg-gray-100 rounded-xl p-1 mt-6">
            <button
              onClick={() => setTab("jobseeker")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${
                tab === "jobseeker" ? "bg-primary-600 text-white shadow-sm" : "text-ink-700"
              }`}
            >
              I&apos;m a Job Seeker
            </button>
            <button
              onClick={() => setTab("employer")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${
                tab === "employer" ? "bg-primary-600 text-white shadow-sm" : "text-ink-700"
              }`}
            >
              I&apos;m an Employer
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <TermsCard
              key={c.title}
              title={c.title}
              description={c.description}
              onView={() => setViewer({ title: c.title.split("\n")[0] })}
            />
          ))}
        </div>
      </main>
      <Footer />

      <DocumentViewer
        open={!!viewer}
        onClose={() => setViewer(null)}
        title={viewer?.title ?? "Terms of Service"}
        effectiveDate="May 20, 2024"
      />
    </>
  );
}
