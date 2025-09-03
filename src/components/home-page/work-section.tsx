import { EXPERIENCE_DATA, EXPERIENCE_METADATA, EXPERIENCE_PHRASE, PROJECT_DATA, PROJECT_METADATA, PROJECT_PHRASE } from '@/utils/constants'
import React from 'react'
import { pp_nekkei } from '@/utils/fonts'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import ExpandedDrawerComponent from '../expanded/expanded-drawer'

const TextStaggerComponent = dynamic(() => import('@/components/custom-text/text-stagger'), {
  ssr: true,
})

const TextScrollRevealComponent = dynamic(() => import('@/components/custom-text/text-scroll-reveal'), {
  ssr: true,
})

const FancyTableComponent = dynamic(() => import('@/components/custom-table/custom-table'), {
  ssr: true,
})

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
        <TextStaggerComponent className={`${styles.workSubtext} ${pp_nekkei.className}`} text={EXPERIENCE_PHRASE} style="word" once={true} duration={0.5} staggerDelay={0.025} />
        <FancyTableComponent
          metadata={EXPERIENCE_METADATA}
          tableData={EXPERIENCE_DATA}
          linksStyle="_blank"
          prefetch={false}
        />
      </div>
      <div className={styles.projectWrapper}>
        <TextScrollRevealComponent
          phrase="Projects"
          startOffset="1"
          endOffset="0.75"
          style="letter"
          className={styles.workHeading} />
        <TextStaggerComponent className={`${styles.workSubtext} ${pp_nekkei.className}`} text={PROJECT_PHRASE} style="word" once={true} duration={0.5} staggerDelay={0.025} />
        <ExpandedDrawerComponent
          metadata={PROJECT_METADATA}
          tableData={PROJECT_DATA}
        />
      </div>
    </section>
  )
}

export default WorkSectionComponent