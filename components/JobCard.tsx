import Image from "next/image";
import { BadgeCheck, Briefcase, MapPin, Clock3, Users } from "lucide-react";
import { Job } from "@/types";

const applicantAvatars = [
  "https://i.pravatar.cc/40?img=5",
  "https://i.pravatar.cc/40?img=15",
  "https://i.pravatar.cc/40?img=25",
  "https://i.pravatar.cc/40?img=35",
];

export default function JobCard({
  job,
  onApply,
  disabled = false,
}: {
  job: Job;
  onApply?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <span className="pill">
          <Users size={12} /> {job.spotsLeft} spots left
        </span>
        <span className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
          <Briefcase size={16} />
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-ink text-base flex items-center gap-1">
          {job.title}
        </h3>
        <p className="text-sm text-muted flex items-center gap-1">
          {job.company}
          <BadgeCheck size={14} className="text-brand" />
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1"><MapPin size={13} /> {job.remote ? "Remote" : "On-site"}</span>
        <span className="flex items-center gap-1"><Clock3 size={13} /> {job.employment}</span>
      </div>

      <p className="text-brand font-semibold text-sm">{job.salary}</p>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.slice(0, 2).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
        {job.tags.length > 2 && <span className="tag">+{job.tags.length - 2}</span>}
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span className="flex -space-x-2">
          {applicantAvatars.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={24}
              height={24}
              className="rounded-full border-2 border-white object-cover"
            />
          ))}
          <span className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-ink/70">
            +6
          </span>
        </span>
        <span className="font-medium">{job.applied} / {job.totalSlots} candidates applied</span>
      </div>

      <button
        type="button"
        onClick={onApply}
        disabled={disabled}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? "Limit reached" : "Apply"}
      </button>
    </div>
  );
}
