"use client";

import React from "react";
import styles from "./page.module.scss";
import { motion } from "motion/react";

import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import TextDisperseComponent from "@/components/text/TextDisperse";
import TextScrollExpandComponent from "@/components/text/TextScrollExpand";
import TextStaggerComponent from "@/components/text/TextStagger";

import SkewScrollComponent from "@/components/scroll/Scroll";
import TextScrollRevealComponent from "@/components/text/TextScrollReveal";
import HeroImage from "@/components/hero-image/hero-image";
import FileStackComponent from "@/components/file/file-stack";

const aboutPhrase = `A full-stack wizard who turns ideas into digital masterpieces. 
I juggle front-end flair and back-end brains to make the web smarter, 
faster and a lot less boring with style and statement - Mind of an engineer, heart of an artist...`;

const expPhrase = `With close to 3 years of experience working in 
cross-functional teams and making deadlines sweat, my code is like my documentation -
clean, clear and occasionally sprinkled with weird jokes.`

const projectPhrase = `Breaking down abstractions for my own amusement.
I design, build and ship experiences that are not just functional, but also a joy to use.
Trying my best to stay one step ahead of the AI overlords...`

const experienceData = [
    {
        id: "session-ai",
        name: "Session AI Inc.",
        role: "SWE II",
        duration: "2022 - Present"
    },
    {
        id: "simulacra-tech",
        name: "Simulacra Technologies",
        role: "Freelance",
        duration: "2021 - 2022"
    },
    {
        id: "skill-academia",
        name: "Skill Academia",
        role: "SWE Intern",
        duration: "2021"
    }
]

const clipAnimation = {
    initial: {
        clipPath: "inset(100% 0px 0px)",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        }
    },
    hover: {
        clipPath: "inset(0% 0px 0px)",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function HomePage() {
    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    {/* Hero Section */}
                    <section className={styles.heroSectionWrapper}>
                        <div className={styles.heroTextWrapper}>
                            <TextStaggerComponent className={styles.heroText} text={["Creative"]} />
                            <TextStaggerComponent className={styles.heroText} text={["Full-Stack"]} />
                            <TextStaggerComponent className={styles.heroText} text={["Developer"]} />
                        </div>
                        <HeroImage />
                    </section>
                    {/* About Section */}
                    <section className={styles.aboutSectionWrapper}>
                        <TextScrollRevealComponent
                            className={styles.aboutText}
                            phrase={aboutPhrase}
                            startOffset="0.8"
                            endOffset="0.25"
                        />
                    </section>
                    {/* Work Section */}
                    <section className={styles.workSectionWrapper}>
                        <TextScrollExpandComponent word={"work"} />
                        <div className={styles.experienceWrapper}>
                            <TextScrollRevealComponent
                                className={styles.experienceText}
                                phrase={expPhrase}
                                startOffset="0.8"
                                endOffset="0.25"
                            />
                            <div className={`${styles.experienceTableWrapper} ${pp_nekkei.className}`}>
                                {experienceData.map((exp) => {
                                    return <motion.div key={exp.id} className={styles.experienceRowContainer} initial="initial" whileHover="hover" whileTap="hover">
                                        <div className={styles.experienceRow}>
                                            <div className={styles.experienceName}>{exp.name}</div>
                                            <div className={styles.experienceRole}>{exp.role}</div>
                                        </div>
                                        <motion.div className={styles.experienceMaskRow} variants={clipAnimation}>
                                            <div className={styles.experienceMaskName}>{exp.name}</div>
                                            <div className={styles.experienceMaskDuration}>{exp.duration}</div>
                                        </motion.div>
                                    </motion.div>
                                })}
                            </div>
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

                    {/* Contect Section */}
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
                            {/* <a target="_blank" href="https://drive.google.com/file/d/1oABZdgSt0rzR5rCghPk5-bBVCxpuWTGb/view?usp=sharing"><TextDisperseComponent word="↗Resume" /></a> */}
                            <a target="_blank" href="mailto:arighna.chakraborty.17@gmail.com"><TextDisperseComponent word="↗Email" /></a>
                            <a target="_blank" href="https://www.github.com/riju-stone"><TextDisperseComponent word="↗Github" /></a>
                        </div>

                        <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
                            <a target="_blank" href="https://www.linkedin.com/in/arighna-chakraborty/">
                                <TextDisperseComponent word="↗LinkedIn" /></a>
                            <a target="_blank" href="https://www.x.com/archrstone"><TextDisperseComponent word="↗Twitter" /></a>
                        </div>
                    </section>
                </div>
            </SkewScrollComponent >
        </main >
    );
}

export default HomePage;
