import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ronak Thacker — AI-Powered Website Developer",
  description:
    "Futuristic portfolio of Ronak Thacker — 17-year-old self-taught AI-powered Website Developer from India building immersive, high-performance digital experiences.",
  keywords: [
    "Ronak Thacker",
    "AI developer",
    "website developer",
    "React",
    "Next.js",
    "futuristic portfolio",
    "India developer",
  ],
  openGraph: {
    title: "Ronak Thacker — AI-Powered Website Developer",
    description:
      "AI is my tool. Creativity is my power. Cinematic portfolio showcasing futuristic web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full noise">{children}</body>
    </html>
  );
}
