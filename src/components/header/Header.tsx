"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";

import styles from "./styles.module.scss";
import { space_grotesk, lexend_deca } from "@/app/fonts";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import Link from "next/link";
import ThemeSwitchComponent from "../theme/ThemeSwitch";
import { headerNameInitialAnim, headerNameSuffixAnim } from "./animations";
import { useThemeStore } from "@/stores/themeStore";

const heroName = "Arighna Chakraborty";

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
        className={`${styles.nameContainer} ${styles[theme]} ${space_grotesk.className}`}
      >
        {heroName.split("").map((letter, index) => {
          return (
            <motion.span
              key={`hero-letter-${index}`}
              className={styles.heroNameLetter}
              variants={headerNameSuffixAnim}
              animate={headerState === "collapsed" ? "collapse" : "expand"}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
      <div className={`${styles.linksContainer} ${space_grotesk.className}`}>
        {headerData.map((data, index) => (
          <Link
            key={`header-link-${index}`}
            className={`${styles.headerLink} ${styles[theme]} ${activePage == data.label ? styles.activeLink : styles.inactiveLink}`}
            href={data.link}
            onClick={() => setActivePage(data.label)}
          >
            {data.label}
          </Link>
        ))}
      </div>
      <div className={styles.themeSwitchContainer}>
        <ThemeSwitchComponent />
      </div>
    </div>
  );
}

export default HeaderComponent;
