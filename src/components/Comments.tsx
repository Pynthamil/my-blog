"use client";

import CommentList from "./CommentList";

export default function Comments({ slug }: { slug: string }) {
  return (
    <section id="comments" className="w-full mt-16">
      <div className="mx-auto max-w-[820px] relative">
        {/* Ambient glow background */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-[150%] bg-gradient-to-b from-[#A78BFA]/[0.08] to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Custom Comments Container with premium styling */}
        <div 
          className="w-full mt-10 p-[2px] rounded-[32px] transition-all duration-300"
          style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(192,132,252,0.2))" }}
        >
          <div className="w-full h-full p-8 md:p-12 rounded-[30px] bg-[var(--bg-secondary)] relative overflow-hidden border border-[var(--border-glow)] shadow-2xl shadow-black/20">
            {/* Subtle gradient top border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A78BFA]/30 to-transparent" />
            
            {/* Title section for visual hierarchy */}
            <div className="mb-10 text-center">
              <h2 className="font-syne text-2xl md:text-3xl font-bold bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-primary)]/60 bg-clip-text text-transparent mb-2">
                Join the conversation
              </h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
                Share your thoughts, ask questions, or just say hi! Your email remains private.
              </p>
            </div>
            
            {/* The actual native comment system */}
            <CommentList slug={slug} />
          </div>
        </div>

      </div>
    </section>
  );
}
