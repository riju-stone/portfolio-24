import React from 'react'
import { motion } from "motion/react"

import styles from "./styles.module.scss"
import { pp_nueue } from '@/utils/fonts'


const textStaggerAnim = {
    hidden: {
        y: "100%",
    },
    show: (i) => ({
        y: 0,
        transition: {
            duration: 0.6,
            delay: 1 + i * 0.04,
            ease: [0.22, 1, 0.36, 1]
        }
    })
}

function TextStaggerComponent({ text }: { text: string }) {
    return (
        <div className={`${styles.textStaggerWrapper} ${pp_nueue.className} `}>
            {text.split(" ").map((word, idx) => {
                return <div key={`word-${word}-${idx}`} className={styles.staggerWordContainer}>
                    <div
                        className={styles.staggerWord}
                    >
                        {word.split("").map((letter, index) => {
                            return <motion.div key={`letter-${index}`}
                                variants={textStaggerAnim}
                                initial="hidden"
                                animate="show"
                                custom={index}>{letter}</motion.div>
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}

export default TextStaggerComponent
