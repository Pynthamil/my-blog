import React from "react";

export default function PostCardSkeleton() {
  return (
    <div className="block group">
      {/* Gradient border wrapper skeleton */}
      <div className="p-[4px] rounded-[24px] h-full" style={{ background: "linear-gradient(135deg, rgba(166, 158, 255, 0.15), rgba(232, 180, 244, 0.15))" }}>
        <div className="rounded-[23px] overflow-hidden h-full flex flex-col shadow-lg bg-[#222222]/80 backdrop-blur-sm animate-pulse">
          {/* Image Area Skeleton */}
          <div className="relative w-full aspect-[4/3] bg-[#2a2a32] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a32] via-[#3a3a45] to-[#2a2a32] -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6 md:p-8 flex flex-col flex-1 bg-shadow-200">
            {/* Metadata Badges Skeleton */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-28 bg-[#1f1f26] rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a32] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
              <div className="h-9 w-32 bg-[#1f1f26] rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a32] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            {/* Title Skeleton */}
            <div className="h-8 w-11/12 bg-[#2a2a32] rounded-lg mb-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3a3a45] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
            <div className="h-8 w-3/4 bg-[#2a2a32] rounded-lg mb-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3a3a45] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>

            {/* Description Skeleton */}
            <div className="mt-auto space-y-2">
              <div className="h-4 w-full bg-[#1f1f26] rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a32] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
              <div className="h-4 w-4/5 bg-[#1f1f26] rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a32] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
