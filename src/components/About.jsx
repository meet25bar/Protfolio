import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  GraduationCap, Briefcase, ShoppingBag, Zap, Hammer,
  Brain, Code2, Database, Wrench, MapPin, Calendar,
  TrendingUp, Award, ChevronDown, ChevronUp,
  Download, Eye, ExternalLink, Instagram, Linkedin, Github,
  BarChart3, Activity, Flame, Target,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import ScrollReveal from './ScrollReveal'
import NovaGlow from './NovaGlow'
import meetPhoto from './meet_photo.jpg'

// Custom X (formerly Twitter) icon
function XIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// ─── Timeline milestones ────────────────────────────────────────
const MILESTONES = [
  {
    icon: GraduationCap,
    year: '2023 – 2027',
    title: 'B.Tech in Computer Science',
    desc: 'Pursuing CSE at Dr. Kiran & Pallavi Patel Global University with a CGPA of 9.15. Focusing on algorithms, machine learning, and data structures.',
    color: 'rgb(99,179,237)',
  },
  {
    icon: ShoppingBag,
    year: '2023',
    title: 'Freelance Shopify Operations',
    desc: 'Designed dropshipping platforms, managed UI, product listings, and customer conversion analytics.',
    color: 'rgb(167,139,250)',
  },
  {
    icon: Briefcase,
    year: '2026',
    title: 'Prodigy InfoTech — ML Intern',
    desc: 'Trained and evaluated predictive ML models, processed large datasets, and implemented LLM/RAG workflows.',
    color: 'rgb(52,211,153)',
  },
]

// ─── Stats ─────────────────────────────────────────────────────
const STATS = [
  { value: '9.17', label: 'CGPA'        },
  { value: '250+', label: 'LeetCode'    },
  { value: '3',    label: 'Projects'    },
  { value: '3',    label: 'Experiences' },
]

// ─── Social Links ──────────────────────────────────────────────
const SOCIALS = [
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/meet.barot25', color: '#E1306C' },
  { icon: Linkedin,  label: 'LinkedIn',  url: 'https://www.linkedin.com/in/meet-barot-7b03862bb/', color: '#0A66C2' },
  { icon: Github,    label: 'GitHub',    url: 'https://github.com/meet25bar', color: '#fff' },
  { icon: XIcon,     label: 'X',         url: 'https://x.com/BarotMeet23562', color: '#fff' },
]

// ─── LeetCode Stats ────────────────────────────────────────────
const LEETCODE_STATS = {
  solved: 250,
  total: 3962,
  easy: { solved: 120, total: 950 },
  medium: { solved: 116, total: 2069 },
  hard: { solved: 14, total: 943 },
  submissions: 367,
  activeDays: 234,
  maxStreak: 48,
}

const GITHUB_STATS = {
  contributions: 162,
}

// ─── Devicon logo mapping ──────────────────────────────────────
const SKILL_LOGOS = {
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'C / C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
  'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
  'OpenCV': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
  'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'Matplotlib': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
  'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
  'HTML & CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
  'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'Anaconda': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg',
  'Kaggle': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg',
  'Streamlit': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
}

// ─── Skill descriptions ────────────────────────────────────────
const SKILL_DESCRIPTIONS = {
  'Python': 'Versatile high-level language used for AI/ML, data science, web backends, and automation.',
  'C / C++': 'Low-level systems programming languages for performance-critical applications and competitive programming.',
  'SQL': 'Standard language for managing and querying relational databases efficiently.',
  'Java': 'Object-oriented language widely used in enterprise backends, Android apps, and large-scale systems.',
  'JavaScript': 'The language of the web — powers interactive frontends, Node.js backends, and full-stack apps.',
  'R': 'Statistical computing language popular in data analysis, bioinformatics, and academic research.',
  'TypeScript': 'Typed superset of JavaScript that improves code reliability and developer experience at scale.',
  'PyTorch': 'Deep learning framework by Meta, favored for research-grade flexibility and dynamic computation graphs.',
  'TensorFlow': 'Google\'s production-grade ML framework for building and deploying deep learning models at scale.',
  'Scikit-learn': 'Go-to Python library for classical ML — classification, regression, clustering, and model evaluation.',
  'Keras': 'High-level neural network API that simplifies building and training deep learning models.',
  'OpenCV': 'Industry-standard library for real-time computer vision, image processing, and video analysis.',
  'NumPy': 'Foundation of scientific computing in Python — fast array operations and linear algebra.',
  'Pandas': 'Data manipulation powerhouse for cleaning, transforming, and analyzing tabular datasets.',
  'Matplotlib': 'Comprehensive plotting library for creating publication-quality static and interactive visualizations.',
  'Jupyter': 'Interactive notebook environment for data exploration, prototyping, and reproducible research.',
  'HTML & CSS': 'Core web technologies for structuring content and styling beautiful, responsive interfaces.',
  'React': 'Component-based UI library by Meta for building fast, interactive single-page applications.',
  'Node.js': 'JavaScript runtime for building scalable server-side applications and APIs.',
  'Express': 'Minimal and flexible Node.js web framework for building RESTful APIs and web servers.',
  'Next.js': 'React meta-framework with SSR, static generation, and optimized performance out of the box.',
  'Tailwind CSS': 'Utility-first CSS framework for rapidly building custom designs without writing custom CSS.',
  'MySQL': 'Widely-used open-source relational database known for reliability and SQL compliance.',
  'MongoDB': 'NoSQL document database designed for flexibility, scalability, and JSON-like data storage.',
  'PostgreSQL': 'Advanced open-source relational database with strong ACID compliance and extensibility.',
  'Redis': 'In-memory key-value store used for caching, session management, and real-time data processing.',
  'Firebase': 'Google\'s BaaS platform providing auth, real-time database, hosting, and cloud functions.',
  'Docker': 'Containerization platform for packaging apps with dependencies into portable, reproducible environments.',
  'Git': 'Distributed version control system for tracking code changes and enabling team collaboration.',
  'GitHub': 'Cloud platform for Git hosting, code review, CI/CD pipelines, and open-source collaboration.',
  'VS Code': 'Lightweight but powerful code editor with rich extensions, debugging, and Git integration.',
  'Linux': 'Open-source OS powering servers, cloud infrastructure, and development environments worldwide.',
  'Kubernetes': 'Container orchestration platform for automating deployment, scaling, and management of containerized apps.',
  'Flask': 'Lightweight Python web framework ideal for building APIs, microservices, and ML model endpoints.',
  'FastAPI': 'Modern, high-performance Python framework for building APIs with automatic docs and type validation.',
  'Anaconda': 'Python/R distribution for data science with built-in package management and environment isolation.',
  'Kaggle': 'Data science platform for competitions, datasets, and collaborative ML notebooks.',
  'Streamlit': 'Python framework for turning data scripts into shareable, interactive web apps in minutes.',
}

// ─── Skills ────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    label: 'AI & Machine Learning',
    color: 'rgb(167,139,250)',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib', 'Jupyter', 'Kaggle', 'Streamlit'],
  },
  {
    label: 'Languages',
    color: 'rgb(99,179,237)',
    skills: ['Python', 'C / C++', 'Java', 'JavaScript', 'SQL', 'R', 'TypeScript'],
  },
  {
    label: 'Web & Databases',
    color: 'rgb(52,211,153)',
    skills: ['HTML & CSS', 'React', 'Node.js', 'Express', 'Next.js', 'Tailwind CSS', 'MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase'],
  },
  {
    label: 'Tools & Frameworks',
    color: 'rgb(251,191,36)',
    skills: ['Docker', 'Git', 'GitHub', 'VS Code', 'Linux', 'Kubernetes', 'Flask', 'FastAPI', 'Anaconda'],
  },
]

// ─── Currently Building ─────────────────────────────────────────
const CURRENT_PROJECTS = [
  {
    name: 'KisanSangam',
    emoji: '🌾',
    desc: 'Smart agriculture platform — AI-based crop planning, land utilization insights, market-driven farming recommendations, and a digital land leasing system.',
    status: 'In Progress',
    tags: ['AI/ML', 'Agriculture', 'Fullstack'],
    color: 'rgb(52,211,153)',
  },
  {
    name: 'Project 2',
    emoji: '🔬',
    desc: 'Details coming soon — stay tuned for updates.',
    status: 'Planning',
    tags: ['ML', 'Research'],
    color: 'rgb(167,139,250)',
  },
]

// ─── Photo Card with 3D tilt ────────────────────────────────────
function PhotoCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -12, y: dx * 12 })
  }

  return (
    <div
      className="relative mx-auto w-[220px] h-[270px] md:w-[240px] md:h-[295px]"
      style={{ perspective: 800 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        style={{ transformStyle: 'preserve-3d', borderRadius: 20, overflow: 'hidden', width: '100%', height: '100%' }}
        className="relative"
      >
        {/* Gradient border ring */}
        <div
          className="absolute inset-0 rounded-[20px] z-10 pointer-events-none"
          style={{
            padding: 2,
            background: 'linear-gradient(135deg, rgba(99,179,237,0.6), rgba(167,139,250,0.5), rgba(52,211,153,0.5))',
            borderRadius: 20,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Photo */}
        <img
          src={meetPhoto}
          alt="Meet Barot"
          className="w-full h-full object-cover object-top select-none"
          style={{ borderRadius: 18 }}
          draggable={false}
        />

        {/* Shine overlay on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: 18 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgb(var(--text-primary) / 0.08) 0%, transparent 60%)',
              width: '100%',
              height: '100%',
              borderRadius: 18,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Glow beneath */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 pointer-events-none"
        animate={{ opacity: hovered ? 0.5 : 0.25 }}
        style={{
          background: 'radial-gradient(ellipse, rgba(99,179,237,0.5) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Name badge */}
      <motion.div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap glass-card px-4 py-1.5 z-20"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="font-syne font-bold text-sm text-text-primary">Meet Barot</span>
        <span className="font-mono text-xs ml-2" style={{ color: 'rgb(99,179,237)' }}>· AI / ML</span>
      </motion.div>
    </div>
  )
}

// ─── Timeline item ──────────────────────────────────────────────
function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5 pl-2"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.14 + 0.2, type: 'spring', stiffness: 200 }}
          className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: `${item.color}18`,
            border: `1px solid ${item.color}40`,
            boxShadow: `0 0 16px ${item.color}18`,
          }}
        >
          <Icon size={18} style={{ color: item.color }} />
        </motion.div>
        {index < MILESTONES.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.14 + 0.4, duration: 0.5 }}
            className="mt-2 w-px flex-1 origin-top"
            style={{ background: `linear-gradient(to bottom, ${item.color}35, transparent)` }}
          />
        )}
      </div>
      <div className="pb-9">
        <span className="font-mono text-xs tracking-widest uppercase text-text-muted">{item.year}</span>
        <h3 className="font-syne font-bold text-lg text-text-primary mt-1 mb-1.5">{item.title}</h3>
        <p className="font-manrope text-text-secondary text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Skills section ─────────────────────────────────────────────
function SkillsPanel() {
  const [open, setOpen] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  return (
    <div className="space-y-3">
      {SKILL_GROUPS.map((group, gi) => (
        <div key={group.label} className="glass-card overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-3.5 text-left"
            onClick={() => { setOpen(open === gi ? null : gi); setSelectedSkill(null) }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
              <span className="font-syne font-semibold text-sm text-text-primary">{group.label}</span>
            </div>
            <motion.span animate={{ rotate: open === gi ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={15} style={{ color: 'rgb(90,99,120)' }} />
            </motion.span>
          </button>
          <AnimatePresence>
            {open === gi && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-3 flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <motion.span
                      key={skill}
                      className={`skill-pill cursor-pointer ${
                        selectedSkill === skill ? 'skill-pill-active' : ''
                      }`}
                      onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={
                        selectedSkill === skill
                          ? {
                              borderColor: `${group.color}60`,
                              background: `${group.color}15`,
                              color: group.color,
                            }
                          : {}
                      }
                    >
                      {SKILL_LOGOS[skill] && (
                        <img src={SKILL_LOGOS[skill]} alt={skill} className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.15))' }} />
                      )}
                      {skill}
                    </motion.span>
                  ))}
                </div>
                {/* Skill description tooltip */}
                <AnimatePresence mode="wait">
                  {selectedSkill && SKILL_DESCRIPTIONS[selectedSkill] && (
                    <motion.div
                      key={selectedSkill}
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mx-5 mb-4 px-4 py-3 rounded-xl flex items-start gap-3"
                        style={{
                          background: `${group.color}08`,
                          border: `1px solid ${group.color}20`,
                        }}
                      >
                        {SKILL_LOGOS[selectedSkill] && (
                          <img src={SKILL_LOGOS[selectedSkill]} alt={selectedSkill} className="w-5 h-5 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <span className="font-syne font-bold text-xs block mb-0.5" style={{ color: group.color }}>
                            {selectedSkill}
                          </span>
                          <span className="font-manrope text-xs text-text-secondary leading-relaxed">
                            {SKILL_DESCRIPTIONS[selectedSkill]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── Coding Stats Section ───────────────────────────────────────
function CodingStatsPanel() {
  const easyPct = (LEETCODE_STATS.easy.solved / LEETCODE_STATS.easy.total) * 100
  const medPct  = (LEETCODE_STATS.medium.solved / LEETCODE_STATS.medium.total) * 100
  const hardPct = (LEETCODE_STATS.hard.solved / LEETCODE_STATS.hard.total) * 100
  const totalPct = (LEETCODE_STATS.solved / LEETCODE_STATS.total) * 100

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* LeetCode Card */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(251,191,36,0.08), transparent 70%)' }}
        />
        <div className="flex items-center gap-2 mb-5">
          <Target size={16} style={{ color: 'rgb(251,191,36)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-text-muted">LeetCode Stats</span>
        </div>

        {/* Overall progress ring */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-24 h-24 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(var(--text-primary) / 0.06)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none"
                stroke="rgb(251,191,36)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${totalPct * 2.64} ${264 - totalPct * 2.64}`}
                initial={{ strokeDasharray: '0 264' }}
                whileInView={{ strokeDasharray: `${totalPct * 2.64} ${264 - totalPct * 2.64}` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-syne font-bold text-xl text-text-primary">{LEETCODE_STATS.solved}</span>
              <span className="font-mono text-[9px] text-text-muted">/ {LEETCODE_STATS.total}</span>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            {/* Easy */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-xs text-emerald-400">Easy</span>
                <span className="font-mono text-xs text-text-muted">{LEETCODE_STATS.easy.solved}/{LEETCODE_STATS.easy.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-text-primary/5">
                <motion.div
                  className="h-full rounded-full bg-emerald-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${easyPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>
            {/* Medium */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-xs text-amber-400">Medium</span>
                <span className="font-mono text-xs text-text-muted">{LEETCODE_STATS.medium.solved}/{LEETCODE_STATS.medium.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-text-primary/5">
                <motion.div
                  className="h-full rounded-full bg-amber-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${medPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
            {/* Hard */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-xs text-red-400">Hard</span>
                <span className="font-mono text-xs text-text-muted">{LEETCODE_STATS.hard.solved}/{LEETCODE_STATS.hard.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-text-primary/5">
                <motion.div
                  className="h-full rounded-full bg-red-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${hardPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Activity, label: 'Submissions', value: LEETCODE_STATS.submissions, color: 'rgb(99,179,237)' },
            { icon: Flame,    label: 'Active Days', value: LEETCODE_STATS.activeDays, color: 'rgb(52,211,153)' },
            { icon: Zap,      label: 'Max Streak',  value: LEETCODE_STATS.maxStreak,  color: 'rgb(251,191,36)' },
          ].map(s => (
            <div
              key={s.label}
              className="text-center p-3 rounded-xl"
              style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}
            >
              <s.icon size={14} className="mx-auto mb-1" style={{ color: s.color }} />
              <div className="font-syne font-bold text-lg text-text-primary">{s.value}</div>
              <div className="font-mono text-[9px] text-text-muted uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Card */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(52,211,153,0.08), transparent 70%)' }}
        />
        <div className="flex items-center gap-2 mb-4">
          <Github size={16} style={{ color: 'rgb(52,211,153)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-text-muted">GitHub Activity</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-syne font-bold text-3xl text-text-primary">{GITHUB_STATS.contributions}</span>
          <span className="font-manrope text-sm text-text-muted">contributions in the last year</span>
        </div>
        {/* Mini heatmap grid */}
        <div className="flex gap-[3px] flex-wrap">
          {Array.from({ length: 52 }, (_, week) => (
            <div key={week} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }, (_, day) => {
                const idx = week * 7 + day
                const intensity = Math.random()
                const bg =
                  intensity > 0.85 ? 'rgba(52,211,153,0.9)' :
                  intensity > 0.65 ? 'rgba(52,211,153,0.6)' :
                  intensity > 0.4  ? 'rgba(52,211,153,0.35)' :
                  intensity > 0.2  ? 'rgba(52,211,153,0.15)' :
                  'rgb(var(--text-primary) / 0.04)'
                return (
                  <div
                    key={idx}
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ background: bg }}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="font-mono text-[9px] text-text-muted">Less</span>
          {[0.04, 0.15, 0.35, 0.6, 0.9].map((op, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ background: `rgba(52,211,153,${op})` }}
            />
          ))}
          <span className="font-mono text-[9px] text-text-muted">More</span>
        </div>
      </div>
    </div>
  )
}

// ─── Social Links ───────────────────────────────────────────────
function SocialLinksRow() {
  return (
    <div className="flex items-center gap-3 mt-6">
      {SOCIALS.map((social) => {
        const Icon = social.icon
        return (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--surface-border)',
            }}
            whileHover={{
              scale: 1.15,
              borderColor: `${social.color}60`,
              boxShadow: `0 0 20px ${social.color}25`,
            }}
            whileTap={{ scale: 0.92 }}
            title={social.label}
          >
            <Icon size={18} className="text-text-secondary group-hover:text-text-primary transition-colors duration-200" />
          </motion.a>
        )
      })}
    </div>
  )
}

// ─── Resume Section ─────────────────────────────────────────────
function ResumeButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <motion.a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-manrope font-semibold text-sm"
        style={{
          background: 'rgba(99,179,237,0.12)',
          border: '1px solid rgba(99,179,237,0.25)',
          color: 'rgb(99,179,237)',
        }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 0 24px rgba(99,179,237,0.2)',
          borderColor: 'rgba(99,179,237,0.45)',
        }}
        whileTap={{ scale: 0.96 }}
      >
        <Eye size={16} />
        View Resume
      </motion.a>
      <motion.a
        href="/resume.pdf"
        download="Meet_Barot_Resume.pdf"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-manrope font-semibold text-sm"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          color: 'rgb(var(--text-secondary))',
        }}
        whileHover={{
          scale: 1.04,
          borderColor: 'rgb(var(--text-primary) / 0.2)',
        }}
        whileTap={{ scale: 0.96 }}
      >
        <Download size={16} />
        Download Resume
      </motion.a>
    </div>
  )
}

// ─── About Section ──────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[460px] h-[460px] pointer-events-none z-0 opacity-70 hidden md:block">
        <NovaGlow hue={220} hoverIntensity={0.4} rotateOnHover={true} className="w-full h-full" />
      </div>
      <div className="absolute left-[-80px] top-10 w-[260px] h-[260px] pointer-events-none z-0 opacity-50">
        <NovaGlow hue={280} hoverIntensity={0.3} rotateOnHover={true} className="w-full h-full" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          label="Who I Am"
          title="About Me"
          subtitle="A passionate builder at the intersection of engineering and intelligence."
        />

        {/* ── TOP: Photo + Bio + Stats ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start mb-12">

          {/* Left: Photo + recruiter highlights */}
          <ScrollReveal variant="fade-left">
            <div className="flex flex-col items-center lg:items-start gap-10">

              {/* Photo */}
              <PhotoCard />

              {/* Availability badge */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-medium mt-6"
                style={{
                  background: 'rgba(52,211,153,0.08)',
                  border: '1px solid rgba(52,211,153,0.25)',
                  color: 'rgb(52,211,153)',
                }}
                animate={{ boxShadow: ['0 0 0px rgba(52,211,153,0.2)', '0 0 14px rgba(52,211,153,0.3)', '0 0 0px rgba(52,211,153,0.2)'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to Roles · June 2026
              </motion.div>

              {/* Location + Status */}
              <div className="flex flex-col gap-2 text-sm text-text-secondary font-manrope">
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: 'rgb(99,179,237)' }} />
                  <span>Varnama, Gujarat, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} style={{ color: 'rgb(167,139,250)' }} />
                  <span>B.Tech CSE — 2023–2027 (3rd Year)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} style={{ color: 'rgb(52,211,153)' }} />
                  <span>CGPA 9.15 / 10 · Dean's List</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Bio + Stats */}
          <div>
            <ScrollReveal variant="fade-right">
              <div className="glass-card p-7 mb-6 relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgba(99,179,237,0.10), transparent 70%)' }}
                />
                <p className="font-manrope text-text-secondary text-base leading-relaxed mb-4">
                  I'm a <span className="text-text-primary font-semibold">B.Tech CSE student</span> at{' '}
                  <span className="text-text-primary font-semibold">Dr. Kiran &amp; Pallavi Patel Global University</span> with a CGPA of{' '}
                  <span className="font-semibold" style={{ color: 'rgb(99,179,237)' }}>9.15</span>, deeply passionate about
                  Artificial Intelligence, Machine Learning, and Data Science.
                </p>
                <p className="font-manrope text-text-secondary text-base leading-relaxed mb-4">
                  My work spans building robust machine learning pipelines, evaluation protocols, and data preprocessing workflows.
                  I'm also exploring modern concepts like <span className="text-text-primary font-semibold">LLMs</span>,{' '}
                  <span className="text-text-primary font-semibold">RAG</span>, and full-stack solutions.
                </p>
                <p className="font-manrope text-text-secondary text-base leading-relaxed">
                  I'm actively seeking <span className="font-semibold" style={{ color: 'rgb(99,179,237)' }}>AI/ML Engineer
                  and SDE roles</span> where I can contribute to high-impact projects and solve complex real-world problems.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((stat, i) => (
                <ScrollReveal key={stat.label} variant="scale" delay={i * 0.08}>
                  <div className="glass-card p-4 text-center glass-card-hover">
                    <div className="font-syne font-bold text-2xl gradient-text-cyan">{stat.value}</div>
                    <div className="font-manrope text-text-muted text-xs mt-1">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Socials */}
            <ScrollReveal variant="fade-right" delay={0.2}>
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink size={14} style={{ color: 'rgb(167,139,250)' }} />
                  <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Connect With Me</span>
                </div>
                <SocialLinksRow />
              </div>
            </ScrollReveal>

            {/* Resume */}
            <ScrollReveal variant="fade-right" delay={0.3}>
              <div className="mt-4">
                <ResumeButtons />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── CODING STATS ── */}
        <ScrollReveal variant="fade-up" className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={16} style={{ color: 'rgb(251,191,36)' }} />
              <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Current Coding Stats</span>
            </div>
            <h2 className="font-syne font-bold text-2xl text-text-primary">Problem Solving & Contributions</h2>
          </div>
          <CodingStatsPanel />
        </ScrollReveal>

        {/* ── CURRENTLY BUILDING ── */}
        <ScrollReveal variant="fade-up" className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Hammer size={16} style={{ color: 'rgb(251,191,36)' }} />
              <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Currently Building</span>
            </div>
            <h2 className="font-syne font-bold text-2xl text-text-primary">Active Projects</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {CURRENT_PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.name}
                className="glass-card p-6 relative overflow-hidden glass-card-hover"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Color accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 pointer-events-none"
                  style={{ background: proj.color }}
                />

                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{proj.emoji}</span>
                  <span
                    className="font-mono text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      color: proj.color,
                      borderColor: `${proj.color}40`,
                      background: `${proj.color}10`,
                    }}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3 className="font-syne font-bold text-lg text-text-primary mb-2">{proj.name}</h3>
                <p className="font-manrope text-text-secondary text-sm leading-relaxed mb-4">{proj.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(tag => (
                    <span key={tag} className="skill-pill text-xs">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── BOTTOM: Timeline + Skills ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp size={16} style={{ color: 'rgb(99,179,237)' }} />
              <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Journey</span>
            </div>
            {MILESTONES.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Zap size={16} style={{ color: 'rgb(167,139,250)' }} />
              <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Skills &amp; Tech Stack</span>
            </div>
            <ScrollReveal variant="fade-left">
              <SkillsPanel />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
