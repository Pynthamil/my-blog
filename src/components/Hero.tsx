"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-[140px] pb-16 px-4">
      {/* Ultra-soft ambient focus layer to gently dim the grid dots right behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[#0f0f11] opacity-50 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      {/* Emoticon Line */}
      <div className="flex items-center gap-3 mb-8 text-4xl md:text-5xl">
        <span className="font-syne font-bold text-white">
          if (
        </span>
        {/* Cute face image */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
          <Image src="/images/SmileyFace.svg" alt="cute face" fill className="object-contain" priority />
        </div>
        <span className="font-syne font-bold text-white">
          ) →
        </span>
        {/* Terminal icon */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
          <Image src="/images/TerminalIcon.svg" alt="terminal icon" fill className="object-contain" priority />
        </div>
      </div>

      {/* Title */}
      <h1
        className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight mb-4 bg-gradient-to-r from-fuchsia-400 via-purple-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(232,121,249,0.3)]"
      >
        Learn from my
        <br />
        experience.
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-base md:text-lg text-center mt-4 max-w-lg">
        building in public so future me can laugh at this code
      </p>
    </section>
  );
}
