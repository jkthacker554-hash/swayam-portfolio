"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { LoadingScreen } from "@/components/loader/LoadingScreen";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { HUDOverlay } from "@/components/effects/HUDOverlay";
import { CommandPalette } from "@/components/effects/CommandPalette";
import { AIAssistant } from "@/components/effects/AIAssistant";
import { TerminalEasterEgg } from "@/components/effects/TerminalEasterEgg";
import { DeveloperDashboard } from "@/components/effects/DeveloperDashboard";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { WhyHireSection } from "@/components/sections/WhyHireSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function Home() {
  const [loaded, setLoaded] = useState(false);
  useLenis(loaded);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <CustomCursor />
          <HUDOverlay />
          <CommandPalette />
          <AIAssistant />
          <TerminalEasterEgg />
          <Navigation />

          <main className="relative overflow-hidden bg-[var(--bg)]">
            <HeroSection />
            <DeveloperDashboard />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <TimelineSection />
            <WhyHireSection />
            <TestimonialsSection />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
