import { motion, AnimatePresence } from 'motion/react'
import React from 'react'

import styles from "./styles.module.scss"
import { pp_nekkei } from '@/utils/fonts'

function LazyTextComponent({ text })
{
    return (
        <motion.div
            className={`${styles.lazyLoaderText} ${pp_nekkei.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            {text}
        </motion.div>
    )
}

export default LazyTextComponent