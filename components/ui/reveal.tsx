"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type AsTag = "div" | "section" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "li"

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: AsTag
  y?: number
}

const fadeUp = (y = 16, delay = 0) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
  },
})

export function Reveal({ children, delay = 0, className, as = "div", y = 16 }: RevealProps) {
  const prefersReduced = useReducedMotion()
  // Use index access on motion with a narrowed tag union to avoid JSX namespace
  const Component = (motion as any)[as] as typeof motion.div

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={fadeUp(y, delay)}
    >
      {children}
    </Component>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  delayChildren?: number
  stagger?: number
}

export function Stagger({ children, className, delayChildren = 0.1, stagger = 0.075 }: StaggerProps) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}
