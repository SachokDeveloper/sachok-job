"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Modal from "./Modal";

export default function SelectModal({
  open,
  onClose,
  title,
  options,
  value,
  onApply,
  searchPlaceholder,
  otherLabel,
  otherPlaceholder,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  value: string;
  onApply: (value: string) => void;
  searchPlaceholder: string;
  otherLabel: string;
  otherPlaceholder: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(value);
  const [otherValue, setOtherValue] = useState("");

  // Reset local state whenever the modal is (re)opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(value);
      setOtherValue(options.includes(value) ? "" : value);
    }
  }, [open, value, options]);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()));

  const handleApply = () => {
    const final = otherValue.trim() ? otherValue.trim() : selected;
    if (final) onApply(final);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      widthClass="max-w-sm"
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-outline flex-1">
            Cancel
          </button>
          <button type="button" onClick={handleApply} className="btn btn-primary flex-1">
            Apply
          </button>
        </>
      }
    >
      <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 mb-4 focus-within:border-brand transition-colors">
        <Search size={15} className="text-muted shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="outline-none text-sm w-full placeholder:text-muted"
        />
      </div>

      <div className="flex flex-col gap-1 max-h-56 overflow-y-auto -mx-1 px-1">
        {filtered.map((opt) => {
          const isChecked = selected === opt && !otherValue.trim();
          const isCurrent = opt === value;
          return (
            <label
              key={opt}
              className="flex items-center justify-between gap-2 px-2 py-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-2.5 text-sm text-ink">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? "border-brand" : "border-line"
                  }`}
                >
                  {isChecked && <span className="w-2 h-2 rounded-full bg-brand" />}
                </span>
                {opt}
              </span>
              <span className="flex items-center gap-2">
                {isCurrent && <span className="pill">Current</span>}
                <input
                  type="radio"
                  name={`select-modal-${title}`}
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => {
                    setSelected(opt);
                    setOtherValue("");
                  }}
                />
              </span>
            </label>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted px-2 py-4 text-center">No matches found</p>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-ink mb-1.5">{otherLabel}</p>
        <input
          value={otherValue}
          onChange={(e) => setOtherValue(e.target.value)}
          placeholder={otherPlaceholder}
          className="w-full border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand transition-colors placeholder:text-muted"
        />
      </div>
    </Modal>
  );
}
