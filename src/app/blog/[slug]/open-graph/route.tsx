import { getLatestPosts } from "@/sanity/queries/posts";
import { ImageResponse } from "next/og";
export const revalidate = 60;

export async function GET(req: Request, props) {
  const params = await props.params;
  const slug = params.slugs;
  const postsData = await getLatestPosts();

  const post = postsData.find((post) => post.slug === slug);

  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
  }

  return new ImageResponse(
    <div>Arighna Chakraborty</div>
  )
}