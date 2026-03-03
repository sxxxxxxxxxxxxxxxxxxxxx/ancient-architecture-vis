import { motion } from 'framer-motion'
import HeroScene3D from './HeroScene3D'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene3D />

      {/* 顶部渐变遮罩 (改采明亮透底) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#f9f6f0] to-transparent z-[1]" />
      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f9f6f0] to-transparent z-[1]" />

      {/* 巨型错层水印/背景文字，增加空间透视感 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none z-[1] flex flex-col items-center w-full overflow-hidden"
      >
        <span className="text-[15vw] font-black tracking-[0.1em] text-[#2c2c2c]/[0.025] uppercase font-serif whitespace-nowrap leading-none select-none">
          ARCHITECTURE
        </span>
        <span className="text-[6.5vw] font-bold tracking-[0.6em] text-[#a63429]/[0.025] uppercase font-serif whitespace-nowrap leading-none select-none -mt-6">
          ANCIENT CHINESE
        </span>
      </motion.div>

      {/* 侧边竖排传统文字装饰 (书法/字画落款感) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1.5, ease: 'easeOut' }}
        className="hidden lg:block absolute right-16 top-1/3 -translate-y-1/2 z-10"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <div className="flex items-center gap-6">
          <span className="text-[#a63429] border border-[#a63429] px-1 py-3 text-[10px] tracking-widest leading-none font-serif opacity-80">
            甲辰年制
          </span>
          <span className="text-[#666666] text-sm tracking-[0.5em] font-serif font-light leading-relaxed">
            榫卯之合・天人合一
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mt-4"
      >
        <motion.div variants={fadeUp} className="mb-10">
          <span className="inline-flex items-center gap-3 px-6 py-2 rounded-sm border border-[#a63429]/10 bg-white/60 backdrop-blur-md text-[#4a5c68]/80 text-xs tracking-[0.4em] uppercase font-light shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a63429] shadow-[0_0_6px_rgba(166,52,41,0.5)] animate-pulse" />
            Eastern Spatial Aesthetics
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl md:text-[6rem] font-bold mb-8 leading-[1.15] tracking-[0.05em] text-[#2c2c2c]">
          <span className="gradient-text font-serif">中国古代建筑</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg sm:text-xl md:text-2xl text-[#4a5c68]/90 mb-6 font-light tracking-[0.3em] font-serif">
          跨越四千年的营造之美
        </motion.p>

        <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#666666]/80 mb-16 max-w-2xl mx-auto leading-[2.2] font-light">
          从秦砖汉瓦到明清宫殿，以水墨视界解读建筑的演变脉络。探索中国古代匠人的营造法式、哲思意境与不朽传承。
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 relative z-20">
          <button onClick={onExplore} className="btn-seal">
            <span>启程探索</span>
          </button>
          <button onClick={onExplore} className="btn-outline bg-white/80 backdrop-blur-sm">
            <span>了解更多</span>
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 relative border-y border-[#2c2c2c]/10 py-6 mb-20 max-w-4xl mx-auto w-full bg-white/40 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          {[
            { label: '历史跨度', value: '4000+', unit: '载' },
            { label: '录入建筑', value: '766', unit: '座' },
            { label: '世界遗产', value: '20', unit: '处' },
            { label: '法式类型', value: '18', unit: '种' },
          ].map((stat, i) => (
            <div key={i} className={`text-center group relative ${i !== 0 ? 'md:border-l border-[#2c2c2c]/10' : ''}`}>
              <div className="text-2xl sm:text-3xl md:text-3xl font-serif text-[#a63429] tracking-tight mb-2">
                {stat.value}<span className="text-sm md:text-base ml-1 opacity-70 text-[#2c2c2c]">{stat.unit}</span>
              </div>
              <div className="text-[10px] text-[#666] tracking-[0.4em] uppercase font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-500 tracking-[0.4em] uppercase font-light">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-10 border border-[#2c2c2c]/10 rounded-full flex items-start justify-center p-1 bg-white/50"
        >
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], height: ['4px', '12px', '4px'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[2px] bg-[#a63429]/80 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
