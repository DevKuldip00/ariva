import React from 'react';
import { brandConfig } from '../data/content';
import { ArrowUp, MapPin, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#0D100E',
        color: '#F9F7F2',
        borderTop: '1px solid rgba(197, 168, 128, 0.2)',
        paddingTop: 'clamp(4rem, 6vw, 6rem)',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  background: 'rgba(26, 33, 29, 0.95)',
                  border: '1px solid rgba(197, 168, 128, 0.35)',
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Ariva Living Official Mark"
                  style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    letterSpacing: '0.08em',
                    color: '#F9F7F2',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  Ariva Living
                </span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A880' }}>
                  Satellite · Ahmedabad
                </span>
              </div>
            </div>

            <p style={{ color: '#A3A99E', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '340px' }}>
              Bespoke interior design studio and living solutions. Crafting residences shaped around light, materiality, and client individuality across Gujarat.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D6CFBF', fontSize: '0.82rem' }}>
              <MapPin size={14} color="#C5A880" />
              <span>Satellite, Ahmedabad, Gujarat 380015, India</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Home View', id: 'hero' },
                { label: 'About Studio', id: 'about' },
                { label: 'Featured Projects', id: 'projects' },
                { label: 'Interactive 3D Studio', id: '3d-studio' },
                { label: 'Services & Disciplines', id: 'services' },
                { label: 'Our Process', id: 'process' },
                { label: 'Consultation & Contact', id: 'contact' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                  }}
                  style={{
                    color: '#D6CFBF',
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C5A880')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#D6CFBF')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Interior Disciplines */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Disciplines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', color: '#A3A99E', fontSize: '0.88rem' }}>
              <span>Residential Interior Architecture</span>
              <span>Bespoke Modular Kitchens</span>
              <span>Master Bedroom Suites & Wardrobes</span>
              <span>Living & Lounge Spatial Planning</span>
              <span>Material Curation & Sourcing</span>
              <span>Turnkey Execution in Ahmedabad</span>
            </div>
          </div>

          {/* Ahmedabad Studio Info */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Ahmedabad Studio
            </h4>
            <p style={{ color: '#A3A99E', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              In-person design presentations and material sample reviews in Satellite, Ahmedabad by appointment.
            </p>
            <div
              style={{
                padding: '0.85rem',
                background: 'rgba(26, 33, 29, 0.6)',
                border: '1px solid rgba(197, 168, 128, 0.2)',
                borderRadius: '2px',
                fontSize: '0.78rem',
                color: '#C5A880',
              }}
            >
              Studio contact details and social channels can be configured in <code>src/data/content.ts</code>.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#8A9185',
          }}
        >
          <div>
            © {currentYear} Ariva Living. All rights reserved. · Satellite, Ahmedabad, Gujarat, India.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#D6CFBF',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'rgba(26, 33, 29, 0.7)',
              border: '1px solid rgba(197, 168, 128, 0.25)',
              padding: '0.45rem 0.85rem',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C5A880';
              e.currentTarget.style.borderColor = '#C5A880';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#D6CFBF';
              e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.25)';
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
