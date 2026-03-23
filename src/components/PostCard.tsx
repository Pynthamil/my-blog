"use client";

import Image from "next/image";

interface PostCardProps {
  title: string;
  description: string;
  tag: string;
  tagColor?: string;
  imageUrl: string;
  imageBg?: string;
  href?: string;
}

export default function PostCard({
  title,
  description,
  tag,
  imageUrl,
  imageBg = "bg-pink-100",
  href = "#",
}: PostCardProps) {
  return (
    <a href={href} className="block group">
      <div className="glow-border card-hover rounded-2xl overflow-hidden bg-[#16161a] h-full flex flex-col">
        {/* Image Area */}
        <div className={`relative w-full aspect-[4/3] ${imageBg} overflow-hidden`}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M6 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs text-purple-400 font-medium">{tag}</span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-purple-300 mb-2 leading-snug group-hover:text-purple-200 transition-colors"
            style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mt-auto">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
