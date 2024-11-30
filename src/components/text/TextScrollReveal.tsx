"use client";

import React, { useEffect, useRef } from "react";

import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TextScrollRevealComponent({ phrase }: { phrase: string }) {
  const containerRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    initAnimation();
  }, []);

  const initAnimation = () => {
    gsap.to(charRefs.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top 55%`,
        end: `+=${window.innerHeight / 1.1}`,
        scrub: true,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  };

  function splitWords(phrase: string) {
    const words = [];

    phrase.split(" ").forEach((word, index) => {
      const letters = splitLetters(word);
      words.push(<p key={word + "-" + index}>{letters}</p>);
    });

    return words;
  }

  function splitLetters(word: string) {
    const letters = [];
    word.split("").forEach((letter, index) => {
      letters.push(
        <span
          key={letter + "-" + index}
          ref={(e) => {
            charRefs.current.push(e);
          }}
        >
          {letter}
        </span>,
      );
    });

    return letters;
  }

  return (
    <div
      className={`${styles.textRevealWrapper} ${pp_nekkei.className}`}
      ref={containerRef}
    >
      <div className={styles.textRevealContainer}>{splitWords(phrase)}</div>
    </div>
  );
}

export default TextScrollRevealComponent;
