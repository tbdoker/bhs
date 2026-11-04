import Link from "next/link";
import { Chevron } from "../Icons";
import { REFERENCES } from "@/content";

/**
 * Endless, slow logo band. Pure CSS: the track holds two identical halves and slides by exactly 50%,
 * so the loop has no seam and runs off the main thread. Only the first set is announced and focusable.
 */
export default function LogoStrip({ eyebrow, linkLabel, linkHref }: { eyebrow: string; linkLabel: string; linkHref: string }) {
  const COPIES = 6; // even, so both halves match
  const items = Array.from({ length: COPIES }, (_, copy) => REFERENCES.map((r) => ({ ...r, copy }))).flat();
  return (
    <section className="strip">
      <div className="strip__head">
        <p className="eyebrow">{eyebrow}</p>
        <Link className="link-arrow" href={linkHref}>{linkLabel}<Chevron size={13} /></Link>
      </div>
      <div className="marquee" role="region" aria-label={eyebrow}>
        <div className="marquee__track">
          {items.map((r, i) => {
            const first = r.copy === 0;
            return (
              <Link key={i} className="marquee__item" href={linkHref} aria-hidden={first ? undefined : true} tabIndex={first ? undefined : -1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="reflogo" src={r.src} alt={first ? r.name : ""} width={r.w} height={r.h} style={{ maxHeight: r.strip }} loading="lazy" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
