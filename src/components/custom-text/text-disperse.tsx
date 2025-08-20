"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { m, useInView, LazyMotion, domAnimation } from "motion/react";
import styles from "./styles.module.scss";
import { useThemeStore } from "@/stores/themeStore";

const hoverTransforms = [
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

const disperseAnim = {
    blurred: (i: number) => {
        const transform = hoverTransforms[i % hoverTransforms.length];
        return {
            filter: "blur(12px)",
            x: (transform.x * Math.random() * 2) + "em",
            y: (transform.y * Math.random() * 2) + "em",
            rotateZ: (transform.rotationZ * Math.random() * 8),
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        }
    },
    hover: (i: number) => {
        const transform = hoverTransforms[i % hoverTransforms.length];
        return {
            filter: "blur(0px)",
            x: transform.x + "em",
            y: transform.y + "em",
            rotateZ: transform.rotationZ,
            transition: {
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        };
    },
    leave: {
        filter: "blur(0px)",
        x: 0,
        y: 0,
        rotateZ: 0,
        transition: {
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

interface TextDisperseComponentProps {
    word: string;
}

function TextDisperseComponent({ word }: TextDisperseComponentProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const theme = useThemeStore(state => state.theme);
    const [isHovered, setIsHovered] = useState(false);
    const isInView = useInView(containerRef, { once: true, margin: "0px 0px -200px 0px" });

    const splitCharacters = useMemo(() => {
        return word.split("").map((char, index) => ({
            char,
            key: `disperse-letter-${index}`,
            index,
        }));
    }, [word]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const renderCharacters = () => {
        return splitCharacters.map(({ char, key, index }) => (
            <m.span
                key={key}
                variants={disperseAnim}
                animate={isHovered ? "hover" : isInView ? "leave" : "blurred"}
                custom={index}
                style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    transformOrigin: "center center",
                }}
            >
                {char}
            </m.span>
        ));
    };

    return (
        <LazyMotion features={domAnimation}>
            <p
                ref={containerRef}
                className={`${styles.textDisperseContainer} ${styles[theme]}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {renderCharacters()}
            </p>
        </LazyMotion>
    );
}

export default TextDisperseComponent;
