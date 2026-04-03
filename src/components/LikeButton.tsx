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
  const [globalKVCount, setGlobalKVCount] = useState(0);

  // Fetch true global count from KV on mount
  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(`hasLiked-${slug}`);
    if (stored === "true") {
      setLiked(true);
    }

    // Fetch KV baseline
    fetch(`/api/likes/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          setGlobalKVCount(data.count);
          setCount(initialCount + data.count);
        }
      })
      .catch(err => console.error("Failed to fetch KV likes:", err));
  }, [slug, initialCount]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    
    // Optimistic update
    const diff = newLiked ? 1 : -1;
    setCount(prev => prev + diff);

    if (newLiked) {
      setShowBurst(true);
      localStorage.setItem(`hasLiked-${slug}`, "true");
      setTimeout(() => setShowBurst(false), 1000);
    } else {
      localStorage.removeItem(`hasLiked-${slug}`);
    }

    // Sync with KV
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment: newLiked })
      });
      const data = await response.json();
      if (data.count !== undefined) {
        // Correct the count if necessary with server data
        setGlobalKVCount(data.count);
        setCount(initialCount + data.count);
      }
    } catch (err) {
      console.error("Failed to sync KV like:", err);
      // Optional: Rollback if necessary, but optimistic is usually fine for likes
    }
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex items-center gap-4 opacity-0">
        <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-purple-500/10" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 group">
      <div className="flex flex-col items-end mr-1">
        <span className="text-xs font-syne font-bold text-text-muted uppercase tracking-widest">
          {liked ? "Liked" : "Like"}
        </span>
        <div className="text-sm font-syne font-bold text-text-primary">
          <RollingNumber value={count} />
        </div>
      </div>
      
      <div className="relative">
        <HeartBurst active={showBurst} />
        <button
          onClick={handleLike}
          className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 active:scale-90 ${
            liked 
              ? "bg-purple-500/10 border-purple-500/40 text-purple-500 shadow-[0_0_25px_rgba(167,139,250,0.25)]" 
              : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-muted hover:text-foreground hover:border-purple-500/20 hover:bg-[var(--bg-hover)]"
          } border overflow-hidden`}
          aria-label={liked ? "Unlike post" : "Like post"}
        >
          {/* Subtle background glow when liked */}
          {liked && (
            <motion.div 
              layoutId="glow"
              className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-[#A78BFA]/20 blur-xl"
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
