import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import rehypeVideo from "rehype-video";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeStringify from "rehype-stringify";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import React from 'react'
import { inter } from '@/utils/fonts'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

import styles from "./styles.module.scss";

function PostContentComponent({ content }: { content: string }) {
  return <>
    <section className={`${styles.postContent} ${inter.className}`}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeStringify, rehypeHighlight, rehypeVideo, rehypeKatex]}
        components={{
          img: ({ src, alt, title, ...props }) => {
            if (!src || src.trim() === '') {
              return null;
            }
            return <img src={src} alt={alt} title={title} {...props} />;
          }
        }}
      >
        {content}
      </Markdown>
    </section>
    <div className={`${styles.backLink} ${inter.className}`}>
      <Link href="/blog"><ArrowLeftIcon /> All Articles</Link>
    </div>
  </>
}

export default PostContentComponent