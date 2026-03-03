import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* 墨尘悬浮粒子系统 */
function InkDustParticles({ count = 800 }) {
  const ref = useRef()
  const { positions, colors, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const rnd = new Float32Array(count)

    const palette = [
      new THREE.Color('#2c2c2c'), // 焦墨
      new THREE.Color('#4a5c68'), // 黛青
      new THREE.Color('#666666'), // 烟墨
      new THREE.Color('#a63429'), // 朱砂点缀
    ]

    for (let i = 0; i < count; i++) {
      // 在空间中随机分布
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30

      // 颜色权重：80%灰黑，15%黛青，5%朱砂
      const randType = Math.random()
      let c = palette[0]
      if (randType > 0.8 && randType <= 0.95) c = palette[1]
      else if (randType > 0.95) c = palette[3]
      else if (Math.random() > 0.5) c = palette[2]

      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
      rnd[i] = Math.random()
    }
    return { positions: pos, colors: col, randoms: rnd }
  }, [count])

  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime

    // 整体极其缓慢的自转
    ref.current.rotation.y = t * 0.015
    ref.current.rotation.z = Math.sin(t * 0.05) * 0.05

    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      // 制造自然界类似粉尘悬浮和水流扰动的无规则浮动
      arr[i * 3 + 1] += Math.sin(t * 0.1 + randoms[i] * Math.PI * 2) * 0.003
      arr[i * 3] += Math.cos(t * 0.08 + randoms[i] * Math.PI) * 0.002
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      {/* 乘法混合模式能让墨滴叠加显得更深，但对白色背景可能兼容不一。使用常规透明度即可 */}
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

/* 核心水墨氤氲动画 (用于替换光球) */
function InkSmudgeCluster() {
  const groupRef = useRef()

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.5
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {/* 使用几个大型淡色球体模拟水墨在水中的渲染 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#2c2c2c" transparent opacity={0.02} depthWrite={false} />
      </mesh>
      <mesh position={[1, 1, -1]} scale={[1.2, 0.8, 1]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#4a5c68" transparent opacity={0.015} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#f9f6f0']} />
        {/* 降低雾气浓度，增加留白深度 */}
        <fog attach="fog" args={['#f9f6f0', 10, 30]} />

        <InkDustParticles count={1500} />
        <InkSmudgeCluster />
      </Canvas>
    </div>
  )
}
