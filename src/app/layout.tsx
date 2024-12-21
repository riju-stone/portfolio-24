import React from "react";

import "./globals.scss";
const BackgroundComponent = dynamic(
    () => import("@/components/background/Background"),
    { ssr: false },
);
import HeaderComponent from "@/components/header/Header";
import dynamic from "next/dynamic";

const HamburgerMenuComponent = dynamic(
    () => import("@/components/hamburger/Hamburger"),
    { ssr: false },
);

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Metadata } from "next";
const LoaderComponent = dynamic(() => import("@/components/loader/Loader"), {
    ssr: false,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://archst.dev"),
    title: "Arighna Chakraborty - Portfolio",
    description: "Arighna's little corner on the Internet",
    openGraph: {
        images: "",
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
                    <BackgroundComponent />
                </LoaderComponent>
            </body>
            <Analytics />
            <SpeedInsights />
        </html>
    );
}
