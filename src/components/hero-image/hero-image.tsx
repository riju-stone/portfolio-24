"use client"

import React, { Suspense } from "react";
import Image from "next/image";

import styles from "./styles.module.scss"

import { useThemeStore } from "@/stores/themeStore";
import { AnimatePresence, motion } from "motion/react";

const heroImageSplitsLight = [
  "/images/hero-light/row-1-column-1.jpg",
  "/images/hero-light/row-1-column-2.jpg",
  "/images/hero-light/row-1-column-3.jpg",
  "/images/hero-light/row-1-column-4.jpg",
  "/images/hero-light/row-1-column-5.jpg",
  "/images/hero-light/row-1-column-6.jpg",
  "/images/hero-light/row-1-column-7.jpg",
  "/images/hero-light/row-1-column-8.jpg",
  "/images/hero-light/row-1-column-9.jpg",
  "/images/hero-light/row-1-column-10.jpg",
]

const heroImageSplitsDark = [
  "/images/hero-dark/row-1-column-1.jpg",
  "/images/hero-dark/row-1-column-2.jpg",
  "/images/hero-dark/row-1-column-3.jpg",
  "/images/hero-dark/row-1-column-4.jpg",
  "/images/hero-dark/row-1-column-5.jpg",
  "/images/hero-dark/row-1-column-6.jpg",
  "/images/hero-dark/row-1-column-7.jpg",
  "/images/hero-dark/row-1-column-8.jpg",
  "/images/hero-dark/row-1-column-9.jpg",
  "/images/hero-dark/row-1-column-10.jpg",
]

const heroImageAnimation = {
  initial: {
    x: "-105%",
    transition: {
      delay: 0.3,
    }
  },
  animate: { x: "0%" },
  exit: { x: "105%" },
  transition: { duration: 1, ease: [0.83, 0, 0.17, 1] }
}

export default function HeroImage() {
  const theme = useThemeStore(state => state.theme);
  return <Suspense fallback={<div>Loading...</div>}>
    <div className={styles.heroImageWrapper}>
      {theme === "light" ? (
        <div className={styles.heroImageSplits}>
          <AnimatePresence mode="wait">
            {
              heroImageSplitsLight.map((split, index) => (
                <div className={styles.heroImageSplit} key={`hero-image-light-split-${index}`}>
                  <motion.div
                    variants={heroImageAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image key={`${index}-light`}
                      width={100}
                      height={100}
                      src={split}
                      alt="Hero Image"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." />
                  </motion.div>
                </div>
              ))
            }
          </AnimatePresence>
        </div>
      ) : (
        <div className={styles.heroImageSplits}>
          <AnimatePresence mode="wait">
            {
              heroImageSplitsDark.map((split, index) => (
                <div className={styles.heroImageSplit} key={`hero-image-dark-split-${index}`}>
                  <motion.div
                    variants={heroImageAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image
                      key={`${index}-dark`}
                      src={split}
                      width={100}
                      height={100}
                      alt="Hero Image"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." />
                  </motion.div>
                </div>
              ))
            }
          </AnimatePresence>
        </div>
      )}
    </div >
  </Suspense>
}