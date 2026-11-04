"use client";

import { useState } from "react";
import { Check } from "../Icons";
import type { Dictionary } from "@/content/types";

type T = Dictionary["contact"];

export default function ContactForm({ t, locale }: { t: T; locale: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, locale }) });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="thanks" role="status">
        <div className="thanks__icon"><Check /></div>
        <h2>{t.thanksTitle}</h2>
        <p>{t.thanksSub}</p>
        <button className="btn btn--ghost" type="button" style={{ height: 44, fontSize: 15 }} onClick={() => setState("idle")}>{t.again}</button>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <h2>{t.formTitle}</h2>
      <label className="field">{t.name}<input name="name" type="text" autoComplete="name" required /></label>
      <label className="field">{t.company}<input name="company" type="text" autoComplete="organization" /></label>
      <label className="field">{t.email}<input name="email" type="email" autoComplete="email" autoCapitalize="none" required /></label>
      <label className="field">{t.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" /></label>
      <label className="field field--wide">{t.topic}
        <select name="topic" defaultValue={t.topics[0]}>{t.topics.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field field--wide">{t.message}<textarea name="message" rows={5} required /></label>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>{t.kvkkBefore}<a href="#">{t.kvkkLink}</a>{t.kvkkAfter}</span>
      </label>
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 16 }}>
        <button className="btn btn--dark" type="submit" disabled={state === "sending"} style={{ padding: "0 32px" }}>{t.send}</button>
        {state === "error" && <span role="alert" style={{ fontSize: 14, color: "#9B2C1F" }}>{locale === "tr" ? "Mesaj gönderilemedi, lütfen tekrar deneyin." : "Your message couldn't be sent. Please try again."}</span>}
      </div>
    </form>
  );
}
