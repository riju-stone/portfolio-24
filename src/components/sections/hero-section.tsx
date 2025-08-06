import React from 'react'
import HeroImage from '../hero-image/hero-image'
import TextStaggerComponent from '../text/TextStagger'
import styles from './styles.module.scss'

function HeroSection() {
  return (
    <section className={styles.heroSectionWrapper}>
      <div className={styles.heroTextWrapper}>
        <TextStaggerComponent className={styles.heroText} text={["Creative"]} />
        <TextStaggerComponent className={styles.heroText} text={["Full-Stack"]} />
        <TextStaggerComponent className={styles.heroText} text={["Developer"]} />
      </div>
      <HeroImage />
    </section>
  )
}

export default HeroSection