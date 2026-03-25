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
        className="w-full flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Content side */}
        <div className="text-center md:text-left">
          <p className="text-gray-500 text-sm max-w-sm">
            If this helped you, consider supporting my work. ☕
          </p>
        </div>

        {/* Button side */}
        <div className="flex-shrink-0">
          <Link
            href="https://buymeacoffee.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/95 text-black hover:bg-white transition-all duration-300 active:scale-95 group/btn"
            aria-label="Buy me a coffee"
          >
            <span className="text-sm font-bold uppercase tracking-widest">buy me a coffee</span>
            <span className="text-lg group-hover/btn:rotate-12 transition-transform duration-300">☕</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportSection;
