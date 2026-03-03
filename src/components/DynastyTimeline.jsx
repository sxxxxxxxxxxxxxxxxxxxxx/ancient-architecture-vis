import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { dynastyFeatures } from '../data/architectureData'

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export default function DynastyTimeline() {
  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const dynasty = params[0].axisValue
        const info = dynastyFeatures.find(d => d.dynasty === dynasty)
        let html = `<div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:8px">${dynasty}代建筑</div>`
        html += `<div style="color:#aaa;margin-bottom:6px">${info.period}</div>`
        html += `<div style="color:#ccc;margin-bottom:4px">风格: <span style="color:#FFD700">${info.style}</span></div>`
        html += `<div style="color:#ccc;margin-bottom:4px">代表: ${info.representative}</div>`
        html += `<div style="margin-top:8px">`
        params.forEach(p => {
          html += `<div style="display:flex;align-items:center;gap:6px;margin:2px 0">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.color}"></span>
            <span style="color:#ccc">${p.seriesName}: ${p.value}%</span>
          </div>`
        })
        html += '</div>'
        return html
      }
    },
    legend: {
      data: ['木材', '石材', '砖瓦'],
      textStyle: { color: '#aaa', fontFamily: 'Noto Sans SC' },
      top: 10,
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dynastyFeatures.map(d => d.dynasty),
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      axisLabel: {
        color: '#C5A55A',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Noto Serif SC',
      },
    },
    yAxis: {
      type: 'value',
      name: '占比 (%)',
      nameTextStyle: { color: '#888', fontFamily: 'Noto Sans SC' },
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(197,165,90,0.08)' } },
      axisLabel: { color: '#888' },
    },
    series: [
      {
        name: '木材',
        type: 'bar',
        stack: 'total',
        data: dynastyFeatures.map(d => d.woodUsage),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#A0522D' },
            { offset: 1, color: '#6B3410' },
          ]),
          borderRadius: [0, 0, 0, 0],
        },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(160,82,45,0.5)' } },
      },
      {
        name: '石材',
        type: 'bar',
        stack: 'total',
        data: dynastyFeatures.map(d => d.stoneUsage),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#708090' },
            { offset: 1, color: '#4A5568' },
          ]),
        },
      },
      {
        name: '砖瓦',
        type: 'bar',
        stack: 'total',
        data: dynastyFeatures.map(d => d.brickUsage),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#C41E3A' },
            { offset: 1, color: '#8B0000' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Dynasty</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">朝代建筑演变</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            从秦汉的夯土高台到明清的砖木结合，建筑材料的变迁映射着技术进步与文化演变
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

        {/* Dynasty cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3"
        >
          {dynastyFeatures.map((d, i) => (
            <div key={i} className="card-glass p-4 text-center group cursor-default">
              <div className="text-xl font-bold gradient-text mb-1">{d.dynasty}</div>
              <div className="text-[10px] text-gray-600 mb-2">{d.period}</div>
              <div className="text-xs text-amber-300/60 font-medium">{d.style}</div>
              <div className="mt-2.5 flex flex-wrap gap-1 justify-center">
                {d.features.map((f, j) => (
                  <span key={j} className="text-[9px] px-1.5 py-0.5 bg-amber-900/20 text-amber-400/60 rounded-full border border-amber-800/15">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
