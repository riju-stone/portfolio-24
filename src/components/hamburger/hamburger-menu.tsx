"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { space_grotesk } from "@/utils/fonts";
import { pageConfig } from "@/utils/pages";
import styles from "./styles.module.scss";
import Link from "next/link";
import TextZoopComponent from "../custom-text/text-zoop";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";
import { useDevice } from "@/hooks/useDevice";
import { useThemeStore } from "@/stores/themeStore";

function HamburgerMenuComponent() {
    const deviceType = useDevice();
    const theme = useThemeStore((state) => state.theme);
    const menuOpen = usePageStore((state) => state.menuOpen);
    const toggleMenu = usePageStore((state) => state.toggleMenu);
    const checkActivePage = useActivePath();

    const [windowWidth, setWindowWidth] = useState(1920); // fallback width

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);

            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const initialCurvePath = `M0 0 L${windowWidth} 0 Q ${windowWidth / 2} 200 0 0`;
    const initialCurvePathSmall = `M0 0 L${windowWidth} 0 Q ${windowWidth / 2} 100 0 0`;
    const targetCurvePath = `M0 0 L${windowWidth} 0 Q ${windowWidth / 2} 0 0 0`;

    const hamburgerMenuAnim = {
        initial: {
            y: "-115vh",
        },
        animate: {
            y: 0,
            transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        exit: {
            y: "-115vh",
            transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    const hamburgerCurveAnim = {
        initial: {
            d: deviceType == "mobile" ? initialCurvePathSmall : initialCurvePath,
        },
        animate: {
            d: targetCurvePath,
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
        exit: {
            d: deviceType == "mobile" ? initialCurvePathSmall : initialCurvePath,
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            },
        },
    };

    return (
        <AnimatePresence mode="wait">
            {menuOpen ? (
                <motion.div
                    className={`${styles.hamburgerMenuWrapper} ${styles[theme]}`}
                    variants={hamburgerMenuAnim}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div
                        className={`${styles.hamburgerMenuContainer} ${space_grotesk.className}`}
                    >
                        {pageConfig.map((data, index) => {
                            return (
                                <div
                                    key={`MenuLink-${index}`}
                                    className={`${checkActivePage(data.link) ? styles.activeMenuLink : styles.inactiveMenuLink} ${styles[theme]}`}
                                >
                                    <Link href={data.link} onClick={() => toggleMenu(false)}>
                                        <TextZoopComponent text={data.label} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <svg className={`${styles.hamburgerMenuCurve} ${styles[theme]}`}>
                        <motion.path
                            variants={hamburgerCurveAnim}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        />
                    </svg>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default HamburgerMenuComponent;
