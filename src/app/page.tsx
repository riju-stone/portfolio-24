"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import { pp_nekkei, pp_nueue, space_grotesk } from "@/utils/fonts";
import TextDisperseComponent from "@/components/text/TextDisperse";
import TextScrollExpandComponent from "@/components/text/TextScrollExpand";
import TextStaggerComponent from "@/components/text/TextStagger";

import DistortGif from "@/assets/gifs/distort.gif"
import DotGif from "@/assets/gifs/spinning-dots.gif"
import SnakeGif from "@/assets/gifs/snake.gif"

const SkewScrollComponent = dynamic(
    () => import("@/components/scroll/Scroll"),
    { ssr: false },
);

const TextScrollRevealComponent = dynamic(
    () => import("@/components/text/TextScrollReveal"),
    { ssr: false },
);


const heroPhrase = ["Creative", SnakeGif, "&", "Full", DistortGif, "Stack", DotGif, "Developer"]

const aboutPhrase = `A full-stack wizard who turns ideas into digital masterpieces. 
I juggle front-end flair and back-end brains to make the web smarter, 
faster and a lot less boring with style and statement - Mind of an engineer, heart of an artist...`;

const expPhrase = `With close to 3 years of experience working with 
cross-functional teams and making deadlines sweat, my code is like my documentation:
clean, clear and occasionally sprinkled with weird jokes.
`

const experienceData = [
    {
        id: "session-ai",
        name: "Session AI Inc.",
        role: "SWE II",
        duration: "2.5 years"
    },
    {
        id: "simulacra-tech",
        name: "Simulacra Technologies",
        role: "Freelancer",
        duration: "7 months"
    },
    {
        id: "skill-academia",
        name: "Skill Academia",
        role: "SWE Intern",
        duration: "6 months"
    }
]

function HomePage() {
    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    {/* Hero Section */}
                    <section className={styles.heroSectionWrapper}>
                        <TextStaggerComponent text={heroPhrase} />
                    </section>
                    {/* About Section */}
                    <section className={styles.aboutSectionWrapper}>
                        <TextScrollRevealComponent phrase={aboutPhrase} />
                    </section>
                    {/* Work Section */}
                    <section className={`${styles.workSectionWrapper} ${pp_nekkei.className}`}>
                        <TextScrollExpandComponent word={"work"} />
                        <div className={styles.experienceWrapper}>
                            <div className={styles.experienceMainText}>{expPhrase}</div>
                            <div className={styles.experienceTableWrapper}>
                                {experienceData.map((exp) => {
                                    return <div key={exp.id} className={styles.experienceRowContainer}>
                                        <div className={styles.experienceRow}>
                                            <div className={styles.experienceName}>{exp.name}</div>
                                            <div className={styles.experienceRole}>{exp.role}</div>
                                        </div>
                                        <div className={styles.experienceMaskRow}>
                                            <div className={styles.experienceName}>{exp.name}</div>
                                            <div className={styles.experienceDuration}>{exp.duration}</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                            {/* <div className={styles.experienceSubText}>Trying to be one of the few. Not one of the many...</div> */}
                        </div>

                        <div className={styles.projectWrapper}>
                            <div className={styles.projectTitle}>Projects</div>
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
                            <a href="mailto:arighna.chakraborty.17@gmail.com"><TextDisperseComponent word="↗Email" /></a>
                            <a href="https://www.linkedin.com/in/arighna-chakraborty/"><TextDisperseComponent word="↗LinkedIn" /> </a>
                        </div>

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>
                            <a href="https://www.github.com/riju-stone"><TextDisperseComponent word="↗Github" /></a>
                            <a href="https://www.x.com/RijuStone"><TextDisperseComponent word="↗Twitter" /></a>
                            <a href="https://www.instagram.com/init_riju.dat"><TextDisperseComponent word="↗Insta" /></a>
                        </div>
                    </section>
                </div>
            </SkewScrollComponent >
        </main >
    );
}

export default HomePage;
