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
    <section id="why-me" className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black font-mono text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.3)] mb-2 uppercase tracking-tight">
            Why.Me?
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
        </div>
        <p className="font-mono text-lg text-cyan-300/70 text-center mb-16 max-w-2xl mx-auto">
          {'>'} I bring a unique blend of technical skill, creative problem-solving, and a commitment to excellence to every project.
        </p>
        <div className="max-w-6xl mx-auto">
          <HoverEffect items={sellingPoints} />
        </div>
      </div>
    </section>
  )
}
