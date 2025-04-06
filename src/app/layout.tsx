import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextWrapper } from "@/context/userContext";

// Initialised for font family
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "DeEmcee Speak Lively",
  description:
    "At Deemcee, we empower young speakers (ages 5-10) to inspire with confidence. Through a structured program, children refine their self-expression, build resilience, and master public speaking. From role plays to global discussions, we nurture articulation, stage presence, and a love for communication. Join us in shaping future voices!",
  icons: {
    icon: "/images/logo-ver.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-yellow-2 text-yellow-12 ${inter.className} ${ibmPlexSerif.variable}`}
      >
        <AuthContextWrapper>{children}</AuthContextWrapper>
        <Toaster />
      </body>
    </html>
  );
}
