import localFont from "next/font/local";
import { Space_Grotesk, Inter, Lexend_Deca } from "next/font/google";

export const pp_nueue = localFont({
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
    },
    {
      path: "../../public/fonts/pp_nueue/ppneuemontreal-italic.otf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../public/fonts/pp_nueue/ppneuemontreal-semibolditalic.otf",
      style: "italic",
      weight: "600",
    },
  ],
});

export const pp_nekkei = localFont({
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
  subsets: ["latin"],
  variable: "--font-inter",
});

export const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});
