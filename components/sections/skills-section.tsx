"use client"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/ui/reveal"
import { Tag, Search, GitBranch, Rocket } from "lucide-react"

const DevIcons = {
  Python: () => <i className="devicon-python-plain colored text-3xl"></i>,
  Javascript: () => <i className="devicon-javascript-plain colored text-3xl"></i>,
  Typescript: () => <i className="devicon-typescript-plain colored text-3xl"></i>,
  Java: () => <i className="devicon-java-plain colored text-3xl"></i>,
  Cplusplus: () => <i className="devicon-cplusplus-plain colored text-3xl"></i>,
  Mongodb: () => <i className="devicon-mongodb-plain colored text-3xl"></i>,
  Sql: () => <i className="devicon-mysql-plain colored text-3xl"></i>,
  Firebase: () => <i className="devicon-firebase-plain colored text-3xl"></i>,
  Supabase: () => <span className="text-3xl font-bold">SB</span>,
  Docker: () => <i className="devicon-docker-plain colored text-3xl"></i>,
  Aws: () => <i className="devicon-amazonwebservices-original colored text-3xl"></i>,
  Git: () => <i className="devicon-git-plain colored text-3xl"></i>,
  Vscode: () => <i className="devicon-vscode-plain colored text-3xl"></i>,
  Figma: () => <i className="devicon-figma-plain colored text-3xl"></i>,
  Pytorch: () => <i className="devicon-pytorch-original colored text-3xl"></i>,
  Tensorflow: () => <i className="devicon-tensorflow-original colored text-3xl"></i>,
  Scikitlearn: () => <span className="text-3xl font-bold">SKL</span>,
  Langchain: () => <span className="text-3xl font-bold">LC</span>,
  Postman: () => <span className="text-3xl font-bold">PM</span>,
  Github: () => <i className="devicon-github-original colored text-3xl"></i>,
  Mlflow: () => <i className="devicon-mlflow-plain colored text-3xl"></i>,
  Dvc: () => <i className="devicon-dvc-plain colored text-3xl"></i>,
  Postgresql: () => <i className="devicon-postgresql-plain colored text-3xl"></i>,
  Airflow: () => <i className="devicon-apacheairflow-plain colored text-3xl"></i>,
  AwsSagemaker: () => <i className="devicon-amazonwebservices-original colored text-3xl"></i>,
  Dagshub: () => <GitBranch className="h-8 w-8 text-primary" />,
  Astronomer: () => <Rocket className="h-8 w-8 text-primary" />,
  Cicd: () => <GitBranch className="h-8 w-8 text-primary" />,
  Langgraph: () => <GitBranch className="h-8 w-8 text-primary" />,
} as const

type SkillCategory = "All" | "Languages" | "Frontend" | "Backend" | "Database" | "DevOps" | "Tools" | "AI & ML"

interface Skill {
  name: string
  iconKey?: keyof typeof DevIcons
  categories: SkillCategory[]
}

const skillsData: Skill[] = [
  { name: "Python", iconKey: "Python", categories: ["Languages", "Backend", "AI & ML"] },
  { name: "Java", iconKey: "Java", categories: ["Languages", "Backend"] },
  { name: "C++", iconKey: "Cplusplus", categories: ["Languages"] },
  { name: "MongoDB", iconKey: "Mongodb", categories: ["Database"] },
  { name: "SQL", iconKey: "Sql", categories: ["Database"] },
  { name: "Firebase", iconKey: "Firebase", categories: ["Database", "Backend", "Tools"] },
  { name: "Supabase", iconKey: "Supabase", categories: ["Database", "Backend", "Tools"] },
  { name: "Docker", iconKey: "Docker", categories: ["DevOps", "Tools"] },
  { name: "AWS", iconKey: "Aws", categories: ["DevOps"] },
  { name: "Git", iconKey: "Git", categories: ["Tools", "DevOps"] },
  { name: "VS Code", iconKey: "Vscode", categories: ["Tools"] },
  { name: "PyTorch", iconKey: "Pytorch", categories: ["AI & ML"] },
  { name: "TensorFlow", iconKey: "Tensorflow", categories: ["AI & ML"] },
  { name: "Scikit-learn", iconKey: "Scikitlearn", categories: ["AI & ML", "Tools"] },
  { name: "Langchain", iconKey: "Langchain", categories: ["AI & ML", "Tools"] },
  { name: "Langgraph", iconKey: "Langgraph", categories: ["Tools"] },
  { name: "Postman", iconKey: "Postman", categories: ["Tools"] },
  { name: "GitHub", iconKey: "Github", categories: ["Tools", "DevOps"] },
  { name: "MLflow", iconKey: "Mlflow", categories: ["AI & ML", "Tools"] },
  { name: "DVC", iconKey: "Dvc", categories: ["AI & ML", "Tools", "DevOps"] },
  { name: "DagsHub", iconKey: "Dagshub", categories: ["Tools", "DevOps"] },
  { name: "Apache Airflow", iconKey: "Airflow", categories: ["Backend", "DevOps", "Tools"] },
  { name: "Astronomer", iconKey: "Astronomer", categories: ["DevOps", "Tools"] },
  { name: "CI/CD Pipeline", iconKey: "Cicd", categories: ["DevOps", "Tools"] },
  { name: "PostgreSQL", iconKey: "Postgresql", categories: ["Database", "Backend"] },
  { name: "AWS SageMaker", iconKey: "AwsSagemaker", categories: ["AI & ML", "Tools", "DevOps"] },
]

const categories: SkillCategory[] = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "AI & ML",
]

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory = selectedCategory === "All" || skill.categories.includes(selectedCategory)
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const categoryCounts = useMemo(() => {
    const counts: Record<SkillCategory, number> = {
      All: skillsData.length,
      Languages: 0,
      Frontend: 0,
      Backend: 0,
      Database: 0,
      DevOps: 0,
      Tools: 0,
      "AI & ML": 0,
    }
    skillsData.forEach((skill) => {
      skill.categories.forEach((cat) => {
        if (counts[cat] !== undefined) counts[cat]++
      })
    })
    return counts
  }, [])

  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">My Tech Stack</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-lg md:text-xl text-muted-foreground text-center mb-12">
            Technologies and tools I work with
          </p>
        </Reveal>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />

        <Reveal delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ease-in-out transform hover:scale-105
                ${selectedCategory === category ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {category}{" "}
                <span className="ml-2 bg-muted-foreground/30 text-xs rounded-full px-2 py-0.5">
                  {categoryCounts[category]}
                </span>
              </Button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mb-12 max-w-xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-card border-border focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </Reveal>

        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredSkills.map((skill, idx) => {
              const IconComponent = skill.iconKey ? DevIcons[skill.iconKey] : null
              return (
                <Reveal key={skill.name} delay={idx * 0.03}>
                  <Card className="bg-card hover:border-primary transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-3 flex flex-col items-center justify-center gap-2 h-28">
                      {IconComponent ? <IconComponent /> : <Tag className="h-8 w-8 text-primary" />}
                      <span className="text-xs font-medium text-foreground text-center">{skill.name}</span>
                    </div>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No technologies found matching your criteria.</p>
        )}
      </div>
    </section>
  )
}
