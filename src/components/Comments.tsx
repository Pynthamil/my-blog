"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <section className="w-full mt-16">
      <div className="mx-auto max-w-[760px]">

        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-gray-500 font-mono text-sm font-medium">//</span>
          <h2 className="font-syne text-xl font-bold text-white tracking-tight">
            comments
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
        </div>

        {/* Giscus Card */}
        <div
          className="p-[1.5px] rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #A69EFF 0%, #C084FC 50%, #E8B4F4 100%)",
          }}
        >
          <div className="rounded-[14px] bg-[#111115]/90 backdrop-blur-md px-5 py-6">
            <Giscus
              id="comments"
              repo="Pynthamil/my-blog"
              repoId="R_kgDORueBdw"
              category="General"
              categoryId="DIC_kwDORueBd84C5KdE"
              mapping="pathname"
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
