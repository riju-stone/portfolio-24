"use client";

import React from "react";
import styles from "./styles.module.scss";
import { space_grotesk } from "@/utils/fonts";
import { m } from "motion/react";
import Link from "next/link";
import {
  headerNameInitialAnim,
  headerNameNonInitialsAnim,
  headerNameSeparatorAnim,
  headerLinkAnim,
} from "./animations";
import { pageConfig } from "@/utils/pages";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";
import TextZoopComponent from "../custom-text/text-zoop";
import ThemeSwitchComponent from "../theme/theme-switch";

function HeaderComponent() {
  const heroInitials = ["A", "C"];
  const nonInitials = "righna hakraborty".split("");
  const menuOpen = usePageStore((state) => state.menuOpen);

  const checkActivePath = useActivePath();

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
                  <Link href="/studio" target="_blank" prefetch={false}>
                    &#10022;
                  </Link>
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
              variants={headerLinkAnim}
              initial="initial"
              animate="expand"
              custom={index}
              key={`header-link-${index}`}
              className={`${styles.headerLink} ${checkActivePath(data.link) ? styles.activeLink : styles.inactiveLink}`}
            >
              <Link href={data.link} prefetch={false}>
                <TextZoopComponent text={data.label} />
              </Link>
            </m.div>
          ))}
        </div>
        <div className={styles.themeSwitchContainer}>
          <ThemeSwitchComponent isMenuOpen={menuOpen} />
        </div>
      </m.div>
    </React.Fragment>
  );
}

export default HeaderComponent;
