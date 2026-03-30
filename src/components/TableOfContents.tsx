"use client";

import { useEffect, useState } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // If the window/document is fully loaded, observe headings
    const handleObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0px 0px -80% 0px" } // We care about what hits the top ~20% of the screen
      );

      headings.forEach((h) => {
        const element = document.getElementById(h.id);
        if (element) {
          observer.observe(element);
        }
      });

      return observer;
    };

    const observer = handleObserver();
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block w-[240px] shrink-0 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar pb-10">
      <h3 className="text-sm font-syne font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-6">
        On this page
      </h3>
      <ul className="space-y-4 border-l border-[var(--border-glow)]">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === 3 ? "ml-4" : "ml-0"}`}
          >
            <a
              href={`#${heading.id}`}
              className={`block pl-4 py-0.5 text-[14px] leading-snug border-l-2 transition-all duration-300 ${
                activeId === heading.id
                  ? "border-[var(--purple-600)] text-[var(--purple-600)] font-semibold drop-shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--purple-500)]/30"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
