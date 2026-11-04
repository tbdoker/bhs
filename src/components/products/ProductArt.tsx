import type { ProductId } from "@/content/types";

type S = React.CSSProperties;
const abs = (s: S): S => ({ position: "absolute", ...s });
const emboss = (light = 0.45, dark = 0.3): S => ({ display: "flex", filter: `drop-shadow(-1px -1px 1px rgba(255,255,255,${light})) drop-shadow(1px 1.5px 1.5px rgba(0,0,0,${dark}))` });
const Mark = ({ w, color, foil = false }: { w: number | string; color?: string; foil?: boolean }) => (
  <span className={foil ? "mark mark--foil" : "mark"} style={{ width: w, color }} />
);

/** Every product is drawn with the BHS mark, in the finish it would actually get. */
export default function ProductArt({ id }: { id: ProductId }) {
  switch (id) {
    case "card":
      return (
        <div className="art" style={{ width: 220, height: 150 }}>
          <div className="shadow-sm" style={abs({ left: 36, top: 0, width: 180, height: 116, borderRadius: 6, background: "#EFEBE3", transform: "rotate(8deg)" })} />
          <div style={abs({ left: 0, top: 30, width: 180, height: 116, borderRadius: 6, background: "#1A1918", transform: "rotate(-5deg)", boxShadow: "0 24px 36px -16px rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" })}>
            <Mark w={96} foil />
          </div>
        </div>
      );
    case "letter":
      return (
        <div className="art shadow-md" style={{ width: 150, height: 212, background: "#fff", borderRadius: 2, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 6, transform: "rotate(-3deg)" }}>
          <span style={{ marginBottom: 18 }}><Mark w={45} color="#161514" /></span>
          {["50%", "100%", "100%", "80%"].map((w, i) => <div key={i} style={{ height: 3, width: w, background: "#E2DDD3" }} />)}
          <div style={{ marginTop: "auto", height: 2, width: "30%", background: "#7E5326" }} />
        </div>
      );
    case "envelope":
      return (
        <div className="art" style={{ width: 230, height: 120, borderRadius: 3, background: "#EFEBE4", overflow: "hidden", boxShadow: "0 22px 34px -18px rgba(22,21,20,0.45)", transform: "rotate(-4deg)" }}>
          <div style={abs({ inset: 0, background: "#E3DED5", clipPath: "polygon(0 0, 100% 0, 50% 56%)" })} />
          <span style={abs({ right: 16, bottom: 12 })}><Mark w={45} color="#161514" /></span>
        </div>
      );
    case "catalog":
      return (
        <div className="art" style={{ width: 200, height: 220 }}>
          <div className="shadow-sm" style={abs({ right: 0, top: 0, width: 150, height: 200, borderRadius: "2px 6px 6px 2px", background: "#E9E5DD", transform: "rotate(7deg)" })} />
          <div style={abs({ left: 0, top: 16, width: 150, height: 200, borderRadius: "2px 6px 6px 2px", background: "#1F2A44", boxShadow: "inset 6px 0 0 rgba(0,0,0,0.25), 0 24px 36px -16px rgba(22,21,20,0.5)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 18px 20px 24px" })}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.24em", color: "rgba(244,242,238,0.7)" }}>2026</span>
            <Mark w={108} color="#F4F2EE" />
          </div>
        </div>
      );
    case "notebook":
      return (
        <div className="art shadow-md" style={{ width: 150, height: 200, borderRadius: 4, background: "#C4A27A", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(4deg)" }}>
          <div style={abs({ left: 12, right: 12, top: 10, display: "flex", justifyContent: "space-between" })}>
            {Array.from({ length: 6 }, (_, i) => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#8E7150" }} />)}
          </div>
          <span style={emboss()}><Mark w={96} color="#C4A27A" /></span>
        </div>
      );
    case "box":
      return (
        <div className="art" style={{ width: 190, height: 150, marginTop: 20 }}>
          <div style={abs({ inset: 0, borderRadius: 4, background: "#161514", boxShadow: "0 26px 40px -18px rgba(0,0,0,0.55)" })} />
          <div style={abs({ left: -6, right: -6, top: -14, height: 40, borderRadius: 4, background: "#222120", boxShadow: "0 6px 10px -6px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" })}>
            <Mark w={58} foil />
          </div>
        </div>
      );
    case "bag":
      return (
        <div className="art" style={{ width: 160, height: 210, marginTop: 30 }}>
          <div style={abs({ left: 40, top: -36, width: 80, height: 60, borderRadius: "40px 40px 0 0", boxShadow: "inset 0 0 0 4px #2B2A29" })} />
          <div style={abs({ inset: 0, background: "#F1EEE8", borderRadius: 2, boxShadow: "0 26px 40px -18px rgba(22,21,20,0.45), inset -24px 0 0 rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center" })}>
            <Mark w={102} color="#161514" />
          </div>
        </div>
      );
    case "label":
      return (
        <div className="art" style={{ width: 220, height: 160 }}>
          <div style={abs({ left: 0, top: 20, width: 120, height: 120, borderRadius: "50%", background: "#1F2A44", boxShadow: "0 20px 30px -14px rgba(22,21,20,0.5), inset 0 0 0 10px #1F2A44, inset 0 0 0 11px rgba(244,242,238,0.5)", display: "flex", alignItems: "center", justifyContent: "center" })}><Mark w={70} color="#F4F2EE" /></div>
          <div style={abs({ right: 0, top: 0, width: 96, height: 96, borderRadius: "50%", background: "#B48A5E", boxShadow: "0 16px 26px -12px rgba(22,21,20,0.45)", display: "flex", alignItems: "center", justifyContent: "center" })}><Mark w={54} color="#2B1E10" /></div>
          <div style={abs({ right: 18, bottom: 0, width: 110, height: 48, borderRadius: 6, background: "#fff", boxShadow: "0 14px 24px -12px rgba(22,21,20,0.4)", display: "flex", alignItems: "center", justifyContent: "center" })}><Mark w={45} color="#161514" /></div>
        </div>
      );
    case "invite":
      return (
        <div className="art" style={{ width: 220, height: 180 }}>
          <div style={abs({ left: 0, bottom: 0, width: 190, height: 100, borderRadius: 3, background: "#7E5326", boxShadow: "0 20px 30px -16px rgba(22,21,20,0.5)" })} />
          <div style={abs({ right: 0, top: 0, width: 130, height: 170, borderRadius: 3, background: "#FBFAF7", transform: "rotate(6deg)", boxShadow: "0 22px 34px -16px rgba(22,21,20,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 })}>
            <span style={emboss(1, 0.22)}><Mark w={83} color="#FBFAF7" /></span>
            <div style={{ width: 40, height: 1, background: "#C9A55A" }} />
          </div>
        </div>
      );
  }
}
