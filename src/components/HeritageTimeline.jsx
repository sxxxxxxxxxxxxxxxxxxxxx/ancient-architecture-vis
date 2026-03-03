import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { heritageData } from '../data/architectureData'

echarts.use([ScatterChart, GridComponent, TooltipComponent, CanvasRenderer])

const dynastyOrder = ['秦', '南北朝', '唐', '宋', '元', '明', '清', '秦-明', '汉']

export default function HeritageTimeline() {
  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const d = params.data
        return `
          <div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:4px">${d.info.name}</div>
          <div style="color:#ccc">入选年份: ${d.info.year}年</div>
          <div style="color:#aaa">始建朝代: ${d.info.dynasty}代</div>
          <div style="color:#FFD700;margin-top:4px">🌍 ${d.info.type}</div>
        `
      }
    },
    grid: { left: '3%', right: '8%', bottom: '10%', top: '8%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '入选年份',
      nameTextStyle: { color: '#888', fontFamily: 'Noto Sans SC' },
      min: 1985,
      max: 2018,
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      splitLine: { lineStyle: { color: 'rgba(197,165,90,0.06)' } },
      axisLabel: { color: '#888', formatter: '{value}' },
    },
    yAxis: {
      type: 'category',
      data: dynastyOrder,
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      axisLabel: {
        color: '#C5A55A',
        fontSize: 12,
        fontFamily: 'Noto Serif SC',
      },
    },
    series: [
      {
        type: 'scatter',
        data: heritageData.map(h => ({
          value: [h.year, h.dynasty],
          info: h,
        })),
        symbolSize: 18,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#C5A55A88' },
          ]),
          shadowBlur: 10,
          shadowColor: '#FFD70066',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 25,
            shadowColor: '#FFD700',
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: (p) => p.data.info.name,
            position: 'top',
            color: '#FFD700',
            fontSize: 12,
            fontFamily: 'Noto Sans SC',
          }
        },
        label: {
          show: true,
          formatter: (p) => p.data.info.name,
          position: 'right',
          color: '#ccc',
          fontSize: 10,
          fontFamily: 'Noto Sans SC',
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Heritage</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">世界文化遗产</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            中国古代建筑中有20处被列入UNESCO世界文化遗产名录，见证了中华文明的辉煌
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-premium p-6"
        >
          <h3 className="text-lg font-semibold text-gold mb-4">遗产入选时间与朝代分布</h3>
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
          className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {heritageData.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card-glass p-3 text-center group cursor-default hover:border-amber-500/40"
            >
              <div className="text-lg mb-1">🌍</div>
              <div className="text-sm font-semibold text-amber-200 leading-tight">{h.name}</div>
              <div className="text-xs text-gray-500 mt-1">{h.year}年入选</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
