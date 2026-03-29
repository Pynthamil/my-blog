"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ViewCountProps {
  slug: string;
  hideCount?: boolean;
}

const RollingNumber = ({ value }: { value: number }) => {
  return (
    <div className="flex overflow-hidden h-[1.3em] min-w-[0.5rem] relative font-syne font-bold leading-none">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 15, opacity: 0, filter: "blur(2px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -15, opacity: 0, filter: "blur(2px)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="inline-block"
        >
          {value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function ViewCount({ slug, hideCount = false }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const hasViewed = sessionStorage.getItem(`viewed-${slug}`);
    
    const fetchViews = async (increment: boolean) => {
      try {
        const method = increment ? "POST" : "GET";
        const response = await fetch(`/api/views/${slug}`, { 
          method,
          cache: 'no-store'
        });
        const data = await response.json();
        if (data.count !== undefined) {
          setViews(data.count);
          if (increment) {
            sessionStorage.setItem(`viewed-${slug}`, "true");
          }
        }
      } catch (err) {
        console.error("Failed to fetch/increment views:", err);
      }
    };

    fetchViews(!hasViewed);
  }, [slug]);

  if (hideCount) return null;

  if (views === null) {
    return (
      <div className="flex items-center gap-2 h-6 px-2.5 rounded-lg bg-white/[0.03] animate-pulse">
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-6 h-3 bg-white/10 rounded" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 group cursor-default"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-sky-400 blur-md rounded-full pointer-events-none"
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative z-10 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-hover:text-white transition-colors duration-500"
        >
          <path d="M2.062 12.348a12.97 12.97 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 12.97 12.97 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <div className="text-[14px] font-syne font-bold text-gray-200 group-hover:text-white transition-colors duration-500">
        <RollingNumber value={views} />
      </div>
    </motion.div>
  );
}
