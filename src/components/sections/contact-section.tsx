import React from 'react'
import TextDisperseComponent from '../text/TextDisperse'
import styles from './styles.module.scss'
import { pp_nueue, pp_nekkei } from '@/utils/fonts'

function ContactSection() {
  return (
    <section
      className={`${styles.contactSectionWrapper} ${pp_nueue.className}`}
    >
      <div className={styles.introline}>
        <div className={styles.introHeading}>Caught</div>
        <div className={styles.introHeading}>a</div>
        <div className={styles.introHeading}>Spark ?</div>
      </div>

      <div className={styles.introline}>
        <div className={styles.introHeading}>Your</div>
        <div className={styles.introHeading}>Move</div>
      </div>

      <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
        <a target="_blank" href="mailto:arighna.chakraborty.17@gmail.com"><TextDisperseComponent word="↗Email" /></a>
        <a target="_blank" href="https://www.github.com/riju-stone"><TextDisperseComponent word="↗Github" /></a>
      </div>

      <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
        <a target="_blank" href="https://www.linkedin.com/in/arighna-chakraborty/">
          <TextDisperseComponent word="↗LinkedIn" /></a>
        <a target="_blank" href="https://www.x.com/archrstone"><TextDisperseComponent word="↗Twitter" /></a>
      </div>
    </section>
  )
}

export default ContactSection