"use client";

import React from "react";
import { motion } from "framer-motion";

const NyanLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-8 relative"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 blur-[60px] rounded-full animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <img 
          src="/nyan-cat.gif" 
          alt="Nyan Cat" 
          className="w-[140px] h-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        />
        
        <div className="flex flex-col items-center gap-2">
          <span className="font-syne font-bold text-fuchsia-400 text-lg tracking-wider animate-pulse uppercase">
            pyndu logs()
          </span>
          <span className="font-mono text-gray-500 text-xs tracking-[0.3em] uppercase">
            fetching data...
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default NyanLoader;
