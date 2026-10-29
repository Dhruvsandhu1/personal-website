import { GraduationCap, Award } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/section-heading"

const work = [
  {
    role: "ML Engineer",
    company: "Jazzee Technologies",
    period: "Jun 2025 — Jul 2025",
    points: [
      "Engineered an AI-powered interview platform with real-time video and audio via LiveKit.",
      "Designed ML/NLP pipelines for automated evaluation, transcript analysis and dynamic reports.",
      "Built secure, scalable AWS infrastructure with Docker; integrated Supabase for data.",
      "Delivered admin dashboards and candidate portals, and implemented cheating detection to ensure integrity.",
    ],
    tags: ["NLP", "LiveKit", "AWS", "Docker", "Supabase"],
  },
  {
    role: "Summer Research Intern",
    company: "IIT Delhi",
    period: "May 2024 — Jul 2024",
    points: [
      "Analysed multi-site fMRI data (healthy controls vs. MDD) to study inter-region correlations.",
      "Applied the AAC atlas in a federated setting with Graph Neural Networks.",
      "Worked with GCN/GAT, mixture-of-experts (MoE) and adversarial domain adaptation.",
    ],
    tags: ["GNN", "Federated Learning", "MoE"],
  },
  {
    role: "NLP Research Intern",
    company: "Coforge Ltd, Noida",
    period: "May 2023 — Jul 2023",
    points: [
      "Built an end-to-end pipeline to extract feedback from PDFs and run sentiment analysis for retention and upsell insights.",
      "Experimented with embeddings, ML models and optimisation using BERT and RoBERTa.",
      "Explored named-entity recognition with BiLSTM-CRF.",
    ],
    tags: ["Transformers", "BERT", "NER"],
  },
]

const education = [
  {
    title: "B.Tech + M.Tech (Dual Degree), Mechanical Engineering",
    org: "Indian Institute of Technology, Bhubaneswar",
    period: "2021 — Present",
    note: "GPA 7.59 · Foundation in algorithms and applied ML",
  },
  {
    title: "CBSE",
    org: "Amity International School, Ghaziabad",
    period: "Until 2021",
    note: "Active in technical clubs and competitions",
  },
]

const leadership = [
  {
    title: "Data Science Head",
    org: "Data Science Club, IIT Bhubaneswar",
    period: "2023 — 2024",
    note: "Led a community of 100+ ML enthusiasts through workshops and mentoring.",
  },
  {
    title: "Mechanical ML Lead",
    org: "General Championship, IIT Bhubaneswar",
    period: "2024",
    note: "Guided a 15+ member team to a bronze finish for the branch.",
  },
]

function MiniList({
  title,
  icon: Icon,
  items,
}: {
  title: string
  icon: typeof Award
  items: { title: string; org: string; period: string; note: string }[]
}) {
  return (
    <Reveal className="surface p-7 md:p-8">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{title}</h3>
      </div>
      <ul className="mt-6 divide-y divide-white/[0.07]">
        {items.map((item) => (
          <li key={item.title} className="py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-medium tracking-tight">{item.title}</p>
              <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
            </div>
            <p className="mt-1 text-sm text-foreground/70">{item.org}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative border-t border-white/[0.06] py-28 md:py-40">
      <div className="container max-w-6xl">
        <SectionHeading
          index="04"
          label="Experience"
          title={
            <>
              Where I&apos;ve{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">shipped</span> and
              researched.
            </>
          }
        />

        <ol className="border-t border-white/[0.07]">
          {work.map((job, i) => (
            <Reveal key={job.company} as="li" delay={i * 0.05}>
              <div className="group grid gap-6 border-b border-white/[0.07] py-10 md:grid-cols-[14rem_1fr] md:gap-12 md:py-12">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
                  <p className="mt-2 text-sm text-foreground/80">{job.company}</p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-primary">
                    {job.role}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                        <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <MiniList title="Education" icon={GraduationCap} items={education} />
          <MiniList title="Leadership" icon={Award} items={leadership} />
        </div>
      </div>
    </section>
  )
}
