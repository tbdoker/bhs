"use client";

import { useEffect, useRef } from "react";

/**
 * A silent, looping background film. It only plays while on screen, and stays on
 * its poster frame for people who ask for reduced motion.
 */
export default function AmbientVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      if (visible && !still.matches) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    io.observe(video);
    still.addEventListener("change", sync);
    return () => { io.disconnect(); still.removeEventListener("change", sync); };
  }, []);

  return (
    <div className={className} role="img" aria-label={label}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" />
    </div>
  );
}
