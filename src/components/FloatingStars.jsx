export default function FloatingStars() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            backgroundColor: Math.random() > 0.8 ? '#f472b6' : '#fff',
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2.5 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
