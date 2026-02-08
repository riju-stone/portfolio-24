"use client";

import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import React from "react";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";
import { useDevice } from "@/hooks/useDevice";

const TextStaggerComponent = dynamic(() => import("@/components/custom-text/text-stagger"), {
  ssr: true,
});

const TextDisperseComponent = dynamic(() => import("@/components/custom-text/text-disperse"), {
  ssr: true,
});

function ContactSectionComponent() {
  return (
    <section className={`${styles.contactSectionWrapper} ${pp_nueue.className}`}>
      <TextStaggerComponent
        className={`${styles.contactHeading} ${styles.contactName}`}
        text="(Ar)ighna (Ch)akraborty"
        style="word"
        once={true}
        duration={0.6}
        delay={0.4}
        staggerDelay={0.1}
      />
      <TextStaggerComponent
        className={`${styles.contactHeading} ${styles.contactName}`}
        text="— (St)one"
        style="word"
        once={true}
        duration={0.7}
        delay={0.4}
        staggerDelay={0.1}
      />
      <TextStaggerComponent
        className={`${styles.contactHeading} ${styles.contactStatement}`}
        text="Caught a Spark? Your Move."
        style="line"
        wordsPerLine={3}
        once={true}
        duration={0.75}
        delay={0.65}
        staggerDelay={0.2}
      />
      <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
        <a target="_blank" href="mailto:arighna.chakraborty.17@gmail.com">
          <TextDisperseComponent word="Email" />
        </a>
        <a target="_blank" href="https://drive.google.com/file/d/1M11LzACXza1nOEEm6UAcPSxY1NAwkQC-/view?usp=sharing">
          <TextDisperseComponent word="Resume" />
        </a>
        <a target="_blank" href="https://www.github.com/riju-stone">
          <TextDisperseComponent word="Github" />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/arighna-chakraborty/">
          <TextDisperseComponent word="LinkedIn" />
        </a>
        <a target="_blank" href="https://www.x.com/archrstone">
          <TextDisperseComponent word={"Twitter"} />
        </a>
      </div>
    </section>
  );
}

export default ContactSectionComponent;
