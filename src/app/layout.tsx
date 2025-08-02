import React from "react";
import BackgroundComponent from "@/components/background/Background";
import HeaderComponent from "@/components/header/Header";
import HamburgerMenuComponent from "@/components/hamburger/Hamburger";
import LoaderComponent from "@/components/loader/Loader";
import "./globals.scss";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Metadata } from "next";
import FooterComponent from "@/components/footer/Footer";
import CursorComponent from "@/components/cursor/Cursor";

export const metadata: Metadata = {
    metadataBase: new URL("https://archst.dev"),
    title: {
        default: "Arighna Chakraborty - Full Stack Developer Portfolio",
        template: "%s | Arighna Chakraborty"
    },
    icons: {
        icon: "/images/seo-hero.jpg",
    },
    description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills. Explore my journey in web development, design, and technology.",
    keywords: [
        "Arighna Chakraborty",
        "Full Stack Developer",
        "Web Developer",
        "Portfolio",
        "React",
        "Next.js",
        "JavaScript",
        "Frontend Developer",
        "Backend Developer",
        "Software Engineer",
        "Web Design",
        "UI/UX",
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
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://archst.dev",
        siteName: "Arighna Chakraborty - Full Stack Developer Portfolio",
        title: "Arighna Chakraborty - Full Stack Developer Portfolio",
        description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills. Explore my journey in web development, design, and technology.",
        images: [
            {
                url: "/images/seo-hero.jpg",
                width: 1200,
                height: 630,
                alt: "Arighna Chakraborty - Full Stack Developer Portfolio",
                type: "image/jpeg"
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Arighna Chakraborty - Full Stack Developer Portfolio",
        description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills.",
        images: ["/images/seo-hero.jpg"],
        creator: "@RijuStone",
        site: "@RijuStone",
    },
    alternates: {
        canonical: "https://archst.dev",
    },
    category: "Technology",
    classification: "Portfolio Website",
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID, // Add your Google Search Console 
    },
    applicationName: "Arighna Chakraborty Portfolio",
    referrer: "origin-when-cross-origin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    other: {
        "theme-color": "#000000", // Adjust to match your site's theme
        "color-scheme": "dark light",
        "twitter:image:alt": "Arighna Chakraborty - Full Stack Developer Portfolio",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta name="theme-color" content="#0c0c0c" />
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="preload" as="image" href="/images/seo-hero.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-3.webp" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-4.webp" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-5.webp" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-3.webp" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-4.webp" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-5.webp" />
            </head>
            <body className="app">
                <LoaderComponent>
                    <HamburgerMenuComponent />
                    <HeaderComponent />
                    {children}
                    <FooterComponent />
                    <CursorComponent />
                    <BackgroundComponent />
                </LoaderComponent>
            </body>
            <Analytics />
            <SpeedInsights />
        </html>
    );
}
