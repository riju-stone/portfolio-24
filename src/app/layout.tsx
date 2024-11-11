"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import "./globals.scss";
import BackgroundComponent from "@/components/background/Background";
import HeaderComponent from "@/components/header/Header";
import HamburgerMenuComponent from "@/components/hamburger/Hamburger";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setMenuOpen] = useState(false);
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
