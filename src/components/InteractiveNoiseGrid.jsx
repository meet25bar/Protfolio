import { useEffect, useRef } from 'react'


export default function InteractiveNoiseGrid({
  dotSize        = 1.5,
  gridSpacing    = 34,
  noiseIntensity = 8,
  animationSpeed = 1.2,
  mouseRadius    = 160,
  dotColor       = 'rgba(0,212,255,0.22)',
  shapeType      = 'dot',
  className      = '',
  style          = {},
}) {
  const canvasRef        = useRef(null)
  const mouseRef         = useRef({ x: -1000, y: -1000 })
  const targetMouseRef   = useRef({ x: -1000, y: -1000 })
  const isMouseOverRef   = useRef(false)
  const animFrameRef     = useRef(null)
  const timeRef          = useRef(0)

  // keep latest props accessible inside the raf loop without restarting it
  const propsRef = useRef({})
  propsRef.current = { dotSize, gridSpacing, noiseIntensity, animationSpeed, mouseRadius, dotColor, shapeType }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── resize helper ──────────────────────────────────────────────────
    const fit = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = rect.height
    }
    fit()

    // ── Perlin-like noise ──────────────────────────────────────────────
    const hash = i => {
      i = i << 13 ^ i
      return ((i * (i * i * 15731 + 789221) + 1376312589) & 2147483647) / 2147483647
    }
    const fade = t => t * t * t * (t * (t * 6 - 15) + 10)
    const noise = (x, y, t) => {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const T = Math.floor(t) & 255
      const xf = x - Math.floor(x), yf = y - Math.floor(y)
      const u = fade(xf), v = fade(yf)
      const a = hash(X     + hash(Y     + hash(T)))
      const b = hash(X + 1 + hash(Y     + hash(T)))
      const c = hash(X     + hash(Y + 1 + hash(T)))
      const d = hash(X + 1 + hash(Y + 1 + hash(T)))
      return (a + u * (b - a)) + v * ((c + u * (d - c)) - (a + u * (b - a)))
    }

    // ── draw one shape ─────────────────────────────────────────────────
    const drawShape = (x, y, ds, type) => {
      ctx.lineWidth = ds * 0.5
      switch (type) {
        case 'plus':
          ctx.beginPath()
          ctx.moveTo(x - ds * 2, y); ctx.lineTo(x + ds * 2, y)
          ctx.moveTo(x, y - ds * 2); ctx.lineTo(x, y + ds * 2)
          ctx.stroke(); break
        case 'line':
          ctx.beginPath()
          ctx.moveTo(x - ds * 2, y); ctx.lineTo(x + ds * 2, y)
          ctx.stroke(); break
        case 'square':
          ctx.fillRect(x - ds, y - ds, ds * 2, ds * 2); break
        case 'diamond':
          ctx.beginPath()
          ctx.moveTo(x, y - ds * 1.5); ctx.lineTo(x + ds * 1.5, y)
          ctx.lineTo(x, y + ds * 1.5); ctx.lineTo(x - ds * 1.5, y)
          ctx.closePath(); ctx.fill(); break
        case 'cross':
          ctx.beginPath()
          ctx.moveTo(x - ds * 1.5, y - ds * 1.5); ctx.lineTo(x + ds * 1.5, y + ds * 1.5)
          ctx.moveTo(x + ds * 1.5, y - ds * 1.5); ctx.lineTo(x - ds * 1.5, y + ds * 1.5)
          ctx.stroke(); break
        case 'star':
          ctx.beginPath()
          for (let k = 0; k < 5; k++) {
            const a = k * 4 * Math.PI / 5 - Math.PI / 2
            const sx = x + Math.cos(a) * ds * 2, sy = y + Math.sin(a) * ds * 2
            k === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy)
          }
          ctx.closePath(); ctx.fill(); break
        default: // dot
          ctx.beginPath()
          ctx.arc(x, y, ds, 0, Math.PI * 2)
          ctx.fill(); break
      }
    }

    // ── main animation loop ────────────────────────────────────────────
    const animate = () => {
      const { dotSize, gridSpacing, noiseIntensity, animationSpeed, mouseRadius, dotColor, shapeType } = propsRef.current

      // clear to transparent — the app bg shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // smooth mouse lerp
      if (isMouseOverRef.current) {
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.18
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.18
      }

      ctx.fillStyle   = dotColor
      ctx.strokeStyle = dotColor

      const cols = Math.ceil(canvas.width  / gridSpacing)
      const rows = Math.ceil(canvas.height / gridSpacing)
      timeRef.current += 0.03 * animationSpeed

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const baseX = i * gridSpacing
          const baseY = j * gridSpacing

          // noise displacement
          const nx = noise(i * 0.1,       j * 0.1,       timeRef.current) * noiseIntensity
          const ny = noise(i * 0.1 + 100, j * 0.1 + 100, timeRef.current) * noiseIntensity
          let x = baseX + nx
          let y = baseY + ny

          // mouse repulsion
          if (isMouseOverRef.current) {
            const dx   = x - mouseRef.current.x
            const dy   = y - mouseRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < mouseRadius && dist > 0) {
              const easing = 1 - Math.pow(dist / mouseRadius, 2)
              const force  = easing * 28
              x += (dx / dist) * force
              y += (dy / dist) * force
            }
          }

          drawShape(x, y, dotSize, shapeType)
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // ── mouse events on WINDOW so repulsion works everywhere ───────────
    const onMouseMove = e => {
      const rect = canvas.getBoundingClientRect()
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      isMouseOverRef.current = true
    }
    const onMouseLeave = () => { isMouseOverRef.current = false }

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize',     fit)

    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(fit)
      ro.observe(canvas.parentElement)
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize',     fit)
      ro?.disconnect()
    }
  }, []) // single mount — props are read via propsRef inside the loop

  return (
    <div
      className={className}
      style={{
        position:      'absolute',
        inset:         0,
        overflow:      'hidden',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
