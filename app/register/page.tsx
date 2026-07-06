"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2, FileCheck2, Sparkles, Rocket, ShieldCheck, Zap, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = searchParams.get("type") === "employer" ? "employer" : "jobseeker";
  const [type, setType] = useState<"jobseeker" | "employer">(initialType);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const isEmployer = type === "employer";

  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains an uppercase letter", ok: /[A-Z]/.test(password) },
  ];

  const perks = isEmployer
    ? [
        { icon: Building2, title: "Find the right talent", desc: "Only 10 candidates per job. Save time and hire better." },
        { icon: FileCheck2, title: "Trusted by companies", desc: "Join thousands of companies that are hiring on Sachok Job." },
        { icon: Rocket, title: "Easy hiring process", desc: "Post a job in minutes and start receiving qualified candidates." },
      ]
    : [
        { icon: Sparkles, title: "Only 10 candidates per job", desc: "More chances to get noticed by employers." },
        { icon: ShieldCheck, title: "Real opportunities", desc: "Connect with verified companies actively hiring." },
        { icon: Zap, title: "Fast & easy", desc: "Quick apply and get interview invites." },
      ];

  return (
    <AuthLayout
      heading={isEmployer ? "Create your company account" : "Create your account"}
      subheading={
        isEmployer
          ? "Post jobs, find the best talent and grow your team."
          : "Join Sachok Job and find real opportunities."
      }
    >
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => {
              setType("jobseeker");
              router.replace("/register?type=jobseeker", { scroll: false });
            }}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${
              !isEmployer ? "bg-primary-600 text-white shadow-sm" : "text-ink-700"
            }`}
          >
            I&apos;m a Job Seeker
          </button>
          <button
            onClick={() => {
              setType("employer");
              router.replace("/register?type=employer", { scroll: false });
            }}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${
              isEmployer ? "bg-primary-600 text-white shadow-sm" : "text-ink-700"
            }`}
          >
            I&apos;m an Employer
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
        <div className="space-y-8 order-2 lg:order-1">
          {perks.map((p) => (
            <div key={p.title} className="flex items-start gap-4">
              <span className="h-12 w-12 shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                <p.icon size={20} />
              </span>
              <div>
                <p className="font-bold text-ink-900">{p.title}</p>
                <p className="text-sm text-gray-500 mt-0.5 max-w-xs">{p.desc}</p>
              </div>
            </div>
          ))}

          <div className="pt-4 hidden md:block">
            <div className="relative h-56 w-full max-w-xs rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-white shadow-soft flex items-center justify-center">
                {isEmployer ? (
                  <Building2 size={36} className="text-primary-500" />
                ) : (
                  <User size={36} className="text-primary-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-soft p-6 sm:p-8 order-1 lg:order-2">
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

          <div className="space-y-4">
            {isEmployer ? (
              <Input label="Company name" icon={<Building2 size={16} />} placeholder="Enter company name" />
            ) : (
              <Input label="Full name" icon={<User size={16} />} placeholder="Enter your full name" />
            )}
            <Input
              label={isEmployer ? "Work email" : "Email address"}
              icon={<Mail size={16} />}
              type="email"
              placeholder={isEmployer ? "Enter work email" : "Enter your email"}
            />
            <Input
              label="Password"
              icon={<Lock size={16} />}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightElement={
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <div className="space-y-1.5 pt-1">
              {checks.map((c) => (
                <p
                  key={c.label}
                  className={`flex items-center gap-2 text-xs ${c.ok ? "text-emerald-600" : "text-gray-400"}`}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8px] ${
                      c.ok ? "bg-emerald-500 text-white" : "bg-gray-200 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {c.label}
                </p>
              ))}
            </div>

            <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-primary-600"
              />
              <span className="text-sm text-gray-500">
                I agree to the{" "}
                <a href="/terms-privacy" className="text-primary-600 font-medium hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/terms-privacy" className="text-primary-600 font-medium hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button variant="primary" size="lg" fullWidth disabled={!agreed} className="mt-2">
              Create Account
            </Button>

            <p className="text-center text-xs text-gray-400 pt-1">
              By creating an account, you agree to our{" "}
              <a href="/terms-privacy" className="text-primary-600 font-medium hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/terms-privacy" className="text-primary-600 font-medium hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}
