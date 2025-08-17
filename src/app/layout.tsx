import React from "react";
import dynamic from "next/dynamic";

import { Metadata } from "next";
import AnalyticsComponent from "./analytics";

import "./globals.scss";

const HeaderComponent = dynamic(() => import("@/components/header/header-component"), { ssr: true });
const FooterComponent = dynamic(() => import("@/components/footer/footer-component"), { ssr: true });
const HamburgerMenuComponent = dynamic(() => import("@/components/hamburger/hamburger-menu"), { ssr: true });
const BackgroundComponent = dynamic(() => import("@/components/background/background-canvas"), { ssr: true });

export const metadata: Metadata = {
    metadataBase: new URL("https://archst.dev"),
    title: {
        default: "Arighna Chakraborty - Full Stack Developer Portfolio",
        template: "%s | Arighna Chakraborty"
    },
    icons: {
        icon: "/images/seo-hero.jpg",
    },
    openGraph: {
        title: "Arighna Chakraborty - Full Stack Developer Portfolio",
        description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills. Explore my journey in web development, design, and technology.",
        images: ["/images/seo-hero.jpg"],
    },
    description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills. Explore my journey in web development, design, and technology.",
    keywords: [
        "Arighna Chakraborty",
        "Full Stack Developer",
        "Web Developer",
        "Portfolio",
        "React",
        "JavaScript",
        "Frontend Developer",
        "Backend Developer",
        "Software Engineer",
        "Technology"
    ],
    authors: [
        {
            name: "Arighna Chakraborty",
            url: "https://archst.dev"
        }
    ],
    creator: "Arighna Chakraborty",
    publisher: "Arighna Chakraborty",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    twitter: {
        card: "summary_large_image",
        title: "Arighna Chakraborty - Portfolio",
        description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills.",
        images: ["/images/seo-hero.jpg"],
        creator: "@RijuStone",
        site: "@RijuStone",
    },
    category: "Technology",
    classification: "Portfolio Website",
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID,
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

                {/* Optimize font loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Preload critical resources */}
                <link rel="preload" as="image" href="/images/seo-hero.jpg" />

                {/* Add resource hints */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
            </head>
            <body className="app">
                <HamburgerMenuComponent />
                <HeaderComponent />
                {children}
                <FooterComponent />
                <BackgroundComponent />
            </body>
            <AnalyticsComponent />
        </html>
    );
}
