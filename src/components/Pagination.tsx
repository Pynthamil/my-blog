"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PaginationProps {
  hasNextPage: boolean;
  endCursor: string | null;
  prevCursor?: string | null;
}

export default function Pagination({ hasNextPage, endCursor }: PaginationProps) {
  // Simple cursor-based pagination needs the current offset or previous cursors to go back.
  // For a basic implementation, we'll just have "Older Posts" if hasNextPage is true.
  // To keep it minimalist and premium, we use a subtle glow border design.

  return (
    <div className="flex items-center justify-center gap-6 mt-16">
      {/* If we had a way to track the history of cursors, we could add a "Newer Posts" button.
          Since we're using stateless Server Components, the simplest "Newer" is back to /posts or the browser back button.
          However, for a better UX, we'll at least show the "Older Posts" button. */}
      
      {hasNextPage && endCursor && (
        <Link 
          href={`/posts?after=${endCursor}`}
          className="group relative"
        >
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="glow-border-strong rounded-2xl bg-[var(--section-bg)] backdrop-blur-md px-8 py-4 flex items-center gap-3 transition-all group-hover:bg-purple-500/10 group-hover:border-purple-500/40"
          >
            <span className="font-syne font-bold text-foreground tracking-wide group-hover:text-purple-400 transition-colors">
              Older Posts
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-muted group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.div>
        </Link>
      )}
    </div>
  );
}
