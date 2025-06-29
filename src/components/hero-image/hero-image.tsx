"use client"

import React from "react";
import Image from "next/image";

import styles from "./styles.module.scss"

// Hero Light Splits
import HeroLightSplit1 from "@/assets/images/hero-light/row-1-column-1.jpg"
import HeroLightSplit2 from "@/assets/images/hero-light/row-1-column-2.jpg"
import HeroLightSplit3 from "@/assets/images/hero-light/row-1-column-3.jpg"
import HeroLightSplit4 from "@/assets/images/hero-light/row-1-column-4.jpg"
import HeroLightSplit5 from "@/assets/images/hero-light/row-1-column-5.jpg"
import HeroLightSplit6 from "@/assets/images/hero-light/row-1-column-6.jpg"
import HeroLightSplit7 from "@/assets/images/hero-light/row-1-column-7.jpg"
import HeroLightSplit8 from "@/assets/images/hero-light/row-1-column-8.jpg"
import HeroLightSplit9 from "@/assets/images/hero-light/row-1-column-9.jpg"
import HeroLightSplit10 from "@/assets/images/hero-light/row-1-column-10.jpg"

// Hero Dark Splits
import HeroDarkSplit1 from "@/assets/images/hero-dark/row-1-column-1.jpg"
import HeroDarkSplit2 from "@/assets/images/hero-dark/row-1-column-2.jpg"
import HeroDarkSplit3 from "@/assets/images/hero-dark/row-1-column-3.jpg"
import HeroDarkSplit4 from "@/assets/images/hero-dark/row-1-column-4.jpg"
import HeroDarkSplit5 from "@/assets/images/hero-dark/row-1-column-5.jpg"
import HeroDarkSplit6 from "@/assets/images/hero-dark/row-1-column-6.jpg"
import HeroDarkSplit7 from "@/assets/images/hero-dark/row-1-column-7.jpg"
import HeroDarkSplit8 from "@/assets/images/hero-dark/row-1-column-8.jpg"
import HeroDarkSplit9 from "@/assets/images/hero-dark/row-1-column-9.jpg"
import HeroDarkSplit10 from "@/assets/images/hero-dark/row-1-column-10.jpg"
import { useThemeStore } from "@/stores/themeStore";
import { AnimatePresence, delay, motion } from "motion/react";

const heroImageSplitsLight = [
  HeroLightSplit1,
  HeroLightSplit2,
  HeroLightSplit3,
  HeroLightSplit4,
  HeroLightSplit5,
  HeroLightSplit6,
  HeroLightSplit7,
  HeroLightSplit8,
  HeroLightSplit9,
  HeroLightSplit10,
]

const heroImageSplitsDark = [
  HeroDarkSplit1,
  HeroDarkSplit2,
  HeroDarkSplit3,
  HeroDarkSplit4,
  HeroDarkSplit5,
  HeroDarkSplit6,
  HeroDarkSplit7,
  HeroDarkSplit8,
  HeroDarkSplit9,
  HeroDarkSplit10,
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
  return <div
    className={styles.heroImageWrapper}>
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
                  <Image key={`${index}-light`} src={split} alt="Hero Image" priority={true} placeholder="blur" blurDataURL="..." />
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
                  <Image key={`${index}-dark`} src={split} alt="Hero Image" priority={true} placeholder="blur" blurDataURL="..." />
                </motion.div>
              </div>
            ))
          }
        </AnimatePresence>
      </div>
    )}
  </div >
}