"use client";

import Image from "next/image";
import React from "react";

export interface HorizontalPostCardProps {
  title: string;
  description: string;
  date: string;
  readingTime?: string;
  imageUrl: string;
  imageBg?: string;
  href?: string;
  priority?: boolean;
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
}: HorizontalPostCardProps) {
  return (
    <a href={href} className="block group w-full">
      {/* Gradient border wrapper */}
      <div
        className="p-[2px] rounded-[24px] transition-all duration-300 group-hover:-translate-y-1 shadow-sm hover:shadow-purple-500/20"
        style={{
          background: "linear-gradient(135deg, #A69EFF, #E8B4F4)",
        }}
      >
        <div className="rounded-[22px] overflow-hidden flex flex-col md:flex-row bg-[#16161a]">
          
          {/* Image Area (Left on Desktop) */}
          <div className="p-3 md:p-3.5 md:w-[380px] shrink-0">
            <div className={`relative w-full aspect-[2.4/1] md:h-full ${imageBg} rounded-[16px] overflow-hidden border border-white/5`}>
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
              <h3 className="font-syne text-[20px] md:text-[22px] font-black mb-1.5 leading-tight tracking-[-0.03em] bg-gradient-to-br from-pink-200 via-purple-400 to-purple-700 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-700 group-hover:to-purple-900 transition-all">
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-[13px] md:text-[14px] leading-relaxed line-clamp-2 mb-3 font-medium opacity-80">
                {description}
              </p>
            </div>

            {/* Metadata Bottom */}
            <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500/80">
              <span className="bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{date}</span>
              <span className="opacity-40">•</span>
              <span className="bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/10 text-purple-400/80">{readingTime || "3 min read"}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
