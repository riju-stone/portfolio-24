"use client";

import React, { useRef } from "react";

import styles from "./styles.module.scss";
import { roboto_mono } from "@/utils/fonts";
import { MotionValue, useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";

function LetterGroup({ children, progress, count }:
    { children: string, progress: MotionValue<number>, count: number }) {
    const letterSpacing = useTransform(progress, [0, 1], ["-8rem", "8rem"]);
    return <motion.div className={styles.replLetterGroup} style={{ letterSpacing, textIndent: letterSpacing }}>
        <div className={styles.replLetter}>{children}</div>
        <div className={styles.replLetter}>{children}</div>
        <div className={styles.replLetter}>{children}</div>
        <div className={styles.replLetter}>{children}</div>
        <div className={styles.replLetter}>{children}</div>
        <div className={styles.replLetter}>{children}</div>
    </motion.div>
}

function TextScrollExpandComponent({ word, letterCount }: { word: string, letterCount: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const letters = word.split("");
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.75"],
    });

    // Use useMotionValueEvent to listen to scroll progress changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Scroll progress:", latest);
    });

    return (
        <div
            ref={containerRef}
            className={`${styles.textExpandWrapper} ${roboto_mono.className}`} >
            {letters.map((letter, index) => {
                return <LetterGroup
                    key={`letter-group-${letter}-${index}`}
                    count={letterCount}
                    progress={scrollYProgress}>{letter}</LetterGroup>

            })}
        </div>
    );
}

export default TextScrollExpandComponent;
