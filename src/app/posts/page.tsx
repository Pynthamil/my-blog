import PostCard, { PostCardProps } from "@/components/PostCard";
import { getPosts } from "../../../lib/hashnode";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[1100px] px-4">
        <h1 className="font-syne text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent mb-4">
          All Posts
        </h1>
        <p className="text-gray-400 mb-10">
          {"//"} everything written so far.
        </p>

        <div className="rounded-3xl glow-border-strong bg-[#111115]/60 backdrop-blur-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post: PostCardProps, i: number) => (
              <PostCard key={i} {...post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
