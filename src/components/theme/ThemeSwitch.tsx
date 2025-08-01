"use client";

import { useThemeStore } from "@/stores/themeStore";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { themeSwitchAnim, themeToggleAnim } from "./animations";

import styles from "./styles.module.scss";
import { useCursorStore } from "@/stores/cursorStore";

function ThemeSwitchComponent({ isMenuOpen }) {
    const theme = useThemeStore((state) => state.theme);
    const switchRef = useRef(null);
    const toggleTheme = useThemeStore((state) => state.changeTheme);
    const setSwitchPos = useThemeStore((state) => state.calibrateThemeTogglePos);
    const { expandCursor, defaultCursor, focusCursor } = useCursorStore((state) => state);

    useEffect(() => {
        const switchPos = switchRef.current!.getBoundingClientRect();
        // Offsetting the center of the circle to the center of the switch
        switchPos.x = switchPos.x + 12.5;
        switchPos.y = switchPos.y + 12.5;
        setSwitchPos(switchPos);
    });

    return (
        <motion.div
            variants={themeSwitchAnim}
            initial="initial"
            animate={isMenuOpen ? "hidden" : "view"}
            ref={switchRef}
            onClick={toggleTheme}
            onMouseEnter={() => expandCursor()}
            onMouseLeave={() => defaultCursor()}
        >
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
                    fill={theme == "dark" ? "none" : "black"}
                    stroke="#ededed"
                    strokeWidth="1.5px"
                />
                <motion.g
                    className="sun-beams"
                    stroke="#ededed"
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
                        stroke="#ededed"
                        strokeWidth="1.5px"
                    />
                    <motion.circle
                        cx="24"
                        cy="10"
                        r="6"
                        fill="#ededed"
                        stroke="#ededed"
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
