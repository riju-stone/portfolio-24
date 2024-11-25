"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";

const SkewScrollComponent = dynamic(
  () => import("@/components/scroll/Scroll"),
  { ssr: false },
);

// const TextRippleComponent = dynamic(
//   () => import("@/components/text/TextRipple"),
//   { ssr: false },
// );

function HomePage() {
  return (
    <SkewScrollComponent>
      <main className={styles.homePageWrapper}>
        {/* <TextRippleComponent text="Full-Stack Developer" /> */}
      </main>
    </SkewScrollComponent>
  );
}

export default HomePage;
