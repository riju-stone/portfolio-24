"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import { pp_nueue } from "@/utils/fonts";

const SkewScrollComponent = dynamic(
  () => import("@/components/scroll/Scroll"),
  { ssr: false },
);

const TextScrollRevealComponent = dynamic(
  () => import("@/components/text/TextScrollReveal"),
  { ssr: false },
);

const heroPhrase = "A multi-disciplinary developer";

const aboutPhrase =
  "A full-stack wizard who turns ideas into digital masterpieces. I juggle front-end flair and back-end brains to make the web smarter, faster and a lot less boring.";

const aboutPhrase2 =
  "It's not just about problem solving for me. It's also about style and statement - making people's lives easier while also making sure each and every experience is uniquely crafted. Mind of an engineer, heart of an artist...";

function HomePage() {
  return (
    <main>
      <SkewScrollComponent>
        <div className={styles.homePageWrapper}>
          <div className={styles.heroSectionWrapper}>{heroPhrase}</div>
          <div className={styles.aboutSectionWrapper}>
            <TextScrollRevealComponent phrase={aboutPhrase} />
          </div>
          <div className={styles.statementSectionWrapper}>
            <TextScrollRevealComponent phrase={aboutPhrase2} />
          </div>
          <div
            className={`${styles.contactSectionWrapper} ${pp_nueue.className}`}
          >
            <div className={styles.introline}>
              <p>Arighna</p>
              <p>Chakraborty</p>
            </div>

            <div className={styles.introline}>
              <p>Full</p>
              <p>Stack</p>
            </div>

            <div className={styles.introline}>
              <p>&</p>
              <p>Creative</p>
              <p>Developer</p>
            </div>

            <div className={styles.introline}>
              <p>+91 9163411820</p>
              <p>Email</p>
            </div>

            <div className={`${styles.introline} ${styles.socialLinks}`}>
              <p>Github</p>
              <p>Twitter</p>
              <p>Insta</p>
            </div>
          </div>
        </div>
      </SkewScrollComponent>
    </main>
  );
}

export default HomePage;
