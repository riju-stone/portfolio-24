import React from "react";
import { m } from "motion/react";

import styles from "./styles.module.scss";

const textZoopUpAnim = {
    initial: {
        y: 0,
    },
    hovered: {
        y: "-100%",
    },
};

const textZoopDownAnim = {
    initial: {
        y: "100%",
    },
    hovered: {
        y: 0,
    },
};

function TextZoopComponent({ text }: { text: string }) {
    return (
        <m.div
            initial="initial"
            whileHover="hovered"
            className={styles.textZoopContainer}
        >
            <div>
                {text.split("").map((letter, index) => {
                    return (
                        <m.div
                            custom={index}
                            className={styles.textZoopLetter}
                            variants={textZoopUpAnim}
                            transition={{
                                duration: 0.15,
                                ease: "easeInOut",
                                delay: index * 0.025,
                            }}
                            style={{ willChange: "transform, opacity" }}
                            key={`Stagger-Text-Letter${index}`}
                        >
                            {letter}
                        </m.div>
                    );
                })}
            </div>
            <div className={styles.textZoopHiddenWrapper}>
                {text.split("").map((letter, index) => {
                    return (
                        <m.div
                            custom={index}
                            className={styles.textZoopLetter}
                            variants={textZoopDownAnim}
                            transition={{
                                duration: 0.15,
                                ease: "easeInOut",
                                delay: index * 0.025,
                            }}
                            style={{ willChange: "transform, opacity" }}
                            key={`Stagger-Text-Letter${index}`}
                        >
                            {letter}
                        </m.div>
                    );
                })}
            </div>
        </m.div>
    );
}

export default TextZoopComponent;
