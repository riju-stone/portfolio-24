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
        gsap.set(charRefs.current, {
            opacity: 0,
            y: 30, // Add slight vertical movement for better effect
            willChange: "opacity, transform",
        });

        // Create optimized animation
        const animation = gsap.to(charRefs.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 40%", // Start earlier for smoother entry
                end: `+=${window.innerHeight}`, // End later for complete animation
                scrub: 1.2, // Slightly slower scrub for smoother feel
                once: false, // Allow re-triggering for better UX
                invalidateOnRefresh: true,
                // Performance optimizations
                refreshPriority: -1,
                fastScrollEnd: true,
                anticipatePin: 1,
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out", // Better easing for smoother animation
            stagger: {
                amount: 1.2, // Reduced stagger time for faster reveal
                from: "start",
                ease: "power2.inOut",
            },
            onComplete: () => {
                // Clean up will-change after animation
                gsap.set(charRefs.current, {
                    willChange: "auto",
                });
            },
        });

        animationRef.current = animation;
    };

    function splitWords(phrase: string) {
        const words: JSX.Element[] = [];
        let charIndex = 0;

        phrase.split(" ").forEach((word: string, wordIndex: number) => {
            const letters = splitLetters(word, charIndex);
            charIndex += word.length;

            words.push(
                <p key={`word-${wordIndex}`} className={styles.wordContainer}>
                    {letters}
                </p>
            );
        });

        return words;
    }

    function splitLetters(word: string, startIndex: number) {
        const letters: JSX.Element[] = [];

        word.split("").forEach((letter: string, letterIndex: number) => {
            const globalIndex = startIndex + letterIndex;

            letters.push(
                <span
                    key={`letter-${globalIndex}`}
                    className={styles.letterContainer}
                    ref={(el) => {
                        if (el) charRefs.current[globalIndex] = el;
                    }}
                    style={{
                        // Inline optimization hints
                        display: "inline-block",
                        backfaceVisibility: "hidden",
                    }}
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
            style={{
                // Performance optimizations
                contain: "layout style",
                willChange: "transform",
            }}
        >
            <div className={styles.textRevealContainer}>
                {memoizedWords}
            </div>
        </div>
    );
}

export default TextScrollRevealComponent;
