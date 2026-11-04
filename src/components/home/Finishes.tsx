"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Grain } from "../Icons";
import type { FinishId, Pair } from "@/content/types";
import { FINISHES, FINISH_ORDER, REST, embossFilter, gloss, shadowShift, tilt, trackPointer, type Light } from "./surfaces";

/** Pick a finish and move the light: the same BHS card answers the way that finish really does. */
export default function Finishes({ eyebrow, titleA, titleB, sub, tagline, finishes }: {
  eyebrow: string; titleA: string; titleB: string; sub: string; tagline: string; finishes: Record<FinishId, Pair>;
}) {
  const [finish, setFinish] = useState<FinishId>("foil");
  const finishRef = useRef(finish);
  const card = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  const paint = (l: Light) => {
    const f = FINISHES[finishRef.current];
    if (card.current) card.current.style.transform = tilt(l);
    if (shadow.current) shadow.current.style.transform = shadowShift(l);
    if (shine.current) shine.current.style.background = gloss(l, f.gloss[0], f.gloss[1]);
    if (word.current) Object.assign(word.current.style, f.word(l));
    if (wrap.current) wrap.current.style.filter = finishRef.current === "emboss" ? embossFilter(l) : "none";
  };
  const pointer = useMemo(() => trackPointer(paint), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { finishRef.current = finish; paint(pointer.current()); }, [finish]); // eslint-disable-line react-hooks/exhaustive-deps

  const f = FINISHES[finish];
  const [name, desc] = finishes[finish];

  return (
    <section className="night center">
      <div className="container" style={{ padding: 0 }}>
        <p className="eyebrow eyebrow--gold">{eyebrow}</p>
        <h2 className="headline" style={{ fontSize: "clamp(44px, 6.4vw, 92px)", letterSpacing: "-0.045em", lineHeight: 1 }}>
          <span className="line">{titleA}</span>
          <span className="line" style={{ color: "#8F8A82" }}>{titleB}</span>
        </h2>
        <p className="lead" style={{ marginTop: 28, maxWidth: 560 }}>{sub}</p>
        <div className="picker" role="group" aria-label={eyebrow}>
          {FINISH_ORDER.map((id) => (
            <button key={id} type="button" aria-pressed={finish === id} onClick={() => setFinish(id)}>{finishes[id][0]}</button>
          ))}
        </div>
        <div className="finish-stage" onPointerMove={pointer.onPointerMove} onPointerLeave={pointer.onPointerLeave}>
          <div className="tilt__shadow" ref={shadow} aria-hidden style={{ background: `rgba(0,0,0,${f.shadow})`, transform: shadowShift(REST) }} />
          <div className="tilt" ref={card} role="img" aria-label={name} style={{ background: f.card, transform: tilt(REST) }}>
            <Grain dark={f.dark} />
            <div className="tilt__gloss" ref={shine} aria-hidden style={{ background: gloss(REST, f.gloss[0], f.gloss[1]) }} />
            <div className="finish-card__face">
              <div ref={wrap} style={{ display: "flex", filter: finish === "emboss" ? embossFilter(REST) : "none" }}>
                <div className="mark finish-card__word" ref={word} style={f.word(REST)} />
              </div>
              <div className="finish-card__detail" style={{ color: f.detail }}>{tagline}</div>
            </div>
          </div>
        </div>
        <div className="finish-copy" aria-live="polite">
          <h3>{name}</h3>
          <p>{desc}</p>
        </div>
      </div>
    </section>
  );
}
