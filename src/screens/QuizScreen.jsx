import { useState, useEffect, useRef } from 'react'
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
    okT:'¡Tal cual!', okD:'El banco jamás pide eso. Quien te lo pida, es chorro.', noT:'Era verdadero', noD:'El banco nunca pide claves ni códigos por SMS.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'SUCIVE', sub:'remitente: SMS',
    text:'SUCIVE: Multa vencida. Si no pagás hoy aumenta. Ingresá: <span style="color:#7ab8ff;text-decoration:underline">asucive.cc/uy/multa</span>', ans:'estafa',
    okT:'¡Exacto!', okD:'Los sitios del Estado terminan en .gub.uy. Ese ".cc" es trucho.', noT:'Es estafa', noD:'SUCIVE no manda links por SMS. El real es sucive.gub.uy.' },

  { t:'fact', ic:'bulb', col:'#00e5a0', img:'/imgs/telenoche_millon.png',
    text:'<b>Caso real (Telenoche).</b> Una familia perdió más de <b>un millón de pesos</b>: se hicieron pasar por policías. La Policía nunca pide dinero.' },

  { t:'mcq', ic:'phone', col:'#00c8ff', tag:'La llamada', sub:'Te llaman de la nada',
    q:'Te llaman de una "empresa de premios": para cobrar, necesitan el número y el <b>código de seguridad</b> de tu tarjeta. ¿Qué hacés?',
    opts:['Le doy los datos, ¡gané!','Le doy el número, el código no','Cuelgo: no participé y nadie pide datos así','Le pido que me llame más tarde'], ok:2,
    okT:'¡Perfecto!', okD:'Si no participaste, no ganaste. El código no se da por teléfono jamás.', noT:'Cuidado', noD:'Ningún premio real pide los datos de tu tarjeta. Cortá tranquila.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'+598 91 234 567', sub:'número desconocido',
    text:'Hola abu, soy Marti. Cambié de número. Perdí la tarjeta, ¿me hacés un giro de <b style="color:#ffd9a0">$8.000</b> por Abitab? No le digas a nadie.', ans:'estafa',
    okT:'¡Bien visto!', okD:'Clásico del "cambié de número". Tu nieto no te pide plata en secreto.', noT:'Era estafa', noD:'"Cambié de número + giro urgente + no le digas" es el cuento del tío.' },

  { t:'fact', ic:'bulb', col:'#00e5a0', img:'/imgs/canal4_hombre.png',
    text:'<b>Caso real (Canal 4).</b> Un hombre de 90 años perdió <b>$46.000</b> con el cuento del tío: se hicieron pasar por su nieto.' },

  { t:'tf', ic:'help', col:'#8b7cf8', tag:'Verdadero o Falso',
    statement:'Si un <b style="color:#8b7cf8">"príncipe"</b> de un país lejano te ofrece su fortuna por email, conviene aceptar rápido.', ans:'f',
    okT:'¡Falso, obvio!', okD:'Ningún príncipe reparte herencias por mail: es el cuento más viejo de internet.', noT:'Era falso', noD:'Si suena demasiado bueno para ser verdad, es chamuyo.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'BROU Beneficios', sub:'número desconocido',
    text:'¡Felicitaciones! Por ser cliente del BROU tenés <b style="color:#ffd9a0">$10.000</b>. Activalo en: <span style="color:#7ab8ff;text-decoration:underline">brou-beneficios.com</span>', ans:'estafa',
    okT:'¡Muy bien!', okD:'El sitio del banco es brou.com.uy, no "brou-beneficios.com". No regala plata por WhatsApp.', noT:'Es estafa', noD:'El dominio "brou-beneficios.com" no es del banco. Es trucho.' },

  { t:'mcq', ic:'search', col:'#00c8ff', tag:'Detectá la pista', sub:'¿Qué lo delata?',
    q:'Un email del "Correo Uruguayo", con logo perfecto, te pide pagar un envío. ¿Qué lo delata como falso?',
    opts:['Nada, el logo está impecable','El remitente es correo-uy@gmail.com','Que tenga logo','Que hable de un paquete'], ok:1,
    okT:'¡Ojo de detective!', okD:'El logo se copia en 2 minutos. El dominio oficial termina en .gub.uy, no @gmail.com.', noT:'La pista era el remitente', noD:'Un email oficial nunca sale de un @gmail.com. Mirá la dirección, no el logo.' },

  { t:'tf', ic:'help', col:'#8b7cf8', tag:'Verdadero o Falso',
    statement:'Si quien te escribe sabe tu nombre y los <b>últimos 4 dígitos</b> de tu tarjeta, seguro es tu banco.', ans:'f',
    okT:'¡Falso!', okD:'Esos datos se filtran y se compran. Saber algo tuyo no prueba nada.', noT:'Era falso', noD:'Los estafadores suelen tener algunos datos tuyos. Eso no los hace tu banco.' },

  { t:'fact', ic:'bulb', col:'#00e5a0', img:'/imgs/correo_uy.png',
    text:'<b>Email falso del Correo Uruguayo.</b> Copian el diseño para cobrar "gastos de envío". Si el link no termina en <b>.gub.uy</b>, es falso.' },

  { t:'real', ic:'msg', col:'#ffc844', tag:'¿Estafa o real?', sender:'Antel', sub:'remitente: SMS',
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

  const step  = FLOW[idx]
  const qNum  = FLOW.slice(0, idx + 1).filter(s => s.t !== 'fact').length
  const pct   = Math.round(((idx + 1) / FLOW.length) * 100)

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
    timer.current = setTimeout(() => goNext(ns, nh), 3400)
  }

  const seguir = () => { if (idx + 1 >= FLOW.length) finish(score, hits); else { setIdx(idx + 1); setAnswered(false); setChosen(null) } }

  const accent = <div className="bqx-accent" style={{ background:`linear-gradient(90deg, ${step.col}, ${hexa(step.col,.15)} 60%, transparent)` }} />
  const ctxHead = (
    <div className="bqx-ctx">
      <div className="bqx-ctxic" style={{ background:`linear-gradient(145deg, ${hexa(step.col,.20)}, ${hexa(step.col,.05)})`, border:`1px solid ${hexa(step.col,.36)}`, boxShadow:`0 6px 18px ${hexa(step.col,.16)}` }}><Ic n={step.ic} s={22} c={step.col} /></div>
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
            <button className="bqx-logo" onClick={go.home} aria-label="Volver"><Ic n="arrow" s={16} c="#00c8ff" w={2.2} /></button>
            <div className="bqx-hname">Blindaje Digital</div>
            {streak >= 2 && <div className="bqx-streak"><Ic n="flame" s={12} c="#ffc844" /><span>x{streak}</span></div>}
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
                <div className="bqx-statement" dangerouslySetInnerHTML={{ __html: step.statement }} />
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
                <div className="bqx-answers">
                  <Binary v="estafa" ok={step.ans} chosen={chosen} answered={answered} cls="red" icon="alert" c="#ff3d5a" label="Es estafa" idx={0} onPick={answer} />
                  <Binary v="real" ok={step.ans} chosen={chosen} answered={answered} cls="green" icon="check" c="#00e5a0" label="Es de verdad" idx={1} onPick={answer} />
                </div>
              </div>
            )}

            {step.t === 'fact' && (
              <div className="bqx-card bqx-fact">{accent}{ctxHead}
                <img className="bqx-factimg" src={step.img} alt="Caso real" />
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
        <div className="bqx-ov">
          <div className={`bqx-ovcard ${win ? 'ok' : 'no'}`}>
            <div className="bqx-ovic"><Ic n={win ? 'check' : 'x'} s={30} c={win ? '#00e5a0' : '#ff3d5a'} w={2.6} /></div>
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
    .bqx-root{position:relative;height:100dvh;overflow:hidden;background:#050a18;color:#f0f6ff;display:flex;justify-content:center;font-family:'Outfit',sans-serif}
    .bqx-particles{position:absolute;inset:0;z-index:0;opacity:.85}
    .bqx-app{position:relative;z-index:1;width:100%;max-width:430px;height:100dvh;display:flex;flex-direction:column;overflow:hidden;padding:max(env(safe-area-inset-top),12px) 16px max(env(safe-area-inset-bottom),14px)}

    .bqx-head{flex:none}
    .bqx-htop{display:flex;align-items:center;gap:9px;margin-bottom:11px}
    .bqx-logo{width:32px;height:32px;border-radius:9px;background:rgba(0,200,255,.10);border:1px solid rgba(0,200,255,.3);display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;transform:rotate(180deg)}
    .bqx-hname{font-size:13px;font-weight:600;flex:1;letter-spacing:.01em}
    .bqx-streak{display:flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:#ffc844;padding:3px 8px;border-radius:99px;background:rgba(255,200,68,.10);border:1px solid rgba(255,200,68,.28);animation:bqxpop .3s ease both}
    .bqx-score{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:#ffc844}
    .bqx-hbar{height:5px;border-radius:99px;background:#142040;overflow:hidden}
    .bqx-hbar > i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#00c8ff,#00e5a0);box-shadow:0 0 8px rgba(0,229,160,.55);transition:width .5s cubic-bezier(.4,0,.2,1)}
    .bqx-hcount{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#4a6080;margin-top:7px}

    .bqx-stage{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;padding:6px 0}
    .bqx-cardwrap{display:flex;flex-direction:column;max-height:100%;min-height:0}
    .bqx-card{position:relative;background:linear-gradient(180deg,#10203c,#0b1426);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:17px 15px;box-shadow:0 24px 54px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.07);display:flex;flex-direction:column;max-height:100%;overflow:hidden}
    .bqx-card::after{content:'';position:absolute;inset:0;border-radius:20px;padding:1px;background:linear-gradient(150deg,rgba(255,255,255,.18),rgba(255,255,255,.02) 45%,rgba(0,200,255,.12));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
    .bqx-accent{position:absolute;top:0;left:18px;right:18px;height:2px;border-radius:99px;z-index:1;transform-origin:left;animation:bqxaccent .55s cubic-bezier(.4,0,.2,1) both}

    .bqx-ctx{display:flex;align-items:center;gap:10px;margin-bottom:12px;flex:none}
    .bqx-ctxic{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex:none}
    .bqx-ctxlbl{display:flex;flex-direction:column;gap:2px;min-width:0}
    .bqx-ctxlbl b{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
    .bqx-ctxlbl span{font-size:11px;color:#4a6080}
    .bqx-q{font-size:16px;line-height:1.45;color:#f0f6ff;font-weight:500;margin-bottom:13px;flex:none}
    .bqx-q b{color:#fff}
    .bqx-statement{font-size:18px;line-height:1.45;color:#f0f6ff;font-weight:600;text-align:center;padding:6px 4px 2px}

    .bqx-opts{display:flex;flex-direction:column;gap:8px}
    .bqx-opt{display:flex;align-items:center;gap:11px;width:100%;text-align:left;padding:12px;border-radius:13px;background:#142040;border:1.5px solid rgba(0,200,255,.10);color:inherit;cursor:pointer;transition:transform .16s, border-color .2s, background .2s;font-family:inherit;animation:bqxin .42s ease both;animation-delay:calc(var(--i,0)*.06s)}
    .bqx-opt:hover{border-color:rgba(0,200,255,.32)}
    .bqx-opt:active{transform:scale(.99)}
    .bqx-lt{width:26px;height:26px;border-radius:7px;background:rgba(0,200,255,.10);border:1px solid rgba(0,200,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#00c8ff;flex:none;transition:.2s}
    .bqx-opt span{font-size:13.5px;line-height:1.35}
    .bqx-opt.win{background:rgba(0,229,160,.13);border-color:#00e5a0;animation:bqxwin .55s ease}
    .bqx-opt.win .bqx-lt{background:#00e5a0;color:#04231a;border:none}
    .bqx-opt.lose{background:rgba(255,61,90,.13);border-color:#ff3d5a;animation:bqxshake .42s ease}
    .bqx-opt.lose .bqx-lt{background:#ff3d5a;color:#fff;border:none}
    .bqx-opt.mute{opacity:.34}

    .bqx-answers{display:flex;gap:10px;margin-top:14px;flex:none}
    .bqx-ans{flex:1;min-height:62px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;border:1.5px solid;font-weight:600;font-size:13.5px;transition:transform .16s, box-shadow .2s;color:inherit;background:transparent;font-family:inherit;animation:bqxin .42s ease both;animation-delay:calc(var(--i,0)*.08s)}
    .bqx-ans:active{transform:scale(.98)}
    .bqx-ans.green{border-color:rgba(0,229,160,.5);color:#7ff0c8;background:rgba(0,229,160,.06)}
    .bqx-ans.red{border-color:rgba(255,61,90,.5);color:#ff8fa0;background:rgba(255,61,90,.06)}
    .bqx-ans.win{box-shadow:0 0 0 2px #00e5a0,0 10px 26px rgba(0,229,160,.26);animation:bqxwin .55s ease}
    .bqx-ans.lose{box-shadow:0 0 0 2px #ff3d5a;animation:bqxshake .42s ease}
    .bqx-ans.mute{opacity:.34}

    .bqx-msg{background:#080f20;border:1px solid rgba(255,255,255,.06);border-radius:13px;padding:12px;margin-bottom:14px;flex:none}
    .bqx-msgtop{display:flex;align-items:center;gap:9px;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,.06)}
    .bqx-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#3a4a78,#2a3358);display:flex;align-items:center;justify-content:center;flex:none}
    .bqx-nm{font-size:12.5px;font-weight:500}.bqx-sub{font-size:10.5px;color:#4a6080}
    .bqx-chip{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:600;color:#4a6080;border:1px solid rgba(255,255,255,.12);padding:3px 7px;border-radius:6px}
    .bqx-bubble{background:#1b2236;border-radius:11px;padding:10px 12px;font-size:13px;line-height:1.5;color:#eaf3ff}
    .bqx-prompt{text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8fa8cc;margin-bottom:12px;flex:none}

    .bqx-fact{align-items:stretch}
    .bqx-factimg{width:100%;flex:1;min-height:0;object-fit:cover;border-radius:13px;border:1px solid rgba(255,255,255,.08);margin-bottom:12px;background:#0a1426}
    .bqx-facttext{font-size:13.5px;line-height:1.5;color:#8fa8cc;text-align:center;margin-bottom:13px;flex:none}
    .bqx-facttext b{color:#f0f6ff}
    .bqx-seguir{height:50px;border:none;border-radius:13px;background:linear-gradient(135deg,#00e5a0,#10b981);color:#04231a;font-weight:700;font-size:14.5px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;flex:none;font-family:inherit;box-shadow:0 10px 24px rgba(0,200,140,.28)}

    .bqx-ov{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:26px;background:rgba(4,8,16,.82);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);animation:bqxfade .25s ease both}
    .bqx-ovcard{position:relative;width:100%;max-width:320px;border-radius:22px;padding:26px 22px 16px;text-align:center;background:#0c1730;animation:bqxpop .34s cubic-bezier(.2,.9,.3,1.25) both;overflow:hidden}
    .bqx-ovcard.ok{border:2px solid rgba(0,229,160,.5);box-shadow:0 0 56px rgba(0,229,160,.22)}
    .bqx-ovcard.no{border:2px solid rgba(255,61,90,.5);box-shadow:0 0 56px rgba(255,61,90,.22)}
    .bqx-ovic{position:relative;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;animation:bqxiconpop .55s cubic-bezier(.2,.9,.3,1.5) both}
    .bqx-ovcard.ok .bqx-ovic{background:rgba(0,229,160,.16)}
    .bqx-ovcard.no .bqx-ovic{background:rgba(255,61,90,.16)}
    .bqx-ovic::after{content:'';position:absolute;inset:-7px;border-radius:50%;border:2px solid;opacity:0;animation:bqxring .75s ease-out .12s both}
    .bqx-ovcard.ok .bqx-ovic::after{border-color:#00e5a0}
    .bqx-ovcard.no .bqx-ovic::after{border-color:#ff3d5a}
    .bqx-ovt{font-size:20px;font-weight:700;margin-bottom:7px}
    .bqx-ovcard.ok .bqx-ovt{color:#7ff0c8} .bqx-ovcard.no .bqx-ovt{color:#ff8fa0}
    .bqx-ovd{font-size:13.5px;line-height:1.55;color:#aebfd8;margin-bottom:18px}
    .bqx-nl{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#4a6080;margin-bottom:7px}
    .bqx-auto{height:4px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden}
    .bqx-auto > i{display:block;height:100%;width:100%;border-radius:99px;background:linear-gradient(90deg,#00c8ff,#00e5a0);animation:bqxdrain 3.2s linear forwards}
    .bqx-ovcard.no .bqx-auto > i{background:linear-gradient(90deg,#ff3d5a,#ff8aa0)}

    @keyframes bqxpop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
    @keyframes bqxfade{from{opacity:0}to{opacity:1}}
    @keyframes bqxdrain{from{width:100%}to{width:0%}}
    @keyframes bqxin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bqxwin{0%{transform:scale(1)}40%{transform:scale(1.03)}100%{transform:scale(1)}}
    @keyframes bqxshake{0%,100%{transform:translateX(0)}22%{transform:translateX(-6px)}44%{transform:translateX(6px)}66%{transform:translateX(-4px)}88%{transform:translateX(2px)}}
    @keyframes bqxaccent{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes bqxiconpop{0%{opacity:0;transform:scale(.4)}60%{transform:scale(1.14)}100%{opacity:1;transform:scale(1)}}
    @keyframes bqxring{0%{opacity:.55;transform:scale(.7)}100%{opacity:0;transform:scale(1.3)}}
    @media (prefers-reduced-motion: reduce){*{animation:none!important}.bqx-hbar>i,.bqx-auto>i{transition:none}}
    `}</style>
  )
}
