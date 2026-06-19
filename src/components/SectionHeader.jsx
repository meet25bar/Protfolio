import React from 'react'
import ScrollReveal from './ScrollReveal'

// ─── SectionHeader ─────────────────────────────────────────────
// Consistent section title + subtitle used across all sections.
export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-16 text-center">
      <ScrollReveal variant="fade-up">
        <span className="inline-block font-mono text-accent-cyan text-sm tracking-widest uppercase mb-4">
          {label}
        </span>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <h2 className="font-syne font-bold text-4xl lg:text-5xl text-text-primary mb-4 leading-tight">
          {title}
        </h2>
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="font-manrope text-text-secondary text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollReveal>
      )}

      {/* Decorative divider */}
      <ScrollReveal variant="scale" delay={0.3}>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-cyan/50" />
          <div className="glow-dot" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-cyan/50" />
        </div>
      </ScrollReveal>
    </div>
  )
}
