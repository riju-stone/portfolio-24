"use client";

import SkewScrollComponent from "@/components/custom-scroll/custom-scroll";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import LazyTextComponent from "@/components/lazy-loader/lazy-loader";
import TextStaggerComponent from "@/components/custom-text/text-stagger";
import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import {
  getAllPostCount,
  getPostCountsByTag,
  getLatestPosts,
  getAllPostsByTagName,
} from "@/sanity/queries/posts";
import dynamic from "next/dynamic";
import TagFilterComponent from "@/components/tag-filter/tag-filter";
import { m } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBlogStore } from "@/stores/blogStore";

const FancyTableComponent = dynamic(
  () => import("@/components/custom-table/custom-table"),
  { ssr: true }
);

const POSTS_PER_PAGE = parseInt(
  process.env.NEXT_PUBLIC_BLOG_POSTS_PER_PAGE || "10",
  10
);

const blogMetadata = {
  col1: "publishedAt",
  col2: "title",
  col3: "tags",
};

function formatPostsData(posts: any[]) {
  return posts.map((post) => ({
    ...post,
    publishedAt: new Date(post.publishedAt).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
    link: `/blog/${post.slug}`,
  }));
}

function BlogsPage() {
  const currentBlogPage = useBlogStore((state) => state.currentBlogPage);
  const setCurrentBlogPage = useBlogStore((state) => state.setCurrentBlogPage);

  const postsData = useBlogStore((state) => state.currentPageBlogData);
  const setPostsData = useBlogStore((state) => state.setCurrentPageBlogData);

  const totalPosts = useBlogStore((state) => state.totalPosts);
  const setTotalPosts = useBlogStore((state) => state.setTotalPosts);

  const totalBlogPages = useBlogStore((state) => state.totalBlogPages);
  const setTotalBlogPages = useBlogStore((state) => state.setTotalBlogPages);

  const postCountByTag = useBlogStore((state) => state.postCountsByTag);
  const setPostCountByTag = useBlogStore((state) => state.setPostCountsByTag);

  const blogError = useBlogStore((state) => state.blogError);
  const setBlogError = useBlogStore((state) => state.setBlogError);

  const tagFilter = useBlogStore((state) => state.tagFilter);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const [total, tagsCount] = await Promise.all([
          getAllPostCount(),
          getPostCountsByTag(),
        ]);

        setTotalPosts(total);
        setTotalBlogPages(Math.ceil(total / POSTS_PER_PAGE));
        setPostCountByTag(tagsCount);
      } catch (error) {
        setBlogError("Failed to fetch blog metadata.");
      }
    }

    fetchMetadata();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let posts: any[] = [];
        if (tagFilter) {
          posts = await getAllPostsByTagName(tagFilter);
        } else {
          posts = await getLatestPosts(currentBlogPage);
        }
        const formattedData = formatPostsData(posts);
        setPostsData(formattedData);
      } catch (error) {
        setBlogError("Failed to fetch blog posts.");
      }
    }

    fetchPosts();
  }, [currentBlogPage, tagFilter]);

  const handlePreviousPage = () => {
    setCurrentBlogPage(currentBlogPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setCurrentBlogPage(currentBlogPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (blogError) {
    return (
      <div key="error" className={styles.blogMessageWrapper}>
        <LazyTextComponent text={"Oops! I fucked up..."} />
      </div>
    );
  }

  return (
    <main key="blog-page">
      <SkewScrollComponent>
        <div key="posts" className={styles.blogsPageWrapper}>
          <div className={styles.postsWrapper}>
            <TextStaggerComponent
              className={`${styles.pageTitle} ${pp_nueue.className}`}
              text={`Breaking down abstractions`}
              style="word"
            />
            <TagFilterComponent />
            <div className={styles.postsGrid}>
              <FancyTableComponent
                metadata={blogMetadata}
                tableData={postsData}
                linksStyle="_self"
                prefetch={true}
              />
            </div>
            <m.div
              className={styles.paginationWrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <button
                className={styles.paginationButton}
                {...(currentBlogPage === 0 ? { disabled: true } : {})}
                onClick={handlePreviousPage}
              >
                <ChevronLeft />
              </button>
              <span className={pp_nekkei.className}>
                Showing {currentBlogPage + 1} of{" "}
                {Math.ceil(totalPosts / POSTS_PER_PAGE)} Pages
              </span>
              <button
                className={styles.paginationButton}
                {...(currentBlogPage === totalBlogPages - 1
                  ? { disabled: true }
                  : {})}
                onClick={handleNextPage}
              >
                <ChevronRight />
              </button>
            </m.div>
          </div>
        </div>
      </SkewScrollComponent>
    </main>
  );
}

export default BlogsPage;
