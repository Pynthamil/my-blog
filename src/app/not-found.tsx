"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-fuchsia-600/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-syne text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/50 to-transparent opacity-20 select-none">
          404
        </h1>
        
        <div className="relative -mt-16 md:-mt-24">
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Lost in the logs?
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
            The page you're looking for has drifted into the void. It might have been moved or never existed at all.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 hover:border-purple-500/50 transition-all group shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Return Home
          </Link>
        </div>
      </motion.div>

      {/* Subtle floating dots enhancement for 404 vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: [null, (Math.random() - 0.5) * 50 + "px"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    </main>
  );
}
