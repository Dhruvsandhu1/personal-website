import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashCursor } from "@/components/ui/splash-cursor"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  title: "Dhruv Sandhu | ML Engineer",
  description: "Portfolio of Dhruv Sandhu, a passionate Machine Learning Engineer.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dancingScript.variable} font-sans bg-background text-foreground scroll-smooth`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SplashCursor />
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
