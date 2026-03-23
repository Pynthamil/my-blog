"use client";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center pt-[140px] pb-16 px-4">
      {/* Emoticon Line */}
      <div className="flex items-center gap-3 mb-8 text-4xl md:text-5xl">
        <span className="font-bold text-white" style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}>
          if (
        </span>
        {/* Cute face circle */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-2xl md:text-3xl shadow-lg shadow-purple-500/20">
          <span role="img" aria-label="cute face">•ᴗ•</span>
        </div>
        <span className="font-bold text-white" style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}>
          ) →
        </span>
        {/* Terminal icon */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-700/60 border border-gray-600/50 flex items-center justify-center shadow-lg">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight mb-4"
        style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
      >
        <span className="text-white">Learn from my</span>
        <br />
        <span className="text-gradient-purple">experience.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-base md:text-lg text-center mt-4 max-w-lg">
        building in public so future me can laugh at this code
      </p>
    </section>
  );
}
