"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import styles from "./styles.module.scss";

// Optimized transforms with better distribution and reduced extreme values
const transforms = [
    { x: -0.6, y: -0.4, rotationZ: -20 },
    { x: -0.15, y: -0.3, rotationZ: -5 },
    { x: -0.05, y: 0.08, rotationZ: 8 },
    { x: -0.03, y: -0.08, rotationZ: -6 },
    { x: -0.08, y: 0.4, rotationZ: 2 },
    { x: 0, y: -0.08, rotationZ: 6 },
    { x: 0, y: 0.12, rotationZ: -8 },
    { x: 0, y: 0.12, rotationZ: -12 },
    { x: 0, y: -0.5, rotationZ: 6 },
    { x: 0.08, y: 0.3, rotationZ: 8 },
    { x: 0, y: -0.12, rotationZ: -6 },
    { x: 0.15, y: 0.12, rotationZ: 8 },
    { x: 0.6, y: 0.4, rotationZ: 15 },
];

// Optimized animation variants with better performance
const disperseAnim = {
    hover: (i: number) => {
        const transform = transforms[i % transforms.length]; // Safe array access
        return {
            x: transform.x + "em",
            y: transform.y + "em",
            rotateZ: transform.rotationZ,
            transition: {
                duration: 0.6, // Slightly faster for better responsiveness
                ease: [0.33, 1, 0.68, 1],
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        };
    },
    leave: {
        x: 0,
        y: 0,
        rotateZ: 0,
        transition: {
            duration: 0.5, // Faster return animation
            ease: [0.33, 1, 0.68, 1],
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

// Container animation for orchestration
const containerAnim = {
    hover: {
        transition: {
            staggerChildren: 0.02, // Reduced stagger for smoother effect
        },
    },
    leave: {
        transition: {
            staggerChildren: 0.01,
        },
    },
};

interface TextDisperseComponentProps {
    word: string;
}

function TextDisperseComponent({ word }: TextDisperseComponentProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Memoize character splitting to prevent unnecessary re-renders
    const splitCharacters = useMemo(() => {
        return word.split("").map((char, index) => ({
            char,
            key: `disperse-letter-${index}`,
            index,
        }));
    }, [word]);

    // Memoized event handlers for better performance
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    // Memoized character rendering
    const renderCharacters = useMemo(() => {
        return splitCharacters.map(({ char, key, index }) => (
            <motion.span
                key={key}
                variants={disperseAnim}
                initial="leave"
                animate={isHovered ? "hover" : "leave"}
                custom={index}
                style={{
                    // Performance optimizations
                    display: "inline-block",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    transformOrigin: "center center",
                }}
            >
                {char}
            </motion.span>
        ));
    }, [splitCharacters, isHovered]);

    return (
        <motion.p
            className={styles.textDisperseContainer}
            variants={containerAnim}
            initial="leave"
            animate={isHovered ? "hover" : "leave"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter} // Touch support for mobile
            onTouchEnd={handleMouseLeave}
            style={{
                // Performance optimizations
                contain: "layout style",
                willChange: "transform",
                cursor: "pointer",
            }}
        >
            {renderCharacters}
        </motion.p>
    );
}

export default TextDisperseComponent;
