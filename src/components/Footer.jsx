import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

// ─── Footer ────────────────────────────────────────────────────
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative pt-20 pb-36 overflow-hidden">
      {/* ── Seamless top fade: continues the hero's bottom vignette ── */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg-primary to-transparent pointer-events-none" />

      {/* Soft glowing divider — replaces the hard border-t */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '1px',
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.18) 0%, rgba(124,58,237,0.10) 50%, transparent 100%)',
        }}
      />

      {/* Gradient fade bottom — blends into the floating dock */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />

      {/* Ambient glow at bottom center echoing the dock's conic border */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-96 h-12 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />

      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: name + tagline */}
          <div className="text-center md:text-left">
            <motion.button
              onClick={scrollToTop}
              className="font-syne font-bold text-2xl gradient-text-cyan mb-1 hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.03 }}
            >
              Meet Barot
            </motion.button>
            <p className="font-manrope text-text-muted text-sm">
              AI / ML Engineer · Deep Learning · Computer Vision
            </p>
          </div>

          {/* Center: nav links */}
          <div className="hidden md:flex items-center gap-6">
            {['About', 'Projects', 'Experience', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="font-manrope text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right: socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github,   href: 'https://github.com/meet25bar',    label: 'GitHub'   },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/meet-barot-7b03862bb/',  label: 'LinkedIn' },
              { icon: Mail,     href: 'mailto:barotmeet25@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center relative">
          {/* Subtle gradient rule */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgb(var(--text-primary) / 0.06) 30%, rgb(var(--text-primary) / 0.06) 70%, transparent 100%)' }}
          />
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Meet Barot. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-muted flex items-center gap-1.5">
            Built with React + Framer Motion
            <Heart size={11} className="text-accent-cyan" />
          </p>
        </div>
      </div>
    </footer>
  )
}
