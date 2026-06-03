import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEPS } from '../data/steps'
import { CATS }  from '../data/cats'

const LETTERS = ['A','B','C','D']

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
            style={{ background:'linear-gradient(135deg,#00c8ff,#0099cc)' }}>
            Continuar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function QuestionCard({ step, qNum, onAnswer }) {
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen]     = useState(null)
  const meta = CATS[step.cat] || { color:'#00c8ff', bg:'rgba(0,200,255,.1)', svg:'' }

  const select = (i) => {
    if(answered) return
    setAnswered(true); setChosen(i)
    setTimeout(() => onAnswer(i === step.ok), 1500)
  }

  const optClass = (i) => {
    if(!answered) return ''
    if(i === step.ok) return 'correct'
    if(i === chosen && i !== step.ok) return 'wrong'
    return 'dimmed'
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
          <div className="text-[1.05rem] font-semibold leading-[1.65] text-t1">{step.txt}</div>
        </div>
      </motion.div>

      {/* Options */}
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1 }}
        className="flex flex-col gap-[10px]">
        {step.opts.map((opt, i) => {
          const cl = optClass(i)
          return (
            <button key={i} onClick={() => select(i)} disabled={answered}
              className="flex items-center gap-4 w-full text-left px-5 py-4 rounded-[16px] min-h-[60px] transition-all duration-200"
              style={{
                background: cl==='correct' ? 'rgba(0,229,160,.08)' : cl==='wrong' ? 'rgba(255,61,90,.08)' : cl==='dimmed' ? 'rgba(20,32,64,.4)' : '#142040',
                border: cl==='correct' ? '1.5px solid #00e5a0' : cl==='wrong' ? '1.5px solid #ff3d5a' : '1.5px solid rgba(0,200,255,.18)',
                opacity: cl==='dimmed' ? .4 : 1,
                cursor: answered ? 'default' : 'pointer',
              }}>
              <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center flex-shrink-0 font-mono text-[.72rem] font-semibold transition-all"
                style={{
                  background: cl==='correct' ? '#00e5a0' : cl==='wrong' ? '#ff3d5a' : '#0f1d35',
                  color: cl==='correct' ? '#000' : cl==='wrong' ? '#fff' : '#4a6080',
                  border: cl ? 'none' : '1px solid rgba(0,200,255,.2)',
                }}>
                {LETTERS[i]}
              </div>
              <span className="text-[.97rem] text-t1 leading-snug">{opt}</span>
            </button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default function QuizScreen({ go }) {
  const [step, setStep]       = useState(0)
  const [score, setScore]     = useState(0)
  const [hits, setHits]       = useState(0)
  const [qCount, setQCount]   = useState(0)
  const [toast, setToast]     = useState(null)

  const totalQs = STEPS.filter(s => s.type === 'q').length
  const pct     = Math.round((step / STEPS.length) * 100)
  const current = STEPS[step]

  const showToast = (msg, color) => {
    setToast({ msg, color })
    setTimeout(() => setToast(null), 1600)
  }

  const handleAnswer = (correct) => {
    if(correct) {
      showToast('✓ Correcto', '#00e5a0')
      setHits(h => h+1); setScore(s => s+200)
    } else {
      showToast('✗ Incorrecto', '#ff3d5a')
    }
    setTimeout(() => {
      const next = step + 1
      if(next >= STEPS.length) {
        go.results({ pct: Math.round(((hits + (correct?1:0)) / totalQs)*100), hits: hits+(correct?1:0), total: totalQs, score: score+(correct?200:0) })
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
    if(current?.type === 'q') setQCount(c => c+1)
  }, [step])

  return (
    <div className="flex flex-col min-h-screen bg-bg">
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

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background:'#142040' }}>
          <motion.div className="h-full rounded-full" style={{ background:'linear-gradient(90deg,#00c8ff,#00e5a0)' }}
            initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:.5, ease:'easeOut' }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-2">
        <AnimatePresence mode="wait">
          {current?.type === 'fact'
            ? <FactCard key={step} step={current} onNext={handleNext} />
            : <QuestionCard key={step} step={current} qNum={qCount} onAnswer={handleAnswer} />
          }
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity:0, y:16, x:'-50%' }} animate={{ opacity:1, y:0, x:'-50%' }} exit={{ opacity:0, y:8, x:'-50%' }}
            className="fixed bottom-20 left-1/2 font-bold text-[1.1rem] px-7 py-4 rounded-2xl z-50 whitespace-nowrap"
            style={{ color:toast.color, borderColor:toast.color, background:'#142040', border:'2px solid', boxShadow:'0 8px 32px rgba(0,0,0,.5)' }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
