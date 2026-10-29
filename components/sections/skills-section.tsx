import { BrainCircuit, Code2, Database, Cloud, Wrench, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

type Skill = { name: string; icon?: string }

type SkillGroup = {
  title: string
  description: string
  icon: LucideIcon
  className: string
  skills: Skill[]
}

const groups: SkillGroup[] = [
  {
    title: "AI & Machine Learning",
    description: "Training, fine-tuning and distilling models — from transformers to graph networks and LLM agents.",
    icon: BrainCircuit,
    className: "md:col-span-2",
    skills: [
      { name: "PyTorch", icon: "devicon-pytorch-original" },
      { name: "TensorFlow", icon: "devicon-tensorflow-original" },
      { name: "Scikit-learn", icon: "devicon-scikitlearn-plain" },
      { name: "LangChain" },
      { name: "LangGraph" },
    ],
  },
  {
    title: "Languages",
    description: "Python first, with systems and competitive programming roots.",
    icon: Code2,
    className: "",
    skills: [
      { name: "Python", icon: "devicon-python-plain" },
      { name: "C++", icon: "devicon-cplusplus-plain" },
      { name: "Java", icon: "devicon-java-plain" },
    ],
  },
  {
    title: "Data",
    description: "Relational and document stores for products and pipelines.",
    icon: Database,
    className: "",
    skills: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "SQL", icon: "devicon-mysql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Supabase", icon: "devicon-supabase-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
    ],
  },
  {
    title: "MLOps & Cloud",
    description: "Reproducible experiments, orchestrated pipelines and containerised deployments on AWS.",
    icon: Cloud,
    className: "md:col-span-2",
    skills: [
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "AWS", icon: "devicon-amazonwebservices-original" },
      { name: "AWS SageMaker" },
      { name: "MLflow" },
      { name: "DVC" },
      { name: "DagsHub" },
      { name: "Apache Airflow", icon: "devicon-apacheairflow-plain" },
      { name: "Astronomer" },
      { name: "CI/CD" },
    ],
  },
  {
    title: "Tooling",
    description: "The everyday workflow.",
    icon: Wrench,
    className: "md:col-span-3",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "VS Code", icon: "devicon-vscode-plain" },
      { name: "Postman", icon: "devicon-postman-plain" },
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative border-t border-white/[0.06] py-28 md:py-40">
      <div className="container max-w-6xl">
        <SectionHeading
          index="02"
          label="Skills"
          title={
            <>
              A toolkit for the full{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">ML lifecycle.</span>
            </>
          }
          description="From research prototypes to monitored production services — the languages, frameworks and infrastructure I work with day to day."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {groups.map(({ title, description, icon: Icon, className, skills }, i) => (
            <Reveal key={title} delay={i * 0.05} className={cn("surface group p-7 md:p-8", className)}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_0%_0%,hsl(var(--primary)/0.08),transparent_60%)]"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-lg font-medium tracking-tight">{title}</h3>
                </div>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">{description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <li
                      key={s.name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-[13px] text-foreground/85 transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {s.icon ? (
                        <i aria-hidden className={cn(s.icon, "text-[15px] text-muted-foreground")} />
                      ) : (
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      )}
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
