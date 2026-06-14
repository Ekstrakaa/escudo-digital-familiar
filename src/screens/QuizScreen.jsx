import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Partículas de fondo (idénticas al resto de la app) ── */
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
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
          const midHue = (a.hue + b.hue) / 2
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `hsla(${midHue}, 100%, 65%, ${0.12 * (1 - dist / 95)})`; ctx.stroke()
        }
      }))
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ── Íconos ── */
const PATHS = {
  shield: <><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z" /><path d="M9 12l2 2 4-4" /></>,
  door:   <><path d="M3 21h18" /><path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" /><path d="M13 12h.5" /></>,
  msg:    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  bulb:   <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5a7 7 0 0 0-4-12z" /></>,
  help:   <><circle cx="12" cy="12" r="10" /><path d="M9.5 9a2.5 2.5 0 1 1 3 2.4c-.8.3-1.5 1-1.5 2" /><path d="M12 17h.01" /></>,
  phone:  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.12.96.32 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  alert:  <><path d="M12 2 2 20h20Z" /><path d="M12 9v5M12 17h.01" /></>,
  check:  <path d="M20 6 9 17l-5-5" />,
  x:      <path d="M18 6 6 18M6 6l12 12" />,
  arrow:  <path d="M5 12h14M12 5l7 7-7 7" />,
  user:   <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  flame:  <><path d="M12 2c1 4 4 5 4 9a4 4 0 0 1-8 0c0-1 .5-2 1-3" /><path d="M12 22a6 6 0 0 0 6-6c0-3-2-4-3-6-2 3-3 3-5 4" /></>,
  lock:   <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
}
function Ic({ n, s = 22, c = 'currentColor', w = 2 }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{PATHS[n]}</svg>
}
const hexa = (h, a) => { h = h.replace('#',''); return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})` }

/* ── Banco de preguntas (mezcla mcq / tf / real + descansos con fotos reales) ── */
const FLOW = [
  { t:'mcq', ic:'door', col:'#00c8ff', tag:'En la puerta', sub:'Situación cara a cara',
    q:'Un señor con credencial del BROU toca tu puerta y te pide la <b>tarjeta y la clave</b>. ¿Qué hacés?',
    opts:['Le doy la tarjeta y la clave','Cierro y llamo yo al BROU (1722 0001)','Le doy la tarjeta, la clave no','Lo hago pasar y llamamos juntos'], ok:1,
    okT:'¡Correcto!', okD:'El banco nunca manda gente a tu casa. Verificá vos al 1722 0001.', noT:'Ojo con esto', noD:'Ningún banco manda empleados a tu puerta. Cerrá y llamá vos.' },

  { t:'tf', ic:'help', col:'#8b7cf8', tag:'Verdadero o Falso',
    statement:'El BROU <b style="color:#00e5a0">nunca</b> te pide la clave ni el código que llega por SMS.', ans:'v',
    okT:'¡Tal cual!', okD:'Ese código del SMS es la llave para entrar a tu cuenta. El banco ya tiene tus datos: nunca te lo pide. Si alguien te lo pide (por SMS, llamada o WhatsApp), es para robarte. No lo des nunca y cortá.', noT:'Era verdadero', noD:'El banco nunca pide la clave ni el código del SMS: ese código es la llave de tu cuenta. Si alguien te lo pide, es un estafador. No lo compartas con nadie y verificá llamando vos al 1722 0001.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'SUCIVE', sub:'remitente: SMS', img:'/imgs/sucive_real.png',
    text:'SUCIVE: Multa vencida. Si no pagás hoy aumenta. Ingresá: <span style="color:#7ab8ff;text-decoration:underline">asucive.cc/uy/multa</span>', ans:'estafa',
    okT:'¡Exacto!', okD:'Los sitios del Estado terminan en .gub.uy. Ese ".cc" es trucho.', noT:'Es estafa', noD:'SUCIVE no manda links por SMS. El real es sucive.gub.uy.' },

  { t:'fact', ic:'bulb', col:'#00e5a0', img:'/imgs/telenoche_millon.png',
    text:'<b>Caso real (Telenoche).</b> Una familia perdió más de <b>un millón de pesos</b>: se hicieron pasar por policías. La Policía nunca pide dinero.' },

  { t:'tf', ic:'help', col:'#8b7cf8', tag:'Verdadero o Falso', img:'/imgs/brou_ancap.png', fit:'contain',
    statement:'Te llega esta promo del <b>BROU + ANCAP</b> con 35% de descuento en combustibles. <b>¿Es de verdad?</b>', ans:'f',
    okT:'¡Bien!', okD:'Es falso. La página "Beneficios Ebank" no es del BROU. El banco no regala descuentos así por redes; los reales salen en brou.com.uy.', noT:'Es falso', noD:'Es trucha: se hace pasar por el BROU + ANCAP. Los beneficios reales salen en brou.com.uy, no en una página rara.' },

  { t:'mcq', ic:'phone', col:'#00c8ff', tag:'La llamada', sub:'Te llaman de la nada',
    q:'Te llaman de una "empresa de premios": para cobrar, necesitan el número y el <b>código de seguridad</b> de tu tarjeta. ¿Qué hacés?',
    opts:['Le doy los datos, ¡gané!','Le doy el número, el código no','Cuelgo: no participé y nadie pide datos así','Le pido que me llame más tarde'], ok:2,
    okT:'¡Perfecto!', okD:'Si no participaste, no ganaste. El código no se da por teléfono jamás.', noT:'Cuidado', noD:'Ningún premio real pide los datos de tu tarjeta. Cortá tranquila.' },

  { t:'tf', ic:'lock', col:'#8b7cf8', tag:'Verdadero o Falso', img:'/imgs/A2F.png', fit:'contain',
    statement:'Estas apps de <b style="color:#00e5a0">doble factor</b> (un segundo paso al entrar) son seguras y conviene usarlas.', ans:'v',
    okT:'¡Correcto!', okD:'Son el "doble factor" (A2F): suman una segunda llave y hacen tu cuenta mucho más difícil de robar. No son virus.', noT:'En realidad, sí', noD:'No son virus: son apps de seguridad. El segundo paso te protege aunque te roben la contraseña.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'+598 91 234 567', sub:'número desconocido',
    text:'Hola abu, soy Marti. Cambié de número. Perdí la tarjeta, ¿me hacés un giro de <b style="color:#ffd9a0">$8.000</b> por Abitab? No le digas a nadie.', ans:'estafa',
    okT:'¡Bien visto!', okD:'Clásico del "cambié de número". Tu nieto no te pide plata en secreto.', noT:'Era estafa', noD:'"Cambié de número + giro urgente + no le digas" es el cuento del tío.' },

  { t:'fact', ic:'bulb', col:'#00e5a0', img:'/imgs/canal4_hombre.png',
    text:'<b>Caso real (Canal 4).</b> Un hombre de 90 años perdió <b>$46.000</b> con el cuento del tío: se hicieron pasar por su nieto.' },

  { t:'mcq', ic:'search', col:'#00c8ff', tag:'Detectá la pista', sub:'¿Qué lo delata?',
    q:'Te llega un email de la "DGI" avisando que tenés una <b>devolución de impuestos</b> y te pide tus datos. ¿Qué lo delata como falso?',
    opts:['Nada, parece oficial','El remitente no termina en .gub.uy','Que hable de impuestos','Que tenga el logo de DGI'], ok:1,
    okT:'¡Ojo de detective!', okD:'Los organismos del Estado usan .gub.uy. Si el remitente es @gmail o un .com raro, es trucho.', noT:'La pista es el remitente', noD:'La DGI nunca escribe desde un @gmail. Mirá el dominio, no el logo.' },

  { t:'tf', ic:'help', col:'#8b7cf8', tag:'Verdadero o Falso', img:'/imgs/correo_uy.png', fit:'contain',
    statement:'Te llega este correo del "Correo Uruguayo" para pagar un envío. <b>¿Es de verdad?</b>', ans:'f',
    okT:'¡Bien!', okD:'Es falso (phishing): copian el diseño, pero el Correo no cobra envíos por mail. Fijate que el dominio no sea .gub.uy.', noT:'Es falso', noD:'Es phishing: copian el logo. El remitente no es del Correo. Nunca pagues desde un link así.' },

  { t:'mcq', ic:'lock', col:'#00c8ff', tag:'Tu contraseña', sub:'¿Cuál es la más fuerte?',
    q:'¿Cuál de estas contraseñas es la <b>más segura</b>?',
    opts:['123456','Maria1955','MiGataTomaMate!7','uruguay'], ok:2,
    okT:'¡Exacto!', okD:'Las más seguras son largas, tipo frase, con mayúsculas, números y algún símbolo. Cuanto más larga, mejor.', noT:'Ojo con eso', noD:'La más segura es la frase larga: "MiGataTomaMate!7". Evitá nombres, fechas o palabras sueltas: se adivinan fácil.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'Antel', sub:'remitente: SMS', img:'/imgs/antel_real.png',
    text:'ANTEL: tenés una deuda y te vamos a cortar el servicio hoy. Para evitarlo, confirmá tu PIN respondiendo este mensaje.', ans:'estafa',
    okT:'¡Tal cual!', okD:'El PIN no se comparte con nadie. Antel no pide datos por SMS. Consultá vos al *611.', noT:'Es estafa', noD:'El PIN no se dice nunca. Antel no pide datos por SMS para "no cortarte".' },

  { t:'fact', ic:'bulb', col:'#00e5a0', img:'/imgs/manosdigital.png',
    text:'La Intendencia de Montevideo tiene <b>talleres digitales gratis</b> para personas mayores: aprendé a usar el celular y reconocer estafas. ☎ 1950 5555.' },

  { t:'mcq', ic:'shield', col:'#00c8ff', tag:'La regla de oro', sub:'La mejor defensa',
    q:'En una frase, ¿cuál es la mejor defensa contra casi todas las estafas?',
    opts:['Tener una clave bien larga','Frenar, no apurarme y verificar por un canal oficial','No usar nunca el celular','Contestar siempre para no quedar mal'], ok:1,
    okT:'¡Esa es!', okD:'El apuro es el arma del estafador. Frenar y verificar te salva casi siempre.', noT:'La clave es frenar', noD:'Ninguna estafa resiste a que cortes y verifiques vos por un canal oficial.' },
]

const TOTAL_Q = FLOW.filter(s => s.t !== 'fact').length

export default function QuizScreen({ go }) {
  const [idx, setIdx]       = useState(0)
  const [score, setScore]   = useState(0)
  const [hits, setHits]     = useState(0)
  const [streak, setStreak] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen] = useState(null)
  const [win, setWin]       = useState(false)
  const [overlay, setOverlay] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    const h = document.documentElement.style.overflow, b = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = h; document.body.style.overflow = b }
  }, [])

  const step  = FLOW[idx]
  const qNum  = FLOW.slice(0, idx + 1).filter(s => s.t !== 'fact').length
  const pct   = Math.round(((idx + 1) / FLOW.length) * 100)

  const confetti = useMemo(() => {
    const cols = ['#00e5a0', '#00c8ff', '#ffc844', '#ffffff', '#8b7cf8']
    return Array.from({ length: 14 }).map((_, i) => {
      const ang = (Math.PI * 2 * i) / 14 + Math.random() * 0.5
      const dist = 46 + Math.random() * 72
      const x = Math.cos(ang) * dist, y = Math.sin(ang) * dist + 28
      const sz = 7 + Math.round(Math.random() * 4)
      return <span key={i} className="bqx-conf" style={{ '--x': `${x.toFixed(0)}px`, '--y': `${y.toFixed(0)}px`, '--r': `${(Math.random() * 520 - 260).toFixed(0)}deg`, '--dl': `${(Math.random() * 0.12).toFixed(2)}s`, width: sz, height: sz, background: cols[i % cols.length] }} />
    })
  }, [idx])

  const finish = (sc, ht) => go.results({ pct: Math.round((ht / TOTAL_Q) * 100), hits: ht, total: TOTAL_Q, score: sc })

  const goNext = (sc, ht) => {
    setOverlay(false)
    if (idx + 1 >= FLOW.length) finish(sc, ht)
    else { setIdx(idx + 1); setAnswered(false); setChosen(null) }
  }

  const answer = (pick, correct) => {
    if (answered) return
    const ns = score + (correct ? 100 : 0), nh = hits + (correct ? 1 : 0)
    setChosen(pick); setWin(correct); setAnswered(true)
    setScore(ns); setHits(nh); setStreak(correct ? streak + 1 : 0)
    setOverlay(true)
    timer.current = setTimeout(() => goNext(ns, nh), 4500)
  }

  const seguir = () => { if (idx + 1 >= FLOW.length) finish(score, hits); else { setIdx(idx + 1); setAnswered(false); setChosen(null) } }

  const accent = <div className="bqx-accent" style={{ background:`linear-gradient(90deg, ${step.col}, ${hexa(step.col,.15)} 60%, transparent)` }} />
  const ctxHead = (
    <div className="bqx-ctx">
      <div className="bqx-ctxic" style={{ background:`linear-gradient(145deg, ${hexa(step.col,.20)}, ${hexa(step.col,.05)})`, border:`1px solid ${hexa(step.col,.36)}`, boxShadow:`0 6px 18px ${hexa(step.col,.16)}` }}><Ic n={step.ic} s={24} c={step.col} /></div>
      <div className="bqx-ctxlbl"><b style={{ color:step.col }}>{step.tag}</b>{step.sub && <span>{step.sub}</span>}</div>
    </div>
  )

  return (
    <div className="bqx-root">
      <Styles />
      <div className="bqx-particles"><Particles /></div>

      <div className="bqx-app">
        {/* Header */}
        <div className="bqx-head">
          <div className="bqx-htop">
            <button className="bqx-back" onClick={go.home} aria-label="Salir del test">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              <span>Salir</span>
            </button>
            <div className="bqx-hname">Blindaje Digital</div>
            {streak >= 2 && <div className="bqx-streak"><Ic n="flame" s={13} c="#ffc844" /><span>x{streak}</span></div>}
            <div className="bqx-score">{score}</div>
          </div>
          <div className="bqx-hbar"><i style={{ width:`${pct}%` }} /></div>
          <div className="bqx-hcount">{step.t === 'fact' ? 'Un respiro' : `Pregunta ${qNum} / ${TOTAL_Q}`}</div>
        </div>

        {/* Stage */}
        <div className="bqx-stage">
          <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity:0, y:14, scale:.99 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-12, scale:.99 }} transition={{ duration:.32, ease:[.4,0,.2,1] }} className="bqx-cardwrap">

            {step.t === 'mcq' && (
              <div className="bqx-card">{accent}{ctxHead}
                <div className="bqx-q" dangerouslySetInnerHTML={{ __html: step.q }} />
                <div className="bqx-opts">
                  {step.opts.map((o, j) => {
                    let cls = 'bqx-opt'
                    if (answered) { if (j === step.ok) cls += ' win'; else { cls += ' mute'; if (j === chosen) cls += ' lose' } }
                    return <button key={j} className={cls} style={{ '--i': j }} disabled={answered} onClick={() => answer(j, j === step.ok)}><div className="bqx-lt">{'ABCD'[j]}</div><span>{o}</span></button>
                  })}
                </div>
              </div>
            )}

            {step.t === 'tf' && (
              <div className="bqx-card">{accent}{ctxHead}
                {step.img
                  ? (<>
                      <img className={`bqx-tfimg${step.fit === 'contain' ? ' contain' : ''}`} src={step.img} alt="Ejemplo" />
                      <div className="bqx-tfq" dangerouslySetInnerHTML={{ __html: step.statement }} />
                    </>)
                  : <div className="bqx-statement" dangerouslySetInnerHTML={{ __html: step.statement }} />}
                <div className="bqx-answers">
                  <Binary v="v" ok={step.ans} chosen={chosen} answered={answered} cls="green" icon="check" c="#00e5a0" label="Verdadero" idx={0} onPick={answer} />
                  <Binary v="f" ok={step.ans} chosen={chosen} answered={answered} cls="red" icon="x" c="#ff3d5a" label="Falso" idx={1} onPick={answer} />
                </div>
              </div>
            )}

            {step.t === 'real' && (
              <div className="bqx-card">{accent}{ctxHead}
                <div className="bqx-prompt">¿Qué hacés con este mensaje?</div>
                <div className="bqx-msg">
                  <div className="bqx-msgtop">
                    <div className="bqx-av"><Ic n="user" s={17} c="#cdd9f0" /></div>
                    <div><div className="bqx-nm">{step.sender}</div><div className="bqx-sub">{step.sub}</div></div>
                    <span className="bqx-chip">SMS</span>
                  </div>
                  <div className="bqx-bubble" dangerouslySetInnerHTML={{ __html: step.text }} />
                </div>
                {step.img && <div className="bqx-rcap">Ejemplo real</div>}
                {step.img && <img className="bqx-rphoto" src={step.img} alt="Ejemplo real" />}
                <div className="bqx-answers">
                  <Binary v="estafa" ok={step.ans} chosen={chosen} answered={answered} cls="red" icon="alert" c="#ff3d5a" label="Es estafa" idx={0} onPick={answer} />
                  <Binary v="real" ok={step.ans} chosen={chosen} answered={answered} cls="green" icon="check" c="#00e5a0" label="Es de verdad" idx={1} onPick={answer} />
                </div>
              </div>
            )}

            {step.t === 'fact' && (
              <div className="bqx-card bqx-fact">{accent}{ctxHead}
                <img className={`bqx-factimg${step.fit === 'contain' ? ' contain' : ''}`} src={step.img} alt="Caso real" />
                <div className="bqx-facttext" dangerouslySetInnerHTML={{ __html: step.text }} />
                <button className="bqx-seguir" onClick={seguir}>Seguir <Ic n="arrow" s={16} c="#04231a" w={2.5} /></button>
              </div>
            )}

          </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Feedback automático */}
      {overlay && (
        <div className={`bqx-ov ${win ? 'ok' : 'no'}`}>
          <div className="bqx-ovaura" />
          <div className={`bqx-ovcard ${win ? 'ok' : 'no'}`}>
            <div className="bqx-ovic">
              <span className="bqx-ring r1" /><span className="bqx-ring r2" />
              <svg className="bqx-drawic" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={win ? '#00e5a0' : '#ff3d5a'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                {win
                  ? <path className="bqx-draw" d="M20 6 9 17l-5-5" />
                  : <><path className="bqx-draw" d="M18 6 6 18" /><path className="bqx-draw d2" d="M6 6l12 12" /></>}
              </svg>
            </div>
            {win && <div className="bqx-confetti">{confetti}</div>}
            <div className="bqx-ovt">{win ? step.okT : step.noT}</div>
            <div className="bqx-ovd">{win ? step.okD : step.noD}</div>
            <div className="bqx-nl">Siguiente pregunta</div>
            <div className="bqx-auto"><i /></div>
          </div>
        </div>
      )}
    </div>
  )
}

function Binary({ v, ok, chosen, answered, cls, icon, c, label, idx, onPick }) {
  let k = `bqx-ans ${cls}`
  if (answered) { if (v === ok) k += ' win'; else { k += ' mute'; if (v === chosen) k += ' lose' } }
  return <button className={k} style={{ '--i': idx }} disabled={answered} onClick={() => onPick(v, v === ok)}><Ic n={icon} s={icon==='alert'?20:22} c={c} /><span>{label}</span></button>
}

function Styles() {
  return (
    <style>{`
    .bqx-root{position:relative;height:100dvh;overflow:hidden;overscroll-behavior:none;background:#050a18;color:#f0f6ff;display:flex;justify-content:center;font-family:'Outfit',sans-serif}
    .bqx-particles{position:absolute;inset:0;z-index:0;opacity:.85}
    .bqx-app{position:relative;z-index:1;width:100%;max-width:430px;height:100dvh;display:flex;flex-direction:column;overflow:hidden;padding:max(env(safe-area-inset-top),12px) 16px max(env(safe-area-inset-bottom),14px)}

    .bqx-head{flex:none}
    .bqx-htop{display:flex;align-items:center;gap:9px;margin-bottom:11px}
    .bqx-back{display:flex;align-items:center;gap:4px;height:38px;padding:0 13px 0 9px;border-radius:11px;background:rgba(0,200,255,.1);border:1px solid rgba(0,200,255,.32);color:#00c8ff;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer;flex:none}
    .bqx-back:active{transform:scale(.97)}
    .bqx-back span{line-height:1}
    .bqx-hname{font-size:14px;font-weight:600;flex:1;letter-spacing:.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .bqx-streak{display:flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:600;color:#ffc844;padding:3px 8px;border-radius:99px;background:rgba(255,200,68,.10);border:1px solid rgba(255,200,68,.28);animation:bqxpop .3s ease both}
    .bqx-score{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;color:#ffc844}
    .bqx-hbar{height:5px;border-radius:99px;background:#142040;overflow:hidden}
    .bqx-hbar > i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#00c8ff,#00e5a0);box-shadow:0 0 8px rgba(0,229,160,.55);transition:width .5s cubic-bezier(.4,0,.2,1)}
    .bqx-hcount{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#4a6080;margin-top:7px}

    .bqx-stage{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;padding:6px 0}
    .bqx-cardwrap{display:flex;flex-direction:column;max-height:100%;min-height:0}
    .bqx-card{position:relative;background:linear-gradient(180deg,#10203c,#0b1426);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:17px 16px;box-shadow:0 24px 54px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.07);display:flex;flex-direction:column;max-height:100%;overflow:hidden}
    .bqx-card::after{content:'';position:absolute;inset:0;border-radius:20px;padding:1px;background:linear-gradient(150deg,rgba(255,255,255,.18),rgba(255,255,255,.02) 45%,rgba(0,200,255,.12));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
    .bqx-accent{position:absolute;top:0;left:18px;right:18px;height:2px;border-radius:99px;z-index:1;transform-origin:left;animation:bqxaccent .55s cubic-bezier(.4,0,.2,1) both}

    .bqx-ctx{display:flex;align-items:center;gap:11px;margin-bottom:13px;flex:none}
    .bqx-ctxic{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex:none}
    .bqx-ctxlbl{display:flex;flex-direction:column;gap:2px;min-width:0}
    .bqx-ctxlbl b{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
    .bqx-ctxlbl span{font-size:12px;color:#4a6080}
    .bqx-q{font-size:17.5px;line-height:1.45;color:#f0f6ff;font-weight:500;margin-bottom:14px;flex:none}
    .bqx-q b{color:#fff}
    .bqx-statement{font-size:19.5px;line-height:1.45;color:#f0f6ff;font-weight:600;text-align:center;padding:6px 4px 2px}
    .bqx-tfq{font-size:16px;line-height:1.4;color:#f0f6ff;font-weight:500;text-align:center;margin-bottom:4px;flex:none}
    .bqx-tfq b{color:#fff}

    .bqx-opts{display:flex;flex-direction:column;gap:8px}
    .bqx-opt{display:flex;align-items:center;gap:11px;width:100%;text-align:left;padding:13px;border-radius:13px;background:#142040;border:1.5px solid rgba(0,200,255,.10);color:inherit;cursor:pointer;transition:transform .16s, border-color .2s, background .2s;font-family:inherit;animation:bqxin .42s ease both;animation-delay:calc(var(--i,0)*.06s)}
    .bqx-opt:hover{border-color:rgba(0,200,255,.32)}
    .bqx-opt:active{transform:scale(.99)}
    .bqx-lt{width:28px;height:28px;border-radius:7px;background:rgba(0,200,255,.10);border:1px solid rgba(0,200,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:#00c8ff;flex:none;transition:.2s}
    .bqx-opt span{font-size:15px;line-height:1.35}
    .bqx-opt.win{background:rgba(0,229,160,.13);border-color:#00e5a0;animation:bqxwin .55s ease}
    .bqx-opt.win .bqx-lt{background:#00e5a0;color:#04231a;border:none}
    .bqx-opt.lose{background:rgba(255,61,90,.13);border-color:#ff3d5a;animation:bqxshake .42s ease}
    .bqx-opt.lose .bqx-lt{background:#ff3d5a;color:#fff;border:none}
    .bqx-opt.mute{opacity:.34}

    .bqx-answers{display:flex;gap:10px;margin-top:14px;flex:none}
    .bqx-ans{flex:1;min-height:64px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;border:1.5px solid;font-weight:600;font-size:14.5px;transition:transform .16s, box-shadow .2s;color:inherit;background:transparent;font-family:inherit;animation:bqxin .42s ease both;animation-delay:calc(var(--i,0)*.08s)}
    .bqx-ans:active{transform:scale(.98)}
    .bqx-ans.green{border-color:rgba(0,229,160,.5);color:#7ff0c8;background:rgba(0,229,160,.06)}
    .bqx-ans.red{border-color:rgba(255,61,90,.5);color:#ff8fa0;background:rgba(255,61,90,.06)}
    .bqx-ans.win{box-shadow:0 0 0 2px #00e5a0,0 10px 26px rgba(0,229,160,.26);animation:bqxwin .55s ease}
    .bqx-ans.lose{box-shadow:0 0 0 2px #ff3d5a;animation:bqxshake .42s ease}
    .bqx-ans.mute{opacity:.34}
    .bqx-ans span{font-size:14.5px}

    .bqx-tfimg{width:100%;max-height:30vh;object-fit:cover;border-radius:13px;border:1px solid rgba(255,255,255,.08);margin-bottom:11px;background:#0a1426;flex:none}
    .bqx-tfimg.contain{object-fit:contain;background:#eef2f8;padding:6px}

    .bqx-msg{background:#080f20;border:1px solid rgba(255,255,255,.06);border-radius:13px;padding:12px;margin-bottom:14px;flex:none}
    .bqx-msgtop{display:flex;align-items:center;gap:9px;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,.06)}
    .bqx-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#3a4a78,#2a3358);display:flex;align-items:center;justify-content:center;flex:none}
    .bqx-nm{font-size:13px;font-weight:500}.bqx-sub{font-size:11px;color:#4a6080}
    .bqx-chip{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:#4a6080;border:1px solid rgba(255,255,255,.12);padding:3px 7px;border-radius:6px}
    .bqx-bubble{background:#1b2236;border-radius:11px;padding:11px 12px;font-size:13.5px;line-height:1.5;color:#eaf3ff}
    .bqx-prompt{text-align:center;font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#8fa8cc;margin-bottom:12px;flex:none}
    .bqx-rcap{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:#5a76a0;text-align:center;margin:0 0 5px;flex:none}
    .bqx-rphoto{width:100%;flex:1 1 auto;min-height:0;max-height:21vh;object-fit:contain;border-radius:11px;border:1px solid rgba(255,255,255,.08);background:#eef2f8;padding:5px;margin-bottom:12px}

    .bqx-fact{align-items:stretch}
    .bqx-factimg{width:100%;flex:1;min-height:0;object-fit:cover;border-radius:13px;border:1px solid rgba(255,255,255,.08);margin-bottom:12px;background:#0a1426}
    .bqx-factimg.contain{object-fit:contain;background:#eef2f8;padding:6px}
    .bqx-facttext{font-size:14.5px;line-height:1.5;color:#8fa8cc;text-align:center;margin-bottom:13px;flex:none}
    .bqx-facttext b{color:#f0f6ff}
    .bqx-seguir{height:50px;border:none;border-radius:13px;background:linear-gradient(135deg,#00e5a0,#10b981);color:#04231a;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;flex:none;font-family:inherit;box-shadow:0 10px 24px rgba(0,200,140,.28)}

    .bqx-ov{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:26px;background:rgba(4,8,16,.8);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:bqxfade .25s ease both}
    .bqx-ovaura{position:absolute;inset:0;pointer-events:none;animation:bqxfade .5s ease both}
    .bqx-ov.ok .bqx-ovaura{background:radial-gradient(circle at 50% 42%, rgba(0,229,160,.30), transparent 46%)}
    .bqx-ov.no .bqx-ovaura{background:radial-gradient(circle at 50% 42%, rgba(255,61,90,.26), transparent 46%)}
    .bqx-ovcard{position:relative;width:100%;max-width:322px;border-radius:24px;padding:30px 24px 18px;text-align:center;background:linear-gradient(180deg,#101f3a,#0a1428);overflow:visible}
    .bqx-ovcard.ok{box-shadow:0 24px 70px rgba(0,229,160,.28), inset 0 1px 0 rgba(255,255,255,.08);animation:bqxpopwin .55s cubic-bezier(.2,.9,.3,1.3) both}
    .bqx-ovcard.no{box-shadow:0 24px 70px rgba(255,61,90,.26), inset 0 1px 0 rgba(255,255,255,.08);animation:bqxpoplose .6s ease both}
    .bqx-ovcard::after{content:'';position:absolute;inset:0;border-radius:24px;padding:1.5px;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
    .bqx-ovcard.ok::after{background:linear-gradient(150deg,rgba(0,229,160,.75),rgba(0,229,160,.12) 55%,rgba(0,229,160,.4))}
    .bqx-ovcard.no::after{background:linear-gradient(150deg,rgba(255,61,90,.75),rgba(255,61,90,.12) 55%,rgba(255,61,90,.4))}
    .bqx-ovic{position:relative;width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 15px;animation:bqxiconpop .55s cubic-bezier(.2,.9,.3,1.5) both}
    .bqx-ovcard.ok .bqx-ovic{background:radial-gradient(circle,rgba(0,229,160,.3),rgba(0,229,160,.08))}
    .bqx-ovcard.no .bqx-ovic{background:radial-gradient(circle,rgba(255,61,90,.3),rgba(255,61,90,.08))}
    .bqx-ring{position:absolute;inset:0;border-radius:50%;border:2px solid;opacity:0}
    .bqx-ovcard.ok .bqx-ring{border-color:#00e5a0}
    .bqx-ovcard.no .bqx-ring{border-color:#ff3d5a}
    .bqx-ring.r1{animation:bqxripple 1s ease-out .12s}
    .bqx-ring.r2{animation:bqxripple 1s ease-out .34s}
    .bqx-drawic{position:relative;z-index:1}
    .bqx-draw{stroke-dasharray:32;stroke-dashoffset:32;animation:bqxdraw .45s cubic-bezier(.6,0,.3,1) .18s forwards}
    .bqx-draw.d2{animation-delay:.34s}
    .bqx-confetti{position:absolute;top:62px;left:50%;width:0;height:0;pointer-events:none;z-index:2}
    .bqx-conf{position:absolute;border-radius:2px;opacity:0;animation:bqxconf 1.05s cubic-bezier(.15,.6,.3,1) var(--dl,0s) forwards}
    .bqx-ovt{font-size:22px;font-weight:800;margin-bottom:7px;animation:bqxup .4s ease .22s both}
    .bqx-ovcard.ok .bqx-ovt{color:#7ff0c8} .bqx-ovcard.no .bqx-ovt{color:#ff8fa0}
    .bqx-ovd{font-size:14.5px;line-height:1.55;color:#aebfd8;margin-bottom:18px;animation:bqxup .4s ease .3s both}
    .bqx-nl{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#4a6080;margin-bottom:7px}
    .bqx-auto{height:5px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
    .bqx-auto > i{display:block;height:100%;width:100%;border-radius:99px;background:linear-gradient(90deg,#00c8ff,#00e5a0);box-shadow:0 0 10px rgba(0,229,160,.5);animation:bqxdrain 4.3s linear forwards}
    .bqx-ovcard.no .bqx-auto > i{background:linear-gradient(90deg,#ff3d5a,#ff8aa0);box-shadow:0 0 10px rgba(255,61,90,.5)}

    @keyframes bqxpop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
    @keyframes bqxfade{from{opacity:0}to{opacity:1}}
    @keyframes bqxdrain{from{width:100%}to{width:0%}}
    @keyframes bqxin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bqxwin{0%{transform:scale(1)}40%{transform:scale(1.03)}100%{transform:scale(1)}}
    @keyframes bqxshake{0%,100%{transform:translateX(0)}22%{transform:translateX(-6px)}44%{transform:translateX(6px)}66%{transform:translateX(-4px)}88%{transform:translateX(2px)}}
    @keyframes bqxaccent{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes bqxiconpop{0%{opacity:0;transform:scale(.4)}60%{transform:scale(1.14)}100%{opacity:1;transform:scale(1)}}
    @keyframes bqxring{0%{opacity:.55;transform:scale(.7)}100%{opacity:0;transform:scale(1.3)}}
    @keyframes bqxup{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bqxdraw{to{stroke-dashoffset:0}}
    @keyframes bqxripple{0%{opacity:.5;transform:scale(.75)}100%{opacity:0;transform:scale(1.95)}}
    @keyframes bqxconf{0%{opacity:0;transform:translate(-50%,-50%) scale(.4) rotate(0)}14%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(.85) rotate(var(--r))}}
    @keyframes bqxpopwin{0%{opacity:0;transform:scale(.8)}60%{opacity:1;transform:scale(1.04)}100%{transform:scale(1)}}
    @keyframes bqxpoplose{0%{opacity:0;transform:scale(.85)}38%{opacity:1;transform:scale(1.02) translateX(0)}54%{transform:translateX(-7px)}70%{transform:translateX(6px)}85%{transform:translateX(-3px)}100%{transform:translateX(0) scale(1)}}
    @media (prefers-reduced-motion: reduce){*{animation:none!important}.bqx-hbar>i,.bqx-auto>i{transition:none}}
    `}</style>
  )
}
