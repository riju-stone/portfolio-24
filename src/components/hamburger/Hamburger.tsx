"use client";

import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { space_grotesk, lexend_deca } from "@/app/fonts";
import { hamburgerMenuAnim, hamburgerCurveAnim } from "./animations";
import styles from "./styles.module.scss";
import Link from "next/link";
import TextZoopComponent from "../text/TextZoop";

const navLinks = [
  {
    label: "home",
    path: "/",
  },
  {
    label: "blog",
    path: "/blog",
  },
  {
    label: "shelf",
    path: "/shelf",
  },
];

function HamburgerMenuComponent({
  isMenuOpen,
  setMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      className={styles.hamburgerMenuWrapper}
      variants={hamburgerMenuAnim}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div
        className={`${styles.hamburgerMenuContainer} ${lexend_deca.className}`}
      >
        {navLinks.map((data, index) => {
          return (
            <Link
              key={`MenuLink-${index}`}
              href={data.path}
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <TextZoopComponent text={data.label} />
            </Link>
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
