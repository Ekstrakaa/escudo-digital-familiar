import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEPS } from '../data/steps'
import { CATS }  from '../data/cats'

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
    <motion.div key={step.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}>
      <div className="rounded-2xl overflow-hidden" style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.12)' }}>
        {step.img && <div dangerouslySetInnerHTML={{ __html: step.img }} />}
        <div className="p-5">
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full font-mono text-[.62rem] font-semibold tracking-wider uppercase text-cyan mb-4"
            style={{ background:'rgba(0,200,255,.08)', border:'1px solid rgba(0,200,255,.2)' }}>
            ¿Sabías que?
          </div>
          <div className="text-[.97rem] leading-[1.75] text-t1 mb-4" dangerouslySetInnerHTML={{ __html: step.txt }} />
          {step.stat && (
            <div className="flex items-start gap-3 rounded-xl p-4 mb-4" style={{ background:'rgba(139,124,248,.07)', border:'1px solid rgba(139,124,248,.18)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b7cf8" strokeWidth="2" className="flex-shrink-0 mt-[2px]"><path d="M12 22V12m0 0V2m0 10H2m10 0h10"/></svg>
              <div className="text-[.83rem] text-t2 leading-relaxed">{step.stat}</div>
            </div>
          )}
          {step.src && <div className="font-mono text-[.65rem] text-t3 mb-5">Fuente: {step.src}</div>}
          <button onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-[17px] rounded-[14px] text-black font-bold text-[1rem] transition-all active:scale-98"
            style={{ background:'linear-gradient(135deg,#00e5a0,#10b981)' }}>
            Continuar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
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
    if(!answered) return { background:'#0f1d35', color:'#4a6080', border:'1px solid rgba(0,200,255,.2)' }
    if(i === step.ok)          return { background:'#00e5a0', color:'#000', border:'none' }
    if(i === chosen && i !== step.ok) return { background:'#ff3d5a', color:'#fff', border:'none' }
    return { background:'#0f1d35', color:'#4a6080', border:'1px solid rgba(0,200,255,.1)' }
  }

  return (
    <motion.div key={step.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}>

      {/* Category banner */}
      <motion.div initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:.05 }}
        className="flex items-center gap-4 p-4 rounded-2xl mb-4"
        style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
        <div className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0"
          style={{ background:meta.bg, border:`1px solid ${meta.color}33` }}
          dangerouslySetInnerHTML={{ __html: meta.svg }} />
        <div>
          <div className="font-mono text-[.72rem] tracking-widest uppercase font-semibold mb-[3px]" style={{ color:meta.color }}>{step.cat}</div>
          <div className="text-[.83rem] text-t2">Pregunta {qNum}</div>
        </div>
      </motion.div>

      {/* Question */}
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.07 }}
        className="rounded-2xl overflow-hidden mb-4"
        style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
        {step.img && <div dangerouslySetInnerHTML={{ __html: step.img }} />}
        <div className="p-5">
          {step.tip && (
            <div className="text-[.82rem] text-t2 leading-relaxed p-3 mb-4 rounded-[8px]"
              style={{ background:'rgba(0,200,255,.05)', borderLeft:'2px solid rgba(0,200,255,.35)' }}>
              {step.tip}
            </div>
          )}
          <div className="text-[1.05rem] font-semibold leading-[1.65] text-t1 whitespace-pre-wrap">{step.txt}</div>
        </div>
      </motion.div>

      {/* Options */}
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1 }}
        className="flex flex-col gap-[10px]">
        {step.opts.map((opt, i) => (
          <button key={i} onClick={() => select(i)} disabled={answered}
            className="flex items-center gap-4 w-full text-left px-5 py-4 rounded-[16px] min-h-[60px] transition-all duration-200"
            style={{ ...optStyle(i), cursor: answered ? 'default' : 'pointer' }}>
            <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center flex-shrink-0 font-mono text-[.72rem] font-semibold transition-all"
              style={letterStyle(i)}>
              {LETTERS[i]}
            </div>
            <span className="text-[.97rem] text-t1 leading-snug">{opt}</span>
          </button>
        ))}
      </motion.div>

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
      className="flex flex-col min-h-screen bg-bg"
      animate={shake ? {
        x: [0, -10, 12, -10, 8, -5, 3, 0],
        backgroundColor: ['#050d1a', '#2d0a0a', '#1a0505', '#050d1a'],
      } : { x: 0 }}
      transition={shake ? { duration: 0.55, ease: 'easeOut' } : {}}
      style={shake ? { boxShadow: 'inset 0 0 60px rgba(255,61,90,.35)' } : {}}
    >
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
          className="w-11 h-11 rounded-[12px] flex items-center justify-center text-t2 hover:text-cyan flex-shrink-0 transition-colors"
          style={{ background:'#142040', border:'1px solid rgba(0,200,255,.18)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
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
