import AnimatedGradientText from "@/components/AnimatedGradientText";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import { getPosts } from "../../../lib/hashnode";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "Explore posts by category and topics. GitHub, Next.js, Notion, and more.",
  alternates: {
    canonical: "/tags",
  },
};

export default async function TagsPage() {
  const posts = await getPosts();

  // Automatically parse all available tags from the Headless CMS payload
  const tagCounts: Record<string, number> = {};
  posts.forEach((post: any) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  const uniqueTags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-[900px] px-4 text-center">
        <AnimatedGradientText
          as="h1"
          className="font-syne text-4xl md:text-5xl font-extrabold mb-4"
        >
          Tags
        </AnimatedGradientText>
        <p className="text-muted mb-10 text-center">
            {"//"} explore what I've been writing about.
          </p>

          {uniqueTags.length === 0 ? (
            <div className="rounded-3xl glow-border-strong tags-container backdrop-blur-md p-6 md:p-8">
              <EmptyState
                title="nothing here yet"
                description="this category is waiting for its moment"
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
                    <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                }
              />
            </div>
          ) : (
            <div className="rounded-3xl glow-border-strong tags-container backdrop-blur-md p-8 md:p-12">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {uniqueTags.map((tag) => (
                  <Link
                    href={`/search?q=${encodeURIComponent(tag.name)}`}
                    key={tag.name}
                    className="tags-card"
                  >
                    {/* Subtle hover gradient background */}
                    <div className="tags-card-gradient" />

                    <span className="tags-card-text">
                      {tag.name}
                    </span>

                    {/* Tiny counter badge */}
                    <span className="tags-card-badge">
                      {tag.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
  );
}
