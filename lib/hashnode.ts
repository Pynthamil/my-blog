import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://gql.hashnode.com");

export async function getPosts() {
  const query = gql`
    query {
      publication(host: "pyndu-logs.hashnode.dev") {
        posts(first: 6) {
          edges {
            node {
              title
              slug
              brief
              coverImage {
                url
              }
              publishedAt
              tags {
                name
              }
            }
          }
        }
      }
    }
  `;

  const data: any = await client.request(query);
  const edges = data?.publication?.posts?.edges || [];

  return edges.map(({ node }: any) => {
    const date = new Date(node.publishedAt);
    const day = date.getDate();
    // Logic for ordinal suffix (st, nd, rd, th)
    const suffix = ["th", "st", "nd", "rd"][
      day % 10 > 3 ? 0 : (day % 100) - (day % 10) !== 10 ? day % 10 : 0
    ] || "th";
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const formattedDate = `${day}${suffix} ${month} ${year}`;

    return {
      title: node.title,
      description: node.brief,
      category: "Blog",
      date: formattedDate,
      categoryIcon: "folder" as const,
      imageUrl: node.coverImage?.url || "/images/post-1.svg",
      href: `/posts/${node.slug}`,
      tags: node.tags?.map((t: any) => t.name) || []
    };
  });
}

export async function getPost(slug: string) {
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
          tags {
            name
          }
        }
      }
    }
  `;

  try {
    const data: any = await client.request(query, { host: "pyndu-logs.hashnode.dev", slug });
    
    const post = data?.publication?.post;
    if (!post) return null;

    const date = new Date(post.publishedAt);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][
      day % 10 > 3 ? 0 : (day % 100) - (day % 10) !== 10 ? day % 10 : 0
    ] || "th";
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const formattedDate = `${day}${suffix} ${month} ${year}`;

    return {
      title: post.title,
      description: post.brief,
      content: post.content?.html || "",
      date: formattedDate,
      publishedAt: post.publishedAt,
      readingTime: `${post.readTimeInMinutes} min read`,
      tags: post.tags?.map((t: any) => t.name) || [],
      imageUrl: post.coverImage?.url || "/images/post-1.svg",
      imageBg: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10"
    };
  } catch (error) {
    console.error("Error fetching post from Hashnode:", error);
    return null; /* Safely fallback to 404 instead of crashing Vercel */
  }
}