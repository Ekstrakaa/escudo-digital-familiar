import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const SITUATIONS = [
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>`,
    title: 'Llamada del banco', desc: 'Me piden datos o clave',
    color: '#ef4444', bg: 'rgba(239,68,68,.04)', border: 'rgba(239,68,68,.30)',
    msg: 'Me llamaron del banco y me pidieron mi clave',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    title: 'SMS sospechoso', desc: 'Con link o pedido raro',
    color: '#f59e0b', bg: 'rgba(245,158,11,.04)', border: 'rgba(245,158,11,.30)',
    msg: 'Recibí un SMS con un link raro para pagar una deuda',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"/></svg>`,
    title: 'Código WhatsApp', desc: 'Me lo están pidiendo',
    color: '#10b981', bg: 'rgba(16,185,129,.04)', border: 'rgba(16,185,129,.30)',
    msg: 'Me están pidiendo el código de 6 dígitos de WhatsApp',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2.5"/></svg>`,
    title: 'Caí en una estafa', desc: '¿Qué hago ahora?',
    color: '#f97316', bg: 'rgba(249,115,22,.04)', border: 'rgba(249,115,22,.30)',
    msg: 'Creo que me estafaron, veo movimientos raros en mi cuenta',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    title: 'Persona en la puerta', desc: 'Pide datos o dinero',
    color: '#8b7cf8', bg: 'rgba(139,124,248,.04)', border: 'rgba(139,124,248,.30)',
    msg: 'Hay una persona en la puerta pidiendo mis datos del banco',
  },
  {
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: 'Proteger familiar', desc: 'Guía para tu familia',
    color: '#06b6d4', bg: 'rgba(6,182,212,.04)', border: 'rgba(6,182,212,.30)',
    msg: '¿Cómo puedo proteger a mi familiar mayor de las estafas?',
  },
]

const AUX_ROWS = [
  ['1', 'Cibercrimen — Ministerio del Interior', '2030 4625'],
  ['2', 'BROU — Llamá al banco', '1722 0001 · 24hs'],
  ['3', 'CERTuy — Incidentes digitales', '1719 · 24hs'],
  ['4', 'Policía de inmediato', '911'],
  ['5', 'IM Adultos Mayores', '1950 5555'],
  ['6', 'Ministerio del Interior', '0800 5050'],
  ['7', 'Denuncias online', 'denuncias.minterior.gub.uy'],
]

export default function HomeScreen({ go }) {
  const [auxOpen, setAuxOpen] = useState(false)

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(170deg, #060c1a 0%, #071626 50%, #060c1a 100%)' }}>

      <div className="absolute inset-0 pointer-events-none z-0"><Particles /></div>
      <motion.div className="absolute inset-0 pointer-events-none z-0"
        animate={{ background: [
          'radial-gradient(ellipse 70% 35% at 20% 25%, rgba(0,200,255,.06) 0%, transparent 70%)',
          'radial-gradient(ellipse 70% 35% at 80% 65%, rgba(139,124,248,.05) 0%, transparent 70%)',
          'radial-gradient(ellipse 70% 35% at 20% 25%, rgba(0,200,255,.06) 0%, transparent 70%)',
        ]}}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center"
        style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + 0px)`, paddingBottom: 40 }}>

        {/* ── FOTO ABUELITOS — solo imagen, sin texto encima ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }}
          className="relative w-full overflow-hidden"
          style={{ borderRadius: '0 0 28px 28px', maxHeight: 200 }}
        >
          <img
            src="/imgs/hero_abuelitos.png"
            alt="Adultos mayores usando el celular"
            style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'center 10%', display: 'block' }}
          />
          {/* Overlay solo abajo para transición suave al fondo oscuro */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, #060c1a 100%)',
          }} />

        </motion.div>

        {/* ── LOGO + TÍTULO debajo de la foto ── */}
        <div className="flex flex-col items-center px-4 w-full" style={{ maxWidth: 480 }}>
          <motion.div
            initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .3, duration: .5 }}
            className="flex items-center justify-center"
            style={{ marginTop: -48 }}
          >
            <motion.img src="/imgs/LOGO.png" alt="Escudo Digital Familiar"
              animate={{
                scale: [1, 1.1, 1],
                filter: [
                  'drop-shadow(0 0 22px rgba(0,229,160,.95))',
                  'drop-shadow(0 0 22px rgba(0,200,255,.95))',
                  'drop-shadow(0 0 22px rgba(139,124,248,.95))',
                  'drop-shadow(0 0 22px rgba(255,180,0,.95))',
                  'drop-shadow(0 0 22px rgba(0,229,160,.95))',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 100, height: 100, objectFit: 'contain', marginBottom: 12 }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .35, duration: .4 }} className="text-center mb-1">
            <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.5px' }}>Escudo Digital</div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
              <span style={{ color: '#00E5A0' }}>Familiar</span>
            </div>
          </motion.div>

          {/* Badge institucional — debajo del título */}
          <motion.a
            href="https://montevideo.gub.uy/area-tematica/inclusion-social/personas-mayores/programa-de-inclusion-digital"
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .4 }}
            className="flex items-center gap-2 px-4 py-[7px] rounded-full mb-3 mt-4"
            style={{ background: 'rgba(139,124,248,.12)', border: '1px solid rgba(139,124,248,.35)', textDecoration: 'none' }}
          >
            <motion.div animate={{ opacity: [1, .3, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#00e5a0', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.78rem', fontWeight: 700, color: '#e0d4ff', letterSpacing: '.03em' }}>
              Programa de Inclusión Digital · IM
            </span>
          </motion.a>

          {/* Subtítulo */}
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .4 }}
            style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.9rem', color: '#c8d8ee', textAlign: 'center', maxWidth: 300, lineHeight: 1.55, marginBottom: 20, marginTop: 6 }}>
            Tu herramienta ante estafas digitales y el cuento del tío, disponible 24/7. No estás solo.
          </motion.p>

          {/* Botón VERDE — Test de Blindaje */}
          <div className="relative w-full mb-3">
            <motion.button
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3 }} whileTap={{ scale: .97 }}
              onClick={() => go.quiz()}
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ height: 68, border: 'none', cursor: 'pointer', background: '#059669', boxShadow: '0 4px 20px rgba(16,185,129,.3)', overflow: 'hidden' }}>
              <motion.div className="absolute pointer-events-none"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ inset: 0, background: 'linear-gradient(135deg, #059669 0%, #00E5A0 40%, #34d399 70%, #059669 100%)', backgroundSize: '200% 200%' }}
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 55%)' }} />
              <div className="relative flex items-center justify-between px-6 h-full">
                <div className="flex items-center gap-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,.7)" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <div className="text-left">
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '1.15rem', fontWeight: 900, color: '#000', lineHeight: 1.2 }}>Test de Blindaje</div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.78rem', fontWeight: 600, color: 'rgba(0,0,0,.65)', marginTop: 2 }}>¿Qué tan protegido estás?</div>
                  </div>
                </div>
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: .3 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,.6)" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.div>
              </div>
            </motion.button>
          </div>

          {/* Botón ROJO — Necesito ayuda */}
          <div className="relative w-full mb-7">
            <motion.button
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .24 }} whileTap={{ scale: .97 }}
              onClick={() => go.chat(null)}
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ height: 68, border: 'none', cursor: 'pointer', background: '#b91c1c', boxShadow: '0 4px 20px rgba(220,38,38,.35)', overflow: 'hidden' }}>
              <motion.div className="absolute pointer-events-none"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: .8 }}
                style={{ inset: 0, background: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 40%, #f87171 70%, #b91c1c 100%)', backgroundSize: '200% 200%' }}
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.15) 0%, transparent 55%)' }} />
              <div className="relative flex items-center justify-between px-6 h-full">
                <div className="flex items-center gap-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>
                  <div className="text-left">
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '1.15rem', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>Necesito ayuda ahora</div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.78rem', fontWeight: 600, color: 'rgba(255,255,255,.8)', marginTop: 2 }}>Hablá con nuestro asistente</div>
                  </div>
                </div>
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.div>
              </div>
            </motion.button>
          </div>

          {/* Label */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .36 }}
            className="w-full mb-3" style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.78rem', fontWeight: 700, color: '#c8d8ee', letterSpacing: '.08em', textTransform: 'uppercase' }}>
              ¿Qué te está pasando?
            </span>
          </motion.div>

          {/* Grid situaciones */}
          <div className="w-full grid grid-cols-2 gap-[10px]">
            {SITUATIONS.map((s, i) => (
              <motion.button key={i}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .38 + i * .06 }} whileTap={{ scale: .96 }}
                onClick={() => go.chat(s.msg)}
                className="flex flex-col items-start text-left"
                style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 16, padding: '16px 14px', cursor: 'pointer', minHeight: 120, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}1a`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: 12 }}
                  dangerouslySetInnerHTML={{ __html: s.svg }} />
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.95rem', fontWeight: 700, color: '#f0f6ff', lineHeight: 1.25, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.77rem', color: '#8fa8cc', lineHeight: 1.4 }}>{s.desc}</div>
              </motion.button>
            ))}
          </div>

          {/* Botón Primeros Auxilios */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}
            className="w-full mt-4 pb-8">
            <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.78rem', fontWeight: 700, color: '#c8d8ee', letterSpacing: '.06em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>
              ¿Ya fuiste víctima? Actuá ahora
            </div>
            <motion.button whileTap={{ scale: .97 }} onClick={() => setAuxOpen(true)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-[16px]"
              style={{ background: 'rgba(239,68,68,.06)', border: '1.5px solid rgba(239,68,68,.25)', cursor: 'pointer' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.95rem', fontWeight: 700, color: '#fff' }}>Primeros Auxilios Digitales</div>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.75rem', color: '#ef4444', marginTop: 2 }}>Si te estafaron, hacé esto YA →</div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </motion.button>
          </motion.div>

          {/* Logos footer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex flex-col items-center gap-3 pb-10 pt-4">
            <div className="flex items-center gap-5">
              <img src="/imgs/logo_im.png" alt="Intendencia de Montevideo" style={{ height: 26, objectFit: 'contain', opacity: .7 }} />
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,.1)' }} />
              <img src="/imgs/Logo_MInisterio.png" alt="Ministerio del Interior" style={{ height: 26, objectFit: 'contain', opacity: .55, filter: 'invert(1) brightness(2)' }} />
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,.1)' }} />
              <img src="/imgs/MunicipioB.png" alt="Municipio B" style={{ height: 26, objectFit: 'contain', opacity: .6 }} />
            </div>
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.62rem', color: '#4a6080', letterSpacing: '.05em', textAlign: 'center' }}>
              Intendencia de Montevideo · Ministerio del Interior · Municipio B · 2026
            </span>
          </motion.div>
        </div>
      </div>

      {/* Modal Primeros Auxilios */}
      <AnimatePresence>
        {auxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: 'rgba(5,13,26,.75)', backdropFilter: 'blur(4px)' }}
            onClick={() => setAuxOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: .92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .92, y: 16 }}
              transition={{ duration: .25, ease: 'easeOut' }}
              className="w-full rounded-[20px] overflow-hidden"
              style={{ maxWidth: 280, background: '#0d1a30', border: '1px solid rgba(239,68,68,.28)', boxShadow: '0 24px 64px rgba(0,0,0,.7)' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-3 py-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '.82rem', color: '#fff' }}>Primeros Auxilios Digitales</div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.62rem', color: '#ef4444' }}>Si te estafaron, hacé esto YA</div>
                  </div>
                </div>
                <button onClick={() => setAuxOpen(false)}
                  style={{ background: 'rgba(255,255,255,.07)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: '#8fa8cc', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  ✕
                </button>
              </div>
              <div className="px-3 pt-2 pb-3 flex flex-col gap-[4px]">
                {AUX_ROWS.map(r => (
                  <div key={r[0]} className="flex items-center gap-3 px-3 py-[9px] rounded-[10px]"
                    style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)' }}>
                    <div className="w-5 h-5 rounded-[5px] flex items-center justify-center font-mono text-[.6rem] font-semibold flex-shrink-0"
                      style={{ background: '#142040', color: '#4a6080' }}>{r[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.6rem', color: '#8fa8cc' }}>{r[1]}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.78rem', fontWeight: 700, color: '#f0f6ff' }}>{r[2]}</div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => { setAuxOpen(false); go.chat('Creo que me estafaron, necesito ayuda urgente') }}
                  className="w-full py-[9px] rounded-[10px] font-bold text-white mt-1"
                  style={{ background: 'linear-gradient(135deg,#c0392b,#e74c3c)', fontFamily: "'Poppins',sans-serif", fontSize: '.82rem', border: 'none', cursor: 'pointer' }}>
                  Hablar con el asistente →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
