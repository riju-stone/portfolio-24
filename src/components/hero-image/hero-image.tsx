"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react'

function HeroImageComponent() {
  return <motion.div
    style={{ height: "100%", width: "100%" }}
    initial={{ height: "0%" }}
    animate={{ height: "100%" }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}>
    <motion.img
      initial={{ scale: 1.12 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
      src="/images/hero.webp" alt="hero" />
  </motion.div>
}

export default HeroImageComponent