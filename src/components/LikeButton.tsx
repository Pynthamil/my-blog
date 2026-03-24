"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(`hasLiked-${slug}`);
    if (stored === "true") {
      setLiked(true);
    }
  }, [slug]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      localStorage.removeItem(`hasLiked-${slug}`);
    } else {
      setLiked(true);
      localStorage.setItem(`hasLiked-${slug}`, "true");
    }
  };

  // Prevent hydration mismatch by not rendering the interactive parts until mounted
  if (!isMounted) {
    return (
      <div className="flex items-center gap-3 opacity-0">
        <span className="text-xs font-syne font-bold text-gray-500 uppercase tracking-widest mr-2">
          Like
        </span>
        <div className="w-10 h-10 rounded-full bg-[#1a1a24] border border-purple-500/20" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-syne font-bold text-gray-500 uppercase tracking-widest mr-2">
        {liked ? "Liked" : "Like"}
      </span>
      <button
        onClick={handleLike}
        className={`w-10 h-10 rounded-full bg-[#1a1a24] border ${
          liked 
            ? "border-pink-500 text-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
            : "border-purple-500/20 text-gray-400 hover:text-white hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]"
        } flex items-center justify-center transition-all duration-300 hover:-translate-y-1`}
        aria-label={liked ? "Unlike post" : "Like post"}
      >
        <AnimatePresence mode="wait">
          <motion.svg
            key={liked ? "liked" : "unliked"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </motion.svg>
        </AnimatePresence>
      </button>
    </div>
  );
}
