"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { space_grotesk, pp_nekkei } from "@/utils/fonts";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import ThemeSwitchComponent from "../theme/ThemeSwitch";
import {
  headerNameInitialAnim,
  headerNameNonInitialsAnim,
  headerNameSeparatorAnim,
  headerLinkAnim,
  menuUpperAnim,
  menuMiddleAnim,
  menuLowerAnim,
} from "./animations";
import { useThemeStore } from "@/stores/themeStore";
import TextZoopComponent from "../text/TextZoop";
import { pageConfig } from "@/utils/pages";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";

const heroInitials = ["A", "C"];
const heroNonInitials = "righna_ hakraborty";

function HeaderComponent() {
  const theme = useThemeStore((state) => state.theme);
  const menuOpen = usePageStore((state) => state.menuOpen);
  const toggleMenu = usePageStore((state) => state.toggleMenu);
  const checkActivePath = useActivePath();
  const { scrollY } = useScroll();
  const [headerState, setHeaderState] = useState("expanded");

  useMotionValueEvent(scrollY, "change", (scrollValue) => {
    if (scrollValue < 120) {
      setHeaderState("expanded");
    } else {
      setHeaderState("collapsed");
    }
  });

  return (
    <React.Fragment>
      <div
        className={`${styles.headerWrapper} ${checkActivePath("/studio") ? styles.hideHeader : null}`}
      >
        <div
          className={`${styles.nameContainer} ${styles[theme]} ${pp_nekkei.className}`}
        >
          <motion.div
            className={styles.heroInitialLetter}
            variants={headerNameInitialAnim}
            initial="initial"
            animate={menuOpen ? "hidden1" : "expand"}
          >
            {heroInitials[0]}
          </motion.div>
          {heroNonInitials.split("").map((letter, index) => {
            return letter == " " ? (
              <motion.div
                key={`hero-initial-letter${index}`}
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
        variants={headerNameSeparatorAnim}
        initial="expand"
        animate={headerState === "collapsed" ? "collapse" : "expand"}
        onClick={toggleMenu}
      >
        <motion.svg
          role="Menu Button"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#171810"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu"
        >
          <motion.line
            variants={menuMiddleAnim}
            animate={menuOpen ? "close" : "open"}
            x1="4"
            x2="20"
            y1="12"
            y2="12"
          />
          <motion.line
            variants={menuUpperAnim}
            animate={menuOpen ? "close" : "open"}
            x1="4"
            x2="20"
            y1="6"
            y2="6"
          />
          <motion.line
            variants={menuLowerAnim}
            animate={menuOpen ? "close" : "open"}
            x1="4"
            x2="20"
            y1="18"
            y2="18"
          />
        </motion.svg>
      </motion.button>
    </React.Fragment>
  );
}

export default HeaderComponent;
