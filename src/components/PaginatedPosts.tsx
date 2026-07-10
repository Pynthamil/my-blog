"use client";

import { useState } from "react";
import PostCard from "./PostCard";

export default function PaginatedPosts({ posts, viewsMap }: { posts: any[], viewsMap: Record<string, number> }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Calculate which posts to show
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePagination = () => {
    const pages = [];
    // Always show first, last, and current +- 1
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    
    // Deduplicate the "..." entries
    return pages.filter((item, index, arr) => {
      if (item === "..." && arr[index - 1] === "...") return false;
      return true;
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mb-12">
        {currentPosts.map((post: any, i: number) => {
          const slug = post.href.split('/').pop() || "";
          return (
            <PostCard 
              key={`${currentPage}-${i}`} 
              {...post} 
              priority={i === 0} 
              variant="recent" 
              views={viewsMap[slug] || 0}
            />
          );
        })}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mt-4">
          <button 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          {generatePagination().map((page, index) => (
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="w-8 h-10 md:w-10 md:h-12 flex items-center justify-center text-[var(--text-secondary)] font-bold tracking-widest">
                ...
              </span>
            ) : (
              <button 
                key={`page-${page}`}
                onClick={() => goToPage(page as number)}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full font-bold text-lg md:text-xl transition-colors ${
                  currentPage === page 
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                    : "bg-white/[0.03] text-[var(--text-primary)] hover:bg-white/[0.08]"
                }`}
              >
                {page}
              </button>
            )
          ))}
          
          <button 
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
  );
}
