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

export const metadata: Metadata = {
    metadataBase: new URL("https://archst.dev"),
    title: "Arighna Chakraborty - Portfolio",
    description: "Arighna's little corner on the Internet",
    openGraph: {
        images: "/images/seo-hero.jpg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Preload critical hero images */}
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-1.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-2.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-3.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-4.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-5.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-6.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-7.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-8.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-9.jpg" />
                <link rel="preload" as="image" href="/images/hero-light/row-1-column-10.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-1.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-2.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-3.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-4.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-5.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-6.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-7.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-8.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-9.jpg" />
                <link rel="preload" as="image" href="/images/hero-dark/row-1-column-10.jpg" />
            </head>
            <body className="app">
                <LoaderComponent>
                    <HamburgerMenuComponent />
                    <HeaderComponent />
                    {children}
                    <FooterComponent />
                    <BackgroundComponent />
                </LoaderComponent>
            </body>
            <Analytics />
            <SpeedInsights />
        </html>
    );
}
