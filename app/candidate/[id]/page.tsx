"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Clock,
  Calendar,
  Eye,
  CheckSquare,
  Mail,
  Globe,
  MapPin,
  Play,
  Users,
  Heart,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { FaXTwitter, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { candidates } from "@/lib/data";

const tabs = ["About", "Audience", "Content", "Reviews", "Portfolio"] as const;
type Tab = (typeof tabs)[number];

const platformIconMap: Record<string, JSX.Element> = {
  Instagram: <FaInstagram size={13} />,
  TikTok: <FaTiktok size={13} />,
  YouTube: <FaYoutube size={13} />,
  X: <FaXTwitter size={13} />,
};

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
  const candidate = candidates.find((c) => c.id === params.id) ?? candidates[0];
  const [tab, setTab] = useState<Tab>("About");
  const [saved, setSaved] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerSent, setOfferSent] = useState(false);

  const topCountries = [
    { name: "United States", pct: 35 },
    { name: "India", pct: 18 },
    { name: "United Kingdom", pct: 10 },
    { name: "Canada", pct: 7 },
    { name: "Australia", pct: 5 },
  ];
  const ageGroups = [
    { label: "13-17", pct: 8, color: "bg-pink-400" },
    { label: "18-24", pct: 28, color: "bg-purple-400" },
    { label: "25-34", pct: 42, color: "bg-primary-500" },
    { label: "35-44", pct: 16, color: "bg-sky-400" },
    { label: "45+", pct: 6, color: "bg-rose-400" },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Link
            href="/social-media-candidates"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={15} /> Back to list
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 text-center">
              <div className="relative inline-block">
                <div
                  className={`h-24 w-24 rounded-full bg-gradient-to-br ${candidate.avatarColor} flex items-center justify-center text-white text-3xl font-bold mx-auto`}
                >
                  {candidate.name.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-black border-2 border-white flex items-center justify-center text-white">
                  {platformIconMap[candidate.platform]}
                </span>
              </div>
              <p className="flex items-center justify-center gap-1.5 font-bold text-ink-900 text-lg mt-3">
                {candidate.name} <BadgeCheck size={16} className="text-primary-500" />
              </p>
              <p className="text-sm text-gray-500">{candidate.category}</p>
              <p className="text-sm text-gray-400">{candidate.handle}</p>
              <p className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1">
                <MapPin size={12} /> {candidate.location}
              </p>
              <p className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium mt-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Actively looking
              </p>

              <Button
                variant="primary"
                size="md"
                fullWidth
                className="mt-4"
                onClick={() => setOfferOpen(true)}
              >
                Make an offer
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                className="mt-2.5"
                onClick={() => setSaved((v) => !v)}
              >
                <Bookmark size={15} className={saved ? "fill-primary-600 text-primary-600" : ""} />
                {saved ? "Saved" : "Save profile"}
              </Button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5 space-y-3.5">
              {[
                { icon: TrendingUp, label: "Response rate", value: "95%" },
                { icon: Clock, label: "Response time", value: "Within a few hours" },
                { icon: Calendar, label: "Member since", value: "Jan 2023" },
                { icon: Eye, label: "Profile views", value: "1,245" },
                { icon: CheckSquare, label: "Completed deals", value: "38" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <row.icon size={15} /> {row.label}
                  </span>
                  <span className="font-semibold text-ink-900">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <p className="font-bold text-ink-900 mb-3">Social Profiles</p>
              <div className="space-y-3">
                {[
                  { icon: <FaXTwitter size={14} />, label: "X (Twitter)", value: candidate.handle },
                  { icon: <FaYoutube size={14} />, label: "YouTube", value: "/" + candidate.handle.replace("@", "") },
                  { icon: <FaInstagram size={14} />, label: "Instagram", value: candidate.handle },
                  { icon: <FaTiktok size={14} />, label: "TikTok", value: candidate.handle },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink-700">
                      {row.icon} {row.label}
                    </span>
                    <span className="text-gray-400">{row.value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/social-media-candidates"
                className="inline-block text-sm font-semibold text-primary-600 mt-3 hover:underline hover:translate-x-0.5 transition-all duration-150"
              >
                View all socials →
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div>
            <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto scrollbar-none">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                    tab === t
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-400 hover:text-ink-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "About" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6">
                    <h3 className="font-bold text-ink-900 mb-3">About {candidate.name.split(" ")[0]}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{candidate.bio}</p>
                    <div className="space-y-2.5 text-sm">
                      <p className="flex items-center gap-2 text-gray-500">
                        <Users size={14} /> Niche:
                        <span className="text-ink-800 font-medium">{candidate.category}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-500">
                        <Globe size={14} /> Language:
                        <span className="text-ink-800 font-medium">English</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-500">
                        <CheckSquare size={14} /> Content Type:
                        <span className="text-ink-800 font-medium">Reviews, Tutorials, Comparisons</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-500">
                        <Clock size={14} /> Experience:
                        <span className="text-ink-800 font-medium">5+ years</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-500">
                        <Mail size={14} /> Email:
                        <span className="text-ink-800 font-medium">
                          {candidate.handle.replace("@", "")}@mail.com
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-500">
                        <Globe size={14} /> Website:
                        <span className="text-primary-600 font-medium">
                          {candidate.handle.replace("@", "")}.com
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6">
                    <h3 className="font-bold text-ink-900 mb-3">Featured Video</h3>
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-ink-900 to-ink-700 flex items-center justify-center">
                      <button className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center text-primary-600 hover:bg-white transition">
                        <Play size={20} className="fill-primary-600" />
                      </button>
                      <span className="absolute bottom-2 right-2 text-[11px] bg-black/60 text-white rounded px-1.5 py-0.5">
                        15:42
                      </span>
                    </div>
                    <p className="font-semibold text-ink-900 text-sm mt-3">
                      Behind the scenes: {candidate.category}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">125K views · 3.2K likes · 320 comments</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { icon: Users, label: "Total Followers", value: candidate.followers, color: "bg-primary-50 text-primary-600" },
                    { icon: TrendingUp, label: "Engagement Rate", value: candidate.engagement, color: "bg-emerald-50 text-emerald-600" },
                    { icon: Eye, label: "Avg. Views", value: "250K", color: "bg-purple-50 text-purple-600" },
                    { icon: Heart, label: "Avg. Likes", value: "12K", color: "bg-pink-50 text-pink-600" },
                    { icon: MessageCircle, label: "Avg. Comments", value: "320", color: "bg-amber-50 text-amber-600" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white border border-gray-100 rounded-2xl shadow-card p-4 text-center">
                      <span className={`h-9 w-9 rounded-xl flex items-center justify-center mx-auto mb-2 ${s.color}`}>
                        <s.icon size={16} />
                      </span>
                      <p className="font-bold text-ink-900">{s.value}</p>
                      <p className="text-[11px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6">
                  <h3 className="font-bold text-ink-900 mb-5">Audience Demographics</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-ink-700 mb-3">Top Countries</p>
                      <div className="space-y-2.5">
                        {topCountries.map((c) => (
                          <div key={c.name} className="flex items-center gap-2 text-xs">
                            <span className="w-24 text-gray-500 truncate">{c.name}</span>
                            <span className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <span
                                className="h-full bg-primary-500 rounded-full block"
                                style={{ width: `${c.pct}%` }}
                              />
                            </span>
                            <span className="w-8 text-right text-ink-700 font-medium">{c.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-ink-700 mb-3">Audience by Age</p>
                      <DonutChart segments={ageGroups} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-700 mb-3 text-center">Audience by Gender</p>
                      <div className="flex items-center justify-center">
                        <DonutChart
                          segments={[
                            { label: "Male", pct: 72, color: "bg-primary-500" },
                            { label: "Female", pct: 28, color: "bg-pink-400" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "Audience" && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6">
                <h3 className="font-bold text-ink-900 mb-2">Audience Insights</h3>
                <p className="text-sm text-gray-500">
                  {candidate.name} reaches an audience of {candidate.followers} followers with an average
                  engagement rate of {candidate.engagement}. See the About tab for a full demographic breakdown.
                </p>
              </div>
            )}

            {tab === "Content" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
                    <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                      <Play size={22} className="text-primary-500" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-ink-900 truncate">
                        {candidate.category} content #{i}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{(i * 12).toFixed(0)}K views</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Reviews" && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-ink-900 text-sm">Brand Partner {i}</p>
                      <span className="text-amber-500 text-sm">★★★★★</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Great collaboration experience — professional, responsive, and delivered high quality
                      content on time.
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Portfolio" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-gray-100"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <Modal open={offerOpen} onClose={() => { setOfferOpen(false); setOfferSent(false); }} maxWidth="max-w-sm">
        <div className="p-6 text-center">
          {!offerSent ? (
            <>
              <h3 className="text-lg font-bold text-ink-900 mb-1">Make an offer</h3>
              <p className="text-sm text-gray-500 mb-5">
                Send {candidate.name} a collaboration offer. They typically respond within a few hours.
              </p>
              <textarea
                rows={4}
                placeholder="Describe your offer, budget, and timeline..."
                className="w-full rounded-xl border border-gray-200 text-sm p-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 mb-4"
              />
              <Button variant="primary" size="md" fullWidth onClick={() => setOfferSent(true)}>
                Send Offer
              </Button>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckSquare size={22} />
              </div>
              <h3 className="text-lg font-bold text-ink-900 mb-1">Offer sent!</h3>
              <p className="text-sm text-gray-500">
                {candidate.name} will review your offer and get back to you soon.
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

function DonutChart({ segments }: { segments: { label: string; pct: number; color: string }[] }) {
  const gradientParts: string[] = [];
  let acc = 0;
  const colorMap: Record<string, string> = {
    "bg-pink-400": "#f472b6",
    "bg-purple-400": "#c084fc",
    "bg-primary-500": "#2E72FA",
    "bg-sky-400": "#38bdf8",
    "bg-rose-400": "#fb7185",
  };
  segments.forEach((s) => {
    const color = colorMap[s.color] ?? "#2E72FA";
    gradientParts.push(`${color} ${acc}% ${acc + s.pct}%`);
    acc += s.pct;
  });

  return (
    <div className="flex items-center gap-4">
      <div
        className="h-24 w-24 rounded-full shrink-0"
        style={{
          background: `conic-gradient(${gradientParts.join(", ")})`,
        }}
      >
        <div className="h-full w-full rounded-full bg-white scale-[0.6] flex items-center justify-center" />
      </div>
      <div className="space-y-1.5 text-left">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${s.color}`} />
            <span className="text-gray-500">{s.label}</span>
            <span className="font-medium text-ink-800">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
