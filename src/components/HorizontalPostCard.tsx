"use client";

import Image from "next/image";
import React from "react";
import GradientText from "./GradientText";

export interface HorizontalPostCardProps {
  title: string;
  description: string;
  date: string;
  readingTime?: string;
  imageUrl: string;
  imageBg?: string;
  href?: string;
  priority?: boolean;
  views?: number;
}

export default function HorizontalPostCard({
  title,
  description,
  date,
  readingTime,
  imageUrl,
  imageBg = "bg-[#0F1117]",
  href = "#",
  priority = false,
  views,
}: HorizontalPostCardProps) {
  return (
    <a href={href} className="block group w-full">
      {/* Container wrapper */}
      <div
        className="rounded-[24px] p-[2px] md:p-[2.5px] transition-all duration-300 group-hover:-translate-y-1 gradient-border shadow-[var(--card-shadow)]"
      >
        <div className="rounded-[20px] overflow-hidden flex flex-col md:flex-row bg-[var(--bg-secondary)]">
          
          {/* Image Area (Left on Desktop) */}
          <div className="p-3 md:p-3.5 md:w-[380px] shrink-0">
            <div className={`relative w-full aspect-[2.4/1] md:h-full ${imageBg} rounded-[12px] overflow-hidden border-4 border-[var(--border-subtle)]`}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority={priority}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Content (Right on Desktop) */}
          <div className="px-6 py-4 md:py-5 md:pr-8 flex flex-col justify-between flex-1 min-w-0">
            <div>
              {/* Title */}
              <GradientText
                as="h3"
                className="font-syne text-[20px] md:text-[22px] font-black mb-1.5 leading-tight tracking-[-0.03em]"
              >
                {title}
              </GradientText>

              {/* Description */}
              <p className="text-muted text-[13px] md:text-[14px] leading-relaxed line-clamp-2 mb-3 font-medium opacity-80">
                {description}
              </p>
            </div>

            {/* Metadata Bottom */}
            <div className="flex items-center gap-2 text-[12px] font-medium text-muted/80">
              <span className="bg-foreground/5 px-2 py-0.5 rounded-md border border-foreground/5">{date}</span>
              <span className="opacity-40">•</span>
              <span className="bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/10 text-purple-600/80">{readingTime || "3 min read"}</span>
              {views !== undefined && (
                <>
                  <span className="opacity-40">•</span>
                  <div className="flex items-center gap-1.5 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20 text-sky-600 group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a12.97 12.97 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 12.97 12.97 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="font-syne font-bold text-[12px]">{views.toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
