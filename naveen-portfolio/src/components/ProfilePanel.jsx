// src/components/ProfilePanel.jsx
// ─── Panel 1 — Profile section ───────────────────────────────────
// Left: Name, role, bio, buttons, socials, stats
// Right: Orbit system (avatar + 8 floating tech nodes with wire lines)
import { useState, useEffect, useRef, useCallback } from "react";
import { ORBIT_NODES, PROFILE_IMG, STATS } from "../data/constants";
import {
  Reveal,
  SocBtn,
  DownloadSvg,
  EmailSvg,
  PhoneSvg,
  LinkedinSvg,
  GithubSvg,
} from "./ui";

// ── Orbit wire canvas ─────────────────────────────────────────────
function OrbitCanvas({ wrapRef, positions, dark }) {
  const cvRef = useRef(null);
  const rafRef = useRef(null);
  const tick = useRef(0);
  const mids = useRef(null);

  useEffect(() => {
    const cv = cvRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap || !positions.length) return;
    cancelAnimationFrame(rafRef.current);

    const W = wrap.offsetWidth,
      H = wrap.offsetHeight;
    cv.width = W;
    cv.height = H;
    const cx = W / 2,
      cy = H / 2;

    if (!mids.current || mids.current.length !== positions.length) {
      mids.current = positions.map((p) => ({
        mx: (p.x + cx) / 2 + (Math.random() - 0.5) * 26,
        my: (p.y + cy) / 2 + (Math.random() - 0.5) * 26,
      }));
    }
    const m = mids.current;

    const draw = () => {
      cv.width = wrap.offsetWidth;
      cv.height = wrap.offsetHeight;
      const ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, cv.width, cv.height);
      const t = tick.current++;
      const pulse = (Math.sin(t * 0.025) + 1) / 2;

      positions.forEach((p, i) => {
        const nx = p.x,
          ny = p.y,
          mx = m[i].mx,
          my = m[i].my;
        const g = ctx.createLinearGradient(nx, ny, cx, cy);
        const a1 = dark ? 0.07 + pulse * 0.07 : 0.04 + pulse * 0.04;
        const a2 = dark ? 0.28 + pulse * 0.17 : 0.12 + pulse * 0.08;
        g.addColorStop(0, `rgba(0,212,255,${a1})`);
        g.addColorStop(0.5, `rgba(124,58,237,${a2})`);
        g.addColorStop(1, `rgba(0,229,160,${a1})`);
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.quadraticCurveTo(mx, my, cx, cy);
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.85 + pulse * 0.35;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -t * 0.7;
        ctx.stroke();
        ctx.setLineDash([]);
        // moving pulse dot
        const f = (t * 0.013 + i * 0.14) % 1;
        const bx = (1 - f) * (1 - f) * nx + 2 * (1 - f) * f * mx + f * f * cx;
        const by = (1 - f) * (1 - f) * ny + 2 * (1 - f) * f * my + f * f * cy;
        ctx.beginPath();
        ctx.arc(bx, by, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "rgba(0,212,255,.82)" : "rgba(100,80,220,.7)";
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [positions, dark, wrapRef]);

  return (
    <canvas
      ref={cvRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

// ── Individual tech node ──────────────────────────────────────────
function TechNode({ node, pos, dark, tv }) {
  const [hov, setHov] = useState(false);
  const NODE_SZ = 50;
  const inv = node.invert
    ? dark
      ? "invert(1) brightness(2)"
      : "none"
    : "none";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute",
        left: pos.x - NODE_SZ / 2,
        top: pos.y - NODE_SZ / 2,
        width: NODE_SZ,
        height: NODE_SZ,
        borderRadius: 12,
        background: tv.card,
        border: `1px solid ${hov ? "#00d4ff" : tv.bd}`,
        zIndex: hov ? 20 : 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        cursor: "pointer",
        boxShadow: hov
          ? "0 0 18px rgba(0,212,255,.3)"
          : "0 3px 16px rgba(0,0,0,.2)",
        transform: hov ? "scale(1.15)" : "scale(1)",
        transition: "border-color .25s, box-shadow .25s, transform .25s",
        animation: `floatN${node.id % 4} ${3.5 + node.id * 0.35}s ${node.id * 0.28}s ease-in-out infinite`,
      }}
    >
      <img
        src={node.src}
        alt={node.name}
        style={{
          width: 26,
          height: 26,
          objectFit: "contain",
          borderRadius: 4,
          filter: inv,
        }}
      />
      <span
        style={{
          fontSize: 7.5,
          fontWeight: 600,
          color: tv.muted,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {node.name}
      </span>
      {hov && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: tv.card,
            border: "1px solid #00d4ff",
            borderRadius: 10,
            padding: "9px 11px",
            minWidth: 130,
            maxWidth: 168,
            zIndex: 200,
            pointerEvents: "none",
            boxShadow: "0 6px 24px rgba(0,212,255,.12)",
            whiteSpace: "normal",
          }}
        >
          <strong
            style={{
              display: "block",
              fontSize: 11.5,
              fontWeight: 700,
              color: tv.head,
              marginBottom: 3,
            }}
          >
            {node.name}
          </strong>
          <span style={{ fontSize: 10, color: tv.muted, lineHeight: 1.5 }}>
            {node.desc}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Orbit panel (avatar + nodes + wires) ─────────────────────────
function OrbitPanel({ dark, tv }) {
  const wrapRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [imgErr, setImgErr] = useState(false);

  const computePositions = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const W = el.offsetWidth,
      H = el.offsetHeight;
    const cx = W / 2,
      cy = H / 2;
    const R1 = Math.min(W, H) * 0.27;
    const R2 = Math.min(W, H) * 0.43;
    const angles = [-90, -45, 0, 45, 90, 135, 180, -135];
    const radii = [R1, R2, R1, R2, R1, R2, R1, R2];
    setPositions(
      angles.map((a, i) => ({
        x: cx + radii[i] * Math.cos((a * Math.PI) / 180),
        y: cy + radii[i] * Math.sin((a * Math.PI) / 180),
      })),
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(computePositions, 120);
    window.addEventListener("resize", computePositions);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", computePositions);
    };
  }, [computePositions]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 400,
        height: 400,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <OrbitCanvas wrapRef={wrapRef} positions={positions} dark={dark} />

      {/* Center avatar */}
      <div
        style={{
          position: "absolute",
          width: 148,
          height: 148,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            background:
              "conic-gradient(from 180deg, rgba(0,212,255,.18), rgba(124,58,237,.1), transparent)",
            animation: "spinav 9s linear infinite reverse",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -5,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, #00d4ff, #7c3aed, #00e5a0, #00d4ff)",
            animation: "spinav 6s linear infinite",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: "50%",
            background: tv.bg,
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 6,
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 3,
            background: tv.bg3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!imgErr ? (
            <img
              src="public/images/profile.png"
              alt="Naveen Varma"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                background: `linear-gradient(135deg,${tv.bg3},${tv.bd})`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 38,
                  fontWeight: 700,
                  lineHeight: 1,
                  background: "linear-gradient(135deg,#00d4ff,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NV
              </span>
              <span
                style={{
                  fontSize: 8,
                  color: tv.muted,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                Add Photo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Floating tech nodes */}
      {positions.map((pos, i) => (
        <TechNode key={i} node={ORBIT_NODES[i]} pos={pos} dark={dark} tv={tv} />
      ))}
    </div>
  );
}

// ── ProfilePanel (exported) ───────────────────────────────────────
export default function ProfilePanel({ dark, tv, onResumeClick, goTo }) {
  const S = {
    section: {
      minHeight: "100vh",
      padding: "80px 68px 60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      zIndex: 1,
      overflow: "hidden",
      background: "transparent",
      fontFamily: "'Inter',sans-serif",
    },
    wrap: { maxWidth: 1060, width: "100%", margin: "0 auto" },
  };

  return (
    <section id="profile" style={S.section}>
      <div style={S.wrap}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* ── LEFT ── */}
          <div>
            {/* Badge */}
            <Reveal delay={0}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  background:
                    "linear-gradient(135deg,rgba(0,212,255,.1),rgba(124,58,237,.1))",
                  border: "1px solid rgba(0,212,255,.28)",
                  padding: "4px 13px",
                  borderRadius: 20,
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#00d4ff",
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#00d4ff",
                    flexShrink: 0,
                    display: "block",
                    animation: "pulsedot 2s infinite",
                  }}
                />
                Available for opportunities
              </div>
            </Reveal>

            {/* Name */}
            <Reveal delay={80}>
              <h1
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(48px,6.5vw,82px)",
                  fontWeight: 400,
                  lineHeight: 0.96,
                  letterSpacing: ".01em",
                  color: tv.head,
                  marginBottom: 10,
                }}
              >
                Sagiraju
                <br />
                <span
                  style={{
                    background: "linear-gradient(110deg,#00d4ff,#7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Naveen Varma
                </span>
              </h1>
            </Reveal>

            {/* Role */}
            <Reveal delay={160}>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: tv.muted,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "linear-gradient(90deg,#00d4ff,#7c3aed)",
                    borderRadius: 2,
                    flexShrink: 0,
                    display: "block",
                  }}
                />
                Full Stack Developer
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={240}>
              <p
                style={{
                  fontSize: 13.5,
                  color: tv.muted,
                  lineHeight: 1.82,
                  maxWidth: 390,
                  marginBottom: 26,
                }}
              >
                Building scalable, production-ready web applications using
                React, Node.js, and MongoDB — crafting digital experiences that
                solve real problems.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={320}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 26,
                }}
              >
                <PriBtn onClick={onResumeClick}>
                  <DownloadSvg /> Download Resume
                </PriBtn>
                <OutBtn tv={tv} onClick={() => goTo("projects")}>
                  View Projects →
                </OutBtn>
              </div>
            </Reveal>

            {/* Social icons */}
            <Reveal delay={400}>
              <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
                <SocBtn href="mailto:sagirajunaveenvarma@gmail.com" tv={tv}>
                  <EmailSvg />
                </SocBtn>
                <SocBtn href="tel:+919392368439" tv={tv}>
                  <PhoneSvg />
                </SocBtn>
                <SocBtn href="https://linkedin.com" tv={tv}>
                  <LinkedinSvg />
                </SocBtn>
                <SocBtn href="https://github.com/Naveenvarmas" tv={tv}>
                  <GithubSvg />
                </SocBtn>
              </div>
            </Reveal>

            {/* Stat boxes */}
            <Reveal delay={400}>
              <div style={{ display: "flex", gap: 9 }}>
                {STATS.map((s) => (
                  <div
                    key={s.l}
                    style={{
                      flex: 1,
                      background: tv.card,
                      border: `1px solid ${tv.bd}`,
                      borderRadius: 12,
                      padding: "11px 8px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#00d4ff",
                        lineHeight: 1,
                        marginBottom: 3,
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontSize: 9.5,
                        color: tv.muted,
                        textTransform: "uppercase",
                        letterSpacing: ".07em",
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — Orbit ── */}
          <Reveal delay={80} dir="right">
            <OrbitPanel dark={dark} tv={tv} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Local button helpers ──────────────────────────────────────────
function PriBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "linear-gradient(135deg,#00d4ff,#7c3aed)",
        color: "#fff",
        fontSize: 12.5,
        fontWeight: 600,
        padding: "10px 20px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "opacity .2s, transform .2s",
        opacity: hov ? 0.85 : 1,
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function OutBtn({ children, onClick, tv }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "transparent",
        fontSize: 12.5,
        fontWeight: 600,
        padding: "10px 20px",
        borderRadius: 10,
        border: `1px solid ${hov ? "#00d4ff" : tv.bd2}`,
        color: hov ? "#00d4ff" : tv.tx,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all .2s",
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      {children}
    </button>
  );
}
