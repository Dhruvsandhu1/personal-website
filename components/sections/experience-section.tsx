"use client"

import { Briefcase, GraduationCap, Layers, Award } from "lucide-react"
import { TracingBeam } from "../ui/tracing-beam"
import { motion } from "framer-motion"

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
    <section id="experience" className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black font-mono text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] mb-2 uppercase tracking-tight">
            Journey.log
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
          ></motion.div>
        </motion.div>

        {/* Compact contact links row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest"
        >
          <a href="mailto:dhruvsandhu21@gmail.com" className="text-cyan-400 hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-all relative group">
            Email
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="https://www.kaggle.com/dhruvsandhu1" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-all relative group">
            Kaggle
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="https://www.codechef.com/users/dhruv_sandhu22"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-all relative group"
          >
            CodeChef
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="https://codeforces.com/profile/Decoder_RAG"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-all relative group"
          >
            Codeforces
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>
          
        </motion.div>

        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="mb-12 relative group/item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                
                {/* Cyberpunk connecting line dot */}
                <div className="absolute -left-10 top-2 w-3 h-3 bg-slate-900 border-2 border-cyan-500 rounded-full group-hover/item:border-purple-500 group-hover/item:scale-150 group-hover/item:shadow-[0_0_15px_rgba(192,132,252,0.8)] z-20 transition-all duration-500"></div>

                <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-cyan-500/80 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-4 text-cyan-400">
                    <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/50 group-hover/item:text-purple-400 group-hover/item:bg-cyan-500/10 group-hover/item:border-cyan-500/30 transition-all duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] shrink-0 self-start sm:self-auto mb-3 sm:mb-0">
                      {exp.icon}
                    </span>
                    <div className="font-mono font-bold text-xs md:text-sm sm:ml-5 tracking-wider uppercase flex flex-col gap-1">
                      <span className="text-white/95 text-sm">{exp.company}</span> 
                      <span className="text-cyan-400/90 text-xs drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]">{exp.period}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white/95 mb-4 group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-cyan-300 group-hover/item:to-purple-400 transition-all duration-500 tracking-tight">{exp.title}</h3>
                  <p className="text-sm md:text-base leading-loose text-slate-400 group-hover/item:text-slate-300 transition-colors">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  )
}
