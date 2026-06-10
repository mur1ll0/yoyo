import { useRef } from 'react';
import gsap from 'gsap';
import { useGsapTimeline } from '../hooks/useGsapTimeline';

export default function Chat24hSection() {
  const chatSectionRef = useRef(null);
  const chatBubbleRefs = useRef([]);

  useGsapTimeline(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chatSectionRef.current,
        start: 'top 55%',
        toggleActions: 'play none none none',
      }
    });

    chatBubbleRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, y: 35, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.3)' },
        i * 0.75
      );
    });
  }, []);

  return (
    <section id="chat-section" ref={chatSectionRef} className="story-section min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-4 border-b border-purple-500/5">
      <span className="text-5xl mb-4 block">💬</span>
      <h2 className="font-body text-3xl font-bold text-neon-purple mb-2">As Primeiras 24 Horas</h2>
      <p className="text-purple-400 text-xs tracking-widest uppercase mb-10">O Início de Tudo</p>

      <div className="w-full max-w-lg space-y-5 relative select-none">
        <div
          ref={(el) => (chatBubbleRefs.current[0] = el)}
          className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-lg"
        >
          <span className="text-[10px] text-neon-cyan block mb-1">Você</span>
          <p className="text-sm text-purple-100">Estou de churrasqueiro aqui 🍖</p>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[1] = el)}
          className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-lg"
        >
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Que ótimo amo um churrasquinho</p>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[2] = el)}
          className="flex justify-center items-center py-2"
        >
          <span className="text-neon-purple text-2xl font-bold tracking-[0.5em] animate-pulse">...</span>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[3] = el)}
          className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-lg"
        >
          <span className="text-[10px] text-neon-cyan block mb-1">Você</span>
          <p className="text-sm text-purple-100">Eu queria tentar jogar badminton 🏸</p>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[4] = el)}
          className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-lg"
        >
          <span className="text-[10px] text-neon-cyan block mb-1">Você</span>
          <p className="text-sm text-purple-100">Mas não tem nenhum lugar aqui</p>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[5] = el)}
          className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-lg"
        >
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Vamos fazer assim espero te ver e quando isso acontecer eu levo pra jogar com vc</p>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[6] = el)}
          className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-lg"
        >
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Hj em dia não tenho a melhor das colunas mas te garanto uma opotenente difícil</p>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[7] = el)}
          className="mx-auto p-4 rounded-2xl bg-[#0a0014]/60 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-purple/10 border border-dashed border-neon-cyan/40 max-w-[90%] text-center text-neon-cyan text-xs italic shadow-[0_0_15px_rgba(6,182,212,0.15)] leading-relaxed relative"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0a0014] px-2 text-[10px] text-neon-cyan tracking-wider uppercase font-semibold">Seu Pensamento</div>
          "Nesse momento eu já tinha percebido que nossa ligação ia ser muito profunda."
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[8] = el)}
          className="flex justify-center items-center py-2"
        >
          <span className="text-neon-purple text-2xl font-bold tracking-[0.5em] animate-pulse">...</span>
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[9] = el)}
          className="text-center text-xs text-purple-300 bg-white/5 border border-purple-500/10 rounded-full py-2.5 px-6 inline-block mx-auto max-w-[95%] select-none font-mono"
          style={{ display: 'block', margin: '1rem auto' }}
        >
          Trocamos Whatsapp. E uma das primeiras mensagens da Yoyo no Whatsapp:
        </div>

        <div
          ref={(el) => (chatBubbleRefs.current[10] = el)}
          className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-lg"
        >
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo • WhatsApp</span>
          <p className="text-sm text-purple-100">Amei seu sorriso</p>
        </div>
      </div>

      <p className="text-purple-300 text-sm mt-12 italic tracking-wide text-center">
        Desde então, começamos a conversar todo dia.
      </p>
    </section>
  );
}
