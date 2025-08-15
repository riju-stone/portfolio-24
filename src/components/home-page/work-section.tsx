import { EXPERIENCE_DATA, EXPERIENCE_METADATA, EXPERIENCE_PHRASE, PROJECT_DATA, PROJECT_METADATA, PROJECT_PHRASE } from '@/utils/constants'
import React from 'react'
import FancyTableComponent from '../custom-table/custom-table'
import TextStaggerComponent from '../custom-text/text-stagger'
import { pp_nekkei } from '@/utils/fonts'
import TextScrollRevealComponent from '../custom-text/text-scroll-reveal'
import styles from './styles.module.scss'

function WorkSectionComponent() {
  return (
    <section className={styles.workSectionWrapper}>
      <div className={styles.experienceWrapper}>
        <TextScrollRevealComponent
          phrase="Experience"
          startOffset="1"
          endOffset="0.75"
          style="letter"
          className={styles.workHeading} />
        <TextStaggerComponent className={`${styles.workSubtext} ${pp_nekkei.className}`} text={EXPERIENCE_PHRASE} style="word" once={true} staggerDelay={0.02} />
        <FancyTableComponent
          metadata={EXPERIENCE_METADATA}
          tableData={EXPERIENCE_DATA} />
      </div>
      <div className={styles.projectWrapper}>
        <TextScrollRevealComponent
          phrase="Projects"
          startOffset="1"
          endOffset="0.75"
          style="letter"
          className={styles.workHeading} />
        <TextStaggerComponent className={`${styles.workSubtext} ${pp_nekkei.className}`} text={PROJECT_PHRASE} style="word" once={true} staggerDelay={0.02} />
        <FancyTableComponent
          metadata={PROJECT_METADATA}
          tableData={PROJECT_DATA} />
      </div>
    </section>
  )
}

export default WorkSectionComponent