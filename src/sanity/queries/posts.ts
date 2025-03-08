import { client } from "@/sanity/lib/client";

export const getLatestPosts = async () => {
	return await client.fetch(`
       *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      publishedAt,
      "slug": slug.current,
      "tags": tags[]->name
    }`);
};

export const getPost = async (slug: string) => {
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
};
