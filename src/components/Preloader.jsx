import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import Starsfield from './Starsfield'

// ─── Letter-by-letter name reveal ─────────────────────────────
const NAME_CHARS = 'MEET BAROT'.split('')
const TAGLINE = 'AI · ML · Builder'

function NameReveal() {
  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      {/* Name — letter stagger */}
      <div className="flex items-center gap-0 overflow-hidden">
        {NAME_CHARS.map((char, i) => (
          <motion.span
            key={i}
            className={`font-syne font-extrabold text-4xl md:text-6xl tracking-widest ${
              char === ' ' ? 'w-4 md:w-6' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, rgb(99,179,237) 0%, rgb(167,139,250) 55%, rgb(52,211,153) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: 0.3 + i * 0.07,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="font-mono text-sm md:text-base tracking-[0.3em] uppercase"
        style={{ color: 'rgba(156,163,180,0.85)' }}
        initial={{ opacity: 0, letterSpacing: '0.6em' }}
        animate={{ opacity: 1, letterSpacing: '0.3em' }}
        transition={{ delay: 1.1, duration: 0.9, ease: 'easeOut' }}
      >
        {TAGLINE}
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="h-px w-32 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgb(99,179,237), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const { isDark } = useTheme()

  useEffect(() => {
    const duration = 3200
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setProgress(Math.min((currentStep / steps) * 100, 100))

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(onComplete, 500)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Background Starsfield */}
      <div className="absolute inset-0 z-0">
        <Starsfield
          starCount={900}
          speed={0.08}
          spread={1.5}
          bgColor="transparent"
          starColor={isDark ? '#ffffff' : '#000000'}
          galaxyMode={true}
          followCursor={true}
        />
      </div>

      {/* Film grain */}
      <div className="noise-overlay z-0" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Animated Name + tagline */}
        <NameReveal />

        {/* Status message */}
        <motion.div
          className="font-mono text-sm h-6 overflow-hidden flex flex-col items-center mb-8"
          style={{ color: 'rgba(156,163,180,0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {progress < 30 && (
              <motion.p key="1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ color: 'rgb(99,179,237)' }}>
                Initializing neural pathways...
              </motion.p>
            )}
            {progress >= 30 && progress < 70 && (
              <motion.p key="2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ color: 'rgb(167,139,250)' }}>
                Loading portfolio systems...
              </motion.p>
            )}
            {progress >= 70 && progress < 100 && (
              <motion.p key="3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ color: 'rgb(52,211,153)' }}>
                Almost ready...
              </motion.p>
            )}
            {progress === 100 && (
              <motion.p key="4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ color: 'rgb(242,244,248)' }}>
                Welcome.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="w-56 md:w-72 h-[2px] rounded-full overflow-hidden relative"
          style={{ background: 'rgb(var(--text-primary) / 0.07)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgb(99,179,237), rgb(167,139,250), rgb(52,211,153))',
              boxShadow: '0 0 10px rgba(99,179,237,0.5)',
              transition: 'width 0.03s linear',
            }}
          />
        </motion.div>

        {/* Progress */}
        <motion.div
          className="mt-3 font-mono text-xs"
          style={{ color: 'rgba(90,99,120,0.9)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {Math.floor(progress)}%
        </motion.div>
      </div>
    </motion.div>
  )
}
