"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout heading="Welcome back" subheading="Log in to continue to Sachok Job.">
      <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-soft p-6 sm:p-8">
        <button className="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-ink-800 hover:bg-gray-50 transition mb-5">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.8 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4.5 24 4.5 12.9 4.5 4 13.4 4 24.5s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-4Z"/>
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 12.5 24 12.5c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.5 29.6 4.5 24 4.5c-7.7 0-14.4 4.4-17.7 10.2Z"/>
            <path fill="#4CAF50" d="M24 44.5c5.5 0 10.4-1.8 14.3-5l-6.6-5.6C29.6 35.5 26.9 36.5 24 36.5c-5.3 0-9.8-3.4-11.3-8.1l-6.6 5.1C9.5 40 16.2 44.5 24 44.5Z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.3-5.6 6.9l6.6 5.6C40.2 37.5 44 31.9 44 24.5c0-1.3-.1-2.6-.4-4Z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <span className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or</span>
          <span className="flex-1 h-px bg-gray-100" />
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email address" icon={<Mail size={16} />} type="email" placeholder="Enter your email" />
          <Input
            label="Password"
            icon={<Lock size={16} />}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            rightElement={
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500">
              <input type="checkbox" className="h-4 w-4 accent-primary-600" />
              Remember me
            </label>
            <Link href="/forgot-password" className="font-semibold text-primary-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Log in
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register?type=jobseeker" className="font-semibold text-primary-600 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
