import React, { useEffect, useRef } from 'react';
import { philosophyPrinciples } from '../data/content';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DesignPhilosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && gridRef.current) {
        const items = gridRef.current.querySelectorAll('.philosophy-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="philosophy"
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
        <div style={{ marginBottom: '4.5rem', maxWidth: '820px' }}>
          <div className="arch-label">06 / Spatial Tenets · Core Philosophy</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              color: '#F9F7F2',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Principles of Living Architecture
          </h2>
          <p style={{ color: '#A3A99E', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 300 }}>
            The immutable design tenets that shape our compositions, material selections, and lighting strategies across every Ahmedabad residence.
          </p>
        </div>

        {/* 6 Tenets Asymmetric Architectural Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {philosophyPrinciples.map((item) => (
            <div
              key={item.number}
              style={{
                borderTop: '1px solid rgba(197, 168, 128, 0.25)',
                paddingTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="philosophy-item"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A880' }}>
                    Tenet / {item.number}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#777C65' }}>Ariva Living</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.85rem',
                    color: '#F9F7F2',
                    lineHeight: 1.15,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#E4D4C0',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                  }}
                >
                  “{item.statement}”
                </p>

                <p style={{ color: '#949A8F', fontSize: '0.92rem', lineHeight: 1.75 }}>
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  height: '1px',
                  width: '32px',
                  background: '#C5A880',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
