import React from 'react'
import TextStaggerComponent from '../text/TextStagger'
import styles from './styles.module.scss'
import HeroImageDark from '../../../public/images/hero-dark.webp'
import Image from 'next/image'

function HeroSection() {
  return (
    <section className={styles.heroSectionWrapper}>
      <div className={styles.heroTextWrapper}>
        <TextStaggerComponent className={styles.heroText} text={["Creative"]} />
        <TextStaggerComponent className={styles.heroText} text={["Full-Stack"]} />
        <TextStaggerComponent className={styles.heroText} text={["Engineer"]} />
      </div>
      <div className={styles.heroImageWrapper}>
        <Image src={HeroImageDark} alt="Hero image" />
      </div>
    </section>
  )
}

export default HeroSection