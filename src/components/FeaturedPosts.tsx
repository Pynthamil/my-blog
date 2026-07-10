import PostCard from "./PostCard";
import EmptyState from "./EmptyState";
import { getPosts } from "../../lib/mdx";
import { supabase } from "@/lib/supabase";

export default async function FeaturedPosts() {
  let posts: any[] = [];
  let viewsMap: Record<string, number> = {};

  try {
    const data = await getPosts();
    posts = data.posts.filter((p) => p.featured);

    // Batch fetch views from Supabase for efficiency
    const slugs = posts.map((p: any) => p.href.split('/').pop()).filter(Boolean) as string[];
    
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
        console.error("Failed to batch fetch views for featured:", err);
      }
    }
  } catch (err) {
    console.error("Failed to fetch featured posts:", err);
  }

  if (posts.length === 0) return null;

  return (
    <section className="w-full flex justify-center px-4 pt-20 pb-4 relative z-20">
      <div className="w-full max-w-[1200px]">
        {/* Section Header */}
        <h2 className="font-syne text-[32px] md:text-[42px] font-black mb-8 md:mb-12 tracking-tight gradient-text-base drop-shadow-[0_0_15px_rgba(132,148,255,0.3)] inline-block">
          Featured Blog
        </h2>

        {/* Single Massive Featured Post */}
        <div className="w-full">
          {[posts[0]].map((post: any, i: number) => {
            const slug = post.href.split('/').pop() || "";
            return (
              <PostCard 
                key={i} 
                {...post} 
                priority={true} 
                variant="featured" 
                views={viewsMap[slug] || 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
