"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BadgeCheck, MapPin } from "lucide-react";
import { Person } from "@/types";
import PlatformIcon from "./PlatformIcon";

function avatarFor(id: string) {
  // Deterministic pravatar avatar based on person id
  const seed = Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://i.pravatar.cc/200?img=${(seed % 70) + 1}`;
}

export default function PersonCard({ person }: { person: Person }) {
  const router = useRouter();

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Image
            src={avatarFor(person.id)}
            alt={person.name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
          <span className="absolute -bottom-1 -right-1">
            <PlatformIcon platform={person.platform} size={13} />
          </span>
        </div>
        <div>
          <p className="font-semibold text-ink flex items-center gap-1">
            {person.name}
            <BadgeCheck size={14} className="text-brand" />
          </p>
          <p className="text-xs text-muted">{person.role}</p>
          <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
            <MapPin size={11} /> {person.location}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-ink/70 mb-1">Skills:</p>
        <div className="flex flex-wrap gap-1.5">
          {person.skills.slice(0, 3).map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
          {person.skills.length > 3 && <span className="tag">+{person.skills.length - 3}</span>}
        </div>
      </div>

      {person.activelyLooking && (
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Actively looking
        </span>
      )}

      <button
        onClick={() => router.push(`/profile/${person.id}`)}
        className="btn btn-primary w-full"
      >
        Make an offer
      </button>
    </div>
  );
}
