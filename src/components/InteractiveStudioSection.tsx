import React from 'react';
import { InteractiveRoom3D } from './InteractiveRoom3D';
import { Sparkles, Eye, Layers } from 'lucide-react';

export const InteractiveStudioSection: React.FC = () => {
  return (
    <section
      id="3d-studio"
      className="section"
      style={{
        background: '#0E1210',
        color: '#F9F7F2',
        borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '820px' }}>
          <div className="eyebrow">Interactive Spatial Experience · Three.js</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              lineHeight: 1.1,
              color: '#F9F7F2',
            }}
          >
            Explore the Architecture in Real-Time
          </h2>
          <p style={{ color: '#A3A99E', fontSize: '1.02rem', lineHeight: 1.7 }}>
            Experience our approach to volume, light, and materiality interactively. Drag to orbit 360°, toggle natural travertine stone or smoked oak wall finishes, adjust atmospheric lighting, and inspect bespoke joinery hotspots.
          </p>
        </div>

        {/* 3D Canvas Experience Wrapper */}
        <div
          style={{
            border: '1px solid rgba(197, 168, 128, 0.3)',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          }}
        >
          <InteractiveRoom3D />
        </div>

        {/* Supporting Architectural Callouts */}
        <div
          style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(26, 33, 29, 0.5)',
              border: '1px solid rgba(197, 168, 128, 0.15)',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Layers size={22} color="#C5A880" />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 600, color: '#F9F7F2', margin: 0 }}>
                Dynamic Surface Finishes
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#A3A99E', margin: '0.2rem 0 0 0' }}>
                Test Roman travertine stone against rich smoked oak vertical slats in real time.
              </p>
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(26, 33, 29, 0.5)',
              border: '1px solid rgba(197, 168, 128, 0.15)',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Eye size={22} color="#C5A880" />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 600, color: '#F9F7F2', margin: 0 }}>
                Sunlight & Cove Lighting
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#A3A99E', margin: '0.2rem 0 0 0' }}>
                Simulate morning daylight, golden hour warmth, and evening architectural cove ambiance.
              </p>
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(26, 33, 29, 0.5)',
              border: '1px solid rgba(197, 168, 128, 0.15)',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Sparkles size={22} color="#C5A880" />
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 600, color: '#F9F7F2', margin: 0 }}>
                Hotspot Specifications
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#A3A99E', margin: '0.2rem 0 0 0' }}>
                Select illuminated hotspots to reveal exact joinery tolerances and material provenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
