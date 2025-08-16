"use client";

import React from "react";
import styles from "./page.module.scss";
import SkewScrollComponent from "@/components/custom-scroll/custom-scroll";
import dynamic from "next/dynamic";

// Add dynamic imports for the components
const HeroSectionComponent = dynamic(() => import("@/components/home-page/hero-section"), { ssr: false });
const WorkSectionComponent = dynamic(() => import("@/components/home-page/work-section"), { ssr: false });
const ContactSectionComponent = dynamic(() => import("@/components/home-page/contact-section"), { ssr: false });

function HomePage() {
    return (
        <main style={{ mixBlendMode: "difference" }}>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    <HeroSectionComponent />
                    <WorkSectionComponent />
                    <ContactSectionComponent />
                </div>
            </SkewScrollComponent >
        </main >
    );
}

export default HomePage;
