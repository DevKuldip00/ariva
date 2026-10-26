import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreProjects: () => void;
  onStartConversation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onStartConversation }) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleLine3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // Master Entrance Timeline
        const tl = gsap.timeline({ delay: 0.3 });

        // Image Clip-Path & Scale Entrance
        tl.fromTo(
          imageWrapperRef.current,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.4, ease: 'power4.inOut' },
          0
        );

        tl.fromTo(
          imageRef.current,
          { scale: 1.25 },
          { scale: 1.05, duration: 1.8, ease: 'power3.out' },
          0
        );

        // Staggered Line Reveals
        tl.fromTo(
          [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power4.out' },
          0.4
        );

        // Subtitle & Action buttons
        tl.fromTo(
          [descRef.current, actionsRef.current, metaRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          0.9
        );

        // ScrollTrigger Parallax on Hero Image
        gsap.to(imageRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0F1311',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(7rem, 12vh, 9.5rem)',
        paddingBottom: 'clamp(3rem, 6vh, 5rem)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Asymmetrical Editorial Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Towering Architectural Typography (Cols 1 to 7) */}
          <div
            style={{
              gridColumn: '1 / -1',
              zIndex: 10,
              maxWidth: '820px',
            }}
            className="hero-text-col"
          >
            {/* Elevation Index & Coordinates */}
            <div
              ref={metaRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <div className="arch-label" style={{ margin: 0 }}>
                Spatial Architecture · Satellite, Ahmedabad
              </div>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777C65' }}>
                Ref 23.03° N, 72.51° E
              </span>
            </div>

            {/* Monumental Staggered Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 7vw, 6.4rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.025em',
                color: '#F9F7F2',
                marginBottom: '2rem',
                textTransform: 'uppercase',
              }}
            >
              <span className="overflow-mask">
                <span ref={titleLine1Ref} style={{ display: 'block' }}>
                  Spaces Shaped
                </span>
              </span>
              <span className="overflow-mask">
                <span
                  ref={titleLine2Ref}
                  style={{
                    display: 'block',
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)',
                    color: '#E4D4C0',
                    fontWeight: 300,
                    textTransform: 'none',
                    paddingLeft: 'clamp(0.5rem, 2vw, 1.5rem)',
                  }}
                >
                  around the way
                </span>
              </span>
              <span className="overflow-mask">
                <span ref={titleLine3Ref} style={{ display: 'block', color: '#C5A880' }}>
                  You Live.
                </span>
              </span>
            </h1>

            {/* Architectural Sub-text */}
            <p
              ref={descRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                lineHeight: 1.7,
                color: '#D6CFBF',
                maxWidth: '560px',
                marginBottom: '2.5rem',
                fontWeight: 300,
              }}
            >
              An Ahmedabad interior design studio conceiving private residences, master suites, and bespoke culinary spaces. Rooted in natural travertine, fluted timber millwork, and deliberate daylight.
            </p>

            {/* Action Buttons */}
            <div
              ref={actionsRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
              }}
            >
              <button onClick={onExploreProjects} className="arch-btn">
                <span>View Selected Works</span>
                <ArrowDown size={14} />
              </button>

              <button onClick={onStartConversation} className="arch-btn-outline">
                <span>Studio Consultation</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Frame (Full-Bleed Right Asymmetrical Window) */}
      <div
        ref={imageWrapperRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'clamp(320px, 58vw, 980px)',
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
        className="hero-image-frame"
      >
        <img
          ref={imageRef}
          src="/images/hero-penthouse.jpg"
          alt="Ariva Living Double-Height Interior in Ahmedabad"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'brightness(0.78) contrast(1.08)',
          }}
        />

        {/* Directional Shading Gradients for Contrast with Text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to right, #0F1311 0%, rgba(15, 19, 17, 0.85) 30%, rgba(15, 19, 17, 0.3) 65%, transparent 100%),
              linear-gradient(to top, #0F1311 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* Floating Bottom Elevation Bar */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 'auto',
          paddingTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(197, 168, 128, 0.15)',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A9185' }}>
          <span>Ahmedabad Studio</span>
          <span>Satellite · 380015</span>
        </div>

        <a
          href="#about"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C5A880',
            textDecoration: 'none',
          }}
        >
          <span>Scroll to Explore</span>
          <div
            style={{
              width: '1px',
              height: '32px',
              background: 'linear-gradient(to bottom, #C5A880, transparent)',
            }}
          />
        </a>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-text-col {
            grid-column: 1 / 8 !important;
          }
          .hero-image-frame {
            width: 58vw !important;
          }
        }
        @media (max-width: 1023px) {
          .hero-image-frame {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
};
