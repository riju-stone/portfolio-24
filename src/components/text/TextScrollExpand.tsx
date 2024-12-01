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
    gsap.registerPlugin(ScrollTrigger);
  });

  const replLetters = (letter: string, count: number) => {
    const replLetters = [];
    for (let i = 0; i <= count - 1; i++) {
      replLetters.push(
        <div
          key={`repl-letter ${letter}-${i}`}
          className={styles.replLetter}
          data-item={`${letter}-${i}`}
          ref={(e) => {
            letterRefs.current.push(e);
          }}
        >
          {letter}
        </div>,
      );
    }

    console.log(replLetters);

    return replLetters;
  };

  const splitChars = (word: string, replCount: number = 5) => {
    const replWordComponent = [];

    word.split("").forEach((letter: string, index: number) => {
      replWordComponent.push(
        <div
          key={`repl-letter-group-${index}`}
          className={styles.replLetterGroup}
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
