// src/components/ui.jsx
// ─── Shared UI primitives used across all panels ─────────────────
import { useState } from 'react'
import { useReveal } from '../hooks'

// ── Inline SVG icons ─────────────────────────────────────────────
export const DownloadSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
export const ExternalSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
export const GithubSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)
export const EmailSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
export const PhoneSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6z"/>
  </svg>
)
export const LinkedinSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

// ── Section tag (e.g. "About Me") ────────────────────────────────
export function SectionTag({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em',
      textTransform: 'uppercase', color: '#00d4ff', marginBottom: 10,
    }}>
      <span style={{ width: 16, height: 1.5, background: '#00d4ff', borderRadius: 2, flexShrink: 0, display: 'block' }} />
      {children}
    </div>
  )
}

// ── Section title ─────────────────────────────────────────────────
export function SectionTitle({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: "'Space Grotesk',sans-serif",
      fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700,
      letterSpacing: '-.02em', lineHeight: 1.12, marginBottom: 34, ...style,
    }}>
      {children}
    </h2>
  )
}

// ── Gradient text span ────────────────────────────────────────────
export function GradSpan({ children }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg,#00d4ff,#7c3aed)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>
      {children}
    </span>
  )
}

// ── Scroll-reveal wrapper ─────────────────────────────────────────
export function Reveal({ children, delay = 0, dir = 'up', style = {}, className = '' }) {
  const { ref, visible } = useReveal()
  const from = dir === 'right' ? 'translateX(22px)' : 'translateY(22px)'
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : from,
      transition: `opacity .65s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .65s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Social button (icon link) ─────────────────────────────────────
export function SocBtn({ href, tv, children }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: 9,
        background: tv.bg3, border: `1px solid ${hov ? '#00d4ff' : tv.bd}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#00d4ff' : tv.muted, transition: 'all .2s',
      }}>
      {children}
    </a>
  )
}

// ── Resume modal ──────────────────────────────────────────────────
export function ResumeModal({ open, onClose, tv }) {
  // close on Escape key
  // (effect is inside so it only runs when modal is mounted)
  if (!open) return null
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)',
        backdropFilter: 'blur(10px)', zIndex: 998,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
      <div style={{
        background: tv.bg2, border: `1px solid ${tv.bd2}`, borderRadius: 20, padding: 28,
        width: '90%', maxWidth: 440, position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12, width: 28, height: 28,
          background: tv.bg3, border: `1px solid ${tv.bd}`, borderRadius: 7,
          color: tv.muted, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, cursor: 'pointer',
        }}>✕</button>

        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: tv.head, marginBottom: 5 }}>
          📄 Download Resume
        </div>
        <div style={{ fontSize: 12, color: tv.muted, marginBottom: 18 }}>
          Sagiraju Naveen Varma · Full Stack Developer
        </div>

        {/* Preview */}
        <div style={{ background: tv.bg3, border: `1px solid ${tv.bd}`, borderRadius: 11, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: tv.head, marginBottom: 2 }}>
            Sagiraju Naveen Varma
          </div>
          <div style={{ fontSize: 11, color: '#00d4ff', marginBottom: 7 }}>Full Stack Developer · MERN Stack</div>
          {['📍 Bhimavaram, India', '📧 sagirajunaveenvarma@gmail.com', '📱 +91 9392368439'].map(l => (
            <div key={l} style={{ fontSize: 11, color: tv.muted, marginBottom: 2 }}>{l}</div>
          ))}
          <div style={{ fontSize: 11, color: tv.muted, marginTop: 9 }}>
            Skills: React · Node.js · Express.js · MongoDB · MySQL · JavaScript · Java · Tailwind · Zustand · Git
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <a href="naveen_resume.html" target="_blank" rel="noreferrer" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            background: 'linear-gradient(135deg,#00d4ff,#7c3aed)', color: '#fff',
            fontSize: 12.5, fontWeight: 600, padding: '10px 0', borderRadius: 10, textDecoration: 'none',
          }}>
            <DownloadSvg /> View &amp; Download
          </a>
          <button onClick={onClose} style={{
            background: 'transparent', border: `1px solid ${tv.bd2}`, color: tv.tx,
            fontSize: 12.5, fontWeight: 600, padding: '10px 18px', borderRadius: 10, cursor: 'pointer',
          }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
