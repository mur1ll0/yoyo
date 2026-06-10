import { useEffect, useRef } from 'react';
import { getBezierPoints } from '../utils/dashboardHelpers';

export default function BridgeSection({ calculatedDistance, onSaudade, buttonText, disabled }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

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

    const customIcon = window.L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-5 h-5 bg-neon-pink rounded-full opacity-60 animate-ping"></div>
          <div class="w-3.5 h-3.5 bg-neon-pink border-2 border-white rounded-full shadow-[0_0_8px_#f472b6]"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    window.L.marker(p1, { icon: customIcon }).addTo(map)
      .bindPopup('<b>Xanxerê - SC</b><br/>Murillo 💜', { closeButton: false }).openPopup();
    
    window.L.marker(p2, { icon: customIcon }).addTo(map)
      .bindPopup('<b>Teresina - PI</b><br/>Yoyo 💜', { closeButton: false });

    const curvePoints = getBezierPoints(p1, p2, 60);
    window.L.polyline(curvePoints, {
      color: '#f472b6',
      weight: 3.5,
      dashArray: '5, 8',
      opacity: 0.85
    }).addTo(map);

    map.fitBounds([p1, p2], { padding: [40, 40] });

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

      <div className="w-full max-w-2xl h-80 rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl relative z-10 mb-8 bg-[#070112]">
        <div ref={mapRef} className="w-full h-full" />
      </div>

      <div className="text-center space-y-4 max-w-md px-4 mt-4 z-10">
        <p className="text-xs text-purple-300 italic">
          Caso sinta saudades, pode utilizar o botão abaixo.
        </p>
        <button
          onClick={onSaudade}
          disabled={disabled}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold text-base shadow-xl shadow-neon-pink/20 hover:shadow-neon-pink/40 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
          {buttonText}
        </button>
      </div>

      <div className="mt-20 text-center space-y-2 z-10 select-none">
        <p className="text-neon-pink font-body text-lg font-semibold tracking-wide drop-shadow-[0_0_6px_rgba(244,114,182,0.4)]">
          com amor, de Murillo ❤️
        </p>
        <p className="text-xs text-purple-500/80 uppercase tracking-widest animate-pulse font-medium">
          Continua...
        </p>
      </div>
    </section>
  );
}
