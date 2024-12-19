"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
} from "motion/react";

function SkewScrollComponent({ children }) {
    const lenis = new Lenis();

    useEffect(() => {
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    });

    // Skew logic
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useSpring(scrollVelocity, {
        stiffness: 500,
        damping: 50,
    });
    const skewVelocityFactor = useTransform(skewVelocity, [-1000, 1000], [-0.6, 0.6]);

    return (
        <motion.div
            style={{ skewY: skewVelocityFactor, mixBlendMode: "difference" }}
        >
            {children}
        </motion.div>
    );
}

export default SkewScrollComponent;
