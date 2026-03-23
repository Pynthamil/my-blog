import PostCard, { PostCardProps } from "./PostCard";
import { getPosts } from "../../lib/hashnode";

export default async function RecentPosts() {
  const posts = await getPosts();

  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[900px]">
        {/* Section Header */}
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-800 via-purple-300 to-white bg-clip-text text-transparent mb-8">
          Recent Posts
        </h2>

        {/* Posts Container */}
        {/* We keep the outer dark container with glowing border per the dark theme design,
            but inside we place the new bright white cards */}
        <div className="glow-border-strong rounded-3xl bg-[#111115]/60 backdrop-blur-md p-6 md:p-8">
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

          {/* Grid — constrained width to keep cards compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post: PostCardProps, i: number) => (
              <PostCard key={i} {...post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
