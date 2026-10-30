import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { MotionProvider } from "@/components/motion-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Dhruv Sandhu — Machine Learning Engineer",
  description:
    "Dhruv Sandhu is a Machine Learning Engineer at IIT Bhubaneswar building GenAI, NLP and graph learning systems — from research to production.",
  openGraph: {
    title: "Dhruv Sandhu — Machine Learning Engineer",
    description: "GenAI, NLP and graph learning systems — from research to production.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Sandhu — Machine Learning Engineer",
    description: "GenAI, NLP and graph learning systems — from research to production.",
  },
}

export const viewport: Viewport = {
  themeColor: "#09090b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css" />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative overflow-x-clip">
            {children}
          </main>
          <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
