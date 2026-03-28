"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LikeButtonProps {
  slug: string;
  initialCount?: number;
}

const RollingNumber = ({ value }: { value: number }) => {
  return (
    <div className="flex overflow-hidden h-[1.2em] relative font-syne font-bold">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const HeartBurst = ({ active }: { active: boolean }) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0],
            x: Math.cos((i * 60 * Math.PI) / 180) * 40,
            y: Math.sin((i * 60 * Math.PI) / 180) * 40,
            opacity: 0
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#ec4899">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default function LikeButton({ slug, initialCount = 0 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isMounted, setIsMounted] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(`hasLiked-${slug}`);
    if (stored === "true") {
      setLiked(true);
      // If they liked it locally, we logically increment the initial count if it's not already reflected
      // But for simplicity, we'll just respect the liked state.
    }
  }, [slug]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setCount(prev => Math.max(0, prev - 1));
      localStorage.removeItem(`hasLiked-${slug}`);
    } else {
      setLiked(true);
      setCount(prev => prev + 1);
      setShowBurst(true);
      localStorage.setItem(`hasLiked-${slug}`, "true");
      setTimeout(() => setShowBurst(false), 1000);
    }
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex items-center gap-4 opacity-0">
        <div className="w-10 h-10 rounded-full bg-[#1a1a24] border border-purple-500/10" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 group">
      <div className="flex flex-col items-end mr-1">
        <span className="text-[10px] font-syne font-black text-gray-500 uppercase tracking-[0.2em] mb-0.5">
          {liked ? "Liked" : "Like"}
        </span>
        <div className="text-sm font-syne font-bold text-gray-300">
          <RollingNumber value={count} />
        </div>
      </div>
      
      <div className="relative">
        <HeartBurst active={showBurst} />
        <button
          onClick={handleLike}
          className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 active:scale-90 ${
            liked 
              ? "bg-pink-500/10 border-pink-500/40 text-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.25)]" 
              : "bg-white/[0.03] border-white/10 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/[0.05]"
          } border overflow-hidden`}
          aria-label={liked ? "Unlike post" : "Like post"}
        >
          {/* Subtle background glow when liked */}
          {liked && (
            <motion.div 
              layoutId="glow"
              className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-xl"
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={liked ? "liked" : "unliked"}
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={liked ? "0" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
