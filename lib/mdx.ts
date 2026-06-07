import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  title: string;
  description: string;
  category: string;
  date: string; // Formatting
  categoryIcon: "folder";
  imageUrl: string;
  href: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
  reactionCount: number;
};

export type FullPost = PostMeta & {
  slug: string;
  content: string; // raw markdown
  author: {
    name: string;
    picture: string;
  };
  imageBg: string;
};

function getRawPosts(): FullPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR);
  const posts = files
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(POSTS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        title: data.title || "Untitled",
        description: data.description || "",
        category: "Blog",
        date: data.date || "Unknown date",
        categoryIcon: "folder" as const,
        imageUrl: data.imageUrl || "/images/post-1.svg",
        href: `/posts/${slug}`,
        tags: data.tags || [],
        readingTime: data.readingTime || "5 min read",
        publishedAt: data.date || new Date().toISOString(),
        reactionCount: data.reactionCount || 0,
        slug,
        content,
        author: {
          name: data.author?.name || "pyndu",
          picture: data.author?.picture || "/images/SmileyFace.svg",
        },
        imageBg: data.imageBg || "bg-gradient-to-br from-purple-500/10 to-indigo-500/10",
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export async function getPosts(first: number = 20, after: string | null = null) {
  const allPosts = getRawPosts();
  
  // Basic cursor-based pagination simulation (very naive)
  let startIndex = 0;
  if (after) {
    const afterIndex = allPosts.findIndex(p => p.slug === after);
    if (afterIndex !== -1) startIndex = afterIndex + 1;
  }
  
  const posts = allPosts.slice(startIndex, startIndex + first);
  
  const hasNextPage = startIndex + first < allPosts.length;
  const endCursor = hasNextPage ? posts[posts.length - 1].slug : null;

  return {
    posts,
    pageInfo: {
      hasNextPage,
      endCursor,
    }
  };
}

export async function getPost(slug: string) {
  const allPosts = getRawPosts();
  return allPosts.find((p) => p.slug === slug) || null;
}

export async function getAllPostsForSitemap() {
  return getRawPosts();
}

export async function getRecentPostsForRSS(limit: number) {
  return getRawPosts().slice(0, limit);
}
