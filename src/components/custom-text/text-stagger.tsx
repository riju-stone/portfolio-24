"use client";

import React, { useMemo, useRef } from 'react'
import { motion, useInView } from "motion/react"

import styles from "./styles.module.scss"
import { pp_nueue } from '@/utils/fonts'


const containerAnim = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
        }
    }
}

const splitByLetter = (text: string) => {
    return text.split("").map((letter, index) => ({
        content: letter,
        id: `letter-${index}`,
        idx: index
    }));
}

const splitByWord = (text: string) => {
    return text.split(" ").map((word, index) => ({
        content: word,
        id: `word-${index}`,
        idx: index
    }));
}

const splitByLine = (text: string, wordsPerLine: number) => {
    const words = text.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines.map((line, index) => ({
        content: line,
        id: `line-${index}`,
        idx: index
    }));
}

interface TextStaggerComponentProps {
    once?: boolean;
    text: string;
    className?: string;
    style?: "letter" | "word" | "line";
    wordsPerLine?: number;
    duration?: number;
    delay?: number;
    staggerDelay?: number;
}

function TextStaggerComponent({ text, className, style = "letter", wordsPerLine = 1, delay = 0.5, staggerDelay = 0.04, duration = 0.5, once = true }: TextStaggerComponentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: once, margin: "0px 100px" });

    const textStaggerAnim = useMemo(() => ({
        hidden: {
            y: "100%",
            opacity: 0,
        },
        show: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: duration,
                delay: delay + i * staggerDelay,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    }), [style]);

    const processedText = useMemo(() => {
        if (style === "letter") return splitByLetter(text);
        if (style === "word") return splitByWord(text);
        if (style === "line") return splitByLine(text, wordsPerLine);
    }, [text, style]);

    return (
        <motion.div
            ref={containerRef}
            className={`${styles[`textStaggerWrapper-${style}`]} ${className || ''}`}
            variants={containerAnim}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
        >
            {processedText.map(({ id, idx, content }: { id: string, idx: number, content: string }) => (
                <div key={id} className={styles.textStaggerContainer}>
                    <div className={styles.staggerContent}>
                        <motion.div className={styles.staggerItem} variants={textStaggerAnim} custom={idx}>
                            {style == "line" ?
                                content.split(" ").map((word, index) => <span key={`word-${index}`}>{word}</span>) : content}
                        </motion.div>
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

export default TextStaggerComponent;