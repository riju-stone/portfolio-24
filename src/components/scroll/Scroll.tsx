"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
} from "motion/react";

function SkewScrollComponent({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis only on the client side
        lenisRef.current = new Lenis();

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup function
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    // Skew logic
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useSpring(scrollVelocity, {
        stiffness: 250,
        damping: 50,
    });
    const skewVelocityFactor = useTransform(skewVelocity, [-1000, 1000], [-1, 1]);

    return (
        <motion.div
            style={{ skewY: skewVelocityFactor, mixBlendMode: "difference" }}
        >
            {children}
        </motion.div>
    );
}

export default SkewScrollComponent;
