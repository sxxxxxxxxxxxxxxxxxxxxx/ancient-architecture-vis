import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { roofTypes } from '../data/architectureData'

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

export default function RoofTypeChart() {
  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const d = roofTypes.find(r => r.name === params[0].axisValue)
        return `
          <div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:4px">${d.name}</div>
          <div style="color:#ccc">${d.description}</div>
          <div style="color:#aaa;margin-top:4px">等级: 第${d.rank}等</div>
          <div style="color:#FFD700">占比: ${d.value}%</div>
        `
      }
    },
    grid: { left: '3%', right: '8%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.2)' } },
      splitLine: { lineStyle: { color: 'rgba(197,165,90,0.06)' } },
      axisLabel: { color: '#888', formatter: '{value}%' },
    },
    yAxis: {
      type: 'category',
      data: roofTypes.map(r => r.name),
      axisLine: { lineStyle: { color: 'rgba(197,165,90,0.3)' } },
      axisLabel: {
        color: '#C5A55A',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Noto Serif SC',
      },
      inverse: true,
    },
    series: [
      {
        type: 'bar',
        data: roofTypes.map(r => ({
          value: r.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: r.color },
              { offset: 1, color: r.color + '66' },
            ]),
            borderRadius: [0, 6, 6, 0],
          }
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#C5A55A',
          fontSize: 12,
          fontFamily: 'Noto Sans SC',
        },
        emphasis: {
          itemStyle: { shadowBlur: 15, shadowColor: 'rgba(197,165,90,0.3)' }
        },
      }
    ],
    backgroundColor: 'transparent',
  })

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium p-6"
          >
            <h3 className="text-lg font-bold gradient-text mb-6">屋顶形制分布</h3>
            <ReactEChartsCore
              echarts={echarts}
              option={getOption()}
              style={{ height: '350px' }}
              opts={{ renderer: 'canvas' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-6"
          >
            <h3 className="text-lg font-bold gradient-text mb-6">屋顶等级体系</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              中国古代建筑的屋顶形制有严格的等级制度，不同等级的建筑使用不同的屋顶形式，
              体现了封建社会的礼制秩序。
            </p>
            <div className="space-y-4">
              {roofTypes.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-200">{r.name}</span>
                      <span className="text-xs text-gray-500">第{r.rank}等级</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{r.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
