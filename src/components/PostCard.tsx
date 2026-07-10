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
      <div
        className="rounded-[24px] h-full transition-all duration-300 group-hover:-translate-y-1"
      >
        <div
          className={
            isRecent || isFeatured
              ? "h-full flex flex-col"
              : "rounded-[23px] overflow-hidden h-full flex flex-col shadow-[var(--card-shadow)] bg-[var(--bg-secondary)]"
          }
        >
          {/* Image Area */}
          <div
            className={
              isRecent || isFeatured
                ? `relative aspect-[4/3] w-full ${imageBg} overflow-hidden rounded-2xl border border-white/10`
                : `relative w-full aspect-[4/3] ${imageBg} overflow-hidden`
            }
          >
            <Image
              src={imageUrl}
              alt={rawTitle || (typeof title === 'string' ? title : "Blog post cover")}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className={isRecent || isFeatured ? "pt-5 flex flex-col flex-1" : "p-6 md:p-8 flex flex-col flex-1 bg-shadow-200"}>
            {!isRecent && !isFeatured && (
              <>
                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)]">
                    <div className="shadow-sm bg-[var(--bg-primary)] border border-[var(--border-glow)] p-1 rounded-lg w-8 h-8 flex items-center justify-center">
                      {categoryIcon === "folder" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                        >
                          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.22-1.8A2 2 0 0 0 7.53 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                        </svg>
                      ) : (
                        <span className="text-[13px] font-bold text-[var(--text-primary)] font-serif italic pr-0.5">
                          AI
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
                      {category}
                    </span>
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] shadow-sm">
                    <div className="shadow-sm bg-[var(--bg-primary)] border border-[var(--border-glow)] p-1 rounded-lg w-8 h-8 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <rect x="8" y="14" width="2" height="2" fill="currentColor" stroke="none" />
                        <rect x="12" y="14" width="2" height="2" fill="currentColor" stroke="none" />
                        <rect x="16" y="14" width="2" height="2" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
                      {date}
                    </span>
                  </div>

                  {/* Tags */}
                  {tags && tags.length > 0 && tags.slice(0, 2).map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] shadow-sm border border-[var(--purple-500)]/10"
                    >
                      <span className="text-xs font-semibold text-[var(--purple-500)] tracking-wider uppercase">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Title */}
                <GradientText
                  as="h3"
                  className="font-syne text-[26px] md:text-[28px] font-extrabold mb-3 leading-[1.1] tracking-[-0.03em]"
                >
                  {title}
                </GradientText>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mt-auto tracking-[-0.01em] line-clamp-2">
                  {description}
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
                  <div className="flex gap-2 mb-3">
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
                  className="font-syne text-[22px] md:text-[26px] font-extrabold leading-tight tracking-tight mb-3 line-clamp-2"
                >
                  {title}
                </GradientText>
                {/* Description */}
                <p className="text-[var(--text-secondary)] text-[14px] md:text-[15px] leading-relaxed line-clamp-2">
                  {description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}