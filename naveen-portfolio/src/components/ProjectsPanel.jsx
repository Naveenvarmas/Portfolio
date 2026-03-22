// src/components/ProjectsPanel.jsx
// ─── Panel 4 — Projects section ──────────────────────────────────
// Two project cards with image boxes, tags, live/GitHub links
import { useState } from 'react'
import { PROJECTS } from '../data/constants'
import { Reveal, SectionTag, SectionTitle, GradSpan, ExternalSvg, GithubSvg } from './ui'

// ── Single project card ───────────────────────────────────────────
function ProjectCard({ project, dark, tv, delay }) {
  const [hov, setHov] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: tv.card,
        border: `1px solid ${hov ? 'rgba(0,212,255,.38)' : tv.bd}`,
        borderRadius: 18, overflow: 'hidden', position: 'relative',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? '0 20px 50px rgba(0,0,0,.18)' : 'none',
        transition: 'all .4s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {/* Top gradient accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: 'linear-gradient(90deg,#00d4ff,#7c3aed)', zIndex: 2 }} />

      {/* Hover glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 80% 20%,rgba(0,212,255,.05),transparent 58%)',
        opacity: hov ? 1 : 0, transition: 'opacity .45s',
      }} />

      {/* ── Image box ── */}
      <div style={{ width: '100%', height: 168, position: 'relative', overflow: 'hidden', background: tv.bg3 }}>
        {!imgErr
          ? (
            <img src={project.img} alt={project.imgAlt}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: hov ? 1 : .82,
                transform: hov ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform .5s cubic-bezier(.4,0,.2,1), opacity .3s',
              }}
              onError={() => setImgErr(true)}
            />
          ) : (
            /* Fallback gradient with project number + stack icons */
            <div style={{
              width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative',
              background: 'linear-gradient(135deg,rgba(0,212,255,.06),rgba(124,58,237,.07),rgba(0,229,160,.04))',
            }}>
              <span style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 80, lineHeight: 1,
                background: 'linear-gradient(110deg,rgba(0,212,255,.18),rgba(124,58,237,.12))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {project.num}
              </span>
              <div style={{ display: 'flex', gap: 7 }}>
                {project.stackIcons.map((src, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                  }}>
                    <img src={src} style={{ width: 20, height: 20, objectFit: 'contain' }} alt="" />
                  </div>
                ))}
              </div>
              <span style={{
                position: 'absolute', bottom: 10, right: 10,
                fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,.35)', background: 'rgba(0,0,0,.3)',
                padding: '3px 8px', borderRadius: 20,
              }}>
                {project.name} · 2025
              </span>
            </div>
          )
        }
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: tv.head, letterSpacing: '-.01em', marginBottom: 3 }}>
          {project.name}
        </div>
        <div style={{ fontSize: 10, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600, marginBottom: 10 }}>
          {project.year}
        </div>
        <div style={{ fontSize: 11.5, color: tv.muted, lineHeight: 1.72, marginBottom: 12 }}>
          {project.desc}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ background: tv.bg3, border: `1px solid ${tv.bd}`, borderRadius: 5, padding: '2px 7px', fontSize: 10, color: tv.tx, fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Card footer ── */}
      <div style={{ display: 'flex', gap: 7, padding: '12px 20px 16px', borderTop: `1px solid ${tv.bd}` }}>
        <LinkBtn href={project.live} variant="live">
          <ExternalSvg /> Live Demo
        </LinkBtn>
        <LinkBtn href={project.github} variant="ghost" tv={tv}>
          <GithubSvg /> GitHub
        </LinkBtn>
      </div>
    </div>
  )
}

// ── Link button ───────────────────────────────────────────────────
function LinkBtn({ href, variant, tv, children }) {
  const [hov, setHov] = useState(false)
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 8,
    transition: 'all .2s', textDecoration: 'none',
  }
  const styles = variant === 'live'
    ? { ...base, background: 'linear-gradient(135deg,#00d4ff,#7c3aed)', color: '#fff', opacity: hov ? .84 : 1 }
    : { ...base, background: tv?.bg3 || '#121620', border: `1px solid ${hov ? '#00d4ff' : tv?.bd2 || '#202638'}`, color: hov ? '#00d4ff' : tv?.tx || '#c8d2e8' }
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={styles}>
      {children}
    </a>
  )
}

// ── ProjectsPanel (exported) ──────────────────────────────────────
export default function ProjectsPanel({ dark, tv }) {
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
    <section id="projects" style={S.section}>
      <div style={S.wrap}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}>
          <div>
            <Reveal><SectionTag>My Work</SectionTag></Reveal>
            <Reveal delay={80}>
              <SectionTitle style={{ color: tv.head, marginBottom: 0 }}>
                Featured <GradSpan>Projects</GradSpan>
              </SectionTitle>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <GhostLink href="https://github.com/Naveenvarmas" tv={tv}>GitHub Profile →</GhostLink>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <ProjectCard project={p} dark={dark} tv={tv} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>
          <Reveal delay={200}>
            <GhostLink href="https://github.com/Naveenvarmas" tv={tv}>
              <GithubSvg /> See more projects on GitHub
            </GhostLink>
          </Reveal>
        </div>

      </div>
    </section>
  )
}

// ── Ghost outline link ────────────────────────────────────────────
function GhostLink({ href, tv, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent',
        fontSize: 12.5, fontWeight: 600, padding: '10px 20px', borderRadius: 10,
        border: `1px solid ${hov ? '#00d4ff' : tv.bd2}`,
        color: hov ? '#00d4ff' : tv.tx,
        textDecoration: 'none', transition: 'all .2s',
        transform: hov ? 'translateY(-1px)' : 'none',
      }}>
      {children}
    </a>
  )
}
