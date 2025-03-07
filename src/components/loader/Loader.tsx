"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import { loadingScreenAnim, progressAnim } from "./animations";
import { pp_nekkei, yellow_tail } from "@/utils/fonts";

function LoaderComponent({ children }) {
    const progressBarRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);

    const phraseArray = [
        "Never Lose",
        "Win or Learn",
    ];

    const greetingAnimation = {
        "initial": {
            // y: 50,
            opacity: 0
        },
        "animate": (i: number) => ({
            // y: 0,
            opacity: 1,
            transition: {
                duration: 1.8,
                // ease: [0.22, 1, 0.36, 1],
                delay: 0.65 * i
            }
        }),
        "exit": {
            // y: -50,
            opacity: 0,
            transition: {
                duration: 0.8,
                // ease: [0.16, 1, 0.3, 1],
                // delay: 0.3 * i
            }
        }
    }

    useEffect(() => {
        if (phraseIndex === phraseArray.length - 1) return;
        setTimeout(() => {
            setPhraseIndex(phraseIndex + 1);
        }, 2000);
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
        <AnimatePresence mode="sync">
            {loading ? (
                <motion.div
                    key="loader"
                    className={styles.loaderWrapper}
                    variants={loadingScreenAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    <div className={styles.loadingMessageContainer}>
                        <AnimatePresence mode="wait">
                            {phraseArray[phraseIndex].split(" ").map((word, idx) => {
                                return <motion.div className={`${styles.loadingMessage} ${yellow_tail.className}`} key={`greeting-letter-${phraseArray[phraseIndex]}- ${word} -${idx} `}
                                    variants={greetingAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    custom={idx}
                                >{word}</motion.div>
                            })}
                        </AnimatePresence>
                    </div>
                    <div
                        className={`${styles.loadingPercent} ${pp_nekkei.className} `}
                    >
                        <div className={styles.percentDigit}>
                            {progressPercent == 100 ? `${progressPercent / 100} ` : "0"}
                        </div>
                        <div className={styles.percentDigit}>
                            {progressPercent >= 10 && progressPercent < 100
                                ? `${Math.floor(progressPercent / 10)} `
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
