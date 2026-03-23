import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";

/* ── Sample post data (replace with CMS / MDX later) ── */
const post = {
  title: "using analytics again with simple analytics",
  date: "10th Mar 2025",
  readingTime: "5 min read",
  tags: ["Website", "Analytics", "Privacy"],
  imageUrl: "/images/post-1.svg",
  imageBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
};

const relatedPosts = [
  {
    title: "rules i follow when typesetting",
    description:
      "I've developed some habits over the years when it comes to the display of text in a design with the aim of readability and aesthetic balance.",
    category: "Typography",
    date: "10th Mar 2025",
    categoryIcon: "ai" as const,
    imageUrl: "/images/post-2.svg",
    imageBg: "bg-[#f8f6f0]",
  },
  {
    title: "notes that future me will thank me for...",
    description: "Easily generates a readme which you can integrate to...",
    category: "codeSheet",
    date: "8th Mar 2025",
    categoryIcon: "folder" as const,
    imageUrl: "/images/post-3.svg",
    imageBg: "bg-[#fdf2f8]",
  },
];

export default function BlogPost() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />

      {/* ── Article wrapper ── */}
      <article className="relative w-full flex flex-col items-center pt-[120px] pb-16 px-4">
        {/* Subtle ambient focus behind content */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[500px] bg-[#0f0f11] opacity-40 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Back link */}
        <div className="w-full max-w-[720px] mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-purple-400 transition-colors inline-flex items-center gap-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to posts
          </Link>
        </div>

        {/* ── Header ── */}
        <header className="w-full max-w-[720px] mb-10">
          {/* Meta chips row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 text-purple-300"
              >
                {tag}
              </span>
            ))}
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-500 text-sm">{post.readingTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-syne text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-white mb-2">
            {post.title}
          </h1>
        </header>

        {/* ── Cover Image ── */}
        <div className="w-full max-w-[720px] mb-12">
          <div
            className={`relative w-full aspect-[16/9] ${post.imageBg} rounded-2xl overflow-hidden`}
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ── Article Body (glass container) ── */}
        <div className="w-full max-w-[720px]">
          <div className="glow-border-strong rounded-3xl bg-[#111115]/60 backdrop-blur-md px-6 md:px-10 py-10 md:py-12">
            <div className="prose-blog max-w-[65ch] mx-auto">
              <p>
                I was seeing an increase in my &ldquo;serverless&rdquo; usage and
                it didn&rsquo;t make sense. So I decided to switch things up and
                add <a href="#">Simple Analytics</a> to my website. Here&rsquo;s
                a quick review of the experience so far.
              </p>

              <h2>Why I switched</h2>
              <p>
                After months of relying on a generic analytics tool, I noticed
                the data didn&rsquo;t align with what I was actually seeing in my
                server logs. Page-view counts were inflated by bots, the
                real-time panel was unreliable, and worst of all&mdash;I was
                burning through my free tier.
              </p>

              <blockquote>
                &ldquo;The best analytics tool is the one that gives you
                actionable data without compromising your users&rsquo;
                privacy.&rdquo;
              </blockquote>

              <h2>Setting it up</h2>
              <p>
                Installation was straightforward. Drop a single{" "}
                <code>&lt;script&gt;</code> tag into your layout and you&rsquo;re
                done. No cookie banners, no GDPR headaches.
              </p>

              <pre>
                <code>{`// Add to your layout.tsx or _document
<script
  async
  defer
  src="https://scripts.simpleanalyticscdn.com/latest.js"
/>`}</code>
              </pre>

              <h3>Key features I like</h3>
              <ul>
                <li>Privacy-first: no cookies, no personal data collected</li>
                <li>Lightweight script (~3 KB)</li>
                <li>Clean, minimal dashboard</li>
                <li>Built-in goal & event tracking</li>
                <li>Works without any configuration</li>
              </ul>

              <h2>Performance impact</h2>
              <p>
                The script is tiny and loaded asynchronously, so there is
                virtually <strong>zero impact</strong> on Core Web Vitals. My
                Lighthouse scores stayed identical before and after installation.
              </p>

              <ol>
                <li>Install the script (one line of HTML)</li>
                <li>Deploy your site</li>
                <li>Watch real, human traffic appear in the dashboard</li>
              </ol>

              <hr />

              <h2>Final thoughts</h2>
              <p>
                If you care about privacy, simplicity, and clean data, Simple
                Analytics is a fantastic choice. I&rsquo;ve been using it for a
                few weeks now and the difference in data quality is night and
                day. Highly recommend giving it a shot.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      <section className="w-full flex justify-center px-4 pt-4 pb-16">
        <div className="w-full max-w-[1100px]">
          <h2 className="font-syne text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-800 via-purple-300 to-white bg-clip-text text-transparent mb-8">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rp, i) => (
              <PostCard key={i} {...rp} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
