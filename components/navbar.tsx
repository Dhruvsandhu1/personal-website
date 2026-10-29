"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      let current = ""
      navItems.forEach((item) => {
        const section = document.getElementById(item.href.substring(1))
        if (section && section.offsetTop <= window.scrollY + window.innerHeight * 0.35) {
          current = item.href.substring(1)
        }
      })
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-500",
          isScrolled
            ? "border-white/[0.08] bg-zinc-950/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="#home" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-[11px] font-semibold text-background transition-transform duration-300 group-hover:rotate-[-8deg]">
            DS
          </span>
          <span className="text-sm font-medium tracking-tight">Dhruv Sandhu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Résumé
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground"
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs border-white/10 bg-zinc-950">
              <SheetTitle className="eyebrow">Navigate</SheetTitle>
              <nav className="mt-10 flex flex-col" aria-label="Mobile">
                {navItems.map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4"
                  >
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    <span className="text-2xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background"
              >
                View Résumé <ArrowUpRight className="h-4 w-4" />
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
