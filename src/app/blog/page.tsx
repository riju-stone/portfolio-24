"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy/Lazy";
import { getLatestPosts } from "@/sanity/queries/posts";
import { space_grotesk } from "@/utils/fonts";

function BlogsPage()
{

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        getLatestPosts().then(data =>
        {
            setPosts(data);
            setLoading(false);
        }).catch(error =>
        {
            setError(error);
            setLoading(false);
        })
    }, [])

    if (loading)
    {
        return (
            <main>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Hold on! Contemplating." />
                </div>
            </main>
        );
    }

    if (error)
    {
        return (
            <main>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Oops! Guess I fucked something up." />
                </div>
            </main>
        );
    }

    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.blogsPageWrapper}>
                    <h1 className={`${styles.pageTitle} ${space_grotesk.className}`}>What I've been upto</h1>
                    <div className={styles.postsGrid}>
                        {posts.map((post) => (
                            <article key={post._id} className={styles.postCard}>
                                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                                    <time className={styles.postDate}>
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </time>
                                    <div className={styles.postTitle}>{post.title}</div>
                                    <div className={styles.postExcerpt}>{post.excerpt}</div>
                                    {post.tags?.length > 0 && (
                                        <div className={styles.tagContainer}>
                                            {post.tags.map((tag: string) => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>

            </SkewScrollComponent>
        </main>
    )
}

export default BlogsPage;
