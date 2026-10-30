import Link from "next/link"
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"

const socials = [
  { label: "GitHub", href: "https://github.com/Dhruvsandhu1", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvsandhu/", icon: Linkedin },
  { label: "Email", href: "mailto:dhruvsandhu21@gmail.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container max-w-6xl py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
              DS
            </span>
            <div>
              <p className="text-sm font-medium">Dhruv Sandhu</p>
              <p className="text-xs text-muted-foreground">Machine Learning Engineer</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {socials.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
            <Link
              href="/#home"
              aria-label="Back to top"
              className="ml-2 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-16 select-none overflow-hidden whitespace-nowrap text-center text-[12.5vw] font-semibold leading-[0.9] tracking-[-0.06em] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] to-white/0 lg:text-[11rem]"
        >
          Dhruv Sandhu
        </p>

        <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Dhruv Sandhu. All rights reserved.</p>
          <p>Designed &amp; built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
