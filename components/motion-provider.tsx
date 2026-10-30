"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

/** Honour the OS "reduce motion" setting: skip transform animations, keep simple fades. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
