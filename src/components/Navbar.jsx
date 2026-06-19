import React, { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { Home, User, FolderGit2, Briefcase, Mail } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLocation, useNavigate } from 'react-router-dom'
import avatarImg from './meet_photo.jpg'
import ConicGradientAnimation from './ConicGradientAnimation'

const NAV_LINKS = [
  { path: '/',           icon: Home,       label: 'Home',       glow: 'rgba(99, 179, 237, 0.4)'  },
  { path: '/about',      icon: User,       label: 'About',      glow: 'rgba(167, 139, 250, 0.4)' },
  { path: '/projects',   icon: FolderGit2, label: 'Projects',   glow: 'rgba(52, 211, 153, 0.4)'  },
  { path: '/experience', icon: Briefcase,  label: 'Experience', glow: 'rgba(52, 211, 153, 0.4)'  },
  { path: '/contact',    icon: Mail,       label: 'Contact',    glow: 'rgba(244, 63, 94, 0.4)'   },
]

/* ───────── Mobile Sizing and Touch Detection Hook ───────── */
function useMobileSizing() {
  const [sizing, setSizing] = React.useState({ isMobile: false, size: 52 })
  
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const isTouch = window.matchMedia('(pointer: coarse)').matches
      const isMobile = width < 768 || isTouch
      
      let size = 52
      if (width < 360) {
        size = 34
      } else if (width < 400) {
        size = 38
      } else if (width < 480) {
        size = 42
      } else if (width < 768) {
        size = 46
      }
      
      setSizing({ isMobile, size })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return sizing
}

/* ───────── Shared Magnification Math Hook ───────── */
function useDockMagnification(mouseX, ref, standardSize = 54, magnifiedSize = 82, isMobile = false) {
  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return 9999
    const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, width: 0 }
    return val - bounds.left - bounds.width / 2
  })

  // Smooth transformation from distance to size
  const sizeSync = useTransform(
    distance,
    [-140, 0, 140],
    isMobile ? [standardSize, standardSize, standardSize] : [standardSize, magnifiedSize, standardSize]
  )

  // Smooth spring physics for a native, elastic desktop dock feel
  const size = useSpring(sizeSync, {
    mass: 0.12,
    stiffness: 180,
    damping: 14,
  })

  return size
}

/* ───────── Premium Interactive Dock Icon ───────── */
function DockIcon({ mouseX, icon: Icon, label, isActive, isDark, onClick, glowColor }) {
  const ref = useRef(null)
  const { isMobile, size: standardSize } = useMobileSizing()
  const magnifiedSize = isMobile ? standardSize : 78
  const size = useDockMagnification(mouseX, ref, standardSize, magnifiedSize, isMobile)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center justify-end"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dynamic Ambient Blur Glow behind the icon */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.5, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-2 rounded-2xl filter blur-xl pointer-events-none z-0"
            style={{ backgroundColor: glowColor }}
          />
        )}
      </AnimatePresence>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.85, x: '-50%' }}
            animate={{ opacity: 1, y: -10, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 6, scale: 0.9, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="absolute left-1/2 -top-12 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap pointer-events-none z-50 glass-card"
            style={{
              boxShadow: isDark
                ? '0 6px 20px -4px rgba(0,0,0,0.6)'
                : '0 6px 20px -4px rgba(0,0,0,0.12)',
            }}
          >
            {label}
            {/* Tooltip Arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 rotate-45 border-r border-b"
              style={{
                backgroundColor: isDark ? 'rgba(12,22,40,0.85)' : 'rgb(var(--text-primary) / 0.9)',
                borderColor: isDark ? 'rgb(var(--text-primary) / 0.08)' : 'rgba(0,0,0,0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon Button */}
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.88 }}
        className="w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer border transition-colors duration-200 z-10"
        style={{
          backgroundColor: isActive
            ? isDark
              ? 'rgb(var(--text-primary) / 0.08)'
              : 'rgba(0, 0, 0, 0.06)'
            : 'rgb(var(--text-primary) / 0.01)',
          borderColor: isActive
            ? isDark
              ? 'rgb(var(--text-primary) / 0.18)'
              : 'rgba(0, 0, 0, 0.12)'
            : isDark
              ? 'rgb(var(--text-primary) / 0.04)'
              : 'rgba(0, 0, 0, 0.04)',
        }}
        aria-label={label}
      >
        {/* Subtle hover overlay inside the button */}
        <motion.div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgb(var(--text-primary) / 0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgb(var(--bg-primary) / 0.03) 0%, transparent 70%)'
          }}
        />

        <Icon
          size={21}
          strokeWidth={isActive ? 2.5 : 2}
          className="relative z-20 transition-all duration-300"
          style={{
            color: isActive
              ? isDark ? '#00d4ff' : '#0284c7'
              : isDark ? 'rgb(var(--text-primary) / 0.7)' : 'rgba(15,23,42,0.7)',
            filter: isActive ? 'drop-shadow(0 0 8px rgba(0,212,255,0.25))' : 'none',
          }}
        />
      </motion.button>

      {/* Active Indicator Dot under the icon */}
      {isActive && (
        <motion.div
          layoutId="dock-dot"
          className="absolute -bottom-2 w-1.5 h-1.5 rounded-full"
          style={{
            background: isDark ? 'rgb(0, 212, 255)' : 'rgb(2, 132, 199)',
            boxShadow: isDark
              ? '0 0 10px rgb(0, 212, 255)'
              : '0 0 10px rgb(2, 132, 199)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        />
      )}
    </motion.div>
  )
}

/* ───────── Dock Interactive Profile Avatar ───────── */
function DockProfile({ mouseX, isDark, onClick }) {
  const ref = useRef(null)
  const { isMobile, size: standardSize } = useMobileSizing()
  const magnifiedSize = isMobile ? standardSize : 78
  const size = useDockMagnification(mouseX, ref, standardSize, magnifiedSize, isMobile)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center justify-end"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow when hovering avatar */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.45, scale: 1.15 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-1 rounded-full filter blur-xl pointer-events-none z-0"
            style={{ backgroundColor: isDark ? 'rgba(0, 212, 255, 0.4)' : 'rgba(109, 40, 217, 0.3)' }}
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.85, x: '-50%' }}
            animate={{ opacity: 1, y: -10, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 6, scale: 0.9, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="absolute left-1/2 -top-12 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase whitespace-nowrap pointer-events-none z-50 glass-card"
            style={{
              boxShadow: isDark
                ? '0 6px 20px -4px rgba(0,0,0,0.6)'
                : '0 6px 20px -4px rgba(0,0,0,0.12)',
            }}
          >
            Meet Barot
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 rotate-45 border-r border-b"
              style={{
                backgroundColor: isDark ? 'rgba(12,22,40,0.85)' : 'rgb(var(--text-primary) / 0.9)',
                borderColor: isDark ? 'rgb(var(--text-primary) / 0.08)' : 'rgba(0,0,0,0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.88 }}
        className="w-full h-full rounded-2xl overflow-hidden cursor-pointer relative border p-0.5 transition-all duration-300 z-10"
        style={{
          borderColor: hovered
            ? isDark ? 'rgba(0,212,255,0.6)' : 'rgba(109,40,217,0.5)'
            : isDark ? 'rgb(var(--text-primary) / 0.12)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: hovered 
            ? isDark ? '0 0 15px rgba(0,212,255,0.3)' : '0 0 15px rgba(109,40,217,0.2)'
            : 'none'
        }}
      >
        <img
          src={avatarImg}
          alt="Meet Barot Avatar"
          className="w-full h-full object-cover rounded-[14px] select-none"
        />
      </motion.button>
    </motion.div>
  )
}

/* ───────── Dock Interactive Theme Toggle (Framer Style) ───────── */
const ANIMATION_DURATION = 320 // ms, matches Framer component

function DockThemeToggle({ mouseX, isDark, toggle }) {
  const ref = useRef(null)
  const { isMobile, size: standardSize } = useMobileSizing()
  const magnifiedSize = isMobile ? standardSize : 78
  const size = useDockMagnification(mouseX, ref, standardSize, magnifiedSize, isMobile)
  const [hovered, setHovered] = useState(false)

  // Derived icon color
  const iconColor = isDark ? 'rgba(251, 191, 36, 1)' : '#1e293b'
  const iconSize = 20

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center justify-end"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow when hovering theme toggle */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.45, scale: 1.15 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-1 rounded-2xl filter blur-xl pointer-events-none z-0"
            style={{ backgroundColor: isDark ? 'rgba(251, 191, 36, 0.35)' : 'rgba(30, 41, 59, 0.3)' }}
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.85, x: '-50%' }}
            animate={{ opacity: 1, y: -10, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 6, scale: 0.9, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="absolute left-1/2 -top-12 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none z-50 glass-card"
            style={{
              boxShadow: isDark
                ? '0 6px 20px -4px rgba(0,0,0,0.6)'
                : '0 6px 20px -4px rgba(0,0,0,0.12)',
            }}
          >
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 rotate-45 border-r border-b"
              style={{
                backgroundColor: isDark ? 'rgba(12,22,40,0.85)' : 'rgb(var(--text-primary) / 0.9)',
                borderColor: isDark ? 'rgb(var(--text-primary) / 0.08)' : 'rgba(0,0,0,0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.88 }}
        className="w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer border z-10"
        style={{
          backgroundColor: 'rgb(var(--text-primary) / 0.01)',
          borderColor: isDark ? 'rgb(var(--text-primary) / 0.04)' : 'rgba(0, 0, 0, 0.04)',
          opacity: hovered ? 0.82 : 1,
          transition: `opacity ${ANIMATION_DURATION}ms ease`,
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {/* ── Sun icon — visible in dark mode ── */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: 'absolute',
            transform: isDark
              ? 'scale(1) translateY(0px)'
              : 'scale(0.5) translateY(20px)',
            opacity: isDark ? 1 : 0,
            transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* ── Moon icon — visible in light mode ── */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: 'absolute',
            transform: !isDark
              ? 'scale(1) translateY(0px)'
              : 'scale(0.5) translateY(20px)',
            opacity: !isDark ? 1 : 0,
            transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

/* ───────── Redesigned Dock Navbar ───────── */
export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  
  // Track horizontal mouse position
  const mouseX = useMotionValue(Infinity)
  const { isMobile } = useMobileSizing()

  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`

  return (
    <div className={`fixed ${isMobile ? 'bottom-3' : 'bottom-6 md:bottom-8'} left-1/2 -translate-x-1/2 z-50`}>
      {/* Ambient halo that blends the dock into the page below it */}
      <div
        className="absolute -inset-x-8 -bottom-4 h-24 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.07) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 100%, rgba(2,132,199,0.06) 0%, rgba(109,40,217,0.04) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`flex items-end ${isMobile ? 'gap-1.5 px-2.5 py-2.5 rounded-[20px]' : 'gap-3 px-4 py-3 rounded-[24px]'} relative overflow-visible transition-all duration-300`}
        style={{
          boxShadow: isDark
            ? '0 32px 64px -16px rgba(0,0,0,0.8), 0 8px 24px -8px rgba(0,212,255,0.08), inset 0 1px 1px rgb(var(--text-primary) / 0.05)'
            : '0 32px 64px -16px rgba(0,0,0,0.18), 0 8px 24px -8px rgba(2,132,199,0.06), inset 0 1px 1px rgb(var(--text-primary) / 0.4)',
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
      >
        {/* Animated Conic Gradient Border Background */}
        <div className={`absolute inset-0 pointer-events-none ${isMobile ? 'rounded-[20px]' : 'rounded-[24px]'} overflow-hidden z-0`}>
          <ConicGradientAnimation
            borderRadius={isMobile ? 20 : 24}
            overlayMargin={1.5}
            blurRadius={28}
            backgroundColor={isDark ? 'rgba(3, 8, 17, 0.45)' : 'rgb(var(--text-primary) / 0.45)'}
            customGradient={isDark
              ? 'conic-gradient(from 0deg, transparent 80deg, #00d4ff 160deg, #7c3aed 270deg, #10d9a0 360deg)'
              : 'conic-gradient(from 0deg, transparent 80deg, #0284c7 160deg, #6d28d9 270deg, #059669 360deg)'
            }
            animationDuration={8}
          />
        </div>

        {/* Premium Grain Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${isMobile ? 'rounded-[20px]' : 'rounded-[24px]'} z-10`}
          style={{ backgroundImage: noiseTexture, opacity: isDark ? 0.3 : 0.45 }}
        />

        {/* 1. Main Navigation Dock Icons */}
        <div className={`flex items-end ${isMobile ? 'gap-1.5' : 'gap-2.5'} z-20`}>
          {NAV_LINKS.map((link) => (
            <DockIcon
              key={link.path}
              mouseX={mouseX}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.path}
              isDark={isDark}
              glowColor={link.glow}
              onClick={() => navigate(link.path)}
            />
          ))}
        </div>

        {/* 2. Sleek Vertical Divider */}
        <div
          className={`w-[1px] ${isMobile ? 'h-6 mb-1 mx-1' : 'h-10 self-end mb-1 mx-1.5'} z-20 flex-shrink-0`}
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent, rgb(var(--text-primary) / 0.12) 20%, rgb(var(--text-primary) / 0.12) 80%, transparent)'
              : 'linear-gradient(to bottom, transparent, rgb(var(--bg-primary) / 0.1) 20%, rgba(0,0,0,0.1) 80%, transparent)',
          }}
        />

        {/* 3. Interactive Theme Toggle */}
        <div className="z-20">
          <DockThemeToggle
            mouseX={mouseX}
            isDark={isDark}
            toggle={toggle}
          />
        </div>

        {/* 4. Sleek Profile Separator and Avatar Profile */}
        <div
          className={`w-[1px] ${isMobile ? 'h-6 mb-1 mx-1' : 'h-10 self-end mb-1 mx-1.5'} z-20 flex-shrink-0`}
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent, rgb(var(--text-primary) / 0.12) 20%, rgb(var(--text-primary) / 0.12) 80%, transparent)'
              : 'linear-gradient(to bottom, transparent, rgb(var(--bg-primary) / 0.1) 20%, rgba(0,0,0,0.1) 80%, transparent)',
          }}
        />

        {/* 5. Profile Avatar */}
        <div className="z-20">
          <DockProfile
            mouseX={mouseX}
            isDark={isDark}
            onClick={() => navigate('/about')}
          />
        </div>
      </motion.nav>
    </div>
  )
}
