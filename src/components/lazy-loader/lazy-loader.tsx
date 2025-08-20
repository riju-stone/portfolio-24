"use client"
import { m } from 'motion/react'
import React from 'react'

import styles from "./styles.module.scss"
import { pp_nekkei } from '@/utils/fonts'

const lazyTextAnimation = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.4, delay: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.4 }
    }
}

function LazyTextComponent({ text }: { text: string }) {
    return <m.div
        key={text}
        className={`${styles.lazyLoaderText} ${pp_nekkei.className}`}
        variants={lazyTextAnimation}
        initial="initial"
        animate="animate"
        exit="exit">
        {text}
    </m.div>
}

export default LazyTextComponent