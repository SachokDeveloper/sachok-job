import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import Logo from "./Logo";

const avatars = [
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-line">
      <div className="container-page flex items-center justify-between h-[72px] gap-6">
        <Link href="/" className="shrink-0">
          <Logo size={36} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink/80">
          <Link href="/#employers" className="hover:text-brand">For Employers</Link>
          <Link href="/#seekers" className="hover:text-brand">For Job Seekers</Link>
          <Link href="/#how-it-works" className="hover:text-brand">How It Works</Link>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <Link
            href="/people"
            className="hidden md:flex items-center gap-2 rounded-xl border border-pinkbrand/30 bg-pink-50 px-3 py-1.5 hover:bg-pink-100 transition-colors"
          >
            <Star size={14} className="text-pinkbrand fill-pinkbrand" />
            <span className="text-xs font-semibold text-pinkbrand leading-tight">
              People from<br />Social Media
            </span>
            <span className="flex items-center -space-x-2 ml-1">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={22}
                  height={22}
                  className="rounded-full border-2 border-white object-cover"
                />
              ))}
            </span>
          </Link>
          <button className="btn btn-ghost">Log in</button>
          <button className="btn btn-primary">Create Account</button>
        </div>
      </div>
    </header>
  );
}
