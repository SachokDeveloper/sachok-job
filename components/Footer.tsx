import Link from "next/link";
import { Music2, Instagram, Facebook, Youtube, Twitter, Linkedin, Globe } from "lucide-react";

const socials = [
  { icon: Music2, href: "#", label: "TikTok" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "X" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-ink mb-3">For Employers</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/#" className="hover:text-brand">Find Candidates</Link></li>
              <li><Link href="/#" className="hover:text-brand">Post a Job</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ink mb-3">For Job Seekers</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/#" className="hover:text-brand">Find a Job</Link></li>
              <li><Link href="/people" className="text-pinkbrand font-medium hover:underline">People from Social Media</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ink mb-3">About</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/#" className="hover:text-brand">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
              <li><Link href="/help-center" className="hover:text-brand">Help Center</Link></li>
              <li><Link href="/terms-privacy" className="hover:text-brand">Terms of Service</Link></li>
              <li><Link href="/terms-privacy" className="hover:text-brand">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <button className="flex items-center gap-2 text-sm text-ink/70 border border-line rounded-lg px-3 py-1.5">
              <Globe size={16} /> English (US)
            </button>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-ink/70 hover:bg-brand hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-line text-xs text-muted">
          © 2026 Sachok Job. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
