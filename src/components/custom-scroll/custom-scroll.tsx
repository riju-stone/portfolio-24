"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

function SkewScrollComponent({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis only on the client side
        lenisRef.current = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 0.8,
            touchMultiplier: 2
        });

        let frame: number;
        function raf(time: number) {
            lenisRef.current?.raf(time);
            frame = requestAnimationFrame(raf);
        }

        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            lenisRef.current?.destroy();
        };
    }, []);

    return (
        <>
            {children}
        </>
    );
}

export default SkewScrollComponent;
