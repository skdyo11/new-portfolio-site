import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AudioProvider } from "@/components/AudioEngine";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AmbientGlow } from "@/components/AmbientGlow";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#090A0C",
};

export const metadata: Metadata = {
  title: "Saif Ali — Creative Engineer & Systems Architect",
  description:
    "Designing & engineering high-impact digital experiences, resilient distributed web platforms, and luxury e-commerce. Located in Pakistan, working worldwide.",
  keywords: [
    "Saif Ali",
    "saifalii.dev",
    "Creative Engineer",
    "Systems Architect",
    "dhub",
    "dreamroutes",
    "glamlux",
    "Lenis Smooth Scroll",
  ],
  authors: [{ name: "Saif Ali", url: "https://saifalii.dev" }],
  openGraph: {
    title: "Saif Ali — Creative Engineer & Systems Architect",
    description:
      "Designing & engineering high-impact digital experiences, resilient distributed web platforms, and luxury e-commerce.",
    url: "https://saifalii.dev",
    siteName: "saifalii.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090A0C] text-[#F7F7F5] antialiased selection:bg-[#C5A880] selection:text-[#090A0C]">
        <SmoothScroll>
          <ThemeProvider>
            <AudioProvider>
              {/* Subtle Ambient Mouse Spotlight */}
              <AmbientGlow />

              {/* Main Application Content */}
              <div className="relative z-10 flex min-h-screen flex-col">
                {children}
              </div>
            </AudioProvider>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
