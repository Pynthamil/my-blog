import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://gql.hashnode.com");

async function debugPost(slug: string) {
  const query = gql`
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          content {
            html
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { host: "pyndu-logs.hashnode.dev", slug });
    console.log("--- RAW HTML START ---");
    console.log(data.publication.post.content.html);
    console.log("--- RAW HTML END ---");
  } catch (error) {
    console.error(error);
  }
}

debugPost("how-i-organise-my-projects-using-notion");
