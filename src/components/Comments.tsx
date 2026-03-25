"use client";

import Giscus from "@giscus/react";

export default function Comments({ slug }: { slug: string }) {
  return (
    <section id="comments" className="w-full mt-16">
      <div className="mx-auto max-w-[820px] relative">
        {/* Subtle ambient glow fallback */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-[150%] bg-purple-600/[0.02] blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Giscus Container — Premium Boxed Layout with Thick Gradient Border */}
        <div 
          className="w-full mt-10 p-[4px] rounded-[32px] transition-all duration-300 shadow-2xl"
          style={{ background: "linear-gradient(135deg, #A69EFF, #E8B4F4)" }}
        >
          <div className="w-full h-full p-8 md:p-12 rounded-[29px] bg-[#0F0F11] relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
            
            <Giscus
              id={`comments-${slug}`}
              repo="Pynthamil/my-blog"
              repoId="R_kgDORueBdw"
              category="General"
              categoryId="DIC_kwDORueBd84C5KdE"
              mapping="specific"
              term={slug}
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="https://my-blog-tan-tau.vercel.app/giscus-theme.css"
              lang="en"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
