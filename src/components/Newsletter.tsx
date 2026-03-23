"use client";

export default function Newsletter() {
  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[1100px]">
        <div className="glow-border-strong rounded-3xl bg-[#111115]/80 px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Text */}
          <div className="flex-shrink-0">
            <h2
              className="text-2xl md:text-3xl font-extrabold text-white mb-1.5"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              Stay in the loop.
            </h2>
            <p className="text-sm text-gray-500">
              {"//"}<span className="text-gray-400">New post every week. Let&apos;s grind together!!!</span>
            </p>
          </div>

          {/* Form */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-[#1a1a20] border border-gray-700/50 text-sm text-gray-300 rounded-lg px-4 py-2.5 w-full md:w-64 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-gray-600"
            />
            <button className="btn-purple text-white text-xs font-bold px-5 py-2.5 rounded-lg uppercase tracking-wider whitespace-nowrap cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
