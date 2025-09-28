"use client";

import React, { useMemo, useRef } from "react";
import { m, useInView } from "motion/react";
import styles from "./styles.module.scss";

// Memoize text processors outside component
const textProcessors = {
  splitByLetter: (text: string) => {
    return text.split("").map((letter, index) => ({
      content: letter,
      id: `letter-${index}`,
      idx: index,
    }));
  },
  splitByWord: (text: string) => {
    return text
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word, index) => ({
        content: word,
        id: `word-${index}`,
        idx: index,
      }));
  },
  splitByLine: (text: string, wordsPerLine: number) => {
    const words = text.split(" ").filter((word) => word.length > 0);
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines.map((line, index) => ({
      content: line,
      id: `line-${index}`,
      idx: index,
    }));
  },
};

interface TextStaggerComponentProps {
  once?: boolean;
  text: string;
  className?: string;
  style?: "letter" | "word" | "line";
  wordsPerLine?: number;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
}

const TextItem = React.memo(
  ({
    item,
    index,
    style,
    duration,
    delay,
    staggerDelay,
  }: {
    item: any;
    index: number;
    style: "letter" | "word" | "line";
    duration: number;
    delay: number;
    staggerDelay: number;
  }) => {
    const textStaggerAnim = useMemo(
      () => ({
        hidden: { y: "100%", opacity: 0 },
        show: (i: number) => ({
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay: delay + i * staggerDelay,
            ease: [0.83, 0, 0.17, 1],
          },
        }),
      }),
      [duration, delay, staggerDelay]
    );

    return (
      <div className={styles.textStaggerContainer}>
        <div className={styles.staggerContent}>
          <m.div
            className={styles.staggerItem}
            variants={textStaggerAnim}
            custom={index}
          >
            {style === "line" ? (
              item.content.split(" ").map((word: string, wordIndex: number) => (
                <span key={wordIndex} className={styles.justifiedWord}>
                  {word}
                </span>
              ))
            ) : (
              <span>{item.content}</span>
            )}
          </m.div>
        </div>
      </div>
    );
  }
);

function TextStaggerComponent({
  text,
  className,
  style = "letter",
  wordsPerLine = 1,
  delay = 0.5,
  staggerDelay = 0.04,
  duration = 0.5,
  once = true,
}: TextStaggerComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once, margin: "0px 100px" });

  // Memoize processed text
  const processedText = useMemo(() => {
    if (style === "letter") return textProcessors.splitByLetter(text);
    if (style === "word") return textProcessors.splitByWord(text);
    if (style === "line") return textProcessors.splitByLine(text, wordsPerLine);
    return [];
  }, [text, style, wordsPerLine]);

  return (
    <m.div
      ref={containerRef}
      className={`${styles[`textStaggerWrapper-${style}`]} ${className || ""}`.trim()}
      variants={{
        show: {
          transition: { staggerChildren: 0.1, delayChildren: 0.5 },
        },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {processedText.map((item, index) => (
        <TextItem
          key={item.id}
          item={item}
          index={index}
          style={style}
          duration={duration}
          delay={delay}
          staggerDelay={staggerDelay}
        />
      ))}
    </m.div>
  );
}

export default React.memo(TextStaggerComponent);
