import { getRecentPostsForRSS } from "../../../lib/hashnode";

export const revalidate = 300; // seconds (5 minutes)

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://my-blog-tan-tau.vercel.app";
  const siteTitle = "pyndu logs()";
  const siteDescription = "building in public so future me can laugh at this code";

  const posts = await getRecentPostsForRSS(10);
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const link = `${baseUrl}${post.href}`;
      const description = escapeXml(post.description || "");
      const title = escapeXml(post.title);
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : null;

      return `
        <item>
          <title>${title}</title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
          <description>${description}</description>
        </item>
      `.trim();
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(siteTitle)}</title>
      <link>${baseUrl}</link>
      <description>${escapeXml(siteDescription)}</description>
      <language>en-us</language>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

