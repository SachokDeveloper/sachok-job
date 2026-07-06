"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Star, Menu, X } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";

const socialAvatars = [
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink-800">
          <Link
            href="/register?type=employer"
            className="relative hover:text-primary-600 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-200 hover:after:w-full"
          >
            For Employers
          </Link>
          <Link
            href="/register?type=jobseeker"
            className="relative hover:text-primary-600 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-200 hover:after:w-full"
          >
            For Job Seekers
          </Link>
          <Link
            href="/#how-it-works"
            className="relative hover:text-primary-600 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-200 hover:after:w-full"
          >
            How It Works
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <Link
            href="/social-media-candidates"
            className="flex items-center gap-2 rounded-xl border border-pink-200 bg-pink-50/60 px-3 py-1.5 hover:bg-pink-50 hover:shadow-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Star size={16} className="text-pink-500 fill-pink-500" />
            <span className="text-left leading-tight">
              <span className="block text-xs font-semibold text-pink-600">People from</span>
              <span className="block text-xs font-semibold text-pink-600">Social Media</span>
            </span>
            <ChevronRight size={14} className="text-pink-400" />
            <span className="flex -space-x-2 ml-1">
              {socialAvatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-6 w-6 rounded-full border-2 border-white object-cover"
                />
              ))}
              <span className="h-6 w-6 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-pink-600">
                +17
              </span>
            </span>
          </Link>

          <Button href="/login" variant="outline" size="md">
            Log in
          </Button>
          <Button href="/register?type=jobseeker" variant="primary" size="md">
            Create Account
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-ink-800 rounded-lg hover:bg-gray-100 active:scale-90 transition-all duration-150"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 animate-drop-in origin-top">
          <Link
            href="/register?type=employer"
            className="block text-sm font-medium text-ink-800 hover:text-primary-600 hover:translate-x-1 transition-all duration-150"
          >
            For Employers
          </Link>
          <Link
            href="/register?type=jobseeker"
            className="block text-sm font-medium text-ink-800 hover:text-primary-600 hover:translate-x-1 transition-all duration-150"
          >
            For Job Seekers
          </Link>
          <Link
            href="/#how-it-works"
            className="block text-sm font-medium text-ink-800 hover:text-primary-600 hover:translate-x-1 transition-all duration-150"
          >
            How It Works
          </Link>
          <Link
            href="/social-media-candidates"
            className="block text-sm font-medium text-pink-600 hover:translate-x-1 transition-all duration-150"
          >
            People from Social Media
          </Link>
          <div className="flex gap-3 pt-2">
            <Button href="/login" variant="outline" size="md" fullWidth>
              Log in
            </Button>
            <Button href="/register?type=jobseeker" variant="primary" size="md" fullWidth>
              Create Account
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
