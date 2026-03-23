"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

export default function SearchClient({ posts, children }: { posts: any[], children: React.ReactNode }) {
  return (
    <section className="w-full flex-col flex items-center px-4 w-full">
      <Suspense fallback={<div className="h-20 w-full animate-pulse bg-[#111115]/60 rounded-2xl max-w-[600px] mx-auto mb-10 mt-6"></div>}>
        <SearchBar />
      </Suspense>
      <Suspense fallback={<div className="text-gray-400">Loading search...</div>}>
        <SearchContent posts={posts} children={children} />
      </Suspense>
    </section>
  );
}

function highlightMatch(text: string | undefined | React.ReactNode, query: string): React.ReactNode {
  if (typeof text !== 'string') return text;
  if (!text) return "";
  if (!query) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="text-purple-300 font-bold bg-purple-500/10 rounded px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function SearchContent({ posts, children }: { posts: any[], children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredPosts = useMemo(() => {
    if (!query) return [];
    
    // Filter
    const matched = posts.filter(post => {
      const matchTitle = typeof post.title === 'string' && post.title.toLowerCase().includes(query);
      const matchDesc = typeof post.description === 'string' && post.description.toLowerCase().includes(query);
      const matchTags = Array.isArray(post.tags) && post.tags.some((t: string) => t.toLowerCase().includes(query));
      return matchTitle || matchDesc || matchTags;
    });

    // Highlight
    return matched.map(post => ({
      ...post,
      rawTitle: post.title,
      title: highlightMatch(post.title, query),
      description: highlightMatch(post.description, query),
    }));
  }, [posts, query]);

  if (!query) {
    return <div className="w-full flex flex-col items-center">{children}</div>;
  }

  return (
    <div className="w-full max-w-[1100px] flex flex-col items-center">
      {filteredPosts.length > 0 ? (
        <div className="w-full rounded-3xl glow-border-strong bg-[#111115]/60 backdrop-blur-md p-6 md:p-8">
           <h2 className="font-syne text-2xl font-bold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent mb-8">Search Results</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {filteredPosts.map((post, i) => (
               <PostCard key={i} {...post} />
             ))}
           </div>
        </div>
      ) : (
        <div className="w-full rounded-3xl glow-border-strong bg-[#111115]/60 backdrop-blur-md p-6 md:p-8">
          <EmptyState 
            title="nothing found..."
            description="try another keyword or tag"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            }
          />
        </div>
      )}
    </div>
  );
}
