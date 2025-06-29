"use client";

import React, { useEffect, useRef, useMemo } from "react";

import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TextScrollRevealComponent({ phrase }: { phrase: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    // Memoize the phrase splitting to prevent unnecessary re-renders
    const memoizedWords = useMemo(() => {
        charRefs.current = []; // Reset refs array
        return splitWords(phrase);
    }, [phrase]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            initOptimizedAnimation();
        });

        return () => {
            ctx.revert();
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [memoizedWords]);

    const initOptimizedAnimation = () => {
        if (!containerRef.current || charRefs.current.length === 0) return;

        // Kill existing animation if any
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Set initial state for better performance
        const validRefs = charRefs.current.filter(ref => ref !== null);
        if (validRefs.length === 0) return;

        gsap.set(validRefs, {
            opacity: 0,
            y: 20
        });

        // Create optimized animation
        const animation = gsap.to(validRefs, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 20%",
                end: `+=${window.innerHeight}`,
                scrub: 0,
                once: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: {
                amount: 1,
                from: "start",
                ease: "power2.inOut",
            },
        });

        animationRef.current = animation;
    };

    function splitWords(phrase: string) {
        const words: JSX.Element[] = [];

        phrase.split(" ").forEach((word: string, wordIndex: number) => {
            const letters = splitLetters(word);

            words.push(
                <p key={`word-${wordIndex}`} data-index={wordIndex} className={styles.wordContainer}>
                    {letters}
                </p>
            );
        });

        return words;
    }

    function splitLetters(word: string) {
        const letters: JSX.Element[] = [];


        word.split("").forEach((letter: string, letterIndex: number) => {
            letters.push(
                <span
                    key={`letter-${letter}-${letterIndex}`}
                    className={styles.letterContainer}
                    ref={(el) => { charRefs.current.push(el); }}
                >
                    {letter}
                </span>
            );
        });

        return letters;
    }

    return (
        <div
            className={`${styles.textRevealWrapper} ${pp_nekkei.className}`}
            ref={containerRef}
        >
            <div className={styles.textRevealContainer}>
                {memoizedWords}
            </div>
        </div>
    );
}

export default TextScrollRevealComponent;
