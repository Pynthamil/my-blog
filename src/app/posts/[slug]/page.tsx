import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import PostCard, { PostCardProps } from "@/components/PostCard";

import { getPost, getPosts } from "../../../../lib/hashnode";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";

const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img", "h2", "h3", "span", "div", "mark", 
    "table", "thead", "tbody", "tr", "th", "td"
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: [...(sanitizeHtml.defaults.allowedAttributes.a || []), "href", "name", "target", "rel", "class"],
    img: ["src", "alt", "title", "width", "height", "loading", "class"],
    h1: ["id", "class"],
    h2: ["id", "class"],
    h3: ["id", "class"],
    pre: ["class"],
    code: ["class"],
    "*": ["class", "id"]
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    img: ["http", "https"],
    a: ["http", "https", "mailto", "tel"]
  },
  disallowedTagsMode: "discard"
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

function parseContentAndHeadings(html: string) {
  const headingRegex = /<h([23])([^>]*)>(.*?)<\/h\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];

  const parsedHtml = html.replace(headingRegex, (fullMatch, level, attrs, innerHtml) => {
    const attrsStr = typeof attrs === "string" ? attrs : "";
    const idMatch = attrsStr.match(/id="([^"]+)"/);
    const classMatch = attrsStr.match(/class="([^"]*)"/);
    let id = idMatch ? idMatch[1] : "";
    const rawText = innerHtml.replace(/<[^>]*>/g, '').trim();

    // Normalize the id so it can safely be used in the DOM and for in-page TOC anchors.
    const normalizeHeadingId = (value: string) =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9\-_:.]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (!id) id = rawText.toLowerCase();
    id = normalizeHeadingId(id);

    const classAttr = classMatch ? ` class="${classMatch[1].slice(0, 200)}"` : "";

    if (rawText) {
      headings.push({ id, text: rawText, level: parseInt(level) });
    }

    return `<h${level} id="${id}"${classAttr}>${innerHtml}</h${level}>`;
  });

  return { html: parsedHtml, headings };
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

function injectInternalLinks(html: string, allPosts: any[], currentSlug: string) {
  let content = html;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://my-blog-tan-tau.vercel.app";
  
  // Sort posts by title length descending to prevent partial matches (e.g. "React" vs "React Testing")
  const otherPosts = allPosts
    .filter(p => !p.href.endsWith(`/${currentSlug}`))
    .sort((a: any, b: any) => b.title.length - a.title.length);

  // We'll use a placeholder technique to avoid linking inside already existing tags/blocks
  const codeBlocks: string[] = [];
  content = content.replace(/<(pre|code|a|h\d)[^>]*>[\s\S]*?<\/\1>/gi, (match) => {
    codeBlocks.push(match);
    return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
  });

  let linksCount = 0;
  const MAX_LINKS = 5;

  for (const p of otherPosts) {
    if (linksCount >= MAX_LINKS) break;
    
    // Create a regex for the title (case-insensitive)
    const escapedTitle = p.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTitle}\\b`, "i");

    if (regex.test(content)) {
      content = content.replace(regex, (match) => {
        linksCount++;
        return `<a href="${p.href}" class="internal-link" title="Read more: ${p.title}">${match}</a>`;
      });
    }
  }

  // Restore code blocks
  content = content.replace(/___CODE_BLOCK_(\d+)___/g, (_, id) => codeBlocks[parseInt(id)]);

  return content;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return notFound();
  }

  // Fetch all posts to build the mesh
  const allPosts = await getPosts();
  
  // 1. Calculate Related Posts based on similarity
  const relatedPosts = allPosts
    .filter((p: any) => !p.href.endsWith(`/${slug}`))
    .map((p: any) => ({
      ...p,
      score: getSimilarityScore(post, p)
    }))
    .sort((a: any, b: any) => b.score - a.score || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  // 2. Inject Internal Links (The Mesh)
  const { html: parsedContent, headings } = post ? parseContentAndHeadings(post.content) : { html: "", headings: [] };
  const meshedContent = injectInternalLinks(parsedContent, allPosts, slug);
  const sanitizedContent = meshedContent ? sanitizeHtml(meshedContent, {
    ...sanitizeOptions,
    allowedTags: [...(sanitizeOptions.allowedTags || []), "a"] // Ensure <a> is allowed (it's already in defaults but just in case)
  }) : "";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <SyntaxHighlighter />

      {/* ── Article wrapper ── */}
      <article className="relative w-full flex flex-col items-center pt-[120px] pb-16 px-4">
        {/* Subtle ambient focus behind content */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[500px] bg-[#0f0f11] opacity-40 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Back link */}
        <div className="w-full max-w-[720px] mb-10">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#16161a] border border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
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
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] bg-[#111115]">
                <Image src={post.author.picture} alt={post.author.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-syne font-bold text-gray-200 tracking-wide">{post.author.name}</span>
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <span>{post.date}</span>
                  <span className="text-gray-700">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>

            {/* Meta chips row */}
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-purple-500/20 bg-[#16161a] text-purple-300 shadow-inner"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-syne text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.03em] bg-gradient-to-r from-[#D8D7FE] to-white bg-clip-text text-transparent">
            {post.title}
          </h1>
        </header>

        {/* ── Cover Image ── */}
        <div className="w-full max-w-[720px] mb-12">
          <div
            className={`relative w-full aspect-[16/9] ${post.imageBg} rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10`}
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

        {/* ── Content & TOC Layout ── */}
        <div className="relative w-full max-w-[1280px] flex items-start justify-center xl:justify-between gap-8">

          {/* ── TOC (Left Sidebar) ── */}
          <div className="hidden xl:block w-[240px] shrink-0">
            <TableOfContents headings={headings} />
          </div>

          {/* ── Article Body ── */}
          <div className="relative w-full max-w-[720px] shrink-0">
            {/* Soft ambient mask to dim the dot grid behind body text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-[#0f0f11] opacity-45 blur-[100px] rounded-full pointer-events-none -z-10" />
            <div
              className="prose-blog w-full max-w-none text-gray-300 leading-relaxed mb-16"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* ── Footer Interaction Area ── */}
            <div className="w-full flex flex-col gap-12 mt-16 mb-20 px-4 md:px-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
                <div className="flex flex-col text-center md:text-left">
                  <h4 className="text-gray-200 font-syne font-bold text-lg mb-1">
                    Enjoyed this post?
                  </h4>
                  <p className="text-gray-500 text-sm">
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
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent mb-8">
              Related Posts
            </h2>
            <div className="glow-border-strong rounded-3xl bg-[#111115]/60 backdrop-blur-md p-6 md:p-8">
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
