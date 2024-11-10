"use client";

import React, { useLayoutEffect, useState } from "react";

import styles from "./styles.module.scss";
import { space_grotesk, lexend_deca } from "@/app/fonts";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Circle } from "lucide-react";
import Link from "next/link";
import ThemeSwitchComponent from "../theme/ThemeSwitch";
import {
  headerNameInitialAnim,
  headerNameNonInitialsAnim,
  headerNameSeparatorAnim,
  headerLinkAnim,
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

function HeaderComponent() {
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
              <motion.div
                className={styles.headerNameSeparator}
                variants={headerNameSeparatorAnim}
                animate={headerState === "collapsed" ? "collapse" : "expand"}
              >
                <Circle />
              </motion.div>
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
        <ThemeSwitchComponent />
      </div>
    </div>
  );
}

export default HeaderComponent;
