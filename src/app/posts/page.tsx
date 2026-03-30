import HorizontalPostCard from "@/components/HorizontalPostCard";
import { getPosts } from "../../../lib/hashnode";
import { supabase } from "@/lib/supabase";
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

  // Batch fetch views from Supabase for efficiency
  const slugs = posts.map((p: any) => p.href.split('/').pop()).filter(Boolean) as string[];
  
  let viewsMap: Record<string, number> = {};
  if (slugs.length > 0) {
    try {
      const { data } = await supabase
        .from("post_views")
        .select("slug, count")
        .in("slug", slugs);
      
      if (data) {
        viewsMap = data.reduce((acc, curr) => ({ ...acc, [curr.slug]: curr.count }), {});
      }
    } catch (err) {
      console.error("Failed to batch fetch views:", err);
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[1100px] px-4">
        <h1 className="font-syne text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#9333ea] bg-clip-text text-transparent mb-4">
          All Posts
        </h1>
        <p className="text-muted mb-10 pl-1 font-medium tracking-wide">
          <span className="text-purple-500/80 mr-2">{"//"}</span> everything written so far.
        </p>

        <div className="flex flex-col gap-5 md:gap-6">
          {posts.map((post: any, i: number) => {
            const slug = post.href.split('/').pop() || "";
            return (
              <HorizontalPostCard 
                key={i} 
                {...post} 
                priority={i < 2} 
                views={viewsMap[slug] || 0}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
