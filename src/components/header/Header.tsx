import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";

function HeaderComponent() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.initialsContainer}>A - C</div>
      <div className={styles.linksContainer}>
        <Link href="/">home</Link>
        <Link href="/blog">blog</Link>
        <Link href="/shelf">shelf</Link>
      </div>
      <div className={styles.themeSwitchContainer}>O</div>
    </div>
  );
}

export default HeaderComponent;

