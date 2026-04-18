import { HomeSection } from "@/components/sections/home-section"
import { AboutMeSection } from "@/components/sections/about-me-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { WhyMeSection } from "@/components/sections/why-me-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function PortfolioPage() {
  return (
    <>
      <HomeSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <WhyMeSection />
      <ContactSection />
    </>
  )
}
