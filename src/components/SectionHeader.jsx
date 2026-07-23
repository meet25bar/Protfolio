import React from 'react'
import ScrollReveal from './ScrollReveal'

// ─── SectionHeader ─────────────────────────────────────────────
export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-10 md:mb-12 text-center">
      <ScrollReveal variant="fade-up">
        <span className="inline-block font-mono text-accent-cyan text-xs sm:text-sm tracking-widest uppercase mb-3">
          {label}
        </span>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary mb-3 leading-tight">
          {title}
        </h2>
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="font-manrope text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>
      )}

      <ScrollReveal variant="scale" delay={0.3}>
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent-cyan/50" />
          <div className="glow-dot" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent-cyan/50" />
        </div>
      </ScrollReveal>
    </div>
  )
}
