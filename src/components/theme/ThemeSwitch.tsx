"use client";

import { useThemeStore } from "@/stores/themeStore";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { themeToggleAnim } from "./animations";

import styles from "./styles.module.scss";

function ThemeSwitchComponent({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useThemeStore((state) => state.theme);
  const switchRef = useRef(null);
  const toggleTheme = useThemeStore((state) => state.changeTheme);
  const setSwitchPos = useThemeStore((state) => state.calibrateThemeTogglePos);

  useEffect(() => {
    const switchPos = switchRef.current!.getBoundingClientRect();
    // Offsetting the center of the circle to the center of the switch
    switchPos.x = switchPos.x + 13;
    switchPos.y = switchPos.y + 13;
    setSwitchPos(switchPos);
  }, [setSwitchPos]);

  const handleThemeToggle = () => {
    setMenuOpen(false);
    toggleTheme();
  };

  return (
    <motion.div ref={switchRef} onClick={() => handleThemeToggle()}>
      <motion.svg
        className="sun-moon"
        ref={switchRef}
        aria-hidden="true"
        width="25"
        height="25"
        viewBox="0 0 25 25"
      >
        <motion.circle
          className={styles.sun}
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="#ededed"
          stroke={theme == "light" ? "black" : "white"}
          strokeWidth="1.5px"
        />
        <motion.g
          className="sun-beams"
          stroke="black"
          strokeWidth="1.5px"
          variants={themeToggleAnim.sunBeams}
          animate={theme === "light" ? "light" : "dark"}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
        <motion.mask className="moon" id="moon-mask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#ededed"
            stroke="black"
            strokeWidth="1.5px"
          />
          <motion.circle
            cx="24"
            cy="10"
            r="6"
            fill="black"
            stroke="white"
            strokeWidth="1.5px"
            variants={themeToggleAnim.moonCircle}
            animate={theme === "light" ? "light" : "dark"}
          />
        </motion.mask>
      </motion.svg>
    </motion.div>
  );
}

export default ThemeSwitchComponent;
