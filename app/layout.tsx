import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qluely — AI Meeting Assistant with Live Notes & Smart Summaries",
  description:
    "Choose the best Qluely plan for AI-powered meetings — live transcription, real-time notes, automated summaries, and CRM-ready insights. Free plan available.",

  openGraph: {
    title: "Qluely — Smarter AI Meeting Assistant",
    description:
      "Compare plans offering real-time transcription, live notes, and automated summaries. Designed for sales calls and everyday meetings. Start free.",
    url: "https://Qluely.in/",
    images: [
      {
        url: "https://Qluely.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Qluely Pricing — meeting assistant",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Qluely — Smarter AI Meeting Assistant",
    description:
      "AI meeting notes, transcription, and summaries — pick the plan that fits your workflow. Free plan included.",
    images: ["https://Qluely.in/og/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },

  keywords: [
    "AI meeting assistant",
    "meeting transcription",
    "meeting summaries",
    "sales call notes",
    "CRM notes automation",
    "Qluely pricing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
