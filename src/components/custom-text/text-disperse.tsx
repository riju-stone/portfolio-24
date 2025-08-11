"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
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
    hover: (i: number) => {
        const transform = hoverTransforms[i % hoverTransforms.length];
        return {
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
    const theme = useThemeStore(state => state.theme);
    const [isHovered, setIsHovered] = useState(false);

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

    const renderCharacters = useMemo(() => {
        return splitCharacters.map(({ char, key, index }) => (
            <motion.span
                key={key}
                variants={disperseAnim}
                animate={isHovered ? "hover" : "leave"}
                custom={index}
                style={{
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
        <p
            className={`${styles.textDisperseContainer} 
                ${theme === "dark" ? styles[theme] : styles[theme]}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {renderCharacters}
        </p>
    );
}

export default TextDisperseComponent;
