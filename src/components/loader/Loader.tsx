"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import { loadingScreenAnim, progressAnim } from "./animations";
import { pp_nekkei } from "@/utils/fonts";

function LoaderComponent({ children }) {
    const progressBarRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);

    const phraseArray = [
        "Never",
        "Lose",
        "...",
        "Win",
        "Or",
        "Learn..."
    ];

    const greetingAnimation = {
        "initial": {
            y: 50,
            opacity: 0
        },
        "animate": (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.03 * i
            }
        }),
        "exit": (i: number) => ({
            y: -50,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.03 * i
            }
        })
    }

    useEffect(() => {
        if (phraseIndex === phraseArray.length - 1) return;
        setTimeout(() => {
            setPhraseIndex(phraseIndex + 1);
        }, 1000);
    });

    useAnimationFrame(() => {
        let progressPos = 0;
        if (progressBarRef.current) {
            progressPos = progressBarRef.current.getBoundingClientRect().left;
            progressPos = Math.floor(Math.abs(progressPos));

            let percent = Math.abs(progressPos - window.screen.width);
            percent = Math.floor((percent / window.screen.width) * 100);

            setProgressPercent(percent);
        }
    });

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    className={`${styles.loaderWrapper} ${pp_nekkei.className}`}
                    variants={loadingScreenAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    <div className={styles.loadingMessageContainer}>
                        <AnimatePresence mode="wait">
                            {phraseArray[phraseIndex].split("").map((letter, idx) => {
                                return <motion.div className={styles.loadingMessage} key={`greeting-letter-${phraseArray[phraseIndex]}-${letter}-${idx}`}
                                    variants={greetingAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    custom={idx}
                                >{letter}</motion.div>
                            })}
                        </AnimatePresence>
                    </div>
                    <div
                        className={styles.loadingPercent}
                    >
                        <div className={styles.percentDigit}>
                            {progressPercent == 100 ? `${progressPercent / 100}` : "0"}
                        </div>
                        <div className={styles.percentDigit}>
                            {progressPercent >= 10 && progressPercent < 100
                                ? `${Math.floor(progressPercent / 10)}`
                                : "0"}
                        </div>
                        <div className={styles.percentDigit}>{progressPercent % 10}</div>
                    </div>

                    <motion.div
                        ref={progressBarRef}
                        className={styles.loadingProgress}
                        variants={progressAnim}
                        onAnimationComplete={() => setLoading(false)}
                    />
                </motion.div>
            ) : (
                <>{children}</>
            )
            }
        </AnimatePresence >
    );
}

export default LoaderComponent;
