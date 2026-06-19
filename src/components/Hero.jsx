import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Lightspeed from './Lightspeed'

// ─── Typing hook ────────────────────────────────────────────────
function useTypewriter(words, typingSpeed = 80, pauseDuration = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(word.slice(0, displayed.length + 1))
        if (displayed.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setDisplayed(displayed.slice(0, -1))
        if (displayed.length === 0) {
          setIsDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed)
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, pauseDuration])

  return displayed
}

// ─── Animated orb blob ──────────────────────────────────────────
function Orb({ color, size, style }) {
  return (
    <div
      className="orb"
      style={{ width: size, height: size, background: color, ...style }}
    />
  )
}

// ─── Floating particles ─────────────────────────────────────────
function Particles() {
  const dots = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    duration: Math.random() * 9 + 6,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: 'rgba(99,179,237,0.4)',
          }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Hero Section ───────────────────────────────────────────────
const ROLES = [
  'AI / ML Engineer',
  'Data Scientist',
  'Intelligent Systems Builder',
  'Full-Stack Developer',
]

export default function Hero() {
  const typedRole = useTypewriter(ROLES)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const [webglSupported, setWebglSupported] = useState(true)

  // Subtle mouse-parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const rotateX = useTransform(springY, [-300, 300], [3, -3])
  const rotateY = useTransform(springX, [-300, 300], [-3, 3])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  // ── Fixed: navigate to route pages ──────────────────────────
  const goToProjects = () => navigate('/projects')
  const goToContact  = () => navigate('/contact')
  const goToAbout    = () => navigate('/about')

  // Stagger variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-28 pt-12 md:pb-0 md:pt-0 ${
        webglSupported ? '' : 'grid-bg'
      }`}
    >
      {/* Lightspeed shader */}
      <Lightspeed onWebGLInitResult={setWebglSupported} />

      {/* Fallback backgrounds */}
      {!webglSupported && (
        <>
          <Orb color="rgba(99,179,237,0.10)"  size="580px" style={{ top: '-10%', left: '-10%', animationDelay: '0s' }} />
          <Orb color="rgba(167,139,250,0.10)" size="480px" style={{ bottom: '0%', right: '-5%', animationDelay: '-4s' }} />
          <Orb color="rgba(52,211,153,0.07)"  size="380px" style={{ top: '40%', left: '40%', animationDelay: '-8s' }} />
          <Particles />
        </>
      )}

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent pointer-events-none z-10" />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-medium"
            style={{
              background: 'rgba(99,179,237,0.08)',
              border: '1px solid rgba(99,179,237,0.22)',
              color: 'rgb(99,179,237)',
            }}
          >
            <span className="glow-dot" />
            Open to Internships &amp; SDE Roles
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-6"
        >
          <span className="block text-text-primary">Meet</span>
          <span className="block gradient-text">Barot</span>
        </motion.h1>

        {/* Typed role */}
        <motion.div
          variants={itemVariants}
          className="font-mono text-lg sm:text-xl mb-5 h-8"
          style={{ color: 'rgba(99,179,237,0.85)' }}
        >
          <span>{typedRole}</span>
          <span className="cursor-blink ml-0.5">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="font-manrope text-text-secondary text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building{' '}
          <span className="text-text-primary font-medium">intelligent systems</span> and{' '}
          <span className="text-text-primary font-medium">neural architectures</span>{' '}
          that solve complex real-world problems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          {/* Primary — View Projects */}
          <motion.button
            id="hero-view-projects"
            onClick={goToProjects}
            className="group relative px-8 py-4 rounded-xl font-semibold font-manrope text-base overflow-hidden transition-all duration-300"
            style={{
              background: 'rgb(99,179,237)',
              color: 'rgb(15,17,23)',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(99,179,237,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">View Projects</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, rgb(99,179,237), rgb(52,211,153))' }}
            />
          </motion.button>

          {/* Secondary — Contact */}
          <motion.button
            id="hero-contact"
            onClick={goToContact}
            className="px-8 py-4 rounded-xl font-semibold font-manrope text-base transition-all duration-300"
            style={{
              border: '1.5px solid var(--border-hero-contact, rgb(var(--text-primary) / 0.15))',
              color: 'var(--text-hero-contact, rgb(242,244,248))',
            }}
            whileHover={{
              scale: 1.04,
              borderColor: 'rgba(99,179,237,0.5)',
              background: 'rgba(99,179,237,0.08)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-5 mb-14">
          {[
            { icon: Github,   href: 'https://github.com/meet25bar',     label: 'GitHub'   },
            { icon: Linkedin, href: 'https://linkedin.com/in/meetbarot', label: 'LinkedIn' },
            { icon: Mail,     href: 'mailto:barotmeet25@gmail.com',      label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid rgb(var(--text-primary) / 0.09)',
                color: 'rgba(156,163,180,0.85)',
              }}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* ── "Explore My Work" next button ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2"
        >
          <motion.button
            id="hero-explore"
            onClick={goToAbout}
            className="group flex items-center gap-3 px-6 py-3 rounded-full font-manrope font-medium text-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(167,139,250,0.25)',
              color: 'rgba(167,139,250,0.9)',
              background: 'rgba(167,139,250,0.05)',
            }}
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(167,139,250,0.5)',
              background: 'rgba(167,139,250,0.10)',
              boxShadow: '0 0 24px rgba(167,139,250,0.15)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Explore My Work</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={15} />
            </motion.span>
          </motion.button>

          {/* Scroll hint */}
          <motion.div
            className="flex flex-col items-center gap-1 mt-2"
            style={{ color: 'rgba(90,99,120,0.8)' }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
