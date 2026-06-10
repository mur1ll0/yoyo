import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  
  // Persist volume in localStorage (default 1.0)
  const [globalVolume, setGlobalVolume] = useState(() => {
    const saved = localStorage.getItem('yoyo_volume');
    return saved !== null ? parseFloat(saved) : 1.0;
  });
  
  // Persist mute state in localStorage (default false)
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('yoyo_muted');
    return saved === 'true';
  });

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const globalVolumeRef = useRef(globalVolume);
  const isMutedRef = useRef(isMuted);
  const fadeProgressRef = useRef(1.0); // ranges from 0 to 1
  const activeSfxRef = useRef(new Set());

  // Keep refs synchronized and save to localStorage
  useEffect(() => {
    globalVolumeRef.current = globalVolume;
    localStorage.setItem('yoyo_volume', globalVolume.toString());
  }, [globalVolume]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    localStorage.setItem('yoyo_muted', isMuted.toString());
  }, [isMuted]);

  // Dynamically updates currently playing music and all active SFX
  const updateVolume = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      // Background music volume is capped at 50% max (targetMax = 0.5 * globalVolume)
      const targetMax = isMutedRef.current ? 0 : globalVolumeRef.current * 0.5;
      audio.volume = fadeProgressRef.current * targetMax;
    }
    // SFX volumes are capped at 100% max (targetSfxVolume = 1.0 * globalVolume)
    const targetSfxVolume = isMutedRef.current ? 0 : globalVolumeRef.current * 1.0;
    activeSfxRef.current.forEach(sfx => {
      sfx.volume = targetSfxVolume;
    });
  }, []);

  // Update volume whenever volume or mute state changes
  useEffect(() => {
    updateVolume();
  }, [globalVolume, isMuted, updateVolume]);

  const stopFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const startFadeIn = useCallback((audio, durationMs = 2000) => {
    stopFade();
    fadeProgressRef.current = 0;
    updateVolume();

    const steps = 40; // 50ms intervals
    const stepTime = durationMs / steps;
    const progressStep = 1.0 / steps;

    const fadeInterval = setInterval(() => {
      fadeProgressRef.current = Math.min(1.0, fadeProgressRef.current + progressStep);
      updateVolume();
      if (fadeProgressRef.current >= 1.0) {
        clearInterval(fadeInterval);
        fadeIntervalRef.current = null;
      }
    }, stepTime);
    fadeIntervalRef.current = fadeInterval;
  }, [stopFade, updateVolume]);

  const startFadeOut = useCallback((audio, durationMs = 2000, onComplete) => {
    stopFade();
    const startProgress = fadeProgressRef.current;
    const steps = 40; // 50ms intervals
    const stepTime = durationMs / steps;
    const progressStep = startProgress / steps;

    const fadeInterval = setInterval(() => {
      fadeProgressRef.current = Math.max(0, fadeProgressRef.current - progressStep);
      updateVolume();
      if (fadeProgressRef.current <= 0) {
        clearInterval(fadeInterval);
        fadeIntervalRef.current = null;
        if (onComplete) onComplete();
      }
    }, stepTime);
    fadeIntervalRef.current = fadeInterval;
  }, [stopFade, updateVolume]);

  const play = useCallback(async (previewUrl, offset = 0) => {
    if (!previewUrl) return;

    let audio = audioRef.current;

    // Helper to configure audio listeners and play
    const configureAndPlay = (targetAudio) => {
      // Setup ended event handler to loop from the initial starting point
      const newEndedHandler = () => {
        targetAudio.currentTime = (targetAudio.duration > offset) ? offset : 0;
        targetAudio.play().catch(() => {});
      };
      
      if (targetAudio._endedHandler) {
        targetAudio.removeEventListener('ended', targetAudio._endedHandler);
      }
      targetAudio._endedHandler = newEndedHandler;
      targetAudio.addEventListener('ended', newEndedHandler);

      const onMetadata = () => {
        if (targetAudio.duration > offset) {
          targetAudio.currentTime = offset;
        } else {
          targetAudio.currentTime = 0;
        }
      };
      targetAudio.addEventListener('loadedmetadata', onMetadata, { once: true });

      targetAudio.play()
        .then(() => {
          setIsPlaying(true);
          startFadeIn(targetAudio, 2000);
        })
        .catch(err => console.warn('Audio play failed:', err));
    };

    if (!audio) {
      audio = new Audio(previewUrl);
      audioRef.current = audio;
      setCurrentTrack(previewUrl);
      configureAndPlay(audio);
      return;
    }

    if (currentTrack === previewUrl) {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          startFadeIn(audio, 2000);
        }).catch(() => {});
      }
      return;
    }

    // Swapping track: fade out current track first, then swap and fade in
    startFadeOut(audio, 2000, () => {
      audio.pause();
      audio.src = previewUrl;
      setCurrentTrack(previewUrl);
      configureAndPlay(audio);
    });

  }, [currentTrack, startFadeIn, startFadeOut]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const setVolume = useCallback((vol) => {
    setGlobalVolume(Math.max(0, Math.min(1.0, vol)));
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      startFadeOut(audio, 2000, () => {
        audio.pause();
        audio.src = '';
        audioRef.current = null;
        setIsPlaying(false);
        setCurrentTrack(null);
        stopFade();
      });
    } else if (audio) {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      setIsPlaying(false);
      setCurrentTrack(null);
      stopFade();
    }
  }, [startFadeOut, stopFade]);

  const playSFX = useCallback((url) => {
    if (!url) return;
    const sfx = new Audio(url);
    const targetVolume = isMutedRef.current ? 0 : globalVolumeRef.current * 1.0;
    sfx.volume = targetVolume;
    activeSfxRef.current.add(sfx);
    sfx.addEventListener('ended', () => {
      activeSfxRef.current.delete(sfx);
    });
    sfx.play().catch(err => {
      console.warn('SFX playback blocked:', err);
      activeSfxRef.current.delete(sfx);
    });
  }, []);

  return (
    <AudioContext.Provider value={{
      play,
      pause,
      stop,
      setVolume,
      isPlaying,
      currentTrack,
      playSFX,
      globalVolume,
      setGlobalVolume,
      isMuted,
      setIsMuted
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
