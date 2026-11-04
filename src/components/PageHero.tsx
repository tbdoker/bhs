export default function PageHero({ eyebrow, titleA, titleB, sub, center = false }: {
  eyebrow: string; titleA: string; titleB: string; sub?: string; center?: boolean;
}) {
  return (
    <section className={`page-top${center ? " center" : ""}`}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: 20 }}>{eyebrow}</p>
        <h1 className="display" style={{ maxWidth: 1000, margin: center ? "0 auto" : undefined }}>
          <span className="line">{titleA}</span>
          <span className="line line--soft">{titleB}</span>
        </h1>
        {sub && <p className="lead">{sub}</p>}
      </div>
    </section>
  );
}

export function CtaBlock({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="cta cta--compact">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
      {children}
    </section>
  );
}
