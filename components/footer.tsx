import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="https://github.com/Dhruvsandhu1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dhruvsandhu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="mailto:dhruvsandhu21@gmail.com" aria-label="Email">
            <Mail className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dhruv Sandhu. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">Built with Next.js, Tailwind CSS, and a sprinkle of magic.</p>
      </div>
    </footer>
  )
}
