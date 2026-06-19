import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuantumNodes from './components/QuantumNodes'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import CodingProfile from './components/CodingProfile'
import Contact from './components/Contact'
import BootSequence from './components/BootSequence'
import Preloader from './components/Preloader'
import InteractiveNoiseGrid from './components/InteractiveNoiseGrid'

// ─── App Root ─────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenPreloader')
  })
  const location = useLocation()

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('hasSeenPreloader', 'true')
    setLoading(false)
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bg-primary overflow-x-hidden text-text-primary flex flex-col">
        <AnimatePresence mode="wait">
          {loading ? (
            <BootSequence key="intro" onComplete={handlePreloaderComplete} />
          ) : (
            <>
              {/* Home-only backgrounds: dot grid + film grain */}
              {location.pathname === '/' && (
                <>
                  <InteractiveNoiseGrid
                    dotSize={1.5}
                    gridSpacing={36}
                    noiseIntensity={10}
                    animationSpeed={1}
                    mouseRadius={170}
                    dotColor="rgba(99,179,237,0.15)"
                    shapeType="dot"
                    style={{ position: 'fixed', zIndex: 0 }}
                  />
                  <div className="noise-overlay" aria-hidden="true" />
                </>
              )}

              {/* QuantumNodes background — visible on all non-home routes */}
              {location.pathname !== '/' && <QuantumNodes />}

              <motion.div
                key="main-content"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-screen flex flex-col"
              >
                {/* Main routing content */}
                <main className="flex-grow flex flex-col">
                  <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<Hero />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </AnimatePresence>
                </main>

                {/* Certifications and CodingProfile can be their own routes or just integrated into About/Experience. 
                    Leaving them out of the main nav for now as per reference dock layout, but they exist as components. */}
              </motion.div>

              {/* Navigation */}
              <Navbar />
            </>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
