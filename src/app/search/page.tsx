import type { Metadata } from "next";
import SearchClient from "./SearchClient";
import RecentPosts from "@/components/RecentPosts";
import { getPosts } from "../../../lib/hashnode";

export const metadata: Metadata = {
  title: "Search",
  description: "Search logs, notes, and experiments on pyndu logs.",
  alternates: {
    canonical: "/search",
  },
};

export default async function SearchPage() {
  let posts: any[] = [];
  try {
    posts = await getPosts();
  } catch (err) {
    console.error("Failed to fetch posts for search:", err);
  }
  
  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <SearchClient posts={posts}>
        <RecentPosts />
      </SearchClient>
    </main>
  );
}
