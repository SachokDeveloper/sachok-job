"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  widthClass = "max-w-sm",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClass?: string;
}) {
  // Keep the modal mounted briefly after `open` goes false so the closing
  // animation can play instead of the modal disappearing instantly.
  const [shouldRender, setShouldRender] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setClosing(false);
      return;
    }
    if (shouldRender) {
      setClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setClosing(false);
      }, 150);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm ${
        closing ? "animate-overlay-out" : "animate-overlay-in"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${widthClass} bg-white rounded-2xl border border-line shadow-popover p-5 ${
          closing ? "animate-modal-out" : "animate-modal-in"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-ink text-lg">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-slate-100 hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div>{children}</div>

        {footer && <div className="flex items-center gap-3 mt-5">{footer}</div>}
      </div>
    </div>
  );
}
