"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

const SRC = "https://res.cloudinary.com/di1pcuklp/image/upload/v1756662024/dhruv_snap-removebg_dfmwzv.png"

// Geometry measured on the 375×665 source image, as percentages.
// The head layer is everything above the neck; the body layer starts a few
// pixels higher so the overlap (all beard) hides the seam while the head turns.
const HEAD_CLIP = "inset(0 0 66.9% 0)" // rows < 220
const BODY_CLIP = "inset(31.9% 0 0 0)" // rows >= 212
const PIVOT = "54.9% 33.1%" // base of the neck
const LENSES = [
  { left: "42.7%", top: "19.7%", width: "8.8%", height: "2.9%" },
  { left: "56.8%", top: "20%", width: "8.5%", height: "3%" },
]

const greetings = ["Hey, I'm Dhruv", "I build ML systems", "Let's work together"]

function Glint({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-y-[-40%] w-[45%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/80 to-transparent"
      initial={{ left: "-60%" }}
      animate={{ left: "130%" }}
      transition={{ duration: 0.9, ease: "easeInOut", delay, repeat: Infinity, repeatDelay: 4.5 }}
    />
  )
}

function SpeechBubble() {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const text = greetings[index]

  useEffect(() => {
    if (typed.length < text.length) {
      const t = setTimeout(() => setTyped(text.slice(0, typed.length + 1)), 45)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setTyped("")
      setIndex((i) => (i + 1) % greetings.length)
    }, 2800)
    return () => clearTimeout(t)
  }, [typed, text])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.35, duration: 0.7, delay: 1 }}
      style={{ transformOrigin: "0% 100%" }}
      className="absolute left-[64%] top-[3%] z-20 whitespace-nowrap rounded-2xl rounded-bl-md border border-white/10 bg-zinc-950/80 px-3.5 py-2 text-[13px] font-medium shadow-xl backdrop-blur-md"
    >
      <span>{typed}</span>
      <span className="ml-px inline-block h-[1em] w-px translate-y-[2px] animate-pulse bg-primary" />
      <AnimatePresence>
        {index === 0 && typed === text && (
          <motion.span
            key="wave"
            className="ml-1.5 inline-block origin-[70%_70%]"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: [0, 18, -8, 18, -4, 12, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            👋
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function LiveAvatar({ className, alt }: { className?: string; alt: string }) {
  const reduce = useReducedMotion()
  const look = useMotionValue(0)
  const headRotate = useSpring(look, { stiffness: 60, damping: 14, mass: 0.8 })

  // Turn the head slightly toward the pointer
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5
      const dy = e.clientY / window.innerHeight - 0.5
      look.set(Math.max(-4, Math.min(4, dx * 7 + dy * dx * 2)))
    }
    const onLeave = () => look.set(0)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [reduce, look])

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={SRC} alt={alt} className={cn("aspect-[375/665] object-contain", className)} />
  }

  return (
    <div className={cn("relative aspect-[375/665]", className)} role="img" aria-label={alt}>
      <SpeechBubble />

      {/* Breathing */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "50% 100%" }}
        animate={{ scaleY: [1, 1.008, 1], scaleX: [1, 1.004, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SRC} alt="" draggable={false} className="absolute inset-0 h-full w-full select-none" style={{ clipPath: BODY_CLIP }} />

        {/* Idle sway + pointer look, both around the neck */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: PIVOT }}
          animate={{ rotate: [0, 1.6, 0, -1.2, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="absolute inset-0" style={{ transformOrigin: PIVOT, rotate: headRotate, clipPath: HEAD_CLIP }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SRC} alt="" draggable={false} className="absolute inset-0 h-full w-full select-none" />
            {LENSES.map((lens, i) => (
              <span key={i} className="absolute overflow-hidden rounded-[2px] mix-blend-screen" style={lens}>
                <Glint delay={2 + i * 0.07} />
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
