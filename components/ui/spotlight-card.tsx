"use client"

import { useRef, type ReactNode, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

/**
 * Surface with a soft glow and border highlight that follow the pointer.
 * `tilt` (degrees) adds a subtle 3D lean toward the pointer.
 */
export function SpotlightCard({
  children,
  className,
  tilt = 0,
}: {
  children: ReactNode
  className?: string
  tilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--x", `${x}px`)
    el.style.setProperty("--y", `${y}px`)
    if (tilt) {
      const rx = (0.5 - y / rect.height) * tilt * 2
      const ry = (x / rect.width - 0.5) * tilt * 2
      el.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
    }
  }

  const onPointerLeave = () => {
    if (tilt && ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "surface group/spot",
        tilt && "transition-transform duration-300 ease-out will-change-transform motion-reduce:!transform-none",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), hsl(var(--primary) / 0.07), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), hsl(var(--primary) / 0.55), transparent 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  )
}
