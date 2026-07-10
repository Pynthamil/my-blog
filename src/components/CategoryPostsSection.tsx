import Link from "next/link";
import PaginatedPosts from "./PaginatedPosts";

interface CategoryPostsSectionProps {
  category: string;
  posts: any[];
  viewsMap: Record<string, number>;
}

export default function CategoryPostsSection({ category, posts, viewsMap }: CategoryPostsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="w-full flex justify-center px-4 py-8 relative z-20">
      <div className="w-full max-w-[1200px]">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <h2 className="font-syne text-[26px] md:text-[32px] font-extrabold tracking-tight text-[var(--text-primary)]">
            Latest {category} articles
          </h2>
          <Link
            href={`/categories/${category.toLowerCase()}`}
            className="text-sm md:text-base font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 group mb-1"
          >
            View all
            <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Paginated Grid for Category Posts */}
        <PaginatedPosts posts={posts} viewsMap={viewsMap} />
      </div>
    </section>
  );
}
