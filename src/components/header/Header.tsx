"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { space_grotesk } from "@/utils/fonts";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import ThemeSwitchComponent from "../theme/ThemeSwitch";
import
{
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
import TextZoopComponent from "../text/TextZoop";
import { pageConfig } from "@/utils/pages";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";

const heroInitials = ["A", "C"];
const heroNonInitials = "righna hakraborty";

function HeaderComponent()
{
    const theme = useThemeStore((state) => state.theme);
    const menuOpen = usePageStore((state) => state.menuOpen);
    const toggleMenu = usePageStore((state) => state.toggleMenu);
    const checkActivePath = useActivePath();
    const { scrollY } = useScroll();
    const [headerState, setHeaderState] = useState("expanded");

    useMotionValueEvent(scrollY, "change", (scrollValue) =>
    {
        toggleMenu(false);
        if (scrollValue < 120)
        {
            setHeaderState("expanded");
        } else
        {
            setHeaderState("collapsed");
        }
    });

    return checkActivePath("/studio") ? null : (
        <React.Fragment>
            <div
                className={`${styles.headerWrapper}`}
            >
                <div
                    className={`${styles.nameContainer} ${styles[theme]} ${space_grotesk.className}`}
                >
                    <motion.div
                        className={styles.heroInitialLetter}
                        variants={headerNameInitialAnim}
                        initial="initial"
                        animate={menuOpen ? "hidden1" : "expand"}
                    >
                        {heroInitials[0]}
                    </motion.div>
                    {heroNonInitials.split("").map((letter, index) =>
                    {
                        return letter == " " ? (
                            <React.Fragment key={`hero-initial-letter${index}`}>
                                <motion.div
                                    className={styles.heroNameSeparator}
                                    variants={headerNameSeparatorAnim}
                                    initial="initial"
                                    animate={headerState === "collapsed" ? "collapse" : "expand"}
                                    whileHover="hover"
                                >
                                    <Link href="/studio">&#10022;</Link>
                                </motion.div>
                                <motion.div
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
                                </motion.div>
                            </React.Fragment>
                        ) : (
                            <motion.div
                                key={`hero-non-initial-letter-${index}`}
                                className={styles.heroNonInitialLetter}
                                variants={headerNameNonInitialsAnim}
                                initial="collapse"
                                animate={headerState === "collapsed" ? "collapse" : "expand"}
                                custom={index}
                            >
                                {letter}
                            </motion.div>
                        );
                    })}
                </div>
                <div className={`${styles.linksContainer} ${space_grotesk.className}`}>
                    {pageConfig.map((data, index) => (
                        <motion.div
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
                        </motion.div>
                    ))}
                </div>
                <div className={styles.themeSwitchContainer}>
                    <ThemeSwitchComponent isMenuOpen={menuOpen} />
                </div>
            </div>

            <motion.button
                type="button"
                className={styles.headerMenuButton}
                variants={headerNameMenuButtonAnim}
                initial="expand"
                animate={headerState === "collapsed" ? "collapse" : "expand"}
                onClick={() => toggleMenu(!menuOpen)}
            >
                <motion.div
                    className={styles.headerMenuButtonLines}
                    variants={menuButtonAnimation}
                    animate={menuOpen ? "open" : "close"}
                >
                    <motion.div
                        className={styles.headerMenuButtonLine}
                        variants={menuUpperAnim}
                        animate={menuOpen ? "close" : "open"}
                    />
                    <motion.div
                        className={styles.headerMenuButtonLine}
                        variants={menuMiddleAnim}
                        animate={menuOpen ? "close" : "open"}
                    />
                    <motion.div
                        className={styles.headerMenuButtonLine}
                        variants={menuLowerAnim}
                        animate={menuOpen ? "close" : "open"}
                    />
                </motion.div>
            </motion.button>
        </React.Fragment>
    );
}

export default HeaderComponent;
