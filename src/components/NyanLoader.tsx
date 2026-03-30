"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const NyanLoader = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-8 relative"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--text-muted)]/10 blur-[60px] rounded-full animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        {!imageError ? (
          <img 
            src="/nyan-cat.gif" 
            alt="Loading animation - Nyan Cat" 
            className="w-[140px] h-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-[140px] h-[140px] bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center border border-[var(--border-glow)]">
            <span className="text-[var(--text-secondary)] text-sm">Loading...</span>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-2">
          <span className="font-syne font-bold text-[var(--purple-400)] text-lg tracking-wider animate-pulse uppercase">
            pyndu logs()
          </span>
          <span className="font-mono text-[var(--text-secondary)] text-xs tracking-[0.3em] uppercase">
            fetching data...
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default NyanLoader;
