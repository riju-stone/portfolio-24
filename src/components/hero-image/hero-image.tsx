"use client"

import React from "react";
import Image from "next/image";

import styles from "./styles.module.scss"

import { useThemeStore } from "@/stores/themeStore";
import { AnimatePresence, motion } from "motion/react";
import { useDevice } from "@/hooks/useDevice";

const heroImageAnimation = {
  initial: {
    x: "-105%",
  },
  animate: {
    x: "0%",
    transition: { duration: 1.2, delay: 0.5, ease: [0.83, 0, 0.17, 1] }
  },
  exit: {
    x: "105%",
    transition: { duration: 0.2 }
  }
}

const IMAGE_CONFIG = {
  light: {
    desktop: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    mobile: [3, 4, 5, 6, 7, 8]
  },
  dark: {
    desktop: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    mobile: [3, 4, 5, 6, 7, 8]
  }
} as const;

export default function HeroImage() {
  const device = useDevice();
  const theme = useThemeStore(state => state.theme);

  const deviceKey = device === "mobile" ? "mobile" : "desktop";
  const themeFolder = theme === "light" ? "hero-light" : "hero-dark";
  const indices = IMAGE_CONFIG[theme][deviceKey];

  return (
    <div className={styles.heroImageWrapper}>
      <div className={styles.heroImageSplits}>
        <AnimatePresence mode="wait">
          {indices.map((num: number, index: number) => (
            <div className={styles.heroImageSplit} key={`hero-image-${theme}-split-${index}`}>
              <motion.div
                variants={heroImageAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Image
                  key={`${index}-${theme}`}
                  src={`/images/${themeFolder}/row-1-column-${num}.jpg`}
                  alt={`Hero image segment ${index + 1}`}
                  width={400}
                  height={400}
                  priority={index < 3}
                  quality={55}
                  placeholder="blur"
                  blurDataURL="..."
                />
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}