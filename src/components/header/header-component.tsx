"use client";

import React, { useRef, useState, useMemo } from "react";
import styles from "./styles.module.scss";
import { space_grotesk } from "@/utils/fonts";
import { useScroll, useMotionValueEvent, m } from "motion/react";
import Link from "next/link";
import ThemeSwitchComponent from "../theme/theme-switch";
import {
    headerNameInitialAnim,
    headerNameNonInitialsAnim,
    headerNameMenuButtonAnim,
    headerLinkAnim,
    menuUpperAnim,
    menuMiddleAnim,
    menuLowerAnim,
    menuButtonAnimation,
    headerNameSeparatorAnim,
} from "./animations";
import { useThemeStore } from "@/stores/themeStore";
import TextZoopComponent from "../custom-text/text-zoop";
import { pageConfig } from "@/utils/pages";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";

const HeaderComponent = React.memo(() => {
    const heroInitials = ["A", "C"];
    const nonInitials = "righna hakraborty".split("");

    const theme = useThemeStore((state) => state.theme);
    const menuOpen = usePageStore((state) => state.menuOpen);
    const toggleMenu = usePageStore((state) => state.toggleMenu);

    const checkActivePath = useActivePath();
    const { scrollY } = useScroll();
    const [headerState, setHeaderState] = useState<"expanded" | "collapsed">("expanded");
    const lastHeaderState = useRef<"expanded" | "collapsed">("expanded");

    // Replace the scroll handler with a throttled version
    const lastScrollCheck = useRef(0);
    const SCROLL_THRESHOLD = 16;

    useMotionValueEvent(scrollY, "change", useMemo(() => ((v) => {
        const now = Date.now();
        if (now - lastScrollCheck.current < SCROLL_THRESHOLD) return;
        lastScrollCheck.current = now;

        if (menuOpen) toggleMenu(false);

        const next = v < 120 ? "expanded" : "collapsed";
        if (next !== lastHeaderState.current) {
            lastHeaderState.current = next;
            setHeaderState(next);
        }
    }), [menuOpen, toggleMenu]));

    return checkActivePath("/studio") ? null : (
        <>
            <m.div className={`${styles.headerWrapper}`}>
                <m.div className={`${styles.nameContainer} ${styles[theme]} ${space_grotesk.className}`}>
                    <m.div
                        className={styles.heroInitialLetter}
                        variants={headerNameInitialAnim}
                        initial="initial"
                        animate={menuOpen ? "hidden1" : "expand"}
                    >
                        {heroInitials[0]}
                    </m.div>
                    {nonInitials.map((letter, index) => {
                        return letter == " " ? (
                            <React.Fragment key={`hero-initial-letter${index}`}>
                                <m.div
                                    className={styles.heroNameSeparator}
                                    variants={headerNameSeparatorAnim}
                                    initial="initial"
                                    animate={headerState === "collapsed" ? "collapse" : "expand"}
                                    whileHover="hover"
                                >
                                    <Link href="/studio" target="_blank">&#10022;</Link>
                                </m.div>
                                <m.div
                                    className={styles.heroInitialLetter}
                                    variants={headerNameInitialAnim}
                                    initial="initial"
                                    animate={
                                        headerState === "collapsed"
                                            ? menuOpen
                                                ? "hidden2"
                                                : "collapse"
                                            : "expand"
                                    }
                                >
                                    {heroInitials[1]}
                                </m.div>
                            </React.Fragment>
                        ) : (
                            <m.div
                                key={`hero-non-initial-letter-${index}`}
                                className={styles.heroNonInitialLetter}
                                variants={headerNameNonInitialsAnim}
                                initial="collapse"
                                animate={headerState === "collapsed" ? "collapse" : "expand"}
                                custom={index}
                            >
                                {letter}
                            </m.div>
                        );
                    })}
                </m.div>
                <div className={`${styles.linksContainer} ${space_grotesk.className}`}>
                    {pageConfig.map((data, index) => (
                        <m.div
                            key={`header-link-${index}`}
                            custom={index}
                            variants={headerLinkAnim}
                            initial="initial"
                            animate={headerState === "collapsed" ? "collapse" : "expand"}
                            className={`${styles.headerLink} ${styles[theme]} ${checkActivePath(data.link) ? styles.activeLink : styles.inactiveLink}`}
                        >
                            <Link href={data.link}>
                                <TextZoopComponent text={data.label} />
                            </Link>
                        </m.div>
                    ))}
                </div>
                <div className={styles.themeSwitchContainer}>
                    <ThemeSwitchComponent isMenuOpen={menuOpen} />
                </div>
            </m.div>

            <m.button
                type="button"
                className={`${styles.headerMenuButton} ${styles[theme]}`}
                variants={headerNameMenuButtonAnim}
                initial="expand"
                style={{ pointerEvents: headerState === "collapsed" ? "auto" : "none" }}
                animate={headerState === "collapsed" ? "collapse" : "expand"}
                onClick={() => toggleMenu(!menuOpen)}
            >
                <m.div
                    className={styles.headerMenuButtonLines}
                    variants={menuButtonAnimation}
                    animate={menuOpen ? "open" : "close"}
                >
                    <m.div
                        className={`${styles.headerMenuButtonLine} ${styles[theme]}`}
                        variants={menuUpperAnim}
                        animate={menuOpen ? "close" : "open"}
                    />
                    <m.div
                        className={`${styles.headerMenuButtonLine} ${styles[theme]}`}
                        variants={menuMiddleAnim}
                        animate={menuOpen ? "close" : "open"}
                    />
                    <m.div
                        className={`${styles.headerMenuButtonLine} ${styles[theme]}`}
                        variants={menuLowerAnim}
                        animate={menuOpen ? "close" : "open"}
                    />
                </m.div>
            </m.button>
        </>
    );
});

export default HeaderComponent;
