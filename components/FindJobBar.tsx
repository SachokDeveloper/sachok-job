"use client";

import { useState } from "react";
import { MapPin, Hash, Building } from "lucide-react";
import SelectModal from "./SelectModal";
import JobSearchInput from "./JobSearchInput";

const LOCATIONS = ["New York, NY", "Los Angeles, CA", "San Francisco, CA", "Chicago, IL", "Austin, TX"];
const ZIP_CODES = ["11219", "10001", "10002", "10003", "11375"];
const INDUSTRIES = ["Technologies", "Marketing", "Finance", "Healthcare", "Education", "Retail", "Other"];

type ModalKind = "location" | "zip" | "industry" | null;

export default function FindJobBar() {
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [zip, setZip] = useState(ZIP_CODES[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [openModal, setOpenModal] = useState<ModalKind>(null);

  return (
    <>
      <div className="card p-4 flex flex-wrap gap-3 items-stretch">
        <button
          type="button"
          onClick={() => setOpenModal("location")}
          className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 flex-1 min-w-[180px] text-left hover:border-brand/40 transition-colors"
        >
          <MapPin size={16} className="text-brand shrink-0" />
          <div>
            <p className="text-sm font-medium text-ink">{location.split(",")[0]}</p>
            <p className="text-xs text-muted">Current open positions</p>
          </div>
        </button>

        <JobSearchInput />

        <button
          type="button"
          onClick={() => setOpenModal("zip")}
          className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 min-w-[150px] text-left hover:border-brand/40 transition-colors"
        >
          <Hash size={16} className="text-brand shrink-0" />
          <div>
            <p className="text-sm font-medium text-ink">{zip}</p>
            <p className="text-xs text-muted">ZIP code</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setOpenModal("industry")}
          className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 min-w-[170px] text-left hover:border-brand/40 transition-colors"
        >
          <Building size={16} className="text-brand shrink-0" />
          <div>
            <p className="text-sm font-medium text-ink">{industry}</p>
            <p className="text-xs text-muted">Industry</p>
          </div>
        </button>
      </div>

      <SelectModal
        open={openModal === "location"}
        onClose={() => setOpenModal(null)}
        title="Select Location"
        options={LOCATIONS}
        value={location}
        onApply={setLocation}
        searchPlaceholder="Search location..."
        otherLabel="Other location"
        otherPlaceholder="Enter city or state..."
      />

      <SelectModal
        open={openModal === "zip"}
        onClose={() => setOpenModal(null)}
        title="Select ZIP Code"
        options={ZIP_CODES}
        value={zip}
        onApply={setZip}
        searchPlaceholder="Search ZIP code..."
        otherLabel="Enter ZIP code"
        otherPlaceholder="Enter ZIP code..."
      />

      <SelectModal
        open={openModal === "industry"}
        onClose={() => setOpenModal(null)}
        title="Select Industry"
        options={INDUSTRIES}
        value={industry}
        onApply={setIndustry}
        searchPlaceholder="Search industry..."
        otherLabel="Other industry"
        otherPlaceholder="Enter industry..."
      />
    </>
  );
}
