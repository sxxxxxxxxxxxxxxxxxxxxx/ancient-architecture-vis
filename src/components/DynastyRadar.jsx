import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { dynastyRadarData } from '../data/architectureData'

echarts.use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer])

const dynastyColors = {
  '秦': '#2F4F4F', '汉': '#B22222', '唐': '#C41E3A',
  '宋': '#4682B4', '元': '#2E8B57', '明': '#DC143C', '清': '#FFD700',
}

export default function DynastyRadar() {
  const [selected, setSelected] = useState(['唐', '宋', '明'])

  const toggleDynasty = (d) => {
    if (selected.includes(d)) {
      if (selected.length > 1) setSelected(selected.filter(s => s !== d))
    } else {
      if (selected.length < 3) setSelected([...selected, d])
    }
  }

  const getOption = () => ({
    tooltip: {
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
    },
    legend: {
      data: selected.map(d => d + '代'),
      textStyle: { color: '#aaa', fontFamily: 'Noto Sans SC', fontSize: 13 },
      top: 5,
    },
    radar: {
      indicator: [
        { name: '建筑规模', max: 100 },
        { name: '工程技术', max: 100 },
        { name: '艺术成就', max: 100 },
        { name: '历史影响', max: 100 },
        { name: '保存程度', max: 100 },
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#C5A55A',
        fontSize: 13,
        fontFamily: 'Noto Serif SC',
        fontWeight: 'bold',
      },
      splitLine: { lineStyle: { color: 'rgba(197,165,90,0.15)' } },
      splitArea: {
        areaStyle: {
          color: ['rgba(197,165,90,0.02)', 'rgba(197,165,90,0.05)'],
        }
      },
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
    },
    series: [{
      type: 'radar',
      data: selected.map(d => {
        const data = dynastyRadarData.find(r => r.dynasty === d)
        const dim = data.dimensions
        return {
          name: d + '代',
          value: [dim.scale, dim.tech, dim.art, dim.influence, dim.preservation],
          lineStyle: { width: 2, color: dynastyColors[d] },
          itemStyle: { color: dynastyColors[d] },
          areaStyle: { color: dynastyColors[d] + '30' },
          symbol: 'circle',
          symbolSize: 6,
        }
      })
    }],
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Comparison</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">朝代建筑综合对比</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            从规模、技术、艺术、影响力和保存程度五个维度，对比各朝代建筑的综合实力
          </p>
        </motion.div>

        {/* Dynasty selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {dynastyRadarData.map(d => (
            <button
              key={d.dynasty}
              onClick={() => toggleDynasty(d.dynasty)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 border ${
                selected.includes(d.dynasty)
                  ? 'text-white shadow-lg'
                  : 'bg-gray-900/50 text-gray-500 border-gray-700/30 hover:border-gray-500/50'
              }`}
              style={selected.includes(d.dynasty) ? {
                backgroundColor: dynastyColors[d.dynasty] + '40',
                borderColor: dynastyColors[d.dynasty],
                boxShadow: `0 4px 20px ${dynastyColors[d.dynasty]}30`,
              } : {}}
            >
              {d.dynasty}代
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 card-premium p-6"
          >
            <ReactEChartsCore
              echarts={echarts}
              option={getOption()}
              style={{ height: '450px' }}
              opts={{ renderer: 'canvas' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            {selected.map((d, i) => {
              const data = dynastyRadarData.find(r => r.dynasty === d)
              const dim = data.dimensions
              const total = dim.scale + dim.tech + dim.art + dim.influence + dim.preservation
              return (
                <div key={d} className="card-glass p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: dynastyColors[d], boxShadow: `0 0 10px ${dynastyColors[d]}60` }}
                    />
                    <h3 className="text-lg font-bold text-amber-200">{d}代建筑</h3>
                    <span className="ml-auto text-sm gradient-text font-bold">综合: {total}</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: '建筑规模', value: dim.scale },
                      { label: '工程技术', value: dim.tech },
                      { label: '艺术成就', value: dim.art },
                      { label: '历史影响', value: dim.influence },
                      { label: '保存程度', value: dim.preservation },
                    ].map((item, j) => (
                      <div key={j}>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-gray-400">{item.label}</span>
                          <span className="text-gold">{item.value}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: j * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: dynastyColors[d] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
