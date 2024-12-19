"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import { pp_nekkei, pp_nueue } from "@/utils/fonts";
import TextDisperseComponent from "@/components/text/TextDisperse";
import TextScrollExpandComponent from "@/components/text/TextScrollExpand";
import TextRippleComponent from "@/components/text/TextRipple";

const SkewScrollComponent = dynamic(
    () => import("@/components/scroll/Scroll"),
    { ssr: false },
);

const TextScrollRevealComponent = dynamic(
    () => import("@/components/text/TextScrollReveal"),
    { ssr: false },
);


const aboutPhrase = `A full-stack wizard who turns ideas into digital masterpieces. 
I juggle front-end flair and back-end brains to make the web smarter, 
faster and a lot less boring with style and statements - making people's 
lives easier while also making sure each and every experience is 
uniquely crafted. Mind of an engineer, heart of an artist...`;

function HomePage() {
    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    {/* Hero Section */}
                    <section className={styles.heroSectionWrapper}>
                        <TextRippleComponent text="A Creative" />
                        <TextRippleComponent text="Full-Stack" />
                        <TextRippleComponent text="Developer" />
                    </section>
                    {/* About Section */}
                    <section className={styles.aboutSectionWrapper}>
                        <TextScrollRevealComponent phrase={aboutPhrase} />
                    </section>
                    {/* Work Section */}
                    <section className={styles.workSectionWrapper}>
                        <TextScrollExpandComponent word={"work"} />
                    </section>
                    {/* Contect Section */}
                    <section
                        className={`${styles.contactSectionWrapper} ${pp_nueue.className}`}
                    >
                        <div className={styles.introline}>
                            <p className={styles.introHeading}>Arighna</p>
                            <p className={styles.introHeading}>Chakraborty</p>
                        </div>

                        <div className={styles.introline}>
                            <p className={styles.introHeading}>Multi-Disciplinary</p>
                            <p className={styles.introHeading}>&</p>
                        </div>

                        <div className={styles.introline}>
                            <p className={styles.introHeading}>Creative</p>
                            <p className={styles.introHeading}>Developer</p>
                        </div>

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>
                            <TextDisperseComponent word="+919163411820" />
                            <TextDisperseComponent word="↗Email" />
                        </div>

                        <div className={`${styles.introline} ${pp_nekkei.className}`}>
                            <TextDisperseComponent word="↗Github" />
                            <TextDisperseComponent word="↗Twitter" />
                            <TextDisperseComponent word="↗Insta" />
                        </div>
                    </section>
                </div>
            </SkewScrollComponent>
        </main>
    );
}

export default HomePage;
