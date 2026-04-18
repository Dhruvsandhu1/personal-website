import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react" // Removed ArrowRight and CodeXml
import { Reveal } from "@/components/ui/reveal"

export function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <Reveal>
                <p className="font-cursive text-7xl md:text-8xl leading-tight font-sans flex-row justify-start items-stretch tabular-nums text-left text-amber-300">Dhruv Sandhu</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter uppercase text-foreground/90 mt-1">
                  ML Engineer
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-md">
                AI/ML engineer and IIT Bhubaneswar dual-degree student building scalable GenAI and NLP system, ex IIT Delhi research, Jazzee ML, with hands-on MLOps and a knack for model compression and GNNs.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="https://github.com/Dhruvsandhu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-border hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <Github className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/dhruvsandhu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-border hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link
                  href="https://twitter.com/dhruv_sandhu_ml" // Example Twitter handle
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-border hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-bold text-primary">+3</p>
                  <p className="text-muted-foreground mt-1">Years of experience building and deploying ML models.</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">+30</p>
                  <p className="text-muted-foreground mt-1">Projects delivered, from NLP to Computer Vision.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="relative flex items-center justify-center">
            {/* Match the image container background to the page background and avoid tinted backdrop */}
            <Reveal>
              <div className="relative w-full max-w-md aspect-[4/5] bg-background rounded-3xl shadow-2xl p-4">
                <Image
                  src="https://res.cloudinary.com/di1pcuklp/image/upload/v1756662024/dhruv_snap-removebg_dfmwzv.png"
                  alt="Dhruv Sandhu - ML Engineer"
                  width={500}
                  height={500}
                  className="rounded-2xl object-contain w-full h-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
