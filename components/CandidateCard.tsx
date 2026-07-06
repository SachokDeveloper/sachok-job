"use client";

import Link from "next/link";
import { BadgeCheck, Instagram, Youtube, MapPin } from "lucide-react";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Candidate } from "@/lib/data";

const platformIcon: Record<Candidate["platform"], JSX.Element> = {
  Instagram: <Instagram size={12} className="text-white" />,
  TikTok: <FaTiktok size={11} className="text-white" />,
  YouTube: <Youtube size={12} className="text-white" />,
  X: <FaXTwitter size={11} className="text-white" />,
};

const platformBg: Record<Candidate["platform"], string> = {
  Instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
  TikTok: "bg-black",
  YouTube: "bg-red-600",
  X: "bg-black",
};

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-card p-5 h-full transition-all duration-200 hover:shadow-soft hover:-translate-y-1.5 hover:border-primary-100">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <div
            className={`h-14 w-14 rounded-full bg-gradient-to-br ${candidate.avatarColor} flex items-center justify-center text-white font-bold text-lg`}
          >
            {candidate.name.charAt(0)}
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-2 border-white flex items-center justify-center ${platformBg[candidate.platform]}`}
          >
            {platformIcon[candidate.platform]}
          </span>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-bold text-ink-900 text-[15px] truncate">
            {candidate.name}
            <BadgeCheck size={15} className="text-primary-500 shrink-0" />
          </p>
          <p className="text-sm text-ink-600 truncate">{candidate.category}</p>
          <p className="text-xs text-gray-400 truncate">{candidate.handle}</p>
          <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <MapPin size={11} /> {candidate.location}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-ink-700 mb-1.5">Skills:</p>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs font-medium bg-gray-100 text-ink-700 rounded-full px-2.5 py-1">
            {candidate.category.split(" ")[0]}
          </span>
          <span className="text-xs font-medium bg-gray-100 text-ink-700 rounded-full px-2.5 py-1">
            {candidate.platform}
          </span>
          <span className="text-xs font-medium bg-gray-100 text-ink-700 rounded-full px-2.5 py-1">
            +2
          </span>
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Actively looking
      </p>

      <Link
        href={`/candidate/${candidate.id}`}
        className="mt-auto w-full text-center rounded-xl py-2.5 text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 hover:shadow-hover hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
      >
        Make an offer
      </Link>
    </div>
  );
}
