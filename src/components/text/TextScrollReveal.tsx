"use client";

import React, { useRef } from "react";

import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

function Word({ children, range, progress }:
    { children: React.ReactNode, range: [number, number], progress: MotionValue<number> }) {
    const opacity = useTransform(progress, range, [0, 1]);
    const shadowOpacity = useTransform(progress, range, [0.4, 0]);

    return <div className={styles.wordWrapper}>
        <motion.div className={styles.shadowWordContainer} style={{ opacity: shadowOpacity }}>
            <span className={styles.shadowWord}>{children}</span>
        </motion.div>
        <motion.span className={styles.wordContainer} style={{ opacity }}>{children}</motion.span>
    </div>
}

function TextScrollRevealComponent({ phrase }: { phrase: string }) {
    const elementRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: elementRef,
        offset: ["start 0.8", "end 0.25"],
    });

    const words = phrase.split(" ");


    return (
        <div className={`${styles.textRevealWrapper} ${pp_nekkei.className}`}>
            <div className={styles.textRevealContainer} ref={elementRef}>
                {words.map((word, index) => {
                    const start = index / words.length;
                    const end = start + (1 / words.length);
                    return <Word
                        key={`word-${index}`}
                        range={[start, end]} progress={scrollYProgress}>{word}</Word>
                })}
            </div>
        </div>
    );
}

export default TextScrollRevealComponent;
