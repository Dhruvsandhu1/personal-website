import { BrainCircuit, Zap, Users, Rocket, Code, Award } from "lucide-react"
import { HoverEffect } from "../ui/card-hover-effect"

const sellingPoints = [
  {
    title: "Deep Technical Expertise",
    description: "Proven track record in developing and deploying high-impact ML solutions across various domains.",
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
  },
  {
    title: "Innovative Problem-Solver",
    description:
      "A knack for creative and innovative approaches to complex challenges, turning problems into opportunities.",
    icon: <Zap className="h-8 w-8 text-primary" />,
  },
  {
    title: "Collaborative Team Player",
    description: "Excellent communication skills and a strong belief in teamwork to build robust and scalable systems.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: "Business-Oriented Mindset",
    description:
      "Focused on delivering solutions that not only are technically sound but also drive tangible business value.",
    icon: <Rocket className="h-8 w-8 text-primary" />,
  },
  {
    title: "Clean & Scalable Code",
    description: "Dedicated to writing clean, efficient, and well-documented code that stands the test of time.",
    icon: <Code className="h-8 w-8 text-primary" />,
  },
  {
    title: "Continuous Learner",
    description: "Passionate about staying at the forefront of AI, constantly learning and applying new techniques.",
    icon: <Award className="h-8 w-8 text-primary" />,
  },
]

export function WhyMeSection() {
  return (
    <section id="why-me" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Me?</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          I bring a unique blend of technical skill, creative problem-solving, and a commitment to excellence to every
          project.
        </p>
        <div className="max-w-5xl mx-auto">
          <HoverEffect items={sellingPoints} />
        </div>
      </div>
    </section>
  )
}
