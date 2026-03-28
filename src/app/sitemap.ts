import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '../../lib/hashnode';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://my-blog-tan-tau.vercel.app';
  
  // Fetch all live posts to dynamically build the map
  const posts = await getAllPostsForSitemap();
  
  // 1. Generate Post URLs with Image Metadata
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}${post.href}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: post.imageUrl ? [post.imageUrl] : [],
  }));

  // 2. Extract Unique Tags and Generate Tag URLs
  const uniqueTags = Array.from(new Set(posts.flatMap((post: any) => post.tags || [])));
  const tagUrls = uniqueTags.map((tag: string) => ({
    url: `${baseUrl}/search?q=${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 3. Build the static routes for your core pages
  // Note: We exclude /search as it's a utility page, not a content destination for bots.
  const staticRoutes = ['', '/about', '/posts', '/tags'].map((route) => {
    let priority = 0.5;
    let changeFrequency: "daily" | "weekly" | "monthly" = "monthly";

    if (route === '') {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === '/posts') {
      priority = 0.9;
      changeFrequency = "daily";
    } else if (route === '/tags') {
      priority = 0.8;
      changeFrequency = "weekly";
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  return [...staticRoutes, ...postUrls, ...tagUrls];
}
