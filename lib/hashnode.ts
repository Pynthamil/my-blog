import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://gql.hashnode.com", {
  fetch(url, options) {
    return fetch(url, {
      ...options,
      next: { revalidate: 60 },
    });
  },
});

const CACHE_TTL_MS = 60_000;

function formatHashnodeDate(publishedAt: string) {
  const date = new Date(publishedAt);
  const day = date.getDate();
  // Logic for ordinal suffix (st, nd, rd, th)
  const suffix =
    ["th", "st", "nd", "rd"][
      day % 10 > 3 ? 0 : (day % 100) - (day % 10) !== 10 ? day % 10 : 0
    ] || "th";
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}

const postsCache = new Map<string, { value: { posts: any[], pageInfo: any }, expiresAt: number }>();
const postsInFlightMap = new Map<string, Promise<{ posts: any[], pageInfo: any }>>();

const postCacheValue = new Map<string, { value: any; expiresAt: number }>();
const postInFlight = new Map<string, Promise<any>>();

let allPostsCacheValue: any[] | null = null;
let allPostsCacheExpiresAt = 0;
let allPostsInFlight: Promise<any[]> | null = null;

export async function getPosts(first: number = 20, after: string | null = null) {
  const cacheKey = `${first}-${after || "null"}`;
  const now = Date.now();
  
  const cached = postsCache.get(cacheKey);
  if (cached && cached.expiresAt > now) return cached.value;
  
  const inFlight = postsInFlightMap.get(cacheKey);
  if (inFlight) return inFlight;

  const promise = (async () => {
    const query = gql`
      query GetPosts($first: Int!, $after: String) {
        publication(host: "pyndu-logs.hashnode.dev") {
          posts(first: $first, after: $after) {
            edges {
              node {
                title
                slug
                brief
                coverImage {
                  url
                }
                publishedAt
                readTimeInMinutes
                reactionCount
                tags {
                  name
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;

    const data: any = await client.request(query, { first, after });
    const edges = data?.publication?.posts?.edges || [];
    const pageInfo = data?.publication?.posts?.pageInfo || { hasNextPage: false, endCursor: null };

    const resultPosts = edges.map(({ node }: any) => {
      return {
        title: node.title,
        description: node.brief,
        category: "Blog",
        date: formatHashnodeDate(node.publishedAt),
        categoryIcon: "folder" as const,
        imageUrl: node.coverImage?.url || "/images/post-1.svg",
        href: `/posts/${node.slug}`,
        tags: node.tags?.map((t: any) => t.name) || [],
        readingTime: `${node.readTimeInMinutes} min read`,
        publishedAt: node.publishedAt,
        reactionCount: node.reactionCount || 0
      };
    });

    // Hashnode returns internal chronological order, but we explicitly sort
    // to ensure the descending order (newest first) is preserved if needed.
    // Note: for cursors to work correctly, we usually stick to Hashnode's return order.
    // Hashnode's default for `posts` is newest-first.
    
    const value = { posts: resultPosts, pageInfo };
    postsCache.set(cacheKey, { value, expiresAt: Date.now() + 10000 });
    return value;
  })();

  postsInFlightMap.set(cacheKey, promise);
  try {
    return await promise;
  } finally {
    postsInFlightMap.delete(cacheKey);
  }
}

export async function getPost(slug: string) {
  const now = Date.now();
  const cached = postCacheValue.get(slug);
  if (cached && cached.expiresAt > now) return cached.value;
  const inFlight = postInFlight.get(slug);
  if (inFlight) return inFlight;

  const query = gql`
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          slug
          brief
          content {
            html
          }
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          reactionCount
          tags {
            name
          }
          author {
            name
            profilePicture
          }
        }
      }
    }
  `;

  const promise = (async () => {
    try {
      const data: any = await client.request(query, { host: "pyndu-logs.hashnode.dev", slug });

      const post = data?.publication?.post;
      if (!post) return null;

      return {
        title: post.title,
        description: post.brief,
        content: post.content?.html || "",
        date: formatHashnodeDate(post.publishedAt),
        publishedAt: post.publishedAt,
        readingTime: `${post.readTimeInMinutes} min read`,
        reactionCount: post.reactionCount || 0,
        tags: post.tags?.map((t: any) => t.name) || [],
        author: {
          name: post.author?.name || "pyndu",
          picture: post.author?.profilePicture || "/images/SmileyFace.svg"
        },
        imageUrl: post.coverImage?.url || "/images/post-1.svg",
        imageBg: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10"
      };
    } catch (error) {
      console.error("Error fetching post from Hashnode:", error);
      return null; /* Safely fallback to 404 instead of crashing Vercel */
    }
  })();

  postInFlight.set(slug, promise);
  try {
    const value = await promise;
    postCacheValue.set(slug, { value, expiresAt: Date.now() + CACHE_TTL_MS });
    return value;
  } finally {
    postInFlight.delete(slug);
  }
}

export async function getAllPostsForSitemap() {
  const now = Date.now();
  if (allPostsCacheValue && allPostsCacheExpiresAt > now) return allPostsCacheValue;
  if (allPostsInFlight) return allPostsInFlight;

  const promise = (async () => {
    const pageSize = 50;
    let after: string | null = null;
    const all: any[] = [];
    let safetyCounter = 0;

    const query = gql`
      query GetPostsForSitemap($first: Int!, $after: String) {
        publication(host: "pyndu-logs.hashnode.dev") {
          posts(first: $first, after: $after) {
            edges {
              cursor
              node {
                title
                slug
                brief
                coverImage {
                  url
                }
                publishedAt
                readTimeInMinutes
                tags {
                  name
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;

    while (true) {
      safetyCounter += 1;
      if (safetyCounter > 100) break;

      const data: any = await client.request(query, {
        first: pageSize,
        after
      });

      const edges = data?.publication?.posts?.edges || [];
      all.push(
        ...edges.map(({ node }: any) => {
          return {
            title: node.title,
            description: node.brief,
            category: "Blog",
            date: formatHashnodeDate(node.publishedAt),
            categoryIcon: "folder" as const,
            imageUrl: node.coverImage?.url || "/images/post-1.svg",
            href: `/posts/${node.slug}`,
            tags: node.tags?.map((t: any) => t.name) || [],
            readingTime: `${node.readTimeInMinutes} min read`,
            publishedAt: node.publishedAt
          };
        })
      );

      const pageInfo = data?.publication?.posts?.pageInfo;
      if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) break;
      after = pageInfo.endCursor;
    }

    allPostsCacheValue = all;
    allPostsCacheExpiresAt = Date.now() + CACHE_TTL_MS;
    return all;
  })();

  allPostsInFlight = promise;
  try {
    return await promise;
  } finally {
    allPostsInFlight = null;
  }
}

type RSSPost = {
  title: string;
  description: string;
  href: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
};

type HashnodeTag = { name: string };
type HashnodeCoverImage = { url?: string | null } | null;

type HashnodePostNode = {
  title: string;
  slug: string;
  brief: string;
  coverImage: HashnodeCoverImage;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: HashnodeTag[];
};

type HashnodePostsResponse = {
  publication: {
    posts: {
      edges: Array<{ node: HashnodePostNode }>;
    };
  };
};

const rssPostsCacheByLimit = new Map<number, { value: RSSPost[]; expiresAt: number }>();
const rssPostsInFlightByLimit = new Map<number, Promise<RSSPost[]>>();

/**
 * Fetch recent posts for `rss.xml`.
 * Hashnode returns newest-first by default for `posts(first: N)`.
 */
export async function getRecentPostsForRSS(limit: number): Promise<RSSPost[]> {
  const normalizedLimit = Math.max(1, Math.min(50, Math.floor(limit)));
  const now = Date.now();

  const cached = rssPostsCacheByLimit.get(normalizedLimit);
  if (cached && cached.expiresAt > now) return cached.value;

  const inFlight = rssPostsInFlightByLimit.get(normalizedLimit);
  if (inFlight) return inFlight;

  const promise = (async () => {
    const query = gql`
      query GetRecentPostsForRSS($first: Int!) {
        publication(host: "pyndu-logs.hashnode.dev") {
          posts(first: $first) {
            edges {
              node {
                title
                slug
                brief
                coverImage {
                  url
                }
                publishedAt
                readTimeInMinutes
                tags {
                  name
                }
              }
            }
          }
        }
      }
    `;

    const data = await client.request<HashnodePostsResponse>(query, { first: normalizedLimit });
    const edges = data?.publication?.posts?.edges ?? [];

    const posts: RSSPost[] = edges.map(({ node }) => ({
      title: node.title,
      description: node.brief,
      href: `/posts/${node.slug}`,
      publishedAt: node.publishedAt,
      imageUrl: node.coverImage?.url || "/images/post-1.svg",
      tags: Array.isArray(node.tags) ? node.tags.map((t) => t.name) : [],
    }));

    rssPostsCacheByLimit.set(normalizedLimit, { value: posts, expiresAt: Date.now() + CACHE_TTL_MS });
    return posts;
  })();

  rssPostsInFlightByLimit.set(normalizedLimit, promise);
  try {
    return await promise;
  } finally {
    rssPostsInFlightByLimit.delete(normalizedLimit);
  }
}