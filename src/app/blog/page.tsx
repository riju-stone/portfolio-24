export const revalidate = 60;

import SkewScrollComponent from "@/components/custom-scroll/custom-scroll";
import React from "react";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy-loader/lazy-loader";
import TextStaggerComponent from "@/components/custom-text/text-stagger";
import { pp_nueue } from "@/utils/fonts";
import { getLatestPosts } from "@/sanity/queries/posts";
import dynamic from "next/dynamic";
const FancyTableComponent = dynamic(() => import("@/components/custom-table/custom-table"), { ssr: true });

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

async function BlogsPage() {
    try {
        const posts = await getLatestPosts();
        const formattedData = formatPostsData(posts);

        if (formattedData.length === 0) {
            return <div key="empty" className={styles.blogMessageWrapper}>
                <LazyTextComponent text="Working on some stuff!" />
            </div>
        }

        return (
            <main key="blog-page">
                <SkewScrollComponent>
                    <div key="posts" className={styles.blogsPageWrapper}>
                        <div className={styles.postsWrapper}>
                            <TextStaggerComponent className={`${styles.pageTitle} ${pp_nueue.className}`} text={"Breaking down abstractions"} style="word" />
                            <div className={styles.postsGrid}>
                                <FancyTableComponent metadata={blogMetadata} tableData={formattedData} />
                            </div>
                        </div>
                    </div>
                </SkewScrollComponent>
            </main>
        )
    } catch (error) {
        return (
            <main key="blog-page">
                <div className={styles.blogMessageWrapper}>
                    <LazyTextComponent text="Oops! I fucked up." />
                </div>
            </main>
        );
    }
}

export default BlogsPage;
