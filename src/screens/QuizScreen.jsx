import { useState } from 'react'
import { motion } from 'framer-motion'
import { STEPS } from '../data/steps'

/* Iconos */
const PATHS = {
  back:  <path d="M19 12H5M12 5l-7 7 7 7" />,
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  flame: <><path d="M12 2c1 4 4 5 4 9a4 4 0 0 1-8 0c0-1 .5-2 1-3" /><path d="M12 22a6 6 0 0 0 6-6c0-3-2-4-3-6-2 3-3 3-5 4" /></>,
  alert: <><path d="M12 2 2 20h20Z" /><path d="M12 9v5M12 17h.01" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  x:     <path d="M18 6 6 18M6 6l12 12" />,
  user:  <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  shield:<><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z" /><path d="M9 12l2 2 4-4" /></>,
}
function Ic({ name, s = 18, c = 'currentColor', w = 2 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  )
}

export default function QuizScreen({ go }) {
  const total = STEPS.length
  const [phase, setPhase]     = useState('intro')   // intro | quiz
  const [idx, setIdx]         = useState(0)
  const [score, setScore]     = useState(0)
  const [hits, setHits]       = useState(0)
  const [streak, setStreak]   = useState(0)
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen]   = useState(null)      // índice (mcq) o valor (real/tf)
  const [win, setWin]         = useState(false)

  const step = STEPS[idx]

  const grade = (correct, pick) => {
    if (answered) return
    setChosen(pick)
    setWin(correct)
    setAnswered(true)
    if (correct) { setScore(s => s + 100); setHits(h => h + 1); setStreak(s => s + 1) }
    else setStreak(0)
  }

  const advance = () => {
    const finalHits  = hits
    const finalScore = score
    if (idx + 1 >= total) {
      go.results({ pct: Math.round((finalHits / total) * 100), hits: finalHits, total, score: finalScore })
    } else {
      setIdx(i => i + 1); setAnswered(false); setChosen(null); setWin(false)
    }
  }

  const start = () => { setPhase('quiz'); setIdx(0); setScore(0); setHits(0); setStreak(0); setAnswered(false); setChosen(null) }

  /* ── Pantalla de inicio ── */
  if (phase === 'intro') {
    return (
      <div className="bq-root">
        <Style />
        <span className="bq-aura a1" /><span className="bq-aura a2" />
        <div className="bq-shell">
          <div className="bq-center">
            <div className="bq-kicker">Test de Blindaje Digital</div>
            <div className="bq-introbadge"><Ic name="shield" s={46} c="#36e6b4" /></div>
            <div className="bq-bigtitle">¿Estás a prueba <span className="bq-grad">de estafas?</span></div>
            <div className="bq-lead">10 situaciones reales para entrenar el ojo. No se trata de saber de tecnología, sino de reconocer las trampas a tiempo.</div>
            <div className="bq-meta"><span><b>10</b> preguntas</span><span style={{ opacity: .4 }}>·</span><span>≈ <b>3</b> min</span></div>
            <button className="bq-cta" style={{ maxWidth: 320 }} onClick={start}>Empezar <Ic name="arrow" s={16} c="#04231a" /></button>
            <button className="bq-back-link" onClick={go.home}>Volver al inicio</button>
          </div>
        </div>
      </div>
    )
  }

  const prog = Math.round(((idx + 1) / total) * 100)
  const title = step.type === 'real' ? '¿Estafa o real?' : step.type === 'tf' ? 'Verdadero o Falso' : `Pregunta ${idx + 1} de ${total}`
  const fb = answered ? (win ? step.okFb : step.noFb) : null

  return (
    <div className="bq-root">
      <Style />
      <span className="bq-aura a1" /><span className="bq-aura a2" />
      <div className="bq-shell">

        {/* Header */}
        <div className="bq-hud">
          <button className="bq-iconbtn" onClick={go.home}><Ic name="back" s={15} c="rgba(255,255,255,.75)" /></button>
          <div className="bq-htitle"><h1>{title}</h1><p>Test de Blindaje Digital</p></div>
          {streak >= 2 && <div className="bq-chip"><Ic name="flame" s={12} c="#f5a623" /><span>x{streak}</span></div>}
          <div className="bq-pts">{score} pts</div>
        </div>
        <div className="bq-bar"><i style={{ width: `${prog}%` }} /></div>

        {/* Pregunta */}
        <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} className="bq-stage">

          {step.type === 'mcq' && (
            <div className="bq-card">
              <div className="bq-cat"><div className="bq-catic">{step.icon}</div><div className="bq-catnm">{step.cat}</div></div>
              <div className="bq-qtext" dangerouslySetInnerHTML={{ __html: step.q }} />
              <div className="bq-opts">
                {step.opts.map((o, j) => {
                  let cls = 'bq-opt'
                  if (answered) {
                    if (j === step.ok) cls += ' win'
                    else { cls += ' dim'; if (j === chosen) cls += ' lose' }
                  }
                  return (
                    <button key={j} className={cls} disabled={answered} onClick={() => grade(j === step.ok, j)}>
                      <div className="bq-lt">{'ABCD'[j]}</div><span>{o}</span>
                    </button>
                  )
                })}
              </div>
              {fb && <Feedback fb={fb} win={win} onNext={advance} last={idx + 1 >= total} />}
            </div>
          )}

          {step.type === 'real' && (
            <div className="bq-card">
              <div className="bq-prompt">¿Qué hacés con este mensaje?</div>
              <div className="bq-msg">
                <div className="bq-msgtop">
                  <div className={`bq-av ${step.channel}`}><Ic name="user" s={17} c="#cdfaec" /></div>
                  <div><div className="bq-nm">{step.sender}</div><div className="bq-sub">{step.sub}</div></div>
                  <span className="bq-tag">{step.channel === 'wa' ? 'WhatsApp' : 'SMS'}</span>
                </div>
                <div className={`bq-bubble ${step.channel}`} dangerouslySetInnerHTML={{ __html: step.text }} />
                <div className="bq-time">{step.time}</div>
              </div>
              <Binary step={step} answered={answered} chosen={chosen}
                a={{ v: 'estafa', cls: 'red', icon: 'alert', c: '#ff6378', label: 'Es estafa' }}
                b={{ v: 'real', cls: 'green', icon: 'check', c: '#00e5a0', label: 'Es de verdad' }}
                onPick={grade} />
              {fb && <Feedback fb={fb} win={win} onNext={advance} last={idx + 1 >= total} />}
            </div>
          )}

          {step.type === 'tf' && (
            <>
              <div className="bq-badgewrap"><div className="bq-badge">VERDADERO O FALSO</div></div>
              <div className="bq-card">
                <div className="bq-statement" dangerouslySetInnerHTML={{ __html: step.statement }} />
                <Binary step={step} answered={answered} chosen={chosen}
                  a={{ v: 'verdadero', cls: 'green', icon: 'check', c: '#00e5a0', label: 'Verdadero' }}
                  b={{ v: 'falso', cls: 'red', icon: 'x', c: '#ff6378', label: 'Falso' }}
                  onPick={grade} />
                {fb && <Feedback fb={fb} win={win} onNext={advance} last={idx + 1 >= total} />}
              </div>
            </>
          )}

        </motion.div>
      </div>
    </div>
  )
}

/* Botones binarios (real / tf) */
function Binary({ step, answered, chosen, a, b, onPick }) {
  const render = (o) => {
    let cls = `bq-ans ${o.cls}`
    if (answered) {
      if (o.v === step.answer) cls += ' win'
      else { cls += ' dim'; if (o.v === chosen) cls += ' lose' }
    }
    return (
      <button key={o.v} className={cls} disabled={answered} onClick={() => onPick(o.v === step.answer, o.v)}>
        <Ic name={o.icon} s={o.icon === 'check' || o.icon === 'x' ? 22 : 19} c={o.c} />
        <span>{o.label}</span>
      </button>
    )
  }
  return <div className="bq-answers">{render(a)}{render(b)}</div>
}

/* Panel de feedback + botón Continuar */
function Feedback({ fb, win, onNext, last }) {
  return (
    <>
      <div className={`bq-fb ${win ? 'ok' : 'no'}`}>
        <div className="bq-fi"><Ic name={win ? 'check' : 'x'} s={16} c={win ? '#00e5a0' : '#ff6378'} /></div>
        <div className="bq-ft"><b>{fb[0]}</b><span>{fb[1]}</span></div>
      </div>
      <button className="bq-cta" onClick={onNext}>{last ? 'Ver resultado' : 'Continuar'} <Ic name="arrow" s={16} c="#04231a" /></button>
    </>
  )
}

/* Estilos del test (prefijo bq- para no chocar con el resto de la app) */
function Style() {
  return (
    <style>{`
    .bq-root{position:relative;min-height:100vh;min-height:100dvh;display:flex;justify-content:center;overflow:hidden;
      background:radial-gradient(130% 90% at 50% -10%,#0b1830 0%,#05070f 72%);
      font-family:'Outfit','Nunito',system-ui,sans-serif;color:#eaf2ff;}
    .bq-aura{position:fixed;border-radius:50%;filter:blur(10px);pointer-events:none;z-index:0}
    .bq-aura.a1{top:-70px;left:-50px;width:240px;height:240px;background:radial-gradient(circle,rgba(0,229,160,.22),transparent 65%)}
    .bq-aura.a2{bottom:-70px;right:-60px;width:260px;height:260px;background:radial-gradient(circle,rgba(139,124,248,.20),transparent 65%)}
    .bq-shell{position:relative;z-index:1;width:100%;max-width:460px;display:flex;flex-direction:column;flex:1;
      padding:max(env(safe-area-inset-top),16px) 18px 26px;min-height:100dvh}

    .bq-hud{display:flex;align-items:center;gap:10px;margin-bottom:12px}
    .bq-iconbtn{width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none}
    .bq-htitle{flex:1;min-width:0}
    .bq-htitle h1{font-family:'Sora','Outfit',sans-serif;font-size:16px;font-weight:600;letter-spacing:.01em;margin:0}
    .bq-htitle p{font-size:11.5px;color:#8aa0c0;margin:1px 0 0}
    .bq-chip{display:flex;align-items:center;gap:5px;padding:6px 11px;border-radius:99px;font-size:12px;font-weight:600;font-family:'Sora',sans-serif;background:rgba(245,159,11,.12);border:1px solid rgba(245,159,11,.3);color:#f5c451}
    .bq-pts{font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:#9fb6d6}
    .bq-bar{height:6px;border-radius:99px;background:#0c1830;overflow:hidden;margin-bottom:16px}
    .bq-bar > i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#00c8ff,#00e5a0);box-shadow:0 0 10px rgba(0,229,160,.6);transition:width .5s cubic-bezier(.4,0,.2,1)}

    .bq-stage{flex:1;display:flex;flex-direction:column;justify-content:center}
    .bq-card{border-radius:24px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);
      backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
      box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 18px 40px rgba(0,0,0,.32);padding:18px 16px}

    .bq-badgewrap{display:flex;justify-content:center;margin-bottom:18px}
    .bq-badge{display:inline-flex;align-items:center;gap:7px;padding:7px 15px;border-radius:99px;font-family:'Sora',sans-serif;font-size:11px;font-weight:600;letter-spacing:.07em;background:rgba(139,124,248,.14);border:1px solid rgba(139,124,248,.42);color:#c4b9ff}
    .bq-cat{display:flex;align-items:center;gap:8px;margin-bottom:13px}
    .bq-catic{width:34px;height:34px;border-radius:11px;background:rgba(0,200,255,.10);border:1px solid rgba(0,200,255,.28);display:flex;align-items:center;justify-content:center;font-size:17px;flex:none}
    .bq-catnm{font-family:'Sora',sans-serif;font-size:12px;font-weight:600;letter-spacing:.04em;color:#7fd3ff}
    .bq-qtext{font-size:15.5px;line-height:1.5;color:#f1f6ff;margin-bottom:16px}
    .bq-prompt{text-align:center;font-family:'Sora',sans-serif;font-size:13px;font-weight:600;color:#cdddf5;margin-bottom:14px}
    .bq-statement{text-align:center;font-family:'Sora',sans-serif;font-size:18.5px;font-weight:500;line-height:1.45;color:#f1f6ff;padding:8px 4px 4px}

    .bq-opts{display:flex;flex-direction:column;gap:10px}
    .bq-opt{display:flex;align-items:center;gap:11px;padding:13px;border-radius:15px;width:100%;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.10);cursor:pointer;transition:transform .12s ease,box-shadow .2s ease,opacity .2s ease,border-color .2s ease;color:inherit}
    .bq-opt:active{transform:scale(.985)}
    .bq-opt .bq-lt{width:25px;height:25px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#9fb6d6;flex:none;font-family:'Sora',sans-serif}
    .bq-opt span{font-size:13.5px;line-height:1.4;color:#dce8f7}
    .bq-opt.dim{opacity:.34}
    .bq-opt.win{background:linear-gradient(160deg,rgba(0,229,160,.14),rgba(0,229,160,.03));border-color:rgba(0,229,160,.55);box-shadow:0 8px 20px rgba(0,200,140,.16)}
    .bq-opt.win .bq-lt{background:rgba(0,229,160,.2);border-color:rgba(0,229,160,.45);color:#7ff0c8}
    .bq-opt.lose{background:linear-gradient(160deg,rgba(255,61,90,.12),rgba(255,61,90,.03));border-color:rgba(255,90,110,.55)}
    .bq-opt.lose .bq-lt{background:rgba(255,61,90,.2);border-color:rgba(255,90,110,.45);color:#ff8a9c}

    .bq-msg{background:linear-gradient(180deg,#0c1426,#0a101f);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:13px;display:flex;flex-direction:column;gap:9px;box-shadow:0 12px 24px rgba(0,0,0,.35)}
    .bq-msgtop{display:flex;align-items:center;gap:9px;padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,.06)}
    .bq-av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
    .bq-av.wa{background:linear-gradient(135deg,#1f7a5a,#125a6e)} .bq-av.sms{background:linear-gradient(135deg,#3a4a78,#2a3358)}
    .bq-nm{font-size:13px;font-weight:500} .bq-sub{font-size:11px;color:#7c8aa3}
    .bq-tag{margin-left:auto;font-size:10px;font-weight:600;letter-spacing:.06em;color:#7c8aa3;border:1px solid rgba(255,255,255,.1);padding:3px 7px;border-radius:7px}
    .bq-bubble{align-self:flex-start;max-width:93%;border-radius:14px 14px 14px 4px;padding:11px 12px;font-size:13.5px;line-height:1.55;color:#eaf3ff;box-shadow:0 4px 12px rgba(0,0,0,.3)}
    .bq-bubble.wa{background:linear-gradient(135deg,#1a2c49,#152138)} .bq-bubble.sms{background:linear-gradient(135deg,#222a44,#1a2036)}
    .bq-time{font-size:10.5px;color:#7c8aa3;padding-left:3px}

    .bq-answers{display:flex;gap:12px;margin-top:16px}
    .bq-ans{flex:1;min-height:60px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;border:1px solid;transition:transform .12s ease,box-shadow .2s ease,opacity .2s ease;font-family:'Sora',sans-serif;font-weight:600;font-size:13.5px;padding:8px;text-align:center;color:inherit}
    .bq-ans:active{transform:scale(.97)}
    .bq-ans.green{background:linear-gradient(160deg,rgba(0,229,160,.16),rgba(0,229,160,.04));border-color:rgba(0,229,160,.5);color:#7ff0c8;box-shadow:0 8px 20px rgba(0,200,140,.16)}
    .bq-ans.red{background:linear-gradient(160deg,rgba(255,61,90,.16),rgba(255,61,90,.04));border-color:rgba(255,90,110,.5);color:#ff8a9c;box-shadow:0 8px 20px rgba(255,61,90,.16)}
    .bq-ans.dim{opacity:.34} .bq-ans.win{box-shadow:0 0 0 2px rgba(0,229,160,.7),0 10px 26px rgba(0,200,140,.3)} .bq-ans.lose{box-shadow:0 0 0 2px rgba(255,90,110,.7)}
    .bq-ans span{font-size:13.5px}

    .bq-fb{margin-top:14px;border-radius:16px;padding:14px;display:flex;gap:11px;align-items:flex-start}
    .bq-fb.ok{background:rgba(0,229,160,.08);border:1px solid rgba(0,229,160,.3)} .bq-fb.no{background:rgba(255,61,90,.08);border:1px solid rgba(255,90,110,.32)}
    .bq-fi{flex:none;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center}
    .bq-fb.ok .bq-fi{background:rgba(0,229,160,.16)} .bq-fb.no .bq-fi{background:rgba(255,61,90,.16)}
    .bq-ft b{font-family:'Sora',sans-serif;font-size:13.5px;font-weight:600;display:block;margin-bottom:3px} .bq-fb.ok .bq-ft b{color:#7ff0c8} .bq-fb.no .bq-ft b{color:#ff8a9c}
    .bq-ft span{font-size:13px;line-height:1.5;color:#cdddf5}

    .bq-cta{margin-top:16px;width:100%;height:54px;border:none;border-radius:15px;cursor:pointer;font-family:'Sora',sans-serif;font-size:15px;font-weight:600;color:#04231a;display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#00e5a0,#10b981);box-shadow:0 10px 26px rgba(0,200,140,.4),inset 0 1px 0 rgba(255,255,255,.4)}
    .bq-cta:active{transform:scale(.99)}

    .bq-center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:14px 8px}
    .bq-kicker{font-size:11px;font-weight:600;letter-spacing:.24em;color:#00c8ff;text-transform:uppercase;margin-bottom:14px}
    .bq-introbadge{width:96px;height:96px;border-radius:28px;background:rgba(0,229,160,.10);border:1px solid rgba(0,229,160,.3);display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 16px 40px rgba(0,200,160,.2)}
    .bq-bigtitle{font-family:'Sora',sans-serif;font-size:27px;font-weight:700;line-height:1.18;letter-spacing:-.01em;margin-bottom:12px}
    .bq-grad{background:linear-gradient(100deg,#7ff0c8,#5ad2ff 60%,#a99bff);-webkit-background-clip:text;background-clip:text;color:transparent}
    .bq-lead{font-size:14px;line-height:1.6;color:#aebfd8;max-width:320px;margin-bottom:8px}
    .bq-meta{font-size:12px;color:#8aa0c0;margin:14px 0 26px;display:flex;gap:14px;align-items:center}
    .bq-meta b{color:#cdddf5;font-family:'Sora',sans-serif}
    .bq-back-link{margin-top:16px;background:none;border:none;color:#7e93b4;font-size:13px;cursor:pointer;font-family:inherit}

    @media (prefers-reduced-motion: reduce){.bq-bar > i{transition:none}}
    `}</style>
  )
}
