import { useState } from 'react';
import gsap from 'gsap';

const QUESTIONS = [
  {
    q: 'Qual foi a primeira palavra trocada no chat do Boo?',
    options: ['Oi', 'Olá', 'Hey', 'Boo!'],
    correct: 0,
  },
  {
    q: 'Qual MBTI de vocês é mais compatível?',
    options: ['INFJ + ENFP', 'INTJ + ENTP', 'INFP + ENFJ', 'ISTJ + ESFP'],
    correct: 1,
  },
  {
    q: 'Quantos dias até o encontro?',
    options: ['30', '45', '60', '90'],
    correct: 2,
  },
];

export default function GameScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleAnswer = (idx) => {
    setSelected(idx);
    const isCorrect = idx === QUESTIONS[step].correct;

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep((s) => s + 1);
        setSelected(null);
      } else {
        setRevealed(true);
        gsap.fromTo(
          '.reward-card',
          { scale: 0, rotate: -180 },
          { scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.7)' }
        );
      }
    }, 800);
  };

  if (revealed) {
    return (
      <div className="screen-container flex flex-col items-center justify-center bg-gradient-to-b from-cosmos-950 to-midnight-dark p-6">
        <div className="reward-card glass-card p-10 text-center space-y-6 max-w-md">
          <span className="text-6xl">🎁</span>
          <h2 className="font-body text-3xl text-neon-pink">
            {score === 3 ? 'Perfeito! 🏆' : score >= 2 ? 'Quase lá! 💜' : 'Boa tentativa! 💫'}
          </h2>
          <p className="text-cosmos-200">
            {score === 3
              ? 'Você ganhou um cupom de abraço infinito + 1 jantar virtual!'
              : 'Seu prêmio: todo o meu amor (que você já tem de qualquer forma)'}
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold"
          >
            Voltar ao Portal
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="screen-container flex flex-col items-center justify-center bg-gradient-to-b from-cosmos-950 to-midnight-dark p-6">
      <button onClick={onBack} className="absolute top-6 left-6 text-cosmos-400 hover:text-white transition-colors">
        ← Voltar
      </button>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <p className="text-cosmos-400 text-sm mb-2">
            Pergunta {step + 1} de {QUESTIONS.length}
          </p>
          <div className="flex justify-center gap-1 mb-4">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-colors ${
                  i < step ? 'bg-neon-purple' : i === step ? 'bg-neon-pink' : 'bg-cosmos-800'
                }`}
              />
            ))}
          </div>
          <h2 className="font-body text-2xl text-neon-cyan">{q.q}</h2>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let borderColor = 'border-white/10 hover:border-neon-purple/50';
            if (selected !== null) {
              if (i === q.correct) borderColor = 'border-green-400 bg-green-400/10';
              else if (i === selected) borderColor = 'border-red-400 bg-red-400/10';
            }

            return (
              <button
                key={i}
                onClick={() => selected === null && handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-xl border-2 bg-white/5 text-left transition-all duration-300 ${borderColor} ${
                  selected === null ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'
                }`}
              >
                <span className="text-cosmos-100">{opt}</span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-neon-pink font-semibold">
          Pontuação: {score}/{QUESTIONS.length}
        </p>
      </div>
    </div>
  );
}
