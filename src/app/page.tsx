"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import SkewScrollComponent from "@/components/scroll/Scroll";

function HomePage() {
  return (
    <SkewScrollComponent>
      <main className={styles.homePageWrapper}></main>
    </SkewScrollComponent>
  );
}

export default HomePage;
