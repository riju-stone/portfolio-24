"use client";

import React, { useMemo } from 'react'
import { motion } from "motion/react"

import styles from "./styles.module.scss"
import { pp_nueue } from '@/utils/fonts'
import Image from 'next/image'

// Optimized animation variants with better performance
const textStaggerAnim = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    show: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5, // Slightly faster for better perceived performance
            delay: 0.8 + i * 0.03, // Reduced delay for faster start
            ease: [0.22, 1, 0.36, 1]
        }
    })
}

const imageStaggerAnim = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            ease: [0.22, 1, 0.36, 1],
            duration: 0.5, // Reduced duration
            delay: 1.2 // Reduced delay
        }
    }
}

// Optimized container animation for parent orchestration
const containerAnim = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
        }
    }
}

interface TextStaggerComponentProps {
    text: (string | any)[];
}

function TextStaggerComponent({ text }: TextStaggerComponentProps) {
    // Memoize the text processing to prevent unnecessary re-renders
    const processedText = useMemo(() => {
        return text.map((word, idx) => ({
            id: `word-${idx}`,
            content: word,
            isString: typeof word === "string"
        }));
    }, [text]);

    // Memoized letter splitting for strings
    const splitLetters = useMemo(() => {
        return (word: string, wordIndex: number) => {
            return word.split("").map((letter, letterIndex) => ({
                letter,
                key: `word-${wordIndex}-letter-${letterIndex}`,
                index: letterIndex
            }));
        };
    }, []);

    return (
        <motion.div
            className={`${styles.textStaggerWrapper} ${pp_nueue.className}`}
            variants={containerAnim}
            initial="hidden"
            animate="show"
            style={{
                // Performance optimizations
                contain: "layout style",
                willChange: "transform",
            }}
        >
            {processedText.map(({ id, content, isString }, wordIdx) => (
                <div key={id} className={styles.staggerWordContainer}>
                    <div className={styles.staggerWord}>
                        {isString ? (
                            // Optimized letter rendering
                            splitLetters(content, wordIdx).map(({ letter, key, index }) => (
                                <motion.div
                                    key={key}
                                    variants={textStaggerAnim}
                                    initial="hidden"
                                    animate="show"
                                    custom={index}
                                    style={{
                                        display: "inline-block",
                                        willChange: "transform, opacity",
                                        backfaceVisibility: "hidden",
                                    }}
                                >
                                    {letter}
                                </motion.div>
                            ))
                        ) : (
                            // Optimized image rendering
                            <motion.div
                                variants={textStaggerAnim}
                                initial="hidden"
                                animate="show"
                                style={{
                                    willChange: "transform, opacity",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <motion.div
                                    className={styles.staggerImageContainer}
                                    variants={imageStaggerAnim}
                                    initial="hidden"
                                    animate="show"
                                    style={{
                                        willChange: "transform, opacity",
                                        contain: "layout style",
                                    }}
                                >
                                    <Image
                                        src={content}
                                        unoptimized
                                        className={styles.staggerGif}
                                        alt="hero-animation"
                                        priority={wordIdx < 3} // Priority for first 3 images
                                        loading={wordIdx < 3 ? 'eager' : 'lazy'}
                                        blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                                        placeholder='blur'
                                        // sizes="(max-width: 768px) 50px, 80px"
                                        style={{
                                            willChange: "transform",
                                            backfaceVisibility: "hidden",
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

export default TextStaggerComponent;
