import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Enes Gözükücük — Product Strategy & Service Design",
  description:
    "Portfolio of Enes Gözükücük — product strategist, service designer, and innovation consultant based in Berlin. Business strategy, user research, and technical execution.",
  openGraph: {
    title: "Enes Gözükücük — Product Strategy & Service Design",
    description:
      "Product management, service design, and innovation consulting. Based in Berlin.",
    url: "https://enesgozukucuk.com",
    siteName: "Enes Gözükücük",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${dmSerifDisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}