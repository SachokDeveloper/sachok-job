"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  children,
  itemClassName = "",
}: {
  children: React.ReactNode[];
  itemClassName?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const recalcPages = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const pages = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPageCount(pages);
  }, []);

  useEffect(() => {
    recalcPages();
    window.addEventListener("resize", recalcPages);
    return () => window.removeEventListener("resize", recalcPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recalcPages, children.length]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActivePage(page);
  };

  const scrollToPage = (page: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pageCount - 1, page));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 no-scrollbar"
      >
        {children.map((child, i) => (
          <div key={i} className={`snap-start shrink-0 ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollToPage(activePage - 1)}
            disabled={activePage === 0}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-line items-center justify-center shadow-card hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollToPage(activePage + 1)}
            disabled={activePage === pageCount - 1}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-line items-center justify-center shadow-card hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activePage ? "w-5 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
