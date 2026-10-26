import React from 'react';
import { studioCommitments } from '../data/content';
import { Sparkles } from 'lucide-react';

export const WhatToExpect: React.FC = () => {
  return (
    <section
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
          <div className="arch-label arch-label-dark">Client Assurance · Transparency</div>
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
            What To Expect
          </h2>
          <p style={{ color: '#646A62', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 300 }}>
            We respect that undertaking an interior architectural project is a significant, personal investment. Here is how we safeguard clarity, craft, and peace of mind from day one.
          </p>
        </div>

        {/* Real Completed Project Case Study Spread */}
        <div
          style={{
            background: '#151A17',
            color: '#F9F7F2',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            alignItems: 'center',
            marginBottom: '4.5rem',
          }}
        >
          {/* Text narrative (Cols 1 to 6) */}
          <div
            style={{
              gridColumn: 'span 6',
              padding: 'clamp(2rem, 5vw, 4rem)',
            }}
            className="case-study-text-col"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={13} color="#C5A880" />
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A880', fontWeight: 600 }}>
                Case Study · Satellite, Ahmedabad
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                color: '#F9F7F2',
                lineHeight: 1.1,
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              The Architecture of Stillness
            </h3>

            <p style={{ color: '#D6CFBF', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              In this completed Satellite residence, our brief was to create an acoustic sanctuary that felt completely secluded from the city. We introduced vertical fluted acoustic timber slats with millimeter shadow reveals, integrated floating bedside tables with warm reading sconces, and built seamless floor-to-ceiling wardrobes featuring illuminated art display niches.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.25)', color: '#E4D4C0' }}>
                Acoustic Timber Fluting
              </span>
              <span style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.25)', color: '#E4D4C0' }}>
                Seamless Concealed Wardrobes
              </span>
              <span style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', background: 'rgba(197, 168, 128, 0.1)', border: '1px solid rgba(197, 168, 128, 0.25)', color: '#E4D4C0' }}>
                Perimeter Cove Illumination
              </span>
            </div>
          </div>

          {/* Real Photography Diptych (Cols 7 to 12) */}
          <div
            style={{
              gridColumn: 'span 6',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              height: '100%',
              minHeight: '440px',
            }}
            className="case-study-img-col"
          >
            <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
              <img
                src="/images/project-suite-wide.png"
                alt="Satellite Suite Headboard View"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', height: '100%', borderLeft: '1px solid rgba(197,168,128,0.2)' }}>
              <img
                src="/images/project-wardrobe-tv.png"
                alt="Satellite Suite Wardrobe and TV Feature"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* 4 Architectural Commitments Linear Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderTop: '1px solid rgba(26, 33, 29, 0.15)',
            paddingTop: '3rem',
          }}
        >
          {studioCommitments.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#9E835F', fontWeight: 600 }}>
                  0{idx + 1}
                </span>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777C65' }}>
                  Commitment
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: '#1A211D',
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                }}
              >
                {item.title}
              </h3>

              <p style={{ color: '#555C53', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .case-study-text-col, .case-study-img-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
};
