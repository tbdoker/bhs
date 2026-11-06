"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "../Icons";

const smooth = (q: number) => q * q * (3 - 2 * q);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** How long the logo takes to glide into the header when the mobile menu opens (and back when it closes). */
const MENU_FLIGHT = 380;


/**
 * Full-screen brand film. The big signature writes itself in over the video, then glides up and shrinks
 * into the header slot 1:1 with the scroll. Everything per-frame is written straight to the elements;
 * the header only hears about the two discrete switches, through attributes on <html>.
 */
export default function Film({ label, scrollLabel, tagline, src, poster }: {
  label: string; scrollLabel: string; tagline: string; src: string; poster: string;
}) {
  const filmRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.live = "1";
    logoRef.current?.classList.add("is-live");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const video = videoRef.current;
    if (video) {
      video.muted = true; // must be a property for autoplay to be allowed
      if (reduce) video.pause();
      else video.play().catch(() => {});
    }

    // m: how far the open mobile menu has pulled the logo into the header (0..1), animated on toggle.
    // The logo follows whichever is further along, the scroll or the menu.
    let m = 0, mFrom = 0, mTo = 0, mStart = 0, flight = 0;
    let raf = 0;
    let lastOver: boolean | null = null, lastDocked: boolean | null = null;
    const apply = () => {
      raf = 0;
      const film = filmRef.current, logo = logoRef.current, mark = markRef.current;
      if (!film || !logo || !mark) return;
      const r = film.getBoundingClientRect();
      const H = r.height;
      const scrolled = Math.min(1, Math.max(0, -r.top) / (H * 0.55));
      const q = Math.max(scrolled, m);
      const e = smooth(q);
      // Dock onto wherever the header logo really is (its size changes on phones, and the notch moves it down)
      const slot = document.querySelector(".site-header__logo svg")?.getBoundingClientRect();
      const targetY = slot ? slot.top + slot.height / 2 : 36;
      const targetW = slot?.width || 120;
      const y = H / 2 + (targetY - H / 2) * e;
      const k = 1 + (targetW / mark.offsetWidth - 1) * e;
      logo.style.transform = `translate(-50%, calc(${y.toFixed(1)}px - 50%)) scale(${k.toFixed(4)})`;
      // The opened menu turns the header white, so the logo darkens as it arrives there (and stays white over the film)
      const ink = m > 0 ? smooth(Math.min(1, Math.max(0, (e - 0.7) / 0.3))) : 0;
      const c = Math.round(255 - (255 - 17) * ink);
      mark.style.color = ink > 0 ? `rgb(${c},${c},${c})` : "";
      const docked = q >= 0.999;
      logo.style.opacity = docked ? "0" : "1";
      if (extrasRef.current) extrasRef.current.style.opacity = Math.max(0, 1 - q * 2.5).toFixed(3);
      if (cueRef.current) cueRef.current.style.opacity = Math.max(0, 1 - q * 4).toFixed(3);
      const over = r.bottom > 72;
      if (over !== lastOver) { root.dataset.hero = over ? "over" : "past"; lastOver = over; }
      if (docked !== lastDocked) { root.dataset.docked = String(docked); lastDocked = docked; }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };

    const fly = (now: number) => {
      const t = Math.min(1, (now - mStart) / MENU_FLIGHT);
      m = mFrom + (mTo - mFrom) * easeOut(t);
      apply();
      flight = t < 1 ? requestAnimationFrame(fly) : 0;
    };
    const onMenu = () => {
      const target = root.dataset.menu === "open" ? 1 : 0;
      if (target === mTo) return;
      mTo = target;
      if (reduce) { m = target; apply(); return; }
      mFrom = m; mStart = performance.now();
      if (!flight) flight = requestAnimationFrame(fly);
    };
    const menuWatch = new MutationObserver(onMenu);
    menuWatch.observe(root, { attributes: true, attributeFilter: ["data-menu"] });

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      menuWatch.disconnect();
      cancelAnimationFrame(flight);
      cancelAnimationFrame(raf);
      delete root.dataset.hero; delete root.dataset.docked; delete root.dataset.live;
    };
  }, []);

  return (
    <>
      <section className="film" ref={filmRef} aria-label={label}>
        <video ref={videoRef} src={src} poster={poster} preload="auto" autoPlay muted loop playsInline aria-hidden />
        <div className="film__shade" aria-hidden />
        <svg className="grain grain--dark" aria-hidden><rect width="100%" height="100%" filter="url(#grain)" /></svg>
        <div className="intro-logo" ref={logoRef} aria-hidden>
          <div className="mark intro-logo__mark" ref={markRef} />
          <div className="intro-logo__extras" ref={extrasRef}>
            <div className="intro-logo__rule" />
            <span className="intro-logo__tagline">{tagline}</span>
          </div>
        </div>
        <a className="film__cue" href="#giris" ref={cueRef}>
          <span>{scrollLabel}</span>
          <ChevronDown />
        </a>
      </section>
    </>
  );
}
