"use client";

import React, { useMemo, useRef } from "react";

import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";
import { m, MotionValue, useMotionTemplate, useScroll, useTransform } from "motion/react";

type TextScrollRevealProps = {
  phrase: string;
  startOffset: string;
  endOffset: string;
  className: string;
  style: "letter" | "word";
}

function Word({ children, range, progress }:
  { children: React.ReactNode, range: [number, number], progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const blurValue = useTransform(progress, range, [15, 0]);
  const xValue = useTransform(progress, range, [20, 0]);
  const blurFilter = useMotionTemplate`blur(${blurValue}px)`;

  return <div className={styles.wordWrapper}>
    <m.span
      className={styles.wordContainer}
      style={{ opacity, filter: blurFilter, x: xValue, willChange: "transform, opacity" }}>
      {children}
    </m.span>
  </div>
}

function TextScrollRevealComponent(
  { phrase, startOffset, endOffset, className, style = "letter" }: TextScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: [`start ${Number(startOffset)}`, `end ${Number(endOffset)}`],
  });


  const processedText = useMemo(() => {
    if (style === "letter") {
      return phrase.split("");
    } else if (style === "word") {
      return phrase.split(" ");
    }
  }, [phrase])

  return (
    <div className={`${styles.textRevealWrapper} ${pp_nekkei.className} ${className}`}>
      <div className={styles.textRevealContainer} ref={elementRef}>
        {processedText.map((word, index) => {
          const start = index / processedText.length;
          const end = start + (1 / processedText.length);
          return <Word
            key={`word-${index}`}
            range={[start, end]} progress={scrollYProgress}>{word}</Word>
        })}
      </div>
    </div>
  );
}

export default TextScrollRevealComponent;
