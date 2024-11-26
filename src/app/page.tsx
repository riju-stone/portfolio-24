"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";

const SkewScrollComponent = dynamic(
  () => import("@/components/scroll/Scroll"),
  { ssr: false },
);

function HomePage() {
  return (
    <SkewScrollComponent>
      <main className={styles.homePageWrapper}></main>
    </SkewScrollComponent>
  );
}

export default HomePage;
