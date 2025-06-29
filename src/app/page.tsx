"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import TextDisperseComponent from "@/components/text/TextDisperse";
import TextScrollExpandComponent from "@/components/text/TextScrollExpand";
import Image from "next/image";

import HeroLightImage from "@/assets/images/hero-light.jpg"
import HeroDarkImage from "@/assets/images/hero-dark.jpg"
import { useThemeStore } from "@/stores/themeStore";
import TextStaggerComponent from "@/components/text/TextStagger";

import SkewScrollComponent from "@/components/scroll/Scroll";
import TextScrollRevealComponent from "@/components/text/TextScrollReveal";

const aboutPhrase = `A full-stack wizard who turns ideas into digital masterpieces. 
I juggle front-end flair and back-end brains to make the web smarter, 
faster and a lot less boring with style and statement - Mind of an engineer, heart of an artist...`;

const expPhrase = `With close to 3 years of experience working in 
cross-functional teams and making deadlines sweat, my code is like my documentation -
clean, clear and occasionally sprinkled with weird jokes.
`

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

const projectsData = [
    {
        id: "portfolio",
        name: "Portfolio",
        link: "https://www.github.com/riju-stone/portfolio-24",
        desc: "You're looking at it.",
        stack: "next/sanity/gsap/motion"
    },
    {
        id: "former",
        name: "Former",
        link: "https://www.github.com/riju-stone/former",
        desc: "A simple form builder",
        stack: "next/tailwind/drizzle/redis/postgres"
    },
    {
        id: "chess",
        name: "Chess",
        link: "https://www.github.com/riju-stone/chess",
        desc: "A minimalistic chess engine",
        stack: "js/electron"
    },
    {
        id: "caligator",
        name: "Caligator",
        link: "https://www.github.com/riju-stone/caligator",
        desc: "A simple yet smart calculator",
        stack: "js/electron"
    },
    {
        id: "rss",
        name: "RSS",
        link: "https://www.github.com/riju-stone/go-rss",
        desc: "An RSS aggregator",
        stack: "go/postgres"

    },
    {
        id: "sevin",
        name: "sevin",
        link: "",
        desc: "A distributed task scheduler",
        stack: "go/postgres/redis/aws"
    },
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

    const theme = useThemeStore(state => state.theme);

    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    {/* Hero Section */}
                    <TextStaggerComponent text={["Creative"]} />
                    <section className={styles.heroSectionWrapper}>
                        <Image className={styles.heroImage} src={theme === "light" ? HeroLightImage : HeroDarkImage} alt="Snake" />
                        {/* <TextStaggerComponent text={heroPhrase} /> */}
                    </section>
                    {/* About Section */}
                    <section className={styles.aboutSectionWrapper}>
                        <TextScrollRevealComponent phrase={aboutPhrase} />
                    </section>
                    {/* Work Section */}
                    <section className={styles.workSectionWrapper}>
                        <TextScrollExpandComponent word={"work"} />
                        <div className={styles.experienceWrapper}>
                            <div className={`${styles.experienceMainText} ${pp_nekkei.className}`}>{expPhrase}</div>
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

                        {/* <div className={styles.projectWrapper}>
                            <div className={`${styles.projectTitle} ${pp_nekkei.className}`}>Making my life easier, one project at a time. If it helps you too, well that's just a bonus...</div>
                            <div className={styles.projectTableWrapper}>
                                {projectsData.map((project) => {
                                    return <motion.div key={project.id} className={styles.projectRowContainer} initial="initial" whileHover="hover" whileTap="hover">
                                        <Link href={project.link} target="_blank">
                                            <div className={`${styles.projectRow} ${pp_nekkei.className}`}>
                                                <div className={styles.projectName}>{project.name}</div>
                                                <div className={styles.projectRole}>{project.desc}</div>
                                            </div>
                                            <motion.div className={`${styles.projectMaskRow} ${pp_nekkei.className}`} variants={clipAnimation}>
                                                <div className={styles.projectMaskName}>{project.name}</div>
                                                <div className={styles.projectMaskStack}> {project.stack.split("/").map((stackName, index) => {
                                                    return <div className={styles.stackContainer} key={`stack-${index}`}><Dot /><span>{stackName}</span></div>
                                                })}</div>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                })}
                            </div>
                        </div> */}
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

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>
                            {/* <a target="_blank" href="https://drive.google.com/file/d/1oABZdgSt0rzR5rCghPk5-bBVCxpuWTGb/view?usp=sharing"><TextDisperseComponent word="↗Resume" /></a> */}
                            <a target="_blank" href="mailto:arighna.chakraborty.17@gmail.com"><TextDisperseComponent word="↗Email" /></a>
                            <a target="_blank" href="https://www.github.com/riju-stone"><TextDisperseComponent word="↗Github" /></a>
                        </div>

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>

                            <a target="_blank" href="https://www.linkedin.com/in/arighna-chakraborty/"><TextDisperseComponent word="↗LinkedIn" /> </a>
                            <a target="_blank" href="https://www.x.com/RijuStone"><TextDisperseComponent word="↗Twitter" /></a>
                        </div>
                    </section>
                </div>
            </SkewScrollComponent >
        </main >
    );
}

export default HomePage;
