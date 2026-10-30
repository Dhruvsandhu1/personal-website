import { HomeSection } from "@/components/sections/home-section"
import { AboutMeSection } from "@/components/sections/about-me-section"
import { FocusSection } from "@/components/sections/focus-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function PortfolioPage() {
  return (
    <>
      <HomeSection />
      <AboutMeSection />
      <FocusSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
