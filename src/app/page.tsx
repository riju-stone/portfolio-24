import React from "react";
import styles from "./page.module.scss";
import SkewScrollComponent from "@/components/custom-scroll/custom-scroll";
import FancyTableComponent from "@/components/custom-table/custom-table";
import TextStaggerComponent from "@/components/custom-text/text-stagger";
import TextDisperseComponent from "@/components/custom-text/text-disperse";
import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import TextScrollRevealComponent from "@/components/custom-text/text-scroll-reveal";
import { EXPERIENCE_DATA, EXPERIENCE_METADATA, EXPERIENCE_PHRASE, HEADING_TEXT, INTRO_PHRASE, PROJECT_DATA, PROJECT_METADATA, PROJECT_PHRASE } from "@/utils/constants";
import HeroImageComponent from "@/components/hero-image/hero-image";

function HomePage() {
    return (
        <main style={{ mixBlendMode: "difference" }}>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
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

                    <section className={styles.workSectionWrapper}>
                        <div className={styles.experienceWrapper}>
                            <TextScrollRevealComponent
                                phrase="Experience"
                                startOffset="1"
                                endOffset="0.75"
                                style="letter"
                                className={styles.workHeading} />
                            <TextStaggerComponent className={`${styles.workSubtext} ${pp_nekkei.className}`} text={EXPERIENCE_PHRASE} style="word" once={true} staggerDelay={0.02} />
                            <FancyTableComponent
                                metadata={EXPERIENCE_METADATA}
                                tableData={EXPERIENCE_DATA} />
                        </div>
                        <div className={styles.projectWrapper}>
                            <TextScrollRevealComponent
                                phrase="Projects"
                                startOffset="1"
                                endOffset="0.75"
                                style="letter"
                                className={styles.workHeading} />
                            <TextStaggerComponent className={`${styles.workSubtext} ${pp_nekkei.className}`} text={PROJECT_PHRASE} style="word" once={true} staggerDelay={0.02} />
                            <FancyTableComponent
                                metadata={PROJECT_METADATA}
                                tableData={PROJECT_DATA} />
                        </div>
                    </section>

                    <section className={`${styles.contactSectionWrapper} ${pp_nueue.className}`}>
                        <TextStaggerComponent
                            className={styles.contactHeading}
                            text="Caught a Spark? Your Move"
                            style="line"
                            wordsPerLine={3}
                            once={true}
                            duration={0.65}
                            delay={0.75}
                            staggerDelay={0.06} />
                        <div className={`${styles.introlinkContainer} ${pp_nekkei.className}`}>
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
