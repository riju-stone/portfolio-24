import React from 'react'
import TextScrollRevealComponent from '../text/TextScrollReveal'
import styles from './styles.module.scss'

const aboutPhrase = `A full-stack wizard who turns ideas into digital masterpieces. 
I juggle front-end flair and back-end brains to make the web smarter, 
faster and a lot less boring with style and statement - Mind of an engineer, heart of an artist...`

function AboutSection() {
  return (
    <section className={styles.aboutSectionWrapper}>
      <TextScrollRevealComponent
        className={styles.aboutText}
        phrase={aboutPhrase}
        startOffset="0.8"
        endOffset="0.25"
      />
    </section>
  )
}

export default AboutSection