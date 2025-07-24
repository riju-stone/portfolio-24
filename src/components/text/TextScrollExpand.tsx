"use client";

import React, { useRef, useMemo, memo } from "react";
import styles from "./styles.module.scss";
import { roboto_mono } from "@/utils/fonts";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

// Define interfaces
interface LetterProps {
    letter: string;
    duplicateCount?: number;
}

interface TextScrollExpandProps {
    word: string;
    duplicateCount?: number;
    scrollOffset?: [string, string];
    spacingRange?: [string, string];
    className?: string;
    fontSize?: string;
    opacity?: number;
}

// Custom CSS properties type
interface CustomCSSProperties extends React.CSSProperties {
    '--letter-spacing'?: MotionValue<string>;
}

// Single letter component without individual motion
const Letter = memo(({ letter, duplicateCount = 6 }: LetterProps) => {
    const duplicates = useMemo(
        () => Array.from({ length: duplicateCount }, (_, i) => i),
        [duplicateCount]
    );

    return (
        <div className={styles.replLetterGroup}>
            {duplicates.map((index) => (
                <div
                    key={index}
                    className={styles.replLetter}
                    aria-hidden={index > 0} // Hide duplicates from screen readers
                >
                    {letter}
                </div>
            ))}
        </div>
    );
});

function TextScrollExpandComponent({
    word,
    duplicateCount = 6,
    spacingRange = ["-3rem", "5rem"]
}: TextScrollExpandProps) {
    // Validate inputs
    if (!word || typeof word !== 'string') {
        console.warn('TextScrollExpand: Invalid word prop provided');
        return null;
    }

    if (duplicateCount < 1 || duplicateCount > 20) {
        console.warn('TextScrollExpand: duplicateCount should be between 1 and 20');
        duplicateCount = Math.max(1, Math.min(20, duplicateCount));
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const letters = useMemo(() => word.split(""), [word]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.65"] as const,
        layoutEffect: false
    });

    const letterSpacing = useTransform(scrollYProgress, [0, 1], spacingRange);

    return (
        <motion.section
            ref={containerRef}
            className={`${styles.textExpandWrapper} ${roboto_mono.className}`}
            style={{
                "--letter-spacing": letterSpacing,
                transform: "translate3d(0,0,0)",
            } as CustomCSSProperties}
            aria-label={`Animated text: ${word}`}
        >
            <div aria-hidden="true">
                {letters.map((letter, index) => (
                    <Letter
                        key={`${index}-${letter}`}
                        letter={letter}
                        duplicateCount={duplicateCount}
                    />
                ))}
            </div>
        </motion.section>
    );
}

export default memo(TextScrollExpandComponent);
