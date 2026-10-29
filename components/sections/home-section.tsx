"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { LiveAvatar } from "@/components/live-avatar"

const stats = [
  { value: "3+", label: "Years building ML" },
  { value: "30+", label: "Projects built" },
  { value: "3", label: "Industry & research internships" },
  { value: "100+", label: "ML club members led" },
]

const stack = [
  "PyTorch",
  "Transformers",
  "LangChain",
  "LangGraph",
  "Graph Neural Networks",
  "Knowledge Distillation",
  "MLflow",
  "Airflow",
  "Docker",
  "AWS SageMaker",
  "LiveKit",
  "Supabase",
]

const socials = [
  { label: "GitHub", href: "https://github.com/Dhruvsandhu1", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvsandhu/", icon: Linkedin },
  { label: "Email", href: "mailto:dhruvsandhu21@gmail.com", icon: Mail },
]

const ease = [0.16, 1, 0.3, 1] as const

export function HomeSection() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease, delay },
        }

  return (
    <section id="home" className="relative isolate overflow-hidden pt-32 md:pt-40">
      {/* Ambient backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-18rem] -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-primary/[0.13] blur-[120px]"
      />

      <div className="container max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div>
            <motion.div {...rise(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Machine Learning Engineer · IIT Bhubaneswar
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="mt-8 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.75rem] font-semibold tracking-[-0.045em] text-balance"
            >
              Building GenAI systems from{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">research</span> to{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em]">production.</span>
            </motion.h1>

            <motion.p {...rise(0.16)} className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
              I&apos;m <span className="text-foreground">Dhruv Sandhu</span>, a dual-degree student at IIT Bhubaneswar
              working on NLP, graph learning and efficient models. Previously ML at Jazzee Technologies and research at
              IIT Delhi — with hands-on MLOps and a knack for model compression.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_hsl(var(--primary)),0_8px_32px_-8px_hsl(var(--primary)/0.6)] transition-all hover:brightness-110"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium transition-colors hover:bg-white/[0.07]"
              >
                Résumé
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <div className="ml-1 flex items-center gap-1">
                {socials.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-zinc-800/60 via-zinc-900/60 to-zinc-950">
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_50%_100%,hsl(var(--primary)/0.28),transparent_65%)]"
              />
              <div aria-hidden className="absolute inset-0 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
              <LiveAvatar
                alt="Animated avatar of Dhruv Sandhu"
                className="absolute bottom-0 left-1/2 h-[94%] -translate-x-1/2"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-sm font-medium">Dhruv Sandhu</p>
                  <p className="text-xs text-muted-foreground">NLP · Computer Vision · GNNs</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">ML Eng.</span>
              </div>
            </div>
            <div className="absolute -left-6 top-10 hidden rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 shadow-2xl backdrop-blur-md sm:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Research</p>
              <p className="mt-1 text-sm font-medium">IIT Delhi · fMRI + GNNs</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.dl
          {...rise(0.32)}
          className="mt-20 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.07] md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`bg-white/[0.015] px-6 py-7 ${i % 2 === 1 ? "border-l border-white/[0.07]" : ""} ${
                i >= 2 ? "border-t border-white/[0.07] md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl md:text-5xl font-semibold tracking-[-0.04em]">{s.value}</dd>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Stack marquee */}
      <div className="mt-20 border-y border-white/[0.06] py-6 mask-fade-x">
        <div className="flex w-max animate-marquee gap-12 pr-12 motion-reduce:animate-none">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap text-sm text-muted-foreground">
              {s}
              <span aria-hidden className="h-1 w-1 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
