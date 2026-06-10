import { useState, useEffect, useRef } from 'react';
import { getBezierPoints } from '../utils/dashboardHelpers';

export default function BridgeSection({ calculatedDistance, onSaudade, buttonText, disabled }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false
  });

  useEffect(() => {
    const targetDate = new Date('2026-07-07T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diffMs = targetDate - now;

      if (diffMs <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
        return;
      }

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, finished: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!window.L || mapInstanceRef.current || !mapRef.current) return;

    const p1 = [-26.8747, -52.4036];
    const p2 = [-5.0892, -42.8016];
    const centerLat = (p1[0] + p2[0]) / 2;
    const centerLng = (p1[1] + p2[1]) / 2;

    const map = window.L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView([centerLat, centerLng], 4);

    mapInstanceRef.current = map;

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 18,
    }).addTo(map);

    const SC_Icon = window.L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-6 h-6 bg-neon-purple rounded-full opacity-60 animate-ping"></div>
          <div class="w-4 h-4 bg-neon-purple border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_10px_#bc52f5] text-[9px] select-none">💜</div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const PI_Icon = window.L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-6 h-6 bg-neon-pink rounded-full opacity-60 animate-ping"></div>
          <div class="w-4 h-4 bg-neon-pink border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_10px_#f472b6] text-[9px] select-none">💖</div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    window.L.marker(p1, { icon: SC_Icon }).addTo(map)
      .bindPopup('<b>Xanxerê - SC</b><br/>Murillo 💜', { closeButton: false }).openPopup();
    
    window.L.marker(p2, { icon: PI_Icon }).addTo(map)
      .bindPopup('<b>Teresina - PI</b><br/>Yoyo 💖', { closeButton: false });

    const curvePoints = getBezierPoints(p1, p2, 60);
    window.L.polyline(curvePoints, {
      color: '#f472b6',
      weight: 3.5,
      dashArray: '8, 8',
      opacity: 0.85,
      className: 'map-polyline-flow'
    }).addTo(map);

    // Zoom in closer by using small padding on fitBounds
    map.fitBounds([p1, p2], { padding: [10, 10] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="story-section min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-4 border-b border-purple-500/5">
      <span className="text-5xl mb-4 block">🗺️</span>
      <h2 className="font-body text-3xl font-bold text-neon-cyan mb-2">A Ponte Entre Nós</h2>
      <p className="text-purple-400 text-xs tracking-widest uppercase mb-4">Apesar da distância...</p>

      <div className="text-center mb-8 select-none">
        <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-widest bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
          {calculatedDistance ? `${calculatedDistance.toLocaleString()} km` : '2.592 km'}
        </span>
        <p className="text-[11px] text-purple-400 mt-1 uppercase tracking-wider">Separados em linha reta</p>
      </div>

      {/* Decorated Map Container */}
      <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-tr from-neon-cyan via-purple-500 to-neon-pink shadow-[0_0_25px_rgba(168,85,247,0.3)] w-full max-w-2xl h-80 overflow-hidden mb-8 z-10">
        <div className="w-full h-full rounded-2xl overflow-hidden bg-[#070112]">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>

      {/* Romantic Message Boxes */}
      <div className="w-full max-w-xl space-y-4 px-4 mb-8 z-10 select-none">
        <div className="glass-card bg-neon-cyan/5 border border-neon-cyan/20 p-4 rounded-2xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <p className="text-xs sm:text-sm text-cyan-200 italic font-medium">
            "A distância me fez perceber..."
          </p>
        </div>
        <div className="glass-card bg-neon-pink/5 border border-neon-pink/20 p-4 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 ml-6">
          <p className="text-xs sm:text-sm text-pink-200 italic font-medium">
            "o tanto que eu penso em você"
          </p>
        </div>
        <div className="glass-card bg-neon-purple/5 border border-neon-purple/20 p-4 rounded-2xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 mr-6">
          <p className="text-xs sm:text-sm text-purple-200 italic font-medium">
            "a vontade de te abraçar"
          </p>
        </div>
        <div className="glass-card bg-neon-cyan/5 border border-neon-cyan/20 p-4 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 ml-4">
          <p className="text-xs sm:text-sm text-cyan-200 italic font-medium">
            "os sonhos que quero compartilhar"
          </p>
        </div>
        <div className="glass-card bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 border border-neon-pink/30 p-5 rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 text-center shadow-neon-pink/5">
          <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
            "por estar longe é que eu tenho certeza do quanto eu te amo e o quanto eu quero viver com você!"
          </p>
        </div>
      </div>

      <div className="text-center space-y-4 max-w-lg px-4 mt-4 z-10">
        <p className="text-sm sm:text-base text-purple-200 font-medium leading-relaxed">
          Caso sinta saudades, aperto o botão abaixo e eu sempre saberei que você está pensando em mim.
        </p>
        <button
          onClick={onSaudade}
          disabled={disabled}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-base shadow-xl shadow-neon-pink/20 hover:shadow-neon-pink/40 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
          {buttonText}
        </button>
      </div>

      {/* Countdown timer to see you */}
      <div className="mt-12 bg-white/5 border border-cyan-500/20 rounded-2xl p-6 text-center max-w-md w-full shadow-lg z-10 backdrop-blur-sm select-none">
        <h4 className="text-neon-cyan text-xs uppercase tracking-widest font-semibold mb-4">✈️ Contador de Tempo Para Te Ver ✈️</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-purple-950/40 p-2.5 rounded border border-cyan-500/10">
            <span className="text-2xl font-extrabold text-white block">{countdown.days}</span>
            <span className="text-[9px] uppercase tracking-wider text-cyan-300">dias</span>
          </div>
          <div className="bg-purple-950/40 p-2.5 rounded border border-cyan-500/10">
            <span className="text-2xl font-extrabold text-white block">{String(countdown.hours).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-cyan-300">horas</span>
          </div>
          <div className="bg-purple-950/40 p-2.5 rounded border border-cyan-500/10">
            <span className="text-2xl font-extrabold text-white block">{String(countdown.minutes).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-cyan-300">minutos</span>
          </div>
          <div className="bg-purple-950/40 p-2.5 rounded border border-cyan-500/10">
            <span className="text-2xl font-extrabold text-white block animate-pulse">{String(countdown.seconds).padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-wider text-cyan-300">segundos</span>
          </div>
        </div>
        <p className="text-[10px] text-purple-300/80 mt-3 font-mono">Destino: Teresina - 07 de Julho ✈️❤️</p>
      </div>

      <div className="mt-20 text-center space-y-2 z-10 select-none">
        <p className="text-neon-pink font-body text-lg font-semibold tracking-wide drop-shadow-[0_0_6px_rgba(244,114,182,0.4)]">
          com amor, de Murillo ❤️
        </p>
        <p className="text-xs text-purple-500/80 uppercase tracking-widest animate-pulse font-medium">
          Continua em um futuro próximo...
        </p>
      </div>
    </section>
  );
}
