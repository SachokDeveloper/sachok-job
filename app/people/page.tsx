"use client";

import Link from "next/link";
import { ArrowLeft, Search, ListFilter, MapPin, Grid2X2, List, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { people } from "@/lib/data";
import PersonCard from "@/components/PersonCard";

export default function PeopleListPage() {
  return (
    <>
      <Header />

      <section className="container-page py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-brand font-medium hover:underline mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className="w-11 h-11 rounded-xl bg-pink-50 text-pinkbrand flex items-center justify-center">
            <Star size={20} className="fill-pinkbrand" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-ink leading-tight">People from Social Media</h1>
            <p className="text-muted text-sm">They are looking for a job</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 flex-1 min-w-[220px]">
            <Search size={16} className="text-muted" />
            <input placeholder="Search by name, skill, or location..." className="outline-none text-sm w-full placeholder:text-muted" />
          </div>
          <button className="btn btn-ghost gap-2"><ListFilter size={15} /> Skills</button>
          <button className="btn btn-ghost gap-2"><MapPin size={15} /> Location</button>
          <button className="btn btn-ghost gap-2"><ListFilter size={15} /> More filters</button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-muted">Showing 1-{people.length} of 120 results</p>
          <div className="flex items-center gap-3">
            <select className="text-sm border border-line rounded-lg px-2 py-1.5 text-ink/80">
              <option>Sort by: Recently active</option>
              <option>Sort by: Most followers</option>
              <option>Sort by: Highest engagement</option>
            </select>
            <span className="flex items-center border border-line rounded-lg overflow-hidden">
              <span className="p-1.5 bg-brand text-white"><Grid2X2 size={15} /></span>
              <span className="p-1.5 text-muted"><List size={15} /></span>
            </span>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {people.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-10 text-sm">
          <button className="w-8 h-8 rounded-md border border-line text-muted">«</button>
          <button className="w-8 h-8 rounded-md border border-line text-muted">‹</button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-md border ${n === 1 ? "bg-brand text-white border-brand" : "border-line text-ink/70"}`}
            >
              {n}
            </button>
          ))}
          <button className="w-8 h-8 rounded-md border border-line text-muted">›</button>
          <button className="w-8 h-8 rounded-md border border-line text-muted">»</button>
        </div>
      </section>

      <Footer />
    </>
  );
}
