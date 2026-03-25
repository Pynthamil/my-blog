import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://my-blog-tan-tau.vercel.app';

  return {
    rules: {
      // Allow all Google/Search engine crawl bots
      userAgent: '*',
      allow: '/',
    },
    // Point the bots directly to your sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
