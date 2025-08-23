import React, { useState } from "react";
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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <m.div
            initial="initial"
            whileHover="hovered"
            className={styles.textZoopContainer}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div>
                {text.split("").map((letter, index) => {
                    return (
                        <m.div
                            custom={index}
                            className={styles.textZoopLetter}
                            variants={textZoopUpAnim}
                            transition={{
                                duration: 0.12,
                                ease: "easeInOut",
                                delay: index * 0.02,
                            }}
                            style={isHovered ? { willChange: "transform" } : {}}
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
                                duration: 0.12,
                                ease: "easeInOut",
                                delay: index * 0.02,
                            }}
                            style={isHovered ? { willChange: "transform" } : {}}
                            key={`Stagger-Text-Letter-Hidden${index}`}
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
