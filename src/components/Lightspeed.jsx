import React, { useEffect, useRef, useState } from 'react'

const DEFAULT_FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform float intensity;
uniform float particleCount;
uniform vec3 colorShift;

#define FC gl_FragCoord.xy
#define R  resolution
#define T  time

float rnd(float a) {
  vec2 p = fract(a * vec2(12.9898, 78.233));
  p += dot(p, p*345.);
  return fract(p.x * p.y);
}

vec3 hue(float a) {
  return colorShift * (.6+.6*cos(6.3*(a)+vec3(0,83,21)));
}

vec3 pattern(vec2 uv) {
  vec3 col = vec3(0.);
  for (float i=.0; i<particleCount; i++) {
    float a = rnd(i);
    vec2 n = vec2(a, fract(a*34.56));
    vec2 p = sin(n*(T+7.) + T*.5);
    float d = dot(uv-p, uv-p);
    col += (intensity * .00125)/d * hue(dot(uv,uv) + i*.125 + T);
  }
  return col;
}

void main(void) {
  vec2 uv = (FC - .5 * R) / min(R.x, R.y);
  vec3 col = vec3(0.);
  float s = 2.4;
  float a = atan(uv.x, uv.y);
  float b = length(uv);
  uv = vec2(a * 5. / 6.28318, .05 / tan(b) + T);
  uv = fract(uv) - .5;
  col += pattern(uv * s);
  
  // Blend with transparent alpha instead of solid black backdrop
  float alpha = clamp(max(max(col.r, col.g), col.b), 0.0, 1.0);
  O = vec4(col, alpha);
}`

const DEFAULT_VERT = `#version 300 es
precision highp float;
in vec2 position;
void main(){
  gl_Position = vec4(position, 0.0, 1.0);
}`

export default function Lightspeed(props) {
  const {
    paused = false,
    speed = 0.5, // slightly slower for background subtlety
    intensity = 1.2,
    particleCount = 18,
    colorR = 0.3, // custom tint to match cyan/violet theme
    colorG = 0.6,
    colorB = 1.0,
    quality = "medium",
    onWebGLInitResult
  } = props

  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const buffersRef = useRef({ vbo: null })
  const uniformsRef = useRef({
    time: null,
    resolution: null,
    intensity: null,
    particleCount: null,
    colorShift: null
  })
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const [webglOk, setWebglOk] = useState(true)

  const qualitySettings = {
    low: { dpr: 0.5, targetFps: 30 },
    medium: { dpr: 1, targetFps: 60 },
    high: { dpr: 1.5, targetFps: 60 }
  }
  const currentQuality = qualitySettings[quality] || qualitySettings.medium

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance"
    })

    if (!gl) {
      setWebglOk(false)
      if (onWebGLInitResult) onWebGLInitResult(false)
      return
    }

    setWebglOk(true)
    if (onWebGLInitResult) onWebGLInitResult(true)
    glRef.current = gl

    const compile = (type, src) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(sh) || "Shader compile error"
        gl.deleteShader(sh)
        throw new Error(info)
      }
      return sh
    }

    const link = (vs, fs) => {
      const prog = gl.createProgram()
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(prog) || "Program link error"
        gl.deleteProgram(prog)
        throw new Error(info)
      }
      return prog
    }

    let vs = null
    let fs = null
    let prog = null
    try {
      vs = compile(gl.VERTEX_SHADER, DEFAULT_VERT)
      fs = compile(gl.FRAGMENT_SHADER, DEFAULT_FRAG)
      prog = link(vs, fs)
    } catch (err) {
      setWebglOk(false)
      if (onWebGLInitResult) onWebGLInitResult(false)
      return
    }

    programRef.current = prog
    gl.useProgram(prog)

    const vbo = gl.createBuffer()
    buffersRef.current.vbo = vbo
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1])
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

    const locPos = gl.getAttribLocation(prog, "position")
    gl.enableVertexAttribArray(locPos)
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0)

    uniformsRef.current.time = gl.getUniformLocation(prog, "time")
    uniformsRef.current.resolution = gl.getUniformLocation(prog, "resolution")
    uniformsRef.current.intensity = gl.getUniformLocation(prog, "intensity")
    uniformsRef.current.particleCount = gl.getUniformLocation(prog, "particleCount")
    uniformsRef.current.colorShift = gl.getUniformLocation(prog, "colorShift")

    const resize = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, currentQuality.dpr))
      const cssW = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
      const cssH = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = Math.floor(cssW * dpr)
      canvas.height = Math.floor(cssH * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener("resize", resize)
    resize()

    let start = performance.now()
    const loop = (t) => {
      rafRef.current = requestAnimationFrame(loop)
      if (paused) return

      const delta = t - lastFrameRef.current
      const targetFrameTime = 1000 / currentQuality.targetFps
      if (delta < targetFrameTime) return

      lastFrameRef.current = t - (delta % targetFrameTime)
      const now = (t - start) * 0.001 * (speed || 1)

      gl.useProgram(programRef.current)
      gl.uniform1f(uniformsRef.current.time, now)
      gl.uniform1f(uniformsRef.current.intensity, intensity)
      gl.uniform1f(uniformsRef.current.particleCount, particleCount)
      gl.uniform3f(uniformsRef.current.colorShift, colorR, colorG, colorB)

      // Clear transparent backdrop
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener("resize", resize)

      if (gl && programRef.current) {
        const p = programRef.current
        const attachedShaders = gl.getAttachedShaders(p) || []
        attachedShaders.forEach((s) => gl.deleteShader(s))
        gl.deleteProgram(p)
      }
      if (gl && buffersRef.current.vbo) {
        gl.deleteBuffer(buffersRef.current.vbo)
      }
    }
  }, [paused, speed, intensity, particleCount, colorR, colorG, colorB, quality])

  if (!webglOk) return null

  return (
    <div style={{ 
      position: "absolute", 
      inset: 0, 
      width: "100%", 
      height: "100%", 
      overflow: "hidden", 
      pointerEvents: "none",
      backgroundColor: "rgb(var(--bg-primary))",
      transition: "background-color var(--theme-transition) ease"
    }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  )
}
