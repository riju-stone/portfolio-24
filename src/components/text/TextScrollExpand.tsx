"use client";

import React, { useEffect, useRef, useMemo } from "react";

import styles from "./styles.module.scss";
import { roboto_mono } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TextScrollExpandComponent({ word }: { word: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    // Memoize split characters to prevent unnecessary re-renders
    const splitCharacters = useMemo(() => {
        return word.split("").map((letter, index) => ({
            letter,
            index,
            key: `repl-letter-group-${index}`
        }));
    }, [word]);

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
    }, []);

    const initOptimizedAnimation = () => {
        if (!containerRef.current || letterRefs.current.length === 0) return;

        // Kill existing animation if any
        if (animationRef.current) {
            animationRef.current.kill();
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Start earlier for smoother entry
                end: "bottom 20%", // End later for smoother exit
                scrub: 1, // Add smoothing to scrub
                once: false,
                invalidateOnRefresh: true, // Better responsive behavior
                // Optimize performance
                refreshPriority: -1,
                fastScrollEnd: true,
            },
        });

        // Use will-change for better performance
        gsap.set(letterRefs.current, {
            willChange: "letter-spacing, text-indent",
        });

        // Optimized animation with better easing
        tl.fromTo(
            letterRefs.current,
            {
                letterSpacing: "-0.5em",
                textIndent: "-0.5em",
            },
            {
                letterSpacing: "0.3em",
                textIndent: "0.3em",
                duration: 1,
                ease: "power2.out",
                stagger: {
                    amount: 0.1,
                    from: "start"
                }
            }
        );

        // Clean up will-change after animation
        tl.set(letterRefs.current, {
            willChange: "auto",
        });

        animationRef.current = tl;
    };

    // Optimized letter replication with reduced count
    const replLetters = (letter: string, count: number = 5) => { // Reduced from 9 to 5
        const replLetters = [];
        for (let i = 0; i < count; i++) {
            replLetters.push(
                <div
                    key={`repl-letter-${letter}-${i}`}
                    className={styles.replLetter}
                    data-item={`${letter}-${i}`}
                >
                    {letter}
                </div>
            );
        }
        return replLetters;
    };

    // Optimized rendering with proper ref handling
    const renderLetterGroups = () => {
        letterRefs.current = []; // Reset refs array

        return splitCharacters.map(({ letter, index, key }) => (
            <div
                key={key}
                className={styles.replLetterGroup}
                ref={(el) => {
                    if (el) letterRefs.current[index] = el;
                }}
            >
                {replLetters(letter, 7)} {/* Reduced replication count */}
            </div>
        ));
    };

    return (
        <div
            ref={containerRef}
            className={`${styles.textExpandWrapper} ${roboto_mono.className}`}
            style={{
                // Add CSS optimization hints
                contain: "layout style",
                willChange: "transform",
            }}
        >
            {renderLetterGroups()}
        </div>
    );
}

export default TextScrollExpandComponent;
