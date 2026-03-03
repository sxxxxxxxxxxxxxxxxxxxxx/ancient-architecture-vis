import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { dougongData } from '../data/architectureData'

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export default function DougongAnalysis() {
  const [activeDynasty, setActiveDynasty] = useState(null)

  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const dynasty = params[0].axisValue
        const info = dougongData.find(d => d.dynasty === dynasty)
        let html = `<div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:6px">${dynasty}代斗拱</div>`
        html += `<div style="color:#aaa;margin-bottom:4px">${info.period}</div>`
        html += `<div style="color:#ccc;margin-bottom:2px">特征: <span style="color:#FFD700">${info.feature}</span></div>`
        params.forEach(p => {
          html += `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.color}"></span>
            <span style="color:#ccc">${p.seriesName}: ${p.value}${p.seriesName === '复杂度' ? '' : '%'}</span>
          </div>`
        })
        return html
      }
    },
    legend: {
      data: ['承重作用', '装饰作用', '复杂度'],
      textStyle: { color: '#aaa', fontFamily: 'Noto Sans SC' },
      top: 5,
    },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dougongData.map(d => d.dynasty),
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      axisLabel: {
        color: '#C5A55A',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Noto Serif SC',
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '占比 (%)',
        nameTextStyle: { color: '#888', fontFamily: 'Noto Sans SC' },
        axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
        splitLine: { lineStyle: { color: 'rgba(197,165,90,0.08)' } },
        axisLabel: { color: '#888' },
        max: 100,
      },
      {
        type: 'value',
        name: '复杂度',
        nameTextStyle: { color: '#888', fontFamily: 'Noto Sans SC' },
        axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
        splitLine: { show: false },
        axisLabel: { color: '#888' },
        max: 100,
      }
    ],
    series: [
      {
        name: '承重作用',
        type: 'bar',
        stack: 'role',
        data: dougongData.map(d => d.structuralRole),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#A0522D' },
            { offset: 1, color: '#6B3410' },
          ]),
        },
      },
      {
        name: '装饰作用',
        type: 'bar',
        stack: 'role',
        data: dougongData.map(d => d.decorativeRole),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#C5A55A' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: '复杂度',
        type: 'line',
        yAxisIndex: 1,
        data: dougongData.map(d => d.complexity),
        smooth: true,
        symbol: 'diamond',
        symbolSize: 10,
        lineStyle: { width: 3, color: '#C41E3A' },
        itemStyle: { color: '#C41E3A', borderWidth: 2, borderColor: '#fff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(196,30,58,0.25)' },
            { offset: 1, color: 'rgba(196,30,58,0.02)' },
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Dougong</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">斗拱结构演变</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            斗拱是中国古代建筑最核心的结构构件，从承重到装饰的角色转变，折射出千年建筑技术的演进脉络
          </p>
          <div className="section-divider mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 card-premium p-6"
          >
            <h3 className="text-lg font-semibold text-gold mb-2">承重与装饰角色变化</h3>
            <ReactEChartsCore
              echarts={echarts}
              option={getOption()}
              style={{ height: '420px' }}
              opts={{ renderer: 'canvas' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            {dougongData.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`card-glass p-4 cursor-pointer transition-all duration-300 ${
                  activeDynasty === d.dynasty ? 'border-amber-500/50 shadow-lg shadow-amber-900/10' : ''
                }`}
                onClick={() => setActiveDynasty(activeDynasty === d.dynasty ? null : d.dynasty)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gold text-lg">{d.dynasty}代</span>
                  <span className="text-xs text-gray-500">{d.feature}</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="flex-1">
                    <div className="text-[10px] text-gray-500 mb-0.5">承重</div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-amber-800" style={{ width: `${d.structuralRole}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-gray-500 mb-0.5">装饰</div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${d.decorativeRole}%` }} />
                    </div>
                  </div>
                </div>
                {activeDynasty === d.dynasty && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-gray-400 leading-relaxed pt-1 border-t border-gray-800"
                  >
                    {d.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
