import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

type Project = {
  title: string
  category: string
  description: string
  imageUrl: string
  tags: string[]
  githubUrl: string
  liveUrl: string | null
}

const projects: Project[] = [
  {
    title: "Llama 2, from scratch",
    category: "Large Language Models",
    description:
      "A ground-up implementation of the Llama 2 architecture with KV caching, Rotary Positional Embeddings and Grouped-Query Attention — plus multiple decoding strategies including beam search and greedy sampling.",
    imageUrl: "https://res.cloudinary.com/di1pcuklp/image/upload/v1756665763/Llama-2-blog-image-1_trtswi.png",
    tags: ["Python", "PyTorch", "LLM", "Transformers"],
    githubUrl: "https://github.com/Dhruvsandhu1/llama-2-implementation",
    liveUrl: null,
  },
  {
    title: "Knowledge Distillation",
    category: "Model Compression",
    description:
      "Distils a teacher model into a smaller student, followed by instruction fine-tuning. The student can be a layer-pruned or width-pruned teacher, or an entirely different architecture.",
    imageUrl: "https://res.cloudinary.com/di1pcuklp/image/upload/v1756666930/knowledge_distillation_2_sx4k8u.jpg",
    tags: ["PyTorch", "SFT", "Pruning"],
    githubUrl: "https://github.com/Dhruvsandhu1/Knowledge_distillation",
    liveUrl: null,
  },
  {
    title: "GraTeD-MLP",
    category: "Graph Learning · Paper Implementation",
    description:
      "Implements GraTeD-MLP distillation: compressing a Graph Transformer into a vanilla MLP while retaining the benefits of its attention matrix over complex graph data.",
    imageUrl: "https://res.cloudinary.com/di1pcuklp/image/upload/v1756670090/grated-MLP_cqnpj1.png",
    tags: ["PyTorch", "GNN", "Distillation"],
    githubUrl: "https://github.com/Dhruvsandhu1/GraTeD_MLP",
    liveUrl: null,
  },
]

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  return (
    <article
      className={cn(
        "surface group overflow-hidden p-2 transition-colors duration-500 hover:border-white/[0.14]",
        featured && "lg:grid lg:grid-cols-[1.2fr_1fr]",
      )}
    >
      <Link
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative block overflow-hidden rounded-xl bg-zinc-900",
          featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]" : "aspect-[16/10]",
        )}
        aria-label={`${project.title} on GitHub`}
      >
        <Image
          src={project.imageUrl}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 520px, 100vw"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-zinc-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>

      <div className={cn("flex flex-1 flex-col p-5 md:p-6", featured && "lg:p-10")}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{project.category}</p>
        <h3
          className={cn(
            "mt-3 font-semibold tracking-[-0.03em]",
            featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-5 pt-8">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-sm font-medium"
          >
            <Github className="h-4 w-4" />
            View source
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-primary" />
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Live demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="relative border-t border-white/[0.06] py-28 md:py-40">
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="03"
            label="Selected work"
            className="mb-0 md:mb-0"
            title={
              <>
                Models, built from{" "}
                <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">first principles.</span>
              </>
            }
          />
          <Reveal>
            <Link
              href="https://github.com/Dhruvsandhu1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All repositories on GitHub
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid gap-4">
          <Reveal>
            <ProjectCard project={featured} index={0} featured />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.06} className="h-full [&>article]:flex [&>article]:h-full [&>article]:flex-col">
                <ProjectCard project={project} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
