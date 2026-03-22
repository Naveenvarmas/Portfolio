// src/hooks/index.js
// ─── Shared custom hooks ──────────────────────────────────────────
import { useState, useEffect, useRef } from 'react'

/**
 * useReveal — triggers visibility when element scrolls into view.
 * Returns { ref, visible } to attach to any element.
 */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

/**
 * useThemeVars — maps dark boolean to design token object.
 * Every component imports this instead of duplicating color logic.
 */
export function useThemeVars(dark) {
  return {
    bg:    dark ? '#07090e' : '#f0f3fb',
    bg2:   dark ? '#0c0f17' : '#ffffff',
    bg3:   dark ? '#121620' : '#e5e9f5',
    bd:    dark ? '#181d2a' : '#ccd2e8',
    bd2:   dark ? '#202638' : '#b0b8d4',
    tx:    dark ? '#c8d2e8' : '#1c2136',
    muted: dark ? '#556070' : '#6878a0',
    head:  dark ? '#ffffff' : '#080c1a',
    card:  dark ? '#0c0f17' : '#ffffff',
    navbg: dark ? 'rgba(7,9,14,.95)' : 'rgba(240,243,251,.95)',
  }
}
