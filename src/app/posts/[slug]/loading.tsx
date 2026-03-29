import React from "react";

export default function Loading() {
  return (
    <main className="flex-1 flex flex-col">
      {/* ── Article wrapper ── */}
      <article className="relative w-full flex flex-col items-center pt-[120px] pb-16 px-4">
        {/* Subtle ambient focus behind content */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[500px] bg-[#0f0f11] opacity-40 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Back link placeholder */}
        <div className="w-full max-w-[720px] mb-10 h-6">
          <div className="skeleton w-32 h-full opacity-50" />
        </div>

        {/* ── Header ── */}
        <header className="w-full max-w-[720px] mb-10">
          {/* Author Profile Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full skeleton opacity-50" />
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 skeleton opacity-50" />
                <div className="w-32 h-3 skeleton opacity-20" />
              </div>
            </div>
            {/* Meta chips */}
            <div className="flex gap-2">
              <div className="w-16 h-6 rounded-full skeleton opacity-20" />
              <div className="w-16 h-6 rounded-full skeleton opacity-20" />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-3">
            <div className="w-full h-12 skeleton opacity-40" />
            <div className="w-[60%] h-12 skeleton opacity-40" />
          </div>
        </header>

        {/* ── Cover Image placeholder ── */}
        <div className="w-full max-w-[720px] mb-12">
          <div className="w-full aspect-[16/9] rounded-2xl skeleton opacity-30" />
        </div>

        {/* ── Content placeholder ── */}
        <div className="w-full max-w-[720px] pt-8 flex flex-col gap-8">
          {/* Paragraph lines */}
          <div className="flex flex-col gap-3">
             <div className="w-full h-4 skeleton opacity-20" />
             <div className="w-full h-4 skeleton opacity-20" />
             <div className="w-[90%] h-4 skeleton opacity-20" />
             <div className="w-[95%] h-4 skeleton opacity-20" />
             <div className="w-[40%] h-4 skeleton opacity-20" />
          </div>

          {/* Subheading */}
          <div className="w-[30%] h-8 skeleton opacity-30 mt-4" />

          {/* More lines */}
          <div className="flex flex-col gap-3">
             <div className="w-full h-4 skeleton opacity-20" />
             <div className="w-full h-4 skeleton opacity-20" />
             <div className="w-[85%] h-4 skeleton opacity-20" />
             <div className="w-full h-4 skeleton opacity-20" />
          </div>
        </div>

      </article>
    </main>
  );
}
