import { useState, useEffect } from 'react';

export default function ProposalSection({ hasProposed, onPropose }) {
  const [timeElapsed, setTimeElapsed] = useState({
    totalDays: 0,
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2026-04-05T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      let diffMs = now - startDate;
      if (diffMs < 0) diffMs = 0;

      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (hours < 0) {
        days--;
        hours += 24;
      }
      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setTimeElapsed({
        totalDays,
        years,
        months,
        days,
        hours,
        minutes,
        seconds
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="story-section min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-4 border-b border-purple-500/5">
      <span className="text-5xl mb-4 block">🥚</span>
      <h2 className="font-body text-3xl font-bold text-neon-pink mb-2">🐰 O Pedido Oficial 🐰</h2>
      <p className="text-purple-400 text-xs tracking-widest uppercase mb-4">Páscoa de 05 de Abril</p>

      <span className="text-sm font-mono text-neon-pink tracking-wider mb-8 bg-neon-pink/10 px-3 py-1 rounded border border-neon-pink/20">Madrugada de 06 de Abril - 00:11</span>

      <div className="w-full max-w-lg space-y-4 select-none">
        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Tô com medo...</p>
        </div>
        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Do tanto que eu gosto de ti kkkk</p>
        </div>
        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Sou viciada em ti e não sei oq é isso</p>
        </div>

        <div className="flex justify-center items-center py-1">
          <span className="text-neon-pink/40 text-lg font-bold tracking-[0.3em] animate-pulse">...</span>
        </div>

        <div className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-md">
          <span className="text-[10px] text-neon-cyan block mb-1">Murillo</span>
          <p className="text-sm text-purple-100">Já rezo todo dia pra Deus unir nós dois, e te ajudar com sua faculdade</p>
        </div>

        <div className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-md">
          <span className="text-[10px] text-neon-cyan block mb-1">Murillo</span>
          <p className="text-sm text-purple-100">Então não precisa se preocupar pq eu já escolhi vc pra minha vida</p>
        </div>

        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Vou me controlar mais kkkk</p>
        </div>

        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Acho que foi o tempo livre do feriado</p>
        </div>

        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <p className="text-sm text-purple-100">Lembrei como é ter paz e alegria o dia todo kkkk</p>
        </div>

        <div className="flex justify-center items-center py-1">
          <span className="text-neon-pink/40 text-lg font-bold tracking-[0.3em] animate-pulse">...</span>
        </div>

        <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
          <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
          <div className="bg-purple-950/60 border-l-4 border-neon-cyan p-2 rounded mb-2 text-[11px] text-purple-300">
            <span className="font-semibold text-neon-cyan block mb-0.5">Murillo</span>
            Então não precisa se preocupar pq eu já escolhi vc pra minha vida
          </div>
          <p className="text-sm text-purple-100">E eu tbm te escolhi pra minha</p>
        </div>

        <div className="chat-bubble bg-neon-cyan/20 border border-neon-cyan/40 rounded-2xl rounded-br-none p-5 text-right max-w-[85%] ml-auto mt-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="text-[10px] text-neon-cyan font-bold block mb-1">Murillo</span>
          <p className="text-sm font-semibold text-white">Ainda não te pedi oficialmente, namora comigo meu amor? 💍❤️</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        {!hasProposed ? (
          <button
            onClick={onPropose}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink text-white font-bold text-lg shadow-xl shadow-neon-pink/30 hover:shadow-neon-pink/50 transition-all duration-300 animate-pulse hover:scale-105 cursor-pointer"
          >
            Simmmm, meu amor ❤️
          </button>
        ) : (
          <div className="text-center space-y-3 animate-fade-in">
            <span className="text-6xl mb-2 block animate-bounce">🎉💍🐰❤️</span>
            <h3 className="text-2xl font-bold text-neon-pink tracking-wider">ACEITOU! 💜</h3>
            <p className="text-purple-200 text-sm">Nossos corações se conectaram oficialmente!</p>
          </div>
        )}
      </div>

      {/* Contador de tempo de namoro */}
      <div className="mt-12 bg-white/5 border border-purple-500/10 rounded-2xl p-6 text-center max-w-md w-full shadow-lg z-10 backdrop-blur-sm select-none">
        <h4 className="text-neon-pink text-xs uppercase tracking-widest font-semibold mb-3">Dias de Namoro 💞</h4>
        <div className="mb-4">
          <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple tracking-wider drop-shadow-[0_0_8px_rgba(244,114,182,0.3)]">
            {timeElapsed.totalDays} dias
          </span>
          <p className="text-[10px] text-purple-400 mt-1 uppercase tracking-wider">desde 05 de Abril de 2026</p>
        </div>
        <div className="border-t border-purple-500/10 pt-4 mt-2">
          <p className="text-xs text-purple-300 mb-2">Isso corresponde a:</p>
          <p className="text-sm font-semibold text-white tracking-wide">
            {timeElapsed.years} {timeElapsed.years === 1 ? 'ano' : 'anos'}, {timeElapsed.months} {timeElapsed.months === 1 ? 'mês' : 'meses'}, {timeElapsed.days} {timeElapsed.days === 1 ? 'dia' : 'dias'}, {timeElapsed.hours} {timeElapsed.hours === 1 ? 'hora' : 'horas'}, {timeElapsed.minutes} {timeElapsed.minutes === 1 ? 'minuto' : 'minutos'} e {timeElapsed.seconds} {timeElapsed.seconds === 1 ? 'segundo' : 'segundos'}
          </p>
        </div>
      </div>

      <p className="text-sm text-purple-400/80 italic text-center max-w-lg mt-8 leading-relaxed px-4">
        Nota do sistema: O início oficial foi no dia 6 às 00:11... mas como a Yoyo quer que bata com o domingo de Páscoa, o código aceita: nosso aniversário é dia 5 de Abril! 🐰❤️
      </p>
    </section>
  );
}
