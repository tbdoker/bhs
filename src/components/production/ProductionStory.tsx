"use client";

import { useEffect, useRef, useState } from "react";
import type { Pair } from "@/content/types";
import { Check, Grain } from "../Icons";

const COLOR_BAR = ["#00AEEF", "#EC008C", "#FFE600", "#2B2A29", "#7FD6F7", "#F57FC5", "#FFF27F", "#8A8988"];

/**
 * The stage stays pinned while the steps scroll past. A step becomes active as it crosses the middle of the
 * screen, and the stage plays that step's own short animation (all CSS transitions, keyed off `is-on`).
 */
export default function ProductionStory({ steps }: { steps: Pair[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(Number((en.target as HTMLElement).dataset.step)); });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const layer = (i: number) => `layer${active === i ? " is-on" : i < active ? " is-before" : ""}`;

  return (
    <div className="prod">
      <div className="prod__stage" aria-hidden>
        <Grain />
        <div className={layer(0)}>
          <div className="cmyk"><i /><i /><i /><i /></div>
          <svg className="regmark" width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#161514" strokeWidth="1.2"><circle cx="22" cy="22" r="12" /><path d="M22 2v40M2 22h40" /></svg>
        </div>
        <div className={layer(1)}>
          <div className="sheets">
            <i /><i /><i />
            <div className="top">
              <span className="mark" style={{ width: 110, color: "#161514" }} />
              <div className="colorbar">{COLOR_BAR.map((c) => <b key={c} style={{ background: c }} />)}</div>
            </div>
          </div>
        </div>
        <div className={layer(2)}>
          <div className="foilcard">
            <span className="mark mark--foil" style={{ width: "58%" }} />
            <div className="foilcard__sweep" />
          </div>
        </div>
        <div className={layer(3)}>
          <svg className="dieline" viewBox="0 0 340 300" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path className="cut" pathLength={1000} d="M30 90 H310 V210 H30 Z M30 100 L12 108 V192 L30 200 M90 90 V40 Q90 26 104 26 H156 Q170 26 170 40 V90 M170 90 L180 60 H220 L230 90 M30 90 L40 60 H80 L90 90 M230 210 V260 Q230 274 244 274 H296 Q310 274 310 260 V210 M170 210 L180 240 H220 L230 210 M30 210 L40 240 H80 L90 210" />
            <path className="fold" pathLength={1000} d="M90 90 V210 M170 90 V210 M230 90 V210" />
          </svg>
        </div>
        <div className={layer(4)}>
          <div className="boxes">
            {[0, 1, 2].map((b) => <i key={b}><span className="mark" style={{ width: 52 }} /></i>)}
            <div className="check"><Check /></div>
          </div>
        </div>
        <div className="prod__count">0{active + 1} / 0{steps.length}</div>
        <div className="prod__bars">{steps.map((_, i) => <i key={i} className={i <= active ? "is-on" : undefined} />)}</div>
      </div>

      <div className="prod__steps">
        {steps.map(([name, desc], i) => (
          <article key={name} id={`adim-${i + 1}`} data-step={i} ref={(el) => { refs.current[i] = el; }} className={`prod-step${active === i ? " is-on" : ""}`}>
            <small>0{i + 1}</small>
            <h2>{name}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
