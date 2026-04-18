import Image from "next/image"
import { Reveal } from "@/components/ui/reveal"

export function AboutMeSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <Reveal>
            <div className="relative group aspect-square max-w-md mx-auto md:mx-0">
              <div className="relative rounded-2xl p-3 bg-transparent border-slate-800 border-[5px] overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 group-hover:opacity-80 transition duration-700"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(13,148,136,0.32) 0%, rgba(13,148,136,0.22) 36%, rgba(13,148,136,0.12) 64%, rgba(13,148,136,0.00) 86%)",
                    filter: "blur(40px)",
                  }}
                />
                <Image
                  src="https://res.cloudinary.com/di1pcuklp/image/upload/v1756757198/Dhruv_farewell-Photoroom_2_zdntud.png"
                  alt="Dhruv Sandhu"
                  width={500}
                  height={500}
                  className="relative z-10 block w-full h-auto rounded-xl object-contain"
                />
              </div>
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <p className="text-lg text-foreground leading-relaxed">
                Hi, I&apos;m Dhruv Sandhu, a Machine Learning Engineer with a deep passion for leveraging data to solve
                complex problems and create impactful AI-driven applications.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg text-foreground leading-relaxed">
                I thrive on challenges that require innovative thinking and a blend of theoretical knowledge with
                practical implementation. My expertise lies in areas like NLP, Computer Vision, GNN, and I&apos;m always
                eager to explore new frontiers in AI.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-lg text-foreground leading-relaxed">
                Beyond coding, I enjoy playing badminton, which helps me maintain a fresh perspective. I believe in
                continuous learning and collaboration to build solutions that not only work efficiently but also
                contribute positively.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
