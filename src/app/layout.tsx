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
