import React from "react";
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b5e55",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zengwachristianeducationcentre.org"),

  title: {
    default: "Zengwa Christian Education Centre | Transforming Lives Through Faith and Education",
    template: "%s | Zengwa Christian Education Centre",
  },

  description:
    "Support Zengwa Christian Education Centre through donations, child sponsorship, evangelism, education, and community development. Together we transform lives through faith and love.",

  keywords: [
    "Zengwa",
    "Zengwa Christian Education Centre",
    "Christian charity",
    "Child sponsorship Kenya",
    "Education charity",
    "School sponsorship",
    "Church ministry",
    "Evangelism",
    "Donate Kenya",
    "Christian education",
    "Mission organization",
    "Africa charity",
    "Faith-based NGO",
    "Community development",
  ],

  authors: [
    {
      name: "Qweeewp Africa",
    },
  ],

  creator: "Qweeewp Africa",
  publisher: "Zengwa Christian Education Centre",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://zengwachristianeducationcentre.org",
  },

  icons: {
    icon: "/favicon-96.png",
    shortcut: "/favicon-96.png",
    apple: "/favicon-96.png",
  },

  openGraph: {
    title: "Zengwa Christian Education Centre | Transforming Lives Through Faith and Education",
    description:
      "Empowering communities through education, child sponsorship, evangelism, and Christian outreach across Africa.",

    url: "https://zengwachristianeducationcentre.org",
    siteName: "Zengwa Christian Education Centre",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Zengwa Christian Education Centre logo ",
      },
    ],

    locale: "en_KE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zengwa Christian Education Centre",
    description:
      "Support education, child sponsorship, evangelism, and community transformation through Zengwa Christian Education Centre.",

    images: ["/logo.png"],
  },

  category: "Nonprofit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}