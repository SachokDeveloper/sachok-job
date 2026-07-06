"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Search, Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-slate-25 flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Find jobs, candidates..."
            className="w-full rounded-xl border border-gray-200 bg-white text-sm py-2.5 pl-10 pr-3.5 outline-none"
            disabled
          />
        </div>
        <Button href="/register?type=jobseeker" variant="primary" size="md">
          Create Account
        </Button>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pt-6">
        <div className="w-full max-w-md">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft size={13} /> BACK TO LOGIN
          </Link>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 text-center">
            <span className="h-14 w-14 rounded-full border-2 border-primary-200 flex items-center justify-center text-primary-600 mx-auto mb-5">
              <Lock size={22} />
            </span>
            <h1 className="text-xl font-bold text-ink-900 mb-1.5">Reset Your Password</h1>
            <p className="text-sm text-gray-500 mb-6">Enter your email and we&apos;ll send you instructions</p>

            {sent ? (
              <div className="text-left">
                <p className="text-sm text-emerald-600 bg-emerald-50 rounded-xl p-3.5 mb-4">
                  If an account exists for {email || "that email"}, we&apos;ve sent password reset instructions.
                </p>
                <Link href="/login" className="text-sm font-semibold text-primary-600 hover:underline">
                  Back to login
                </Link>
              </div>
            ) : (
              <form
                className="text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Input
                  label="Email"
                  icon={<Mail size={16} />}
                  type="email"
                  placeholder="john.doe@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" size="lg" fullWidth className="mt-5">
                  Send Reset Link
                </Button>
                <div className="text-center mt-4">
                  <Link href="/login" className="text-sm font-semibold text-primary-600 hover:underline">
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 mt-10 border-t border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-ink-900 mb-3 text-sm">For Employers</h4>
            <ul className="space-y-2 text-sm text-ink-700">
              <li><Link href="/social-media-candidates" className="hover:text-primary-600">Find Candidates</Link></li>
              <li><Link href="/register?type=employer" className="hover:text-primary-600">Post a Job</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink-900 mb-3 text-sm">For Job Seekers</h4>
            <ul className="space-y-2 text-sm text-ink-700">
              <li><Link href="/" className="hover:text-primary-600">Find a Job</Link></li>
              <li><Link href="/social-media-candidates" className="text-pink-500 font-medium hover:text-pink-600">People from Social Media</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-ink-900 mb-3 text-sm">About</h4>
            <ul className="space-y-2 text-sm text-ink-700">
              <li><Link href="/help-center" className="hover:text-primary-600">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-600">Contact</Link></li>
              <li><Link href="/help-center" className="hover:text-primary-600">Help Center</Link></li>
              <li><Link href="/terms-privacy" className="hover:text-primary-600">Terms of Service</Link></li>
              <li><Link href="/terms-privacy" className="hover:text-primary-600">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
