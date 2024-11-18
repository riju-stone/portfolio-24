"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { space_grotesk } from "@/utils/fonts";
import { hamburgerMenuAnim, hamburgerCurveAnim } from "./animations";
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
