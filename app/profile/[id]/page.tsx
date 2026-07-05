"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Play,
  Users,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Globe,
  Mail,
  ExternalLink,
} from "lucide-react";
import { getPersonById } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlatformIcon from "@/components/PlatformIcon";

const TABS = ["About", "Audience", "Content", "Reviews", "Portfolio"] as const;

function avatarFor(id: string) {
  const seed = Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://i.pravatar.cc/240?img=${(seed % 70) + 1}`;
}

function DonutChart({ slices }: { slices: { label: string; pct: number; color: string }[] }) {
  let acc = 0;
  const stops = slices
    .map((s) => {
      const start = acc;
      acc += s.pct;
      return `${s.color} ${start}% ${acc}%`;
    })
    .join(", ");
  return (
    <div className="w-28 h-28 rounded-full relative" style={{ background: `conic-gradient(${stops})` }}>
      <div className="absolute inset-3 rounded-full bg-white" />
    </div>
  );
}

function GenderDonut({ male, female }: { male: number; female: number }) {
  return (
    <div
      className="w-28 h-28 rounded-full relative"
      style={{ background: `conic-gradient(#2563EB 0% ${male}%, #EC4899 ${male}% 100%)` }}
    >
      <div className="absolute inset-3 rounded-full bg-white" />
    </div>
  );
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const person = getPersonById(params.id);
  const [tab, setTab] = useState<(typeof TABS)[number]>("About");

  if (!person) return notFound();

  return (
    <>
      <Header />

      <section className="container-page py-10">
        <Link href="/people" className="inline-flex items-center gap-1.5 text-sm text-brand font-medium hover:underline mb-6">
          <ArrowLeft size={16} /> Back to list
        </Link>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={avatarFor(person.id)}
                  alt={person.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover"
                />
                <span className="absolute -bottom-1 -right-1">
                  <PlatformIcon platform={person.platform} size={14} />
                </span>
              </div>
              <div>
                <p className="font-bold text-ink flex items-center gap-1">
                  {person.name}
                  <BadgeCheck size={15} className="text-brand" />
                </p>
                <p className="text-sm text-muted">{person.role}</p>
                <p className="text-sm text-muted">{person.handle}</p>
                <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                  <MapPin size={11} /> {person.location}
                </p>
              </div>
            </div>

            {person.activelyLooking && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Actively looking
              </span>
            )}

            <button className="btn btn-primary w-full mt-4">Make an offer</button>
            <button className="btn btn-ghost w-full mt-2">Save profile</button>

            <div className="card p-4 mt-5 text-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted">Response rate</span>
                <span className="font-medium">{person.responseRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Response time</span>
                <span className="font-medium">{person.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Member since</span>
                <span className="font-medium">{person.memberSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Profile views</span>
                <span className="font-medium">{person.profileViews}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Completed deals</span>
                <span className="font-medium">{person.completedDeals}</span>
              </div>
            </div>

            <div className="card p-4 mt-5 text-sm">
              <p className="font-semibold text-ink mb-3">Social Profiles</p>
              <ul className="space-y-2">
                {person.socials.map((s) => (
                  <li key={s.platform} className="flex items-center justify-between text-muted">
                    <span>{s.platform}</span>
                    <span className="font-medium text-ink/80">{s.handle}</span>
                  </li>
                ))}
              </ul>
              <button className="text-brand text-sm font-medium mt-3 flex items-center gap-1 hover:underline">
                View all socials <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="flex gap-6 border-b border-line text-sm font-medium">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 -mb-px border-b-2 transition-colors ${
                    tab === t ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "About" && (
              <div className="pt-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="card p-5">
                    <p className="font-semibold text-ink mb-2">About {person.name.split(" ")[0]}</p>
                    <p className="text-sm text-muted leading-relaxed">{person.about}</p>
                    <ul className="text-sm mt-4 space-y-2">
                      <li className="flex justify-between"><span className="text-muted">Niche</span><span className="font-medium">{person.niche}</span></li>
                      <li className="flex justify-between"><span className="text-muted">Language</span><span className="font-medium">{person.language}</span></li>
                      <li className="flex justify-between"><span className="text-muted">Content Type</span><span className="font-medium text-right">{person.contentType}</span></li>
                      <li className="flex justify-between"><span className="text-muted">Experience</span><span className="font-medium">{person.experience}</span></li>
                      <li className="flex justify-between items-center"><span className="text-muted flex items-center gap-1"><Mail size={13}/>Email</span><span className="font-medium">{person.email}</span></li>
                      <li className="flex justify-between items-center"><span className="text-muted flex items-center gap-1"><Globe size={13}/>Website</span><a href={person.website} className="font-medium text-brand hover:underline">{person.website.replace("https://", "")}</a></li>
                    </ul>
                  </div>

                  <div className="card p-5">
                    <p className="font-semibold text-ink mb-3">Featured Video</p>
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-ink flex items-center justify-center">
                      <Image
                        src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=60"
                        alt="Featured video thumbnail"
                        fill
                        className="object-cover opacity-70"
                      />
                      <span className="relative z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play size={20} className="text-ink fill-ink" />
                      </span>
                    </div>
                    <p className="font-medium text-sm mt-3">{person.featuredVideo.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {person.featuredVideo.views} views · {person.featuredVideo.likes} likes · {person.featuredVideo.comments} comments
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-5">
                  {[
                    { icon: Users, label: "Total Followers", value: person.totalFollowers, tint: "bg-blue-50 text-brand" },
                    { icon: TrendingUp, label: "Engagement Rate", value: person.engagementRate, tint: "bg-emerald-50 text-emerald-600" },
                    { icon: Eye, label: "Avg. Views", value: person.avgViews, tint: "bg-violet-50 text-violet-600" },
                    { icon: Heart, label: "Avg. Likes", value: person.avgLikes, tint: "bg-rose-50 text-rose-600" },
                    { icon: MessageCircle, label: "Avg. Comments", value: person.avgComments, tint: "bg-amber-50 text-amber-600" },
                  ].map(({ icon: Icon, label, value, tint }) => (
                    <div key={label} className="card p-4 text-center">
                      <span className={`inline-flex w-8 h-8 rounded-lg items-center justify-center mb-2 ${tint}`}>
                        <Icon size={15} />
                      </span>
                      <p className="font-bold text-ink text-sm">{value}</p>
                      <p className="text-xs text-muted">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="card p-5 mt-5">
                  <p className="font-semibold text-ink mb-4">Audience Demographics</p>
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <p className="text-sm font-medium text-ink/80 mb-3">Top Countries</p>
                      <ul className="space-y-2">
                        {person.topCountries.map((c) => (
                          <li key={c.name} className="text-xs">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted">{c.name}</span>
                              <span className="font-medium">{c.pct}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-100">
                              <div className="h-1.5 rounded-full bg-brand" style={{ width: `${c.pct * 2}%` }} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-ink/80 mb-3">Audience by Age</p>
                      <DonutChart slices={person.audienceAge} />
                      <ul className="text-xs mt-3 space-y-1 self-start">
                        {person.audienceAge.map((a) => (
                          <li key={a.label} className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                            {a.label} — {a.pct}%
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium text-ink/80 mb-3">Audience by Gender</p>
                      <GenderDonut male={person.audienceGender.male} female={person.audienceGender.female} />
                      <ul className="text-xs mt-3 space-y-1 self-start">
                        <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand" /> Male — {person.audienceGender.male}%</li>
                        <li className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pinkbrand" /> Female — {person.audienceGender.female}%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab !== "About" && (
              <div className="pt-10 pb-16 text-center text-muted text-sm">
                {tab} content coming soon.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
