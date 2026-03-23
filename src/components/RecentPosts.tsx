"use client";

import PostCard from "./PostCard";

const posts = [
  {
    title: "they said no...so i said bet",
    description: "Easily generates a readme which you can integrate to...",
    tag: "acm diaries",
    imageUrl: "/images/post-1.svg",
    imageBg: "bg-pink-100",
  },
  {
    title: "i joined the design team.. without knowing figma(???)",
    description: "Easily generates a readme which you can integrate to...",
    tag: "acm diaries",
    imageUrl: "/images/post-2.svg",
    imageBg: "bg-yellow-50",
  },
  {
    title: "notes that future me will thank me for...",
    description: "Easily generates a readme which you can integrate to...",
    tag: "codeSheet",
    imageUrl: "/images/post-3.svg",
    imageBg: "bg-pink-50",
  },
  {
    title: "i built this instead of studying for my exams...",
    description: "Easily generates a readme which you can integrate to...",
    tag: "projects",
    imageUrl: "/images/post-4.svg",
    imageBg: "bg-yellow-50",
  },
];

export default function RecentPosts() {
  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[1100px]">
        {/* Section Header */}
        <h2
          className="text-3xl md:text-4xl font-extrabold text-gradient-purple mb-8"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          Recent Posts
        </h2>

        {/* Posts Container */}
        <div className="glow-border-strong rounded-3xl bg-[#111115]/80 p-6 md:p-8">
          {/* See all link */}
          <div className="flex justify-end mb-6">
            <a
              href="/posts"
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
            >
              see all posts{" "}
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                ⟶
              </span>
            </a>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <PostCard key={i} {...post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
