"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

function SkewScrollComponent({ children }) {
  const lenis = new Lenis();

  useEffect(() => {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  // Skew logic
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 800,
    damping: 100,
  });
  const skewVelocityFactor = useTransform(
    skewVelocity,
    [-1000, 1000],
    [-1.5, 1.5],
  );

  return (
    <motion.div style={{ skewY: skewVelocityFactor }}>{children}</motion.div>
  );
}

export default SkewScrollComponent;
