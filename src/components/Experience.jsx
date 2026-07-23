import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'

// ─── Experience data ───────────────────────────────────────────
const EXPERIENCES = [
  {
    role: 'Python Developer',
    company: '[Company Name Placeholder]',
    type: 'Experience',
    period: '2 mos',
    location: '[Location Placeholder]',
    color: '#eab308',
    contributions: [
      '[Contribution placeholder 1]',
      '[Contribution placeholder 2]',
    ],
    skills: ['Python'],
  },
  {
    role: 'Machine Learning Intern',
    company: 'Prodigy InfoTech',
    type: 'Internship',
    period: 'Apr 2026 – May 2026',
    location: 'Remote',
    color: '#00d4ff',
    contributions: [
      'Developed and evaluated predictive machine learning models on real-world datasets, improving prediction performance through preprocessing and feature engineering',
      'Analyzed structured datasets to identify patterns and generate actionable insights using statistical methods and visualization libraries',
      'Applied LLM and RAG concepts to design intelligent workflows and solve real-world problem scenarios',
    ],
    skills: ['Python', 'Scikit-learn', 'Pandas', 'LLMs', 'RAG'],
  },
  {
    role: 'Java Developer Intern',
    company: 'Cognifyz Technologies',
    type: 'Internship',
    period: 'Mar 2025 - Apr 2025 · 2 mos',
    location: 'Bharuch, Gujarat, India · Remote',
    color: '#a78bfa',
    contributions: [
      'Engineered and optimized backend application components in Java, adhering to strong OOP patterns and clean architecture standards',
      'Created SQL database schemas and queries, utilizing JDBC for seamless data persistence and retrieval services',
      'Refactored, debugged, and documented codebase segments to boost application stability, speed, and overall system quality',
    ],
    skills: ['Java', 'OOP', 'SQL', 'JDBC', 'JUnit'],
  },
  {
    role: 'Freelance Developer',
    company: 'Self-Employed',
    type: 'Freelance',
    period: 'Aug 2023 – Dec 2023',
    location: 'Remote',
    color: '#10d9a0',
    contributions: [
      'Designed and managed a Shopify-based dropshipping platform, handling operations, UI design, product listings, and order fulfillment systems',
      'Executed and optimized social media marketing campaigns, managed client interactions, and performed business conversion analytics',
    ],
    skills: ['Shopify', 'Business Analytics', 'Social Media Marketing', 'Operations'],
  },
]

// ─── Experience card ───────────────────────────────────────────
function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const isLeft = index % 2 === 0

  return (
    <article
      ref={ref}
      className={`relative flex gap-8 mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse md:flex-row'}`}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{
            backgroundColor: 'rgb(var(--bg-primary))',
            backgroundImage: `linear-gradient(${exp.color}15, ${exp.color}15)`,
            border: `2px solid ${exp.color}50`,
            boxShadow: `0 0 24px ${exp.color}25`,
          }}
        >
          <Briefcase size={20} style={{ color: exp.color }} />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        whileHover={{
          y: -4,
          borderColor: `${exp.color}60`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${exp.color}15`,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 150,
          damping: 20
        }}
        className="flex-1 glass-card p-7 relative overflow-hidden group transition-all duration-300"
        style={{
          borderTop: `2px solid ${exp.color}40`,
        }}
      >
        {/* Subtle background gradient */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-10 pointer-events-none"
          style={{ background: exp.color }}
        />

        {/* Role header */}
        <header className="relative z-10 flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-syne font-bold text-xl text-text-primary mb-1">{exp.role}</h3>
            <span className="font-manrope font-semibold text-base" style={{ color: exp.color }}>
              {exp.company}
            </span>
          </div>
          <span
            className="px-3 py-1 rounded-full font-mono text-xs border"
            style={{
              background: `${exp.color}12`,
              borderColor: `${exp.color}35`,
              color: exp.color,
            }}
          >
            {exp.type}
          </span>
        </header>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-6">
          <time className="flex items-center gap-1.5 text-text-muted font-mono text-xs">
            <Calendar size={12} />
            {exp.period}
          </time>
          <span className="flex items-center gap-1.5 text-text-muted font-mono text-xs">
            <MapPin size={12} />
            {exp.location}
          </span>
        </div>

        {/* Contributions */}
        <ul className="space-y-2.5 mb-6" aria-label={`Contributions at ${exp.company}`}>
          {exp.contributions.map((c, i) => (
            <li key={i} className="flex items-start gap-3">
              <ArrowRight
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: exp.color }}
              />
              <span className="font-manrope text-text-secondary text-sm leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>

        {/* Skills */}
        <footer className="flex flex-wrap gap-2">
          {exp.skills.map(s => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-md font-mono text-xs"
              style={{
                background: `${exp.color}10`,
                color: `${exp.color}cc`,
                border: `1px solid ${exp.color}25`,
              }}
            >
              {s}
            </span>
          ))}
        </footer>
      </motion.div>
    </article>
  )
}

// ─── Experience Section ────────────────────────────────────────
export default function Experience() {
  const containerRef = React.useRef(null)

  // Track scroll position to draw timeline line dynamically
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Dynamic JSON-LD structured data for search engine crawlers
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Meet Barot",
    "jobTitle": "Software Developer & ML Engineer",
    "worksFor": EXPERIENCES.map(exp => ({
      "@type": "EmployeeRole",
      "roleName": exp.role,
      "startDate": exp.period.split(' – ')[0] || exp.period.split(' - ')[0],
      "endDate": exp.period.split(' – ')[1]?.split(' · ')[0] || exp.period.split(' - ')[1]?.split(' · ')[0] || "Present",
      "hiringOrganization": {
        "@type": "Organization",
        "name": exp.company,
        "location": {
          "@type": "Place",
          "name": exp.location
        }
      }
    }))
  }

  return (
    <section id="experience" className="section relative overflow-hidden" ref={containerRef}>
      {/* Search engine crawler structured metadata */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>

      <div className="section-container">
        <SectionHeader
          label="Work History"
          title="Experience"
          subtitle="Hands-on experience in professional environments — delivering real impact."
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Static track line */}
          <div className="absolute left-7 top-0 -translate-x-1/2 w-px h-full bg-text-primary/5 pointer-events-none hidden md:block" />

          {/* Animated scroll progress timeline line */}
          <motion.div
            style={{
              scaleY,
              originY: 0,
              background: 'linear-gradient(to bottom, rgb(var(--accent-cyan)), rgb(var(--accent-violet)), rgb(var(--accent-emerald)))'
            }}
            className="absolute left-7 top-0 -translate-x-1/2 w-[2px] h-full pointer-events-none hidden md:block"
          />

          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
