"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import Link from "next/link";

import { useThemeStore } from "@/stores/themeStore";
import ThemeSwitchComponent from "../theme/ThemeSwitch";
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

  const loc = window.location.pathname.split("/")[1];
  const path = loc == "" ? "home" : loc;
  const [activePage, setActivePage] = useState(path);

  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.nameContainer} ${styles[theme]}`}>
        Arighna Chakraborty
      </div>
      <div className={styles.linksContainer}>
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

