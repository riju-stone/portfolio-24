import React from 'react'

import styles from "./styles.module.scss"
import { space_grotesk } from '@/utils/fonts'

function FooterComponent() {
    return (
        <div className={`${styles.footerWrapper} ${space_grotesk.className}`}>
            <div>&#169; AC {new Date().getUTCFullYear()}</div>
        </div>
    )
}

export default FooterComponent
