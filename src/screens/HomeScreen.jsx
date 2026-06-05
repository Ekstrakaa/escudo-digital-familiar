import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Partículas ──────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const dots = Array.from({ length: 72 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.32,
      vy:  (Math.random() - 0.5) * 0.32,
      r:   Math.random() * 2.8 + 1.0,
      a:   Math.random() * 0.55 + 0.20,
      hue: Math.random() * 360,
      dh:  (Math.random() * 0.6 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x  += d.vx; d.y += d.vy
        d.hue = (d.hue + d.dh + 360) % 360
        if (d.x < 0) d.x = canvas.width
        if (d.x > canvas.width) d.x = 0
        if (d.y < 0) d.y = canvas.height
        if (d.y > canvas.height) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${d.hue}, 100%, 65%, ${d.a})`
        ctx.fill()
      })
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (dist < 95) {
          const midHue = (a.hue + b.hue) / 2
          ctx.beginPath()
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `hsla(${midHue}, 100%, 65%, ${0.12 * (1 - dist / 95)})`
          ctx.stroke()
        }
      }))
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ─── Tarjetas situación ──────────────────────────────── */
const SITUATIONS = [
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>`,
    title: 'Llamada del banco',
    desc: 'Me piden datos o clave',
    color: '#ef4444',
    bg: 'rgba(239,68,68,.04)',
    border: 'rgba(239,68,68,.30)',
    msg: 'Me llamaron del banco y me pidieron mi clave',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    title: 'SMS sospechoso',
    desc: 'Con link o pedido raro',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,.04)',
    border: 'rgba(245,158,11,.30)',
    msg: 'Recibí un SMS con un link raro para pagar una deuda',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"/></svg>`,
    title: 'Código WhatsApp',
    desc: 'Me lo están pidiendo',
    color: '#10b981',
    bg: 'rgba(16,185,129,.04)',
    border: 'rgba(16,185,129,.30)',
    msg: 'Me están pidiendo el código de 6 dígitos de WhatsApp',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2.5"/></svg>`,
    title: 'Caí en una estafa',
    desc: '¿Qué hago ahora?',
    color: '#f97316',
    bg: 'rgba(249,115,22,.04)',
    border: 'rgba(249,115,22,.30)',
    msg: 'Creo que me estafaron, veo movimientos raros en mi cuenta',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    title: 'Persona en la puerta',
    desc: 'Pide datos o dinero',
    color: '#8b7cf8',
    bg: 'rgba(139,124,248,.04)',
    border: 'rgba(139,124,248,.30)',
    msg: 'Hay una persona en la puerta pidiendo mis datos del banco',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: 'Proteger familiar',
    desc: 'Guía para tu familia',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,.04)',
    border: 'rgba(6,182,212,.30)',
    msg: '¿Cómo puedo proteger a mi familiar mayor de las estafas?',
  },
]

/* ─── HomeScreen ──────────────────────────────────────── */
export default function HomeScreen({ go }) {
  const [logoLoaded, setLogoLoaded] = useState(false)

  return (
    <div
      className="relative flex flex-col min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(170deg, #060c1a 0%, #071626 50%, #060c1a 100%)' }}
    >
      {/* Partículas de fondo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles />
      </div>

      {/* Contenido */}
      <div
        className="relative z-10 flex flex-col items-center w-full px-4"
        style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + 44px)`, paddingBottom: 40 }}
      >

        {/* ── LOGO arriba del título ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .5, ease: 'easeOut' }}
          className="flex items-center justify-center mb-5"
        >
          <motion.img
            src="/imgs/LOGO.png"
            alt="Escudo Digital Familiar"
            animate={{
              scale: [1, 1.13, 1],
              filter: [
                'drop-shadow(0 0 22px rgba(0,229,160,.9)) drop-shadow(0 0 10px rgba(0,229,160,.5))',
                'drop-shadow(0 0 22px rgba(0,200,255,.9)) drop-shadow(0 0 10px rgba(0,200,255,.5))',
                'drop-shadow(0 0 22px rgba(139,124,248,.9)) drop-shadow(0 0 10px rgba(139,124,248,.5))',
                'drop-shadow(0 0 22px rgba(255,100,150,.9)) drop-shadow(0 0 10px rgba(255,100,150,.5))',
                'drop-shadow(0 0 22px rgba(255,180,0,.9)) drop-shadow(0 0 10px rgba(255,180,0,.5))',
                'drop-shadow(0 0 22px rgba(0,229,160,.9)) drop-shadow(0 0 10px rgba(0,229,160,.5))',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 120,
              height: 120,
              objectFit: 'contain',
            }}
          />
        </motion.div>

        {/* ── TÍTULO principal ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .45, ease: 'easeOut' }}
          className="text-center mb-2"
        >
          {/* Línea 1: "Escudo" en blanco bold */}
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '2.35rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
            }}
          >
            Escudo
          </div>
          {/* Línea 2: "Digital Familiar" — Digital blanco, Familiar cyan */}
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '2.35rem',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
            }}
          >
            <span style={{ color: '#ffffff' }}>Digital </span>
            <span style={{ color: '#00E5A0' }}>Familiar</span>
          </div>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1, duration: .4 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '.9rem',
            fontWeight: 400,
            color: '#8fa8cc',
            textAlign: 'center',
            maxWidth: 260,
            lineHeight: 1.55,
            marginBottom: 20,
          }}
        >
          Tu herramienta de orientación ante estafas digitales, disponible 24/7.
        </motion.p>

        {/* Badge IM */}
        <motion.div
          initial={{ opacity: 0, scale: .92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: .18, duration: .35 }}
          className="flex items-center gap-2 px-4 py-[7px] rounded-full mb-7"
          style={{
            background: 'rgba(0,229,160,.07)',
            border: '1.5px solid rgba(0,229,160,.28)',
          }}
        >
          {/* Dot verde pulsante */}
          <motion.div
            animate={{ opacity: [1, .3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#00e5a0', flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '.72rem',
              fontWeight: 600,
              color: '#00e5a0',
              letterSpacing: '.04em',
            }}
          >
            Programa de Inclusión Digital · IM
          </span>
        </motion.div>

        {/* ── BOTÓN ROJO — Necesito ayuda ahora ── */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .24, duration: .4 }}
          whileTap={{ scale: .97 }}
          onClick={() => go.chat(null)}
          className="w-full flex items-center justify-between px-6 rounded-2xl mb-3"
          style={{
            maxWidth: 480,
            height: 62,
            background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
            boxShadow: '0 4px 24px rgba(220,60,50,.4)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Dot rojo */}
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff6b6b', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.08rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '.01em',
              }}
            >
              Necesito ayuda ahora
            </span>
          </div>
          {/* Flecha derecha */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.button>

        {/* ── BOTÓN CYAN — Test de Blindaje ── */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3, duration: .4 }}
          whileTap={{ scale: .97 }}
          onClick={() => go.quiz()}
          className="w-full flex items-center justify-between px-6 rounded-2xl mb-7"
          style={{
            maxWidth: 480,
            height: 62,
            background: 'linear-gradient(135deg, #00b377 0%, #00E5A0 100%)',
            boxShadow: '0 4px 24px rgba(26,199,167,.3)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Ícono check */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.08rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '.01em',
              }}
            >
              Test de Blindaje
            </span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.button>

        {/* ── LABEL sección ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .36 }}
          className="w-full mb-3"
          style={{ maxWidth: 480 }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '.62rem',
              fontWeight: 500,
              color: '#4a6080',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
            }}
          >
            ¿Qué te está pasando?
          </span>
        </motion.div>

        {/* ── GRID 2 columnas — tarjetas situación ── */}
        <div
          className="w-full grid grid-cols-2 gap-[10px]"
          style={{ maxWidth: 480 }}
        >
          {SITUATIONS.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .38 + i * .06, duration: .35 }}
              whileTap={{ scale: .96 }}
              onClick={() => go.chat(s.msg)}
              className="flex flex-col items-start text-left"
              style={{
                background: s.bg,
                border: `1.5px solid ${s.border}`,
                borderRadius: 16,
                padding: '16px 14px 16px 14px',
                cursor: 'pointer',
                minHeight: 120,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              {/* Ícono en caja */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${s.color}1a`,
                  border: `1px solid ${s.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: s.color,
                  marginBottom: 12,
                  flexShrink: 0,
                }}
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
              {/* Título */}
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '.95rem',
                  fontWeight: 700,
                  color: '#f0f6ff',
                  lineHeight: 1.25,
                  marginBottom: 4,
                }}
              >
                {s.title}
              </div>
              {/* Descripción */}
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '.77rem',
                  fontWeight: 400,
                  color: '#8fa8cc',
                  lineHeight: 1.4,
                }}
              >
                {s.desc}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Botón Primeros Auxilios Digitales */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .85 }}
          className="w-full mt-4 pb-10"
          style={{ maxWidth: 480 }}
        >
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', fontWeight:500, color:'#4a6080', letterSpacing:'.1em', textTransform:'uppercase', textAlign:'center', marginBottom:10 }}>
            ¿Ya fuiste víctima? Actuá ahora
          </div>
          <motion.button
            whileTap={{ scale: .97 }}
            onClick={() => go.chat('Creo que me estafaron, necesito los primeros auxilios digitales, qué hago ahora')}
            className="w-full flex items-center justify-between px-5 py-4 rounded-[16px]"
            style={{
              background: 'rgba(239,68,68,.06)',
              border: '1.5px solid rgba(239,68,68,.25)',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>
              </div>
              <div className="text-left">
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'.95rem', fontWeight:700, color:'#fff' }}>
                  Primeros Auxilios Digitales
                </div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'.75rem', color:'#ef4444', marginTop:2 }}>
                  Si te estafaron, hacé esto YA →
                </div>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}
