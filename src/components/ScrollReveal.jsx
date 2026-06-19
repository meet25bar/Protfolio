import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// ─── ScrollReveal ──────────────────────────────────────────────
// Wraps children and animates them into view when scrolled to.
// Supports 'fade-up', 'fade-left', 'fade-right', 'scale' variants.
export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
}) {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: once })

  const variants = {
    'fade-up': {
      hidden:  { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
      hidden:  { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden:  { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden:  { opacity: 0, scale: 0.88 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
