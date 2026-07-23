import React from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, CheckCircle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'

// ─── Certifications data ───────────────────────────────────────
const CERTS = [
  {
    title: 'Oracle OCI 2025 Generative AI Professional',
    issuer: 'Oracle Cloud Infrastructure',
    date: '2025',
    color: '#f59e0b',
    icon: '☁️',
    id: 'oci-genai',
    credential: '#',
    tags: ['LLMs', 'RAG', 'Vector DBs', 'OCI Deployment'],
  },
  {
    title: 'Oracle OCI 2025 AI Foundations Associate',
    issuer: 'Oracle Cloud Infrastructure',
    date: '2025',
    color: '#00d4ff',
    icon: '🤖',
    id: 'oci-ai',
    credential: '#',
    tags: ['AI', 'ML', 'DL Fundamentals', 'Cloud Services'],
  },
  {
    title: 'Machine Learning A–Z',
    issuer: 'Udemy · SuperDataScience',
    date: '2023',
    color: '#10d9a0',
    icon: '🧠',
    id: 'ml-az',
    credential: '#',
    tags: ['Regression', 'Classification', 'Clustering', 'Scikit-learn'],
  },
]

// ─── Cert card ─────────────────────────────────────────────────
function CertCard({ cert, index }) {
  return (
    <ScrollReveal variant="scale" delay={index * 0.12}>
      <motion.div
        className="glass-card p-7 relative overflow-hidden h-full"
        whileHover={{ y: -6, boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 40px ${cert.color}12` }}
        transition={{ duration: 0.3 }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
          style={{
            background: `${cert.color}15`,
            border: `1px solid ${cert.color}30`,
            boxShadow: `0 0 20px ${cert.color}15`,
          }}
        >
          {cert.icon}
        </div>

        {/* Cert title */}
        <h3 className="font-syne font-bold text-xl text-text-primary mb-1 leading-tight">
          {cert.title}
        </h3>

        {/* Issuer + date */}
        <p className="font-manrope text-text-muted text-sm mb-1">{cert.issuer}</p>
        <p className="font-mono text-xs mb-5" style={{ color: cert.color }}>
          Issued {cert.date}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {cert.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md font-mono text-xs border"
              style={{
                background: `${cert.color}08`,
                borderColor: `${cert.color}25`,
                color: `${cert.color}bb`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Verified badge + link */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
            <CheckCircle size={12} style={{ color: cert.color }} />
            Verified
          </span>
          <motion.a
            href={cert.credential}
            className="flex items-center gap-1 font-mono text-xs hover:text-text-primary transition-colors"
            style={{ color: cert.color }}
            whileHover={{ x: 2 }}
          >
            View Credential
            <ExternalLink size={11} />
          </motion.a>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

// ─── Certifications Section ────────────────────────────────────
export default function Certifications() {
  return (
    <section id="certifications" className="section relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-glow-violet opacity-25 pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          subtitle="Industry-recognized certifications validating expertise in cloud AI and machine learning."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
