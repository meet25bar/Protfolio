import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'

// ─── Skill categories data ─────────────────────────────────────
const CATEGORIES = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    color: '#7c3aed',
    skills: [
      { name: 'Supervised Learning', level: 90 },
      { name: 'Model Evaluation', level: 88 },
      { name: 'Data Preprocessing & Feature Eng.', level: 92 },
      { name: 'LLMs & RAG Concepts', level: 82 },
      { name: 'PyTorch & TensorFlow', level: 80 },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    color: '#00d4ff',
    skills: [
      { name: 'Python',      level: 95 },
      { name: 'C / C++',     level: 88 },
      { name: 'SQL',         level: 85 },
      { name: 'Java',        level: 78 },
      { name: 'JavaScript',  level: 82 },
    ],
  },
  {
    id: 'webdev',
    label: 'Web Dev & Databases',
    color: '#10d9a0',
    skills: [
      { name: 'HTML & CSS', level: 90 },
      { name: 'MERN Stack (Basic)', level: 75 },
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'RESTful APIs', level: 82 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Frameworks',
    color: '#f59e0b',
    skills: [
      { name: 'Scikit-learn', level: 90 },
      { name: 'Pandas & NumPy', level: 92 },
      { name: 'Hugging Face / Git', level: 88 },
      { name: 'Docker / Kubernetes', level: 75 },
      { name: 'Matplotlib & Seaborn', level: 88 },
    ],
  },
]

// ─── Animated skill bar ────────────────────────────────────────
function SkillBar({ name, level, color, inView, delay }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-manrope text-sm text-text-primary font-medium">{name}</span>
        <span className="font-mono text-xs text-text-muted">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-text-primary/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

// ─── Category card ─────────────────────────────────────────────
function CategoryCard({ category, index, isActive, onClick }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`
        glass-card p-6 cursor-pointer transition-all duration-300 relative overflow-hidden
        ${isActive ? 'border-opacity-40' : 'hover:border-text-primary/10'}
      `}
      style={isActive ? {
        borderColor: `${category.color}40`,
        boxShadow: `0 0 40px ${category.color}15, 0 4px 24px rgba(0,0,0,0.4)`,
      } : {}}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active glow accent in corner */}
      {isActive && (
        <motion.div
          layoutId="category-glow"
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20"
          style={{ background: category.color }}
        />
      )}

      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-2 h-6 rounded-full"
          style={{ background: category.color, boxShadow: `0 0 12px ${category.color}` }}
        />
        <span className="font-syne font-bold text-lg text-text-primary">{category.label}</span>
      </div>

      {/* Skill bars */}
      {category.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          color={category.color}
          inView={inView}
          delay={0.3 + i * 0.1}
        />
      ))}
    </motion.div>
  )
}

// ─── Floating skill tags (decorative) ─────────────────────────
const FLOATING_TAGS = ['PyTorch', 'TensorFlow', 'Python', 'LLMs', 'RAG', 'Hugging Face', 'Scikit-learn', 'Docker', 'Kubernetes', 'MongoDB', 'React', 'Git']

// ─── Skills Section ────────────────────────────────────────────
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ai')

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-glow-cyan opacity-30 pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          label="Tech Stack"
          title="Skills & Expertise"
          subtitle="A curated set of tools I use to bring ideas to life — from system design to machine intelligence."
        />

        {/* Floating tech tags — decorative pill row */}
        <ScrollReveal variant="fade-up" className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {FLOATING_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 rounded-full bg-surface text-text-secondary font-mono text-xs border border-surface-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.3 }}
                whileHover={{ scale: 1.08, color: '#00d4ff', borderColor: 'rgba(0,212,255,0.4)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={i}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal variant="fade-up" delay={0.4} className="mt-10 text-center">
          <p className="font-mono text-text-muted text-sm">
            Click any card to highlight · Percentages reflect relative proficiency
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
