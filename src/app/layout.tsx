import type { Metadata } from "next";
import "./globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
