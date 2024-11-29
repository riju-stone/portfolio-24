"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import { loadingScreenAnim, progressAnim } from "./animations";
import { pp_nekkei } from "@/utils/fonts";

function LoaderComponent({ children }) {
  const env = process.env.NEXT_PUBLIC_ENV;
  const progressBarRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const phraseArray = [
    "Hola",
    "مرحبًا",
    "γεια",
    "Ciao",
    "Привет",
    "नमस्ते",
    "Hello",
  ];

  useEffect(() => {
    if (phraseIndex === phraseArray.length - 1) return;
    setTimeout(() => {
      setPhraseIndex(phraseIndex + 1);
    }, 800);
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
      {loading && env != "dev" ? (
        <motion.div
          key="loader"
          className={`${styles.loaderWrapper} ${pp_nekkei.className}`}
          variants={loadingScreenAnim}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className={styles.portfolioVersion}>Portfolio 24</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`greeting-${phraseIndex}`}
              className={styles.loadingMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {phraseArray[phraseIndex]}
            </motion.div>
          </AnimatePresence>
          <motion.div
            className={styles.loadingPercent}
            initial={{ opacity: 0, bottom: 0 }}
            animate={{
              opacity: 1,
              bottom: `${Math.min(progressPercent, 85)}%`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
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
          </motion.div>

          <motion.div
            ref={progressBarRef}
            className={styles.loadingProgress}
            variants={progressAnim}
            onAnimationComplete={() => setLoading(false)}
          />
        </motion.div>
      ) : (
        <>{children}</>
      )}
    </AnimatePresence>
  );
}

export default LoaderComponent;
