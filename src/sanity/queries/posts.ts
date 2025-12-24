import { client } from "@/sanity/lib/client";
import { cache } from "react";

const POSTS_PER_PAGE = parseInt(
  process.env.NEXT_PUBLIC_BLOG_POSTS_PER_PAGE || "10",
  10
);

export const getLatestPosts = cache(
  async (offset = 0, limit = POSTS_PER_PAGE) => {
    return await client.fetch(`
       *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [${offset}...${offset + limit}] {
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "tags": tags[]->name
    }`);
  }
);

export const getPost = cache(async (slug: string) => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      publishedAt,
      content,
      "slug": slug.current,
      "tags": tags[]->name
    }`,
    { slug }
  );
});

export const getAllPostCount = cache(async () => {
  return await client.fetch(
    `count(*[_type == "post" && defined(publishedAt)])`
  );
});

export const getAllPostsByTagName = cache(async (tagName: string) => {
  return await client.fetch(
    `*[_type == "post" && defined(publishedAt) && $tagName in tags[]->name] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "tags": tags[]->name
    }`,
    { tagName }
  );
});

export const getPostCountsByTag = cache(async () => {
  return await client.fetch(
    `*[_type == "tag"] {
      name,
      "count": count(*[_type == "post" && defined(publishedAt) && references(^._id)])
    }`
  );
});
