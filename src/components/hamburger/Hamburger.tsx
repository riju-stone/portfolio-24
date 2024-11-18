"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { space_grotesk } from "@/utils/fonts";
import { pageConfig } from "@/utils/pages";
import styles from "./styles.module.scss";
import Link from "next/link";
import TextZoopComponent from "../text/TextZoop";
import { usePageStore } from "@/stores/navStore";
import { useActivePath } from "@/utils/path";

function HamburgerMenuComponent() {
  const menuOpen = usePageStore((state) => state.menuOpen);
  const toggleMenu = usePageStore((state) => state.toggleMenu);
  const checkActivePage = useActivePath();
  const initialCurvePath = `M0 0 L${window.innerWidth} 0 Q ${window.innerWidth / 2} 200 0 0`;
  const targetCurvePath = `M0 0 L${window.innerWidth} 0 Q ${window.innerWidth / 2} 0 0 0`;

  const hamburgerMenuAnim = {
    initial: {
      y: -600,
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: -600,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const hamburgerCurveAnim = {
    initial: {
      d: initialCurvePath,
    },
    animate: {
      d: targetCurvePath,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: initialCurvePath,
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
          className={styles.hamburgerMenuWrapper}
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
                  className={`${checkActivePage(data.link) ? styles.activeMenuLink : styles.inactiveMenuLink}`}
                >
                  <Link href={data.link} onClick={toggleMenu}>
                    <TextZoopComponent text={data.label} />
                  </Link>
                </div>
              );
            })}
          </div>
          <svg className={styles.hamburgerMenuCurve}>
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
