"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, MapPin, Filter, LayoutGrid, List, ChevronDown, Check } from "lucide-react";

const skillOptions = ["Marketing", "Beauty", "Fitness", "Tech", "Fashion", "Gaming"];
const locationOptions = ["New York, NY", "Los Angeles, CA", "Miami, FL", "Chicago, IL", "Remote"];

export function FilterBar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
}) {
  const [openPanel, setOpenPanel] = useState<"skills" | "location" | "more" | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleSkill = (s: string) => {
    setSelectedSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const moreFiltersCount = (verifiedOnly ? 1 : 0) + (activeOnly ? 1 : 0);

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, skill, or location..."
            className="w-full rounded-xl border border-gray-200 bg-white text-sm py-2.5 pl-10 pr-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-150"
          />
        </div>

        {/* Skills filter */}
        <div className="relative">
          <button
            onClick={() => setOpenPanel((p) => (p === "skills" ? null : "skills"))}
            className={`flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 whitespace-nowrap border transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
              openPanel === "skills" || selectedSkills.length > 0
                ? "border-primary-400 ring-2 ring-primary-100 text-primary-600 bg-primary-50/50"
                : "border-gray-200 text-ink-700 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={15} /> Skills{selectedSkills.length > 0 ? ` (${selectedSkills.length})` : ""}
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${openPanel === "skills" ? "rotate-180" : ""}`}
            />
          </button>
          {openPanel === "skills" && (
            <div className="absolute z-30 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-popover p-3 animate-drop-in origin-top-left">
              {skillOptions.map((s) => {
                const checked = selectedSkills.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className="w-full flex items-center justify-between gap-2 text-left text-sm text-ink-800 px-3 py-2 rounded-lg hover:bg-primary-50/70 transition-all duration-150"
                  >
                    {s}
                    <span
                      className={`h-4 w-4 rounded flex items-center justify-center border transition-all duration-150 ${
                        checked ? "bg-primary-600 border-primary-600" : "border-gray-300"
                      }`}
                    >
                      {checked && <Check size={12} className="text-white" />}
                    </span>
                  </button>
                );
              })}
              <div className="flex items-center gap-2 pt-2 mt-1 border-t border-gray-100">
                <button
                  onClick={() => setSelectedSkills([])}
                  className="flex-1 text-xs font-semibold text-ink-600 py-2 rounded-lg hover:bg-gray-50 transition-all duration-150"
                >
                  Clear
                </button>
                <button
                  onClick={() => setOpenPanel(null)}
                  className="flex-1 text-xs font-semibold text-white bg-primary-600 py-2 rounded-lg hover:bg-primary-700 transition-all duration-150"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Location filter */}
        <div className="relative">
          <button
            onClick={() => setOpenPanel((p) => (p === "location" ? null : "location"))}
            className={`flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 whitespace-nowrap border transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
              openPanel === "location" || selectedLocation
                ? "border-primary-400 ring-2 ring-primary-100 text-primary-600 bg-primary-50/50"
                : "border-gray-200 text-ink-700 hover:bg-gray-50"
            }`}
          >
            <MapPin size={15} /> {selectedLocation ?? "Location"}
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${openPanel === "location" ? "rotate-180" : ""}`}
            />
          </button>
          {openPanel === "location" && (
            <div className="absolute z-30 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-popover p-3 animate-drop-in origin-top-left">
              {locationOptions.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setSelectedLocation(l);
                    setOpenPanel(null);
                  }}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                    selectedLocation === l ? "bg-primary-50 text-primary-600 font-semibold" : "text-ink-800 hover:bg-gray-50"
                  }`}
                >
                  {l}
                </button>
              ))}
              {selectedLocation && (
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    setOpenPanel(null);
                  }}
                  className="w-full text-center text-xs font-semibold text-ink-600 py-2 mt-1 rounded-lg hover:bg-gray-50 border-t border-gray-100 transition-all duration-150"
                >
                  Clear location
                </button>
              )}
            </div>
          )}
        </div>

        {/* More filters */}
        <div className="relative">
          <button
            onClick={() => setOpenPanel((p) => (p === "more" ? null : "more"))}
            className={`flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 whitespace-nowrap border transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
              openPanel === "more" || moreFiltersCount > 0
                ? "border-primary-400 ring-2 ring-primary-100 text-primary-600 bg-primary-50/50"
                : "border-gray-200 text-ink-700 hover:bg-gray-50"
            }`}
          >
            <Filter size={15} /> More filters{moreFiltersCount > 0 ? ` (${moreFiltersCount})` : ""}
          </button>
          {openPanel === "more" && (
            <div className="absolute z-30 right-0 mt-2 w-60 bg-white border border-gray-100 rounded-2xl shadow-popover p-3 animate-drop-in origin-top-right">
              <label className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-150">
                <span className="text-sm text-ink-800">Verified only</span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 accent-primary-600"
                />
              </label>
              <label className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-150">
                <span className="text-sm text-ink-800">Actively looking</span>
                <input
                  type="checkbox"
                  checked={activeOnly}
                  onChange={(e) => setActiveOnly(e.target.checked)}
                  className="h-4 w-4 accent-primary-600"
                />
              </label>
              <button
                onClick={() => setOpenPanel(null)}
                className="w-full text-center text-xs font-semibold text-white bg-primary-600 py-2 rounded-lg mt-2 hover:bg-primary-700 transition-all duration-150"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1–12 of 120 results</p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none text-sm font-medium text-ink-700 border border-gray-200 rounded-xl pl-3 pr-8 py-2 bg-white outline-none cursor-pointer hover:border-gray-300 transition-all duration-150"
            >
              <option value="recent">Sort by: Recently active</option>
              <option value="followers">Sort by: Most followers</option>
              <option value="engagement">Sort by: Highest engagement</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-2 transition-all duration-150 ${view === "grid" ? "bg-primary-50 text-primary-600" : "text-gray-400 hover:bg-gray-50"}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`p-2 border-l border-gray-200 transition-all duration-150 ${view === "list" ? "bg-primary-50 text-primary-600" : "text-gray-400 hover:bg-gray-50"}`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
