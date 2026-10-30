"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const LandscapeScene = dynamic(() => import("./landscape-scene"), { ssr: false })

/** Dot-matrix loss surface with optimisers descending it; renders only where WebGL2 is available. */
export function LossLandscape({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()
  const visible = useInView(ref)
  const [support, setSupport] = useState<{ webgl: boolean; dense: boolean } | null>(null)

  useEffect(() => {
    let webgl = false
    try {
      webgl = !!document.createElement("canvas").getContext("webgl2")
    } catch {}
    setSupport({ webgl, dense: window.matchMedia("(min-width: 768px)").matches })
  }, [])

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none", className)}>
      {support?.webgl && <LandscapeScene reduce={reduce} running={visible} dense={support.dense} />}
    </div>
  )
}
