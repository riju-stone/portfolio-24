"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import "./globals.scss";
const BackgroundComponent = dynamic(
  () => import("@/components/background/Background"),
  { ssr: false },
);
import HeaderComponent from "@/components/header/Header";
import { usePageStore } from "@/stores/pageStore";
import dynamic from "next/dynamic";

const HamburgerMenuComponent = dynamic(
  () => import("@/components/hamburger/Hamburger"),
  { ssr: false },
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const changeActivePage = usePageStore((state) => state.setActivePage);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const path = window.location.pathname.split("/")[1];

  useEffect(() => {
    changeActivePage(path == "" ? "home" : path);
  }, [path]);

  return (
    <html lang="en">
      <body className="app">
        <main>
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <HamburgerMenuComponent
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
              />
            ) : null}
          </AnimatePresence>
          <HeaderComponent isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          {children}
          <BackgroundComponent />
        </main>
      </body>
    </html>
  );
}
