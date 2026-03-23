"use client";

import PostCard, { PostCardProps } from "./PostCard";

const posts: PostCardProps[] = [
  {
    title: "using analytics again with simple analytics",
    description: "I was seeing an increase in my 'serverless' usage and it didn't make sense. So I decided to add Simple Analytics and wanted to share a review of this privacy focused service.",
    category: "Website",
    date: "10th Mar 2025",
    categoryIcon: "folder",
    imageUrl: "/images/post-1.svg",
    imageBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    title: "rules i follow when typesetting",
    description: "I've developed some habits over the years when it comes to the display of text in a design with the aim of readability and aesthetic balance. And it feels like it could be useful to...",
    category: "Typography",
    date: "10th Mar 2025",
    categoryIcon: "ai",
    imageUrl: "/images/post-2.svg",
    imageBg: "bg-[#f8f6f0]",
  },
  {
    title: "notes that future me will thank me for...",
    description: "Easily generates a readme which you can integrate to...",
    category: "codeSheet",
    date: "8th Mar 2025",
    categoryIcon: "folder",
    imageUrl: "/images/post-3.svg",
    imageBg: "bg-[#fdf2f8]",
  },
  {
    title: "i built this instead of studying for my exams...",
    description: "Easily generates a readme which you can integrate to...",
    category: "projects",
    date: "5th Mar 2025",
    categoryIcon: "folder",
    imageUrl: "/images/post-4.svg",
    imageBg: "bg-[#fffbeb]",
  },
];

export default function RecentPosts() {
  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[1100px]">
        {/* Section Header */}
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-gradient-purple mb-8">
          Recent Posts
        </h2>

        {/* Posts Container */}
        {/* We keep the outer dark container with glowing border per the dark theme design,
            but inside we place the new bright white cards */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <PostCard key={i} {...post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
