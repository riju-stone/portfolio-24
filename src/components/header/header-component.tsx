"use client";

import React from "react";
import styles from "./styles.module.scss";
import { space_grotesk } from "@/utils/fonts";
import { m } from "motion/react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import {
    headerNameInitialAnim,
    headerNameNonInitialsAnim,
    headerNameSeparatorAnim,
    headerLinkAnim,
} from "./animations";
import { pageConfig } from "@/utils/pages";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";

const ThemeSwitchComponent = dynamic(() => import("../theme/theme-switch"), {
    ssr: false,
});

const TextZoopComponent = dynamic(() => import("../custom-text/text-zoop"), {
    ssr: false,
});

function HeaderComponent() {
    const heroInitials = ["A", "C"];
    const nonInitials = "righna hakraborty".split("");

    // const theme = useThemeStore((state) => state.theme);
    const menuOpen = usePageStore((state) => state.menuOpen);
    // const toggleMenu = usePageStore((state) => state.toggleMenu);

    const checkActivePath = useActivePath();
    // const { scrollY } = useScroll();
    // const [headerState, setHeaderState] = useState<"expanded" | "collapsed">("expanded");
    // const lastHeaderState = useRef<"expanded" | "collapsed">("expanded");

    // const handleScroll = useMemo(() => (v: number) => {
    //     if (menuOpen) toggleMenu(false);

    //     const next = v < 120 ? "expanded" : "collapsed";
    //     if (next !== lastHeaderState.current) {
    //         lastHeaderState.current = next;
    //         setHeaderState(next);
    //     }
    // }, [menuOpen, toggleMenu]);

    // useMotionValueEvent(scrollY, "change", handleScroll);

    // const handleMenuToggle = useCallback(() => {
    //     toggleMenu(!menuOpen);
    // }, [menuOpen, toggleMenu]);

    return checkActivePath("/studio") ? null : (
        <React.Fragment>
            <m.div className={`${styles.headerWrapper}`}>
                <m.div className={`${styles.nameContainer} ${space_grotesk.className}`}>
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
                                    animate="expand"
                                    whileHover="hover"
                                >
                                    <Link href="/studio" target="_blank">&#10022;</Link>
                                </m.div>
                                <m.div
                                    className={styles.heroInitialLetter}
                                    variants={headerNameInitialAnim}
                                    initial="initial"
                                    animate="expand"
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
                                animate="expand"
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
                            animate="expand"
                            className={`${styles.headerLink} ${checkActivePath(data.link) ? styles.activeLink : styles.inactiveLink}`}
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

            {/* <AnimatePresence>
                {headerState === "collapsed" &&
                    <m.button
                        key="header-menu-button"
                        type="button"
                        className={`${styles.headerMenuButton} ${styles[theme]}`}
                        variants={headerNameMenuButtonAnim}
                        initial="expand"
                        animate={headerState === "collapsed" ? "collapse" : "expand"}
                        exit="expand"
                        onClick={handleMenuToggle}
                    >
                        <m.div
                            className={styles.headerMenuButtonLines}
                            variants={menuButtonAnimation}
                            animate={menuOpen ? "open" : "close"}
                        >
                            <m.div
                                className={styles.headerMenuButtonLine}
                                variants={menuUpperAnim}
                                animate={menuOpen ? "close" : "open"}
                            />
                            <m.div
                                className={styles.headerMenuButtonLine}
                                variants={menuMiddleAnim}
                                animate={menuOpen ? "close" : "open"}
                            />
                            <m.div
                                className={styles.headerMenuButtonLine}
                                variants={menuLowerAnim}
                                animate={menuOpen ? "close" : "open"}
                            />
                        </m.div>
                    </m.button>
                }
            </AnimatePresence> */}
        </React.Fragment>
    );
};

export default HeaderComponent;
