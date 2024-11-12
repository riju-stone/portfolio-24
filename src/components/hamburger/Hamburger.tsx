"use client";

import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { space_grotesk } from "@/app/fonts";
import { hamburgerMenuAnim, hamburgerCurveAnim } from "./animations";
import { pageConfig } from "@/constants/PageConfig";
import styles from "./styles.module.scss";
import Link from "next/link";
import TextZoopComponent from "../text/TextZoop";
import { usePageStore } from "@/stores/pageStore";

function HamburgerMenuComponent({
  isMenuOpen,
  setMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const activePage = usePageStore((state) => state);
  const changeActivePage = usePageStore((state) => state.setActivePage);

  const handleMenuClick = (pageName: string) => {
    setMenuOpen(!isMenuOpen);
    changeActivePage(pageName);
  };
  return (
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
              className={`${data.label === activePage.pageName ? styles.activeMenuLink : styles.inactiveMenuLink}`}
            >
              <Link
                href={data.link}
                onClick={() => handleMenuClick(data.label)}
              >
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
  );
}

export default HamburgerMenuComponent;
