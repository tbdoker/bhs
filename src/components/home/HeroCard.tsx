"use client";

import { useMemo, useRef } from "react";
import { Grain } from "../Icons";
import { REST, foilGradient, gloss, shadowShift, tilt, trackPointer, type Light } from "./surfaces";

/** A black business card with a hot-foil name. The foil highlight follows the pointer. */
export default function HeroCard({ label, name, role, hint }: { label: string; name: string; role: string; hint: string }) {
  const card = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);
  const foil = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);

  const pointer = useMemo(() => trackPointer((l: Light) => {
    if (card.current) card.current.style.transform = tilt(l, -3);
    if (shadow.current) shadow.current.style.transform = shadowShift(l, -3);
    if (shine.current) shine.current.style.background = gloss(l, 0.14, 55);
    if (foil.current) foil.current.style.backgroundImage = foilGradient(l);
    if (back.current) back.current.style.transform = `translate(${(18 + (l.x - 0.5) * -16).toFixed(1)}%, ${(-22 + (l.y - 0.5) * -10).toFixed(1)}%) rotate(9deg)`;
  }), []);

  return (
    <div className="stage" onPointerMove={pointer.onPointerMove} onPointerLeave={pointer.onPointerLeave}>
      <Grain />
      <div className="backcard" ref={back} aria-hidden style={{ transform: "translate(20.2%, -19.9%) rotate(9deg)" }} />
      <div className="tilt__shadow" ref={shadow} aria-hidden style={{ background: "rgba(0,0,0,0.5)", transform: shadowShift(REST, -3) }} />
      <div className="tilt" ref={card} role="img" aria-label={label} style={{ background: "#1A1918", transform: tilt(REST, -3) }}>
        <Grain dark />
        <div className="tilt__gloss" ref={shine} aria-hidden style={{ background: gloss(REST, 0.14, 55) }} />
        <div className="bizcard">
          <span className="mark bizcard__brand" />
          <div>
            <div className="bizcard__name" ref={foil} style={{ backgroundImage: foilGradient(REST) }}>{name}</div>
            <div className="bizcard__role">{role}</div>
          </div>
        </div>
      </div>
      <p className="stage__hint hide-touch">{hint}</p>
    </div>
  );
}
