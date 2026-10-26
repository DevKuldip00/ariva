import React, { useState, useEffect } from 'react';
import { OpeningCurtain } from './components/OpeningCurtain';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandIntroduction } from './components/BrandIntroduction';
import { FeaturedProjects } from './components/FeaturedProjects';
import { MaterialAtelier } from './components/MaterialAtelier';
import { InteractiveStudioSection } from './components/InteractiveStudioSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { DesignPhilosophy } from './components/DesignPhilosophy';
import { WhatToExpect } from './components/WhatToExpect';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Footer } from './components/Footer';
import { Project } from './data/content';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [inquirySubject, setInquirySubject] = useState<string>('');

  // Track active section for navbar indicator
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'materials', '3d-studio', 'services', 'process', 'philosophy', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (subject?: string) => {
    if (subject) {
      setInquirySubject(subject);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0F1311' }}>
      {/* 1. Opening Architectural Curtain Entrance */}
      <OpeningCurtain onComplete={() => {}} />

      {/* 2. Refined Architectural Masthead */}
      <Navbar
        onOpenContact={() => handleOpenContact()}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Architectural Narrative Flow */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => handleNavigate('projects')}
          onStartConversation={() => handleNavigate('contact')}
        />

        {/* 01 / Studio Manifesto & Ethos */}
        <BrandIntroduction />

        {/* 02 / Selected Works Portfolio (Asymmetric & Filterable) */}
        <FeaturedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 03 / Material Provenance & Tactile Atelier */}
        <MaterialAtelier />

        {/* 04 / Real-Time 3D Spatial Experience (Three.js) */}
        <InteractiveStudioSection />

        {/* 05 / Studio Practice Disciplines */}
        <ServicesSection onSelectService={(serviceTitle) => handleOpenContact(serviceTitle)} />

        {/* 06 / Execution Methodology & Timeline */}
        <ProcessSection onStartProject={() => handleNavigate('contact')} />

        {/* 07 / Core Spatial Tenets & Philosophy */}
        <DesignPhilosophy />

        {/* 08 / What To Expect & Real Suite Case Study */}
        <WhatToExpect />

        {/* 09 / Monumental Closing & Consultation Brief */}
        <ContactSection prefilledSubject={inquirySubject} />
      </main>

      {/* Full-Screen Project Detail Inspector */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(title) => handleOpenContact(`Project Inquiry: ${title}`)}
      />

      {/* Architectural Studio Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
