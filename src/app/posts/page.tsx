import HorizontalPostCard from "@/components/HorizontalPostCard";
import { getPosts } from "../../../lib/hashnode";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all articles, tutorials, and experiments. Covering Next.js, Notion, coding projects, and more.",
  alternates: {
    canonical: "/posts",
  },
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[1100px] px-4">
        <h1 className="font-syne text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#D8D7FE] to-white bg-clip-text text-transparent mb-4">
          All Posts
        </h1>
        <p className="text-gray-400 mb-10 pl-1 font-medium tracking-wide">
          <span className="text-purple-500/80 mr-2">{"//"}</span> everything written so far.
        </p>

        <div className="flex flex-col gap-5 md:gap-6">
          {posts.map((post: any, i: number) => (
            <HorizontalPostCard key={i} {...post} priority={i < 2} />
          ))}
        </div>
      </div>
    </main>
  );
}
