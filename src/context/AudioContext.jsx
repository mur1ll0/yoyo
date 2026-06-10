import { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const play = useCallback(async (previewUrl) => {
    if (!previewUrl) return;

    const audio = audioRef.current;
    if (!audio) {
      audioRef.current = new Audio(previewUrl);
      audioRef.current.volume = 0.8;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setCurrentTrack(previewUrl);
      } catch (err) {
        console.warn('Audio playback blocked:', err);
      }
      return;
    }

    if (currentTrack === previewUrl) {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      }
      return;
    }

    stopFade();
    const fadeOut = () => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
        fadeIntervalRef.current = setTimeout(fadeOut, 50);
      } else {
        audio.pause();
        audio.src = previewUrl;
        audio.volume = 0.8;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
        setCurrentTrack(previewUrl);
      }
    };
    fadeOut();
  }, [currentTrack, stopFade]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const setVolume = useCallback((vol) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, vol));
    }
  }, []);

  const stop = useCallback(() => {
    stopFade();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  }, [stopFade]);

  return (
    <AudioContext.Provider value={{ play, pause, stop, setVolume, isPlaying, currentTrack }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
