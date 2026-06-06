import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEPS } from '../data/steps'
import { CATS }  from '../data/cats'

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
    const dots = Array.from({ length: 60 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.28,
      vy:  (Math.random() - 0.5) * 0.28,
      r:   Math.random() * 2.8 + 1.0,
      a:   Math.random() * 0.45 + 0.15,
      hue: Math.random() * 360,
      dh:  (Math.random() * 0.5 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
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
        if (dist < 90) {
          const midHue = (a.hue + b.hue) / 2
          ctx.beginPath()
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `hsla(${midHue}, 100%, 65%, ${0.10 * (1 - dist / 90)})`
          ctx.stroke()
        }
      }))
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex:0 }} />
}

const LETTERS = ['A','B','C','D']

/* ──────────────────────────────────────────
   Confetti burst (verde cuando acertás)
────────────────────────────────────────── */
function ConfettiBurst() {
  const pieces = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 280,
    y: -(Math.random() * 200 + 80),
    rot: Math.random() * 720 - 360,
    scale: Math.random() * 0.6 + 0.4,
    color: ['#00e5a0','#00c8ff','#f59e0b','#10b981','#34d399'][Math.floor(Math.random()*5)],
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
    delay: Math.random() * 0.15,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: p.scale }}
          animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rot, scale: p.scale * 0.5 }}
          transition={{ duration: 0.85, delay: p.delay, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: p.shape === 'rect' ? 10 : 8,
            height: p.shape === 'rect' ? 6 : 8,
            borderRadius: p.shape === 'circle' ? '50%' : 2,
            background: p.color,
          }}
        />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────
   Tarjeta ¿Sabías que?
────────────────────────────────────────── */
function FactCard({ step, onNext }) {
  return (
    <motion.div
      key={step.id}
      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}
      className="flex flex-col"
      style={{ height:'calc(100dvh - 130px)' }}
    >
      {/* Contenido scrolleable si es necesario */}
      <div className="flex-1 overflow-y-auto rounded-2xl"
        style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.12)', WebkitOverflowScrolling:'touch' }}>
        {step.img && <div dangerouslySetInnerHTML={{ __html: step.img }} />}
        <div className="p-4">
          <div className="flex items-center justify-center mb-3">
            <div className="px-5 py-[8px] rounded-full font-bold text-[.85rem] tracking-widest uppercase"
              style={{ background:'rgba(0,200,255,.10)', border:'1.5px solid rgba(0,200,255,.35)', color:'#00c8ff', letterSpacing:'.08em' }}>
              ¿Sabías que?
            </div>
          </div>
          <div className="text-[.82rem] leading-[1.55] text-t1 mb-3"
            dangerouslySetInnerHTML={{ __html: step.txt }} />
          {step.stat && (
            <div className="flex items-start gap-3 rounded-xl p-3 mb-3"
              style={{ background:'rgba(139,124,248,.07)', border:'1px solid rgba(139,124,248,.18)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b7cf8" strokeWidth="2" className="flex-shrink-0 mt-[2px]"><path d="M12 22V12m0 0V2m0 10H2m10 0h10"/></svg>
              <div className="text-[.78rem] text-t2 leading-relaxed">{step.stat}</div>
            </div>
          )}
          {step.src && <div className="font-mono text-[.62rem] text-t3 mb-2">Fuente: {step.src}</div>}
        </div>
      </div>

      {/* Botón SIEMPRE visible abajo */}
      <button onClick={onNext}
        className="w-full flex items-center justify-center gap-2 rounded-[14px] text-black font-bold text-[1rem] transition-all active:scale-98 mt-3 flex-shrink-0"
        style={{ background:'linear-gradient(135deg,#00e5a0,#10b981)', height:56 }}>
        Continuar
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </motion.div>
  )
}

/* ──────────────────────────────────────────
   Tarjeta de Pregunta
────────────────────────────────────────── */
function QuestionCard({ step, qNum, onAnswer, onShake }) {
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen]     = useState(null)
  const feedbackRef = useRef(null)
  const meta = CATS[step.cat] || { color:'#00c8ff', bg:'rgba(0,200,255,.1)', svg:'' }

  const select = (i) => {
    if(answered) return
    setAnswered(true)
    setChosen(i)
    const correct = i === step.ok
    if(!correct) onShake()   // vibración roja si errás
    // Scroll al feedback después de que aparece
    setTimeout(() => {
      if(feedbackRef.current) {
        feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 250)
    setTimeout(() => onAnswer(correct), 3500)
  }

  const optStyle = (i) => {
    if(!answered) return {
      background: '#142040',
      border: '1.5px solid rgba(0,200,255,.18)',
      opacity: 1,
    }
    if(i === step.ok) return {
      background: 'rgba(0,229,160,.10)',
      border: '1.5px solid #00e5a0',
      opacity: 1,
    }
    if(i === chosen) return {
      background: 'rgba(255,61,90,.10)',
      border: '1.5px solid #ff3d5a',
      opacity: 1,
    }
    return {
      background: 'rgba(20,32,64,.4)',
      border: '1.5px solid rgba(0,200,255,.08)',
      opacity: 0.38,
    }
  }

  const letterStyle = (i) => {
    if(!answered) return { background:`${meta.color}18`, color:meta.color, border:`1px solid ${meta.color}55` }
    if(i === step.ok)          return { background:'#00e5a0', color:'#000', border:'none' }
    if(i === chosen && i !== step.ok) return { background:'#ff3d5a', color:'#fff', border:'none' }
    return { background:'#0f1d35', color:'#4a6080', border:'1px solid rgba(0,200,255,.1)' }
  }

  return (
    <motion.div key={step.id} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.3 }}>

      {/* Header compacto: categoría + número */}
      <div className="flex items-center gap-3 mb-3 px-1">
        <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0"
          style={{ background:meta.bg, border:`1px solid ${meta.color}55` }}
          dangerouslySetInnerHTML={{ __html: meta.svg.replace('width="22"','width="28"').replace('height="22"','height="28"') }} />
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:'.88rem', fontWeight:800, letterSpacing:'.04em', textTransform:'uppercase', color:meta.color }}>{step.cat}</span>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:'.75rem', fontWeight:600, color:'#4a6080', marginLeft:'auto' }}>Pregunta {qNum}</span>
      </div>

      {/* Imagen si hay */}
      {step.img && (
        <div className="rounded-[12px] overflow-hidden mb-2"
          dangerouslySetInnerHTML={{ __html: step.img }} />
      )}

      {/* Pregunta */}
      <div className="rounded-[14px] p-4 mb-3"
        style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
        <div className="text-[1rem] font-semibold leading-[1.55] text-t1 whitespace-pre-wrap text-center mb-3">{step.txt.replace('¿Qué hacés?', '').trim()}</div>
        <div className="text-center font-bold text-[1.1rem] mt-2" style={{ color: meta.color }}>¿Qué hacés?</div>
      </div>

      {/* Opciones compactas */}
      <div className="flex flex-col gap-[7px]">
        {step.opts.map((opt, i) => (
          <button key={i} onClick={() => select(i)} disabled={answered}
            className="flex items-center gap-3 w-full text-left px-3 py-[10px] rounded-[12px] transition-all duration-200"
            style={{ ...optStyle(i), cursor: answered ? 'default' : 'pointer', minHeight: 44 }}>
            <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center flex-shrink-0 font-mono text-[.68rem] font-semibold transition-all"
              style={letterStyle(i)}>
              {LETTERS[i]}
            </div>
            <span className="text-[.93rem] text-t1 leading-snug">{opt}</span>
          </button>
        ))}
      </div>

{/* Feedback — modal central */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className="fixed inset-0 flex items-center justify-center px-5"
            style={{ zIndex: 100, background: 'rgba(5,13,26,.75)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              ref={feedbackRef}
              initial={{ opacity: 0, scale: .85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .9, y: -10 }}
              transition={{ duration: .3, ease: 'easeOut' }}
              className="w-full max-w-[340px] rounded-[20px] p-6"
              style={{
                background: chosen === step.ok ? 'rgba(0,229,160,.10)' : 'rgba(255,61,90,.10)',
                border: `2px solid ${chosen === step.ok ? 'rgba(0,229,160,.4)' : 'rgba(255,61,90,.4)'}`,
                boxShadow: chosen === step.ok
                  ? '0 0 40px rgba(0,229,160,.2)'
                  : '0 0 40px rgba(255,61,90,.2)',
              }}
            >
              {/* Ícono grande */}
              <div className="text-[3rem] text-center mb-3">
                {chosen === step.ok ? '✅' : '❌'}
              </div>
              {/* Texto feedback */}
              <div
                className="text-center text-[1rem] leading-relaxed font-medium"
                style={{ color: chosen === step.ok ? '#00e5a0' : '#ff8fa0' }}
              >
                {chosen === step.ok ? step.fc : step.fw}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ──────────────────────────────────────────
   Pantalla principal del Quiz
────────────────────────────────────────── */
export default function QuizScreen({ go }) {
  const [step, setStep]         = useState(0)
  const [score, setScore]       = useState(0)
  const [hits, setHits]         = useState(0)
  const [qCount, setQCount]     = useState(0)
  const [shake, setShake]       = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const containerRef = useRef(null)
  const topRef = useRef(null)

  const totalQs = STEPS.filter(s => s.type === 'q').length
  const pct     = Math.round((step / STEPS.length) * 100)
  const current = STEPS[step]

  /* Efecto rojo de vibración al errar */
  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  /* Efecto verde/confetti al acertar */
  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 950)
  }

  const handleAnswer = (correct) => {
    if(correct) {
      triggerConfetti()
      setHits(h => h + 1)
      setScore(s => s + 200)
    }
    setTimeout(() => {
      const next = step + 1
      if(next >= STEPS.length) {
        go.results({
          pct: Math.round(((hits + (correct?1:0)) / totalQs) * 100),
          hits: hits + (correct?1:0),
          total: totalQs,
          score: score + (correct?200:0)
        })
      } else {
        setStep(next)
      }
    }, 1500)
  }

  const handleNext = () => {
    const next = step + 1
    if(next >= STEPS.length) go.results({ pct: Math.round((hits/totalQs)*100), hits, total: totalQs, score })
    else setStep(next)
  }

  useEffect(() => {
    if(current?.type === 'q') setQCount(c => c + 1)
    // Scroll al tope cuando cambia la pregunta
    setTimeout(() => {
      if(topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [step])

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col min-h-screen bg-bg relative overflow-hidden"
      animate={shake ? {
        x: [0, -10, 12, -10, 8, -5, 3, 0],
        backgroundColor: ['#050d1a', '#2d0a0a', '#1a0505', '#050d1a'],
      } : { x: 0 }}
      transition={shake ? { duration: 0.55, ease: 'easeOut' } : {}}
      style={shake ? { boxShadow: 'inset 0 0 60px rgba(255,61,90,.35)' } : {}}
    >
      {/* Partículas RGB de fondo */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:0 }}>
        <Particles />
      </div>

      {/* Confetti */}
      {showConfetti && <ConfettiBurst />}

      {/* Flash verde al acertar */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            key="greenflash"
            className="pointer-events-none fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 0.5 }}
            style={{ background: 'radial-gradient(ellipse at center, #00e5a0 0%, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      {/* Topbar */}
      <div className="glass flex items-center gap-3 px-4 sticky top-0 z-50 border-b border-white/[.06]"
        style={{ paddingTop:`calc(env(safe-area-inset-top,0px) + 12px)`, paddingBottom:'12px' }}>
        <button onClick={go.home}
          className="flex items-center gap-2 px-3 py-2 rounded-[10px] transition-all flex-shrink-0"
          style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.10)', backdropFilter:'blur(8px)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          <span style={{ fontSize:'.75rem', fontWeight:600, color:'rgba(255,255,255,.6)', fontFamily:"'Outfit',sans-serif" }}>Volver</span>
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[1rem] text-t1">{current?.type === 'fact' ? '¿Sabías que?' : `Pregunta ${qCount} de ${totalQs}`}</div>
          <div className="text-t3 text-[.7rem] mt-[1px]">Test de Blindaje Digital</div>
        </div>
        <div className="font-mono text-[.82rem] text-yellow font-semibold flex-shrink-0 ml-auto">{score} pts</div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background:'#142040' }}>
          <motion.div className="h-full rounded-full" style={{ background:'linear-gradient(90deg,#00c8ff,#00e5a0)' }}
            initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:.5, ease:'easeOut' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-2">
        <div ref={topRef} />
        <AnimatePresence mode="wait">
          {current?.type === 'fact'
            ? <FactCard key={step} step={current} onNext={handleNext} />
            : <QuestionCard key={step} step={current} qNum={qCount} onAnswer={handleAnswer} onShake={triggerShake} />
          }
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
