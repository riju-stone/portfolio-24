"use client"

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
import { inter } from '@/utils/fonts';
import { m } from "motion/react";
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

import styles from "./styles.module.scss";

function PostContentComponent({ content }: { content: string }) {
  return <>
    <m.div className={`${styles.postContent} ${inter.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
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
    </m.div>
    <div className={`${styles.backLink} ${inter.className}`}>
      <Link href="/blog"><ArrowLeftIcon /> All Articles</Link>
    </div>
  </>
}

export default PostContentComponent