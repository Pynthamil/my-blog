import HorizontalPostCard from "@/components/HorizontalPostCard";
import { getPosts } from "../../../lib/hashnode";
import { supabase } from "@/lib/supabase";
import GradientText from "@/components/GradientText";
import { Metadata } from "next";

import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all articles, tutorials, and experiments. Covering Next.js, Notion, coding projects, and more.",
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
  let pageInfo = { hasNextPage: false, endCursor: null };
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
      <div className="w-full max-w-[1100px] px-4">
        <GradientText
          as="h1"
          className="font-syne text-4xl md:text-5xl font-extrabold mb-4"
        >
          All Posts
        </GradientText>
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
        <Pagination hasNextPage={pageInfo.hasNextPage} endCursor={pageInfo.endCursor} />
      </div>
    </main>
  );
}
