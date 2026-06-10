export default function ArchetypeModal({ selectedArchetype, onClose }) {
  if (!selectedArchetype) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0014]/85 backdrop-blur-md cursor-pointer"
      />
      <div className={`relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 border bg-gradient-to-b shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 animate-fade-in flex flex-col justify-between ${
        selectedArchetype === 'yoyo' 
          ? 'from-[#2a1325]/95 to-[#120512]/95 border-neon-pink/40 shadow-neon-pink/25' 
          : 'from-[#0d2130]/95 to-[#040c14]/95 border-neon-cyan/40 shadow-neon-cyan/25'
      }`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer text-lg font-bold"
        >
          ✕
        </button>

        {selectedArchetype === 'yoyo' ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-5xl block mb-2">🙋‍♀️</span>
              <h3 className="text-2xl font-extrabold text-neon-pink tracking-wide">Os Heróis</h3>
              <span className="text-xs font-mono tracking-widest text-purple-300 uppercase bg-neon-pink/15 px-3 py-1 rounded border border-neon-pink/30 inline-block mt-1">ENFJ</span>
            </div>
            <p className="text-sm text-purple-100/90 leading-relaxed font-body text-justify">
              Os Heróis são pessoas com o bem-estar dos outros no cerne de seus objetivos. Eles são diplomáticos, educados e habilidosos em gerenciar relacionamentos de pessoas. Eles têm um dom para compreender os sentimentos e as motivações dos outros e fazem o seu melhor não só para manter a paz nas suas comunidades e relações, mas também para antecipar e apoiar as necessidades dos outros. Nada lhes dá mais satisfação no final de um dia do que ser lembrado por todo o trabalho árduo que fazem pelos seus amigos e entes queridos.
            </p>
            
            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-purple-500/10">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-1">👍 Forças</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['tolerante', 'confiável', 'carismático', 'altruísta', 'líder natural', 'cooperativo', 'comunicativo', 'leal', 'devoto'].map((f, i) => (
                    <span key={i} className="text-[11px] bg-green-500/10 border border-green-500/20 text-green-300 px-2.5 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-1">👎 Fraquezas</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['carente', 'passivo-agressivo', 'muito sensível', 'auto-estima flutuante', 'dificuldade em tomar decisões difíceis', 'crítico de perspectivas diferentes', 'aversão ao conflito'].map((w, i) => (
                    <span key={i} className="text-[11px] bg-red-500/10 border border-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full">{w}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-500/10 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-neon-pink mb-2 flex items-center gap-1">😍 Atraídos por (Qualidades que adoram)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['caloroso', 'cuidadoso', 'tem princípios', 'fácil de lidar', 'quieto', 'misterioso', 'profundo', 'altruísta', 'virtuoso', 'imaginativo', 'respeitoso', 'otimista', 'legal', 'empático', 'leal', 'atencioso', 'encorajador', 'atento', 'diplomático', 'romântico'].map((a, i) => (
                    <span key={i} className="text-[11px] bg-neon-pink/10 border border-neon-pink/20 text-neon-pink px-2.5 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-1">😡 Incômodos (Defeitos que não suportam)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['crítico', 'egoísta', 'grosseiro', 'superficial', 'desengajamento', 'cruel', 'controlador', 'desleal', 'ingrato', 'intransigente', 'desrespeitoso'].map((an, i) => (
                    <span key={i} className="text-[11px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full">{an}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-5xl block mb-2">👨‍💻</span>
              <h3 className="text-2xl font-extrabold text-neon-cyan tracking-wide">Os Arquitetos</h3>
              <span className="text-xs font-mono tracking-widest text-purple-300 uppercase bg-neon-cyan/15 px-3 py-1 rounded border border-neon-cyan/30 inline-block mt-1">INTJ</span>
            </div>
            <p className="text-sm text-purple-100/90 leading-relaxed font-body text-justify">
              Os Arquitetos são pensadores estratégicos e intuitivos e planejadores completos. Eles exaltam confiança tranquila, entendimento intelectual e conhecimento. Geralmente, eles não são conformistas e não se importam de serem diferentes da multidão, pensarem por si próprios e rejeitar tradições ou regras de longa data que não fazem qualquer sentido lógico. Eles podem te intimidar no começo; eles podem parecer intensos e indiferentes. Eles não são dependentes, são até mesmo o oposto, radicalmente independentes.
            </p>
            
            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-purple-500/10">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-1">👍 Forças</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['mente rápida', 'imaginativo', 'estratégico', 'confiante', 'independente', 'decidido', 'trabalhador', 'determinado', 'mente aberta', 'faz-tudo', 'inovador', 'leal'].map((f, i) => (
                    <span key={i} className="text-[11px] bg-green-500/10 border border-green-500/20 text-green-300 px-2.5 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-1">👎 Fraquezas</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['arrogante', 'julgador', 'excessivamente analítico', 'detestam ambientes altamente estruturados', 'sem noção no romance', 'complexo de superioridade', 'emocionalmente distante'].map((w, i) => (
                    <span key={i} className="text-[11px] bg-red-500/10 border border-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full">{w}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-500/10 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-neon-cyan mb-2 flex items-center gap-1">😍 Atraídos por (Qualidades que adoram)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['sincero', 'racional', 'pontual', 'respeitoso', 'aberto', 'acolhedor', 'leal', 'autêntico', 'curioso', 'romântico', 'atencioso'].map((a, i) => (
                    <span key={i} className="text-[11px] bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan px-2.5 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-1">😡 Incômodos (Defeitos que não suportam)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['controlador', 'irracional', 'ilógico', 'altamente emocional', 'passivo-agressivo', 'insincero', 'superficial', 'desleal', 'não confiável', 'pouco inteligente', 'manipulador'].map((an, i) => (
                    <span key={i} className="text-[11px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full">{an}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 pt-4 border-t border-purple-500/10">
          <button 
            onClick={onClose}
            className={`w-full py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              selectedArchetype === 'yoyo' 
                ? 'bg-neon-pink hover:bg-neon-pink/85 shadow-lg shadow-neon-pink/20 hover:shadow-neon-pink/40 text-white' 
                : 'bg-neon-cyan hover:bg-neon-cyan/85 shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/40 text-cosmos-950'
            }`}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
