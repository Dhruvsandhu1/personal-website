import { Briefcase, GraduationCap, Layers, Award } from "lucide-react"
import { TracingBeam } from "../ui/tracing-beam"

const experiences = [
  // Education
  {
    type: "education",
    title: "B.Tech + M.Tech (Dual Degree) • Mechanical Engineering",
    company: "Indian Institute of Technology, Bhubaneswar",
    period: "Nov 2021 - Present • GPA: 7.59",
    description:
      "Pursuing a dual degree with a solid foundation in algorithms and applied ML; active involvement in ML communities and projects.",
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },
  {
    type: "education",
    title: "CBSE",
    company: "Amity International School, Ghaziabad",
    period: "April 2005 - March 2021",
    description: "Built strong fundamentals; actively participated in technical clubs and competitions.",
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },

  // Experience
  {
    type: "work",
    title: "ML Engineer",
    company: "Jazzee Technologies",
    period: "June 2025 - July 2025",
    description:
      "Engineered an AI-powered interview platform with real-time video/audio via LiveKit. Designed ML/NLP pipelines for automated evaluation, transcript analysis, and dynamic reports. Built secure, scalable AWS infra with Docker; integrated Supabase for data. Delivered admin dashboards and candidate portals for scheduling, resume uploads, and performance tracking. Implemented cheating detection to ensure integrity.",
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    type: "work",
    title: "Summer Research Intern",
    company: "IIT Delhi",
    period: "May 2024 - July 2024",
    description:
      "Analyzed multi-site fMRI (HC vs. MDD) to study inter-region correlations. Applied AAC atlas in a federated setting with GNNs. Worked with GCN/GAT, mixture-of-experts (MoE), and adversarial domain adaptation.",
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    type: "work",
    title: "NLP Research Intern",
    company: "Coforge Ltd, Noida",
    period: "May 2023 - July 2023",
    description:
      "Built an end-to-end pipeline to extract feedback from PDFs and perform sentiment analysis for retention and upsell insights. Experimented with embeddings, ML models, and optimization. Used transformers (BERT, RoBERTa) and explored NER with BiLSTM-CRF.",
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },

  // Positions of Responsibility
  {
    type: "position",
    title: "Data Science Head",
    company: "Data Science Club, IIT Bhubaneswar",
    period: "July 2023 - May 2024",
    description: "Led a community of 100+ ML enthusiasts; conducted workshops and mentoring across core ML topics.",
    icon: <Award className="h-5 w-5 text-primary" />,
  },
  {
    type: "position",
    title: "Mechanical ML Lead",
    company: "GC, IIT Bhubaneswar",
    period: "March 2024 - April 2024",
    description: "Guided a 15+ member team; led the branch to a bronze win in general championship",
    icon: <Award className="h-5 w-5 text-primary" />,
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-12">My Journey</h2>

        {/* Compact contact links row */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <a href="mailto:dhruvsandhu21@gmail.com" className="text-primary hover:underline">
            Email
          </a>
          <a href="https://www.kaggle.com/dhruvsandhu1" target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Kaggle
          </a>
          <a
            href="https://www.codechef.com/users/dhruv_sandhu22"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            CodeChef
          </a>
          <a
            href="https://codeforces.com/profile/Decoder_RAG"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Codeforces
          </a>
          
        </div>

        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-10">
                <div className="flex items-center mb-1">
                  {exp.icon}
                  <p className="text-primary font-semibold text-sm ml-2">
                    {exp.company} &bull; {exp.period}
                  </p>
                </div>
                <p className="text-xl font-semibold text-foreground mb-1">{exp.title}</p>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  )
}
