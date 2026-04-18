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
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden bg-slate-950">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black font-mono text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.3)] mb-2 uppercase tracking-tight">
              Tech Stack
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-lg md:text-xl font-mono text-cyan-300/70 text-center mb-12">
            {'// SYSTEM_DEPENDENCIES_LOADED'}
          </p>
        </Reveal>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />

        <Reveal delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-xs font-mono font-bold tracking-wider transition-all duration-300 ease-out transform hover:scale-105 border-2
                ${selectedCategory === category 
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-cyan-500/30" 
                  : "bg-transparent text-slate-400 border-slate-700/50 hover:border-purple-500/50 hover:text-purple-300"}`}
              >
                {category}{" "}
                <span className="ml-2 bg-slate-800/80 text-white/70 text-[10px] rounded-sm px-1.5 py-0.5 border border-slate-600/50">
                  {categoryCounts[category]}
                </span>
              </Button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mb-14 max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-md rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <Input
              type="text"
              placeholder="Search dependencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full relative z-10 pl-12 pr-6 py-4 rounded-full bg-slate-900 border border-slate-700/80 text-white font-mono placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 group-hover:border-purple-500/50 transition-all shadow-xl"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-500 z-10 group-focus-within:text-purple-400 transition-colors" />
          </div>
        </Reveal>

        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 relative z-10">
            {filteredSkills.map((skill, idx) => {
              const IconComponent = skill.iconKey ? DevIcons[skill.iconKey] : null
              return (
                <Reveal key={skill.name} delay={idx * 0.03}>
                  <Card className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 ease-out overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] h-28 flex flex-col items-center justify-center p-3 cursor-pointer rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      {IconComponent ? <div className="group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"><IconComponent /></div> : <Tag className="h-8 w-8 text-cyan-400 group-hover:text-purple-400 transition-colors" />}
                      <span className="text-xs font-mono font-semibold text-foreground/90 text-center tracking-tight group-hover:text-cyan-300 transition-colors uppercase">{skill.name}</span>
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
