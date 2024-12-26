"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import styles from "./styles.module.scss";
import { inter, pp_nueue, roboto_mono, space_grotesk } from "@/utils/fonts";

const transforms = [
    {
        x: -0.8,
        y: -0.6,
        rotationZ: -29,
    },
    {
        x: -0.2,
        y: -0.4,
        rotationZ: -6,
    },
    {
        x: -0.05,
        y: 0.1,
        rotationZ: 12,
    },
    {
        x: -0.05,
        y: -0.1,
        rotationZ: -9,
    },
    {
        x: -0.1,
        y: 0.55,
        rotationZ: 3,
    },
    {
        x: 0,
        y: -0.1,
        rotationZ: 9,
    },
    {
        x: 0,
        y: 0.15,
        rotationZ: -12,
    },
    {
        x: 0,
        y: 0.15,
        rotationZ: -17,
    },
    {
        x: 0,
        y: -0.65,
        rotationZ: 9,
    },
    {
        x: 0.1,
        y: 0.4,
        rotationZ: 12,
    },
    {
        x: 0,
        y: -0.15,
        rotationZ: -9,
    },
    {
        x: 0.2,
        y: 0.15,
        rotationZ: 12,
    },
    {
        x: 0.8,
        y: 0.6,
        rotationZ: 20,
    },
];

const disperseAnim = {
    hover: (i: number) => ({
        x: transforms[i].x + "em",
        y: transforms[i].y + "em",
        rotateZ: transforms[i].rotationZ,
        transition: {
            duration: 0.75,
            ease: [0.33, 1, 0.68, 1],
            zIndex: 1,
        },
    }),
    leave: {
        x: 0,
        y: 0,
        rotateZ: 0,
        transition: {
            duration: 0.75,
            ease: [0.33, 1, 0.68, 1],
            zIndex: 0,
        },
    },
};

function TextDisperseComponent({ word }: { word: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const splitChars = (word: string) => {
        const chars = [];
        word.split("").forEach((char: string, index: number) => {
            chars.push(
                <motion.span
                    key={`disperse-letter-${index}`}
                    variants={disperseAnim}
                    initial="leave"
                    animate={isHovered ? "hover" : "leave"}
                    custom={index}
                >
                    {char}
                </motion.span>,
            );
        });

        return chars;
    };

    return (
        <p
            className={styles.textDisperseContainer}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {splitChars(word)}
        </p>
    );
}

export default TextDisperseComponent;
