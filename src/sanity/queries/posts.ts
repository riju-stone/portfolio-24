import { client } from "@/sanity/lib/client";
import { cache } from "react";

export const getLatestPosts = cache(async () => {
  return await client.fetch(`
       *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...10] {
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "tags": tags[]->name
    }`);
})

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
