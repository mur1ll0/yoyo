import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useTelegramNotify } from '../hooks/useTelegramNotify';
import HeartRain from './HeartRain';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard({ onPlayGame, onBack }) {
  const sectionRefs = useRef([]);
  const { notify, sending, lastStatus } = useTelegramNotify();

  useGsapTimeline(() => {

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const handleSaudade = async () => {
    await notify('💜 <b>Saudade bateu!</b> Alguém está pensando em você agora...');
  };

  const getButtonText = () => {
    if (sending) return 'Enviando...';
    if (lastStatus === 'sent') return 'Enviado! 💜';
    if (lastStatus === 'error') return 'Erro :( Tente de novo';
    if (lastStatus === 'unconfigured') return 'Tô com Saudade';
    return 'Tô com Saudade';
  };

  return (
    <div className="screen-container bg-gradient-to-b from-cosmos-950 via-midnight to-cosmos-900 overflow-y-auto">
      <HeartRain />

      {/* Header */}
      <header className="sticky top-0 z-20 glass-card py-4 px-6 flex justify-between items-center">
        <h1 className="font-body text-2xl text-neon-purple">Almas Conectadas</h1>
        <button onClick={onBack} className="text-cosmos-300 hover:text-white transition-colors">
          ✕ Portal
        </button>
      </header>

      {/* Timeline sections */}
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-24">
        {/* O Match */}
        <section ref={(el) => (sectionRefs.current[0] = el)} className="text-center">
          <h2 className="font-body text-3xl text-neon-cyan mb-6">O Match</h2>
          <div className="glass-card p-8">
            <p className="text-cosmos-200 mb-4">Dois meteoros colidiram no universo Boo...</p>
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 flex items-center justify-center">
              <span className="text-6xl">💫</span>
            </div>
          </div>
        </section>

        {/* O Chat */}
        <section ref={(el) => (sectionRefs.current[1] = el)} className="text-center">
          <h2 className="font-body text-3xl text-neon-pink mb-6">As Primeiras Palavras</h2>
          <div className="glass-card p-8 space-y-4">
            <div className="bg-neon-purple/20 rounded-2xl rounded-bl-none p-4 text-left max-w-xs">
              <p className="text-cosmos-100 text-sm">Oi! Seu MBTI é super compatível com o meu :)</p>
            </div>
            <div className="bg-neon-pink/20 rounded-2xl rounded-br-none p-4 text-right max-w-xs ml-auto">
              <p className="text-cosmos-100 text-sm">Haha, sério? Que coincidência cósmica!</p>
            </div>
          </div>
        </section>

        {/* A Distância */}
        <section ref={(el) => (sectionRefs.current[2] = el)} className="text-center">
          <h2 className="font-body text-3xl text-neon-blue mb-6">A Distância</h2>
          <div className="glass-card p-8">
            <p className="text-cosmos-200 mb-4">
              Cada quilômetro é só um lembrete do quanto nosso amor transcende o espaço.
            </p>
            <div className="flex justify-center gap-4 text-2xl font-mono text-neon-cyan">
              <span>365</span><span className="text-cosmos-400">dias</span>
              <span>12</span><span className="text-cosmos-400">horas</span>
              <span>30</span><span className="text-cosmos-400">min</span>
              <span>45</span><span className="text-cosmos-400">seg</span>
            </div>
          </div>
        </section>

        {/* Polaroid Gallery */}
        <section ref={(el) => (sectionRefs.current[3] = el)} className="text-center">
          <h2 className="font-body text-3xl text-neon-pink mb-6">Galeria Retrô</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="group perspective-500 cursor-pointer"
              >
                <div className="relative transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="p-3 pb-8 bg-amber-50 rounded shadow-lg backface-hidden">
                    <div className="w-full aspect-square bg-cosmos-200 rounded flex items-center justify-center text-cosmos-400 text-sm">
                      Foto {n}
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 p-3 pb-8 bg-rose-100 rounded shadow-lg rotate-y-180 backface-hidden flex items-center justify-center">
                    <p className="text-rose-800 text-sm italic font-body text-center px-2">
                      &ldquo;Meu amor por você cresce a cada dia...&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saudade Button */}
        <section ref={(el) => (sectionRefs.current[4] = el)} className="text-center">
          <button
            onClick={handleSaudade}
            disabled={sending}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-lg shadow-xl shadow-neon-pink/30 hover:shadow-neon-pink/50 transition-all duration-300 hover:scale-105 disabled:opacity-60"
          >
            {getButtonText()}
          </button>
        </section>

        {/* Play Game */}
        <section ref={(el) => (sectionRefs.current[5] = el)} className="text-center pb-24">
          <button
            onClick={onPlayGame}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-cosmos-900 font-bold text-lg shadow-xl shadow-neon-cyan/30 hover:shadow-neon-cyan/50 transition-all duration-300 hover:scale-105"
          >
            🎮 Mini-Game Trivia
          </button>
        </section>
      </div>
    </div>
  );
}
