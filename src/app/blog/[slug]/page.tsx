"use client"

import SkewScrollComponent from '@/components/scroll/Scroll'
import { getPost } from '@/sanity/queries/posts'
import React, { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import rehypeVideo from "rehype-video";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeStringify from "rehype-stringify";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import { AnimatePresence, motion } from 'motion/react';
import styles from "./page.module.scss";
import LazyTextComponent from '@/components/lazy/Lazy';
import { inter, pp_nekkei, pp_nueue } from '@/utils/fonts';
import { ArrowLeftIcon } from "lucide-react"

function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const resolvedParams = use(params);

    useEffect(() => {
        getPost(resolvedParams.slug).then(data => {
            // console.log(data)
            setPost(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [resolvedParams.slug])

    if (error) {
        return (
            <main>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Fuck. I don't seem to be able to recall." />
                </div>
            </main>
        );
    }

    return (
        <main>
            <SkewScrollComponent>
                <AnimatePresence mode="wait">
                    {loading ?
                        <div className={styles.blogsPageWrapper}>
                            <LazyTextComponent text="Collecting my thoughts." />
                        </div> : <motion.article
                            className={styles.postContainer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            style={{ color: "#fff" }}>
                            <header className={styles.postHeader}>
                                <h1 className={`${styles.postTitle} ${pp_nueue.className}`}>{post.title}</h1>
                                <div className={styles.postMetadataWrapper}>
                                    <time className={`${styles.postDate} ${pp_nekkei.className}`}>
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </time>
                                    {post.tags?.length > 0 && (
                                        <div className={`${styles.tagContainer} ${pp_nueue.className}`}>
                                            {post.tags.map((tag: string) => (
                                                <div className={styles.tag} key={tag}>
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </header>

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
                                    {post.content}
                                </Markdown>
                            </section>
                            <div className={`${styles.backLink} ${inter.className}`}>
                                <Link href="/blog"><ArrowLeftIcon /> All Articles</Link>
                            </div>
                        </motion.article>}
                </AnimatePresence>
            </SkewScrollComponent>
        </main>
    )
}

export default BlogPostPage