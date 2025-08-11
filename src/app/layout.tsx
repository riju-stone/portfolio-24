import React from "react";
import BackgroundComponent from "@/components/background/background-canvas.tsx";
import HeaderComponent from "@/components/header/header.tsx";
import HamburgerMenuComponent from "@/components/hamburger/hamburger-menu.tsx";
import LoaderComponent from "@/components/site-loader/site-loader.tsx";
import "./globals.scss";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Metadata } from "next";
import FooterComponent from "@/components/footer/footer.tsx";

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
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://archst.dev",
        siteName: "Arighna Chakraborty - Portfolio",
        title: "Arighna Chakraborty - Portfolio",
        description: "Arighna Chakraborty's portfolio showcasing full-stack development expertise, innovative projects, and technical skills. Explore my journey in web development, design, and technology.",
        images: [
            {
                url: "/images/seo-hero.jpg",
                width: 1200,
                height: 630,
                alt: "Arighna Chakraborty - Portfolio",
                type: "image/jpeg"
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Arighna Chakraborty - Portfolio",
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
        "twitter:image:alt": "Arighna Chakraborty - Portfolio",
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
                <link rel="preload" as="image" href="/images/engineer.gif" />
            </head>
            <body className="app">
                <HamburgerMenuComponent />
                <LoaderComponent>
                    <HeaderComponent />
                    {children}
                </LoaderComponent>
                <FooterComponent />
                <BackgroundComponent />
            </body>
            <Analytics />
            <SpeedInsights />
        </html>
    );
}
