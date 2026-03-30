"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(currentQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query === (searchParams.get("q") || "")) return;

      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      
      // Prevent pushing the exact same URL
      const newUrl = `/search${params.toString() ? '?' + params.toString() : ''}`;
      startTransition(() => {
        router.replace(newUrl, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [query, router, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      startTransition(() => {
        router.replace(`/search${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
      });
    }
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto mb-10 mt-6 z-10">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--purple-500)]">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="search posts... (e.g. react, typescript)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-glow)] text-[var(--text-primary)] rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[var(--purple-500)] focus:ring-2 focus:ring-[var(--purple-500)]/20 transition-all font-syne shadow-[0_4px_25px_rgba(168,85,247,0.05)] placeholder-[var(--text-muted)]"
      />
    </div>
  );
}
