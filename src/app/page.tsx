"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import TextScrollRevealComponent from "@/components/text/TextScrollReveal";

const SkewScrollComponent = dynamic(
  () => import("@/components/scroll/Scroll"),
  { ssr: false },
);

const heroPhrase = "A multi-disciplinary developer";

const aboutPhrase =
  "A full-stack wizard who turns ideas into digital masterpieces. I juggle front-end flair and back-end brains to make the web smarter, faster and a lot less boring.";

const aboutPhrase2 =
  "It's not just about problem solving for me. It's also about style and statement - making people's lives easier while also making sure each and every experience is uniquely crafted. Mind of an engineer, heart of an artist...";

function HomePage() {
  return (
    <SkewScrollComponent>
      <main className={styles.homePageWrapper}>
        <section className={styles.heroSectionWrapper}></section>
        <section className={styles.aboutSectionWrapper}>
          <TextScrollRevealComponent phrase={aboutPhrase} />
        </section>
        <section className={styles.statementSectionWrapper}>
          <TextScrollRevealComponent phrase={aboutPhrase2} />
        </section>
        <section className={styles.contactSectionWrapper}>Y</section>
      </main>
    </SkewScrollComponent>
  );
}

export default HomePage;
