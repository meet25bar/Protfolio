import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Trophy, Target, TrendingUp, ExternalLink } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'

// ─── Stats config ──────────────────────────────────────────────
const STATS = [
  {
    icon: Code2,
    value: '170+',
    label: 'Problems Solved',
    sub: 'LeetCode',
    color: '#f59e0b',
  },
  {
    icon: Trophy,
    value: 'Top 20%',
    label: 'Global Rank',
    sub: 'LeetCode',
    color: '#00d4ff',
  },
  {
    icon: Target,
    value: '50+',
    label: 'Medium Solved',
    sub: 'Strong concepts',
    color: '#10d9a0',
  },
  {
    icon: TrendingUp,
    value: '6mo',
    label: 'Streak',
    sub: 'Consistent practice',
    color: '#7c3aed',
  },
]

// ─── Difficulty breakdown ──────────────────────────────────────
const DIFFICULTY = [
  { label: 'Easy',   count: 90, total: 170, color: '#10d9a0' },
  { label: 'Medium', count: 60, total: 170, color: '#f59e0b' },
  { label: 'Hard',   count: 20, total: 170, color: '#ef4444' },
]

// ─── Animated counter ─────────────────────────────────────────
function AnimatedStat({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card p-7 text-center relative overflow-hidden group"
      whileHover={{ y: -5, boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${stat.color}15` }}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at center, ${stat.color}08 0%, transparent 70%)` }}
      />

      <div
        className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
      >
        <Icon size={22} style={{ color: stat.color }} />
      </div>

      <motion.div
        className="font-syne font-extrabold text-3xl mb-1"
        style={{ color: stat.color }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 150 }}
      >
        {stat.value}
      </motion.div>

      <div className="font-manrope text-text-primary font-semibold text-sm mb-1">{stat.label}</div>
      <div className="font-mono text-text-muted text-xs">{stat.sub}</div>
    </motion.div>
  )
}

// ─── Difficulty bar ────────────────────────────────────────────
function DifficultyBar({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const pct = Math.round((item.count / item.total) * 100)

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-manrope text-sm font-semibold" style={{ color: item.color }}>
          {item.label}
        </span>
        <span className="font-mono text-sm text-text-muted">
          {item.count} / {item.total}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-text-primary/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${item.color}70, ${item.color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.3, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

// ─── CodingProfile Section ─────────────────────────────────────
export default function CodingProfile() {
  return (
    <section id="coding" className="section relative overflow-hidden">
      <div className="absolute right-1/4 top-0 w-96 h-96 rounded-full bg-glow-cyan opacity-20 pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          label="DSA & Competitive"
          title="Coding Profile"
          subtitle="Consistent problem solver with a focus on algorithms, data structures, and system-level thinking."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Difficulty breakdown + CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Difficulty bars */}
          <ScrollReveal variant="fade-left">
            <div className="glass-card p-8">
              <h3 className="font-syne font-bold text-lg text-text-primary mb-8">
                Problem Breakdown
              </h3>
              {DIFFICULTY.map((item, i) => (
                <DifficultyBar key={item.label} item={item} index={i} />
              ))}
            </div>
          </ScrollReveal>

          {/* Profile CTA */}
          <ScrollReveal variant="fade-right">
            <div className="glass-card p-8 flex flex-col justify-between h-full">
              <div>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-syne font-bold text-2xl text-text-primary mb-3">
                  Active on LeetCode
                </h3>
                <p className="font-manrope text-text-secondary text-base leading-relaxed mb-6">
                  Solving problems daily across topics like dynamic programming, graphs, trees,
                  and sliding window. Preparing rigorously for FAANG-level interviews.
                </p>

                {/* Topic chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Arrays', 'Trees', 'DP', 'Graphs', 'Sliding Window', 'Binary Search', 'Heaps'].map(t => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full font-mono text-xs bg-accent-cyan/8 border border-accent-cyan/20 text-accent-cyan/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <motion.a
                href="https://leetcode.com/u/meetbarot/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-semibold text-sm w-full transition-all"
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={15} />
                View LeetCode Profile
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
