"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Dot } from "lucide-react"

import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import TextDisperseComponent from "@/components/text/TextDisperse";
import TextScrollExpandComponent from "@/components/text/TextScrollExpand";
import TextStaggerComponent from "@/components/text/TextStagger";

import DistortGif from "@/assets/gifs/distort.gif"
import DotGif from "@/assets/gifs/spinning-dots.gif"
import SnakeGif from "@/assets/gifs/snake.gif"
import { useDevice } from "@/hooks/useDevice";
import Link from "next/link";

const SkewScrollComponent = dynamic(
    () => import("@/components/scroll/Scroll"),
    { ssr: false },
);

const TextScrollRevealComponent = dynamic(
    () => import("@/components/text/TextScrollReveal"),
    { ssr: false },
);

const heroPhrase = ["Creative", SnakeGif, "&", "Full", DistortGif, "Stack", DotGif, "Developer"]
const heroPhraseSmall = ["Creative", "&", SnakeGif, "Full", DistortGif, "Stack", DotGif, "Developer"]

const aboutPhrase = `A full-stack wizard who turns ideas into digital masterpieces. 
I juggle front-end flair and back-end brains to make the web smarter, 
faster and a lot less boring with style and statement - Mind of an engineer, heart of an artist...`;

const expPhrase = `With close to 3 years of experience working in 
cross-functional teams and making deadlines sweat, my code is like my documentation:
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
        stack: "next/tailwind/drizzle/postgres"
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
        id: "tasch",
        name: "Tasch",
        link: "",
        desc: "A distributed task scheduler",
        stack: "go/grpc/postgres"
    },
]

const clipAnimation = {
    initial: {
        clipPath: "inset(50% 0)",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    hover: {
        clipPath: "inset(0 0)",
        transition: {
            delay: 0.2,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function HomePage() {
    const deviceType = useDevice()

    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    {/* Hero Section */}
                    <section className={styles.heroSectionWrapper}>
                        <TextStaggerComponent text={deviceType == "mobile" ? heroPhraseSmall : heroPhrase} />
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

                        <div className={styles.projectWrapper}>
                            <div className={`${styles.projectTitle} ${pp_nekkei.className}`}>Trying to be one of the few. Not one of the many...</div>
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

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>
                            <a target="_blank" href="https://drive.google.com/file/d/1DsP6VKBDvemPPCyn3FOtIfGiOH9SsPb8/view?usp=sharing"><TextDisperseComponent word="↗Resume" /></a>
                            <a target="_blank" href="mailto:arighna.chakraborty.17@gmail.com"><TextDisperseComponent word="↗Email" /></a>
                            <a target="_blank" href="https://www.github.com/riju-stone"><TextDisperseComponent word="↗Github" /></a>
                        </div>

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>

                            <a target="_blank" href="https://www.linkedin.com/in/arighna-chakraborty/"><TextDisperseComponent word="↗LinkedIn" /> </a>
                            <a target="_blank" href="https://www.x.com/RijuStone"><TextDisperseComponent word="↗Twitter" /></a>
                            <a target="_blank" href="https://www.instagram.com/init_riju.dat"><TextDisperseComponent word="↗Insta" /></a>
                        </div>
                    </section>
                </div>
            </SkewScrollComponent >
        </main >
    );
}

export default HomePage;
