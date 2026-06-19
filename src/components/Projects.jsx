import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, ExternalLink, ChevronLeft, ChevronRight, X,
  Shield, Zap, CreditCard, Database, Box, Lock, Brain,
} from 'lucide-react'

import imgPaw from './project_pawperfection.png'
import imgCrop from './project_cropyield.png'
import imgCancer from './project_breastcancer.png'

// ─── Project data ──────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'pawperfection',
    title: 'PawPerfection',
    subtitle: 'Scalable Pet Management Platform',
    shortDesc: 'Full-stack pet management with real-time monitoring & secure payments.',
    longDesc:
      'A high-performance full-stack pet management platform. Features JWT & Google OAuth authentication, Stripe-based payment integration, Redis caching with rate limiting, and a multi-pet tracking engine. Fully containerized with Docker and orchestrated via Kubernetes for clean service scaling and high availability.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'Stripe'],
    features: [
      { icon: Shield,     label: 'JWT & Google OAuth Security' },
      { icon: CreditCard, label: 'Stripe Payment Integration' },
      { icon: Database,   label: 'Redis Caching & Rate Limiting' },
      { icon: Box,        label: 'Docker & Kubernetes Containers' },
      { icon: Zap,        label: 'Robust RESTful API Architecture' },
      { icon: Lock,       label: 'Multi-pet Tracking Engine' },
    ],
    image: imgPaw,
    color: 'rgb(99,179,237)',
    github: 'https://github.com/meet25bar',
    demo: 'https://paw-perfection.vercel.app/',
    metadata: 'Full-Stack · 2025',
  },
  {
    id: 'crop-yield',
    title: 'Punjab Crop Yield Predictor',
    subtitle: 'Multiple Linear Regression ML App',
    shortDesc: 'AI-powered crop yield prediction achieving R² = 0.996.',
    longDesc:
      'An AI-powered crop yield prediction engine for Punjab agricultural oilseeds and pulses. Uses Multiple Linear Regression trained on historical agricultural data, achieving an R² score of 0.996. The prediction pipeline runs on a FastAPI backend with a Node/Express middle tier and React frontend for seamless user interaction.',
    tech: ['Python', 'FastAPI', 'Node.js', 'Express', 'Scikit-learn', 'Pandas'],
    features: [
      { icon: Brain,    label: 'Multiple Linear Regression Model' },
      { icon: Database, label: 'Punjab Agricultural Dataset' },
      { icon: Zap,      label: '99.6% R² Performance Score' },
    ],
    image: imgCrop,
    color: 'rgb(167,139,250)',
    github: 'https://github.com/meet25bar',
    demo: '#',
    metadata: 'ML · 2025',
  },
  {
    id: 'breast-cancer',
    title: 'Breast Cancer Predictor',
    subtitle: 'Logistic Regression ML App',
    shortDesc: 'Tumor classification with 94% accuracy via 10-fold CV.',
    longDesc:
      'A tumor malignancy classification system using Logistic Regression trained with 10-fold stratified cross-validation, achieving 94% accuracy on the Wisconsin Breast Cancer dataset. Features a pink ribbon glassmorphism UI with real-time probability visualization and feature importance charts.',
    tech: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'HTML/CSS/JS'],
    features: [
      { icon: Zap,      label: 'Logistic Regression Classifier' },
      { icon: Database, label: '10-fold Cross-Validation' },
      { icon: Shield,   label: '94% Prediction Accuracy' },
    ],
    image: imgCancer,
    color: 'rgb(52,211,153)',
    github: 'https://github.com/meet25bar',
    demo: '#',
    metadata: 'ML · 2025',
  },
]

// ─── Ease curve ─────────────────────────────────────────────────
const EASE = [0.43, 0.13, 0.23, 0.96]

// ─── Circular nav button ────────────────────────────────────────
function NavButton({ direction, onClick }) {
  const isLeft = direction === 'left'
  return (
    <motion.button
      onClick={onClick}
      className="relative w-14 h-14 rounded-full flex items-center justify-center"
      style={{ background: 'transparent' }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
      aria-label={isLeft ? 'Previous project' : 'Next project'}
    >
      {/* Animated ring */}
      <motion.svg
        width="56" height="56" viewBox="0 0 56 56"
        className="absolute inset-0"
        whileHover={{ rotate: 360 }}
        transition={{ rotate: { duration: 8, ease: 'linear', repeat: Infinity } }}
      >
        <motion.circle
          cx="28" cy="28" r="27"
          fill="none" stroke="rgb(var(--text-primary) / 0.6)" strokeWidth="1"
          initial={{ strokeDasharray: '1000, 0' }}
          whileHover={{ strokeDasharray: '2, 6' }}
        />
      </motion.svg>
      {isLeft ? <ChevronLeft size={18} className="text-text-primary" /> : <ChevronRight size={18} className="text-text-primary" />}
    </motion.button>
  )
}

// ─── Detail Overlay ─────────────────────────────────────────────
function DetailPanel({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgb(var(--bg-primary) / 0.75)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-4 max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'rgb(var(--bg-card) / 0.95)',
          border: '1px solid rgb(var(--text-primary) / 0.08)',
          boxShadow: `0 40px 100px rgb(var(--bg-primary) / 0.5), 0 0 60px ${project.color}15`,
        }}
        initial={{ y: 60, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Hero image banner */}
        <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, rgb(var(--bg-card) / 0.95) 0%, transparent 60%)` }}
          />
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgb(var(--bg-primary) / 0.5)',
              border: '1px solid rgb(var(--text-primary) / 0.15)',
              color: 'rgb(var(--text-primary))',
            }}
            whileHover={{ scale: 1.1, background: 'rgb(var(--text-primary) / 0.15)' }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 -mt-8 relative z-10">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: project.color, opacity: 0.8 }}
              >
                {project.subtitle}
              </span>
              <h2
                className="font-syne font-extrabold text-3xl sm:text-4xl mt-1"
                style={{ color: 'rgb(var(--text-primary))' }}
              >
                {project.title}
              </h2>
            </div>
          </div>

          {/* Metadata */}
          <p
            className="font-mono text-xs tracking-wider mb-5"
            style={{ color: 'rgb(var(--text-primary) / 0.4)' }}
          >
            {project.metadata}
          </p>

          {/* Long description */}
          <p className="font-manrope text-base leading-relaxed mb-7" style={{ color: 'rgb(var(--text-primary) / 0.75)' }}>
            {project.longDesc}
          </p>

          {/* Features grid */}
          <div className="mb-7">
            <span className="font-mono text-xs tracking-widest uppercase block mb-4" style={{ color: 'rgb(var(--text-primary) / 0.4)' }}>
              Key Features
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: EASE }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: `${project.color}0A`, border: `1px solid ${project.color}18` }}
                >
                  <Icon size={15} style={{ color: project.color, flexShrink: 0 }} />
                  <span className="font-manrope text-sm" style={{ color: 'rgb(var(--text-primary) / 0.8)' }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <span className="font-mono text-xs tracking-widest uppercase block mb-3" style={{ color: 'rgb(var(--text-primary) / 0.4)' }}>
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full font-mono text-xs"
                  style={{
                    background: `${project.color}12`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold font-manrope text-sm"
              style={{
                background: project.color,
                color: 'rgb(var(--bg-primary))',
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${project.color}40` }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={16} />
              View on GitHub
            </motion.a>
            {project.demo && project.demo !== '#' && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold font-manrope text-sm"
                style={{
                  border: '1px solid rgb(var(--text-primary) / 0.12)',
                  color: 'rgb(var(--text-primary) / 0.8)',
                }}
                whileHover={{ scale: 1.04, borderColor: 'rgb(var(--text-primary) / 0.25)' }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Slide content (center text) ────────────────────────────────
const contentVariants = {
  enter:  { opacity: 0, y: 35 },
  center: { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -35 },
}

// ─── Side Title ─────────────────────────────────────────────────
function SideTitle({ title, color }) {
  return (
    <div
      className="absolute left-8 top-1/2 -translate-y-1/2 z-[5] hidden lg:flex flex-col items-center gap-5"
      style={{ transform: 'translateY(-50%) rotate(180deg)' }}
    >
      <motion.div
        key={`line-t-${title}`}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-px h-24 origin-bottom"
        style={{ background: color }}
      />
      <span
        className="font-mono text-xs font-medium tracking-[0.15em] uppercase"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          color: 'rgb(var(--text-primary) / 0.7)',
        }}
      >
        {title}
      </span>
      <motion.div
        key={`line-b-${title}`}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-px h-24 origin-top"
        style={{ background: color }}
      />
    </div>
  )
}

// ─── Thumbnail strip ────────────────────────────────────────────
function ThumbnailStrip({ projects, activeIndex, onSelect }) {
  return (
    <div className="absolute bottom-7 right-6 z-[6] hidden md:flex gap-4">
      {projects.map((proj, i) => {
        if (i === activeIndex) return null
        return (
          <motion.button
            key={proj.id}
            onClick={() => onSelect(i)}
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: 160, height: 96,
              border: '1px solid rgb(var(--text-primary) / 0.07)',
              boxShadow: 'inset 0 1px 4px rgb(var(--bg-primary) / 0.3)',
            }}
            whileHover={{ scale: 1.06, borderColor: 'rgb(var(--text-primary) / 0.2)' }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-full object-cover"
            />
            {/* Title overlay */}
            <div
              className="absolute inset-0 flex items-end p-2"
              style={{ background: 'linear-gradient(to top, rgb(var(--bg-primary) / 0.65) 0%, transparent 60%)' }}
            >
              <span className="font-mono text-[10px] text-text-primary/80 truncate">{proj.title}</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Counter badge ──────────────────────────────────────────────
function Counter({ active, total }) {
  return (
    <div
      className="absolute top-8 right-8 z-[5] font-mono text-xs"
      style={{ color: 'rgb(var(--text-primary) / 0.5)', letterSpacing: '0.08em' }}
    >
      {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ─── Main Projects Section ─────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [detailProject, setDetailProject] = useState(null)
  const containerRef = useRef(null)
  const autoplayRef = useRef(null)

  const current = PROJECTS[activeIndex]

  // ── Navigation ─────────────────────────────────────────────
  const goTo = useCallback((idx) => {
    if (idx === activeIndex) return
    setDirection(idx > activeIndex ? 1 : -1)
    setActiveIndex(idx)
  }, [activeIndex])

  const next = useCallback(() => {
    setDirection(1)
    setActiveIndex(i => (i + 1) % PROJECTS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActiveIndex(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
  }, [])

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 6000)
    return () => clearInterval(autoplayRef.current)
  }, [next])

  const resetAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(next, 6000)
  }, [next])

  const handleNav = useCallback((fn) => () => { fn(); resetAutoplay() }, [resetAutoplay])
  const handleThumbClick = useCallback((i) => { goTo(i); resetAutoplay() }, [goTo, resetAutoplay])

  // Swipe gesture support for mobile
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        next()
        resetAutoplay()
      } else {
        prev()
        resetAutoplay()
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (detailProject) return
      if (e.key === 'ArrowRight') { next(); resetAutoplay() }
      if (e.key === 'ArrowLeft')  { prev(); resetAutoplay() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, resetAutoplay, detailProject])

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', minHeight: 560, background: 'rgb(var(--bg-primary))' }}
      >
        {/* ── Background image slide ── */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 0.4, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              backgroundImage: `url(${current.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.55) saturate(1.2)',
            }}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgb(var(--bg-primary) / 0.4) 0%, rgb(var(--bg-primary) / 0.75) 100%)' }}
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, rgb(var(--bg-primary) / 0.3) 0%, rgb(var(--bg-primary) / 0.7) 100%)` }}
        />

        {/* ── Metadata top-left ── */}
        <div className="absolute top-8 left-8 z-[5]">
          <span
            className="font-mono text-[11px] tracking-wider"
            style={{ color: 'rgb(var(--text-primary) / 0.5)' }}
          >
            {current.metadata}
          </span>
        </div>

        {/* ── Counter top-right ── */}
        <Counter active={activeIndex} total={PROJECTS.length} />

        {/* ── Side title ── */}
        <SideTitle title={current.title} color={current.color} />

        {/* ── Center content ── */}
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`content-${activeIndex}`}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center px-4 py-6 sm:px-6 max-w-[90vw] sm:max-w-xl w-full rounded-2xl"
              style={{
                background: 'rgb(var(--bg-primary) / 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgb(var(--text-primary) / 0.1)',
                boxShadow: '0 8px 32px rgb(var(--bg-primary) / 0.3)',
              }}
            >
              {/* Subtitle */}
              <motion.span
                className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                style={{ color: current.color, opacity: 0.85 }}
              >
                {current.subtitle}
              </motion.span>

              {/* Title */}
              <h1
                className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase leading-none mb-4"
                style={{
                  color: 'rgb(var(--text-primary))',
                  textShadow: '0 4px 40px rgb(var(--bg-primary) / 0.6)',
                  letterSpacing: '-0.02em',
                }}
              >
                {current.title}
              </h1>

              {/* Short description */}
              <p
                className="font-manrope text-xs sm:text-sm max-w-sm mx-auto mb-5 leading-relaxed"
                style={{
                  color: 'rgb(var(--text-primary) / 0.75)',
                  textShadow: '0 1px 8px rgb(var(--bg-primary) / 0.3)',
                }}
              >
                {current.shortDesc}
              </p>

              {/* "View Details" button */}
              <motion.button
                onClick={() => { setDetailProject(current); clearInterval(autoplayRef.current) }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-manrope font-semibold text-xs"
                style={{
                  background: 'rgb(var(--bg-primary) / 0.3)',
                  border: '1px solid rgb(var(--text-primary) / 0.2)',
                  color: 'rgb(var(--text-primary))',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  scale: 1.05,
                  background: 'rgb(var(--bg-primary) / 0.45)',
                  borderColor: 'rgb(var(--text-primary) / 0.35)',
                  boxShadow: '0 0 30px rgb(var(--bg-primary) / 0.2)',
                }}
                whileTap={{ scale: 0.96 }}
              >
                View Details
                <ChevronRight size={15} />
              </motion.button>

              {/* Tech pills */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-5">
                {current.tech.slice(0, 5).map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full font-mono text-[10px]"
                    style={{
                      background: 'rgb(var(--text-primary) / 0.08)',
                      border: '1px solid rgb(var(--text-primary) / 0.12)',
                      color: 'rgb(var(--text-primary) / 0.6)',
                    }}
                  >
                    {t}
                  </span>
                ))}
                {current.tech.length > 5 && (
                  <span
                    className="px-3 py-1 rounded-full font-mono text-[10px]"
                    style={{
                      background: 'rgb(var(--text-primary) / 0.06)',
                      border: '1px solid rgb(var(--text-primary) / 0.1)',
                      color: 'rgb(var(--text-primary) / 0.45)',
                    }}
                  >
                    +{current.tech.length - 5} more
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Prev / Next buttons ── */}
        <div className="absolute bottom-20 left-6 sm:bottom-8 sm:left-8 z-[6] flex gap-4">
          <NavButton direction="left"  onClick={handleNav(prev)} />
          <NavButton direction="right" onClick={handleNav(next)} />
        </div>

        {/* ── Thumbnail strip ── */}
        <ThumbnailStrip
          projects={PROJECTS}
          activeIndex={activeIndex}
          onSelect={handleThumbClick}
        />

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[7]" style={{ background: 'rgb(var(--text-primary) / 0.06)' }}>
          <motion.div
            key={`progress-${activeIndex}`}
            className="h-full"
            style={{ background: current.color }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>
      </section>

      {/* ── Detail overlay ── */}
      <AnimatePresence>
        {detailProject && (
          <DetailPanel
            project={detailProject}
            onClose={() => { setDetailProject(null); resetAutoplay() }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
