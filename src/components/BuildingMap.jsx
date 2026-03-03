import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { ScatterChart, EffectScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, GeoComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { buildings } from '../data/architectureData'

echarts.use([ScatterChart, EffectScatterChart, GridComponent, TooltipComponent, GeoComponent, CanvasRenderer])

const dynastyColors = {
  '秦': '#2F4F4F',
  '汉': '#B22222',
  '三国': '#556B2F',
  '南北朝': '#8FBC8F',
  '隋': '#DAA520',
  '唐': '#C41E3A',
  '宋': '#4682B4',
  '元': '#2E8B57',
  '明': '#DC143C',
  '清': '#FFD700',
}

const typeFilters = ['全部', '宫殿', '宗教', '园林', '楼阁', '民居', '祭祀', '军事', '陵墓', '桥梁', '水利']

export default function BuildingMap() {
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  const filteredBuildings = selectedType === '全部'
    ? buildings
    : buildings.filter(b => b.type === selectedType)

  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15,15,26,0.95)',
      borderColor: 'rgba(197,165,90,0.3)',
      textStyle: { color: '#e8e0d0', fontFamily: 'Noto Sans SC' },
      formatter: (params) => {
        const d = params.data
        return `
          <div style="font-size:16px;font-weight:bold;color:#C5A55A;margin-bottom:4px">${d.name}</div>
          <div style="color:#aaa">${d.info.dynasty}代 · ${d.info.type}</div>
          <div style="color:#ccc;margin-top:4px">${d.info.description}</div>
          ${d.info.heritage ? '<div style="color:#FFD700;margin-top:4px">🌍 世界文化遗产</div>' : ''}
        `
      }
    },
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: {
      type: 'value',
      min: 73,
      max: 135,
      show: false,
    },
    yAxis: {
      type: 'value',
      min: 18,
      max: 54,
      show: false,
    },
    series: [
      {
        name: '古建筑',
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: filteredBuildings.map(b => ({
          name: b.name,
          value: [b.lng, b.lat],
          info: b,
          itemStyle: {
            color: dynastyColors[b.dynasty] || '#C5A55A',
            shadowBlur: 6,
            shadowColor: dynastyColors[b.dynasty] || '#C5A55A',
          }
        })),
        symbolSize: (val, params) => {
          return params.data.info.heritage ? 16 : 10
        },
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          fontSize: 10,
          color: '#ccc',
          fontFamily: 'Noto Sans SC',
        },
        emphasis: {
          itemStyle: { shadowBlur: 20, borderColor: '#FFD700', borderWidth: 2 },
          label: { fontSize: 13, color: '#FFD700', fontWeight: 'bold' },
        },
      },
      {
        name: '世界遗产',
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: filteredBuildings.filter(b => b.heritage).map(b => ({
          name: b.name,
          value: [b.lng, b.lat],
          info: b,
        })),
        symbolSize: 8,
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 4, period: 4 },
        itemStyle: { color: '#FFD700', shadowBlur: 10, shadowColor: '#FFD700' },
        label: { show: false },
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
          <span className="text-[11px] text-amber-600/60 tracking-[0.5em] uppercase block mb-4">Geographic</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            <span className="gradient-text section-title">建筑地理分布</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            中国古代建筑遍布大江南北，每一处都承载着独特的历史记忆与文化内涵
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {typeFilters.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-1.5 rounded-full text-xs transition-all duration-500 ${
                selectedType === type
                  ? 'bg-amber-700/40 text-amber-200 border border-amber-600/30 shadow-lg shadow-amber-900/20'
                  : 'bg-white/[0.02] text-gray-500 border border-white/[0.05] hover:border-amber-700/20 hover:text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-premium p-6 relative"
        >
          {/* China outline hint */}
          <div className="absolute top-4 right-4 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              世界遗产
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              一般建筑
            </span>
          </div>

          <ReactEChartsCore
            echarts={echarts}
            option={getOption()}
            style={{ height: '550px' }}
            opts={{ renderer: 'canvas' }}
            onEvents={{
              click: (params) => {
                if (params.data?.info) setSelectedBuilding(params.data.info)
              }
            }}
          />
        </motion.div>

        {/* Building detail popup */}
        <AnimatePresence>
          {selectedBuilding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              onClick={() => setSelectedBuilding(null)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <div
                className="relative card-premium p-8 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold gradient-text mb-2">{selectedBuilding.name}</h3>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-amber-900/40 text-amber-300 rounded text-xs">{selectedBuilding.dynasty}代</span>
                  <span className="px-2 py-0.5 bg-red-900/40 text-red-300 rounded text-xs">{selectedBuilding.type}</span>
                  <span className="px-2 py-0.5 bg-gray-700/40 text-gray-300 rounded text-xs">{selectedBuilding.province}</span>
                  {selectedBuilding.heritage && (
                    <span className="px-2 py-0.5 bg-yellow-900/40 text-yellow-300 rounded text-xs">🌍 世界遗产</span>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed">{selectedBuilding.description}</p>
                {selectedBuilding.area > 0 && (
                  <p className="text-gray-400 text-sm mt-3">
                    占地面积: <span className="text-gold">{(selectedBuilding.area / 10000).toFixed(1)} 万平方米</span>
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-1">
                  保护级别: <span className="text-gold">{selectedBuilding.protection}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
