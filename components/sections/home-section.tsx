"use client"

import { Fragment, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { LiveAvatar } from "@/components/live-avatar"
import { LossLandscape } from "@/components/loss-landscape"
import { CountUp } from "@/components/ui/count-up"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const stats = [
  { value: "3+", label: "Years in ML" },
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

const serif = "font-serif font-normal italic tracking-[-0.02em]"
const headline: { text: string; className?: string }[] = [
  { text: "Building" },
  { text: "GenAI" },
  { text: "systems" },
  { text: "from" },
  { text: "research", className: `${serif} text-primary pr-[0.06em]` },
  { text: "to" },
  { text: "production.", className: serif },
]

const socials = [
  { label: "GitHub", href: "https://github.com/Dhruvsandhu1", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvsandhu/", icon: Linkedin },
  { label: "Email", href: "mailto:dhruvsandhu21@gmail.com", icon: Mail },
]

const ease = [0.16, 1, 0.3, 1] as const

/** Pointer position relative to an element's centre, normalised to [-1, 1] and smoothed. */
function usePointerTilt(reduce: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 70, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 70, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      x.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)))
      y.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)))
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [reduce, x, y])

  return { ref, sx, sy }
}

/** Parallax offset in px for a layer at a given depth. */
function useLayer(sx: MotionValue<number>, sy: MotionValue<number>, depth: number) {
  return {
    x: useTransform(sx, [-1, 1], [-depth, depth]),
    y: useTransform(sy, [-1, 1], [-depth * 0.7, depth * 0.7]),
  }
}

function PortraitCard({ reduce }: { reduce: boolean }) {
  const { ref, sx, sy } = usePointerTilt(reduce)
  const rotateY = useTransform(sx, [-1, 1], [-7, 7])
  const rotateX = useTransform(sy, [-1, 1], [6, -6])
  const back = useLayer(sx, sy, -8)
  const mid = useLayer(sx, sy, 6)
  const front = useLayer(sx, sy, 12)
  const float = useLayer(sx, sy, 22)
  const sheen = useTransform(sx, [-1, 1], ["0% 0%", "100% 0%"])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease, delay: 0.2 }}
      className="relative mx-auto w-full max-w-sm lg:max-w-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] [-webkit-mask-image:-webkit-radial-gradient(white,black)] border border-white/[0.08] bg-gradient-to-b from-zinc-800/80 via-zinc-900/90 to-zinc-950 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
      >
        <motion.div aria-hidden style={back} className="absolute -inset-6">
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_50%_100%,hsl(var(--primary)/0.28),transparent_65%)]" />
          <div className="absolute inset-0 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
        </motion.div>

        <motion.div style={mid} className="absolute inset-0">
          <LiveAvatar
            alt="Animated avatar of Dhruv Sandhu"
            className="absolute bottom-0 left-1/2 h-[94%] -translate-x-1/2"
          />
        </motion.div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />

        <motion.div
          style={front}
          className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 backdrop-blur-md"
        >
          <div>
            <p className="text-sm font-medium">Dhruv Sandhu</p>
            <p className="text-xs text-muted-foreground">NLP · Computer Vision · GNNs</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">ML Eng.</span>
        </motion.div>

        {/* Light sheen that slides with the tilt */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.07)_48%,transparent_60%)] bg-[length:250%_100%] mix-blend-screen"
          style={{ backgroundPosition: sheen }}
        />
      </motion.div>

      <motion.div
        style={float}
        className="absolute -left-6 top-10 hidden rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 shadow-2xl backdrop-blur-md sm:block"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Research</p>
        <p className="mt-1 text-sm font-medium">IIT Delhi · fMRI + GNNs</p>
      </motion.div>
    </motion.div>
  )
}

export function HomeSection() {
  const reduce = usePrefersReducedMotion()
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, ease, delay },
  })

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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Machine Learning Engineer · IIT Bhubaneswar
              </span>
            </motion.div>

            <h1 className="mt-8 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.75rem] font-semibold tracking-[-0.045em] text-balance">
              {headline.map((word, i) => (
                <Fragment key={word.text}>
                  <motion.span {...rise(0.08 + i * 0.06)} className={`inline-block ${word.className ?? ""}`}>
                    {word.text}
                  </motion.span>
                  {i < headline.length - 1 && " "}
                </Fragment>
              ))}
            </h1>

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

            <motion.dl
              {...rise(0.32)}
              className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/[0.07] pt-8 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-[-0.04em] tabular-nums">
                    <CountUp value={s.value} />
                  </dd>
                  <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </motion.dl>
          </div>

          <PortraitCard reduce={reduce} />
        </div>
      </div>

      {/* Loss landscape: rises behind the content above */}
      <div className="relative h-[240px] sm:h-[320px] md:h-[400px]">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,hsl(var(--primary)/0.08),transparent_70%)]"
        />
        <LossLandscape className="absolute inset-x-0 -top-48 bottom-0 -z-10 md:-top-72 [mask-image:linear-gradient(to_bottom,transparent,#000_32%,#000_78%,transparent)]" />
        <div className="container relative h-full max-w-6xl">
          <p className="absolute bottom-6 right-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary/80" />
            Fig. 00 — Gradient descent with momentum
          </p>
        </div>
      </div>

      {/* Stack marquee */}
      <div className="border-y border-white/[0.06] py-6 mask-fade-x">
        <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
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
