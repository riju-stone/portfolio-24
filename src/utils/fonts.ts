import localFont from "next/font/local";
import { Space_Grotesk, Inter, Lexend_Deca } from "next/font/google";

export const pp_nueue = localFont({
  src: [
    {
      path: "../fonts/pp_nueue/ppneuemontreal-thin.otf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../fonts/pp_nueue/ppneuemontreal-medium.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/pp_nueue/ppneuemontreal-bold.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../fonts/pp_nueue/ppneuemontreal-book.otf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../fonts/pp_nueue/ppneuemontreal-italic.otf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../fonts/pp_nueue/ppneuemontreal-semibolditalic.otf",
      style: "italic",
      weight: "600",
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
