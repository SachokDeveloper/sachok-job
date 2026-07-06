import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function AuthLayout({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          <Logo className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500 hidden sm:inline">Already have an account?</span>
          <Button href="/login" variant="outline" size="sm">
            Log in
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center pt-6 pb-10">
        <h1 className="text-3xl sm:text-[34px] font-extrabold text-ink-900">{heading}</h1>
        <p className="text-gray-500 mt-2">{subheading}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">{children}</div>
    </div>
  );
}
