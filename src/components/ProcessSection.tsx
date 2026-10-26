import React, { useEffect, useRef } from 'react';
import { processSteps } from '../data/content';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  onStartProject: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && stepsContainerRef.current) {
        const rows = stepsContainerRef.current.querySelectorAll('.process-elevation-row');
        gsap.fromTo(
          rows,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section"
      style={{
        background: '#FAF8F5',
        color: '#191C19',
        borderBottom: '1px solid rgba(26, 33, 29, 0.08)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem', maxWidth: '820px' }}>
          <div className="arch-label arch-label-dark">05 / Execution Architecture · The Methodology</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
              lineHeight: 1.05,
              color: '#1A211D',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            How A Space Unfolds
          </h2>
          <p style={{ color: '#646A62', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 300 }}>
            A structured, reassuring architectural journey designed to eliminate uncertainty, protect your investment, and deliver a space calibrated to your life in Ahmedabad.
          </p>
        </div>

        {/* Linear Numbered Elevation Rows */}
        <div
          ref={stepsContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid rgba(26, 33, 29, 0.15)',
          }}
        >
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 'clamp(1rem, 3vw, 3rem)',
                padding: 'clamp(2rem, 4vw, 3rem) 0',
                borderBottom: '1px solid rgba(26, 33, 29, 0.12)',
                alignItems: 'baseline',
              }}
              className="process-elevation-row"
            >
              {/* Step Index (Cols 1 to 2) */}
              <div style={{ gridColumn: 'span 2' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                    color: '#9E835F',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  {step.step}
                </span>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777C65' }}>
                  Phase 0{idx + 1}
                </span>
              </div>

              {/* Title & Subtitle (Cols 3 to 6) */}
              <div style={{ gridColumn: 'span 4' }} className="process-title-col">
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                    color: '#1A211D',
                    lineHeight: 1.2,
                    marginBottom: '0.35rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.title}
                </h3>
                <span style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#777C65' }}>
                  {step.subtitle}
                </span>
              </div>

              {/* Description & Deliverables (Cols 7 to 12) */}
              <div style={{ gridColumn: 'span 6' }} className="process-desc-col">
                <p style={{ color: '#444A41', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                  {step.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {step.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      style={{
                        padding: '0.3rem 0.65rem',
                        background: '#EBE5D8',
                        border: '1px solid rgba(26, 33, 29, 0.08)',
                        fontSize: '0.75rem',
                        color: '#26302A',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Dialogue Action */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777C65' }}>
              Transparent Progression
            </span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1A211D', margin: '0.25rem 0 0 0' }}>
              Every drawing and material approved before execution.
            </p>
          </div>

          <button onClick={onStartProject} className="arch-btn-dark">
            <span>Schedule Initial Spatial Dialogue</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .process-title-col, .process-desc-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
};
