"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react'

function HeroImageComponent() {
  return <motion.div
    style={{ height: "100%", width: "100%" }}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}>
    <Image unoptimized src="/images/engineer.gif" alt="Hero Image" width={500} height={500} />
  </motion.div>
}

export default HeroImageComponent