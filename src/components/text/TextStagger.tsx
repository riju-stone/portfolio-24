import React from 'react'
import { motion } from "motion/react"

import styles from "./styles.module.scss"
import { pp_nueue } from '@/utils/fonts'
import Image from 'next/image'


const textStaggerAnim = {
    hidden: {
        y: "100%",
    },
    show: (i: number) => ({
        y: 0,
        transition: {
            duration: 0.6,
            delay: 1 + i * 0.04,
            ease: [0.22, 1, 0.36, 1]
        }
    })
}

const imageStaggerAnim = {
    hidden: {
        y: "100%"
    },
    show: {
        y: 0,
        transition: {
            ease: [0.22, 1, 0.36, 1],
            duration: 0.6,
            delay: 2
        }
    }
}

function TextStaggerComponent({ text }) {
    return (
        <div className={`${styles.textStaggerWrapper} ${pp_nueue.className} `}>
            {text.map((word: string | HTMLImageElement, idx: number) => {
                return <div key={`word-${idx}`} className={styles.staggerWordContainer}>
                    <div
                        className={styles.staggerWord}
                    >
                        {typeof word == "string" ? word.split("").map((letter, index) => {
                            return <motion.div key={`letter-${index}`}
                                variants={textStaggerAnim}
                                initial="hidden"
                                animate="show"
                                custom={index}>{letter}</motion.div>
                        }) : <motion.div variants={textStaggerAnim} initial="hidden" animate="show">
                            <motion.div className={styles.staggerImageContainer} variants={imageStaggerAnim} initial="hidden" animate="show">
                                <Image src={word} className={styles.staggerGif} unoptimized={true} alt="hero-gif" />
                            </motion.div>
                        </motion.div>}
                    </div>
                </div>
            })}
        </div>
    )
}

export default TextStaggerComponent
