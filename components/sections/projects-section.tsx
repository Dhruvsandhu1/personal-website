import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // Import Badge
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { BeamsBackground } from "@/components/ui/beams-background"

const projects = [
  {
    title: "Llama 2 implementation from scratch",
    description:
      "Implementation of LLama2 from scratch with KV cache,RoPE,Group Query Attention and different sampling stategy like beam search,greedy",
    imageUrl: "https://res.cloudinary.com/di1pcuklp/image/upload/v1756665763/Llama-2-blog-image-1_trtswi.png",
    tags: ["Python", "PyTorch", "LLM", "Implementation"],
    githubUrl: "https://github.com/Dhruvsandhu1/llama-2-implementation",
    liveUrl: null,
  },
  {
    title: "Knowledge Distillation",
    description:
      "Distilled knowledge fom the base teacher model to student and then did instruct fine tuning,student model can be both layer pruned,width pruned teacher model or completely different model",
    imageUrl: "https://res.cloudinary.com/di1pcuklp/image/upload/v1756666930/knowledge_distillation_2_sx4k8u.jpg",
    tags: ["Python", "Pytorch", "SFT" ,"Pruning"],
    githubUrl: "https://github.com/Dhruvsandhu1/Knowledge_distillation",
    liveUrl: null,
  },
  {
    title: "GraTeD MLP",
    description:
      "Implementation of a research paper namely GraTeD MLP distillation which demonstrates how to distil Graph Transformer model to vanilla mlp while leaverging the benefits of the graph transformer with the complex data type ie its Attention Matrix :)",
    imageUrl: "https://res.cloudinary.com/di1pcuklp/image/upload/v1756670090/grated-MLP_cqnpj1.png",
    tags: ["Python", "GNN", "Distillation"],
    githubUrl: "https://github.com/Dhruvsandhu1/GraTeD_MLP",
    liveUrl: null,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full overflow-hidden">
      <BeamsBackground className="py-20 md:py-32 min-h-screen" intensity="medium">
        <div className="container mx-auto px-4 md:px-6 relative z-20 w-full">
          <div className="flex flex-col items-center justify-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black font-mono text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] mb-2 uppercase tracking-tight">
                Project.Deployments
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto"></div>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-slate-800/30 backdrop-blur-xl relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border border-slate-700/50 w-auto rounded-xl shadow-2xl hover:shadow-primary/40 transition-all duration-300 h-[32rem]">
                  <CardItem translateZ="50" className="w-full mt-4 p-6 pt-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-slate-700/50">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500 ease-in-out"
                      />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="60"
                    className="p-6 pt-2 pb-0"
                  >
                    <CardTitle className="text-xl font-semibold text-foreground">{project.title}</CardTitle>
                    <CardDescription className="h-20 overflow-y-auto text-muted-foreground mt-2 text-sm custom-scrollbar">
                      {project.description}
                    </CardDescription>
                  </CardItem>
                  <CardItem translateZ="40" className="w-full px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ="20"
                    className="w-full px-6 pb-6 pt-2 flex justify-end gap-3"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" /> GitHub
                      </Link>
                    </Button>
                    {project.liveUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="bg-primary hover:bg-primary/80 text-primary-foreground transition-colors duration-200"
                      >
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                        </Link>
                      </Button>
                    )}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </Reveal>
          ))}
          </div>
        </div>
      </BeamsBackground>
    </section>
  )
}
