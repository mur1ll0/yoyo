import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';

const DIGITS = 8;

function Dial({ value, onChange, disabled }) {
  const winRef = useRef(null);
  const numberRef = useRef(null);
  const dragState = useRef({ active: false, startY: 0, startValue: 0, accumulated: 0 });

  const spin = useCallback(
    (dir) => {
      if (disabled) return;
      const newVal = ((value + dir + 10) % 10);
      const el = numberRef.current;
      if (el) {
        gsap.killTweensOf(el);
        gsap.fromTo(el,
          { y: dir * 20, opacity: 0.3, rotateX: dir * -50 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.22, ease: 'back.out(1.4)' }
        );
      }
      onChange(newVal);
    },
    [value, onChange, disabled]
  );

  const handlePointerDown = useCallback((e) => {
    if (disabled) return;
    e.preventDefault();
    dragState.current = { active: true, startY: e.clientY, startValue: value, accumulated: 0 };
    winRef.current?.setPointerCapture(e.pointerId);
  }, [disabled, value]);

  const handlePointerMove = useCallback((e) => {
    if (!dragState.current.active || disabled) return;
    e.preventDefault();
    const delta = dragState.current.startY - e.clientY;
    const totalSteps = Math.round(delta / 16);
    if (totalSteps !== dragState.current.accumulated) {
      const dir = totalSteps > dragState.current.accumulated ? 1 : -1;
      dragState.current.accumulated = totalSteps;
      const newVal = (((dragState.current.startValue + totalSteps) % 10) + 10) % 10;
      const el = numberRef.current;
      if (el) {
        gsap.killTweensOf(el);
        gsap.fromTo(el,
          { y: dir * 16, opacity: 0.3, rotateX: dir * -35 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.15, ease: 'power2.out' }
        );
      }
      onChange(newVal);
    }
  }, [disabled, onChange]);

  const handlePointerUp = useCallback((e) => {
    if (!dragState.current.active) return;
    e.preventDefault();
    dragState.current.active = false;
    try { winRef.current?.releasePointerCapture(e.pointerId); } catch {}
  }, []);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Up button — outside pointer capture zone */}
      <button
        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onClick={(e) => { e.preventDefault(); spin(-1); }}
        disabled={disabled}
        className="w-8 h-5 sm:w-9 sm:h-6 md:w-10 md:h-6 flex items-center justify-center text-amber-400/50 hover:text-amber-200 active:text-amber-100 transition-colors disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer touch-manipulation"
        aria-label="Incrementar"
      >
        <svg viewBox="0 0 12 8" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor"><path d="M6 0L12 8H0z" /></svg>
      </button>

      {/* Digit window — pointer events for drag go here only */}
      <div
        ref={winRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={(e) => { e.preventDefault(); spin(e.deltaY > 0 ? 1 : -1); }}
        className="relative flex items-center justify-center rounded overflow-hidden touch-none cursor-grab active:cursor-grabbing"
        style={{
          width: '32px', height: '42px',
          background: '#140c04',
          boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1)',
          border: '1px solid #3d2010',
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.5), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(270deg, rgba(0,0,0,0.5), transparent)' }} />
        <span
          ref={numberRef}
          className="text-base sm:text-lg md:text-xl font-bold tabular-nums leading-none select-none pointer-events-none"
          style={{
            color: '#ffe4b0',
            textShadow: '0 0 8px rgba(255,200,80,0.7), 0 0 3px rgba(255,240,200,0.5)',
            fontFamily: '"Courier New", monospace',
          }}
        >
          {value}
        </span>
      </div>

      {/* Down button — outside pointer capture zone */}
      <button
        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onClick={(e) => { e.preventDefault(); spin(1); }}
        disabled={disabled}
        className="w-8 h-5 sm:w-9 sm:h-6 md:w-10 md:h-6 flex items-center justify-center text-amber-400/50 hover:text-amber-200 active:text-amber-100 transition-colors disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer touch-manipulation"
        aria-label="Decrementar"
      >
        <svg viewBox="0 0 12 8" className="w-3 h-3 sm:w-3.5 sm:h-3.5 rotate-180" fill="currentColor"><path d="M6 0L12 8H0z" /></svg>
      </button>
    </div>
  );
}

export default function Padlock({ password, onUnlock, disabled, shackleRef, bodyRef }) {
  const [digits, setDigits] = useState(() => Array(DIGITS).fill(0));

  const handleChange = (index, value) => {
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (next.join('') === password) onUnlock();
  };

  return (
    <div ref={bodyRef} className="relative flex flex-col items-center select-none">
      {/* Shackle */}
      <div ref={shackleRef} className="relative z-10 -mb-[3px]">
        <svg width="72" height="54" viewBox="0 0 72 54" className="w-[64px] sm:w-[72px] md:w-[80px] h-auto drop-shadow-lg">
          <defs>
            <linearGradient id="shackleG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8d090" />
              <stop offset="25%" stopColor="#f5e8b0" />
              <stop offset="50%" stopColor="#c4a850" />
              <stop offset="75%" stopColor="#a08838" />
              <stop offset="100%" stopColor="#6b5020" />
            </linearGradient>
          </defs>
          <rect x="5" y="4" width="62" height="46" rx="23" ry="23"
            fill="none" stroke="url(#shackleG)" strokeWidth="8" />
          <rect x="9" y="8" width="54" height="38" rx="19" ry="19"
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Body */}
      <div
        className="relative rounded-2xl sm:rounded-[20px] px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5"
        style={{
          background: 'linear-gradient(180deg, #c4a860 0%, #9b7a38 18%, #c4a860 40%, #8b6e30 70%, #6b5020 100%)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 24px rgba(196,69,240,0.35)',
          border: '2px solid #5a4018',
        }}
      >
        <div
          className="relative rounded-xl sm:rounded-2xl px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3"
          style={{
            background: 'linear-gradient(180deg, #3a2818 0%, #241810 50%, #3a2818 100%)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06)',
            border: '1px solid #4a3018',
          }}
        >
          <div className="flex justify-between px-1 mb-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                style={{ background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3), rgba(150,120,60,0.6))', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />
            ))}
          </div>
          <div className="flex gap-[3px] sm:gap-1 justify-center">
            {digits.map((val, i) => (
              <Dial key={i} value={val} onChange={(v) => handleChange(i, v)} disabled={disabled} />
            ))}
          </div>
          <div className="flex justify-between px-1 mt-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                style={{ background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3), rgba(150,120,60,0.6))', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
