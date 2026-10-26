import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface OpeningCurtainProps {
  onComplete: () => void;
}

export const OpeningCurtain: React.FC<OpeningCurtainProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    // Check if user has already seen intro this session
    const seen = sessionStorage.getItem('ariva_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || prefersReducedMotion) {
      setHasRun(true);
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('ariva_intro_seen', 'true');
          setHasRun(true);
          onComplete();
        },
      });

      // 1. Initial State
      gsap.set(logoRef.current, { opacity: 0, y: 15, scale: 0.96 });
      gsap.set(textRef.current, { opacity: 0, y: 12 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });

      // 2. Entrance Sequence
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.7,
        ease: 'power3.inOut',
      })
        .to(
          logoRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.35'
        )
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to({}, { duration: 0.35 }) // brief pause to appreciate the brand mark
        // 3. Smooth upward reveal of the website
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (hasRun) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#111614',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '0 2rem', textAlign: 'center' }}>
        <div ref={logoRef} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src="/images/logo.png"
            alt="Ariva Living"
            style={{
              height: '52px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 20px rgba(197, 168, 128, 0.25))',
            }}
          />
        </div>

        <div
          ref={lineRef}
          style={{
            width: '160px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C5A880, transparent)',
          }}
        />

        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C5A880',
              fontWeight: 600,
            }}
          >
            Interior Design Studio
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8A9185',
            }}
          >
            Satellite · Ahmedabad
          </span>
        </div>
      </div>
    </div>
  );
};
