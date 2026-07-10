import EmptyState from "./EmptyState";
import { getPosts } from "../../lib/mdx";
import { supabase } from "@/lib/supabase";
import CategoryPostsSection from "./CategoryPostsSection";
import Link from "next/link";

export default async function RecentPosts() {
  let posts: any[] = [];
  let viewsMap: Record<string, number> = {};

  try {
    const data = await getPosts();
    posts = data.posts;

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
        console.error("Failed to batch fetch views:", err);
      }
    }
  } catch (err) {
    console.error("Failed to fetch recent posts:", err);
    // posts remains []
  }

  const recentPosts = posts.slice(0, 3);

  return (
    <section className="w-full flex justify-center px-4 py-16 relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="w-full max-w-[1200px] relative z-10">
        {/* Posts Container */}
        <div>

          {/* Categorized Rows */}
          {posts.length === 0 ? (
            <EmptyState
              title="no posts yet..."
              description="building in public means starting empty ✨"
              buttonText="write first post"
              buttonLink="https://hashnode.com/dashboard"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
              }
            />
          ) : (
            <div className="flex flex-col gap-12 w-full pt-4">
              {["Development", "Design", "Insights", "Other"].map((category) => {
                const categoryPosts = posts.filter(post => post.tags?.includes(category));
                if (categoryPosts.length === 0) return null;
                
                return (
                  <CategoryPostsSection 
                    key={category} 
                    category={category} 
                    posts={categoryPosts} 
                    viewsMap={viewsMap} 
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
