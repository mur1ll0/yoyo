import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useGsapTimeline(callback, dependencies = []) {
  const ctxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    });

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, dependencies);

  return ctxRef;
}
