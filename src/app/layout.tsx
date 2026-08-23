import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

const siteName = "Siham Akhyame | Cybersecurity Portfolio";

const siteDescription =
  "Cybersecurity portfolio showcasing hands-on projects and labs in cloud-native security, network isolation, access control, automation, and observability.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteName,
    template: "%s | Siham Akhyame",
  },

  description: siteDescription,
  applicationName: siteName,
  authors: [
    {
      name: "Siham Akhyame",
      url: siteUrl,
    },
  ],
  creator: "Siham Akhyame",
  publisher: "Siham Akhyame",
  category: "technology",

  keywords: [
    "Siham Akhyame",
    "cybersecurity portfolio",
    "cybersecurity projects",
    "cybersecurity labs",
    "DevSecOps",
    "Kubernetes security",
    "cloud security",
    "network security",
    "identity and access management",
    "GitOps",
    "digital forensics",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },

  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-primary/60 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary focus:no-underline"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}