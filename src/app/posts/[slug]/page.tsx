import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import PostCard, { PostCardProps } from "@/components/PostCard";
import { getPost, getPosts } from "../../../../lib/hashnode";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | pyndu logs()`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/posts/${slug}`,
      siteName: "pyndu logs()",
      images: [
        {
          url: post.imageUrl.startsWith("http") ? post.imageUrl : `https://pyndu-logs.hashnode.dev${post.imageUrl}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageUrl.startsWith("http") ? post.imageUrl : `https://pyndu-logs.hashnode.dev${post.imageUrl}`],
    },
  };
}

function parseContentAndHeadings(html: string) {
  const headingRegex = /<h([23])([^>]*)>(.*?)<\/h\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  
  const parsedHtml = html.replace(headingRegex, (fullMatch, level, attrs, innerHtml) => {
    const idMatch = attrs.match(/id="([^"]+)"/);
    let id = idMatch ? idMatch[1] : null;
    const rawText = innerHtml.replace(/<[^>]*>/g, '').trim();

    if (!id) {
      id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      attrs = ` id="${id}"` + attrs; 
    }

    if (rawText) {
      headings.push({ id, text: rawText, level: parseInt(level) });
    }

    return `<h${level}${attrs}>${innerHtml}</h${level}>`;
  });

  return { html: parsedHtml, headings };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const { html: parsedContent, headings } = post ? parseContentAndHeadings(post.content) : { html: "", headings: [] };

  if (!post) {
    return notFound();
  }

  // Fetch related posts (all posts excluding current, max 2)
  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((p: any) => !p.href.endsWith(`/${slug}`))
    .slice(0, 2);

  return (
    <main className="flex-1 flex flex-col">

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
            {post.tags.map((tag: string) => (
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
        <div className="relative w-full max-w-[1000px] flex items-start justify-center gap-12 xl:gap-16">
          
          {/* ── Article Body ── */}
          <div className="relative w-full max-w-[720px] shrink-0">
            {/* Soft ambient mask to dim the dot grid behind body text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-[#0f0f11] opacity-45 blur-[100px] rounded-full pointer-events-none -z-10" />
            <div 
              className="prose-blog w-full max-w-none text-gray-300 leading-relaxed mb-16"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />

            {/* ── Share Section ── */}
            <div className="w-full pt-8 pb-4 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-gray-200 font-syne font-bold text-lg mb-1">
                  Did you find this helpful?
                </span>
                <span className="text-gray-500 text-sm">
                  Share it with your network or save the link for later.
                </span>
              </div>
              <ShareButtons title={post.title} />
            </div>
          </div>

          <TableOfContents headings={headings} />
          
        </div>
      </article>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="w-full flex justify-center px-4 pt-4 pb-16">
          <div className="w-full max-w-[1100px]">
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rp: PostCardProps, i: number) => (
                <PostCard key={i} {...rp} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
