"use client"

import React, { useMemo } from "react";
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

export default function HeroImage() {
  const theme = useThemeStore(state => state.theme);

  const currentImages = useMemo(() => {
    return theme === "light" ? heroImageSplitsLight : heroImageSplitsDark;
  }, [theme]);

  const imageSizes = "(max-width: 639px) 100vw, (max-width: 1024px) 85vw, 65vw";

  return <div className={styles.heroImageWrapper}>
    <div className={styles.heroImageSplits}>
      <AnimatePresence mode="wait">
        {currentImages.map((split, index) => (
          <div className={styles.heroImageSplit} key={`hero-image-${theme}-split-${index}`}>
            <motion.div
              variants={heroImageAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                key={`${index}-${theme}`}
                src={split}
                alt={`Hero image segment ${index + 1}`}
                width={400}
                height={400}
                priority={index < 3} // Prioritize first 3 images
                quality={55}
                sizes={imageSizes}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyv"
              />
            </motion.div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  </div>
}