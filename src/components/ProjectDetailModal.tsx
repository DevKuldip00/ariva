import React, { useState, useEffect } from 'react';
import { Project } from '../data/content';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, ArrowUpRight, Check } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onInquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.gallery[activeImageIndex] || project.heroImage;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        background: 'rgba(12, 16, 14, 0.94)',
        backdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          maxHeight: '92vh',
          background: '#161B18',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          borderRadius: '4px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 30,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(20, 26, 23, 0.85)',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            color: '#F9F7F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          title="Close modal (Esc)"
        >
          <X size={20} color="#C5A880" />
        </button>

        {/* Left Side: Interactive Gallery Showcase */}
        <div
          style={{
            position: 'relative',
            background: '#0F1210',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '440px',
          }}
        >
          {/* Main Selected Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={currentImage}
              alt={`${project.title} - View ${activeImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxHeight: '620px',
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Real Project Badge */}
            {project.isRealProject && (
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.4rem 0.85rem',
                  background: 'rgba(26, 33, 29, 0.92)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #C5A880',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <Sparkles size={12} color="#C5A880" />
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F9F7F2', fontWeight: 600 }}>
                  Ariva Living Completed Suite
                </span>
              </div>
            )}

            {/* Gallery Navigation Arrows */}
            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)
                  }
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(20, 26, 23, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 168, 128, 0.3)',
                    color: '#F9F7F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Previous image"
                >
                  <ChevronLeft size={20} color="#C5A880" />
                </button>

                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % project.gallery.length)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(20, 26, 23, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 168, 128, 0.3)',
                    color: '#F9F7F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Next image"
                >
                  <ChevronRight size={20} color="#C5A880" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {project.gallery.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(17, 22, 19, 0.95)',
                borderTop: '1px solid rgba(197, 168, 128, 0.15)',
                overflowX: 'auto',
              }}
            >
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '68px',
                    height: '48px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    opacity: activeImageIndex === idx ? 1 : 0.5,
                    border: activeImageIndex === idx ? '2px solid #C5A880' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Architectural Specifications & Narrative */}
        <div style={{ padding: 'clamp(1.5rem, 4vw, 2.75rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Category & Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C5A880',
                  fontWeight: 600,
                }}
              >
                {project.category}
              </span>
              <span style={{ color: 'rgba(197,168,128,0.4)' }}>·</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#A3A99E', fontSize: '0.82rem' }}>
                <MapPin size={13} color="#C5A880" />
                <span>{project.location}</span>
              </div>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                color: '#F9F7F2',
                lineHeight: 1.15,
                marginBottom: '0.75rem',
              }}
            >
              {project.title}
            </h3>

            <p style={{ fontStyle: 'italic', color: '#D6CFBF', fontSize: '0.98rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {project.subtitle}
            </p>

            <p style={{ color: '#A3A99E', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.75rem' }}>
              {project.summary}
            </p>

            {/* Scope of Work */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.65rem' }}>
                Architectural Scope
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#D6CFBF', lineHeight: 1.6 }}>
                {project.scope}
              </p>
            </div>

            {/* Material & Texture Palette Tags */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.65rem' }}>
                Material Palette
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {project.palette.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.75rem',
                      background: 'rgba(197, 168, 128, 0.08)',
                      border: '1px solid rgba(197, 168, 128, 0.25)',
                      borderRadius: '2px',
                      color: '#E4D4C0',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C5A880', marginBottom: '0.65rem' }}>
                Craftsmanship Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: '#D6CFBF' }}>
                    <Check size={14} color="#C5A880" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(197, 168, 128, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <p style={{ fontSize: '0.78rem', color: '#A3A99E', margin: 0 }}>Interested in a similar spatial design?</p>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F9F7F2', margin: 0 }}>Consult our Ahmedabad design studio</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="arch-btn"
            >
              <span>Enquire About This Project</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
