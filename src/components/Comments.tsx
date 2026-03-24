"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <section className="w-full mt-12 pt-12 border-t border-purple-500/10">
      <div className="mx-auto max-w-[720px]">
        <Giscus
          id="comments"
          repo="Pynthamil/my-blog"
          repoId="R_kgDORueBdw"
          category="Announcements"
          categoryId="DIC_kwDORueBd84CnWjS" // Placeholder: update with your actual category ID
          mapping="pathname"
          term="Welcome to giscus!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="transparent_dark"
          lang="en"
          loading="lazy"
        />
      </div>
    </section>
  );
}
