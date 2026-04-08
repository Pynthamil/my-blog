import PostCard, { PostCardProps } from "./PostCard";
import EmptyState from "./EmptyState";
import { getPosts } from "../../lib/hashnode";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import GradientText from "./GradientText";

export default async function RecentPosts() {
  let posts: any[] = [];
  let viewsMap: Record<string, number> = {};

  try {
    posts = await getPosts();
    const recentPosts = posts.slice(0, 4);

    // Batch fetch views from Supabase for efficiency
    const slugs = recentPosts.map((p: any) => p.href.split('/').pop()).filter(Boolean) as string[];
    
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

  const recentPosts = posts.slice(0, 4);

  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[1100px]">
        {/* Section Header */}
        <GradientText
          as="h2"
          className="font-syne text-3xl md:text-4xl font-extrabold mb-8"
        >
          Recent Posts
        </GradientText>

        {/* Posts Container */}
        <div className="glow-border-strong rounded-3xl recent-posts-container backdrop-blur-md p-6 md:p-8">
          {/* See all link */}
          <div className="flex justify-end mb-6 relative z-10">
            <Link
              href="/posts"
              className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1 group"
            >
              see all posts{" "}
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                ⟶
              </span>
            </Link>
          </div>

          {/* Grid — constrained width to keep cards compact */}
          {recentPosts.length === 0 ? (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.map((post: any, i: number) => {
                const slug = post.href.split('/').pop() || "";
                return (
                  <PostCard 
                    key={i} 
                    {...post} 
                    priority={i === 0} 
                    variant="recent" 
                    views={viewsMap[slug] || 0}
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
