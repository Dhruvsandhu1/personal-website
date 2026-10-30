import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-16rem] -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/[0.1] blur-[120px]"
      />
      <div className="container max-w-6xl">
        <p className="eyebrow">
          <span className="text-primary">404</span>
          Page not found
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl md:text-7xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
          Stuck in a <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">local minimum.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s take a bigger step — back to
          the start.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>
      </div>
    </section>
  )
}
