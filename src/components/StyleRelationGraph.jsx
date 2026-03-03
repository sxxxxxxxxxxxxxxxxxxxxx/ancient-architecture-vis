import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as echarts from 'echarts'

const graphData = {
  nodes: [
    { name: '秦汉', symbolSize: 50, category: 0, itemStyle: { color: '#B22222' } },
    { name: '魏晋南北朝', symbolSize: 40, category: 1, itemStyle: { color: '#8FBC8F' } },
    { name: '隋唐', symbolSize: 60, category: 2, itemStyle: { color: '#C41E3A' } },
    { name: '宋', symbolSize: 55, category: 3, itemStyle: { color: '#4682B4' } },
    { name: '元', symbolSize: 35, category: 4, itemStyle: { color: '#2E8B57' } },
    { name: '明', symbolSize: 55, category: 5, itemStyle: { color: '#DC143C' } },
    { name: '清', symbolSize: 50, category: 6, itemStyle: { color: '#FFD700' } },
    { name: '高台建筑', symbolSize: 28, category: 7, itemStyle: { color: '#A0522D' } },
    { name: '斗拱体系', symbolSize: 35, category: 7, itemStyle: { color: '#CD853F' } },
    { name: '佛教建筑', symbolSize: 32, category: 7, itemStyle: { color: '#DEB887' } },
    { name: '琉璃技术', symbolSize: 30, category: 7, itemStyle: { color: '#DAA520' } },
    { name: '园林艺术', symbolSize: 33, category: 7, itemStyle: { color: '#00A86B' } },
    { name: '砖石结构', symbolSize: 30, category: 7, itemStyle: { color: '#8B7D6B' } },
    { name: '彩画装饰', symbolSize: 28, category: 7, itemStyle: { color: '#FF6B35' } },
    { name: '营造法式', symbolSize: 32, category: 7, itemStyle: { color: '#87CEEB' } },
  ],
  links: [
    { source: '秦汉', target: '高台建筑', value: '创立' },
    { source: '秦汉', target: '斗拱体系', value: '初创' },
    { source: '魏晋南北朝', target: '佛教建筑', value: '引入' },
    { source: '秦汉', target: '魏晋南北朝', value: '传承' },
    { source: '魏晋南北朝', target: '隋唐', value: '融合' },
    { source: '隋唐', target: '斗拱体系', value: '成熟' },
    { source: '隋唐', target: '琉璃技术', value: '发展' },
    { source: '隋唐', target: '佛教建筑', value: '鼎盛' },
    { source: '隋唐', target: '宋', value: '传承' },
    { source: '宋', target: '营造法式', value: '编纂' },
    { source: '宋', target: '斗拱体系', value: '规范' },
    { source: '宋', target: '彩画装饰', value: '精细' },
    { source: '宋', target: '园林艺术', value: '兴起' },
    { source: '宋', target: '元', value: '过渡' },
    { source: '元', target: '明', value: '过渡' },
    { source: '明', target: '砖石结构', value: '普及' },
    { source: '明', target: '园林艺术', value: '成熟' },
    { source: '明', target: '琉璃技术', value: '精进' },
    { source: '明', target: '清', value: '传承' },
    { source: '清', target: '彩画装饰', value: '极盛' },
    { source: '清', target: '园林艺术', value: '巅峰' },
  ],
  categories: [
    { name: '秦汉' }, { name: '魏晋' }, { name: '隋唐' }, { name: '宋' },
    { name: '元' }, { name: '明' }, { name: '清' }, { name: '技术' },
  ],
}

export default function StyleRelationGraph() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return
    chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'canvas' })

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(8,8,15,0.92)',
        borderColor: 'rgba(197,165,90,0.2)',
        textStyle: { color: '#e8e0d0', fontSize: 12 },
        formatter: (p) => {
          if (p.dataType === 'edge') return `${p.data.source} → ${p.data.target}<br/><span style="color:#C5A55A">${p.data.value}</span>`
          return `<span style="color:#C5A55A;font-weight:bold">${p.name}</span>`
        },
      },
      animationDuration: 2000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'force',
        data: graphData.nodes,
        links: graphData.links,
        categories: graphData.categories,
        roam: true,
        draggable: true,
        force: { repulsion: 260, gravity: 0.08, edgeLength: [80, 180], friction: 0.6 },
        label: {
          show: true, position: 'right', color: '#e8e0d0', fontSize: 11,
          fontFamily: 'Noto Serif SC, serif',
        },
        lineStyle: {
          color: 'source', curveness: 0.2, width: 1.5, opacity: 0.4,
        },
        edgeLabel: {
          show: false,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 3, opacity: 0.8 },
          itemStyle: { shadowBlur: 20, shadowColor: 'rgba(197,165,90,0.3)' },
        },
        itemStyle: {
          borderColor: 'rgba(197,165,90,0.3)', borderWidth: 1,
          shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.3)',
        },
      }],
    }

    chartInstance.current.setOption(option)
    const onResize = () => chartInstance.current?.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      chartInstance.current?.dispose()
    }
  }, [])

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Relationship</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text section-title">建筑风格传承关系</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            从秦汉到明清，建筑风格与技术的演变脉络与传承关系
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-premium p-6"
        >
          <div ref={chartRef} className="w-full h-[500px] md:h-[600px]" />
        </motion.div>
      </div>
    </section>
  )
}
