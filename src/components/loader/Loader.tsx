"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";

import styles from "./styles.module.scss";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import { loadingScreenAnim, getProgressAnim } from "./animations";
import { pp_nekkei } from "@/utils/fonts";

function LoaderComponent({ children }) {
    const progressBarRef = useRef(null);
    const animationStartTimeRef = useRef(null);
    const lastUpdateTimeRef = useRef(0);

    const [loading, setLoading] = useState(true);
    const [progressPercent, setProgressPercent] = useState("000");
    const [progressAnim, setProgressAnim] = useState(null);

    const getPercentPosition = useCallback((percentStr: string) => {
        const percent = Number(percentStr);
        return `${Math.min(Math.max(percent - 5, 0), 90)}%`;
    }, []);

    const handleAnimationComplete = useCallback(() => {
        setTimeout(() => setLoading(false), 400);
    }, []);

    const memoizedProgressAnim = useMemo(() => {
        if (typeof window !== 'undefined') {
            return getProgressAnim();
        }
        return null;
    }, []);


    useEffect(() => {
        setProgressAnim(memoizedProgressAnim);
        animationStartTimeRef.current = Date.now();
    }, [memoizedProgressAnim]);

    useAnimationFrame((time) => {
        if (!progressAnim || !loading) return;

        if (time - lastUpdateTimeRef.current < 100) return;
        lastUpdateTimeRef.current = time;

        if (progressBarRef.current && typeof window !== 'undefined') {
            const progressPos = progressBarRef.current.getBoundingClientRect().left;
            const normalizedPos = Math.abs(progressPos);

            let percent = Math.abs(normalizedPos - window.screen.width);
            percent = Math.floor((percent / window.screen.width) * 100);

            if (percent % 25 === 0) {
                const paddedPercent = String(percent).padStart(3, "0");
                setProgressPercent(paddedPercent);
            }
        }
    });

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
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
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
                        onAnimationComplete={handleAnimationComplete}
                    />
                </motion.div>
            ) : (
                <>{children}</>
            )}
        </AnimatePresence>
    );
}

export default LoaderComponent;