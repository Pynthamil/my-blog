"use client";

import Image from "next/image";
import React from "react";
import GradientText from "./GradientText";

export interface PostCardProps {
  title: React.ReactNode;
  rawTitle?: string;
  description: React.ReactNode;
  category: string;
  date: string;
  readingTime?: string;
  categoryIcon?: "folder" | "ai";
  imageUrl: string;
  imageBg?: string;
  href?: string;
  tags?: string[];
  priority?: boolean;
  variant?: "default" | "recent" | "featured";
  views?: number;
}

export default function PostCard({
  title,
  description,
  category,
  date,
  readingTime,
  categoryIcon = "folder",
  imageUrl,
  imageBg = "bg-blue-50",
  href = "#",
  tags = [],
  rawTitle,
  priority = false,
  variant = "default",
  views,
}: PostCardProps) {
  const isRecent = variant === "recent";
  const isFeatured = variant === "featured";

  return (
    <a href={href} className="block group">
      {/* Card wrapper */}
      <div className="h-full transition-all duration-300 group-hover:-translate-y-1">
        <div className={isFeatured ? "h-full flex flex-col md:flex-row gap-6 md:gap-10 items-start" : "h-full flex flex-col"}>
          {/* Image Area */}
          <div
            className={
              isFeatured
                ? `relative aspect-[16/9] md:aspect-[4/3] w-full md:w-1/2 flex-shrink-0 ${imageBg} overflow-hidden rounded-2xl border border-white/10`
                : isRecent
                ? `relative aspect-[4/3] w-full flex-shrink-0 ${imageBg} overflow-hidden rounded-2xl border border-white/10`
                : `relative w-full flex-shrink-0 aspect-[4/3] md:aspect-[16/10] ${imageBg} overflow-hidden rounded-[12px] md:rounded-[16px]`
            }
          >
            <Image
              src={imageUrl}
              alt={rawTitle || (typeof title === 'string' ? title : "Blog post cover")}
              fill
              sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              priority={priority}
              className="object-cover"
            />
            
            {!isRecent && !isFeatured && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white pl-3 pr-1 py-1 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black ml-1">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  <path d="M5 3v4M3 5h4"/>
                </svg>
                <span className="text-[14px] font-medium text-black whitespace-nowrap px-1">
                  {category}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={isFeatured ? "pt-2 md:pt-4 flex flex-col flex-1 w-full md:w-1/2" : "pt-5 flex flex-col flex-1"}>
            {!isRecent && !isFeatured && (
              <>
                {/* Title */}
                <h3 className="text-[24px] md:text-[28px] font-bold text-[var(--text-primary)] leading-[1.2] tracking-tight mb-2">
                  {title}
                </h3>
                
                {/* Date */}
                <p className="text-[#888888] font-medium text-[15px]">
                  {date}
                </p>
              </>
            )}

            {isRecent && (
              <>
                {/* Title */}
                <GradientText
                  as="h3"
                  className="font-syne text-[18px] md:text-[20px] font-extrabold leading-tight tracking-[-0.02em] mb-2 line-clamp-2"
                >
                  {title}
                </GradientText>
              </>
            )}

            {isFeatured && (
              <>
                {/* Tags (just the first one for minimalism) */}
                {tags && tags.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                      {tags[0]}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {readingTime}
                    </span>
                  </div>
                )}
                {/* Title */}
                <GradientText
                  as="h3"
                  className="font-syne text-[28px] md:text-[40px] font-extrabold leading-[1.1] tracking-tight mb-4"
                >
                  {title}
                </GradientText>
                {/* Description */}
                <p className="text-[var(--text-secondary)] text-[16px] md:text-[18px] leading-relaxed line-clamp-3 mb-6">
                  {description}
                </p>
                {/* Button */}
                <div>
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold text-sm transition-transform hover:scale-105">
                    Read Post
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}