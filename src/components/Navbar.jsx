import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ sections, activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? window.scrollY / docH : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-[#2c2c2c]/5'
        : 'bg-transparent'
        }`}
    >
      {/* 滚动进度条 */}
      <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#a63429] via-[#cfaa71] to-[#a63429] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%`, opacity: scrolled ? 0.8 : 0 }} />

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('hero')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-lg bg-white border border-[#2c2c2c]/10 flex items-center justify-center group-hover:border-[#a63429]/40 group-hover:shadow-[0_0_15px_rgba(166,52,41,0.1)] transition-all duration-500">
            <span className="text-xl">🏛</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-[#2c2c2c] leading-tight tracking-wide font-serif">中国古代建筑</h1>
            <p className="text-[10px] text-[#666666] tracking-[0.25em] uppercase">Data Visualization</p>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-0.5 bg-black/[0.02] rounded-2xl px-1.5 py-1 border border-black/[0.04]">
          {sections.map((section) => (
            <motion.span
              key={section.id}
              className={`nav-link relative ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => onNavigate(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === section.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-[#a63429]/5 rounded-xl border border-[#a63429]/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
