import { MetadataRoute } from 'next';
import { getPosts } from '../../lib/hashnode';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If you buy a domain later, change this or set NEXT_PUBLIC_BASE_URL in your Vercel project settings!
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://my-blog-tan-tau.vercel.app';
  
  // Fetch all live posts to dynamically build the map
  const posts = await getPosts();
  
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}${post.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Build the static routes for your core pages
  const staticRoutes = ['', '/about', '/posts', '/search', '/tags'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9, // Homepage is the absolute highest priority (1.0)
  }));

  return [...staticRoutes, ...postUrls];
}
