import Image from "next/image"
import { BrainCircuit, Zap, Users, Rocket, Code, Sparkles } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/section-heading"

const facts = [
  { label: "Education", value: "B.Tech + M.Tech, IIT Bhubaneswar" },
  { label: "Focus", value: "NLP, Computer Vision, Graph Neural Networks" },
  { label: "Previously", value: "Jazzee Technologies · IIT Delhi · Coforge" },
  { label: "Off the clock", value: "Badminton" },
]

const principles = [
  {
    title: "Deep technical expertise",
    description: "A track record of developing and deploying high-impact ML solutions across domains.",
    icon: BrainCircuit,
  },
  {
    title: "Inventive problem-solving",
    description: "Creative approaches to complex challenges — turning hard problems into opportunities.",
    icon: Zap,
  },
  {
    title: "Collaborative by default",
    description: "Clear communication and a strong belief in teamwork to build robust, scalable systems.",
    icon: Users,
  },
  {
    title: "Business-oriented",
    description: "Solutions that are technically sound and also drive tangible business value.",
    icon: Rocket,
  },
  {
    title: "Clean, scalable code",
    description: "Efficient, well-documented code that is easy to extend and stands the test of time.",
    icon: Code,
  },
  {
    title: "Always learning",
    description: "Staying at the forefront of AI — constantly learning and applying new techniques.",
    icon: Sparkles,
  },
]

export function AboutMeSection() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container max-w-6xl">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Turning data into{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">impactful</span> AI
              products.
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <figure className="surface overflow-hidden p-2">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-zinc-800/50 to-zinc-950">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,hsl(var(--primary)/0.22),transparent_60%)]"
                />
                <Image
                  src="https://res.cloudinary.com/di1pcuklp/image/upload/v1756757198/Dhruv_farewell-Photoroom_2_zdntud.png"
                  alt="Dhruv Sandhu"
                  fill
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-contain object-bottom"
                />
              </div>
              <figcaption className="flex items-center justify-between px-3 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Dhruv Sandhu</span>
                <span>IIT Bhubaneswar</span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
              <Reveal>
                <p>
                  <span className="text-foreground">Hi, I&apos;m Dhruv</span> — a Machine Learning Engineer with a deep
                  passion for using data to solve complex problems and build AI-driven applications that matter.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  I thrive on challenges that blend theory with practical implementation. My work spans{" "}
                  <span className="text-foreground">NLP, Computer Vision and Graph Neural Networks</span>, and I&apos;m
                  always eager to explore new frontiers in AI.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  Beyond code, you&apos;ll find me on the badminton court — it keeps my perspective fresh. I believe in
                  continuous learning and collaboration to build solutions that work efficiently and contribute
                  positively.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <dl className="mt-12 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[8rem_1fr] gap-4 py-4 sm:grid-cols-[10rem_1fr]">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-1">
                      {f.label}
                    </dt>
                    <dd className="text-[15px]">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* What I bring */}
        <div className="mt-28 md:mt-36">
          <Reveal>
            <p className="eyebrow">What I bring</p>
          </Reveal>
          <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/[0.07] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-white/[0.07]">
            {principles.map(({ title, description, icon: Icon }, i) => (
              <Reveal
                key={title}
                delay={i * 0.04}
                className="group relative border-b p-8 transition-colors hover:bg-white/[0.02] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 last:border-b-0"
              >
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                <h3 className="mt-6 text-lg font-medium tracking-tight">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
