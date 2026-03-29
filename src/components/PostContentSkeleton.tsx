import React from "react";

export default function PostContentSkeleton() {
  return (
    <main className="flex-1 flex flex-col">
      {/* ── Article wrapper ── */}
      <article className="relative w-full flex flex-col items-center pt-[120px] pb-16 px-4">
        
        {/* Back link placeholder */}
        <div className="w-full max-w-[720px] mb-10">
          <div className="w-32 h-5 skeleton opacity-50" />
        </div>

        {/* ── Header ── */}
        <header className="w-full max-w-[720px] mb-10">
          {/* Author Profile Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full skeleton" />
              <div className="flex flex-col gap-2">
                <div className="w-32 h-4 skeleton" />
                <div className="w-24 h-3 skeleton opacity-40" />
              </div>
            </div>

            {/* Meta chips row */}
            <div className="flex gap-2">
              <div className="w-16 h-7 rounded-full skeleton opacity-30" />
              <div className="w-20 h-7 rounded-full skeleton opacity-30" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <div className="w-full h-12 skeleton" />
            <div className="w-3/4 h-12 skeleton" />
          </div>
        </header>

        {/* ── Cover Image ── */}
        <div className="w-full max-w-[720px] mb-12">
          <div className="w-full aspect-[16/9] rounded-2xl skeleton" />
        </div>

        {/* ── Content Area ── */}
        <div className="w-full max-w-[720px] space-y-8">
          {/* Paragraph block 1 */}
          <div className="space-y-3">
            <div className="w-full h-4 skeleton opacity-40" />
            <div className="w-full h-4 skeleton opacity-40" />
            <div className="w-[90%] h-4 skeleton opacity-40" />
            <div className="w-full h-4 skeleton opacity-40" />
            <div className="w-[60%] h-4 skeleton opacity-40" />
          </div>

          {/* Subheading placeholder */}
          <div className="w-48 h-8 skeleton opacity-60 mt-12" />

          {/* Paragraph block 2 */}
          <div className="space-y-3">
            <div className="w-full h-4 skeleton opacity-40" />
            <div className="w-full h-4 skeleton opacity-40" />
            <div className="w-[85%] h-4 skeleton opacity-40" />
          </div>
        </div>
      </article>
    </main>
  );
}
