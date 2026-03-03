import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { summaryStats } from '../data/architectureData'

const stats = [
  { label: '已记录古建筑', value: 766, suffix: '座', icon: '🏛', color: 'from-amber-600/20 to-amber-800/10' },
  { label: '世界文化遗产', value: 20, suffix: '处', icon: '🌍', color: 'from-emerald-600/20 to-emerald-800/10' },
  { label: '覆盖省级行政区', value: 31, suffix: '个', icon: '🗺', color: 'from-blue-600/20 to-blue-800/10' },
  { label: '历史跨度', value: 4000, suffix: '+年', icon: '📜', color: 'from-red-600/20 to-red-800/10' },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const dur = 2000
    const step = target / (dur / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text number-roll">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-28 px-6 relative" ref={ref}>
      {/* 背景装饰光斑 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-amber-900/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Overview</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">数据概览</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            中国古代建筑是世界建筑史上最辉煌的篇章之一<br className="hidden sm:block" />数千年的文明积淀留下了无数建筑瑰宝
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="stat-card group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-gray-500 text-xs mt-3 tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="card-glass p-7 group cursor-default">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-700/25 to-amber-900/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <span className="text-lg">🏯</span>
              </div>
              <div>
                <h3 className="text-amber-400/90 text-sm font-semibold mb-1.5 tracking-wide">最古老的建筑</h3>
                <p className="text-xl font-bold text-white/90">{summaryStats.oldestBuilding}</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">世界文化遗产，古代水利工程的伟大杰作</p>
              </div>
            </div>
          </div>
          <div className="card-glass p-7 group cursor-default">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-700/25 to-red-900/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <span className="text-lg">📐</span>
              </div>
              <div>
                <h3 className="text-amber-400/90 text-sm font-semibold mb-1.5 tracking-wide">最大的建筑群</h3>
                <p className="text-xl font-bold text-white/90">{summaryStats.largestBuilding}</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">世界上现存规模最大、保存最完整的木质结构古建筑群</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
