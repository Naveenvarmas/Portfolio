// src/components/ParticleCanvas.jsx
// ─── Fixed fullscreen animated particle background ────────────────
import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ dark }) {
  const cvRef = useRef(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, pts = [], raf

    const resize = () => {
      W = cv.width = window.innerWidth
      H = cv.height = window.innerHeight
      pts = Array.from({ length: Math.floor(W * H / 16000) }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - .5) * .28,
        vy: (Math.random() - .5) * .28,
        r:  Math.random() * 1.4 + .3,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const c = dark ? '0,212,255' : '80,90,200'

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // draw connection lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${c},${(1 - d / 110) * .08})`
            ctx.lineWidth = .4
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
        // draw particle dot
        ctx.beginPath()
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c},.15)`
        ctx.fill()
        // move
        pts[i].x += pts[i].vx
        pts[i].y += pts[i].vy
        if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1
        if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1
      }
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [dark])

  return (
    <canvas
      ref={cvRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: .5 }}
    />
  )
}
