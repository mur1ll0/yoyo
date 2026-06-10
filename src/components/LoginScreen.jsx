import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useAudio } from '../context/AudioContext';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import ShootingStars from './ShootingStars';
import Padlock from './Padlock';

const SECRET_PASSWORD = import.meta.env.VITE_LOGIN_PASSWORD || '12345678';

export default function LoginScreen({ onEnter }) {
  const [phase, setPhase] = useState('idle');
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);
  const lightRef = useRef(null);
  const flashRef = useRef(null);
  const shackleRef = useRef(null);
  const padlockBodyRef = useRef(null);
  const heartContainerRef = useRef(null);
  const { play } = useAudio();

  // ── Padlock unlock ──
  const handleUnlock = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('unlocking');
    play('/assets/audio/unlock.mp3');
  }, [phase, play]);

  // ── Unlocking Animation Timeline ──
  useGsapTimeline(() => {
    if (phase === 'unlocking') {
      const tl = gsap.timeline({ onComplete: () => setPhase('opening') });

      tl.to(padlockBodyRef.current, {
        boxShadow: '0 6px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 50px rgba(255,255,200,1), 0 0 100px rgba(196,69,240,0.8)',
        duration: 0.35,
      })
        .to(padlockBodyRef.current, {
          boxShadow: '0 6px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 24px rgba(196,69,240,0.35)',
          duration: 0.2,
        })
        .to(padlockBodyRef.current, {
          boxShadow: '0 6px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 50px rgba(255,255,200,1), 0 0 100px rgba(196,69,240,0.8)',
          duration: 0.35,
        })
        .to(shackleRef.current, { y: -65, opacity: 0, duration: 0.6, ease: 'back.in(1.7)' }, '+=0.1')
        .to(padlockBodyRef.current, { y: 400, opacity: 0, scale: 0.4, duration: 0.75, ease: 'power3.in' }, '-=0.3');
    }
  }, [phase]);

  // ── Door Open + Light transition to solid white ──
  useGsapTimeline(() => {
    if (phase === 'opening') {
      const tl = gsap.timeline({ onComplete: () => onEnter() });

      // 1. Doors swing open in 3D (rotateY + dissolve)
      tl.to(doorLeftRef.current, {
        rotateY: -110,
        opacity: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      }, 0)
      .to(doorRightRef.current, {
        rotateY: 110,
        opacity: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      }, 0)
      // 2. Light behind doors expands and gets brighter
      .fromTo(lightRef.current,
        { opacity: 0, scale: 0.1 },
        { opacity: 1, scale: 15, duration: 2.2, ease: 'power2.inOut' }, 0.1
      )
      // 3. Fullscreen white overlay fades in, completely whiting out the screen
      .fromTo(flashRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.in' }, '-=1.1'
      );
    }
  }, [phase, onEnter]);

  const isDisabled = phase !== 'idle';

  const heartPath =
    'M 200,360 ' +
    'C 200,360 -5,230 -5,115 ' +
    'C -5,35 50,5 100,45 ' +
    'C 125,20 200,12 200,12 ' +
    'C 200,12 275,20 300,45 ' +
    'C 350,5 405,35 405,115 ' +
    'C 405,230 200,360 200,360 Z';

  return (
    <div className="screen-container flex items-center justify-center bg-gradient-to-b from-cosmos-950 via-midnight-dark to-cosmos-900">
      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: Math.random() > 0.85 ? '#c245f0' : Math.random() > 0.7 ? '#4da6ff' : '#fff',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <ShootingStars />

      {/* ─── Rectangular door assembly ─── */}
      <div
        ref={heartContainerRef}
        className="relative z-10 flex items-center justify-center animate-fade-in"
        style={{
          width: 'min(90vw, 520px)',
          height: 'min(90vw * 1.25, 650px)',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 1. Static base SVG (Frame + dark void background) */}
        <svg
          viewBox="0 0 400 500"
          className="w-full h-full absolute inset-0 pointer-events-none z-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffe4b0" />
              <stop offset="30%" stopColor="#e8c060" />
              <stop offset="55%" stopColor="#ffe4b0" />
              <stop offset="75%" stopColor="#b59030" />
              <stop offset="100%" stopColor="#8c6818" />
            </linearGradient>
            <filter id="stoneGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          {/* Outer frame glow */}
          <rect x="15" y="15" width="370" height="470" rx="28" ry="28" fill="none" stroke="#c245f0" strokeWidth="24" opacity="0.15" filter="url(#stoneGlow)" />

          {/* Outer frame outline */}
          <rect x="15" y="15" width="370" height="470" rx="28" ry="28" fill="none" stroke="#251a35" strokeWidth="14" opacity="0.95" />

          {/* Golden inner bezel of the frame */}
          <rect x="21" y="21" width="358" height="458" rx="22" ry="22" fill="none" stroke="url(#gold)" strokeWidth="2.5" />

          {/* Dark void inside door */}
          <rect x="23" y="23" width="354" height="454" rx="20" ry="20" fill="#060015" />
        </svg>

        {/* 2. Light (behind door, expands on open) */}
        <div
          ref={lightRef}
          className="absolute pointer-events-none z-5"
          style={{
            top: '50%', left: '50%',
            width: '60px', height: '60px',
            marginLeft: '-30px', marginTop: '-30px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 0%, #fffdf0 30%, #e2d5ff 60%, #c245f0 85%, rgba(194,69,240,0) 100%)',
            boxShadow: '0 0 100px #ffffff, 0 0 200px rgba(196,69,240,0.8), 0 0 400px rgba(255,45,149,0.6)',
            transform: 'translateZ(-10px)',
            opacity: 0,
          }}
        />

        {/* 3. Left Door Half (3D rotating) */}
        <div
          ref={doorLeftRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            transformOrigin: '0% 50%',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <svg viewBox="0 0 400 500" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="cosmicWood" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e112d" />
                <stop offset="25%" stopColor="#541b44" />
                <stop offset="50%" stopColor="#3b1231" />
                <stop offset="75%" stopColor="#541b44" />
                <stop offset="100%" stopColor="#1c071a" />
              </linearGradient>
              <linearGradient id="goldDoorL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffe4b0" />
                <stop offset="30%" stopColor="#e8c060" />
                <stop offset="55%" stopColor="#ffe4b0" />
                <stop offset="75%" stopColor="#b59030" />
                <stop offset="100%" stopColor="#8c6818" />
              </linearGradient>
              <clipPath id="leftClip">
                <rect x="-50" y="-50" width="250" height="600" />
              </clipPath>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g clipPath="url(#leftClip)">
              {/* Wooden door body */}
              <rect x="23" y="23" width="354" height="454" rx="20" ry="20" fill="url(#cosmicWood)" stroke="#1a0010" strokeWidth="2" />
              
              {/* Inset neon glowing frame path */}
              <rect x="35" y="35" width="330" height="430" rx="14" ry="14" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.65" filter="url(#neonGlow)" />

              {/* Vertical plank divider lines */}
              <line x1="70" y1="23" x2="70" y2="477" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
              <line x1="110" y1="23" x2="110" y2="477" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
              <line x1="150" y1="23" x2="150" y2="477" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />

              {/* Ornate horizontal golden metal bands (hinge straps) */}
              <rect x="23" y="116" width="177" height="8" rx="2" ry="2" fill="url(#goldDoorL)" />
              <circle cx="60" cy="120" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="110" cy="120" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="160" cy="120" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />

              <rect x="23" y="376" width="177" height="8" rx="2" ry="2" fill="url(#goldDoorL)" />
              <circle cx="60" cy="380" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="110" cy="380" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="160" cy="380" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              
              {/* Golden vertical trim at the center seam with rivets */}
              <rect x="196" y="23" width="4" height="454" fill="url(#goldDoorL)" />
              <circle cx="198" cy="50" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="198" cy="100" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="198" cy="180" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="198" cy="320" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="198" cy="400" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="198" cy="450" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />

              {/* Golden heart handle background (shifted to vertical center y=250) */}
              <path d={heartPath} fill="url(#goldDoorL)" stroke="#8c6818" strokeWidth="1.5"
                transform="translate(0, 55) scale(0.18)" style={{ transformOrigin: '200px 195px' }} />
              
              {/* Golden pull ring (left half-circle) */}
              <path d="M 200,230 A 20 20 0 0 0 180,250 A 20 20 0 0 0 200,270" fill="none" stroke="url(#goldDoorL)" strokeWidth="4.5" />
            </g>
          </svg>
        </div>

        {/* 4. Right Door Half (3D rotating) */}
        <div
          ref={doorRightRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            transformOrigin: '100% 50%',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <svg viewBox="0 0 400 500" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="cosmicWood" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e112d" />
                <stop offset="25%" stopColor="#541b44" />
                <stop offset="50%" stopColor="#3b1231" />
                <stop offset="75%" stopColor="#541b44" />
                <stop offset="100%" stopColor="#1c071a" />
              </linearGradient>
              <linearGradient id="goldDoorR" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffe4b0" />
                <stop offset="30%" stopColor="#e8c060" />
                <stop offset="55%" stopColor="#ffe4b0" />
                <stop offset="75%" stopColor="#b59030" />
                <stop offset="100%" stopColor="#8c6818" />
              </linearGradient>
              <clipPath id="rightClip">
                <rect x="200" y="-50" width="250" height="600" />
              </clipPath>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g clipPath="url(#rightClip)">
              {/* Wooden door body */}
              <rect x="23" y="23" width="354" height="454" rx="20" ry="20" fill="url(#cosmicWood)" stroke="#1a0010" strokeWidth="2" />
              
              {/* Inset neon glowing frame path */}
              <rect x="35" y="35" width="330" height="430" rx="14" ry="14" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.65" filter="url(#neonGlow)" />

              {/* Vertical plank divider lines */}
              <line x1="250" y1="23" x2="250" y2="477" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
              <line x1="290" y1="23" x2="290" y2="477" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
              <line x1="330" y1="23" x2="330" y2="477" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />

              {/* Ornate horizontal golden metal bands (hinge straps) */}
              <rect x="200" y="116" width="177" height="8" rx="2" ry="2" fill="url(#goldDoorR)" />
              <circle cx="240" cy="120" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="290" cy="120" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="340" cy="120" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />

              <rect x="200" y="376" width="177" height="8" rx="2" ry="2" fill="url(#goldDoorR)" />
              <circle cx="240" cy="380" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="290" cy="380" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              <circle cx="340" cy="380" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="0.5" />
              
              {/* Golden vertical trim at the center seam with rivets */}
              <rect x="200" y="23" width="4" height="454" fill="url(#goldDoorR)" />
              <circle cx="202" cy="50" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="202" cy="100" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="202" cy="180" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="202" cy="320" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="202" cy="400" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />
              <circle cx="202" cy="450" r="3.5" fill="#ffe4b0" stroke="#8c6818" strokeWidth="1" />

              {/* Golden heart handle background (shifted to vertical center y=250) */}
              <path d={heartPath} fill="url(#goldDoorR)" stroke="#8c6818" strokeWidth="1.5"
                transform="translate(0, 55) scale(0.18)" style={{ transformOrigin: '200px 195px' }} />
              
              {/* Golden pull ring (right half-circle) */}
              <path d="M 200,230 A 20 20 0 0 1 220,250 A 20 20 0 0 1 200,270" fill="none" stroke="url(#goldDoorR)" strokeWidth="4.5" />
            </g>
          </svg>
        </div>

        {/* 5. Padlock Overlay */}
        {(phase === 'idle' || phase === 'unlocking') && (
          <div
            className="absolute z-20 flex items-center justify-center pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div style={{ pointerEvents: 'auto' }}>
              <Padlock
                password={SECRET_PASSWORD}
                onUnlock={handleUnlock}
                disabled={isDisabled}
                shackleRef={shackleRef}
                bodyRef={padlockBodyRef}
              />
            </div>
          </div>
        )}
      </div>

      {/* ─── White flash overlay ─── */}
      <div ref={flashRef} className="fixed inset-0 z-50 pointer-events-none" style={{ background: '#ffffff', opacity: 0 }} />
    </div>
  );
}


