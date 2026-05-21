"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { LoadingScreen } from "@/components/loader/LoadingScreen";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { HUDOverlay } from "@/components/effects/HUDOverlay";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { UIShowcase } from "@/components/sections/UIShowcase";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
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
          <Navigation />

          <main className="relative overflow-hidden bg-[var(--bg)]">
            <HeroSection />
            <AboutSection />
            <FeaturedProjects />
            <VideoShowcase />
            <UIShowcase />
            <SkillsSection />
            <TimelineSection />
            <TestimonialsSection />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
