// src/App.jsx
// ─── Root component — composes all panels and shared state ────────
import { useState, useEffect } from 'react'

import { useThemeVars } from './hooks'
import { NAV_SECTIONS } from './data/constants'

import ParticleCanvas        from './components/ParticleCanvas'
import Navbar                from './components/Navbar'
import ProfilePanel          from './components/ProfilePanel'
import AboutPanel            from './components/AboutPanel'
import TechnologiesPanel     from './components/TechnologiesPanel'
import ProjectsPanel         from './components/ProjectsPanel'
import { ResumeModal }       from './components/ui'

export default function App() {
  const [dark, setDark]               = useState(true)
  const [activeSection, setActive]    = useState('profile')
  const [modalOpen, setModalOpen]     = useState(false)
  const tv = useThemeVars(dark)

  // ── Inject global CSS once ───────────────────────────────────────
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'nv-global'
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; overflow-x: hidden; }
      body { font-family: 'Inter', sans-serif; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #202638; border-radius: 4px; }

      @keyframes spinav   { to { transform: rotate(360deg); } }
      @keyframes floatN0  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
      @keyframes floatN1  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
      @keyframes floatN2  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
      @keyframes floatN3  { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      @keyframes pulsedot { 0%,100% { box-shadow: 0 0 0 0 rgba(0,212,255,.4) } 50% { box-shadow: 0 0 0 5px rgba(0,212,255,0) } }
    `
    if (!document.getElementById('nv-global')) document.head.appendChild(style)
    return () => { const el = document.getElementById('nv-global'); if (el) el.remove() }
  }, [])

  // ── Track active section via IntersectionObserver ────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: .4 })
    NAV_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // ── Close modal on Escape key ────────────────────────────────────
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setModalOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // ── Smooth scroll helper ─────────────────────────────────────────
  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div style={{
      background: tv.bg, color: tv.tx,
      fontFamily: "'Inter',sans-serif",
      fontSize: 14, lineHeight: 1.65,
      transition: 'background .35s, color .35s',
      overflowX: 'hidden',
    }}>
      {/* ── Fixed background particles ── */}
      <ParticleCanvas dark={dark} />

      {/* ── Top nav bar + mobile drawer + side dots ── */}
      <Navbar
        dark={dark}
        setDark={setDark}
        activeSection={activeSection}
        goTo={goTo}
        onResumeClick={() => setModalOpen(true)}
        tv={tv}
      />

      {/* ══════════════════════════════
          4 PANEL SECTIONS
      ══════════════════════════════ */}

      {/* Panel 1 — Profile */}
      <ProfilePanel
        dark={dark}
        tv={tv}
        onResumeClick={() => setModalOpen(true)}
        goTo={goTo}
      />

      {/* Panel 2 — About */}
      <AboutPanel tv={tv} />

      {/* Panel 3 — Technologies */}
      <TechnologiesPanel dark={dark} tv={tv} />

      {/* Panel 4 — Projects */}
      <ProjectsPanel dark={dark} tv={tv} />

      {/* ── Resume modal ── */}
      <ResumeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tv={tv}
      />
    </div>
  )
}
