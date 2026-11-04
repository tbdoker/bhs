"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Chevron } from "../Icons";
import type { StatementSegment } from "@/content/types";

const DIM = 0.14;

/** One editorial sentence through the five stages. Words light up in ink as the paragraph passes through the screen. */
export default function Statement({ eyebrow, segments, linkLabel, linkHref }: {
  eyebrow: string; segments: StatementSegment[]; linkLabel: string; linkHref: string;
}) {
  const words = useMemo(() => segments.flatMap(([text, stage]) => {
    const parts = text.split(" ");
    return parts.map((w, j) => ({ text: w, stage, no: stage && j === parts.length - 1 ? `0${stage}` : "" }));
  }), [segments]);
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      if (!box.current) return;
      const vh = window.innerHeight;
      const r = box.current.getBoundingClientRect();
      // Starts as the paragraph's top reaches 85% of the screen, finishes as its bottom reaches 45%
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.4 + r.height)));
      const n = words.length;
      els.current.forEach((el, i) => {
        if (el) el.style.opacity = (DIM + (1 - DIM) * Math.min(1, Math.max(0, p * (n + 2) - i))).toFixed(3);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [words]);

  return (
    <section className="statement">
      <div className="statement__inner" ref={box}>
        <p className="eyebrow" style={{ marginBottom: 28 }}>{eyebrow}</p>
        <p className="statement__text">
          <span className="sr-only">{segments.map((s) => s[0]).join(" ")}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden ref={(el) => { els.current[i] = el; }} className={w.stage ? "statement__word statement__word--stage" : "statement__word"}>
              {w.text}{w.no && <sup>{w.no}</sup>}
            </span>
          ))}
        </p>
        <Link className="btn btn--dark" href={linkHref}>{linkLabel}<Chevron /></Link>
      </div>
    </section>
  );
}
