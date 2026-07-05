"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

const ALL_SUGGESTIONS = [
  "Marketing Manager",
  "Marketing Specialist",
  "Digital Marketing",
  "Product Marketing Manager",
  "Marketing Analyst",
];

export default function JobSearchInput() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const query = value.trim().toLowerCase();
  const matches = query
    ? ALL_SUGGESTIONS.filter((s) => s.toLowerCase().includes(query))
    : [];
  const showDropdown = open && query.length > 0;
  const hasResults = matches.length > 0;

  return (
    <div ref={wrapRef} className="relative flex-[2] min-w-[220px]">
      <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 focus-within:border-brand transition-colors">
        <Search size={16} className="text-muted shrink-0" />
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Find job"
          className="outline-none text-sm w-full placeholder:text-muted"
        />
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 bg-white border border-line rounded-xl shadow-popover p-2 animate-modal-in">
          {hasResults ? (
            <>
              <ul className="flex flex-col">
                {matches.map((m) => (
                  <li key={m}>
                    <button
                      type="button"
                      onClick={() => {
                        setValue(m);
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-ink hover:bg-slate-50 text-left transition-colors"
                    >
                      <Search size={14} className="text-muted shrink-0" />
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line mt-1 pt-2 px-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full text-left px-1.5 py-1.5 text-brand text-sm font-medium hover:underline"
                >
                  View all results for &ldquo;{value}&rdquo;
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 px-3">
              <p className="text-sm font-medium text-ink">No results found</p>
              <p className="text-xs text-muted mt-1">Try different keywords or filters</p>
              <button
                type="button"
                onClick={() => {
                  setValue("");
                  setOpen(false);
                }}
                className="btn btn-outline mt-3 px-4 py-2 text-xs"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
