import React from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, CheckCircle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'

// ─── Certifications data ───────────────────────────────────────
const CERTS = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle Cloud Infrastructure',
    date: 'Nov 2025',
    color: '#f59e0b',
    icon: '☁️',
    id: 'oci-genai',
    credential: '/certs/gen ai professional.pdf',
    tags: ['LLMs', 'Generative AI', 'OCI'],
  },
  {
    title: 'Artificial Intelligence',
    issuer: '30DaysCoding',
    date: '2026',
    color: '#10d9a0',
    icon: '🧠',
    id: '30days-ai',
    credential: '/certs/Meet_Barot_certificate AI.png',
    tags: ['Artificial Intelligence', 'Machine Learning'],
  },
  {
    title: 'Data Analytics',
    issuer: '30DaysCoding',
    date: '2026',
    color: '#0ea5e9',
    icon: '📊',
    id: '30days-da',
    credential: '/certs/Meet_Barot_certificate Data.png',
    tags: ['Data Analytics', 'Data Science'],
  },
  {
    title: 'Java Development',
    issuer: '30DaysCoding',
    date: '2026',
    color: '#eab308',
    icon: '☕',
    id: '30days-java',
    credential: '/certs/Meet_Barot_certificate java.png',
    tags: ['Java', 'Software Development'],
  },
  {
    title: 'Data Structures And Algorithms',
    issuer: '30DaysCoding',
    date: '2026',
    color: '#8b5cf6',
    icon: '💻',
    id: '30days-dsa',
    credential: '/certs/Meet_Barot_certificate DSA.png',
    tags: ['DSA', 'Algorithms', 'Problem Solving'],
  },
  {
    title: 'Deep Learning A-Z [2026]: DL, AI in Python & AWS + LLM Prize',
    issuer: 'Udemy',
    date: 'Aug 2026',
    color: '#10d9a0',
    icon: '🧠',
    id: 'dl-az-2026',
    credential: '/certs/udemy dl a-z.pdf',
    tags: ['Deep Learning', 'Python', 'AWS', 'LLMs'],
  },
  {
    title: 'Python for Data Science and Machine Learning Bootcamp',
    issuer: 'Udemy',
    date: 'May 2026',
    color: '#eab308',
    icon: '🐍',
    id: 'python-ds-ml',
    credential: '/certs/udemy python for data science.pdf',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas'],
  },
  {
    title: 'Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2026]',
    issuer: 'Udemy',
    date: 'Mar 2026',
    color: '#f43f5e',
    icon: '🤖',
    id: 'ml-az-2026',
    credential: '/certs/udemy.pdf',
    tags: ['Machine Learning', 'AI', 'Python', 'R'],
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle Cloud Infrastructure',
    date: 'Oct 2025',
    color: '#00d4ff',
    icon: '☁️',
    id: 'oci-ai',
    credential: '/certs/Oracle Certificate.pdf',
    tags: ['AI Fundamentals', 'OCI', 'Machine Learning'],
  },
  {
    title: 'FastAPI – The Complete Course',
    issuer: 'Udemy',
    date: 'Coming Soon',
    color: '#0ea5e9',
    icon: '⚡',
    id: 'fastapi',
    credential: '#',
    tags: ['FastAPI', 'Python', 'APIs', 'Web Development'],
  },
]

// ─── Cert card ─────────────────────────────────────────────────
function CertCard({ cert, index }) {
  return (
    <ScrollReveal variant="scale" delay={index * 0.12}>
      <motion.div
        className="glass-card p-5 sm:p-7 relative overflow-hidden h-full flex flex-col"
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
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
            <CheckCircle size={12} style={{ color: cert.color }} />
            Verified
          </span>
          {cert.credential && cert.credential !== '#' ? (
            <motion.a
              href={cert.credential}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs hover:text-text-primary transition-colors"
              style={{ color: cert.color }}
              whileHover={{ x: 2 }}
              aria-label={`View credential for ${cert.title}`}
            >
              View Credential
              <ExternalLink size={11} />
            </motion.a>
          ) : (
            <span
              className="flex items-center gap-1 font-mono text-xs cursor-not-allowed select-none"
              style={{ color: 'rgb(var(--text-muted))', opacity: 0.7 }}
              aria-disabled="true"
              title="Credential link coming soon"
            >
              Credential Coming Soon
            </span>
          )}
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
