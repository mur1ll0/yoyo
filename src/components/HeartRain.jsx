import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function HeartRain() {
  const containerRef = useRef(null);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const spawnHeart = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 100;
      const size = 10 + Math.random() * 20;
      const duration = 2 + Math.random() * 3;

      setHearts((prev) => [...prev.slice(-30), { id, x, size, duration }]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, duration * 1000);
    };

    const interval = setInterval(spawnHeart, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    hearts.forEach(({ id, duration }) => {
      const el = document.getElementById(`heart-${id}`);
      if (el) {
        gsap.fromTo(
          el,
          { y: -50, opacity: 1, scale: 0 },
          { y: window.innerHeight + 50, opacity: 0, scale: 1, duration, ease: 'power1.in', rotate: Math.random() * 360 }
        );
      }
    });
  }, [hearts]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          id={`heart-${h.id}`}
          className="absolute text-neon-pink"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            top: -50,
          }}
        >
          💜
        </span>
      ))}
    </div>
  );
}
