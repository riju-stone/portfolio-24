import { pp_nekkei, pp_nueue } from '@/utils/fonts'
import { HEADING_TEXT, INTRO_PHRASE } from '@/utils/constants'
import TextStaggerComponent from '@/components/custom-text/text-stagger'
import HeroImageComponent from '@/components/hero-image/hero-image'
import styles from './styles.module.scss'

function HeroSectionComponent() {
  return (
    <section className={styles.heroSectionWrapper}>
      <div className={styles.heroContainer}>
        <div className={`${styles.heroTextWrapper} ${pp_nueue.className}`}>
          <TextStaggerComponent
            className={styles.heroText}
            text={HEADING_TEXT}
            style="word"
            duration={0.65}
            delay={0.25}
            staggerDelay={0.06}
            once={true}
          />
        </div>
        <div className={styles.heroImageWrapper}>
          <HeroImageComponent />
        </div>
      </div>
      <div className={`${styles.heroAboutWrapper} ${pp_nekkei.className}`}>
        <TextStaggerComponent
          className={styles.heroAboutText}
          text={INTRO_PHRASE}
          style="line"
          wordsPerLine={9}
          duration={1.25}
          delay={1.25}
          staggerDelay={0.02}
          once={true}
        />
      </div>
    </section>
  )
}

export default HeroSectionComponent