"use client";

import React from "react";
import styles from "./page.module.scss";
import dynamic from 'next/dynamic';

import SkewScrollComponent from "@/components/scroll/Scroll";
import HeroSection from "@/components/sections/hero-section";

const AboutSection = dynamic(() => import("@/components/sections/about-section"), {
    ssr: false
});

const WorkSection = dynamic(() => import("@/components/sections/work-section"), {
    ssr: false
});

const ContactSection = dynamic(() => import("@/components/sections/contact-section"), {
    ssr: false
});

function HomePage() {
    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.homePageWrapper}>
                    {/* Hero Section */}
                    <HeroSection />
                    {/* About Section */}
                    <AboutSection />
                    {/* Work Section */}
                    <WorkSection />
                    {/* Contact Section */}
                    <ContactSection />
                </div>
            </SkewScrollComponent >
        </main >
    );
}

export default HomePage;
