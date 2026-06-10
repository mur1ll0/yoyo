export default function ProposalSection({ hasProposed, onPropose }) {
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

        <div className="chat-bubble bg-neon-cyan/20 border border-neon-cyan/40 rounded-2xl rounded-br-none p-5 text-right max-w-[85%] ml-auto mt-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="text-[10px] text-neon-cyan font-bold block mb-1">Você</span>
          <p className="text-sm font-semibold text-white">Ainda não te pedi oficialmente, namora comigo meu amor? 💍❤️</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        {!hasProposed ? (
          <button
            onClick={onPropose}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-pink text-white font-bold text-lg shadow-xl shadow-neon-pink/30 hover:shadow-neon-pink/50 transition-all duration-300 animate-pulse hover:scale-105 cursor-pointer"
          >
            SIMMM, MEU AMOR! 🐰❤️
          </button>
        ) : (
          <div className="text-center space-y-3 animate-fade-in">
            <span className="text-6xl mb-2 block animate-bounce">🎉💍🐰❤️</span>
            <h3 className="text-2xl font-bold text-neon-pink tracking-wider">ACEITOU! 💜</h3>
            <p className="text-purple-200 text-sm">Nossos corações se conectaram oficialmente!</p>
          </div>
        )}
      </div>

      <p className="text-[11px] text-purple-400/60 italic text-center max-w-sm mt-10 leading-relaxed px-4">
        Nota do sistema: O início oficial foi no dia 6 às 00:11... mas como a Yoyo quer que bata com o domingo de Páscoa, o código aceita: nosso aniversário é dia 5 de Abril! 🐰❤️
      </p>
    </section>
  );
}
