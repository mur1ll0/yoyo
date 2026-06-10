export default function FrequencySection({ isActive }) {
  return (
    <section className="story-section min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-4 border-b border-purple-500/5 select-none">
      <span className="text-5xl mb-4 block">🎵</span>

      <span className="text-sm font-mono text-neon-pink tracking-wider mb-4 bg-neon-pink/10 px-4 py-1.5 rounded-full border border-neon-pink/20">
        08 de Fevereiro
      </span>

      <h2 className="font-body text-3xl font-bold text-neon-pink mb-4">Sintonizando Frequências</h2>

      <div className="flex gap-1.5 items-end justify-center h-20 my-6 w-64 origin-bottom">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="waveform-bar w-1.5 h-16 bg-gradient-to-t from-neon-pink to-neon-purple rounded-full origin-bottom"
            style={{
              transform: 'scaleY(0.2)',
              animation: isActive ? `pulseBar ${0.4 + (i % 4) * 0.15}s ease-in-out ${i * 0.04}s infinite alternate` : 'none'
            }}
          />
        ))}
      </div>

      <div className="max-w-xl text-center px-6 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg space-y-5">
        <p className="text-base text-purple-100 leading-relaxed font-body">
          Você estava em São Paulo e me comentou que ia ter um show do Calvin Harris que gostava muito e queria assistir.
        </p>
        <p className="text-base text-purple-100 leading-relaxed font-body">
          Fui pesquisar e acabei descobrindo uma música que eu ouvia antigamente e tinha perdido: <span className="text-neon-pink font-semibold">Outside</span>.
        </p>
        <p className="text-base text-purple-100 leading-relaxed font-body">
          E agora ela se tornou a minha nova música preferida, pois me lembra de você.
        </p>
        
        <div className="border-t border-purple-500/10 pt-4 mt-4 space-y-4">
          <p className="text-xs text-purple-300 uppercase tracking-widest font-semibold">Nesse dia, você me disse:</p>
          <div className="bg-neon-pink/10 p-4 rounded-xl border border-neon-pink/20 text-neon-pink font-bold text-lg italic shadow-[0_0_15px_rgba(244,114,182,0.1)]">
            "faz tempo que eu não me interessava assim por alguém..."
          </div>
          <p className="text-xs text-purple-300 uppercase tracking-widest font-semibold">E o meu pensamento:</p>
          <div className="bg-neon-cyan/10 p-4 rounded-xl border border-neon-cyan/20 text-neon-cyan font-bold text-lg italic shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            "você já era o meu alguém especial."
          </div>
        </div>
      </div>
    </section>
  );
}
