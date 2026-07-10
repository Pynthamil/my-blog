import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import ShareButtons from "@/components/ShareButtons";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import PostCard, { PostCardProps } from "@/components/PostCard";
import ImageZoom from "@/components/ImageZoom";
import ViewCount from "@/components/ViewCount";
import GradientText from "@/components/GradientText";

import { getPost, getPosts } from "../../../../lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";

function extractHeadings(markdown: string) {
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\-_:.]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

const components = {
  img: (props: any) => {
    const caption = props.title || props.alt || "";
    if (caption && !["image", "blog post cover", "cover", "undefined", "null"].includes(caption.toLowerCase())) {
      return (
        <span className="block my-6">
          <img {...props} />
          <span className="block text-center text-sm text-muted mt-2">{caption}</span>
        </span>
      );
    }
    return (
      <span className="block my-6">
        <img {...props} />
      </span>
    );
  },
  p: (props: any) => <div className="mb-[1.35rem]" {...props} />
};


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://my-blog-tan-tau.vercel.app";
  const toAbsoluteUrl = (url: string) => (url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`);
  const previewImageUrl = toAbsoluteUrl(post.imageUrl);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${baseUrl}/posts/${slug}`,
      siteName: "pyndu logs",
      images: [
        {
          url: previewImageUrl,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [previewImageUrl]
    },
    alternates: {
      canonical: `${baseUrl}/posts/${slug}`,
    },
  };
}

function getSimilarityScore(post1: any, post2: any) {
  const tags1 = new Set(post1.tags || []);
  const tags2 = new Set(post2.tags || []);
  let intersection = 0;
  for (const tag of tags1) {
    if (tags2.has(tag)) intersection++;
  }
  return intersection;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  // Fetch posts to build the mesh
  const { posts: allPosts } = await getPosts(50);

  // 1. Calculate Related Posts based on similarity
  const relatedPosts = allPosts
    .filter((p: any) => !p.href.endsWith(`/${slug}`))
    .map((p: any) => ({
      ...p,
      score: getSimilarityScore(post, p)
    }))
    .sort((a: any, b: any) => b.score - a.score || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  // Extract TOC Headings from Markdown
  const headings = extractHeadings(post.content);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://my-blog-tan-tau.vercel.app";
  const toAbsoluteUrl = (url: string) =>
    url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  const postUrl = `${baseUrl}/posts/${slug}`;
  const publishedISO = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [toAbsoluteUrl(post.imageUrl)],
    datePublished: publishedISO,
    author: {
      "@type": "Person",
      name: post.author.name,
      image: post.author.picture,
    },
    publisher: {
      "@type": "Organization",
      name: "pyndu logs",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/TerminalIcon.svg`,
      },
    },
    url: postUrl,
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  // Fetching logic moved up for mesh integration

  return (
    <main className="flex-1 flex flex-col">
      <Script id={`json-ld-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <SyntaxHighlighter />
      <ImageZoom />

      {/* ── Article wrapper ── */}
      <article className="relative w-full flex flex-col items-center pt-[120px] pb-16 px-4">
        {/* Subtle ambient focus behind content */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[500px] bg-[var(--ambient-glow)] opacity-40 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Back link */}
        <div className="w-full max-w-[720px] mb-10">
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-purple-500 transition-colors inline-flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
            </div>
            Back to posts
          </Link>
        </div>

        {/* ── Header ── */}
        <header className="w-full max-w-[720px] mb-10">

          {/* Author Profile Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-purple-500/30 shadow-[var(--card-shadow)] bg-[var(--bg-secondary)]">
                <Image src={post.author.picture} alt={post.author.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-syne font-bold text-foreground tracking-wide">{post.author.name}</span>
                <div className="flex items-center gap-2 text-[13px] text-muted">
                  <span>{post.date}</span>
                  <span className="text-gray-700">•</span>
                  <span>{post.readingTime}</span>
                  <span className="text-gray-700">•</span>
                  <ViewCount slug={slug} hideCount={true} />
                </div>
              </div>
            </div>

            {/* Meta chips row */}
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-purple-500/20 bg-[var(--bg-secondary)] text-purple-400 shadow-inner"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <GradientText
            as="h1"
            className="font-syne text-2xl md:text-3xl lg:text-4xl font-extrabold leading-[1.1] tracking-[-0.03em]"
          >
            {post.title}
          </GradientText>
        </header>

        {/* ── Cover Image ── */}
        <div className="w-full max-w-[720px] mb-12">
          <div
            className={`relative w-full aspect-[16/9] ${post.imageBg} rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 bg-white`}
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

        {/* Cute face image */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-transform duration-300">
        </div>

        {/* ── Content & TOC Layout ── */}
        <div className="relative w-full max-w-[1280px] flex items-start justify-center xl:justify-between gap-8">

          {/* ── TOC (Left Sidebar) ── */}
          <div className="hidden xl:block w-[240px] shrink-0">
            <TableOfContents headings={headings} />
          </div>

          {/* ── Article Body ── */}
          <div className="relative w-full max-w-[720px] shrink-0">
            {/* Soft ambient mask to dim the dot grid behind body text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-[var(--ambient-glow)] opacity-45 blur-[100px] rounded-full pointer-events-none -z-10" />
            <div className="prose-blog w-full max-none text-foreground leading-relaxed mb-16">
              <MDXRemote 
                source={post.content} 
                components={components} 
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug],
                  }
                }}
              />
            </div>

            {/* ── Footer Interaction Area ── */}
            <div className="w-full flex flex-col gap-12 mt-16 mb-20 px-4 md:px-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
                <div className="flex flex-col text-center md:text-left">
                  <h4 className="text-foreground font-syne font-bold text-lg mb-1">
                    Enjoyed this post?
                  </h4>
                  <p className="text-muted text-sm">
                    Leave a like or share it with your network.
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <LikeButton slug={slug} initialCount={post.reactionCount} />
                  <ShareButtons title={post.title} />
                </div>
              </div>

              {/* Support Section — Now just the text and button */}

            </div>

            {/* ── Comments Section ── */}
            <div id="comments" className="w-full scroll-mt-24">
              <Comments slug={slug} />
            </div>
          </div>

          {/* ── Right Spacer (To balance TOC and center body) ── */}
          <div className="hidden xl:block w-[240px] shrink-0" />

        </div>
      </article>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="w-full flex justify-center px-4 pt-4 pb-16">
          <div className="w-full max-w-[1100px]">
            <GradientText
              as="h2"
              className="font-syne text-2xl md:text-3xl font-extrabold mb-8"
            >
              Related Posts
            </GradientText>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((rp: PostCardProps, i: number) => (
                  <PostCard key={i} {...rp} variant="recent" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
