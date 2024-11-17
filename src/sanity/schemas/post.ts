import { defineType, Rule } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Blog Post Title Required"),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.max(200).error("Blog Post Excerpt Max 200 characters"),
    },
    {
      name: "content",
      title: "content",
      type: "markdown",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
  ],
});
