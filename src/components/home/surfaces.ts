import type { FinishId } from "@/content/types";

/** Pointer position across a stage, 0..1 on each axis. */
export type Light = { x: number; y: number };
export const REST: Light = { x: 0.32, y: 0.3 };

export const tilt = ({ x, y }: Light, rot = 0) =>
  `perspective(1400px) rotateX(${((0.5 - y) * 10).toFixed(2)}deg) rotateY(${((x - 0.5) * 14).toFixed(2)}deg)${rot ? ` rotate(${rot}deg)` : ""}`;

/** The shadow is its own blurred layer that only translates, so moving the light never repaints a box-shadow. */
export const shadowShift = ({ x, y }: Light, rot = 0) =>
  `translate(-50%, -50%) translate(${((0.5 - x) * 44).toFixed(1)}px, ${(30 + (0.5 - y) * 24).toFixed(1)}px)${rot ? ` rotate(${rot}deg)` : ""}`;

export const gloss = ({ x, y }: Light, strength: number, size: number) =>
  `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255,255,255,${strength}), transparent ${size}%)`;

export const foilGradient = ({ x }: Light) => {
  const p = 15 + x * 70;
  return `linear-gradient(105deg, #6E5020 0%, #B8934A ${(p - 22).toFixed(1)}%, #FFF1C4 ${p.toFixed(1)}%, #C7A35A ${(p + 18).toFixed(1)}%, #6E5020 100%)`;
};

export const uvGradient = ({ x }: Light) => {
  const p = 10 + x * 80;
  return `linear-gradient(105deg, #1C1C1C 0%, #1C1C1C ${(p - 16).toFixed(1)}%, #7A7A7A ${p.toFixed(1)}%, #1C1C1C ${(p + 16).toFixed(1)}%, #1C1C1C 100%)`;
};

export const embossFilter = ({ x, y }: Light) => {
  const ox = ((0.5 - x) * 3).toFixed(2), oy = ((0.5 - y) * 3).toFixed(2);
  return `drop-shadow(${-Number(ox)}px ${-Number(oy)}px 1px rgba(255,255,255,0.95)) drop-shadow(${ox}px ${oy}px 1.5px rgba(0,0,0,0.3))`;
};

export type FinishLook = { card: string; shadow: number; gloss: [number, number]; detail: string; dark: boolean; word: (l: Light) => { backgroundColor: string; backgroundImage: string } };

export const FINISHES: Record<FinishId, FinishLook> = {
  matte: { card: "#E9E5DD", shadow: 0.42, gloss: [0, 50], detail: "#6B655C", dark: false, word: () => ({ backgroundColor: "#2A2724", backgroundImage: "none" }) },
  soft: { card: "#2E2C2A", shadow: 0.55, gloss: [0.07, 90], detail: "#9B958B", dark: true, word: () => ({ backgroundColor: "#D8D2C7", backgroundImage: "none" }) },
  foil: { card: "#181716", shadow: 0.6, gloss: [0.16, 55], detail: "#8F8A82", dark: true, word: (l) => ({ backgroundColor: "transparent", backgroundImage: foilGradient(l) }) },
  uv: { card: "#141414", shadow: 0.6, gloss: [0.04, 60], detail: "#6F6F6F", dark: true, word: (l) => ({ backgroundColor: "transparent", backgroundImage: uvGradient(l) }) },
  emboss: { card: "#ECE8E1", shadow: 0.42, gloss: [0, 50], detail: "#8A8377", dark: false, word: () => ({ backgroundColor: "#ECE8E1", backgroundImage: "none" }) },
};
export const FINISH_ORDER: FinishId[] = ["matte", "soft", "foil", "uv", "emboss"];

/** Tracks the pointer over a stage and calls `apply` at most once per frame. */
export function trackPointer(apply: (l: Light) => void) {
  let raf = 0;
  let light = REST;
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; apply(light); }); };
  return {
    onPointerMove(e: React.PointerEvent<HTMLElement>) {
      const r = e.currentTarget.getBoundingClientRect();
      light = { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) };
      schedule();
    },
    onPointerLeave() { light = REST; schedule(); },
    current: () => light,
  };
}
