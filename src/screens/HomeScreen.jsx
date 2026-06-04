import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const LOGO_SRC = 'data:image/png;base64,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'

function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#00c8ff','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4']
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2,'0')
        ctx.fill()
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,200,255,${(1 - dist/120) * 0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex:0 }} />
}

const SITUATIONS = [
  { id:'door',  icon:'🚪', label:'Persona en la puerta', msg:'Hay una persona en la puerta de mi casa que dice ser del banco y pide mis datos' },
  { id:'call',  icon:'📞', label:'Llamada sospechosa',   msg:'Me llamaron del banco y me pidieron mi clave, ¿qué hago?' },
  { id:'sms',   icon:'📨', label:'SMS o email raro',     msg:'Recibí un SMS raro con un link para pagar una deuda' },
  { id:'wpp',   icon:'💬', label:'WhatsApp extraño',     msg:'Me llegó un WhatsApp de un número desconocido pidiendo dinero urgente' },
  { id:'scam',  icon:'💸', label:'Creo que me estafaron',msg:'Creo que me estafaron, veo movimientos raros en mi cuenta' },
  { id:'prize', icon:'🎁', label:'Gané un premio',       msg:'Me dijeron que gané un premio y me piden mis datos para reclamarlo' },
]

export default function HomeScreen({ go }) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040d1b 0%, #071828 40%, #040d1b 100%)' }}>

      {/* Animated gradient blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0077aa44, transparent 70%)', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10b98133, transparent 70%)', zIndex: 0 }}
      />

      <Particles />

      <div className="relative z-10 flex flex-col flex-1 px-5 pt-14 pb-8">

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.06, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="relative mb-5"
          >
            {/* Glow rings */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute inset-[-16px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,200,255,.25), transparent 70%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.3 }}
              className="absolute inset-[-30px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,.15), transparent 70%)' }}
            />
            <img src={LOGO_SRC} alt="Escudo Digital Familiar" className="w-32 h-32 object-contain relative z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:15 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3, duration:0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl font-black text-white leading-tight mb-1">
              Escudo Digital
            </h1>
            <h2 className="text-3xl font-black leading-tight mb-3" style={{ color:'#00c8ff' }}>
              Familiar
            </h2>
            <p className="text-slate-400 text-[.9rem] leading-relaxed max-w-[280px] mx-auto">
              Tu protección contra estafas digitales en Uruguay
            </p>
          </motion.div>
        </div>

        {/* Main buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <motion.button
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.5 }}
            whileTap={{ scale:0.97 }}
            onClick={go.chat}
            className="w-full py-4 rounded-2xl font-bold text-white text-[1.05rem] flex items-center justify-center gap-2"
            style={{ background:'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow:'0 6px 25px rgba(239,68,68,.35)' }}
          >
            🆘 Necesito ayuda ahora
          </motion.button>

          <motion.button
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.6 }}
            whileTap={{ scale:0.97 }}
            onClick={go.quiz}
            className="w-full py-4 rounded-2xl font-bold text-white text-[1.05rem] flex items-center justify-center gap-2"
            style={{ background:'linear-gradient(135deg, #059669, #10b981)', boxShadow:'0 6px 25px rgba(16,185,129,.3)' }}
          >
            🛡️ Test de Blindaje Digital
          </motion.button>
        </div>

        {/* Situations grid */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.7 }}
        >
          <p className="text-slate-500 text-[.75rem] text-center mb-3 uppercase tracking-widest">¿Qué te pasó?</p>
          <div className="grid grid-cols-2 gap-2.5">
            {SITUATIONS.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity:0, scale:0.9 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ delay: 0.75 + i * 0.07 }}
                whileTap={{ scale:0.95 }}
                onClick={() => go.chatWith(s.msg)}
                className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl transition-all"
                style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)' }}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-[.75rem] text-slate-300 text-center leading-tight font-medium">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:1.2 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          <div className="text-[.65rem] text-slate-600 text-center">
            Programa de Inclusión Digital · Intendencia de Montevideo
          </div>
        </motion.div>
      </div>
    </div>
  )
}
