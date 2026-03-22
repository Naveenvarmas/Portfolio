// src/components/Navbar.jsx
// ─── Fixed top navigation bar + mobile drawer + side nav dots ────
import { useState } from 'react'
import { NAV_SECTIONS } from '../data/constants'

// ── Side nav dot ─────────────────────────────────────────────────
function NavDot({ id, label, activeSection, goTo, tv }) {
  const [hov, setHov] = useState(false)
  const active = activeSection === id
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => goTo(id)}
      style={{
        width: active ? 8 : 6, height: active ? 8 : 6,
        borderRadius: '50%',
        background: active || hov ? '#00d4ff' : tv.bd2,
        border: 'none', cursor: 'pointer', position: 'relative',
        boxShadow: active ? '0 0 10px rgba(0,212,255,.5)' : 'none',
        transform: hov && !active ? 'scale(1.5)' : 'none',
        transition: 'all .28s',
      }}
    >
      {(hov || active) && (
        <span style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          fontSize: 10.5, fontWeight: 500, color: tv.muted, whiteSpace: 'nowrap',
          pointerEvents: 'none', fontFamily: "'Inter',sans-serif",
        }}>
          {label}
        </span>
      )}
    </button>
  )
}

// ── Main Navbar component ─────────────────────────────────────────
export default function Navbar({ dark, setDark, activeSection, goTo, onResumeClick, tv }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id) => {
    goTo(id)
    setMenuOpen(false)
  }

  const MOB_ITEMS = [
    ...NAV_SECTIONS.map(id => ({
      id, label: id.charAt(0).toUpperCase() + id.slice(1),
      icon: id === 'profile' ? '👤' : id === 'about' ? '📖' : id === 'technologies' ? '⚙️' : '🚀',
    })),
    { id: 'modal', label: 'Resume', icon: '📄' },
  ]

  return (
    <>
      {/* ── Top bar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        background: tv.navbg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${tv.bd}`,
        transition: 'background .35s',
      }}>
        {/* Logo */}
        <div onClick={() => goTo('profile')} style={{
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18,
          color: tv.head, letterSpacing: '-.03em', cursor: 'pointer',
        }}>
          NV
          <span style={{
            background: 'linear-gradient(90deg,#00d4ff,#7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>.</span>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 2, marginRight: 8 }}>
            {NAV_SECTIONS.map(id => {
              const active = activeSection === id
              return (
                <DesktopNavBtn key={id} id={id} active={active} tv={tv} onClick={() => handleNav(id)} />
              )
            })}
          </div>

          {/* Theme toggle */}
          <button onClick={() => setDark(d => !d)} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: tv.bg3, border: `1px solid ${tv.bd}`,
            color: tv.tx, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, cursor: 'pointer', transition: 'border-color .2s',
          }}>
            {dark ? '🌙' : '☀️'}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={{
            width: 34, height: 34, borderRadius: 8,
            background: tv.bg3, border: `1px solid ${tv.bd}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 4, cursor: 'pointer',
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 16, height: 1.5,
                background: tv.tx, borderRadius: 2, transition: 'all .3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(5.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-5.5px) rotate(-45deg)' : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div style={{
        position: 'fixed', top: 60, right: 0, width: 185,
        background: tv.bg2,
        borderLeft: `1px solid ${tv.bd}`, borderBottom: `1px solid ${tv.bd}`,
        borderRadius: '0 0 0 14px', padding: 10, zIndex: 499,
        display: 'flex', flexDirection: 'column', gap: 3,
        transform: menuOpen ? 'translateX(0)' : 'translateX(105%)',
        transition: 'transform .32s cubic-bezier(.4,0,.2,1)',
      }}>
        {MOB_ITEMS.map(item => (
          <MobileNavItem key={item.id} item={item} tv={tv}
            onClick={() => {
              if (item.id === 'modal') onResumeClick()
              else handleNav(item.id)
            }}
          />
        ))}
      </div>

      {/* ── Side nav dots ── */}
      <nav style={{
        position: 'fixed', left: 18, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 7, zIndex: 100,
      }}>
        {NAV_SECTIONS.map(id => (
          <NavDot key={id} id={id} label={id.charAt(0).toUpperCase() + id.slice(1)}
            activeSection={activeSection} goTo={goTo} tv={tv} />
        ))}
      </nav>
    </>
  )
}

// ── Desktop nav button ────────────────────────────────────────────
function DesktopNavBtn({ id, active, tv, onClick }) {
  const [hov, setHov] = useState(false)
  const highlight = active || hov
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 8,
        background: 'none', border: 'none', cursor: 'pointer',
        color: highlight ? tv.head : tv.muted,
        position: 'relative', transition: 'color .2s', fontFamily: 'inherit',
      }}
    >
      {id.charAt(0).toUpperCase() + id.slice(1)}
      <span style={{
        position: 'absolute', bottom: 3,
        left: highlight ? 14 : '50%', right: highlight ? 14 : '50%',
        height: 1.5, background: '#00d4ff', borderRadius: 2,
        transition: 'left .25s, right .25s',
      }} />
    </button>
  )
}

// ── Mobile drawer item ────────────────────────────────────────────
function MobileNavItem({ item, tv, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '9px 11px', borderRadius: 8,
        fontSize: 12.5, fontWeight: 500,
        color: hov ? tv.head : tv.muted,
        background: hov ? tv.bg3 : 'none', border: 'none',
        textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all .18s',
      }}
    >
      <span style={{
        width: 24, height: 24, borderRadius: 6, background: tv.bg3,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
      }}>
        {item.icon}
      </span>
      {item.label}
    </button>
  )
}
