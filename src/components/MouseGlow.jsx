import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    const handleMove = (e) => {
      el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[9999] w-[500px] h-[500px]"
      style={{
        background: 'radial-gradient(circle, rgba(197,165,90,0.05) 0%, rgba(197,165,90,0.015) 35%, transparent 65%)',
        borderRadius: '50%',
        top: 0,
        left: 0,
        transition: 'transform 0.15s linear',
        willChange: 'transform',
      }}
    />
  )
}
