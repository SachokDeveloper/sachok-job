"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { FaTiktok, FaInstagram, FaFacebookF, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const socialIcons = [
  { Icon: FaTiktok, label: "TikTok" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaYoutube, label: "YouTube" },
  { Icon: FaXTwitter, label: "X" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
];

const brands = ["Google", "Microsoft", "Amazon", "airbnb", "Meta", "Spotify", "Booking.com", "IBM"];

export function Footer({ showBrands = false }: { showBrands?: boolean }) {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {showBrands && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-100">
          <p className="text-center font-bold text-ink-900 mb-8">Companies that trust us</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400 font-semibold text-lg">
            {brands.map((b) => (
              <span key={b} className="opacity-70">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-ink-900 mb-4">For Employers</h4>
            <ul className="space-y-3 text-sm text-ink-700">
              <li>
                <Link href="/social-media-candidates" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link href="/register?type=employer" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink-900 mb-4">For Job Seekers</h4>
            <ul className="space-y-3 text-sm text-ink-700">
              <li>
                <Link href="/" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Find a Job
                </Link>
              </li>
              <li>
                <Link href="/social-media-candidates" className="text-pink-500 font-medium hover:text-pink-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  People from Social Media
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink-900 mb-4">About</h4>
            <ul className="space-y-3 text-sm text-ink-700">
              <li>
                <Link href="/help-center" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms-privacy" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms-privacy" className="hover:text-primary-600 hover:translate-x-0.5 inline-block transition-all duration-150">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1 flex sm:justify-end sm:items-start">
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className={`flex items-center gap-2 text-sm text-ink-800 border rounded-lg px-3 py-2 hover:bg-gray-50 transition-all duration-150 ${
                  langOpen ? "border-primary-400 ring-2 ring-primary-100 bg-primary-50/40" : "border-gray-200"
                }`}
              >
                <Globe size={16} />
                English (US)
                <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-popover py-2 z-10 animate-drop-in origin-top-right">
                  {["English (US)", "Español", "Français", "Deutsch"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLangOpen(false)}
                      className="w-full text-left text-sm px-3 py-1.5 text-ink-700 hover:bg-primary-50/70 hover:pl-4 transition-all duration-150"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400">© 2026 Sachok Job. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            {socialIcons.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 text-ink-800 hover:bg-primary-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
