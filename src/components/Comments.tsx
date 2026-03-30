"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export default function Comments({ slug }: { slug: string }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Sync with the blog's theme toggle
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://my-blog-tan-tau.vercel.app";
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme === "light" ? "light" : `${baseUrl}/giscus-theme.css`);

    // Listen for theme changes (from our ThemeToggle)
    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(updatedTheme === "light" ? "light" : `${baseUrl}/giscus-theme.css`);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="comments" className="w-full mt-16">
      <div className="mx-auto max-w-[820px] relative">
        {/* Ambient glow background */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-[150%] bg-gradient-to-b from-purple-600/[0.08] to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Giscus Container with improved dark mode styling */}
        <div 
          className="w-full mt-10 p-[2px] rounded-[28px] transition-all duration-300"
          style={{ background: "linear-gradient(135deg, rgba(168,126,255,0.4), rgba(232,180,244,0.4))" }}
        >
          <div className="w-full h-full p-8 md:p-10 rounded-[26px] bg-[var(--bg-secondary)] relative overflow-hidden border border-[var(--border-glow)]">
            {/* Subtle gradient top border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            
            {/* Title section for visual hierarchy */}
            <div className="mb-2">
              <h3 className="font-syne text-lg font-bold text-[var(--text-primary)] mb-1">Comments</h3>
              <p className="text-xs text-[var(--text-secondary)]">Share your thoughts and join the conversation</p>
            </div>
            
            <Giscus
              id={`comments-${slug}`}
              repo="Pynthamil/my-blog"
              repoId="R_kgDORueBdw"
              category="General"
              categoryId="DIC_kwDORueBd84C5KdE"
              mapping="specific"
              term={slug}
              strict="0"
              reactionsEnabled="0"
              emitMetadata="0"
              inputPosition="bottom"
              theme={theme}
              lang="en"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
