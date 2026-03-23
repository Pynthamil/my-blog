import SearchClient from "./SearchClient";
import RecentPosts from "@/components/RecentPosts";
import { getPosts } from "../../../lib/hashnode";

export default async function SearchPage() {
  const posts = await getPosts();
  
  return (
    <main className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <SearchClient posts={posts}>
        <RecentPosts />
      </SearchClient>
    </main>
  );
}
