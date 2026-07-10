import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import ExploreCategories from "@/components/ExploreCategories";
import RecentPosts from "@/components/RecentPosts";
import Newsletter from "@/components/Newsletter";
import NyanLoader from "@/components/NyanLoader";
import { Metadata } from "next";
import { Suspense } from "react";

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
      <Suspense fallback={
        <div className="py-20 flex items-center justify-center min-h-[400px]">
          <NyanLoader />
        </div>
      }>
        <FeaturedPosts />
        <ExploreCategories />
        <RecentPosts />
      </Suspense>
      <Newsletter />
    </main>
  );
}
