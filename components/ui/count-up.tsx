"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "framer-motion"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

/** Counts up to the number in `value` (e.g. "30+") once it scrolls into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = usePrefersReducedMotion()
  const [n, setN] = useState(target)

  useEffect(() => {
    if (!inView || reduce || !match) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target])

  return (
    <span ref={ref} className={className}>
      {match ? n : ""}
      {suffix}
    </span>
  )
}
