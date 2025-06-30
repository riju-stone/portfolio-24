"use client";

import React, { useRef, useState, useEffect } from "react";

import styles from "./styles.module.scss";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import { loadingScreenAnim, getProgressAnim } from "./animations";
import { pp_nekkei } from "@/utils/fonts";

function LoaderComponent({ children }) {
    const progressBarRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [progressPercent, setProgressPercent] = useState("0");
    const [progressAnim, setProgressAnim] = useState(null);

    const getPercentPosition = (percentStr: string) => {
        const percent: number = Number(percentStr);
        return Math.min(Math.max(percent - 5, 0), 88) + "%";
    }

    // Only get the animation object after component mounts
    useEffect(() => {
        setProgressAnim(getProgressAnim());
    }, []);

    useAnimationFrame(() => {
        let progressPos = 0;
        if (progressBarRef.current && typeof window !== 'undefined') {
            progressPos = progressBarRef.current.getBoundingClientRect().left;
            progressPos = Math.floor(Math.abs(progressPos));

            let percent = Math.abs(progressPos - window.screen.width);
            percent = Math.floor((percent / window.screen.width) * 100);

            if (percent % 25 == 0) {
                setProgressPercent(String(percent).padStart(3, "0"));
            }
        }
    });

    // Don't render the progress bar until we have the animation object
    if (!progressAnim) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    className={styles.loaderWrapper}
                    variants={loadingScreenAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    <motion.div
                        initial={{ bottom: "0%" }}
                        animate={{ bottom: getPercentPosition(progressPercent) }}
                        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1], delay: 0.1 }}
                        className={`${styles.loadingPercent} ${pp_nekkei.className}`}>
                        {progressPercent.split("").map((letter, idx) => (
                            <AnimatePresence mode="wait" key={`loading-digit-${idx}`}>
                                <motion.span
                                    key={`loading-digit-${letter}-${idx}`}
                                    className={styles.percentDigit}
                                    initial={{ opacity: 0, y: -80 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 80 }}
                                    transition={{
                                        duration: 0.125,
                                        delay: (progressPercent.length - idx) * 0.1
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            </AnimatePresence>

                        ))}

                    </motion.div>
                    <motion.div
                        ref={progressBarRef}
                        className={styles.loadingProgress}
                        variants={progressAnim}
                        onAnimationComplete={() => setTimeout(() => setLoading(false), 400)}
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