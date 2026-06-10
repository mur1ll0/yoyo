import { useRef } from 'react';
import gsap from 'gsap';
import { useGsapTimeline } from '../hooks/useGsapTimeline';

export default function MatchSection({ playSFX, onSelectArchetype }) {
  const matchContainerRef = useRef(null);
  const meteorLeftRef = useRef(null);
  const meteorRightRef = useRef(null);
  const explosionRef = useRef(null);
  const matchContentRef = useRef(null);
  const cardLeftRef = useRef(null);
  const cardRightRef = useRef(null);

  useGsapTimeline(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: matchContainerRef.current,
        start: 'top 55%',
        toggleActions: 'play none none none',
      }
    });

    tl.call(() => {
      playSFX(`${import.meta.env.BASE_URL}assets/audio/fantasy-gliss-6.wav`);
    }, null, 0)
      .set([meteorLeftRef.current, meteorRightRef.current], { opacity: 1 })
      .fromTo(meteorLeftRef.current,
        { left: '-10%', top: '10%', scale: 1 },
        { left: '50%', top: '50%', scale: 2, duration: 1.5, ease: 'power2.in' },
        0
      )
      .fromTo(meteorRightRef.current,
        { right: '-10%', top: '10%', scale: 1 },
        { right: '50%', top: '50%', scale: 2, duration: 1.5, ease: 'power2.in' },
        0
      )
      .to([meteorLeftRef.current, meteorRightRef.current], { opacity: 0, duration: 0.1 }, 1.5)
      .fromTo(explosionRef.current,
        { scale: 0, opacity: 0 },
        { scale: 18, opacity: 1, duration: 0.3, ease: 'power1.out' },
        1.5
      )
      .to(explosionRef.current, { opacity: 0, duration: 0.6, ease: 'power1.in' }, 1.8)
      .fromTo(matchContentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        1.9
      )
      .fromTo(cardLeftRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
        2.3
      )
      .fromTo(cardRightRef.current,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
        2.3
      );
  }, [playSFX]);

  return (
    <section ref={matchContainerRef} className="story-section min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-4 overflow-hidden border-b border-purple-500/5">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          ref={meteorLeftRef}
          className="absolute w-3.5 h-3.5 rounded-full opacity-0"
          style={{
            left: '-10%',
            top: '10%',
            background: 'radial-gradient(circle, #ffffff 40%, #00f0ff 100%)',
            boxShadow: '0 0 15px #fff, 0 0 30px #00f0ff, 0 0 60px rgba(0,240,255,0.4)',
          }}
        />
        <div
          ref={meteorRightRef}
          className="absolute w-3.5 h-3.5 rounded-full opacity-0"
          style={{
            right: '-10%',
            top: '10%',
            background: 'radial-gradient(circle, #ffffff 40%, #ff00b0 100%)',
            boxShadow: '0 0 15px #fff, 0 0 30px #ff00b0, 0 0 60px rgba(255,0,176,0.4)',
          }}
        />
        <div
          ref={explosionRef}
          className="absolute w-14 h-14 rounded-full bg-white opacity-0 scale-0 z-10"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-28px',
            marginTop: '-28px',
            boxShadow: '0 0 60px #fff, 0 0 120px #c245f0, 0 0 240px #00f0ff',
          }}
        />
      </div>

      <div ref={matchContentRef} className="text-center w-full max-w-2xl opacity-0 z-10 select-none">
        <span className="text-5xl mb-4 block animate-bounce">🛸</span>
        <h2 className="font-body text-3xl font-bold text-neon-cyan mb-2">O Match Cósmico</h2>
        <p className="text-white text-xl font-mono font-bold tracking-widest mb-8 bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 rounded-full inline-block border border-neon-pink/40 shadow-[0_0_20px_rgba(244,114,182,0.5)] animate-pulse">
          17/01/2026 às 16:10
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch mt-8 w-full">
          <div
            ref={cardLeftRef}
            onClick={() => onSelectArchetype('yoyo')}
            className="w-full sm:w-1/2 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-neon-pink/20 text-center relative overflow-hidden group hover:border-neon-pink/50 hover:shadow-[0_0_30px_rgba(244,114,182,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer active:scale-[0.98]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-pink/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <span className="text-4xl mb-3 block">🙋‍♀️</span>
              <h3 className="text-xl font-bold text-neon-pink mb-1">Yoyo</h3>
              <p className="text-xs text-purple-300 font-semibold mb-3 tracking-widest">Arquétipo Herói — ENFJ</p>
              <p className="text-[12px] text-purple-200/80 leading-relaxed text-left">
                Naturalmente empática, guiando e organizando conexões humanas com paixão, harmonia e cuidado com o outro.
              </p>
            </div>
            <div className="flex gap-2 justify-center mt-4 flex-wrap text-[10px]">
              <span className="bg-neon-pink/10 px-2 py-0.5 rounded border border-neon-pink/20">Fe (Sentimento Ext.)</span>
              <span className="bg-neon-pink/10 px-2 py-0.5 rounded border border-neon-pink/20">Ni</span>
              <span className="bg-neon-pink/10 px-2 py-0.5 rounded border border-neon-pink/20">Se</span>
            </div>
          </div>

          <div
            ref={cardRightRef}
            onClick={() => onSelectArchetype('murillo')}
            className="w-full sm:w-1/2 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-neon-cyan/20 text-center relative overflow-hidden group hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer active:scale-[0.98]"
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-neon-cyan/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <span className="text-4xl mb-3 block">👨‍💻</span>
              <h3 className="text-xl font-bold text-neon-cyan mb-1">Murillo</h3>
              <p className="text-xs text-purple-300 font-semibold mb-3 tracking-widest">Arquétipo Arquiteto — INTJ</p>
              <p className="text-[12px] text-purple-200/80 leading-relaxed text-left">
                Pensador conceitual e analítico, movido por visões estratégicas, conexões lógicas estruturadas e profundas.
              </p>
            </div>
            <div className="flex gap-2 justify-center mt-4 flex-wrap text-[10px]">
              <span className="bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/20">Ni (Intuição Intro.)</span>
              <span className="bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/20">Te</span>
              <span className="bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/20">Fi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
