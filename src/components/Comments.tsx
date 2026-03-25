"use client";

import Giscus from "@giscus/react";

export default function Comments({ slug }: { slug: string }) {
  return (
    <section id="comments" className="w-full mt-16">
      <div className="mx-auto max-w-[820px] relative">
        {/* Subtle ambient glow fallback */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-[150%] bg-purple-600/[0.02] blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Giscus Container — Clean Layout */}
        <div className="w-full pt-8">
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
    </section>
  );
}
