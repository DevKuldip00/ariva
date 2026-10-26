import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update live studio time in Ahmedabad (IST, GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setLocalTime(timeStr);
      } catch {
        setLocalTime('10:45 AM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Selected Works', id: 'projects', index: '01' },
    { label: '3D Spatial Lab', id: '3d-studio', index: '02' },
    { label: 'Disciplines', id: 'services', index: '03' },
    { label: 'Ethos', id: 'about', index: '04' },
    { label: 'Process', id: 'process', index: '05' },
    { label: 'Contact', id: 'contact', index: '06' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? 'rgba(15, 19, 17, 0.95)'
            : 'linear-gradient(to bottom, rgba(15, 19, 17, 0.85) 0%, rgba(15, 19, 17, 0.2) 75%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(4px)',
          borderBottom: isScrolled
            ? '1px solid rgba(197, 168, 128, 0.25)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: isScrolled ? '0.85rem' : '1.5rem',
          paddingBottom: isScrolled ? '0.85rem' : '1.5rem',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Mark & Architectural Coordinates */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              textDecoration: 'none',
            }}
          >
            {/* Real Logo Mark */}
            <div
              style={{
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                background: '#151A17',
                border: '1px solid rgba(197, 168, 128, 0.35)',
              }}
            >
              <img
                src="/images/logo.png"
                alt="Ariva Living Logo"
                style={{
                  height: '32px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  letterSpacing: '0.08em',
                  color: '#F9F7F2',
                  lineHeight: 1,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                Ariva Living
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#C5A880',
                  marginTop: '0.3rem',
                }}
              >
                Satellite, Ahmedabad · 23° 01' N
              </span>
            </div>
          </a>

          {/* Center: Editorial Architectural Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.25rem',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.35rem',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isActive ? '#C5A880' : 'rgba(247, 245, 240, 0.75)',
                    position: 'relative',
                    padding: '0.35rem 0',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C5A880')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? '#C5A880' : 'rgba(247, 245, 240, 0.75)')
                  }
                >
                  <span style={{ fontSize: '0.6rem', color: '#9E835F', opacity: 0.8 }}>{item.index}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '0',
                        right: '0',
                        height: '1px',
                        background: '#C5A880',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Studio Local Time & Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            {localTime && (
              <div style={{ display: 'none', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A9185' }} className="studio-time-wrapper">
                <span style={{ color: '#C5A880', fontWeight: 600 }}>{localTime} IST</span>
                <span>Studio Open</span>
              </div>
            )}

            <button
              onClick={onOpenContact}
              className="arch-btn"
              style={{
                padding: '0.75rem 1.6rem',
                fontSize: '0.75rem',
              }}
            >
              <span>Discuss Your Space</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                background: '#151A17',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                color: '#F9F7F2',
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} color="#C5A880" /> : <Menu size={20} color="#C5A880" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0F1311',
            zIndex: 899,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: ' clamp(2rem, 6vw, 4rem)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingTop: '3rem' }}>
              <img
                src="/images/logo.png"
                alt="Ariva Living"
                style={{ height: '38px', objectFit: 'contain' }}
              />
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#F9F7F2', display: 'block', textTransform: 'uppercase' }}>
                  Ariva Living
                </span>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C5A880' }}>
                  Satellite · Ahmedabad
                </span>
              </div>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'rgba(197, 168, 128, 0.2)', marginBottom: '2.5rem' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                    fontFamily: 'var(--font-serif)',
                    fontSize: ' clamp(1.8rem, 5vw, 2.5rem)',
                    color: activeSection === item.id ? '#C5A880' : '#F9F7F2',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#9E835F', letterSpacing: '0.15em' }}>
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(197, 168, 128, 0.2)' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="arch-btn"
              style={{ width: '100%' }}
            >
              <span>Initiate Spatial Consultation</span>
              <ArrowUpRight size={15} />
            </button>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A9185', textAlign: 'center', marginTop: '1rem' }}>
              Satellite, Ahmedabad, Gujarat · 380015
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
          .studio-time-wrapper {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
