import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 85%',
            },
          }
        );

        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
            },
          }
        );

        gsap.fromTo(
          [col1Ref.current, col2Ref.current],
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: col1Ref.current,
              start: 'top 88%',
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
      id="about"
      className="section"
      style={{
        background: '#FAF8F5',
        color: '#191C19',
        borderBottom: '1px solid rgba(26, 33, 29, 0.08)',
      }}
    >
      <div className="container">
        {/* Editorial Index Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
          <div className="arch-label arch-label-dark" style={{ margin: 0 }}>
            01 / Studio Manifesto · Satellite, Ahmedabad
          </div>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9281' }}>
            Ariva Living / Narrative
          </span>
        </div>

        {/* Master Editorial Quote */}
        <div style={{ maxWidth: '1180px', marginBottom: '4rem' }}>
          <h2
            ref={quoteRef}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 4.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              color: '#1A211D',
              letterSpacing: '-0.02em',
            }}
          >
            We do not dress rooms in surface decoration.{' '}
            <span style={{ fontStyle: 'italic', color: '#9E835F', fontWeight: 300 }}>
              We compose living architecture
            </span>{' '}
            around light, natural stone, and unhurried stillness.
          </h2>
        </div>

        {/* Architectural Divider Hairline */}
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(26, 33, 29, 0.12)',
            marginBottom: '3.5rem',
          }}
        />

        {/* Asymmetric 2-Column Architectural Prose */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
          }}
        >
          {/* Column 1: Spatial Ethos (Cols 1 to 6) */}
          <div
            ref={col1Ref}
            style={{
              gridColumn: 'span 6',
            }}
            className="intro-col"
          >
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#777C65',
                fontWeight: 600,
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              The Human Dimension
            </span>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                lineHeight: 1.55,
                color: '#26302A',
                marginBottom: '1.25rem',
              }}
            >
              Every home in Ahmedabad tells a distinct story. Our role is to listen intently, understand your personal rituals, and translate them into spaces that feel instinctively calm.
            </p>
            <p style={{ color: '#555C53', lineHeight: 1.75, fontSize: '0.98rem' }}>
              From bespoke kitchens tailored to vibrant culinary traditions, to master suites with vertical acoustic fluting that buffers urban noise — our practice unites architectural rigor with tactile craftsmanship.
            </p>
          </div>

          {/* Column 2: Material Provenance & Climate Response (Cols 7 to 12) */}
          <div
            ref={col2Ref}
            style={{
              gridColumn: 'span 6',
            }}
            className="intro-col"
          >
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#777C65',
                fontWeight: 600,
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Climate & Material Truth
            </span>
            <p style={{ color: '#555C53', lineHeight: 1.75, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
              We design specifically for Gujarat’s climate: capturing tranquil morning daylight, shielding western thermal heat, and incorporating materials that remain naturally cool underfoot — honed Roman travertine, natural oak joinery, and breathable Belgian linen drapery.
            </p>

            <div
              style={{
                padding: '1.5rem',
                background: '#F1EDE4',
                borderLeft: '2px solid #C5A880',
              }}
            >
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A211D', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Studio Core Concept
              </span>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic', color: '#1A211D', margin: 0 }}>
                “Spaces that feel like you.”
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .intro-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
};
