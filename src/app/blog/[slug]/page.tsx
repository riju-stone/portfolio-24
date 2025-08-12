import React from 'react'
import { Metadata } from 'next'
import styles from "./page.module.scss";
import LazyTextComponent from '@/components/lazy-loader/lazy-loader';
import { pp_nekkei, pp_nueue } from '@/utils/fonts';
import { getPost } from '@/sanity/queries/posts';
import SkewScrollComponent from '@/components/custom-scroll/custom-scroll'
import TextStaggerComponent from '@/components/custom-text/text-stagger';
import PostContentComponent from '@/components/post-content/post-content';

type BlogParams = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: BlogParams }): Promise<Metadata> {
    const resolvedParams = await params;

    try {
        const post = await getPost(resolvedParams.slug);
        if (!post) {
            return {
                title: 'Post Not Found',
                description: 'The requested blog post could not be found.',
            };
        }

        return {
            title: post.title,
            description: post.excerpt || `Read about ${post.title} on my blog`,
            openGraph: {
                title: post.title,
                description: post.excerpt,
                images: [
                    {
                        url: `https://archst.dev/blog/${post.slug}/open-graph`,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    }
                ],
                type: 'article',
                publishedTime: post.publishedAt,
                authors: ['Rijustone'],
                tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.excerpt,
                images: [`https://archst.dev/blog/${post.slug}/open-graph`],
            },
        }
    } catch (error) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }
}

async function BlogPostPage({ params }: { params: BlogParams }) {
    const resolvedParams = await params;

    try {
        const post = await getPost(resolvedParams.slug);

        return <main style={{ mixBlendMode: "difference" }}>
            <SkewScrollComponent>
                <div className={styles.postContainer}>
                    <div className={styles.postHeader}>
                        <TextStaggerComponent className={`${styles.postTitle} ${pp_nueue.className}`} text={post.title} style="word" delay={0.5} />
                        <div className={styles.postMetadataWrapper}>
                            <TextStaggerComponent className={`${styles.postDate} ${pp_nekkei.className}`} text={new Date(post.publishedAt).toLocaleDateString()} style="letter" delay={0.85} staggerDelay={0.02} />
                            {post.tags?.length > 0 && (
                                <div className={`${styles.tagContainer} ${pp_nueue.className}`}>
                                    {post.tags.map((tag: string) => (
                                        <TextStaggerComponent className={styles.tag} key={tag} text={tag} style="letter" delay={0.85} staggerDelay={0.02} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <PostContentComponent content={post.content} />
                </div>
            </SkewScrollComponent>
        </main>
    } catch (error) {
        return (
            <main style={{ mixBlendMode: "difference" }}>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Fuck. That doesn't seem right." />
                </div>
            </main>
        );
    }
}

export default BlogPostPage