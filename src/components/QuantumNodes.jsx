import React, { useCallback, useEffect, useMemo, useRef } from 'react'

// ─── Helpers ───────────────────────────────────────────────────
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

function withAlpha(hexOrRgba, alpha) {
  if (/^rgba\(/i.test(hexOrRgba) || /^hsla\(/i.test(hexOrRgba)) return hexOrRgba
  const hex = hexOrRgba.trim()
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return hexOrRgba
  let r = 0, g = 0, b = 0
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else {
    r = parseInt(hex.slice(1, 3), 16)
    g = parseInt(hex.slice(3, 5), 16)
    b = parseInt(hex.slice(5, 7), 16)
  }
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`
}

function makeRng(seed) {
  let t = seed >>> 0
  return () => {
    t += 1831565813
    let x = t
    x = Math.imul(x ^ (x >>> 15), x | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

import { useTheme } from '../context/ThemeContext'

// ─── QuantumNodes — full-viewport fixed background ────────────
export default function QuantumNodes({
  mode = 'grid',
  nodeColorActive = '#96ffc8',
  nodeRadiusIdle = 1.5,
  nodeRadiusActive = 3,
  nodeOpacityIdle = 0.45,
  glowColor = '#96ffc8',
  glowStrength = 0.85,
  connectToCursor = true,
  cursorConnectDistance = 160,
  cursorLineColor = '#96ffc8',
  cursorLineWidth = 1,
  cursorLineOpacity = 0.18,
  connectNodes = true,
  nodeConnectDistance = 95,
  nodeLineWidth = 0.7,
  nodeLineOpacity = 0.12,
  maxNodeConnectionsPerNode = 3,
  gridSpacing = 60,
  jitter = 12,
}) {
  const { isDark } = useTheme()
  const nodeColorIdle = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'
  const nodeLineColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const nodesRef = useRef([])
  const mouseRef = useRef({ x: -99999, y: -99999, inside: false })
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const seed = useMemo(() => 1337, [])

  // ── Build node grid ─────────────────────────────────────────
  const rebuildNodes = useCallback(() => {
    const { w, h } = sizeRef.current
    if (w <= 2 || h <= 2) return
    const rng = makeRng(seed ^ (w * 73856093) ^ (h * 19349663))
    const nodes = []
    const j = clamp(jitter, 0, 200)
    const halfJ = j * 0.5
    const spacing = Math.max(8, gridSpacing)
    for (let y = spacing * 0.5; y <= h; y += spacing) {
      for (let x = spacing * 0.5; x <= w; x += spacing) {
        const dx = (rng() * j - halfJ) * 0.6
        const dy = (rng() * j - halfJ) * 0.6
        nodes.push({ x: clamp(x + dx, 0, w), y: clamp(y + dy, 0, h) })
      }
    }
    nodesRef.current = nodes
  }, [gridSpacing, jitter, seed])

  // ── Resize canvas to full window ─────────────────────────────
  const resize = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = clamp(window.devicePixelRatio || 1, 1, 3)
    sizeRef.current = { w, h, dpr }
    c.width = Math.floor(w * dpr)
    c.height = Math.floor(h * dpr)
    c.style.width = `${w}px`
    c.style.height = `${h}px`
    rebuildNodes()
  }, [rebuildNodes])

  // ── Draw one frame ───────────────────────────────────────────
  const drawFrame = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const { w, h, dpr } = sizeRef.current
    if (w <= 0 || h <= 0) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const nodes = nodesRef.current
    const mouse = mouseRef.current
    const maxCursorDist = Math.max(1, cursorConnectDistance)
    const maxNodeDist = Math.max(1, nodeConnectDistance)

    // Node-to-node connections
    if (connectNodes && nodes.length > 1) {
      const maxPer = clamp(Math.floor(maxNodeConnectionsPerNode), 1, 24)
      ctx.lineWidth = nodeLineWidth
      ctx.strokeStyle = nodeLineColor
      ctx.globalAlpha = 1

      const cellSize = maxNodeDist
      const cols = Math.max(1, Math.ceil(w / cellSize))
      const rows = Math.max(1, Math.ceil(h / cellSize))
      const buckets = new Array(cols * rows).fill(null).map(() => [])

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const cx = clamp(Math.floor(n.x / cellSize), 0, cols - 1)
        const cy = clamp(Math.floor(n.y / cellSize), 0, rows - 1)
        buckets[cy * cols + cx].push(i)
      }

      const connCount = new Array(nodes.length).fill(0)
      const offsets = [[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]]

      for (let i = 0; i < nodes.length; i++) {
        if (connCount[i] >= maxPer) continue
        const a = nodes[i]
        const acx = clamp(Math.floor(a.x / cellSize), 0, cols - 1)
        const acy = clamp(Math.floor(a.y / cellSize), 0, rows - 1)
        for (const [ox, oy] of offsets) {
          if (connCount[i] >= maxPer) break
          const nx = acx + ox, ny = acy + oy
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
          for (const j of buckets[ny * cols + nx]) {
            if (j <= i || connCount[i] >= maxPer || connCount[j] >= maxPer) continue
            const b = nodes[j]
            const dist = Math.hypot(b.x - a.x, b.y - a.y)
            if (dist > maxNodeDist) continue
            const t = 1 - dist / maxNodeDist
            ctx.globalAlpha = clamp(nodeLineOpacity * t, 0, 1)
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            connCount[i]++; connCount[j]++
          }
        }
      }
      ctx.globalAlpha = 1
    }

    // Cursor → node connections
    if (connectToCursor && mouse.inside) {
      ctx.lineWidth = cursorLineWidth
      ctx.strokeStyle = cursorLineColor
      for (const n of nodes) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y)
        if (d > maxCursorDist) continue
        const t = 1 - d / maxCursorDist
        ctx.globalAlpha = clamp(cursorLineOpacity * t, 0, 1)
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    // Nodes
    for (const n of nodes) {
      const d = mouse.inside ? Math.hypot(mouse.x - n.x, mouse.y - n.y) : Infinity
      const active = d < maxCursorDist
      const t = active ? clamp(1 - d / maxCursorDist, 0, 1) : 0
      const r = nodeRadiusIdle + (nodeRadiusActive - nodeRadiusIdle) * t

      if (t > 0) {
        ctx.save()
        ctx.globalAlpha = clamp(t * glowStrength, 0, 1)
        ctx.shadowColor = withAlpha(glowColor, 1)
        ctx.shadowBlur = 18 * (0.35 + t)
        ctx.fillStyle = withAlpha(glowColor, 0.9)
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 1.05, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      ctx.globalAlpha = active ? 1 : clamp(nodeOpacityIdle, 0, 1)
      ctx.fillStyle = active ? nodeColorActive : nodeColorIdle
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill()
    }
    ctx.globalAlpha = 1
  }, [
    connectNodes, connectToCursor, cursorConnectDistance, cursorLineColor,
    cursorLineOpacity, cursorLineWidth, glowColor, glowStrength,
    maxNodeConnectionsPerNode, nodeColorActive, nodeColorIdle,
    nodeConnectDistance, nodeLineColor, nodeLineOpacity, nodeLineWidth,
    nodeOpacityIdle, nodeRadiusActive, nodeRadiusIdle,
  ])

  // ── Animation loop ───────────────────────────────────────────
  const loop = useCallback(() => {
    drawFrame()
    rafRef.current = requestAnimationFrame(loop)
  }, [drawFrame])

  // ── Lifecycle ────────────────────────────────────────────────
  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current) }
  }, [loop])

  // Global mouse tracking (works even when canvas is pointer-events: none)
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, inside: true }
    }
    const onLeave = () => { mouseRef.current.inside = false }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
