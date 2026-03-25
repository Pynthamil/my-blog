import { MetadataRoute } from 'next';
import { getAllPostsForSitemap } from '../../lib/hashnode';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If you buy a domain later, change this or set NEXT_PUBLIC_BASE_URL in your Vercel project settings!
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://my-blog-tan-tau.vercel.app';
  
  // Fetch all live posts to dynamically build the map
  const posts = await getAllPostsForSitemap();
  
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}${post.href}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Build the static routes for your core pages
  const staticRoutes = ['', '/about', '/posts', '/search', '/tags'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ("daily" as const) : ("monthly" as const),
    priority: route === '' ? 1.0 : 0.9, // Homepage is the absolute highest priority (1.0)
  }));

  return [...staticRoutes, ...postUrls];
}
