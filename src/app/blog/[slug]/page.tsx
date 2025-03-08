"use client"

import SkewScrollComponent from '@/components/scroll/Scroll'
import { getPost } from '@/sanity/queries/posts'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import rehypeVideo from "rehype-video"
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeStringify from "rehype-stringify"
import "highlight.js/styles/github.css";

import styles from "./page.module.scss"
import LazyTextComponent from '@/components/lazy/Lazy'
import { inter, pp_nekkei, pp_nueue, space_grotesk } from '@/utils/fonts'

function BlogPostPage({ params }: { params: { slug: string } })
{
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        getPost(params.slug).then(data =>
        {
            console.log(data)
            setPost(data);
            setLoading(false);
        }).catch(error =>
        {
            setError(error);
            setLoading(false);
        })
    }, [params.slug])

    if (loading)
    {
        return (
            <main>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Collecting my thoughts..." />
                </div>
            </main>
        );
    }

    if (error)
    {
        return (
            <main>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Fuck. I don't seem to be able to recall.." />
                </div>
            </main>
        );
    }

    return (
        <main>
            <SkewScrollComponent>
                <article className={styles.postContainer} style={{ color: "#fff" }}>
                    <header className={styles.postHeader}>
                        <h1 className={`${styles.postTitle} ${space_grotesk.className}`}>{post.title}</h1>
                        <time className={`${styles.postDate} ${pp_nekkei.className}`}>
                            {new Date(post.publishedAt).toLocaleDateString()}
                        </time>
                        {post.tags?.length > 0 && (
                            <div className={`${styles.tagContainer} ${pp_nueue.className}`}>
                                {post.tags.map((tag: string) => (
                                    <Link
                                        key={tag}
                                        href={`/blog/tags/${tag.toLowerCase()}`}
                                        className={styles.tag}
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </header>

                    <section className={`${styles.postContent} ${inter.className}`}>
                        <Markdown remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeStringify, rehypeHighlight, rehypeVideo, rehypeKatex]}>
                            {post.content}
                        </Markdown>
                    </section>

                    <div className={styles.backLink}>
                        <Link href="/blog">← All Articles</Link>
                    </div>
                </article>
            </SkewScrollComponent>
        </main>
    )
}

export default BlogPostPage