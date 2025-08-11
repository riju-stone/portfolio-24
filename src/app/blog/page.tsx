"use client";

import SkewScrollComponent from "@/components/custom-scroll/custom-scroll";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy-loader/lazy-loader";
import { getLatestPosts } from "@/sanity/queries/posts";
import TextStaggerComponent from "@/components/custom-text/text-stagger";
import FancyTableComponent from "@/components/custom-table/custom-table";
import { AnimatePresence } from "motion/react";

const blogMetadata = {
    col1: "publishedAt",
    col2: "title",
    col3: "tags"
}

function formatPostsData(posts: any[]) {
    return posts.map(post => ({
        ...post,
        publishedAt: new Date(post.publishedAt).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        }),
        link: `/blog/${post.slug}`
    }))
}

function BlogsPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getLatestPosts().then(data => {
            const formattedData = formatPostsData(data);
            setPosts(formattedData);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        })
    }, [])

    if (error) {
        return (
            <main style={{ mixBlendMode: "difference" }}>
                <div className={styles.blogMessageWrapper}>
                    <LazyTextComponent text="Oops! I fucked up." />
                </div>
            </main>
        );
    }

    return (
        <main style={{ mixBlendMode: "difference" }}>
            <SkewScrollComponent>
                <AnimatePresence mode="wait">
                    {loading ?
                        <div key="loading" className={styles.blogMessageWrapper}>
                            <LazyTextComponent text="Hold on!" />
                        </div> :
                        posts.length === 0 ?
                            <div key="empty" className={styles.blogMessageWrapper}>
                                <LazyTextComponent text="Working on some stuff!" />
                            </div> :
                            <div key="posts" className={styles.blogsPageWrapper}>
                                <div className={styles.postsWrapper}>
                                    <TextStaggerComponent className={styles.pageTitle} text={"Feed"} style="word" />
                                    <div className={styles.postsGrid}>
                                        <FancyTableComponent metadata={blogMetadata} tableData={posts} />
                                    </div>
                                    {/* <div className={styles.pagination}>
                            <button>Previous</button>
                            <button>Next</button>
                        </div> */}
                                </div>
                            </div>}
                </AnimatePresence>
            </SkewScrollComponent>
        </main >
    )
}

export default BlogsPage;
