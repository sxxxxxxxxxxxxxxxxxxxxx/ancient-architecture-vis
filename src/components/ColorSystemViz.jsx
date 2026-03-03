import { useState } from 'react'
import { motion } from 'framer-motion'
import { colorSystem } from '../data/architectureData'

export default function ColorSystemViz() {
  const [activeColor, setActiveColor] = useState(null)

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Color</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">建筑色彩体系</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            中国古代建筑色彩蕴含深厚的文化内涵，每一种颜色都承载着特定的象征意义
          </p>
        </motion.div>

        {/* Color palette display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-glass p-8"
        >
          {/* Large color strip */}
          <div className="flex rounded-xl overflow-hidden mb-8 h-20 shadow-2xl">
            {colorSystem.map((c, i) => (
              <motion.div
                key={i}
                className="flex-1 cursor-pointer relative group"
                style={{ backgroundColor: c.hex }}
                whileHover={{ flex: 2.5 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveColor(activeColor === i ? null : i)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className="text-sm font-bold px-2 py-1 rounded backdrop-blur-sm"
                    style={{
                      color: ['#F5F5DC', '#FFD700', '#FF4500'].includes(c.hex) ? '#1a1a1a' : '#fff',
                      backgroundColor: 'rgba(0,0,0,0.3)'
                    }}
                  >
                    {c.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Color cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorSystem.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-400 border ${
                  activeColor === i
                    ? 'border-amber-500/60 shadow-xl scale-105'
                    : 'border-gray-800/50 hover:border-gray-600/50'
                }`}
                style={{ background: 'linear-gradient(145deg, rgba(26,26,46,0.9), rgba(15,15,26,0.95))' }}
                onClick={() => setActiveColor(activeColor === i ? null : i)}
              >
                {/* Color swatch */}
                <div
                  className="h-16 relative"
                  style={{ backgroundColor: c.hex }}
                >
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm"
                    style={{ color: ['#F5F5DC', '#FFD700', '#FF4500'].includes(c.hex) ? '#333' : '#ddd' }}
                  >
                    {c.hex}
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-bold text-amber-200 text-sm">{c.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-1">用途: {c.usage}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">象征: {c.symbolism}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-5 rounded-xl border border-amber-900/20 bg-amber-950/10"
          >
            <h4 className="text-gold font-semibold mb-2">🎨 色彩等级制度</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              中国古代建筑色彩有严格的等级规定。黄色琉璃瓦为最高等级，仅用于皇宫和皇家寺庙；
              绿色琉璃瓦次之，用于王府及庙宇；青灰色瓦片则用于一般官署和民居。
              红色宫墙代表皇权威严，而江南民居多用黑白两色，体现"粉墙黛瓦"的素雅之美。
              这一色彩体系反映了中国古代社会的等级秩序与审美哲学。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
