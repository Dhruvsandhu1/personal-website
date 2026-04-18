"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, FileDown } from "lucide-react" // Added FileDown
import { Reveal } from "@/components/ui/reveal"
import { motion } from "framer-motion"
import { Meteors } from "@/components/ui/meteors"

export function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-background text-foreground relative overflow-hidden">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

      {/* Background Meteors */}
      <div className="absolute inset-0 bottom-0 top-0 left-0 right-0 z-0 pointer-events-none">
        <Meteors number={25} />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <Reveal>
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] pb-2">
                  Dhruv Sandhu
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-tighter uppercase text-cyan-400/90 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] mt-2">
                  ML Engineer
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="mt-6 flex items-center gap-4 relative">
                {/* Cyberpunk accent lines */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500 rounded-full drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                <p className="text-lg md:text-xl text-muted-foreground/80 max-w-md font-mono text-sm leading-relaxed border-l border-white/10 pl-6">
                  <span className="text-cyan-400">{'<'}</span>
                  <span className="text-purple-400">AI/ML Engineer</span>
                  <span className="text-cyan-400">{'>'}</span> 
                  <br />
                  IIT Bhubaneswar dual-degree student building scalable GenAI and NLP systems. Ex-IIT Delhi research & Jazzee ML. Hands-on MLOps with a knack for model compression and GNNs.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  download
                  className="h-12 px-6 flex items-center justify-center rounded-full font-mono text-sm uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 mr-2 group"
                >
                  <FileDown className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  [Download Resume]
                </Link>
                <Link
                  href="https://github.com/Dhruvsandhu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-border hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-colors shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/dhruvsandhu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-border hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-colors shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/dhruv_sandhu_ml" // Example Twitter handle
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-border hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-colors shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-bold font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">> 3</p>
                  <p className="text-muted-foreground/80 mt-1 font-mono text-xs uppercase tracking-wider text-purple-400/70">Years Exp.</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">> 30</p>
                  <p className="text-muted-foreground/80 mt-1 font-mono text-xs uppercase tracking-wider text-purple-400/70">Projects</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="relative flex items-center justify-center">
            {/* Match the image container background to the page background and avoid tinted backdrop */}
            <Reveal>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              <motion.div 
                className="relative w-full max-w-md aspect-[4/5] bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.15)] p-4 overflow-hidden group"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Cyberpunk Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent top-0 h-[20%] w-full opacity-0 group-hover:opacity-100 group-hover:animate-scanline z-20 pointer-events-none"></div>

                <Image
                  src="https://res.cloudinary.com/di1pcuklp/image/upload/v1756662024/dhruv_snap-removebg_dfmwzv.png"
                  alt="Dhruv Sandhu - ML Engineer"
                  width={500}
                  height={500}
                  className="rounded-2xl object-contain w-full h-full"
                />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
