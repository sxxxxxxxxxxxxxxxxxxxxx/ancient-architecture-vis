import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { materialEvolution } from '../data/architectureData'

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export default function MaterialEvolution() {
  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
    },
    legend: {
      data: ['木材', '石材', '砖', '琉璃瓦'],
      textStyle: { color: '#aaa', fontFamily: 'Noto Sans SC' },
      top: 10,
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: materialEvolution.map(d => d.dynasty + '代'),
      boundaryGap: false,
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      axisLabel: {
        color: '#C5A55A',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Noto Serif SC',
      },
    },
    yAxis: {
      type: 'value',
      name: '使用占比 (%)',
      nameTextStyle: { color: '#888', fontFamily: 'Noto Sans SC' },
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(197,165,90,0.08)' } },
      axisLabel: { color: '#888' },
    },
    series: [
      {
        name: '木材',
        type: 'line',
        data: materialEvolution.map(d => d.wood),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#A0522D' },
        itemStyle: { color: '#A0522D', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(160,82,45,0.3)' },
            { offset: 1, color: 'rgba(160,82,45,0.02)' },
          ])
        },
      },
      {
        name: '石材',
        type: 'line',
        data: materialEvolution.map(d => d.stone),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#708090' },
        itemStyle: { color: '#708090', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(112,128,144,0.3)' },
            { offset: 1, color: 'rgba(112,128,144,0.02)' },
          ])
        },
      },
      {
        name: '砖',
        type: 'line',
        data: materialEvolution.map(d => d.brick),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#C41E3A' },
        itemStyle: { color: '#C41E3A', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(196,30,58,0.3)' },
            { offset: 1, color: 'rgba(196,30,58,0.02)' },
          ])
        },
      },
      {
        name: '琉璃瓦',
        type: 'line',
        data: materialEvolution.map(d => d.tile),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#FFD700' },
        itemStyle: { color: '#FFD700', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255,215,0,0.3)' },
            { offset: 1, color: 'rgba(255,215,0,0.02)' },
          ])
        },
      },
    ],
    backgroundColor: 'transparent',
  })

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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Material</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">建筑材料演变</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            从秦汉夯土石材到唐宋木构巅峰，再到明清砖瓦琉璃，建筑材料的变迁折射出技术发展历程
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-premium p-6"
        >
          <ReactEChartsCore
            echarts={echarts}
            option={getOption()}
            style={{ height: '450px' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { name: '木材', color: '#A0522D', desc: '唐代达到巅峰，以斗拱体系为核心' },
            { name: '石材', color: '#708090', desc: '秦汉时期大量使用，后逐渐减少' },
            { name: '砖', color: '#C41E3A', desc: '明清时期广泛普及，砖雕艺术兴盛' },
            { name: '琉璃瓦', color: '#FFD700', desc: '从唐代兴起，至清代装饰达到极致' },
          ].map((m, i) => (
            <div key={i} className="card-glass p-4 text-center">
              <div
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: m.color, boxShadow: `0 0 12px ${m.color}40` }}
              />
              <h4 className="font-semibold text-amber-200 mb-1">{m.name}</h4>
              <p className="text-xs text-gray-500">{m.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
