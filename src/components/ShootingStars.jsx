import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ShootingStars() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createStar = () => {
      const star = document.createElement('div');
      const startX = Math.random() * 100;
      const startY = Math.random() * 60;
      const angle = -20 + Math.random() * 40;
      const length = 80 + Math.random() * 160;
      const duration = 0.6 + Math.random() * 1.4;
      const size = 1 + Math.random() * 2;

      star.className = 'absolute pointer-events-none';
      star.style.cssText = `
        left: ${startX}%;
        top: ${startY}%;
        width: ${length}px;
        height: ${size}px;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 40%, rgba(196,69,240,0.9) 70%, rgba(255,255,255,0.9) 100%);
        border-radius: 2px;
        transform: rotate(${angle}deg);
        filter: blur(0.5px);
        box-shadow: 0 0 6px rgba(196,69,240,0.6), 0 0 12px rgba(255,255,255,0.3);
      `;

      container.appendChild(star);

      gsap.fromTo(
        star,
        {
          opacity: 0,
          x: -length * 0.8,
          y: 0,
        },
        {
          opacity: 1,
          x: length * 0.6,
          y: 30 + Math.random() * 40,
          duration: duration,
          ease: 'power1.in',
          onComplete: () => {
            gsap.to(star, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => star.remove(),
            });
          },
        }
      );
    };

    const scheduleNext = () => {
      const delay = 2000 + Math.random() * 6000;
      return setTimeout(() => {
        createStar();
        timerRef.current = scheduleNext();
      }, delay);
    };

    const timerRef = { current: scheduleNext() };

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0" />;
}
