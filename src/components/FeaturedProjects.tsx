import React, { useState, useEffect, useRef } from 'react';
import { Project, projectsData } from '../data/content';
import { ArrowUpRight, Sparkles, MapPin, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'Bedrooms', 'Living Spaces', 'Kitchens', 'Dining Spaces'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  // Staggered reveal whenever filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.editorial-project-row');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' }
    );
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section"
      style={{
        background: '#0F1311',
        color: '#F9F7F2',
        position: 'relative',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="arch-label">02 / Selected Works · Portfolio</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
                  lineHeight: 1.05,
                  color: '#F9F7F2',
                  textTransform: 'uppercase',
                }}
              >
                Living Architecture
              </h2>
              <p style={{ color: '#A3A99E', maxWidth: '580px', marginTop: '0.75rem', fontSize: '1rem', fontWeight: 300 }}>
                A gallery of executed residential interiors across Ahmedabad. Each space conceived around honest materiality, proportion, and client individuality.
              </p>
            </div>

            {/* Architectural Category Filter Bar (No Pill Buttons) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    fontSize: '0.75rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    background: activeFilter === filter ? '#C5A880' : 'transparent',
                    color: activeFilter === filter ? '#111614' : '#D6CFBF',
                    border: activeFilter === filter ? '1px solid #C5A880' : '1px solid rgba(197, 168, 128, 0.25)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Asymmetric Project Rows */}
        <div ref={gridRef} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3.5rem, 7vw, 7rem)' }}>
          {filteredProjects.map((project, index) => {
            const isMonumental = index === 0 && activeFilter === 'All';
            const isReversed = index % 2 === 1;

            if (isMonumental) {
              // Monumental Feature: The Real Satellite Suite
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  className="editorial-project-row monumental-project"
                >
                  {/* Full-Width Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 'clamp(420px, 62vh, 680px)',
                      overflow: 'hidden',
                      background: '#151A17',
                      border: '1px solid rgba(197, 168, 128, 0.25)',
                    }}
                    className="img-reveal-wrapper"
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 45%',
                        filter: 'brightness(0.9) contrast(1.04)',
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 19, 17, 0.95) 0%, rgba(15, 19, 17, 0.3) 40%, transparent 100%)',
                      }}
                    />

                    {/* Real Project Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        left: '1.5rem',
                        padding: '0.45rem 1rem',
                        background: 'rgba(15, 19, 17, 0.88)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid #C5A880',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Sparkles size={12} color="#C5A880" />
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F9F7F2', fontWeight: 600 }}>
                        Real Executed Suite · Satellite, Ahmedabad
                      </span>
                    </div>

                    {/* Hover Inspect CTA */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: '#C5A880',
                        color: '#111614',
                        fontSize: '0.72rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      <span>Inspect Space</span>
                      <ArrowUpRight size={14} />
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'clamp(1.5rem, 4vw, 3rem)',
                        left: 'clamp(1.5rem, 4vw, 3rem)',
                        right: 'clamp(1.5rem, 4vw, 3rem)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A880' }}>
                          01 / Master Suite Architecture
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                            color: '#F9F7F2',
                            margin: '0.4rem 0',
                            textTransform: 'uppercase',
                          }}
                        >
                          {project.title}
                        </h3>
                        <p style={{ color: '#D6CFBF', fontSize: '1rem', fontStyle: 'italic', maxWidth: '620px', margin: 0 }}>
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Material Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.palette.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              padding: '0.3rem 0.65rem',
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              fontSize: '0.72rem',
                              color: '#E4D4C0',
                              letterSpacing: '0.08em',
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Asymmetrical Editorial Row
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(1.5rem, 4vw, 4rem)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  paddingBottom: 'clamp(2rem, 4vw, 4rem)',
                  borderBottom: '1px solid rgba(197, 168, 128, 0.12)',
                }}
                className="editorial-project-row"
              >
                {/* Visual Image Column (7 Cols) */}
                <div
                  style={{
                    gridColumn: isReversed ? '6 / 13' : '1 / 8',
                    order: isReversed ? 2 : 1,
                    position: 'relative',
                    height: 'clamp(320px, 45vh, 480px)',
                    overflow: 'hidden',
                    background: '#151A17',
                    border: '1px solid rgba(197, 168, 128, 0.2)',
                  }}
                  className="img-reveal-wrapper project-img-col"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.9) contrast(1.05)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      width: '38px',
                      height: '38px',
                      background: '#C5A880',
                      color: '#111614',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Editorial Details Column (5 Cols) */}
                <div
                  style={{
                    gridColumn: isReversed ? '1 / 6' : '8 / 13',
                    order: isReversed ? 1 : 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  className="project-text-col"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A880' }}>
                      0{index + 1} / {project.category}
                    </span>
                    <span style={{ color: 'rgba(197,168,128,0.4)' }}>·</span>
                    <span style={{ fontSize: '0.75rem', color: '#8A9185' }}>{project.location}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                      lineHeight: 1.1,
                      color: '#F9F7F2',
                      marginBottom: '0.65rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.title}
                  </h3>

                  <p style={{ fontStyle: 'italic', color: '#D6CFBF', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {project.subtitle}
                  </p>

                  <p style={{ color: '#949A8F', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                    {project.summary}
                  </p>

                  {/* Highlights checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <div key={hIdx} style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', fontSize: '0.82rem', color: '#C5A880' }}>
                        <span>—</span>
                        <span style={{ color: '#D6CFBF' }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#C5A880', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                    <span>Inspect Architectural Scope</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .project-img-col {
            grid-column: 1 / -1 !important;
            order: 1 !important;
          }
          .project-text-col {
            grid-column: 1 / -1 !important;
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
};
