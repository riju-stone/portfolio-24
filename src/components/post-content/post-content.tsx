"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkCallout from "@r4ai/remark-callout";
import rehypeHighlight from "rehype-highlight";
import rehypeVideo from "rehype-video";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import React from "react";
import { inter } from "@/utils/fonts";
import { m } from "motion/react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import styles from "./styles.module.scss";

function PostContentComponent({ content }: { content: string }) {
  return (
    <>
      <m.div
        className={`${styles.postContent} ${inter.className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Markdown
          remarkPlugins={[
            remarkGfm,
            remarkMath,
            remarkDirective,
            remarkCallout,
            remarkToc,
          ]}
          rehypePlugins={[
            rehypeHighlight,
            rehypeVideo,
            rehypeKatex,
            rehypeSlug,
          ]}
          components={{
            img: ({ src, alt, title, ...props }) => {
              if (!src || src.trim() === "") {
                return null;
              }
              return <img src={src} alt={alt} title={title} {...props} />;
            },
            p: ({ node, ...props }) => (
              <div className={styles.paragraph} {...props} />
            ),
          }}
        >
          {content}
        </Markdown>
        <div className={`${styles.backLink} ${inter.className}`}>
          <Link href="/blog">
            <ArrowLeftIcon /> All Articles
          </Link>
        </div>
      </m.div>
    </>
  );
}

export default PostContentComponent;
