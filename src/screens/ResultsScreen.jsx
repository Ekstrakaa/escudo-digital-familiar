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
    const dots = Array.from({ length: 72 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 2.8 + 1.0, a: Math.random() * 0.55 + 0.20,
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
        if (dist < 95) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 100%, 65%, ${0.12 * (1 - dist / 95)})`; ctx.stroke()
        }
      }))
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ── Teléfonos y protocolos (todos detrás del botón) ── */
const IM_ROWS = [
  { lbl:'WhatsApp IM', val:'099 019 500', hrs:'Escribí la palabra "mayores"', href:'https://wa.me/59899019500', ic:'msg' },
  { lbl:'Teléfono IM', val:'1950 5555', hrs:'L-V 8–19 · Sáb 8–14', href:'tel:19505555', ic:'phone' },
]
const AUX_ROWS = [
  { lbl:'Policía (emergencia)', val:'911', href:'tel:911', ic:'alert' },
  { lbl:'BROU — bloquear tarjeta', val:'1722 0001', href:'tel:17220001', ic:'card' },
  { lbl:'CERTuy — incidentes', val:'1719', href:'tel:1719', ic:'shield' },
  { lbl:'Ministerio del Interior', val:'0800 5050', href:'tel:08005050', ic:'phone' },
  { lbl:'Denuncias online', val:'denuncias.minterior.gub.uy', href:'https://denuncias.minterior.gub.uy', ic:'globe' },
]
const PATHS = {
  back:'<path d="M15 18l-6-6 6-6"/>', share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.12.96.32 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/>',
  msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  alert:'<path d="M12 2 2 20h20Z"/><path d="M12 9v5M12 17h.01"/>', card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  shield:'<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z"/>', globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
  chevR:'<path d="M9 6l6 6-6 6"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>', help:'<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 1 1 3 2.4c-.8.3-1.5 1-1.5 2"/><path d="M12 17h.01"/>',
}
const I = (n, c='currentColor', s=18, w=2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${PATHS[n]}</svg>`

export default function ResultsScreen({ go, result }) {
  const [modal, setModal] = useState(false)
  const { pct = 0, hits = 0, total = 10, score = 0 } = result || {}

  useEffect(() => {
    const h = document.documentElement.style.overflow, b = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = h; document.body.style.overflow = b }
  }, [])

  let col, col2, lbl, desc
  if (pct >= 80) { col = '#00e5a0'; col2 = '#34f5c0'; lbl = 'BLINDADO'; desc = 'Excelente dominio sobre estafas. Compartí el test con tu familia para protegerlos también.' }
  else if (pct >= 50) { col = '#ffc844'; col2 = '#ffd97a'; lbl = 'EN PROCESO'; desc = 'Vas bien, pero hay puntos ciegos. Repasá los feedbacks y volvé a probar.' }
  else { col = '#ff3d5a'; col2 = '#ff7a8f'; lbl = 'VULNERABLE'; desc = 'Tu nivel de blindaje es bajo. Activá el doble factor en tus cuentas y guardá los teléfonos de ayuda.' }

  const C = 527.79
  const share = () => { if (navigator.share) navigator.share({ title: 'Escudo Digital Familiar', text: 'Hacé el test de blindaje digital y protegete de estafas.', url: window.location.href }) }

  const Row = ({ r }) => (
    <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="res-row">
      <span className="res-rowic" dangerouslySetInnerHTML={{ __html: I(r.ic, '#ff6a52', 17) }} />
      <span className="res-rowtx"><b>{r.lbl}</b><em>{r.val}{r.hrs ? ` · ${r.hrs}` : ''}</em></span>
      <span className="res-rowch" dangerouslySetInnerHTML={{ __html: I('chevR', '#4a6080', 16) }} />
    </a>
  )

  return (
    <div className="res-root">
      <Style />
      <div className="res-particles"><Particles /></div>

      <div className="res-app">
        {/* Topbar */}
        <div className="res-top">
          <button className="res-iconbtn" onClick={go.home} aria-label="Volver al inicio" dangerouslySetInnerHTML={{ __html: I('back', '#00c8ff', 18, 2.4) }} />
          <div className="res-ttl"><b>Tus Resultados</b><span>Test de Blindaje Digital</span></div>
          <button className="res-iconbtn" onClick={share} aria-label="Compartir" dangerouslySetInnerHTML={{ __html: I('share', '#8fa8cc', 17) }} />
        </div>

        {/* Cuerpo */}
        <div className="res-body">
          <div className="res-ringwrap">
            <svg width="158" height="158" viewBox="0 0 200 200">
              <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={col2} /><stop offset="100%" stopColor={col} /></linearGradient></defs>
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="14" />
              <motion.circle cx="100" cy="100" r="84" fill="none" stroke="url(#rg)" strokeWidth="14" strokeLinecap="round"
                transform="rotate(-90 100 100)" strokeDasharray={C} initial={{ strokeDashoffset: C }}
                animate={{ strokeDashoffset: C - C * pct / 100 }} transition={{ duration: 1.3, ease: [.4,0,.2,1], delay: .2 }}
                style={{ filter: `drop-shadow(0 0 6px ${col}aa)` }} />
            </svg>
            <div className="res-ringtx">
              <motion.span className="res-pct" style={{ color: col }} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .5, type: 'spring', stiffness: 200 }}>{pct}%</motion.span>
              <span className="res-lbl" style={{ color: col }}>{lbl}</span>
            </div>
          </div>

          <div className="res-sub">Acertaste <b>{hits}</b> de <b>{total}</b> situaciones</div>

          <div className="res-stats">
            <div className="res-stat" style={{ borderColor: '#00e5a033' }}><div className="res-sv" style={{ color: '#00e5a0' }}>{hits}</div><div className="res-sl">Correctas</div></div>
            <div className="res-stat" style={{ borderColor: '#ff3d5a33' }}><div className="res-sv" style={{ color: '#ff3d5a' }}>{total - hits}</div><div className="res-sl">Incorrectas</div></div>
            <div className="res-stat" style={{ borderColor: '#ffc84433' }}><div className="res-sv" style={{ color: '#ffc844' }}>{score}</div><div className="res-sl">Puntos</div></div>
          </div>

          <div className="res-advice" style={{ background: `${col}10`, border: `1px solid ${col}30` }}>
            <span className="res-advic" dangerouslySetInnerHTML={{ __html: I('shield', col, 19) }} />
            <span style={{ color: '#aebfd8' }}>{desc}</span>
          </div>
        </div>

        {/* Acciones (siempre visibles) */}
        <div className="res-actions">
          <button className="res-cta" onClick={() => setModal(true)}>
            <span dangerouslySetInnerHTML={{ __html: I('phone', '#04231a', 17, 2.4) }} />
            Teléfonos y qué hacer
          </button>
          <div className="res-actrow">
            <button className="res-ghost" onClick={go.home}>Volver al inicio</button>
            <button className="res-ghost" onClick={go.quiz}>Repetir test</button>
          </div>
        </div>
      </div>

      {/* Modal de teléfonos / protocolos */}
      <AnimatePresence>
        {modal && (
          <motion.div className="res-ovbg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(false)}>
            <motion.div className="res-sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} onClick={e => e.stopPropagation()}>
              <div className="res-handle" />
              <div className="res-sheethead">
                <div><div className="res-sheettl">Teléfonos útiles y qué hacer</div><div className="res-sheetsub">Si te estafaron o tenés dudas, comunicate.</div></div>
                <button className="res-iconbtn sm" onClick={() => setModal(false)} aria-label="Cerrar" dangerouslySetInnerHTML={{ __html: I('x', '#8fa8cc', 16, 2.4) }} />
              </div>
              <div className="res-sheetbody">
                <div className="res-sectlbl" style={{ color: '#ff6a52' }}>Intendencia de Montevideo · Personas mayores</div>
                {IM_ROWS.map(r => <Row key={r.lbl} r={r} />)}
                <div className="res-sectlbl" style={{ color: '#ff6a52', marginTop: 14 }}>Emergencias y denuncias</div>
                {AUX_ROWS.map(r => <Row key={r.lbl} r={r} />)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Style() {
  return (
    <style>{`
    .res-root{position:relative;height:100dvh;overflow:hidden;overscroll-behavior:none;background:#050a18;color:#f0f6ff;display:flex;justify-content:center;font-family:'Outfit',sans-serif}
    .res-particles{position:absolute;inset:0;z-index:0;opacity:.85}
    .res-app{position:relative;z-index:1;width:100%;max-width:430px;height:100dvh;display:flex;flex-direction:column;overflow:hidden;padding:max(env(safe-area-inset-top),12px) 16px max(env(safe-area-inset-bottom),14px)}

    .res-top{display:flex;align-items:center;gap:11px;margin-bottom:8px;flex:none}
    .res-iconbtn{width:38px;height:38px;border-radius:11px;background:#142040;border:1px solid rgba(0,200,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none}
    .res-iconbtn.sm{width:32px;height:32px;border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.05)}
    .res-ttl{flex:1;min-width:0}
    .res-ttl b{display:block;font-family:'Sora','Outfit',sans-serif;font-size:16px;font-weight:600}
    .res-ttl span{font-size:11.5px;color:#4a6080}

    .res-body{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:4px 0}
    .res-ringwrap{position:relative;width:158px;height:158px;flex:none}
    .res-ringtx{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .res-pct{font-family:'Sora',sans-serif;font-size:44px;font-weight:800;line-height:1;letter-spacing:-.02em}
    .res-lbl{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;margin-top:6px}
    .res-sub{font-size:14px;color:#8fa8cc} .res-sub b{color:#f0f6ff;font-weight:700}

    .res-stats{display:flex;gap:9px;width:100%;max-width:340px}
    .res-stat{flex:1;border-radius:15px;padding:13px 6px;text-align:center;background:rgba(20,32,64,.5);border:1px solid}
    .res-sv{font-family:'Sora',sans-serif;font-size:26px;font-weight:800;line-height:1}
    .res-sl{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:#4a6080;text-transform:uppercase;letter-spacing:.06em;margin-top:6px}

    .res-advice{display:flex;align-items:flex-start;gap:11px;padding:14px;border-radius:16px;max-width:360px;font-size:14px;line-height:1.55}
    .res-advic{flex:none;margin-top:1px}

    .res-actions{flex:none;display:flex;flex-direction:column;gap:9px;padding-top:12px}
    .res-cta{height:54px;border:none;border-radius:15px;background:linear-gradient(135deg,#00c8ff,#00e5a0);color:#04231a;font-family:'Sora',sans-serif;font-weight:700;font-size:15.5px;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;box-shadow:0 10px 26px rgba(0,200,200,.3)}
    .res-cta:active{transform:scale(.99)}
    .res-actrow{display:flex;gap:9px}
    .res-ghost{flex:1;height:48px;border-radius:13px;background:rgba(255,255,255,.04);border:1.5px solid rgba(0,200,255,.18);color:#cdddf5;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer}
    .res-ghost:active{transform:scale(.98)}

    .res-ovbg{position:fixed;inset:0;z-index:80;display:flex;align-items:flex-end;justify-content:center;background:rgba(4,8,16,.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
    .res-sheet{width:100%;max-width:440px;max-height:82dvh;display:flex;flex-direction:column;background:#0c1730;border:1px solid rgba(255,255,255,.1);border-radius:24px 24px 0 0;padding:10px 16px max(env(safe-area-inset-bottom),18px);box-shadow:0 -20px 60px rgba(0,0,0,.5)}
    .res-handle{width:40px;height:4px;border-radius:99px;background:rgba(255,255,255,.18);margin:4px auto 12px;flex:none}
    .res-sheethead{display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;flex:none}
    .res-sheettl{font-family:'Sora',sans-serif;font-size:17px;font-weight:700}
    .res-sheetsub{font-size:12.5px;color:#8fa8cc;margin-top:2px}
    .res-sheetbody{overflow-y:auto;display:flex;flex-direction:column;gap:8px}
    .res-sectlbl{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px}
    .res-row{display:flex;align-items:center;gap:11px;padding:12px;border-radius:13px;background:rgba(255,106,82,.06);border:1px solid rgba(255,106,82,.2);text-decoration:none}
    .res-row:active{transform:scale(.99)}
    .res-rowic{width:34px;height:34px;border-radius:10px;background:rgba(255,106,82,.12);border:1px solid rgba(255,106,82,.22);display:flex;align-items:center;justify-content:center;flex:none}
    .res-rowtx{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
    .res-rowtx b{font-size:14.5px;font-weight:600;color:#f0f6ff}
    .res-rowtx em{font-style:normal;font-size:12px;color:#8fa8cc}
    .res-rowch{flex:none}
    @media (prefers-reduced-motion: reduce){*{animation:none!important}}
    `}</style>
  )
}
