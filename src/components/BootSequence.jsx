import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BootSequence({ onComplete }) {
  const [stage, setStage] = useState('welcome') // 'welcome' (triggers TV), 'turn-on', 'expand', 'static', 'turn-off', 'done'

  useEffect(() => {
    // Start TV sequence immediately
    // 1. TV line appears
    const t1 = setTimeout(() => setStage('turn-on'), 300)
    // 2. Line expands horizontally
    const t2 = setTimeout(() => setStage('expand'), 600)
    // 3. Full static and name
    const t3 = setTimeout(() => setStage('static'), 900)
    // 4. Turn off line
    const t4 = setTimeout(() => setStage('turn-off'), 3700)
    // 5. Disappear
    const t5 = setTimeout(() => {
      setStage('done')
      onComplete()
    }, 4200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [onComplete])

  const showTV = ['welcome', 'turn-on', 'expand', 'static', 'turn-off'].includes(stage)

  return (
    <motion.div
      key="intro-container"
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background room/glow behind the TV */}
      <div className="absolute inset-0 bg-[#0F1117]" />

      {/* ── TV STAGE ── */}
      <AnimatePresence>
        {showTV && (
          <motion.div
            key="tv-chassis"
            className="relative z-10 w-[95vw] max-w-3xl aspect-[4/3] md:aspect-[1.2] bg-[#1C212D] rounded-[2rem] md:rounded-[3.5rem] p-3 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_4px_10px_rgba(255,255,255,0.15)] border-b-[12px] border-r-4 border-[#0F1117] border-t-2 border-l-2 border-[#2A3142] flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Inner bezel */}
            <div className="relative w-full h-full bg-[#0F1117] rounded-[1.2rem] md:rounded-[2.5rem] p-2 md:p-5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-[#161A23]">
              
              <motion.div
                className="relative w-full h-full bg-[#0B0D14] rounded-[1rem] md:rounded-[2rem] overflow-hidden flex items-center justify-center"
                initial={{ scaleY: 0.002, scaleX: 0 }}
                animate={
                  stage === 'turn-on' ? { scaleY: 0.002, scaleX: 1 } :
                  stage === 'expand' ? { scaleY: 1, scaleX: 1 } :
                  stage === 'static' ? { scaleY: 1, scaleX: 1 } :
                  stage === 'welcome' ? { scaleY: 0.002, scaleX: 0 } :
                  { scaleY: 0.002, scaleX: 0 }
                }
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                {/* Animated Grain Layer */}
                <div
                  className="absolute inset-[-200%] opacity-25 pointer-events-none animate-grain"
                  style={{
                    backgroundImage: `url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')`,
                    backgroundSize: '250px 250px',
                    backgroundRepeat: 'repeat',
                  }}
                />

                {/* CRT Scanlines Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: 'linear-gradient(transparent 50%, rgba(15, 17, 23, 0.4) 50%), linear-gradient(90deg, rgba(99, 179, 237, 0.06), rgba(52, 211, 153, 0.02), rgba(167, 139, 250, 0.06))',
                    backgroundSize: '100% 4px, 3px 100%'
                  }}
                />

                {/* Convex glass reflection */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[1rem] md:rounded-t-[2rem]" />

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />

                {/* Text Content */}
                <motion.div
                  className="relative z-10 text-center"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={(stage === 'expand' || stage === 'static') ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h1 
                    className="font-syne font-bold text-4xl md:text-6xl text-white tracking-widest uppercase relative"
                  >
                    <span className="relative z-10" style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}>
                      Meet Barot
                    </span>
                    {/* Glitch RGB layers */}
                    <span className="absolute inset-0 z-0 text-[#63B3ED] translate-x-[-3px] translate-y-[2px] opacity-70 mix-blend-screen" style={{ filter: 'blur(1px)' }}>
                      Meet Barot
                    </span>
                    <span className="absolute inset-0 z-0 text-[#A78BFA] translate-x-[3px] translate-y-[-2px] opacity-70 mix-blend-screen" style={{ filter: 'blur(1px)' }}>
                      Meet Barot
                    </span>
                  </h1>
                  <motion.p 
                    className="font-mono text-accent-cyan mt-6 text-xs md:text-sm tracking-[0.3em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    INITIALIZING...
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Power light indicator */}
            <div className="absolute bottom-1.5 md:bottom-3 right-6 md:right-12 flex items-center gap-2">
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full shadow-[0_0_10px_rgba(99,179,237,0.8)] ${stage === 'turn-off' ? 'bg-[#161A23] shadow-none' : 'bg-[#63B3ED]'}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
