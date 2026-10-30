"use client"

import { useEffect, useState } from "react"

/**
 * Whether the visitor asked for reduced motion. Unlike framer-motion's useReducedMotion, this is
 * always false on the first render so server HTML and hydration match; it updates after mount.
 */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduce(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return reduce
}
