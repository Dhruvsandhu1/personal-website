"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, CodeXml } from "lucide-react"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Why Me?", href: "#why-me" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      let currentSection = "home"
      navItems.forEach((item) => {
        const section = document.getElementById(item.href.substring(1))
        if (section && section.offsetTop <= window.scrollY + 100) {
          // 100px offset
          currentSection = item.href.substring(1)
        }
      })
      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 opacity-100 flex-row bg-transparent">
        <Link href="#home" className="flex items-center gap-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-sans">Dhruv Sandhu</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className={`text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 ${
                activeSection === item.href.substring(1) ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-card text-foreground border-primary hover:bg-primary/10 hover:text-primary"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    asChild
                    className={`text-lg justify-start hover:text-primary hover:bg-primary/10 ${
                      activeSection === item.href.substring(1) ? "text-primary bg-primary/5" : "text-foreground"
                    }`}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
