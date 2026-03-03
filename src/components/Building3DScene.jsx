import { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'

/* ─── 自定义弧形屋顶几何体 ─── */
function CurvedRoof({ width = 5, depth = 3, height = 1.5, segments = 32, overhang = 0.6, color = '#DAA520', emissiveColor = '#8B6914' }) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    const hw = (width + overhang) / 2
    const hd = (depth + overhang) / 2
    shape.moveTo(-hw, -hd)
    shape.lineTo(hw, -hd)
    shape.lineTo(hw, hd)
    shape.lineTo(-hw, hd)
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false })
    g.rotateX(-Math.PI / 2)
    return g
  }, [width, depth, overhang])

  return (
    <group>
      {/* 屋顶主体 - 四面坡 */}
      <mesh>
        <coneGeometry args={[Math.max(width, depth) * 0.72, height, 4, 1]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.25}
          metalness={0.7}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
          emissive={emissiveColor}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* 屋檐挑出层 */}
      <mesh position={[0, -height / 2 + 0.02, 0]}>
        <boxGeometry args={[width + overhang, 0.06, depth + overhang]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

/* ─── 精美柱子 (含柱础和柱头) ─── */
function OrnateColumn({ position, height = 2.2, radius = 0.08 }) {
  return (
    <group position={position}>
      {/* 柱础 - 石质底座 */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[radius * 2.2, radius * 2.5, 0.12, 16]} />
        <meshPhysicalMaterial color="#E8DCC8" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* 柱身 */}
      <mesh position={[0, height / 2 + 0.12, 0]}>
        <cylinderGeometry args={[radius, radius * 1.05, height, 16]} />
        <meshPhysicalMaterial
          color="#8B0000"
          roughness={0.3}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
        />
      </mesh>
      {/* 柱头装饰 */}
      <mesh position={[0, height + 0.15, 0]}>
        <cylinderGeometry args={[radius * 1.8, radius * 1.2, 0.08, 16]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.35} metalness={0.2} />
      </mesh>
    </group>
  )
}

/* ─── 斗拱组件 ─── */
function Dougong({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* 斗 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.18, 0.08, 0.18]} />
        <meshPhysicalMaterial color="#6B3A20" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* 拱 - 横向 */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.35, 0.05, 0.08]} />
        <meshPhysicalMaterial color="#8B4513" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* 拱 - 纵向 */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.35]} />
        <meshPhysicalMaterial color="#8B4513" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* 上层斗 */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.14, 0.06, 0.14]} />
        <meshPhysicalMaterial color="#6B3A20" roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  )
}

/* ─── 汉白玉栏杆 (轻量版) ─── */
function MarbleRailing({ width, depth, y = 0 }) {
  const posts = []
  const hw = width / 2
  const hd = depth / 2
  const spacing = 1.5
  for (let x = -hw; x <= hw; x += spacing) {
    posts.push([x, y, hd])
    posts.push([x, y, -hd])
  }
  for (let z = -hd + spacing; z < hd; z += spacing) {
    posts.push([hw, y, z])
    posts.push([-hw, y, z])
  }

  return (
    <group>
      {posts.map((p, i) => (
        <mesh key={i} position={[p[0], p[1] + 0.12, p[2]]}>
          <boxGeometry args={[0.04, 0.28, 0.04]} />
          <meshStandardMaterial color="#F0EAD6" roughness={0.2} />
        </mesh>
      ))}
      {/* 横杆 */}
      <mesh position={[0, y + 0.2, hd]}>
        <boxGeometry args={[width, 0.03, 0.03]} />
        <meshStandardMaterial color="#F0EAD6" roughness={0.2} />
      </mesh>
      <mesh position={[0, y + 0.2, -hd]}>
        <boxGeometry args={[width, 0.03, 0.03]} />
        <meshStandardMaterial color="#F0EAD6" roughness={0.2} />
      </mesh>
      <mesh position={[hw, y + 0.2, 0]}>
        <boxGeometry args={[0.03, 0.03, depth]} />
        <meshStandardMaterial color="#F0EAD6" roughness={0.2} />
      </mesh>
      <mesh position={[-hw, y + 0.2, 0]}>
        <boxGeometry args={[0.03, 0.03, depth]} />
        <meshStandardMaterial color="#F0EAD6" roughness={0.2} />
      </mesh>
    </group>
  )
}

/* ─── 宫殿 (太和殿风格) ─── */
function Palace() {
  const group = useRef()
  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.12) * 0.08
  })
  const W = 6, D = 3.5
  return (
    <group ref={group}>
      {/* 三层须弥座台基 */}
      {[0, 0.22, 0.44].map((y, i) => (
        <group key={`base-${i}`}>
          <mesh position={[0, y + 0.08, 0]} castShadow receiveShadow>
            <boxGeometry args={[W - i * 0.4, 0.16, D - i * 0.25]} />
            <meshPhysicalMaterial color="#F0EAD6" roughness={0.18} metalness={0.03} clearcoat={0.4} />
          </mesh>
          {i < 2 && <MarbleRailing width={W - i * 0.4 - 0.1} depth={D - i * 0.25 - 0.1} y={y + 0.16} />}
        </group>
      ))}
      {/* 台阶 */}
      {[0, 1, 2].map(i => (
        <mesh key={`step-${i}`} position={[0, i * 0.22 + 0.08, D / 2 - i * 0.12]}>
          <boxGeometry args={[0.8, 0.16, 0.15]} />
          <meshPhysicalMaterial color="#F0EAD6" roughness={0.18} />
        </mesh>
      ))}
      {/* 柱网 (面阔7间) */}
      {Array.from({ length: 16 }).map((_, i) => {
        const col = i % 8, row = Math.floor(i / 8)
        return (
          <OrnateColumn
            key={`c-${i}`}
            position={[-2.8 + col * 0.8, 0.6, row === 0 ? 1.2 : -1.2]}
            height={2}
          />
        )
      })}
      {/* 墙体 */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[4.8, 1.6, 2.2]} />
        <meshPhysicalMaterial color="#9B1B30" roughness={0.45} metalness={0.1} />
      </mesh>
      {/* 门窗 */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={`door-${i}`} position={[x, 1.35, 1.11]} castShadow>
          <boxGeometry args={[0.5, 1.2, 0.04]} />
          <meshPhysicalMaterial color="#3A1A00" roughness={0.5} metalness={0.15} />
        </mesh>
      ))}
      {/* 门上金钉 */}
      {[0].map((x) =>
        Array.from({ length: 4 }).map((_, j) => (
          <mesh key={`nail-${x}-${j}`} position={[x - 0.08 + (j % 2) * 0.16, 1.2 + Math.floor(j / 2) * 0.3, 1.135]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color="#FFD700" roughness={0.15} metalness={0.9} emissive="#FFD700" emissiveIntensity={0.3} />
          </mesh>
        ))
      )}
      {/* 斗拱层 */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Dougong key={`dg-${i}`} position={[-2.4 + i * 0.8, 2.55, 1.25]} scale={0.8} />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <Dougong key={`dgb-${i}`} position={[-2.4 + i * 0.8, 2.55, -1.25]} scale={0.8} />
      ))}
      {/* 额枋 */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[5.4, 0.1, 2.6]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* 庑殿顶 */}
      <group position={[0, 3.5, 0]}>
        <CurvedRoof width={5.6} depth={3.2} height={1.8} color="#DAA520" emissiveColor="#8B6914" />
      </group>
      {/* 正脊 */}
      <mesh position={[0, 4.45, 0]}>
        <boxGeometry args={[3, 0.1, 0.12]} />
        <meshPhysicalMaterial color="#FFD700" roughness={0.15} metalness={0.85} emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>
      {/* 鸱吻 (屋脊两端装饰) */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={`chiwen-${i}`} position={[x, 4.55, 0]}>
          <coneGeometry args={[0.08, 0.25, 6]} />
          <meshPhysicalMaterial color="#FFD700" roughness={0.15} metalness={0.9} emissive="#FFD700" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* 宝顶 */}
      <Float speed={2} floatIntensity={0.15}>
        <mesh position={[0, 4.65, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={0.95} emissive="#FFD700" emissiveIntensity={0.6} />
        </mesh>
      </Float>
    </group>
  )
}

/* ─── 佛塔 (应县木塔风格) ─── */
function Pagoda() {
  const group = useRef()
  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.06
  })
  const levels = 5
  return (
    <group ref={group}>
      {/* 八角基座 */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[2.2, 2.5, 0.4, 8]} />
        <meshPhysicalMaterial color="#F0EAD6" roughness={0.18} metalness={0.03} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.12, 8]} />
        <meshPhysicalMaterial color="#E8DCC8" roughness={0.2} />
      </mesh>
      {/* 各层 */}
      {Array.from({ length: levels }).map((_, i) => {
        const s = 1 - i * 0.12
        const y = 0.55 + i * 1.5
        const r = 1.6 * s
        return (
          <group key={`lv-${i}`}>
            {/* 层身 - 八角 */}
            <mesh position={[0, y + 0.4, 0]} castShadow>
              <cylinderGeometry args={[r * 0.88, r * 0.92, 0.9, 8]} />
              <meshPhysicalMaterial color="#8B6347" roughness={0.4} metalness={0.08} />
            </mesh>
            {/* 窗户 */}
            {Array.from({ length: 4 }).map((_, j) => {
              const angle = (j / 4) * Math.PI * 2
              return (
                <mesh key={`win-${i}-${j}`} position={[Math.cos(angle) * r * 0.89, y + 0.4, Math.sin(angle) * r * 0.89]} rotation={[0, -angle + Math.PI / 2, 0]}>
                  <boxGeometry args={[0.2, 0.35, 0.02]} />
                  <meshStandardMaterial color="#2A1A08" roughness={0.6} />
                </mesh>
              )
            })}
            {/* 柱子 */}
            {Array.from({ length: 4 }).map((_, j) => {
              const angle = (j / 4) * Math.PI * 2 + Math.PI / 8
              return (
                <mesh key={`pcol-${i}-${j}`} position={[Math.cos(angle) * r * 0.92, y + 0.4, Math.sin(angle) * r * 0.92]}>
                  <cylinderGeometry args={[0.04, 0.045, 0.9, 8]} />
                  <meshStandardMaterial color="#8B0000" roughness={0.3} metalness={0.15} />
                </mesh>
              )
            })}
            {/* 斗拱环 */}
            <mesh position={[0, y + 0.88, 0]}>
              <cylinderGeometry args={[r * 1.05, r * 0.95, 0.08, 8]} />
              <meshPhysicalMaterial color="#5C3A1E" roughness={0.35} metalness={0.15} />
            </mesh>
            {/* 层檐 */}
            <mesh position={[0, y + 0.95, 0]}>
              <coneGeometry args={[r * 1.15, 0.2, 8, 1]} />
              <meshPhysicalMaterial color="#2F4F4F" roughness={0.3} metalness={0.35} clearcoat={0.2} />
            </mesh>
          </group>
        )
      })}
      {/* 塔刹 */}
      <group position={[0, 0.55 + levels * 1.5 + 0.3, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 0.15, 8]} />
          <meshPhysicalMaterial color="#F0EAD6" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.1, 0.5, 8]} />
          <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={0.9} emissive="#FFD700" emissiveIntensity={0.4} />
        </mesh>
        {[0.55, 0.65, 0.75].map((y, i) => (
          <mesh key={`ring-${i}`} position={[0, y, 0]}>
            <torusGeometry args={[0.06 - i * 0.015, 0.012, 8, 16]} />
            <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={0.95} emissive="#FFD700" emissiveIntensity={0.5} />
          </mesh>
        ))}
        <Float speed={3} floatIntensity={0.2}>
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshPhysicalMaterial color="#FFD700" roughness={0.05} metalness={0.98} emissive="#FFD700" emissiveIntensity={0.8} />
          </mesh>
        </Float>
      </group>
    </group>
  )
}

/* ─── 亭子 (六角攒尖顶) ─── */
function Pavilion() {
  const group = useRef()
  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.1
  })
  const sides = 6, r = 1.4
  return (
    <group ref={group}>
      {/* 台基 */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[r + 0.3, r + 0.5, 0.25, sides]} />
        <meshPhysicalMaterial color="#F0EAD6" roughness={0.18} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[r + 0.15, r + 0.3, 0.08, sides]} />
        <meshPhysicalMaterial color="#E8DCC8" roughness={0.2} />
      </mesh>
      {/* 栏杆 */}
      {Array.from({ length: sides }).map((_, i) => {
        const angle = (i / sides) * Math.PI * 2 + Math.PI / (sides * 2)
        const px = Math.cos(angle) * (r + 0.15)
        const pz = Math.sin(angle) * (r + 0.15)
        return (
          <mesh key={`pr-${i}`} position={[px, 0.44, pz]}>
            <boxGeometry args={[0.035, 0.28, 0.035]} />
            <meshStandardMaterial color="#F0EAD6" roughness={0.2} />
          </mesh>
        )
      })}
      {/* 柱子 */}
      {Array.from({ length: sides }).map((_, i) => {
        const angle = (i / sides) * Math.PI * 2
        return (
          <OrnateColumn
            key={`col-${i}`}
            position={[Math.cos(angle) * r, 0.32, Math.sin(angle) * r]}
            height={2.5}
            radius={0.065}
          />
        )
      })}
      {/* 额枋环 */}
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[r + 0.05, r + 0.05, 0.1, sides]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* 斗拱 */}
      {Array.from({ length: sides }).map((_, i) => {
        const angle = (i / sides) * Math.PI * 2 + Math.PI / sides
        return <Dougong key={`dg-${i}`} position={[Math.cos(angle) * (r + 0.08), 2.9, Math.sin(angle) * (r + 0.08)]} scale={0.7} />
      })}
      {/* 攒尖顶 */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <coneGeometry args={[r + 0.5, 2, sides]} />
        <meshPhysicalMaterial color="#2F4F4F" roughness={0.25} metalness={0.4} clearcoat={0.3} />
      </mesh>
      {/* 翼角起翘 (每个角添加小装饰) */}
      {Array.from({ length: sides }).map((_, i) => {
        const angle = (i / sides) * Math.PI * 2
        return (
          <mesh key={`wing-${i}`} position={[Math.cos(angle) * (r + 0.45), 2.82, Math.sin(angle) * (r + 0.45)]} rotation={[0.3, -angle, 0.2]}>
            <boxGeometry args={[0.25, 0.02, 0.06]} />
            <meshPhysicalMaterial color="#2F4F4F" roughness={0.3} metalness={0.35} />
          </mesh>
        )
      })}
      {/* 宝顶 */}
      <Float speed={2} floatIntensity={0.2}>
        <group position={[0, 4.9, 0]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial color="#FFD700" roughness={0.08} metalness={0.95} emissive="#FFD700" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.04, 0.07, 0.12, 8]} />
            <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

/* ─── 城楼 (天安门风格) ─── */
function GateTower() {
  const group = useRef()
  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.08) * 0.12
  })
  return (
    <group ref={group}>
      {/* 城台 */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 2.4, 3.5]} />
        <meshPhysicalMaterial color="#8B7D6B" roughness={0.65} metalness={0.05} />
      </mesh>
      {/* 城台上沿 */}
      <mesh position={[0, 2.45, 0]}>
        <boxGeometry args={[7.2, 0.1, 3.7]} />
        <meshPhysicalMaterial color="#F0EAD6" roughness={0.2} clearcoat={0.3} />
      </mesh>
      {/* 城门洞 (3个) */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={`gate-${i}`} position={[x, 0.65, 1.76]}>
          <boxGeometry args={[i === 1 ? 0.9 : 0.65, i === 1 ? 1.6 : 1.3, 0.04]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
      ))}
      {/* 栏杆 */}
      <MarbleRailing width={6.8} depth={3.3} y={2.5} />
      {/* 城楼柱子 */}
      {Array.from({ length: 10 }).map((_, i) => {
        const col = i % 5, row = Math.floor(i / 5)
        return (
          <OrnateColumn
            key={`gc-${i}`}
            position={[-2.4 + col * 1.2, 2.5, row === 0 ? 1.2 : -1.2]}
            height={1.8}
            radius={0.06}
          />
        )
      })}
      {/* 城楼主体 */}
      <mesh position={[0, 3.7, 0]} castShadow>
        <boxGeometry args={[5.5, 1.2, 2.2]} />
        <meshPhysicalMaterial color="#9B1B30" roughness={0.45} metalness={0.1} />
      </mesh>
      {/* 窗户 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`gwin-${i}`} position={[-2 + i * 1, 3.7, 1.11]}>
          <boxGeometry args={[0.3, 0.5, 0.02]} />
          <meshStandardMaterial color="#3A1A00" roughness={0.5} />
        </mesh>
      ))}
      {/* 斗拱 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Dougong key={`gdg-${i}`} position={[-2 + i * 0.8, 4.35, 1.15]} scale={0.6} />
      ))}
      {/* 额枋 */}
      <mesh position={[0, 4.32, 0]}>
        <boxGeometry args={[5.8, 0.08, 2.5]} />
        <meshPhysicalMaterial color="#5C3A1E" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* 重檐歇山顶 - 下檐 */}
      <group position={[0, 4.8, 0]}>
        <CurvedRoof width={6.2} depth={2.8} height={0.8} color="#DAA520" emissiveColor="#8B6914" />
      </group>
      {/* 重檐歇山顶 - 上檐 */}
      <group position={[0, 5.8, 0]}>
        <CurvedRoof width={5} depth={2.2} height={1.2} color="#DAA520" emissiveColor="#8B6914" overhang={0.5} />
      </group>
      {/* 正脊 */}
      <mesh position={[0, 6.45, 0]}>
        <boxGeometry args={[2.5, 0.08, 0.1]} />
        <meshPhysicalMaterial color="#FFD700" roughness={0.15} metalness={0.85} emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>
      {/* 鸱吻 */}
      {[-1.25, 1.25].map((x, i) => (
        <mesh key={`gchi-${i}`} position={[x, 6.55, 0]}>
          <coneGeometry args={[0.06, 0.2, 6]} />
          <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={0.95} emissive="#FFD700" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* 国徽位置 (金色圆) */}
      <mesh position={[0, 3.85, 1.11]}>
        <circleGeometry args={[0.25, 32]} />
        <meshPhysicalMaterial color="#FFD700" roughness={0.1} metalness={0.9} emissive="#FFD700" emissiveIntensity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* ─── 氛围粒子 ─── */
function AtmosphereParticles({ count = 150 }) {
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const goldC = new THREE.Color('#C5A55A')
    const warmC = new THREE.Color('#FFE4B5')
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = Math.random() * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25
      const c = Math.random() > 0.5 ? goldC : warmC
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [count])

  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.elapsedTime * 0.015
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(s.clock.elapsedTime * 0.5 + i * 0.3) * 0.003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.7} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

/* ─── 反射地面 ─── */
function ReflectiveGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshPhysicalMaterial color="#e8e3d9" roughness={0.7} metalness={0.05} />
    </mesh>
  )
}

/* ─── 场景后处理 ─── */
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.5}
        intensity={0.8}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.15} darkness={0.6} />
    </EffectComposer>
  )
}

const models = [
  { id: 'palace', name: '宫殿', desc: '庑殿顶 · 太和殿风格' },
  { id: 'pagoda', name: '佛塔', desc: '楼阁式 · 应县木塔风格' },
  { id: 'pavilion', name: '亭子', desc: '攒尖顶 · 皇家园林' },
  { id: 'gate', name: '城楼', desc: '重檐歇山 · 天安门风格' },
]

export default function Building3DScene() {
  const [activeModel, setActiveModel] = useState('palace')

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-2xl bg-white/70 backdrop-blur-md border border-[#2c2c2c]/10 p-10 relative flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
        >
          {/* 四个角的伪装订点 */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#2c2c2c]/20" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#2c2c2c]/20" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#2c2c2c]/20" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#2c2c2c]/20" />

          <span className="text-[10px] text-[#a63429] border border-[#a63429]/30 px-3 py-1 mb-6 tracking-[0.4em] uppercase font-light">
            Exhibit 展览陈列
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-[#2c2c2c] font-serif">3D 建筑模型</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#cfaa71]/60 mb-6" />
          <p className="text-[#666666] text-sm leading-[2] font-light text-center">
            以三维视角沉浸式感受中国古代建筑的结构之美，<br className="hidden md:block" />拖拽旋转可360度观赏建筑细节
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id)}
              className={`px-6 py-3 rounded-2xl text-sm transition-all duration-500 border ${activeModel === m.id
                ? 'bg-[#a63429] text-white border-[#a63429] shadow-[0_4px_15px_rgba(166,52,41,0.2)]'
                : 'bg-transparent text-[#666666] border-[#2c2c2c]/10 hover:border-[#a63429]/40 hover:text-[#2c2c2c]'
                }`}
            >
              <div className="font-bold">{m.name}</div>
              <div className="text-xs opacity-70 mt-0.5">{m.desc}</div>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-premium overflow-hidden relative"
          style={{ height: '600px' }}
        >
          <div className="absolute top-3 left-3 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-[#2c2c2c]/15 z-10" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-[#2c2c2c]/15 z-10" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-[#2c2c2c]/15 z-10" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-[#2c2c2c]/15 z-10" />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 font-sans text-xs text-[#2c2c2c]/80 bg-white/80 px-5 py-2 rounded-sm backdrop-blur-md border border-[#2c2c2c]/10 tracking-widest shadow-sm">
            🖱 拖拽旋转 · 滚轮缩放 · 自动巡览
          </div>

          <Canvas
            camera={{ position: [10, 7, 10], fov: 40 }}
            shadows
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
            style={{ background: 'transparent' }}
          >
            <color attach="background" args={['#f9f6f0']} />
            <fog attach="fog" args={['#f9f6f0', 15, 35]} />

            <ambientLight intensity={0.8} color="#ffffff" />
            <directionalLight position={[10, 18, 10]} intensity={1.8} color="#fffcf2" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
            <directionalLight position={[-8, 12, -6]} intensity={0.6} color="#eaddc5" />
            <pointLight position={[0, 10, 0]} intensity={0.4} color="#D4AF37" distance={25} decay={2} />
            <pointLight position={[5, 3, 5]} intensity={0.2} color="#a63429" distance={15} decay={2} />

            {activeModel === 'palace' && <Palace />}
            {activeModel === 'pagoda' && <Pagoda />}
            {activeModel === 'pavilion' && <Pavilion />}
            {activeModel === 'gate' && <GateTower />}

            <AtmosphereParticles count={150} />
            <ReflectiveGround />

            <PostProcessing />

            <OrbitControls
              enablePan={false}
              minDistance={6}
              maxDistance={20}
              minPolarAngle={0.2}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate
              autoRotateSpeed={0.4}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-8 mb-20 relative z-20 bg-white/60 backdrop-blur-sm border border-[#2c2c2c]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          {[
            { label: '基础材质', value: '物理渲染', desc: 'PBR材质展现木质纹理' },
            { label: '环境系统', value: 'HDRI光照', desc: '全天候自然光照模拟' },
            { label: '渲染引擎', value: 'WebGL 2.0', desc: '硬件加速高性能渲染' },
            { label: '模型精度', value: '高精度', desc: '保留斗拱等核心细节' },
          ].map((item, i) => (
            <div key={i} className={`p-6 text-center group ${i !== 0 ? 'border-l border-[#2c2c2c]/5' : ''}`}>
              <div className="text-xl font-bold text-[#a63429] font-serif mb-2">{item.value}</div>
              <div className="text-[11px] text-[#2c2c2c] font-bold tracking-[0.2em] mb-1">{item.label}</div>
              <div className="text-[10px] text-[#666666]">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
