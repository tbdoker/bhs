import { siInstagram } from "simple-icons";

export const Instagram = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={siInstagram.path} /></svg>
);

const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const Chevron = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.4} {...base}><path d="M9 6l6 6-6 6" /></svg>
);
export const ChevronDown = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" strokeWidth={2} {...base}><path d="M6 9l6 6 6-6" /></svg>
);
export const Menu = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" strokeWidth={1.8} {...base}><path d="M4 8h16M4 16h16" /></svg>
);
export const Close = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" strokeWidth={1.8} {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Chat = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" strokeWidth={1.8} {...base}><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.2A8.5 8.5 0 1 1 21 11.5z" /></svg>
);
export const Check = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.6} {...base} stroke="#fff"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Pin = () => (
  <svg width={34} height={34} viewBox="0 0 24 24" fill="#161514" aria-hidden><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
);
/** Shared fractal-noise filter for the fine grain on cards and stages. Rendered once per page. */
export const GrainDefs = () => (
  <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={3} stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>
);
export const Grain = ({ dark = false }: { dark?: boolean }) => (
  <svg className={dark ? "grain grain--dark" : "grain"} aria-hidden><rect width="100%" height="100%" filter="url(#grain)" /></svg>
);
