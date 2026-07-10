import PostCard from "@/components/PostCard";
import { getPosts } from "../../../lib/mdx";
import { supabase } from "@/lib/supabase";
import GradientText from "@/components/GradientText";
import { Metadata } from "next";

import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all blogs, tutorials, and experiments. Covering Next.js, Notion, coding projects, and more.",
  alternates: {
    canonical: "/posts",
  },
};

export default async function PostsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ after?: string }> 
}) {
  const { after } = await searchParams;
  let posts: any[] = [];
  let pageInfo: { hasNextPage: boolean; endCursor: string | null } = { hasNextPage: false, endCursor: null };
  let viewsMap: Record<string, number> = {};

  try {
    const data = await getPosts(10, after || null);
    posts = data.posts;
    pageInfo = data.pageInfo;

    // Batch fetch views from Supabase for efficiency
    const slugs = posts.map((p: any) => p.href.split('/').pop()).filter(Boolean) as string[];
    
    if (slugs.length > 0) {
      try {
        const { data: viewsData } = await supabase
          .from("post_views")
          .select("slug, count")
          .in("slug", slugs);
        
        if (viewsData) {
          viewsMap = viewsData.reduce((acc, curr) => ({ ...acc, [curr.slug]: curr.count }), {});
        }
      } catch (err) {
        console.error("Failed to batch fetch views:", err);
      }
    }
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    // posts remains []
  }

  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-6">
        <GradientText
          as="h1"
          className="font-syne text-4xl md:text-5xl font-extrabold mb-4"
        >
          All Posts
        </GradientText>
        <p className="text-muted mb-10 pl-1 font-medium tracking-wide">
          <span className="text-purple-500/80 mr-2">{"//"}</span> everything written so far.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post: any, i: number) => {
            const slug = post.href.split('/').pop() || "";
            return (
              <PostCard 
                key={i} 
                {...post} 
                priority={i < 4} 
                variant="recent"
                views={viewsMap[slug] || 0}
              />
            );
          })}
        </div>
        <Pagination hasNextPage={pageInfo.hasNextPage} endCursor={pageInfo.endCursor} />
      </div>
    </main>
  );
}
