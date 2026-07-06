"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { jobs } from "@/lib/data";

const allSuggestions = Array.from(
  new Set([
    ...jobs.map((j) => j.title),
    "Marketing Manager",
    "Marketing Specialist",
    "Digital Marketing",
    "Product Marketing Manager",
    "Marketing Analyst",
    "Software Engineer",
    "Data Analyst",
    "UX Designer",
    "Customer Success Manager",
  ])
);

export function SearchDropdown({
  placeholder = "Find job",
  onSelect,
}: {
  placeholder?: string;
  onSelect?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const matches = useMemo(() => {
    if (!value.trim()) return [];
    return allSuggestions
      .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
  }, [value]);

  const showDropdown = focused && value.trim().length > 0;
  const noResults = showDropdown && matches.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white text-sm text-ink-900 placeholder:text-gray-400 py-2.5 pl-10 pr-9 outline-none transition ${
            showDropdown ? "border-primary-400 ring-2 ring-primary-100" : "border-gray-200"
          }`}
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:scale-110 active:scale-90 transition-all duration-150"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-30 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-popover overflow-hidden animate-drop-in origin-top">
          {noResults ? (
            <div className="p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink-800">
                <Search size={15} className="text-gray-400" /> No results found
              </p>
              <p className="text-xs text-gray-400 mt-1 mb-3">Try different keywords or filters</p>
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => setValue("")}
                  className="w-full text-center text-sm font-semibold text-primary-600 bg-primary-50 rounded-xl py-2.5 hover:bg-primary-100 transition"
                >
                  Clear search
                </button>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {matches.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setValue(m);
                    setFocused(false);
                    onSelect?.(m);
                  }}
                  className="w-full flex items-center gap-2.5 text-left text-sm text-ink-800 px-4 py-2.5 hover:bg-primary-50/70 hover:pl-5 transition-all duration-150"
                >
                  <Search size={14} className="text-gray-400 shrink-0" />
                  {m}
                </button>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-2 px-4">
                <button
                  onClick={() => setFocused(false)}
                  className="text-sm font-semibold text-primary-600 hover:underline"
                >
                  View all results for &ldquo;{value}&rdquo;
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
