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
      href: `https://pyndu-logs.hashnode.dev/${node.slug}`
    };
  });
}