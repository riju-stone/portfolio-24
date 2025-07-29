"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy/Lazy";
import { getLatestPosts } from "@/sanity/queries/posts";
import TextStaggerComponent from "@/components/text/TextStagger";
import FancyTableComponent from "@/components/table/table";

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
                        <LazyTextComponent text="Oops! I fucked up." />
                    </div>
                </SkewScrollComponent>
            </main>
        );
    }

    if (posts.length === 0) {
        return <main>
            <SkewScrollComponent>
                <div className={styles.blogMessageWrapper}>
                    <LazyTextComponent text="Working on some stuff!" />
                </div>
            </SkewScrollComponent>
        </main>
    }

    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.blogsPageWrapper}>
                    <div className={styles.postsWrapper}>
                        <TextStaggerComponent className={styles.pageTitle} text={["Feed"]} />
                        <div className={styles.postsGrid}>
                            <FancyTableComponent metadata={blogMetadata} tableData={posts} />
                        </div>
                        {/* <div className={styles.pagination}>
                            <button>Previous</button>
                            <button>Next</button>
                        </div> */}
                    </div>
                </div>
            </SkewScrollComponent>
        </main >
    )
}

export default BlogsPage;
