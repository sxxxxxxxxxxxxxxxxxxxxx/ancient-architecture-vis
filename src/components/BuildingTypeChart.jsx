import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { buildingTypes } from '../data/architectureData'

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

const colors = ['#C41E3A', '#C5A55A', '#4682B4', '#2E8B57', '#A0522D', '#DAA520', '#8FBC8F', '#DC143C', '#556B2F', '#708090']

export default function BuildingTypeChart() {
  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const d = buildingTypes.find(t => t.type === params.name)
        return `
          <div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:4px">${params.name}</div>
          <div style="color:#ccc">${d?.description || ''}</div>
          <div style="color:#FFD700;margin-top:4px">数量: ${params.value} 座 (${params.percent}%)</div>
        `
      }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#aaa', fontSize: 13, fontFamily: 'Noto Sans SC' },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 12,
    },
    series: [
      {
        name: '建筑类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#0f0f1a',
          borderWidth: 3,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#FFD700',
            fontFamily: 'Noto Serif SC',
          },
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: { show: false },
        data: buildingTypes.map((t, i) => ({
          value: t.count,
          name: t.type,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: colors[i] },
              { offset: 1, color: colors[i] + '99' },
            ])
          }
        })),
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Classification</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">建筑类型分析</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            中国古代建筑类型丰富多样，从宏伟的宫殿到精巧的园林，各具特色
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-6"
          >
            <h3 className="text-lg font-semibold text-gold mb-4">类型占比分布</h3>
            <ReactEChartsCore
              echarts={echarts}
              option={getOption()}
              style={{ height: '400px' }}
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
            {buildingTypes.map((t, i) => (
              <div key={i} className="card-glass p-4 flex items-center gap-4 group">
                <div className="text-2xl w-10 text-center">{t.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-amber-200">{t.type}</span>
                    <span className="text-gold text-sm font-bold">{t.count} 座</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(t.count / 45) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}99)`
                      }}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{t.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
