import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useTelegramNotify } from '../hooks/useTelegramNotify';
import { useAudio } from '../context/AudioContext';
import { fetchPreviewUrl, getHaversineDistance, triggerHeartBurst } from '../utils/dashboardHelpers';
import HeartRain from './HeartRain';
import FloatingStars from './FloatingStars';
import DashboardHeader from './DashboardHeader';
import MatchSection from './MatchSection';
import Chat24hSection from './Chat24hSection';
import FrequencySection from './FrequencySection';
import FirstLoveSection from './FirstLoveSection';
import ProposalSection from './ProposalSection';
import BridgeSection from './BridgeSection';
import ArchetypeModal from './ArchetypeModal';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard({ onPlayGame, onBack }) {
  const [activeSection, setActiveSection] = useState(-1);
  const [previewUrls, setPreviewUrls] = useState({
    outside: null,
    stereoHearts: null,
    nessasHoras: null,
  });
  const [hasProposed, setHasProposed] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const { notify, sending, lastStatus } = useTelegramNotify();
  const { play, stop, playSFX } = useAudio();

  useEffect(() => {
    let active = true;
    async function loadTracks() {
      const results = await Promise.allSettled([
        fetchPreviewUrl('7MmG8p0F9N3C4AXdK6o6Eb', 'Outside', 'Calvin Harris'),
        fetchPreviewUrl('0qOnSQQF0yzuPWsXrQ9paz', 'Stereo Hearts', 'Gym Class Heroes'),
        fetchPreviewUrl('2KWAxm4LMVVVFgMmXWgeCG', 'Nessas Horas', 'Renato Vianna')
      ]);
      
      if (active) {
        const outsideUrl = results[0].status === 'fulfilled' ? results[0].value : null;
        const stereoUrl = results[1].status === 'fulfilled' ? results[1].value : null;
        const nessasUrl = results[2].status === 'fulfilled' ? results[2].value : null;

        setPreviewUrls({
          outside: outsideUrl,
          stereoHearts: stereoUrl,
          nessasHoras: nessasUrl
        });
      }
    }
    loadTracks();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (activeSection === 2 && previewUrls.outside) {
      play(previewUrls.outside, 65);
    } else if (activeSection === 3 && previewUrls.stereoHearts) {
      play(previewUrls.stereoHearts, 154);
    } else if (activeSection === 4) {
      if (hasProposed && previewUrls.nessasHoras) {
        play(previewUrls.nessasHoras, 62);
      } else if (previewUrls.stereoHearts) {
        play(previewUrls.stereoHearts, 154);
      }
    } else if (activeSection === 5) {
      if (hasProposed && previewUrls.nessasHoras) {
        play(previewUrls.nessasHoras, 62);
      } else if (previewUrls.stereoHearts) {
        play(previewUrls.stereoHearts, 154);
      }
    } else {
      stop();
    }
  }, [activeSection, previewUrls, hasProposed, play, stop]);

  useGsapTimeline(() => {
    const sections = gsap.utils.toArray('.story-section');
    sections.forEach((sec, idx) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => setActiveSection(idx),
        onEnterBack: () => setActiveSection(idx),
      });
    });
  }, []);

  const handleProposalClick = (e) => {
    if (hasProposed) return;
    setHasProposed(true);
    triggerHeartBurst(e.clientX, e.clientY);
    if (previewUrls.nessasHoras) {
      play(previewUrls.nessasHoras, 62);
    }
  };

  useEffect(() => {
    if (!hasProposed) return;
    const interval = setInterval(() => {
      const container = document.getElementById('heart-burst-container');
      if (!container) return;
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight + 50;

      const heart = document.createElement('div');
      heart.innerText = Math.random() > 0.5 ? '❤️' : '💜';
      heart.style.position = 'fixed';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = `${16 + Math.random() * 20}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '100';
      container.appendChild(heart);

      gsap.fromTo(heart,
        { y: 0, opacity: 1, scale: 0.5 },
        {
          y: -window.innerHeight - 100,
          opacity: 0,
          scale: 1.2,
          x: (Math.random() - 0.5) * 200,
          duration: 3 + Math.random() * 3,
          ease: 'power1.out',
          onComplete: () => heart.remove()
        }
      );
    }, 150);

    return () => clearInterval(interval);
  }, [hasProposed]);

  const handleSaudade = async (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const container = document.getElementById('heart-burst-container');
    if (container) {
      for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerText = '💜';
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${18 + Math.random() * 16}px`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100';
        container.appendChild(heart);

        const destX = (Math.random() - 0.5) * 120;
        const destY = -150 - Math.random() * 150;

        gsap.fromTo(heart,
          { scale: 0.5, opacity: 1, x: 0, y: 0 },
          {
            scale: 1.3,
            opacity: 0,
            x: destX,
            y: destY,
            duration: 2.0 + Math.random() * 1.0,
            ease: 'power1.out',
            onComplete: () => heart.remove()
          }
        );
      }
    }

    await notify('A Yoyo acabou de apertar o botão de saudade no site! ❤️');
  };

  const getButtonText = () => {
    if (sending) return 'Enviando...';
    if (lastStatus === 'sent') return 'Enviado! 💜';
    if (lastStatus === 'error') return 'Erro :( Tente de novo';
    if (lastStatus === 'unconfigured') return 'Tô com Saudade';
    return 'Tô com Saudade';
  };

  const p1 = [-26.8747, -52.4036];
  const p2 = [-5.0892, -42.8016];
  const calculatedDistance = getHaversineDistance(p1, p2);

  return (
    <div className="screen-container bg-gradient-to-b from-[#11052c] via-[#0a0014] to-[#11052c] overflow-y-auto min-h-screen text-purple-50">
      <HeartRain />
      <div id="heart-burst-container" className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />
      <FloatingStars />
      <DashboardHeader onBack={onBack} />

      <div className="relative z-10 w-full">
        <MatchSection playSFX={playSFX} onSelectArchetype={setSelectedArchetype} />
        <Chat24hSection />
        <FrequencySection isActive={activeSection === 2} />
        <FirstLoveSection />
        <ProposalSection hasProposed={hasProposed} onPropose={handleProposalClick} />
        <BridgeSection
          calculatedDistance={calculatedDistance}
          onSaudade={handleSaudade}
          buttonText={getButtonText()}
          disabled={sending}
        />
      </div>

      <ArchetypeModal selectedArchetype={selectedArchetype} onClose={() => setSelectedArchetype(null)} />
    </div>
  );
}
