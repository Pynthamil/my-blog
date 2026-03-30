"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-[140px] pb-16 px-4">
      {/* Ultra-soft ambient focus layer to gently dim the grid dots right behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[var(--ambient-glow)] opacity-50 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Emoticon Line */}
      <div className="flex items-center gap-3 mb-8 text-4xl md:text-5xl">
        <span className="font-syne font-bold text-foreground">
          if (
        </span>
        {/* Cute face image */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-transform duration-300">
          <Image 
            src="/images/SmileyFace.svg" 
            alt="cute face illustration" 
            fill 
            className="object-contain" 
            priority 
            sizes="(max-width: 768px) 64px, 80px"
          />
        </div>
        <span className="font-syne font-bold text-foreground">
          ) →
        </span>
        {/* Terminal icon */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 hover:scale-105 transition-transform duration-300">
          <Image 
            src="/images/TerminalIcon.svg" 
            alt="terminal icon illustration" 
            fill 
            className="object-contain" 
            priority 
            sizes="(max-width: 768px) 56px, 64px"
          />
        </div>
      </div>

      {/* Title */}
      <h1
        className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight mb-4 bg-gradient-to-r from-[var(--hero-gradient-start)] via-[var(--hero-gradient-mid)] to-[var(--hero-gradient-end)] bg-clip-text text-transparent"
      >
        Learn from my
        <br />
        experience.
      </h1>

      {/* Subtitle */}
      <p className="text-muted text-base md:text-lg text-center mt-4 max-w-lg">
        building in public so future me can laugh at this code
      </p>
    </section>
  );
}
