import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <RecentPosts />
      <Newsletter />
      <Footer />
    </main>
  );
}
