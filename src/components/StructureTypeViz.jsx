import { motion } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { structureTypes } from '../data/architectureData'

echarts.use([PieChart, TooltipComponent, CanvasRenderer])

const structureDetails = [
  {
    name: '抬梁式',
    icon: '🏛️',
    region: '北方地区',
    advantage: '跨度大、空间开阔',
    example: '故宫太和殿',
    description: '在柱上架梁，梁上又抬梁，层层叠加。北方大型建筑的主要结构形式，可实现宏大的内部空间。',
  },
  {
    name: '穿斗式',
    icon: '🏠',
    region: '南方地区',
    advantage: '用料少、抗风强',
    example: '江南民居',
    description: '用穿枋把柱子串联起来形成房架，柱子较密。南方民居的主要结构形式，适应多雨潮湿气候。',
  },
  {
    name: '井干式',
    icon: '🪵',
    region: '东北/西南林区',
    advantage: '保温好、就地取材',
    example: '东北木刻楞',
    description: '将圆木或方木交叉堆叠成墙壁，形似古代水井的围栏。多见于林区，结构原始而坚固。',
  },
  {
    name: '混合式',
    icon: '🔗',
    region: '南北过渡地带',
    advantage: '兼具两者优点',
    example: '湘西吊脚楼',
    description: '中间用抬梁式以获得较大空间，两侧用穿斗式以节省材料。常见于南北交汇地区的建筑。',
  },
  {
    name: '砖石结构',
    icon: '🧱',
    region: '全国各地',
    advantage: '耐火耐久',
    example: '嵩岳寺塔',
    description: '以砖石为主要结构材料，多用于塔、桥、墓葬等。不受木材限制，可建造更高更持久的建筑。',
  },
]

export default function StructureTypeViz() {
  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const detail = structureDetails.find(s => s.name === params.name)
        return `
          <div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:4px">${params.name}</div>
          <div style="color:#ccc">${detail?.description || ''}</div>
          <div style="color:#FFD700;margin-top:6px">占比: ${params.value}%</div>
        `
      }
    },
    series: [{
      type: 'pie',
      radius: ['25%', '65%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
        borderColor: '#0f0f1a',
        borderWidth: 3,
      },
      label: {
        show: true,
        color: '#C5A55A',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Noto Serif SC',
        formatter: '{b}\n{d}%',
      },
      labelLine: {
        lineStyle: { color: 'rgba(197,165,90,0.4)' },
        smooth: 0.2,
        length: 10,
        length2: 20,
      },
      data: structureTypes.map((s, i) => ({
        value: s.value,
        name: s.name,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: ['#A0522D', '#4682B4', '#2E8B57', '#DAA520', '#C41E3A'][i] },
            { offset: 1, color: ['#6B3410', '#2F4F7F', '#1B6B3A', '#8B6914', '#8B0000'][i] },
          ])
        },
      })),
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Structure</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">建筑结构体系</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            中国古代建筑以木构架为主体，发展出抬梁、穿斗、井干三大基本结构体系
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
            <h3 className="text-lg font-semibold text-gold mb-2">结构类型南丁格尔玫瑰图</h3>
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
            {structureDetails.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-glass p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl mt-0.5">{s.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-amber-200">{s.name}</h4>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-blue-900/30 text-blue-300/70 rounded">{s.region}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-amber-900/30 text-amber-300/70 rounded">{s.advantage}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
                    <p className="text-[11px] text-gray-600 mt-1">代表: <span className="text-gold">{s.example}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
