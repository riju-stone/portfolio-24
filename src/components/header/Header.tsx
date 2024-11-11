"use client";

import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";

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

const heroInitials = ["A", "C"];
const heroNonInitials = "righna hakraborty";

const headerData = [
  {
    link: "/",
    label: "home",
  },
  {
    link: "/blog",
    label: "blog",
  },
  {
    link: "/shelf",
    label: "shelf",
  },
];

function HeaderComponent({
  isMenuOpen,
  setMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useThemeStore((state) => state.theme);
  const [activePage, setActivePage] = useState("home");

  const { scrollY } = useScroll();
  const [headerState, setHeaderState] = useState("expanded");

  useMotionValueEvent(scrollY, "change", (scrollValue) => {
    if (scrollValue < 180) {
      setHeaderState("expanded");
    } else {
      setHeaderState("collapsed");
    }
  });

  useLayoutEffect(() => {
    const loc = window.location.pathname.split("/")[1];
    const path = loc == "" ? "home" : loc;
    setActivePage(path);
  }, [setActivePage]);

  return (
    <div className={styles.headerWrapper}>
      <div
        className={`${styles.nameContainer} ${styles[theme]} ${lexend_deca.className}`}
      >
        <div>{heroInitials[0]}</div>
        {heroNonInitials.split("").map((letter, index) => {
          return letter == " " ? (
            <React.Fragment>
              <motion.button
                type="button"
                className={styles.headerMenuButton}
                variants={headerNameSeparatorAnim}
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
              animate={headerState === "collapsed" ? "collapse" : "expand"}
              custom={index}
            >
              {letter}
            </motion.div>
          );
        })}
      </div>
      <div className={`${styles.linksContainer} ${space_grotesk.className}`}>
        {headerData.map((data, index) => (
          <motion.div
            key={`header-link-${index}`}
            custom={index}
            variants={headerLinkAnim}
            animate={headerState === "collapsed" ? "collapse" : "expand"}
            className={`${styles.headerLink} ${styles[theme]} ${activePage == data.label ? styles.activeLink : styles.inactiveLink}`}
          >
            <Link href={data.link} onClick={() => setActivePage(data.label)}>
              {data.label}
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
