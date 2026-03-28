import Hero from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";
import Newsletter from "@/components/Newsletter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pyndu logs | Developer Blog & Build Showcase",
  description: "Experiments in Next.js, Notion, and minimalist design. Learning in public and documenting the journey of a developer.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <RecentPosts />
      <Newsletter />
    </main>
  );
}
