"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const setHeight = () => setSvgHeight(Math.ceil(el.offsetHeight || 0))
    setHeight()

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.ceil(entry.contentRect.height)
        if (h !== svgHeight) setSvgHeight(h)
      }
    })
    ro.observe(el)

    // Fallback for environments without ResizeObserver or when fonts/images load later
    window.addEventListener("resize", setHeight)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", setHeight)
    }
  }, [svgHeight])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, Math.max(50, svgHeight)]), {
    stiffness: 500,
    damping: 90,
  })
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, Math.max(50, svgHeight - 200)]), {
    stiffness: 500,
    damping: 90,
  })

  const hasScrolled = useTransform(scrollYProgress, [0, 0.01], [0, 1])
  const innerDotBg = useTransform(hasScrolled, [0, 1], ["hsl(var(--primary-foreground))", "hsl(var(--primary))"])
  const ringOpacity = useTransform(hasScrolled, [0, 1], [1, 0.2])

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          style={{ opacity: ringOpacity }}
          className="ml-[27px] h-4 w-4 rounded-full border border-primary shadow-sm flex items-center justify-center"
        >
          <motion.div
            style={{
              backgroundColor: innerDotBg,
              borderColor: "hsl(var(--primary))",
            }}
            className="h-2 w-2 rounded-full border"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${Math.max(1, svgHeight)}`}
          width="20"
          height={Math.max(1, svgHeight)}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 -2 V ${svgHeight * 0.8} l -18 2 V ${svgHeight}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.2"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 -2 V ${svgHeight * 0.8} l -18 2 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="0.325" stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
