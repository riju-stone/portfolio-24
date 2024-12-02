"use client";

import React, { useEffect, useRef } from "react";

import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TextScrollExpandComponent({ word }: { word: string }) {
  const containerRef = useRef();
  const letterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      initAnimation();
    });

    return () => ctx.revert();
  }, []);

  const initAnimation = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 5}`,
        scrub: 1,
      },
    });

    tl.from(letterRefs.current, {
      letterSpacing: "-0.5em",
      textIndent: "-0.5em",
    });

    tl.to(letterRefs.current, {
      letterSpacing: "0.2em",
      textIndent: "0.2em",
    });
  };

  const replLetters = (letter: string, count: number) => {
    const replLetters = [];
    for (let i = 0; i <= count - 1; i++) {
      replLetters.push(
        <div
          key={`repl-letter ${letter}-${i}`}
          className={styles.replLetter}
          data-item={`${letter}-${i}`}
        >
          {letter}
        </div>,
      );
    }

    return replLetters;
  };

  const splitChars = (word: string, replCount: number = 15) => {
    const replWordComponent = [];

    word.split("").forEach((letter: string, index: number) => {
      replWordComponent.push(
        <div
          key={`repl-letter-group-${index}`}
          className={styles.replLetterGroup}
          ref={(e) => {
            letterRefs.current.push(e);
          }}
        >
          {replLetters(letter, replCount)}
        </div>,
      );
    });

    return replWordComponent;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.textExpandWrapper} ${pp_nekkei.className}`}
    >
      {splitChars(word)}
    </div>
  );
}

export default TextScrollExpandComponent;
