import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, DataZoomComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { provinceDistribution } from '../data/architectureData'

echarts.use([BarChart, GridComponent, TooltipComponent, DataZoomComponent, CanvasRenderer])

export default function ProvinceHeatmap() {
  const sorted = [...provinceDistribution].sort((a, b) => b.value - a.value)

  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        return `
          <div style="font-size:14px;font-weight:bold;color:#C5A55A">${params[0].name}</div>
          <div style="color:#FFD700;margin-top:4px">古建筑: ${params[0].value} 处</div>
        `
      }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '5%', containLabel: true },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 60,
        height: 20,
        bottom: 5,
        borderColor: 'rgba(197,165,90,0.2)',
        fillerColor: 'rgba(197,165,90,0.1)',
        handleStyle: { color: '#C5A55A' },
        textStyle: { color: '#888' },
      }
    ],
    xAxis: {
      type: 'category',
      data: sorted.map(d => d.name),
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      axisLabel: {
        color: '#aaa',
        fontSize: 11,
        rotate: 45,
        fontFamily: 'Noto Sans SC',
      },
    },
    yAxis: {
      type: 'value',
      name: '数量',
      nameTextStyle: { color: '#888', fontFamily: 'Noto Sans SC' },
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(197,165,90,0.08)' } },
      axisLabel: { color: '#888' },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map((d, i) => ({
          value: d.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: i < 5 ? '#C41E3A' : i < 10 ? '#C5A55A' : '#4682B4' },
              { offset: 1, color: i < 5 ? '#8B0000' : i < 10 ? '#8B6914' : '#2F4F7F' },
            ]),
            borderRadius: [4, 4, 0, 0],
          }
        })),
        barWidth: '65%',
        emphasis: {
          itemStyle: { shadowBlur: 15, shadowColor: 'rgba(197,165,90,0.3)' }
        },
      }
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Province</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">省份分布统计</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            北京、山西、陕西是古建筑最为密集的地区，承载着中华文明最辉煌的建筑遗产
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-premium p-6"
        >
          <div className="flex items-center gap-6 mb-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#C41E3A' }} />
              TOP 5
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#C5A55A' }} />
              TOP 6-10
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#4682B4' }} />
              其他省份
            </span>
          </div>
          <ReactEChartsCore
            echarts={echarts}
            option={getOption()}
            style={{ height: '420px' }}
            opts={{ renderer: 'canvas' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
