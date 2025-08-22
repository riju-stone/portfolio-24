import { pp_nekkei, pp_nueue } from '@/utils/fonts'
import React from 'react'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'

const TextStaggerComponent = dynamic(() => import('@/components/custom-text/text-stagger'), {
  ssr: true,
})

const TextDisperseComponent = dynamic(() => import('@/components/custom-text/text-disperse'), {
  ssr: true,
})

function ContactSectionComponent() {
  return (
    <section className={`${styles.contactSectionWrapper} ${pp_nueue.className}`}>
      <TextStaggerComponent
        className={styles.contactHeading}
        text="Caught a Spark? Your Move"
        style="line"
        wordsPerLine={3}
        once={true}
        duration={0.75}
        delay={0.75}
        staggerDelay={0.05} />
      <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
        <a target="_blank" href="mailto:arighna.chakraborty.17@gmail.com"><TextDisperseComponent word="↗Email" /></a>
        <a target="_blank" href="https://www.github.com/riju-stone"><TextDisperseComponent word="↗Github" /></a>
      </div>
      <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
        <a target="_blank" href="https://www.linkedin.com/in/arighna-chakraborty/">
          <TextDisperseComponent word="↗LinkedIn" /></a>
        <a target="_blank" href="https://www.x.com/archrstone"><TextDisperseComponent word={"Twitter"} /></a>
      </div>
    </section>
  )
}

export default ContactSectionComponent