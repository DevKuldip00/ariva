import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';

interface MaterialItem {
  id: string;
  name: string;
  provenance: string;
  description: string;
  application: string;
  finish: string;
  colorSwatch: string;
}

const MATERIALS: MaterialItem[] = [
  {
    id: 'travertine',
    name: 'Roman Travertine Stone',
    provenance: 'Honed Slab Quarry',
    description: 'Honed porous limestone with a velvety matte surface. Cool underfoot and naturally insulated against Gujarat’s intense afternoon heat.',
    application: 'Feature Walls, Floating Steps, Monolithic Vanities',
    finish: 'Semi-filled micro-pores, matte honed, 45° chamfered edges',
    colorSwatch: '#D6CFBF',
  },
  {
    id: 'smoked-oak',
    name: 'Quarter-Sawn Smoked Oak',
    provenance: 'Sustainable Hardwood',
    description: 'Deep architectural timber milled with vertical fluting to absorb room acoustics and cast fine vertical shadow lines across bedroom headboard walls.',
    application: 'Acoustic Wall Slats, Concealed Wardrobes, Floating Nightstands',
    finish: 'Zero-VOC matte natural oil, 12mm shadow gap reveals',
    colorSwatch: '#3D3126',
  },
  {
    id: 'quartzite',
    name: 'Monolithic Calacatta Quartzite',
    provenance: 'Natural Metamorphic Stone',
    description: 'Veined crystalline quartzite offering natural marble beauty with high heat and acid resistance, ideal for everyday Ahmedabad cooking.',
    application: 'Waterfall Kitchen Islands, Countertops, Splashbacks',
    finish: 'Bookmatched slabs with seamless 45° mitered waterfall drops',
    colorSwatch: '#E5E1D8',
  },
  {
    id: 'linen-boucle',
    name: 'Tactile Bouclé & Sheer Linen',
    provenance: 'Natural Woven Textiles',
    description: 'Looped wool-cotton bouclé offering soothing tactile softness, paired with sheer vertical drapery that filters intense sunlight into gentle diffuse radiance.',
    application: 'Upholstered Platform Beds, Curved Lounges, Window Drapery',
    finish: 'High Martindale abrasion rating, untreated organic texture',
    colorSwatch: '#F2EEE6',
  },
  {
    id: 'patinated-bronze',
    name: 'Brushed Champagne Bronze',
    provenance: 'Architectural Metalwork',
    description: 'Hand-brushed architectural hardware and linear chandeliers designed with subtle champagne tones rather than flashy polished gold.',
    application: 'Concealed Cabinet Pulls, Sconces, Glass Partitions',
    finish: 'Directional micro-brushed, protective beeswax patina',
    colorSwatch: '#C5A880',
  },
];

export const MaterialAtelier: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem>(MATERIALS[0]);

  return (
    <section
      id="materials"
      className="section"
      style={{
        background: '#FAF8F5',
        color: '#191C19',
        borderBottom: '1px solid rgba(26, 33, 29, 0.08)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="arch-label arch-label-dark">03 / Material Provenance · The Tactile Palette</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                  lineHeight: 1.1,
                  color: '#1A211D',
                  textTransform: 'uppercase',
                }}
              >
                Honest Materiality
              </h2>
              <p style={{ color: '#646A62', maxWidth: '560px', marginTop: '0.75rem', fontSize: '1rem' }}>
                We avoid synthetic imitations. Our architectural surfaces are rooted in tactile stone, sustainable hardwoods, and living patinas that grow richer over decades.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#777C65' }}>
              <Layers size={14} />
              <span>Physical Samples Available in Studio</span>
            </div>
          </div>
        </div>

        {/* 2-Column Material Inspection Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Material Selector Index (5 Cols) */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
            className="material-list-col"
          >
            {MATERIALS.map((mat, idx) => {
              const isSelected = activeMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                    background: isSelected ? '#1A211D' : '#F1EDE4',
                    color: isSelected ? '#F9F7F2' : '#26302A',
                    border: isSelected ? '1px solid #1A211D' : '1px solid rgba(26, 33, 29, 0.08)',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        background: mat.colorSwatch,
                        border: '1px solid rgba(0,0,0,0.15)',
                        display: 'inline-block',
                      }}
                    />
                    <div>
                      <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isSelected ? '#C5A880' : '#8A9185' }}>
                        0{idx + 1} / {mat.provenance}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', margin: '0.1rem 0 0 0' }}>
                        {mat.name}
                      </h4>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: isSelected ? '#C5A880' : '#8A9185' }}>
                    {isSelected ? '●' : '—'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Material Specification Board (7 Cols) */}
          <div
            style={{
              gridColumn: 'span 7',
              background: '#F1EDE4',
              border: '1px solid rgba(26, 33, 29, 0.12)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px',
            }}
            className="material-detail-col"
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    background: activeMaterial.colorSwatch,
                    border: '1px solid rgba(0,0,0,0.2)',
                  }}
                />
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E835F', fontWeight: 600 }}>
                  Specification Card · {activeMaterial.provenance}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: '#1A211D',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem',
                  textTransform: 'uppercase',
                }}
              >
                {activeMaterial.name}
              </h3>

              <p style={{ color: '#444A41', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                {activeMaterial.description}
              </p>

              {/* Technical Specifications */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(26, 33, 29, 0.1)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777C65', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Architectural Application
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#1A211D', margin: 0, fontWeight: 500 }}>
                    {activeMaterial.application}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777C65', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Surface Treatment & Tolerance
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#1A211D', margin: 0, fontWeight: 500 }}>
                    {activeMaterial.finish}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(26, 33, 29, 0.1)',
                fontSize: '0.8rem',
                color: '#686E64',
                fontStyle: 'italic',
              }}
            >
              “Every stone and timber batch is personally inspected in Gujarat stone yards before cutting.”
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .material-list-col, .material-detail-col {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
};
