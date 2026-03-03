import { useState, useRef, useEffect, Suspense } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsOverview from './components/StatsOverview'
import DynastyTimeline from './components/DynastyTimeline'
import DynastyRadar from './components/DynastyRadar'
import BuildingMap from './components/BuildingMap'
import BuildingTypeChart from './components/BuildingTypeChart'
import StructureTypeViz from './components/StructureTypeViz'
import MaterialEvolution from './components/MaterialEvolution'
import RoofTypeChart from './components/RoofTypeChart'
import DougongAnalysis from './components/DougongAnalysis'
import Building3DScene from './components/Building3DScene'
import ColorSystemViz from './components/ColorSystemViz'
import HeritageTimeline from './components/HeritageTimeline'
import ProvinceHeatmap from './components/ProvinceHeatmap'
import Footer from './components/Footer'
import MouseGlow from './components/MouseGlow'
import InkWashBg from './components/InkWashBg'
import StyleRelationGraph from './components/StyleRelationGraph'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: 'hero', label: '首页' },
  { id: 'stats', label: '概览' },
  { id: '3d', label: '3D模型' },
  { id: 'timeline', label: '朝代' },
  { id: 'map', label: '分布' },
  { id: 'structure', label: '结构' },
  { id: 'types', label: '类型' },
  { id: 'materials', label: '材料' },
  { id: 'heritage', label: '遗产' },
]

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-[500px]">
      <div className="text-center">
        <div className="w-10 h-10 border border-amber-700/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-xs tracking-widest uppercase">加载3D场景</p>
      </div>
    </div>
  )
}

function SectionDivider({ title, index = 0 }) {
  return (
    <div className="py-12 md:py-16 flex items-center gap-6 max-w-6xl mx-auto px-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent" />
      {title && (
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-amber-700/40" />
          <span className="text-[10px] text-amber-600/40 tracking-[0.4em] uppercase whitespace-nowrap font-light">{title}</span>
          <div className="w-1 h-1 rounded-full bg-amber-700/40" />
        </div>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent" />
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const mainRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Lightweight scroll reveal (no filter:blur — it kills perf)
    gsap.utils.toArray('.gsap-reveal').forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    })

    // Track active section
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      }
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const scrollToSection = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-pattern" ref={mainRef}>
      <MouseGlow />
      <InkWashBg />

      <Navbar sections={sections} activeSection={activeSection} onNavigate={scrollToSection} />

      <div id="hero">
        <HeroSection onExplore={() => scrollToSection('stats')} />
      </div>

      <div id="stats" className="gsap-reveal">
        <StatsOverview />
      </div>

      <SectionDivider title="三维建模" />

      <div id="3d" className="gsap-reveal">
        <Suspense fallback={<LoadingFallback />}>
          <Building3DScene />
        </Suspense>
      </div>

      <SectionDivider title="朝代分析" />

      <div id="timeline" className="gsap-reveal">
        <DynastyTimeline />
      </div>

      <div className="gsap-reveal">
        <DynastyRadar />
      </div>

      <div className="gsap-reveal">
        <StyleRelationGraph />
      </div>

      <SectionDivider title="地理分布" />

      <div id="map" className="gsap-reveal">
        <BuildingMap />
      </div>

      <SectionDivider title="结构与类型" />

      <div id="structure" className="gsap-reveal">
        <StructureTypeViz />
      </div>

      <div className="gsap-reveal">
        <DougongAnalysis />
      </div>

      <div id="types" className="gsap-reveal">
        <BuildingTypeChart />
      </div>

      <div className="gsap-reveal">
        <RoofTypeChart />
      </div>

      <SectionDivider title="材料与色彩" />

      <div id="materials" className="gsap-reveal">
        <MaterialEvolution />
      </div>

      <div className="gsap-reveal">
        <ColorSystemViz />
      </div>

      <SectionDivider title="文化遗产" />

      <div id="heritage" className="gsap-reveal">
        <ProvinceHeatmap />
      </div>

      <div className="gsap-reveal">
        <HeritageTimeline />
      </div>

      <Footer />
    </div>
  )
}

export default App
