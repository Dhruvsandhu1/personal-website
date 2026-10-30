"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

/** Vertical rail beside a list that fills in as the list scrolls past. */
export function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute -left-12 top-0 bottom-0 hidden w-px bg-white/[0.07] xl:block">
        <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-primary via-primary to-primary/0" />
      </div>
      {children}
    </div>
  )
}
