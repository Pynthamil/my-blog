"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GradientText from "./GradientText";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-[150px] md:pt-[180px] pb-24 px-4 overflow-hidden">
      {/* Immersive Background Glows */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] h-[500px] bg-gradient-to-br from-[#8494FF]/20 via-[#FFC3FC]/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] max-w-[600px] h-[300px] bg-[#6367FF]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center relative z-10 w-full"
      >
        {/* Code/Emoticon Graphic */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 text-4xl md:text-5xl cursor-default">
            <span className="font-syne font-bold text-foreground tracking-wider">
              if (
            </span>
            <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/SmileyFace.svg" 
                alt="cute face" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
            <span className="font-syne font-bold text-foreground tracking-wider">
              ) →
            </span>
            <div className="relative w-14 h-14 md:w-16 md:h-16 hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/TerminalIcon.svg" 
                alt="terminal icon" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="relative mb-6 md:mb-8 text-center w-full max-w-[1000px]">
          <h1
            className="font-syne text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-black leading-[1.05] tracking-tight text-[#8494FF] drop-shadow-[0_0_15px_rgba(132,148,255,0.3)]"
          >
            Learn from my <br className="hidden sm:block" />
            experience.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-[var(--text-secondary)] text-base md:text-xl text-center max-w-2xl font-medium tracking-wide mb-10 md:mb-12 leading-relaxed"
        >
          Building in public so future me can laugh at this code. 
          Documenting the wins, the spectacular failures, and everything in between.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0">
          <Link href="/posts" className="w-full sm:w-auto">
            <button className="w-full group relative px-8 py-3.5 md:py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-sm md:text-base tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Read the logs
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3.5 md:py-4 rounded-full bg-white/[0.03] border border-white/[0.1] text-[var(--text-primary)] font-semibold text-sm md:text-base tracking-wide hover:bg-white/[0.08] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              Who am I?
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
