import type { Metadata } from "next";
import "./globals.scss";
import BackgroundComponent from "@/components/background/Background";

export const metadata: Metadata = {
  title: "Portfolio-24 Arighna",
  description: "Arighna Chakraborty Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app">
        {children}
        <BackgroundComponent />
      </body>
    </html>
  );
}
