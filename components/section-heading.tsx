import type { ReactNode } from "react"
import { MaskReveal, Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  index: string
  label: string
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeading({ index, label, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 md:mb-20 max-w-3xl", className)}>
      <Reveal>
        <p className="eyebrow">
          <span className="text-primary">{index}</span>
          {label}
        </p>
      </Reveal>
      <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.05] text-balance">
        <MaskReveal delay={0.05}>{title}</MaskReveal>
      </h2>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
