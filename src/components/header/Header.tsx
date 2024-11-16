"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./styles.module.scss";
import { space_grotesk, lexend_deca } from "@/app/fonts";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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
import { usePageStore } from "@/stores/pageStore";

const heroInitials = ["A", "C"];
const heroNonInitials = "righna hakraborty";

function HeaderComponent({
  isMenuOpen,
  setMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useThemeStore((state) => state.theme);
  const activePageData = usePageStore((state) => state);
  const changeActivePage = usePageStore((state) => state.setActivePage);

  const { scrollY } = useScroll();
  const [headerState, setHeaderState] = useState("expanded");

  useMotionValueEvent(scrollY, "change", (scrollValue) => {
    if (scrollValue < 80) {
      setHeaderState("expanded");
    } else {
      setHeaderState("collapsed");
    }
  });

  return (
    <div className={styles.headerWrapper}>
      <div
        className={`${styles.nameContainer} ${styles[theme]} ${lexend_deca.className}`}
      >
        <motion.div
          variants={headerNameInitialAnim}
          initial="initial"
          animate="expand"
        >
          {heroInitials[0]}
        </motion.div>
        {heroNonInitials.split("").map((letter, index) => {
          return letter == " " ? (
            <React.Fragment>
              <motion.button
                type="button"
                className={styles.headerMenuButton}
                variants={headerNameSeparatorAnim}
                initial="expand"
                animate={headerState === "collapsed" ? "collapse" : "expand"}
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <motion.svg
                  role="Menu Button"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                >
                  <motion.line
                    variants={menuMiddleAnim}
                    animate={isMenuOpen ? "close" : "open"}
                    x1="4"
                    x2="20"
                    y1="12"
                    y2="12"
                  />
                  <motion.line
                    variants={menuUpperAnim}
                    animate={isMenuOpen ? "close" : "open"}
                    x1="4"
                    x2="20"
                    y1="6"
                    y2="6"
                  />
                  <motion.line
                    variants={menuLowerAnim}
                    animate={isMenuOpen ? "close" : "open"}
                    x1="4"
                    x2="20"
                    y1="18"
                    y2="18"
                  />
                </motion.svg>
              </motion.button>
              <motion.div
                className={styles.heroInitialLetter}
                variants={headerNameInitialAnim}
                initial="initial"
                animate={headerState === "collapsed" ? "collapse" : "expand"}
              >
                {heroInitials[1]}
              </motion.div>
            </React.Fragment>
          ) : (
            <motion.div
              key={`hero-letter-${index}`}
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
            className={`${styles.headerLink} ${styles[theme]} ${activePageData.pageName == data.label ? styles.activeLink : styles.inactiveLink}`}
          >
            <Link href={data.link} onClick={() => changeActivePage(data.label)}>
              <TextZoopComponent text={data.label} />
            </Link>
          </motion.div>
        ))}
      </div>
      <div className={styles.themeSwitchContainer}>
        <ThemeSwitchComponent setMenuOpen={setMenuOpen} />
      </div>
    </div>
  );
}

export default HeaderComponent;
