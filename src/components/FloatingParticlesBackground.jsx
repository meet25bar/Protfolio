import { useEffect, useRef, useCallback } from 'react'

/**
 * FloatingParticlesBackground
 * Ported from the Framer component by the same name.
 * Renders a canvas-based floating dust particles animation with
 * mouse-influence (attract / repel), glow, and boundary-wrapping.
 *
 * Props:
 *   particleCount       {number}  – default 80
 *   particleSize        {number}  – max radius in px, default 2
 *   particleOpacity     {number}  – 0–1, default 0.55
 *   glowIntensity       {number}  – shadow-blur px, default 12
 *   glowAnimation       {string}  – "instant" | "ease" | "spring", default "ease"
 *   movementSpeed       {number}  – default 0.4
 *   mouseInfluence      {number}  – px radius, default 130
 *   particleColor       {string}  – CSS color, default "#00d4ff"
 *   mouseGravity        {string}  – "none" | "attract" | "repel", default "repel"
 *   gravityStrength     {number}  – default 60
 *   particleInteraction {boolean} – enable collision, default false
 *   interactionType     {string}  – "bounce" | "merge", default "bounce"
 *   className           {string}  – extra class names for the wrapper div
 *   style               {object}  – extra inline styles for the wrapper div
 */
export default function FloatingParticlesBackground({
  particleCount      = 80,
  particleSize       = 2,
  particleOpacity    = 0.55,
  glowIntensity      = 12,
  glowAnimation      = 'ease',
  movementSpeed      = 0.4,
  mouseInfluence     = 130,
  particleColor      = '#00d4ff',
  mouseGravity       = 'repel',
  gravityStrength    = 60,
  particleInteraction = false,
  interactionType    = 'bounce',
  className          = '',
  style              = {},
}) {
  const canvasRef      = useRef(null)
  const containerRef   = useRef(null)
  const animationRef   = useRef(null)
  const mouseRef       = useRef({ x: -9999, y: -9999 })
  const particlesRef   = useRef([])

  // ── helpers stored in refs so animate loop always has fresh values ──
  const propsRef = useRef({})
  propsRef.current = {
    particleCount, particleSize, particleOpacity, glowIntensity,
    glowAnimation, movementSpeed, mouseInfluence, particleColor,
    mouseGravity, gravityStrength, particleInteraction, interactionType,
  }

  // ── initialise / reinitialise particles ──────────────────────────────
  const initParticles = useCallback((width, height) => {
    const { particleCount, particleSize, particleOpacity, movementSpeed } = propsRef.current
    particlesRef.current = Array.from({ length: particleCount }, (_, id) => ({
      x:           Math.random() * width,
      y:           Math.random() * height,
      vx:          (Math.random() - 0.5) * movementSpeed,
      vy:          (Math.random() - 0.5) * movementSpeed,
      size:        Math.random() * particleSize + 1,
      opacity:     particleOpacity,
      baseOpacity: particleOpacity,
      mass:        Math.random() * 0.5 + 0.5,
      glowMul:     1,
      glowVel:     0,
      id,
    }))
  }, [])

  // ── physics update ────────────────────────────────────────────────────
  const update = useCallback((canvas) => {
    const {
      mouseInfluence, mouseGravity, gravityStrength,
      glowAnimation, particleInteraction, interactionType,
    } = propsRef.current
    const rect  = canvas.getBoundingClientRect()
    const mouse = mouseRef.current

    particlesRef.current.forEach((p, i) => {
      // mouse influence
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < mouseInfluence && dist > 0) {
        const force      = (mouseInfluence - dist) / mouseInfluence
        const nx         = dx / dist
        const ny         = dy / dist
        const gf         = force * (gravityStrength * 0.001)

        if (mouseGravity === 'attract') { p.vx += nx * gf; p.vy += ny * gf }
        if (mouseGravity === 'repel')   { p.vx -= nx * gf; p.vy -= ny * gf }

        p.opacity = Math.min(1, p.baseOpacity + force * 0.4)

        const targetGlow = 1 + force * 2
        applyGlowAnim(p, targetGlow, glowAnimation)
      } else {
        p.opacity = Math.max(p.baseOpacity * 0.3, p.opacity - 0.02)
        applyGlowAnim(p, 1, glowAnimation, true)
      }

      // particle–particle interaction
      if (particleInteraction) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const o    = particlesRef.current[j]
          const ddx  = o.x - p.x
          const ddy  = o.y - p.y
          const ddist = Math.sqrt(ddx * ddx + ddy * ddy)
          const minD = p.size + o.size + 5

          if (ddist < minD && ddist > 0) {
            if (interactionType === 'bounce') {
              const nx = ddx / ddist; const ny = ddy / ddist
              const rvx = p.vx - o.vx;  const rvy = p.vy - o.vy
              const speed = rvx * nx + rvy * ny
              if (speed < 0) continue
              const imp = 2 * speed / (p.mass + o.mass)
              p.vx -= imp * o.mass * nx; p.vy -= imp * o.mass * ny
              o.vx += imp * p.mass * nx; o.vy += imp * p.mass * ny
              const ov = (minD - ddist) * 0.5
              p.x -= nx * ov; p.y -= ny * ov
              o.x += nx * ov; o.y += ny * ov
            } else {
              const mf = (minD - ddist) / minD
              p.glowMul = (p.glowMul || 1) + mf * 0.5
              o.glowMul = (o.glowMul || 1) + mf * 0.5
              const af = mf * 0.01
              p.vx += ddx * af; p.vy += ddy * af
              o.vx -= ddx * af; o.vy -= ddy * af
            }
          }
        }
      }

      // integrate
      p.x += p.vx; p.y += p.vy
      p.vx += (Math.random() - 0.5) * 0.001
      p.vy += (Math.random() - 0.5) * 0.001
      p.vx *= 0.999; p.vy *= 0.999

      // boundary wrap
      if (p.x < 0)          p.x = rect.width
      if (p.x > rect.width) p.x = 0
      if (p.y < 0)          p.y = rect.height
      if (p.y > rect.height) p.y = 0
    })
  }, [])

  // ── draw ──────────────────────────────────────────────────────────────
  const draw = useCallback((ctx) => {
    const { particleColor, glowIntensity } = propsRef.current
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    particlesRef.current.forEach(p => {
      ctx.save()
      ctx.shadowColor = particleColor
      ctx.shadowBlur  = glowIntensity * (p.glowMul || 1) * 2
      ctx.globalAlpha = p.opacity
      ctx.fillStyle   = particleColor
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }, [])

  // ── animation loop ────────────────────────────────────────────────────
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    update(canvas)
    draw(ctx)
    animationRef.current = requestAnimationFrame(animate)
  }, [update, draw])

  // ── resize ────────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const { width, height } = container.getBoundingClientRect()
    canvas.width  = width
    canvas.height = height
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach(p => {
        p.x = Math.random() * width
        p.y = Math.random() * height
      })
    }
  }, [])

  // ── mount / cleanup ───────────────────────────────────────────────────
  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    resizeCanvas()
    initParticles(canvas.width, canvas.height)
    animate()

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize',     resizeCanvas)

    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(resizeCanvas)
      ro.observe(container)
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize',     resizeCanvas)
      ro?.disconnect()
    }
  }, [animate, resizeCanvas, initParticles])

  // Re-init when count changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    initParticles(canvas.width, canvas.height)
  }, [particleCount, initParticles])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
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

// ── glow animation helper ─────────────────────────────────────────────────
function applyGlowAnim(p, target, mode, returning = false) {
  const cur = p.glowMul || 1
  if (mode === 'instant') {
    p.glowMul = target
  } else if (mode === 'ease') {
    const speed = returning ? 0.08 : 0.15
    p.glowMul = Math.max(1, cur + (target - cur) * speed)
  } else if (mode === 'spring') {
    const sf = (target - cur) * (returning ? 0.15 : 0.2)
    const d  = returning ? 0.9 : 0.85
    p.glowVel = (p.glowVel || 0) * d + sf
    p.glowMul = Math.max(1, cur + p.glowVel)
  }
}
