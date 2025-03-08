"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy/Lazy";
import { getLatestPosts } from "@/sanity/queries/posts";
import { pp_nekkei, space_grotesk } from "@/utils/fonts";
import { AnimatePresence } from "motion/react";

function BlogsPage()
{
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        getLatestPosts().then(data =>
        {
            console.log(data)
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

            </main>
        );
    }

    if (error)
    {
        return (
            <main>
                <div className={styles.blogMessageWrapper}>
                    <LazyTextComponent text="Oops! Guess I fucked something up." />
                </div>
            </main>
        );
    }

    if (posts.length === 0)
    {
        return (
            <main>
                <div className={styles.blogMessageWrapper}>
                    <LazyTextComponent text="I'll come up with something. I promise!" />
                </div>
            </main>)
    }

    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.blogsPageWrapper}>
                    <AnimatePresence>
                        {loading ?
                            <LazyTextComponent key="postsWrapper" text="Hold on! Contemplating." /> :
                            <React.Fragment key="postsWrapper">
                                <h1 className={`${styles.pageTitle} ${space_grotesk.className}`}>What I've been upto</h1>
                                <div className={styles.postsGrid}>
                                    {posts.map((post) => (
                                        <article key={post._id} className={styles.postCard}>
                                            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                                                <div className={`${styles.postTitle} ${pp_nekkei.className}`}>{post.title}</div>
                                                {/* <div className={styles.postExcerpt}>{post.excerpt}</div> */}
                                                <div className={`${styles.postMetadataContainer} ${pp_nekkei.className}`}>
                                                    {post.tags?.length > 0 && (
                                                        <div className={styles.tagContainer}>
                                                            {post.tags.map((tag: string) => (
                                                                <span key={tag} className={styles.tag}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <time className={styles.postDate}>
                                                        {new Date(post.publishedAt).toLocaleString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }).replace(/,/g, "")}
                                                    </time>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </React.Fragment>
                        }
                    </AnimatePresence>
                </div>
            </SkewScrollComponent>
        </main >
    )
}

export default BlogsPage;
