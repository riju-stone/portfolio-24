"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react'

const heroImageAnimation = {
  "initial": {
    height: "0%",
    scale: 1.12,
  },
  "animate": {
    height: "100%",
    scale: 1,
    transition: {
      height: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.85 },
      scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1 },
    },
  }
}

function HeroImageComponent() {
  return <motion.div
    style={{ height: "100%", width: "100%" }}
    variants={heroImageAnimation}
    initial="initial"
    animate="animate"
  >
    <Image src="/images/hero.webp" alt="hero" height={500} width={500} quality={80} priority />
  </motion.div>
}

export default HeroImageComponent;