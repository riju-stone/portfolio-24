import React from 'react'
import styles from './styles.module.scss'
import TextScrollExpandComponent from '../text/TextScrollExpand'
import TextScrollRevealComponent from '../text/TextScrollReveal'
import FancyTableComponent from '../table/table'
import FileStackComponent from '../file/file-stack'

const expPhrase = `With close to 3 years of experience working in 
cross-functional teams and making deadlines sweat, my code is like my documentation -
clean, clear and occasionally sprinkled with weird jokes.`

const projectPhrase = `Breaking down abstractions for my own amusement.
I design, build and ship experiences that are not just functional, but also a joy to use.
Trying my best to stay one step ahead of the AI overlords...`

const experienceMetadata = {
  col1: "role",
  col2: "title",
  col3: "duration",
  link: "link"
}

const experienceData = [
  {
    _id: "session-ai",
    title: "Session AI Inc.",
    role: "SWE II",
    duration: "2022 - Present",
    link: "#;"
  },
  {
    _id: "simulacra-tech",
    title: "Simulacra Technologies",
    role: "Freelance",
    duration: "2021 - 2022",
    link: "#;"
  },
  {
    _id: "skill-academia",
    title: "Skill Academia",
    role: "SWE Intern",
    duration: "2021",
    link: "#;"
  }
]

function WorkSection() {
  return (
    <section className={styles.workSectionWrapper}>
      <TextScrollExpandComponent word={"work"} />
      <div className={styles.experienceWrapper}>
        <TextScrollRevealComponent
          className={styles.experienceText}
          phrase={expPhrase}
          startOffset="0.8"
          endOffset="0.25"
        />
        <FancyTableComponent metadata={experienceMetadata} tableData={experienceData} />
      </div>

      <div className={styles.projectWrapper}>
        <TextScrollRevealComponent
          className={styles.projectText}
          phrase={projectPhrase}
          startOffset="0.85"
          endOffset="0.65"
        />
        <FileStackComponent />
      </div>
    </section>

  )
}

export default WorkSection