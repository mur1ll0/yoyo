export default function FirstLoveSection() {
  return (
    <section className="story-section min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-4 overflow-hidden border-b border-purple-500/5">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute rounded-full bg-amber-400/25 blur-3xl animate-float-slow" style={{ width: '150px', height: '150px', left: '10%', top: '20%', animationDuration: '9s' }} />
        <div className="absolute rounded-full bg-rose-400/20 blur-3xl animate-float-slow" style={{ width: '190px', height: '190px', right: '8%', top: '40%', animationDuration: '13s', animationDelay: '-2s' }} />
        <div className="absolute rounded-full bg-orange-400/15 blur-3xl animate-float-slow" style={{ width: '220px', height: '220px', left: '25%', bottom: '10%', animationDuration: '11s', animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center select-none">
        <span className="text-5xl mb-4 block">🎂</span>
        <h2 className="font-body text-3xl font-bold text-neon-cyan mb-2">Primeiro "Amor"</h2>
        <p className="text-purple-400 text-xs tracking-widest uppercase mb-4">Madrugada de 20 de Março</p>

        <span className="text-sm font-mono text-neon-cyan tracking-wider mb-8 bg-neon-cyan/10 px-3 py-1 rounded border border-neon-cyan/20">Seu Aniversário</span>

        <div className="w-full max-w-lg space-y-4">
          <div className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-md">
            <span className="text-[10px] text-neon-cyan block mb-1">Você</span>
            <p className="text-sm text-purple-100">Eu só não te digo as 3 palavras mágicas pq quero olhar nos teus olhos para dizer</p>
          </div>

          <div className="chat-bubble bg-neon-pink/15 border border-neon-pink/30 rounded-2xl rounded-bl-none p-4 text-left max-w-[85%] shadow-md">
            <span className="text-[10px] text-neon-pink block mb-1">Yoyo</span>
            <p className="text-sm text-purple-100">estou guardando também</p>
          </div>

          <div className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-md">
            <span className="text-[10px] text-neon-cyan block mb-1">Você</span>
            <p className="text-sm text-purple-100">Vou deixar você descansar, depois te alugo por mais tempo...</p>
          </div>

          <div className="chat-bubble bg-gradient-to-r from-neon-pink/30 to-neon-purple/30 border-2 border-neon-pink rounded-2xl rounded-bl-none p-5 text-left max-w-[85%] shadow-[0_0_25px_rgba(244,114,182,0.3)] transform scale-105 my-4">
            <span className="text-[10px] text-neon-pink font-bold block mb-1">Yoyo • A Primeira Vez! 💜</span>
            <p className="text-base font-bold text-white tracking-wide drop-shadow-[0_0_6px_#fff]">"Tá bom amor"</p>
          </div>

          <div className="chat-bubble bg-neon-cyan/15 border border-neon-cyan/30 rounded-2xl rounded-br-none p-4 text-right max-w-[85%] ml-auto shadow-md">
            <span className="text-[10px] text-neon-cyan block mb-1">Você</span>
            <p className="text-sm text-purple-100">Te adoro demais amor.</p>
          </div>
        </div>

        <div className="max-w-xl text-center px-4 mt-10 bg-neon-purple/5 p-6 rounded-2xl border border-neon-purple/20 shadow-md">
          <p className="text-sm text-purple-200 leading-relaxed font-body">
            "Nesse mesmo dia era o seu aniversário. E quem ganhou o melhor presente fui eu."
          </p>
        </div>
      </div>
    </section>
  );
}
