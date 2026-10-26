import React, { useState } from 'react';
import { servicesData } from '../data/content';
import { ArrowUpRight, Check, Compass } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string>(servicesData[0].id);

  const activeService = servicesData.find((s) => s.id === hoveredServiceId) || servicesData[0];

  return (
    <section
      id="services"
      className="section"
      style={{
        background: '#0F1311',
        color: '#F9F7F2',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="arch-label">04 / Practice Disciplines · Capabilities</div>
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
                Studio Disciplines
              </h2>
              <p style={{ color: '#A3A99E', maxWidth: '580px', marginTop: '0.75rem', fontSize: '1rem', fontWeight: 300 }}>
                Integrated design disciplines executed to exacting millimeter tolerances for private residences across Satellite and Ahmedabad.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C5A880', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              <Compass size={14} />
              <span>Turnkey Coordination Available</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Interactive Architectural Index & Live High-Impact Visual Preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Architectural Discipline Index (7 Cols) */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
            }}
            className="discipline-index-col"
          >
            {servicesData.map((service, index) => {
              const isActive = service.id === hoveredServiceId;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onClick={() => setHoveredServiceId(service.id)}
                  style={{
                    padding: '2rem 0',
                    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  className="discipline-row"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: isActive ? '#C5A880' : '#777C65' }}>
                      0{index + 1} / Discipline
                    </span>
                    <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isActive ? '#E4D4C0' : '#8A9185' }}>
                      {service.suitableFor}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                        color: isActive ? '#C5A880' : '#F9F7F2',
                        textTransform: 'uppercase',
                        lineHeight: 1.15,
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {service.title}
                    </h3>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? '#C5A880' : '#5E6554',
                        transform: isActive ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                      }}
                    >
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Expanded Scope when Active */}
                  {isActive && (
                    <div
                      style={{
                        marginTop: '1.25rem',
                        paddingTop: '1rem',
                        animation: 'fadeIn 0.3s ease',
                      }}
                    >
                      <p style={{ color: '#D6CFBF', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem', maxWidth: '580px' }}>
                        {service.description}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
                        {service.deliverables.slice(0, 3).map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', fontSize: '0.8rem', color: '#A3A99E' }}>
                            <span style={{ color: '#C5A880' }}>—</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectService(service.title);
                        }}
                        className="arch-btn-outline"
                        style={{ padding: '0.65rem 1.4rem', fontSize: '0.72rem' }}
                      >
                        <span>Consult Regarding This Discipline</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Architectural Visual Preview (5 Cols) */}
          <div
            style={{
              gridColumn: 'span 5',
              position: 'sticky',
              top: '7rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
            className="discipline-preview-col"
          >
            <div
              style={{
                position: 'relative',
                height: 'clamp(360px, 50vh, 520px)',
                width: '100%',
                overflow: 'hidden',
                background: '#151A17',
                border: '1px solid rgba(197, 168, 128, 0.25)',
              }}
            >
              <img
                src={activeService.image}
                alt={activeService.title}
                key={activeService.id}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9) contrast(1.05)',
                  animation: 'fadeIn 0.5s ease',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 19, 17, 0.9) 0%, transparent 40%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                }}
              >
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C5A880' }}>
                  Discipline Preview
                </span>
                <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#F9F7F2', textTransform: 'uppercase' }}>
                  {activeService.title}
                </p>
              </div>
            </div>

            <div
              style={{
                padding: '1.25rem',
                background: 'rgba(21, 26, 23, 0.6)',
                border: '1px solid rgba(197, 168, 128, 0.15)',
                fontSize: '0.82rem',
                color: '#8A9185',
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: '#D6CFBF', display: 'block', marginBottom: '0.2rem' }}>Execution Standard:</strong>
              Every project is backed by comprehensive 3D visualization, millimeter-precise shop drawings, and direct artisan oversight in Ahmedabad.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .discipline-index-col, .discipline-preview-col {
            grid-column: 1 / -1 !important;
          }
          .discipline-preview-col {
            position: relative !important;
            top: 0 !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
};
