export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-white/[0.03] overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-amber-900/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-700/30 to-amber-900/20 border border-amber-700/20 flex items-center justify-center">
              <span className="text-sm">🏛</span>
            </div>
            <h3 className="text-xl font-bold gradient-text tracking-wide">中国古代建筑</h3>
          </div>
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase">Data Visualization Project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {[
            { title: '数据来源', items: ['全国重点文物保护单位名录', 'UNESCO世界遗产中心', '中国建筑史 · 梁思成'] },
            { title: '技术栈', items: ['React + Vite + TailwindCSS', 'ECharts 数据可视化', 'Three.js 3D渲染 · GSAP动效', 'Framer Motion · Lenis'] },
            { title: '参考文献', items: ['《中国建筑史》梁思成', '《营造法式》李诫', '《中国古代建筑技术史》'] },
          ].map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <h4 className="text-amber-500/70 text-[11px] font-semibold mb-4 tracking-[0.2em] uppercase">{col.title}</h4>
              {col.items.map((item, j) => (
                <p key={j} className="text-gray-600 text-xs mb-1.5 leading-relaxed">{item}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-[10px] tracking-wider">
            © 2026 中国古代建筑数据可视化 · 计算机大赛参赛作品
          </p>
          <div className="flex items-center gap-4 text-[10px] text-gray-700 tracking-wider">
            <span>React</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-700" />
            <span>Three.js</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-700" />
            <span>ECharts</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-700" />
            <span>GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
