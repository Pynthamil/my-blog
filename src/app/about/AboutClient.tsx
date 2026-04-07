"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import Image from "next/image";

export default function AboutClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] as any // Avoid lint errors with cubic-bezier
      }
    }
  };

  return (
    <div suppressHydrationWarning className="min-h-screen relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <main className="pt-32 pb-24 flex flex-col items-center">
        <motion.div 
          className="w-full max-w-[800px] px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <GradientText
              as="h1"
              className="font-syne text-5xl md:text-7xl font-black leading-[1.1] tracking-tight"
            >
              About the<br />Logs.
            </GradientText>
            <p className="text-muted mt-6 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              {"//"} documenting the journey of building software, exploring tech, and chasing edge cases.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div 
            variants={itemVariants}
            className="about-container rounded-[32px] p-8 md:p-12 mb-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="font-syne text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm italic">
                  01
                </span>
                The Mission
              </h2>
              <p className="text-[var(--text-primary)] leading-relaxed mb-6 text-[16px] md:text-[17px]">
                Hey! I&apos;m a developer who loves building in public. This blog isn&apos;t just a portfolio—it&apos;s a raw documentation of my 
                <span className="text-purple-400 font-bold mx-1">wins</span>, my 
                <span className="text-pink-400 font-bold mx-1">spectacular failures</span>, 
                and all the random technical rabbit holes I fall into.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-[16px] md:text-[17px]">
                I believe that the best way to learn is to explain things to someone else (even if that someone is just my future self trying to debug 
                a commit from three months ago).
              </p>
            </div>
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
              <span className="font-syne font-black text-[200px] leading-none">?</span>
            </div>
          </motion.div>

          {/* Secondary Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div 
              variants={itemVariants}
              className="about-container rounded-[28px] p-8"
            >
              <h3 className="font-syne text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-8 h-8 relative opacity-80">
                  <Image src="/images/TerminalIcon.svg" alt="Stack" fill className="object-contain" />
                </div>
                The Stack
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Everything here is powered by <span className="text-foreground font-semibold">Next.js</span>, 
                <span className="text-foreground font-semibold">Tailwind CSS</span>, 
                <span className="text-foreground font-semibold">Supabase</span> (for views, likes, & comments), 
                and <span className="text-foreground font-semibold">Hashnode</span> for posts. 
                Hosted on Vercel for that sweet instant-deploy high.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="about-container rounded-[28px] p-8"
            >
              <h3 className="font-syne text-xl font-bold text-foreground mb-4">
                Let&apos;s Grind
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                I prefer clean code and pushing straight to main. If you&apos;re building something cool, reach out!
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/Pynthamil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted hover:text-purple-400 transition-colors"
                >
                  GitHub
                </a>
                <span className="text-muted/30">•</span>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted hover:text-purple-400 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer note */}
          <motion.p 
            variants={itemVariants}
            className="text-center text-[var(--purple-600)] italic text-sm opacity-80"
          >
            // more details coming soon as i survive more bug fixes
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
