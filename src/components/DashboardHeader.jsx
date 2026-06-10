export default function DashboardHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-40 glass-card py-4 px-6 flex justify-between items-center bg-[#11052c]/80 border-b border-purple-500/10">
      <h1 className="font-body text-xl font-bold tracking-wider text-neon-purple drop-shadow-[0_0_8px_rgba(196,69,240,0.6)]">Para Yoyo, com Amor 💜</h1>
      <button onClick={onBack} className="text-purple-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-1">
        ✕ Sair
      </button>
    </header>
  );
}
