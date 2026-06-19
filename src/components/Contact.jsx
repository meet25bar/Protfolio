import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, Send, CheckCircle, MapPin } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'

// ─── Social links ──────────────────────────────────────────────
const SOCIALS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'barotmeet25@gmail.com',
    href: 'mailto:barotmeet25@gmail.com',
    color: '#00d4ff',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/meet-barot',
    href: 'https://www.linkedin.com/in/meet-barot-7b03862bb/',
    color: '#0a66c2',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/meet25bar',
    href: 'https://github.com/meet25bar',
    color: '#10d9a0',
  },
]

// ─── Input field ───────────────────────────────────────────────
function Field({ label, id, type = 'text', placeholder, value, onChange, textarea }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block font-manrope text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-surface rounded-xl border border-surface-border px-4 py-3 font-manrope text-text-primary text-sm placeholder:text-text-muted resize-none focus:outline-none focus:border-accent-cyan/50 focus:bg-surface-hover transition-all duration-200"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-surface rounded-xl border border-surface-border px-4 py-3 font-manrope text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50 focus:bg-surface-hover transition-all duration-200"
        />
      )}
    </div>
  )
}

// ─── Contact Section ───────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // UI-only demo: simulate send
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3500)
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-glow-cyan opacity-20 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-glow-violet opacity-20 pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          label="Get In Touch"
          title="Contact Me"
          subtitle="Open to opportunities, collaborations, and interesting conversations."
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Info + socials */}
          <ScrollReveal variant="fade-left">
            <div className="flex flex-col h-full">
              <div className="glass-card p-8 mb-5 flex-1">
                <h3 className="font-syne font-bold text-2xl text-text-primary mb-4">
                  Let's Build Something
                </h3>
                <p className="font-manrope text-text-secondary leading-relaxed mb-8">
                  Whether it's a full-time SDE role, a freelance project, or an open-source
                  collaboration — I'd love to hear from you. Drop a message and I'll respond
                  within 24 hours.
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 mb-8 text-text-muted font-manrope text-sm">
                  <MapPin size={14} className="text-accent-cyan" />
                  India · Available for Remote & Hybrid
                </div>

                {/* Social links */}
                <div className="space-y-3">
                  {SOCIALS.map(s => {
                    const Icon = s.icon
                    return (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl border border-surface-border hover:border-text-primary/10 transition-all duration-200 group"
                        style={{ background: 'rgb(var(--text-primary) / 0.02)' }}
                        whileHover={{ x: 4, boxShadow: `0 0 20px ${s.color}10` }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                          style={{
                            background: `${s.color}15`,
                            border: `1px solid ${s.color}30`,
                          }}
                        >
                          <Icon size={17} style={{ color: s.color }} />
                        </div>
                        <div>
                          <div className="font-manrope text-xs text-text-muted mb-0.5">{s.label}</div>
                          <div className="font-manrope text-sm text-text-primary font-medium group-hover:text-accent-cyan transition-colors">
                            {s.value}
                          </div>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Availability chip */}
              <div className="glass-card p-4 flex items-center gap-3">
                <span className="glow-dot shrink-0" />
                <span className="font-manrope text-sm text-text-secondary">
                  <span className="text-text-primary font-semibold">Available</span> for SDE / ML internships and full-time roles (2026/2027)
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal variant="fade-right">
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-emerald" />

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-x-4">
                      <Field
                        label="Your Name"
                        id="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange('name')}
                      />
                      <Field
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange('email')}
                      />
                    </div>
                    <Field
                      label="Subject"
                      id="subject"
                      placeholder="SDE Opportunity / Collaboration"
                      value={form.subject}
                      onChange={handleChange('subject')}
                    />
                    <Field
                      label="Message"
                      id="message"
                      textarea
                      placeholder="Tell me about the opportunity or project..."
                      value={form.message}
                      onChange={handleChange('message')}
                    />

                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent-cyan text-bg-primary font-semibold font-manrope text-base mt-2 transition-all"
                      whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,212,255,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={17} />
                      Send Message
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={56} className="text-accent-emerald mb-6 mx-auto" />
                    </motion.div>
                    <h3 className="font-syne font-bold text-2xl text-text-primary mb-3">Message Sent!</h3>
                    <p className="font-manrope text-text-secondary">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
