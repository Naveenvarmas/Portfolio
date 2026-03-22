// src/components/AboutPanel.jsx
// ─── Panel 2 — About section ─────────────────────────────────────
// Left: bio, quote, info grid, education card
// Right: 4 service cards
import { useState } from 'react'
import { INFO_ITEMS, SERVICES } from '../data/constants'
import { Reveal, SectionTag, SectionTitle, GradSpan } from './ui'

// ── Single service card ───────────────────────────────────────────
function ServiceCard({ num, icon, name, desc, bg, tv, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: tv.card, borderRadius: 13,
        border: `1px solid ${hov ? 'rgba(0,212,255,.3)' : tv.bd}`,
        padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12,
        transform: hov ? 'translateX(4px)' : 'none',
        transition: 'border-color .22s, transform .22s', cursor: 'default', marginBottom: 9,
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, background: bg }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: tv.muted, letterSpacing: '.06em', marginBottom: 2 }}>{num}</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: tv.head, marginBottom: 3 }}>{name}</div>
        <div style={{ fontSize: 11.5, color: tv.muted, lineHeight: 1.55 }}>{desc}</div>
      </div>
    </div>
  )
}

// ── AboutPanel (exported) ─────────────────────────────────────────
export default function AboutPanel({ tv }) {
  const S = {
    section: {
      minHeight: '100vh', padding: '80px 68px 60px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', zIndex: 1, overflow: 'hidden',
      background: tv.bg2, fontFamily: "'Inter',sans-serif",
    },
    wrap: { maxWidth: 1060, width: '100%', margin: '0 auto' },
  }

  return (
    <section id="about" style={S.section}>
      <div style={S.wrap}>
        <Reveal><SectionTag>About Me</SectionTag></Reveal>
        <Reveal delay={80}>
          <SectionTitle style={{ color: tv.head }}>
            Crafting digital experiences <GradSpan>with precision</GradSpan>
          </SectionTitle>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div>
            <Reveal delay={80}>
              <p style={{ fontSize: 13.5, color: tv.tx, lineHeight: 1.85, marginBottom: 14 }}>
                I'm <strong style={{ color: tv.head }}>Naveen Varma</strong>, a passionate Full Stack Developer
                with hands-on experience building scalable web applications. I specialize in the MERN stack —
                MongoDB, Express.js, React, and Node.js.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ fontSize: 13.5, color: tv.tx, lineHeight: 1.85, marginBottom: 14 }}>
                My journey started with curiosity about how the internet works. Today I craft efficient,
                clean code and intuitive interfaces that solve real problems and deliver great user experiences.
              </p>
            </Reveal>

            {/* Quote */}
            <Reveal delay={240}>
              <div style={{
                borderLeft: '3px solid #00d4ff', padding: '12px 16px', margin: '18px 0',
                background: 'linear-gradient(135deg,rgba(0,212,255,.04),transparent)',
                borderRadius: '0 8px 8px 0', fontStyle: 'italic', fontSize: 13, color: tv.muted,
              }}>
                "I believe in writing code that's not just functional, but also maintainable, scalable, and a joy to work with."
              </div>
            </Reveal>

            {/* Info grid */}
            <Reveal delay={240}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 18 }}>
                {INFO_ITEMS.map(item => (
                  <div key={item.label} style={{ background: tv.bg3, border: `1px solid ${tv.bd}`, borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: tv.muted, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: item.small ? 11 : 12.5, fontWeight: 600, color: item.green ? '#00e5a0' : tv.head }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Education card */}
            <Reveal delay={320}>
              <div style={{
                background: 'linear-gradient(135deg,rgba(0,212,255,.06),rgba(124,58,237,.06))',
                border: '1px solid rgba(0,212,255,.2)', borderRadius: 14, padding: 15, marginTop: 13,
              }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: tv.head, marginBottom: 3 }}>
                  Kakinada Institute of Engineering and Technology
                </div>
                <div style={{ fontSize: 11.5, color: tv.muted, marginBottom: 9 }}>
                  B.Tech in Computer Science &amp; Data Science · 2021–2025
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Kakinada, India', 'CGPA: 7.3', 'CS & Data Science'].map((tag, i) => (
                    <span key={tag} style={{
                      background: i === 1 ? 'rgba(0,229,160,.06)' : tv.bg3,
                      border: `1px solid ${i === 1 ? 'rgba(0,229,160,.3)' : tv.bd}`,
                      borderRadius: 5, padding: '2px 8px', fontSize: 10,
                      color: i === 1 ? '#00e5a0' : tv.tx,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — Services ── */}
          <div>
            {SERVICES.map(s => (
              <Reveal key={s.num} delay={s.delay}>
                <ServiceCard {...s} tv={tv} />
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
