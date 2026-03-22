// src/components/TechnologiesPanel.jsx
// ─── Panel 3 — Technologies section (5 tabbed categories) ────────
// Each tab shows: skill bars (left) + icon grid (right)
import { useState, useEffect } from 'react'
import { TECH_TABS } from '../data/constants'
import { Reveal, SectionTag, SectionTitle, GradSpan } from './ui'

// ── Skill bar row ─────────────────────────────────────────────────
function SkillRow({ skill, dark, tv, animate }) {
  const [hov, setHov] = useState(false)
  const inv = skill.invert ? (dark ? 'invert(1) brightness(2)' : 'none') : 'none'
  return (
    <li
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 11px',
        borderRadius: 9, border: `1px solid ${hov ? tv.bd : 'transparent'}`,
        background: hov ? tv.bg3 : 'transparent', transition: 'all .18s',
      }}
    >
      <div style={{ width: 26, height: 26, borderRadius: 7, background: tv.bg3, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {skill.src
          ? <img src={skill.src} alt={skill.name} style={{ width: 20, height: 20, objectFit: 'contain', filter: inv }} />
          : <span style={{ fontSize: 16 }}>{skill.emoji}</span>
        }
      </div>
      <span style={{ fontSize: 12.5, fontWeight: 500, flex: 1, color: tv.tx }}>{skill.name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 62, height: 3, background: tv.bd2, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg,#00d4ff,#7c3aed)', borderRadius: 2,
            transformOrigin: 'left',
            transform: animate ? `scaleX(${skill.pct / 100})` : 'scaleX(0)',
            transition: 'transform 1.1s cubic-bezier(.4,0,.2,1)',
          }} />
        </div>
        <span style={{
          fontSize: 10, color: hov ? '#00d4ff' : tv.muted, minWidth: 28,
          textAlign: 'right', opacity: hov ? 1 : 0, transition: 'opacity .18s', fontWeight: 600,
        }}>{skill.pct}%</span>
      </div>
    </li>
  )
}

// ── Icon card ─────────────────────────────────────────────────────
function IconCard({ tech, dark, tv }) {
  const [hov, setHov] = useState(false)
  const inv = tech.invert ? (dark ? 'invert(1) brightness(2)' : 'none') : 'none'
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: tv.card, border: `1px solid ${hov ? 'rgba(0,212,255,.4)' : tv.bd}`,
        borderRadius: 12, padding: '14px 10px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        cursor: 'pointer', position: 'relative', overflow: 'visible',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? '0 12px 28px rgba(0,0,0,.15)' : 'none',
        transition: 'all .28s',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(135deg,rgba(0,212,255,.05),rgba(124,58,237,.05))', opacity: hov ? 1 : 0, transition: 'opacity .28s', pointerEvents: 'none' }} />
      {tech.src
        ? <img src={tech.src} alt={tech.name} style={{ width: 30, height: 30, objectFit: 'contain', borderRadius: 6, position: 'relative', zIndex: 1, filter: inv }} />
        : <span style={{ fontSize: 24, lineHeight: 1, position: 'relative', zIndex: 1 }}>{tech.emoji}</span>
      }
      <span style={{ fontSize: 9.5, fontWeight: 600, color: tv.muted, textAlign: 'center', lineHeight: 1.2, position: 'relative', zIndex: 1 }}>
        {tech.name}
      </span>
      {hov && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 7px)', left: '50%', transform: 'translateX(-50%)',
          background: tv.card, border: '1px solid #00d4ff', borderRadius: 9, padding: '9px 11px',
          minWidth: 122, maxWidth: 158, zIndex: 50, pointerEvents: 'none',
          boxShadow: '0 5px 20px rgba(0,212,255,.12)', whiteSpace: 'normal',
        }}>
          <strong style={{ display: 'block', fontSize: 11, fontWeight: 700, color: tv.head, marginBottom: 2 }}>{tech.name}</strong>
          <span style={{ fontSize: 9.5, color: tv.muted, lineHeight: 1.5 }}>{tech.tip}</span>
        </div>
      )}
    </div>
  )
}

// ── Experience card (shown in Backend tab) ────────────────────────
function ExperienceCard({ tv }) {
  return (
    <div style={{ background: tv.card, border: `1px solid ${tv.bd}`, borderRadius: 13, padding: 16, marginTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: tv.head }}>
          Java Full Stack Developer Trainee
        </div>
        <div style={{ fontSize: 9.5, padding: '2px 8px', borderRadius: 20, background: 'rgba(0,212,255,.1)', border: '1px solid rgba(0,212,255,.22)', color: '#00d4ff' }}>
          Jun–Dec 2025
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: tv.muted, marginBottom: 9 }}>Codegnan IT Solutions</div>
      <ul style={{ listStyle: 'none' }}>
        {[
          'Built web applications using React & backend technologies',
          'Developed RESTful APIs with database integration',
          'Version control with Git & GitHub collaboration',
        ].map(pt => (
          <li key={pt} style={{ fontSize: 11.5, color: tv.tx, paddingLeft: 12, position: 'relative', lineHeight: 1.55, marginBottom: 3 }}>
            <span style={{ position: 'absolute', left: 0, color: '#00d4ff', fontWeight: 700 }}>›</span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── TechnologiesPanel (exported) ──────────────────────────────────
export default function TechnologiesPanel({ dark, tv }) {
  const [activeTab, setActiveTab] = useState('frontend')
  const [animatedCats, setAnimatedCats] = useState({})

  // trigger bar animation when section scrolls into view
  useEffect(() => {
    const el = document.getElementById('technologies')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setAnimatedCats(p => ({ ...p, [activeTab]: true }))
    }, { threshold: .2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [activeTab])

  const switchTab = (id) => {
    setActiveTab(id)
    setAnimatedCats(p => ({ ...p, [id]: false }))
    setTimeout(() => setAnimatedCats(p => ({ ...p, [id]: true })), 60)
  }

  const currentTab = TECH_TABS.find(t => t.id === activeTab)

  const S = {
    section: {
      minHeight: '100vh', padding: '80px 68px 60px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', zIndex: 1, overflow: 'hidden',
      background: tv.bg, fontFamily: "'Inter',sans-serif",
    },
    wrap: { maxWidth: 1060, width: '100%', margin: '0 auto' },
  }

  return (
    <section id="technologies" style={S.section}>
      <div style={S.wrap}>
        <Reveal><SectionTag>Tech Stack</SectionTag></Reveal>
        <Reveal delay={80}>
          <SectionTitle style={{ color: tv.head }}>
            Technologies &amp; <GradSpan>Tools</GradSpan>
          </SectionTitle>
        </Reveal>

        {/* ── Tab strip ── */}
        <Reveal delay={160}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {TECH_TABS.map(tab => {
              const active = activeTab === tab.id
              return (
                <TabButton key={tab.id} tab={tab} active={active} tv={tv} onClick={() => switchTab(tab.id)} />
              )
            })}
          </div>
        </Reveal>

        {/* ── Active panel ── */}
        {currentTab && (
          <Reveal delay={240}>
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 40, alignItems: 'start' }}>

              {/* Skill bars */}
              <div>
                <div style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.12em', color: '#00d4ff',
                  marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {currentTab.label}
                  <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${tv.bd},transparent)`, display: 'block' }} />
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {currentTab.skills.map(sk => (
                    <SkillRow key={sk.name} skill={sk} dark={dark} tv={tv} animate={!!animatedCats[activeTab]} />
                  ))}
                </ul>
                {/* Experience card only in Backend tab */}
                {currentTab.experience && <ExperienceCard tv={tv} />}
              </div>

              {/* Icon grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                {currentTab.icons.map(ic => (
                  <IconCard key={ic.name} tech={ic} dark={dark} tv={tv} />
                ))}
              </div>

            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

// ── Tab button ────────────────────────────────────────────────────
function TabButton({ tab, active, tv, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '8px 18px', borderRadius: 30, fontSize: 12.5, fontWeight: 600,
        background: active ? 'linear-gradient(135deg,rgba(0,212,255,.14),rgba(124,58,237,.14))' : tv.bg3,
        border: `1px solid ${active ? 'rgba(0,212,255,.5)' : hov ? '#00d4ff' : tv.bd}`,
        color: active ? '#00d4ff' : hov ? tv.head : tv.muted,
        boxShadow: active ? '0 0 14px rgba(0,212,255,.1)' : 'none',
        cursor: 'pointer', fontFamily: 'inherit', transition: 'all .22s',
      }}
    >
      <span style={{ fontSize: 15 }}>{tab.icon}</span> {tab.label}
    </button>
  )
}
