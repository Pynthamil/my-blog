import Hero from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <RecentPosts />
      <Newsletter />
    </main>
  );
}
