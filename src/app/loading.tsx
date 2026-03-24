"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="relative">
        {/* Glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 blur-[40px] rounded-full animate-pulse" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="font-syne flex flex-col items-center leading-none mb-6">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-fuchsia-500 font-black text-3xl italic tracking-tighter"
            >
              pyndu
            </motion.span>
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-fuchsia-500 font-black text-3xl italic tracking-tighter"
            >
              logs()
            </motion.span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.2em] animate-pulse">
              Fetching logs...
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
