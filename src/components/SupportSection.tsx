"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SupportSectionProps {
  className?: string;
}

const SupportSection: React.FC<SupportSectionProps> = ({ className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full relative group"
      >
        {/* Subtle background glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10 md:py-12 bg-[#16161a]/60 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Content side */}
          <div className="text-center md:text-left">
            <h4 className="font-syne text-xl font-bold text-white tracking-tight mb-2">
              enjoying the reading experience?
            </h4>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-sm">
              if this helped you, you can support my work ☕
            </p>
          </div>

          {/* Button side */}
          <div className="flex-shrink-0">
            <Link
              href="https://buymeacoffee.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/95 text-black hover:bg-white hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 active:scale-95 group/btn"
              aria-label="Buy me a coffee"
            >
              <span className="text-sm font-bold uppercase tracking-widest">buy me a coffee</span>
              <div className="relative w-6 h-6 flex items-center justify-center bg-yellow-400/10 rounded-full group-hover/btn:rotate-12 transition-transform duration-300">
                <span className="text-sm">☕</span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportSection;
