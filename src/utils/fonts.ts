import localFont from "next/font/local";
import { Space_Grotesk, Inter } from "next/font/google";

export const pp_nueue = localFont({
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
    // Add font-display: optional for non-critical fonts
    adjustFontFallback: "Arial",
    // Load only critical weights initially
    src: [
        {
            path: "../../public/fonts/pp_nueue/ppneuemontreal-medium.otf",
            style: "normal",
            weight: "400",
        }
    ],
});

export const pp_nekkei = localFont({
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
    adjustFontFallback: "Arial",
    src: [
        {
            path: "../../public/fonts/pp_nikkei/PPNikkeiMaru-Regular.otf",
            style: "normal",
            weight: "400",
        }
    ],
});

export const inter = Inter({
    fallback: ["system-ui", "arial"],
    subsets: ["latin"],
    variable: "--font-inter",
});

export const space_grotesk = Space_Grotesk({
    display: "swap",
    fallback: ["system-ui", "arial"],
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

