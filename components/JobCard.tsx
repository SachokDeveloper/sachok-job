"use client";

import { useState } from "react";
import { Users, Briefcase, MapPin, Clock } from "lucide-react";
import { Job } from "@/lib/data";

const avatarSeeds = [23, 44, 15, 8];

export function JobCard({ job }: { job: Job }) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-card p-5 h-full transition-all duration-200 hover:shadow-soft hover:-translate-y-1.5 hover:border-primary-100">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full px-2.5 py-1">
          <Users size={12} />3 spots left
        </span>
        <span className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
          <Briefcase size={16} />
        </span>
      </div>

      <h3 className="font-bold text-ink-900 text-[15px] leading-snug">{job.title}</h3>
      <p className="flex items-center gap-1 text-sm text-ink-700 mt-1">
        {job.company}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary-500">
          <path d="M12 2 15 5 20 4 19 9 22 12 19 15 20 20 15 19 12 22 9 19 4 20 5 15 2 12 5 9 4 4 9 5Z" fill="currentColor" />
          <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>

      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> Remote
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} /> {job.type}
        </span>
      </div>

      <p className="text-primary-600 font-semibold text-sm mt-2.5">{job.salary} / month</p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {job.tags.slice(0, 2).map((t) => (
          <span key={t} className="text-xs font-medium bg-gray-100 text-ink-700 rounded-full px-2.5 py-1">
            {t}
          </span>
        ))}
        {job.tags.length > 2 && (
          <span className="text-xs font-medium bg-gray-100 text-ink-700 rounded-full px-2.5 py-1">
            +{job.tags.length - 2}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3.5">
        <span className="flex -space-x-2">
          {avatarSeeds.map((s) => (
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

      <button
        onClick={() => setApplied(true)}
        disabled={applied}
        className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
          applied
            ? "bg-emerald-50 text-emerald-600 cursor-default animate-pulse-once"
            : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-hover hover:scale-[1.02] active:scale-[0.97]"
        }`}
      >
        {applied ? "Applied ✓" : "Apply"}
      </button>
    </div>
  );
}
