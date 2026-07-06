"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

export interface FilterModalOption {
  label: string;
  isCurrent?: boolean;
}

export function FilterModal({
  open,
  onClose,
  title,
  searchPlaceholder,
  options,
  otherLabel,
  otherPlaceholder,
  currentValue,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  searchPlaceholder: string;
  options: FilterModalOption[];
  otherLabel?: string;
  otherPlaceholder?: string;
  currentValue: string;
  onApply: (value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(currentValue);
  const [customValue, setCustomValue] = useState("");

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
      <div className="p-6">
        <h3 className="text-lg font-bold text-ink-900 mb-4 pr-6">{title}</h3>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-gray-200 bg-white text-sm py-2.5 pl-10 pr-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div className="space-y-0.5 max-h-56 overflow-y-auto mb-2">
          {filtered.map((opt) => (
            <label
              key={opt.label}
              className={`flex items-center justify-between gap-3 py-2.5 px-2 -mx-2 rounded-lg cursor-pointer group transition-colors duration-150 hover:bg-gray-50 ${
                selected === opt.label ? "bg-primary-50/60" : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="filter-option"
                  checked={selected === opt.label}
                  onChange={() => setSelected(opt.label)}
                  className="h-4 w-4 accent-primary-600"
                />
                <span className="text-sm text-ink-800">{opt.label}</span>
              </span>
              {selected === opt.label && currentValue === opt.label && (
                <span className="text-xs font-medium text-primary-600 bg-primary-50 rounded-full px-2.5 py-0.5">
                  Current
                </span>
              )}
            </label>
          ))}
        </div>

        {otherPlaceholder && (
          <div className="pt-3 border-t border-gray-100">
            {otherLabel && <p className="text-sm font-medium text-ink-800 mb-1.5">{otherLabel}</p>}
            <input
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value);
                setSelected(e.target.value);
              }}
              placeholder={otherPlaceholder}
              className="w-full rounded-xl border border-gray-200 bg-white text-sm py-2.5 px-3.5 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        )}

        <div className="flex items-center gap-3 mt-6">
          <Button variant="outline" size="md" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              onApply(selected);
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}
