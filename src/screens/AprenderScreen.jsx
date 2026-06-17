import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Partículas (igual que el resto de la app) ── */
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.6 + 1.0, a: Math.random() * 0.5 + 0.18,
      hue: Math.random() * 360, dh: (Math.random() * 0.6 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.hue = (d.hue + d.dh + 360) % 360
        if (d.x < 0) d.x = canvas.width; if (d.x > canvas.width) d.x = 0
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${d.hue}, 100%, 65%, ${d.a})`; ctx.fill()
      })
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (dist < 92) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 100%, 65%, ${0.10 * (1 - dist / 92)})`; ctx.stroke()
        }
      }))
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ── Contenido educativo (6 temas) ── */
const TOPICS = [
  {
    color: '#00c8ff',
    ic: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    title: 'Contraseñas seguras',
    sub: 'Tu primera barrera',
    body: 'Una buena contraseña es difícil de adivinar. La regla es simple: cuanto más larga, mejor. Lo ideal es una frase que vos recuerdes, con una mayúscula, un número y algún símbolo.',
    signs: ['Una palabra sola o tu nombre se adivinan enseguida', 'Las fechas (tu cumpleaños, un año) son fáciles de probar', '"1234" o "123456" son las primeras que prueban'],
    action: 'Usá una frase larga, por ejemplo "MiGataTomaMate!7". No repitas la misma para todo y no se la digas a nadie.',
  },
  {
    color: '#ffc844',
    ic: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    title: 'Mensajes y correos falsos',
    sub: 'Se hacen pasar por otro',
    body: 'Es cuando un SMS, mail o WhatsApp finge ser tu banco, el Estado o una empresa conocida, para que entres a un link y entregues tus datos.',
    signs: ['Te apuran: "pagá hoy o te cortan", "última oportunidad"', 'Tienen errores de ortografía o se ven raros', 'Piden tus datos o que entres a un link'],
    action: 'No toques el link. Si dudás, entrá vos al sitio oficial o llamá por un número que ya conozcas. Mirá quién lo manda, no el logo: el logo se copia fácil.',
  },
  {
    color: '#8b7cf8',
    ic: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    title: 'El cuento del tío',
    sub: 'Se hacen pasar por un ser querido',
    body: 'Alguien escribe haciéndose pasar por un familiar o amigo en problemas, para que le mandes plata rápido y sin pensar.',
    signs: ['"Cambié de número, guardalo"', 'Urgencia y secreto: "es para ya", "no le digas a nadie"', 'Te piden un giro, una transferencia o una recarga'],
    action: 'Frená. Llamá a tu familiar al número de siempre para confirmar que es él. Nadie de confianza te pide plata apurado y en secreto.',
  },
  {
    color: '#00e5a0',
    ic: '<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z"/><path d="M9 12l2 2 4-4"/>',
    title: 'Tus claves y códigos',
    sub: 'Son solo tuyos',
    body: 'La clave de tu banco y el código que llega por SMS son la llave de tus cuentas. Con ese código alguien puede entrar o confirmar movimientos en tu lugar.',
    signs: ['Te piden la clave o el código "para verificar"', 'Te lo piden por teléfono, SMS o WhatsApp', 'Te apuran para que lo digas rápido'],
    action: 'No los compartas con nadie, nunca. Ningún banco ni empresa te los pide. Si te los piden, es un estafador: cortá y verificá vos por un canal oficial.',
  },
  {
    color: '#ff6b35',
    ic: '<path d="M10.6 13.4a3 3 0 0 0 4.2 0l3-3a3 3 0 0 0-4.2-4.2l-1 1"/><path d="M13.4 10.6a3 3 0 0 0-4.2 0l-3 3a3 3 0 0 0 4.2 4.2l1-1"/>',
    title: 'Links y archivos raros',
    sub: 'Pueden infectar el celular',
    body: 'Un link o un archivo inesperado puede instalar un programa que roba tus datos o toma el control del teléfono, sin que te des cuenta.',
    signs: ['Llega de la nada y promete premios o sustos', '"Mirá esta foto" o un archivo que no esperabas', 'Aunque venga de un conocido: su cuenta puede estar robada'],
    action: 'No abras links ni archivos que no esperabas. Ante la duda, preguntá a la persona por otro medio. Mantené el celular actualizado.',
  },
  {
    color: '#06b6d4',
    ic: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    title: 'Comprar y vender online',
    sub: 'Marketplace y redes',
    body: 'En las compras y ventas por internet también hay trampas. Si una oferta parece demasiado buena, casi siempre es para engañarte.',
    signs: ['Precios demasiado bajos y mucho apuro', 'Te piden pagar por adelantado, sin ver el producto', 'Te mandan un "código para confirmar la venta"'],
    action: 'No pagues antes de ver lo que comprás. Nunca des un código que te mandan para "confirmar": es para robarte la cuenta. Mejor pagar en persona o por medios seguros.',
  },
]

function Ic({ path, color, size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: path }} />
}

export default function AprenderScreen({ go }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="apr-root">
      <Style />
      <div className="apr-particles"><Particles /></div>

      <div className="apr-wrap">
        {/* Topbar */}
        <div className="apr-top">
          <button className="apr-back" onClick={go.home} aria-label="Volver al inicio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            <span>Inicio</span>
          </button>
        </div>

        {/* Encabezado */}
        <div className="apr-head">
          <h1 className="apr-h1">Aprendé a protegerte</h1>
          <p className="apr-p">Tocá cada tarjeta para abrirla y aprender a reconocer cada engaño.</p>
        </div>

        {/* Cards desplegables */}
        <div className="apr-list">
          {TOPICS.map((t, i) => {
            const isOpen = open === i
            return (
              <motion.div key={i} className="apr-card" style={{ borderColor: isOpen ? `${t.color}66` : `${t.color}33`, background: `linear-gradient(160deg, ${t.color}22, ${t.color}0d), #0f1e38` }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05, duration: .35 }}>
                <button className="apr-hd" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span className="apr-chip" style={{ background: `${t.color}22`, border: `1px solid ${t.color}40` }}><Ic path={t.ic} color={t.color} /></span>
                  <span className="apr-txt">
                    <span className="apr-tt">{t.title}</span>
                    <span className="apr-ts">{t.sub}</span>
                  </span>
                  <motion.span className="apr-chev" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: .25 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [.4, 0, .2, 1] }} style={{ overflow: 'hidden' }}>
                      <div className="apr-content">
                        <p className="apr-body">{t.body}</p>
                        <div className="apr-sec" style={{ color: t.color }}>Cómo reconocerlo</div>
                        <ul className="apr-signs">
                          {t.signs.map((s, j) => (
                            <li key={j}><span className="apr-dot" style={{ background: t.color }} />{s}</li>
                          ))}
                        </ul>
                        <div className="apr-do" style={{ background: `${t.color}14`, border: `1px solid ${t.color}33` }}>
                          <span className="apr-doic" style={{ background: `${t.color}26` }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          </span>
                          <span><b style={{ color: t.color }}>Qué hacer: </b>{t.action}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Cierre */}
        <div className="apr-foot">
          <div className="apr-foottt">La regla de oro</div>
          <div className="apr-foottx">Frená, no te apures y verificá por un canal oficial. El apuro es el arma del estafador.</div>
        </div>
      </div>
    </div>
  )
}

function Style() {
  return (
    <style>{`
    .apr-root{position:relative;min-height:100dvh;background:linear-gradient(170deg,#060c1a 0%,#071626 50%,#060c1a 100%);color:#f0f6ff;font-family:'Nunito',sans-serif;overflow-x:hidden}
    .apr-particles{position:fixed;inset:0;z-index:0;opacity:.8;pointer-events:none}
    .apr-wrap{position:relative;z-index:1;width:100%;max-width:480px;margin:0 auto;padding:max(env(safe-area-inset-top),14px) 16px max(env(safe-area-inset-bottom),28px)}

    .apr-top{display:flex;margin-bottom:14px}
    .apr-back{display:flex;align-items:center;gap:5px;height:40px;padding:0 15px 0 11px;border-radius:12px;background:rgba(0,200,255,.1);border:1px solid rgba(0,200,255,.32);color:#00c8ff;font-family:inherit;font-weight:800;font-size:15px;cursor:pointer}
    .apr-back:active{transform:scale(.97)}

    .apr-head{margin-bottom:16px;padding:0 2px}
    .apr-h1{font-size:1.7rem;font-weight:900;letter-spacing:-.5px;line-height:1.15;margin:0 0 6px}
    .apr-p{font-size:.95rem;color:rgba(255,255,255,.7);line-height:1.45;margin:0}

    .apr-list{display:flex;flex-direction:column;gap:11px}
    .apr-card{border:1.5px solid;border-radius:20px;overflow:hidden;box-shadow:0 6px 22px rgba(0,0,0,.25)}
    .apr-hd{display:flex;align-items:center;gap:13px;width:100%;padding:15px 14px;background:transparent;border:none;cursor:pointer;text-align:left;font-family:inherit;color:inherit}
    .apr-chip{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;flex:none}
    .apr-txt{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
    .apr-tt{font-size:1.08rem;font-weight:800;line-height:1.2}
    .apr-ts{font-size:.82rem;color:rgba(255,255,255,.5);font-weight:600}
    .apr-chev{flex:none;display:flex;align-items:center;justify-content:center}

    .apr-content{padding:0 15px 16px}
    .apr-body{font-size:.97rem;line-height:1.55;color:#d4e2f5;margin:2px 0 14px}
    .apr-sec{font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}
    .apr-signs{list-style:none;margin:0 0 14px;padding:0;display:flex;flex-direction:column;gap:8px}
    .apr-signs li{display:flex;align-items:flex-start;gap:10px;font-size:.94rem;line-height:1.4;color:#c2d2ea}
    .apr-dot{width:7px;height:7px;border-radius:50%;flex:none;margin-top:7px}
    .apr-do{display:flex;align-items:flex-start;gap:11px;padding:13px;border-radius:14px;font-size:.94rem;line-height:1.5;color:#dfeafa}
    .apr-doic{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px}

    .apr-foot{margin-top:18px;text-align:center;padding:16px;border-radius:18px;background:rgba(0,229,160,.07);border:1px solid rgba(0,229,160,.25)}
    .apr-foottt{font-size:.74rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#00e5a0;margin-bottom:6px}
    .apr-foottx{font-size:.95rem;line-height:1.5;color:#d4e2f5}

    @media (prefers-reduced-motion: reduce){*{animation:none!important}}
    `}</style>
  )
}
