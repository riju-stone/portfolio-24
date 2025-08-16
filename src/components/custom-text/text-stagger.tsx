"use client";

import React, { useMemo, useRef, useCallback } from 'react'
import { motion, useInView } from "motion/react"

import styles from "./styles.module.scss"

const containerAnim = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
        }
    }
}

const createTextProcessors = () => {
    const splitByLetter = (text: string) => {
        return text.split("").map((letter, index) => ({
            content: letter,
            id: `letter-${index}`,
            idx: index
        }));
    };

    const splitByWord = (text: string) => {
        return text.split(" ").filter(word => word.length > 0).map((word, index) => ({
            content: word,
            id: `word-${index}`,
            idx: index
        }));
    };

    const splitByLine = (text: string, wordsPerLine: number) => {
        const words = text.split(" ").filter(word => word.length > 0);
        const lines = [];
        for (let i = 0; i < words.length; i += wordsPerLine) {
            lines.push(words.slice(i, i + wordsPerLine).join(" "));
        }
        return lines.map((line, index) => ({
            content: line,
            id: `line-${index}`,
            idx: index
        }));
    };

    return { splitByLetter, splitByWord, splitByLine };
};

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

function TextStaggerComponent({
    text,
    className,
    style = "letter",
    wordsPerLine = 1,
    delay = 0.5,
    staggerDelay = 0.04,
    duration = 0.5,
    once = true
}: TextStaggerComponentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: once, margin: "0px 100px" });
    const textProcessors = useMemo(() => createTextProcessors(), []);

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
    }), [duration, delay, staggerDelay]);

    // Memoized text processing
    const processedText = useMemo(() => {
        if (style === "letter") return textProcessors.splitByLetter(text);
        if (style === "word") return textProcessors.splitByWord(text);
        if (style === "line") return textProcessors.splitByLine(text, wordsPerLine);
        return [];
    }, [text, style, wordsPerLine, textProcessors]);

    const renderLineContent = useCallback((content: string) => {
        if (style === "line") {
            return content.split(" ").map((word, index) => (
                <span key={`word-${index}`}>{word}</span>
            ));
        }
        return content;
    }, [style]);

    const containerClassName = useMemo(() =>
        `${styles[`textStaggerWrapper-${style}`]} ${className || ''}`.trim(),
        [style, className]
    );

    return (
        <motion.div
            ref={containerRef}
            className={containerClassName}
            variants={containerAnim}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
        >
            {processedText.map(({ id, idx, content }) => (
                <div key={id} className={styles.textStaggerContainer}>
                    <div className={styles.staggerContent}>
                        <motion.div
                            className={styles.staggerItem}
                            variants={textStaggerAnim}
                            custom={idx}
                        >
                            {renderLineContent(content)}
                        </motion.div>
                    </div>
                </div>
            ))}
        </motion.div>
    )
}

export default TextStaggerComponent;