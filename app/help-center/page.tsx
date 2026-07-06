"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  UserCircle2,
  Users,
  Briefcase,
  Settings,
  HelpCircle,
  Headphones,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { faqCategories } from "@/lib/data";

const categoryIcons: Record<string, any> = {
  general: UserCircle2,
  account: Settings,
  jobs: Briefcase,
  creators: Users,
};

const displayCategories = [
  { id: "general", label: "Getting Started" },
  { id: "creators", label: "Job Seekers" },
  { id: "jobs", label: "Employers" },
  { id: "account", label: "Account & Settings" },
  { id: "billing", label: "Billing & Payments" },
  { id: "misc", label: "General" },
];

const fallbackFaqs = [
  { q: "How do I contact support?", a: "Use the Contact Us button below or email support@sachokjob.com." },
];

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeFaqs = useMemo(() => {
    const cat = faqCategories.find((c) => c.id === activeCategory);
    const list = cat ? cat.faqs : fallbackFaqs;
    if (!search.trim()) return list;
    return list.filter(
      (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeCategory, search]);

  const activeLabel = displayCategories.find((c) => c.id === activeCategory)?.label ?? "Getting Started";

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6 text-center">
          <h1 className="text-4xl font-extrabold text-ink-900">Help Center</h1>
          <p className="text-gray-500 mt-3">Find answers to common questions</p>

          <div className="relative max-w-md mx-auto mt-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for articles..."
              className="w-full rounded-xl border border-gray-200 bg-white text-sm py-3 pl-10 pr-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-1">
            {displayCategories.map((c) => {
              const Icon = categoryIcons[c.id] ?? HelpCircle;
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCategory(c.id);
                    setOpenIndex(0);
                  }}
                  className={`w-full flex items-center gap-3 text-sm font-medium rounded-xl px-3.5 py-2.5 transition text-left ${
                    active ? "bg-primary-50 text-primary-600" : "text-ink-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={17} /> {c.label}
                </button>
              );
            })}
          </aside>

          <div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-2 sm:p-4">
              <h2 className="font-bold text-ink-900 px-3 pt-2 pb-3">{activeLabel}</h2>
              {activeFaqs.length === 0 ? (
                <p className="text-sm text-gray-400 px-3 pb-4">No articles match your search.</p>
              ) : (
                <div>
                  {activeFaqs.map((f, i) => (
                    <div key={f.q} className="border-t border-gray-100 first:border-t-0">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between gap-3 text-left px-3 py-4"
                      >
                        <span className="font-medium text-ink-900 text-sm">{f.q}</span>
                        {openIndex === i ? (
                          <ChevronUp size={16} className="text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400 shrink-0" />
                        )}
                      </button>
                      {openIndex === i && (
                        <p className="text-sm text-gray-500 px-3 pb-4 leading-relaxed">{f.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-primary-50/60 rounded-2xl p-6 mt-8 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary-600 shrink-0">
                  <Headphones size={20} />
                </span>
                <div>
                  <p className="font-bold text-ink-900">Still need help?</p>
                  <p className="text-sm text-gray-500">Can&apos;t find the answer you&apos;re looking for? Contact our support team.</p>
                </div>
              </div>
              <Button href="/contact" variant="primary" size="md">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
