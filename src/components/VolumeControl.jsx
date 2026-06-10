import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

export default function VolumeControl() {
  const {
    globalVolume,
    setGlobalVolume,
    isMuted,
    setIsMuted
  } = useAudio();

  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const handleMuteToggle = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (next) {
        // Show "Sons desativados" tooltip when muting
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
      return next;
    });
  };

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setGlobalVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
      setShowTooltip(false);
    }
  };

  // Automatically hide the "Sons desativados" toast/tooltip after a delay
  useEffect(() => {
    if (showTooltip) {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 2500);
    }
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, [showTooltip]);

  const shouldShowTooltip = showTooltip || (isHovered && isMuted);
  const currentVolume = isMuted ? 0 : globalVolume;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Alert */}
      <div
        className={`px-3 py-1.5 rounded-lg bg-midnight/90 border border-neon-pink/30 text-xs text-neon-pink font-semibold shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 transform ${
          shouldShowTooltip
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        Sons desativados
      </div>

      {/* Main Control Capsule */}
      <div className="bg-midnight-dark/80 backdrop-blur-lg border border-cosmos-500/30 rounded-full px-3 py-2 flex items-center gap-2.5 shadow-lg shadow-black/60 transition-all duration-300 hover:border-neon-purple/50 hover:shadow-neon-purple/10">
        
        {/* Mute/Unmute Button */}
        <button
          onClick={handleMuteToggle}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 text-cosmos-100 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
          title={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted || globalVolume === 0 ? (
            // Volume Mute SVG
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          ) : globalVolume < 0.5 ? (
            // Volume Low SVG
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            // Volume High SVG
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        {/* Volume Range Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={currentVolume}
          onChange={handleSliderChange}
          className="w-20 sm:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none transition-all duration-200 hover:bg-white/30
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-pink [&::-webkit-slider-thumb]:shadow-[0_0_8px_#ff2d95] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 active:[&::-webkit-slider-thumb]:scale-125
            [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neon-pink [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_8px_#ff2d95] [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 active:[&::-moz-range-thumb]:scale-125"
        />
      </div>
    </div>
  );
}
