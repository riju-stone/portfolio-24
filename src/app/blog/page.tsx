"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy/Lazy";
import { getLatestPosts } from "@/sanity/queries/posts";
import { pp_nekkei } from "@/utils/fonts";
import { motion } from "motion/react";
import TextStaggerComponent from "@/components/text/TextStagger";

function BlogsPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getLatestPosts().then(data => {
            // console.log(data)
            setPosts(data);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return (
            <main>
                <SkewScrollComponent>
                    <div className={styles.blogMessageWrapper}>
                        <LazyTextComponent text="Hold on! Contemplating." />
                    </div>
                </SkewScrollComponent>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <SkewScrollComponent>
                    <div className={styles.blogMessageWrapper}>
                        <LazyTextComponent text="Oops! Guess I fucked something up." />
                    </div>
                </SkewScrollComponent>
            </main>
        );
    }

    if (posts.length === 0) {
        return <main>
            <SkewScrollComponent>
                <div className={styles.blogMessageWrapper}>
                    <LazyTextComponent text="I'm a work in progress!" />
                </div>
            </SkewScrollComponent>
        </main>
    }

    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.blogsPageWrapper}>
                    <div key="postsWrapper">
                        <TextStaggerComponent className={styles.pageTitle} text={["What", "I've", "been", "upto"]} />
                        <div className={styles.postsGrid}>
                            {posts.map((post, index) => (
                                <motion.article
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                                    key={post._id} className={styles.postCard}>
                                    <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                                        <div className={`${styles.postTitle} ${pp_nekkei.className}`}>{post.title}</div>
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
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </SkewScrollComponent>
        </main >
    )
}

export default BlogsPage;
