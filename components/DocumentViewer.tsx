"use client";

import { useState } from "react";
import { FileText, Minus, Plus, Download, X } from "lucide-react";

const sampleContent = [
  {
    heading: "1. Acceptance of Terms",
    body: "By creating an account or using our services, you agree to these Terms and our Privacy Policy. If you do not agree, please do not use our services.",
  },
  {
    heading: "2. Use of Services",
    body: "You agree to use Sachok Job only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account.",
  },
  {
    heading: "3. User Content",
    body: "You retain ownership of content you submit, but grant Sachok Job a license to use, display, and distribute it as necessary to provide our services.",
  },
  {
    heading: "4. Termination",
    body: "We may suspend or terminate your access to the platform at any time if you violate these Terms or engage in fraudulent or harmful activity.",
  },
];

export function DocumentViewer({
  open,
  onClose,
  title,
  effectiveDate,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  effectiveDate: string;
}) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 8;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-popover overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-7 w-7 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
              <FileText size={14} />
            </span>
            <span className="font-semibold text-ink-900 text-sm truncate">{title}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
            <span className="font-medium text-primary-600">{page}</span>/{totalPages}
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              aria-label="Zoom out"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              aria-label="Zoom in"
            >
              <Plus size={14} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Download">
              <Download size={14} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 bg-gray-50/50">
          <div
            className="bg-white rounded-lg shadow-sm mx-auto p-8 origin-top transition-transform"
            style={{ transform: `scale(${zoom / 100})`, maxWidth: 420 }}
          >
            <h2 className="text-center font-bold text-ink-900 text-base tracking-wide">{title.toUpperCase()}</h2>
            <p className="text-center text-xs text-gray-400 mt-1 mb-6">Effective Date: {effectiveDate}</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Welcome to Sachok Job. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our
              website and services. By accessing or using Sachok Job, you agree to be bound by these Terms.
            </p>
            {sampleContent.map((s) => (
              <div key={s.heading} className="mb-4">
                <p className="text-xs font-bold text-ink-800 mb-1">{s.heading}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 shrink-0">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-xs font-medium text-ink-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="text-xs font-medium text-ink-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
