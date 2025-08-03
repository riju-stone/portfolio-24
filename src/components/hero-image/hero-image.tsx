"use client"

import React, { useEffect, useMemo } from "react";
import Image from "next/image";

import styles from "./styles.module.scss"

import { useThemeStore } from "@/stores/themeStore";
import { AnimatePresence, motion } from "motion/react";
import { useDevice } from "@/hooks/useDevice";

// Proper blur data URL for better placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+on//Z";

const heroImageAnimation = {
  "initial": {
    x: "-105%",
  },
  "animate": (index: number) => ({
    x: "0%",
    transition: {
      duration: 1.2,
      delay: 0.8 + index * 0.01,
      ease: [0.83, 0, 0.17, 1],
    }
  }),
  "exit": {
    x: "105%",
    transition: {
      duration: 0.2,
    }
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

  const { heroImageDir, heroImageIndices } = useMemo(() => {
    if (!device) {
      return {
        heroImageDir: "hero-dark",
        heroImageIndices: IMAGE_CONFIG.dark.mobile
      };
    }

    return {
      heroImageDir: theme === "light" ? "hero-light" : "hero-dark",
      heroImageIndices: IMAGE_CONFIG[theme][device]
    };
  }, [theme, device]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      heroImageIndices.slice(0, 3).forEach((num, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `/images/${heroImageDir}/row-1-column-${num}.webp`;
        document.head.appendChild(link);
      });
    }
  }, [heroImageDir, heroImageIndices]);

  return (
    <div className={styles.heroImageWrapper}>
      <div className={styles.heroImageSplits}>
        <AnimatePresence mode="wait">
          {heroImageIndices.map((num: number, index: number) => (
            <div className={styles.heroImageSplit} key={`hero-image-${theme}-split-${index}`}>
              <motion.div
                variants={heroImageAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={index}
              >
                <Image
                  key={`${index}-${heroImageDir}`}
                  src={`/images/${heroImageDir}/row-1-column-${num}.webp`}
                  alt={`Hero image segment ${index + 1}`}
                  height={400}
                  width={400}
                  priority={index < 3}
                  quality={55}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading={index < 3 ? "eager" : "lazy"}
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}