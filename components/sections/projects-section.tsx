import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // Import Badge
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

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
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Projects</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <Card className="flex flex-col overflow-hidden bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1.5 group">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-semibold text-foreground">{project.title}</CardTitle>
                  <CardDescription className="h-20 overflow-y-auto text-muted-foreground mt-2 text-sm custom-scrollbar">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-6 pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
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
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t border-slate-700/50 p-6">
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
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
