"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const GraphScene = dynamic(() => import("@/components/focus-graph/graph-scene"), { ssr: false })

const CYCLE_MS = 5000

// Order matches the communities in graph-scene.tsx
const areas = [
  {
    title: "LLMs & Generative AI",
    short: "LLMs",
    description:
      "Transformer internals from the ground up — KV caching, RoPE and grouped-query attention — and agentic applications with LangChain and LangGraph.",
    refs: ["Llama 2 from scratch", "LangGraph"],
  },
  {
    title: "Natural Language Processing",
    short: "NLP",
    description:
      "Sentiment analysis, named-entity recognition and automated transcript evaluation built on BERT-family models.",
    refs: ["Coforge", "Jazzee Technologies"],
  },
  {
    title: "Graph Learning",
    short: "Graphs",
    description:
      "GCNs and GATs for brain-connectivity analysis, with federated training and adversarial domain adaptation across sites.",
    refs: ["IIT Delhi", "GraTeD-MLP"],
  },
  {
    title: "Model Compression",
    short: "Compression",
    description:
      "Knowledge distillation and pruning to make models smaller and faster without losing what matters.",
    refs: ["Knowledge Distillation", "GraTeD-MLP"],
  },
  {
    title: "MLOps & Deployment",
    short: "MLOps",
    description:
      "Reproducible experiments and production deployments — Docker, AWS, MLflow, DVC and Airflow.",
    refs: ["Jazzee Technologies", "AWS"],
  },
]

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return !!canvas.getContext("webgl2")
  } catch {
    return false
  }
}

export function FocusSection() {
  const reduce = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const near = useInView(stageRef, { once: true, margin: "400px 0px" })
  const visible = useInView(stageRef, { margin: "0px 0px" })

  useEffect(() => setWebgl(hasWebGL()), [])

  // Walk through the areas on a timer until the visitor takes over
  useEffect(() => {
    if (paused || !visible || reduce) return
    const t = setTimeout(() => setActive((i) => (i + 1) % areas.length), CYCLE_MS)
    return () => clearTimeout(t)
  }, [active, paused, visible, reduce])

  return (
    <section id="focus" className="relative border-t border-white/[0.06] py-28 md:py-40">
      <div className="container max-w-6xl">
        <SectionHeading
          index="02"
          label="Focus areas"
          title={
            <>
              Where my work{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">connects.</span>
            </>
          }
          description="Five areas I keep coming back to, and the threads between them. Each community in the graph is a focus area; the pulses trace messages passing along its edges."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Graph */}
          <Reveal className="lg:order-2 lg:sticky lg:top-28">
            <div
              ref={stageRef}
              className="surface relative aspect-square overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_65%)]"
            >
              <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(circle_at_center,#000_30%,transparent_75%)]" />

              {near && webgl && (
                <GraphScene active={active} reduce={reduce} labelRefs={labelRefs} running={visible} />
              )}

              {webgl &&
                areas.map((a, i) => (
                  <div
                    key={a.short}
                    ref={(el) => {
                      labelRefs.current[i] = el
                    }}
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 backdrop-blur-sm transition-colors duration-500",
                      i === active
                        ? "border-primary/40 bg-zinc-950/70 text-primary"
                        : "border-white/10 bg-zinc-950/40 text-muted-foreground",
                    )}
                  >
                    {a.short}
                  </div>
                ))}

              {webgl === false && (
                <div className="absolute inset-0 grid place-items-center p-10 text-center text-sm text-muted-foreground">
                  Interactive graph requires WebGL.
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                <span>Fig. 01 — Knowledge graph</span>
                <span className="hidden sm:inline">5 communities · message passing</span>
              </div>
            </div>
          </Reveal>

          {/* Areas */}
          <ol
            className="lg:order-1 border-t border-white/[0.07]"
            onMouseLeave={() => setPaused(false)}
          >
            {areas.map((a, i) => {
              const isActive = i === active
              return (
                <Reveal key={a.title} as="li" delay={i * 0.04}>
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setPaused(true)
                      setActive(i)
                    }}
                    onFocus={() => {
                      setPaused(true)
                      setActive(i)
                    }}
                    onClick={() => {
                      setPaused(true)
                      setActive(i)
                    }}
                    aria-expanded={isActive}
                    className="relative block w-full border-b border-white/[0.07] py-6 text-left outline-none focus-visible:bg-white/[0.02]"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/60",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-xl md:text-2xl font-medium tracking-[-0.02em] transition-colors duration-300",
                          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
                        )}
                      >
                        {a.title}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pl-9 pt-4 text-[15px] leading-relaxed text-muted-foreground">{a.description}</p>
                          <div className="flex flex-wrap gap-2 pl-9 pt-4">
                            {a.refs.map((r) => (
                              <span
                                key={r}
                                className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[11px] text-muted-foreground"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Autoplay progress */}
                    {isActive && !paused && !reduce && (
                      <motion.span
                        key={`progress-${active}`}
                        aria-hidden
                        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: visible ? 1 : 0 }}
                        transition={{ duration: visible ? CYCLE_MS / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </button>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
