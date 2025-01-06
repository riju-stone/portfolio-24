import React from 'react'

import styles from "./styles.module.scss"
import { space_grotesk } from '@/utils/fonts'

function FooterComponent() {
    return (
        <div className={`${styles.footerWrapper} ${space_grotesk.className}`}>
            <div className={styles.footerContainer}>
                <div>&#169; AC </div>
                <div>{new Date().getUTCFullYear()}</div>
            </div>
        </div>
    )
}

export default FooterComponent
