"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CandidateCard } from "@/components/CandidateCard";
import { FilterBar } from "@/components/FilterBar";
import { candidates as baseCandidates } from "@/lib/data";

const candidates = [
  ...baseCandidates,
  ...baseCandidates.map((c, i) => ({ ...c, id: `${c.id}-x${i}` })),
];

export default function SocialMediaCandidatesPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    let list = candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "followers") {
      list = [...list].sort((a, b) => parseFloat(b.followers) - parseFloat(a.followers));
    } else if (sort === "engagement") {
      list = [...list].sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement));
    }
    return list;
  }, [search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">
            <ArrowLeft size={15} /> Back
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-11 w-11 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
              <Star size={20} className="fill-pink-500" />
            </span>
            <div>
              <h1 className="font-extrabold text-ink-900 text-2xl leading-tight">People from Social Media</h1>
              <p className="text-sm text-gray-400">They are looking for a job</p>
            </div>
          </div>

          <FilterBar
            search={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />

          {visible.length > 0 ? (
            <div
              className={`mt-6 grid gap-5 ${
                view === "grid" ? "sm:grid-cols-2 lg:grid-cols-5" : "grid-cols-1"
              }`}
            >
              {visible.map((c) => (
                <div key={c.id} className={view === "list" ? "max-w-md" : ""}>
                  <CandidateCard candidate={c} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-semibold text-ink-800">No candidates found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-9 w-9 rounded-lg border border-gray-200 text-sm text-gray-400 hover:bg-gray-50 disabled:opacity-40"
                disabled={page === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium ${
                    page === i + 1
                      ? "bg-primary-600 text-white"
                      : "border border-gray-200 text-ink-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="h-9 w-9 rounded-lg border border-gray-200 text-sm text-gray-400 hover:bg-gray-50 disabled:opacity-40"
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
