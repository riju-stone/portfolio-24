import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

import { hamburgerMenuAnim, hamburgerCurveAnim } from "./animations";
import styles from "./styles.module.scss";

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
      <div className={styles.hamburgerMenuContainer}>Home, Blog, Shelf</div>
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
