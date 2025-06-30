import localFont from "next/font/local";
import { Space_Grotesk, Inter, Roboto_Mono } from "next/font/google";

export const pp_nueue = localFont({
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
    src: [
        {
            path: "../../public/fonts/pp_nueue/ppneuemontreal-thin.otf",
            style: "normal",
            weight: "200",
        },
        {
            path: "../../public/fonts/pp_nueue/ppneuemontreal-medium.otf",
            style: "normal",
            weight: "400",
        },
        {
            path: "../../public/fonts/pp_nueue/ppneuemontreal-bold.otf",
            style: "normal",
            weight: "600",
        },
        {
            path: "../../public/fonts/pp_nueue/ppneuemontreal-book.otf",
            style: "normal",
            weight: "800",
        }
    ],
});

export const pp_nekkei = localFont({
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
    src: [
        {
            path: "../../public/fonts/pp_nikkei/PPNikkeiMaru-Light.otf",
            style: "normal",
            weight: "200",
        },
        {
            path: "../../public/fonts/pp_nikkei/PPNikkeiMaru-Regular.otf",
            style: "normal",
            weight: "400",
        },
        {
            path: "../../public/fonts/pp_nikkei/PPNikkeiMaru-Ultrabold.otf",
            style: "normal",
            weight: "800",
        },
    ],
});

export const inter = Inter({
    fallback: ["system-ui", "arial"],
    subsets: ["latin"],
    variable: "--font-inter",
});

export const space_grotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono"
})

