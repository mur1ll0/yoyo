import { useState, useRef, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import GameScreen from './components/GameScreen';
import VolumeControl from './components/VolumeControl';
import gsap from 'gsap';

const VIEWS = {
  LOGIN: 'LOGIN',
  DASHBOARD: 'DASHBOARD',
  GAME: 'GAME',
};

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.LOGIN);
  const [showTransition, setShowTransition] = useState(false);
  const transitionOverlayRef = useRef(null);

  const navigateTo = (view) => {
    if (VIEWS[view]) setCurrentView(view);
  };

  const handleLoginEnter = () => {
    setShowTransition(true);
    navigateTo('DASHBOARD');
  };

  useEffect(() => {
    if (!showTransition) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        transitionOverlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          onComplete: () => setShowTransition(false),
        }
      );
    });
    return () => ctx.revert();
  }, [showTransition]);

  return (
    <>
      {currentView === VIEWS.LOGIN && (
        <LoginScreen onEnter={handleLoginEnter} />
      )}
      {currentView === VIEWS.DASHBOARD && (
        <Dashboard
          onPlayGame={() => navigateTo('GAME')}
          onBack={() => navigateTo('LOGIN')}
        />
      )}
      {currentView === VIEWS.GAME && (
        <GameScreen onBack={() => navigateTo('DASHBOARD')} />
      )}

      {/* Floating Volume Controller */}
      <VolumeControl />

      {/* Global Transition White Overlay */}
      {showTransition && (
        <div
          ref={transitionOverlayRef}
          className="fixed inset-0 z-50 pointer-events-none bg-white"
          style={{ opacity: 1 }}
        />
      )}
    </>
  );
}


