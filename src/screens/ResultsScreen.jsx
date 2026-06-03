import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LOGO_IM } from '../data/assets'

const fadeUp = (delay=0) => ({
  initial:   { opacity:0, y:16 },
  animate:   { opacity:1, y:0, transition:{ delay, duration:.4, ease:[.4,0,.2,1] } },
})

const AUX_ROWS = [
  ['1','BROU — Llamá al banco','1722 0001 · 24hs'],
  ['2','CERTuy — Incidentes digitales','1719 · 24hs'],
  ['3','Policía de inmediato','911'],
  ['4','Ministerio del Interior','0800 5050'],
  ['5','Denuncias online','denuncias.minterior.gub.uy'],
]

export default function ResultsScreen({ go, result }) {
  const [auxOpen, setAuxOpen] = useState(false)
  const { pct=0, hits=0, total=10, score=0 } = result || {}

  let col, lbl, desc
  if(pct >= 80) { col='#00e5a0'; lbl='BLINDADO';    desc='Excelente dominio sobre estafas digitales. Compartí este test con tu familia para protegerlos también.' }
  else if(pct >= 50) { col='#ffc844'; lbl='EN PROCESO'; desc='Tenés conocimiento básico pero hay puntos ciegos. Revisá los feedbacks y practicá más.' }
  else               { col='#ff3d5a'; lbl='VULNERABLE'; desc='Tu nivel de blindaje es bajo. Activá el doble factor de autenticación en todos tus dispositivos hoy.' }

  const arc    = 283
  const offset = (283 - (283 * pct / 100)).toFixed(1)

  const share = () => {
    if(navigator.share) navigator.share({ title:'Escudo Digital Familiar', text:'Hacé el test de blindaje digital y protegete de estafas.', url:window.location.href })
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Topbar */}
      <div className="glass flex items-center gap-3 px-4 sticky top-0 z-50 border-b border-white/[.06]"
        style={{ paddingTop:`calc(env(safe-area-inset-top,0px) + 12px)`, paddingBottom:'12px' }}>
        <button onClick={go.home} className="w-11 h-11 rounded-[12px] flex items-center justify-center text-t2 hover:text-cyan flex-shrink-0 transition-colors"
          style={{ background:'#142040', border:'1px solid rgba(0,200,255,.18)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="flex-1">
          <div className="font-bold text-[1rem] text-t1">Tus Resultados</div>
          <div className="text-t3 text-[.7rem] mt-[1px]">Test de Blindaje Digital</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-20 max-w-[520px] w-full mx-auto">

        {/* Score card */}
        <motion.div {...fadeUp(0)} className="rounded-3xl p-7 text-center mb-4 relative overflow-hidden"
          style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% -20%,rgba(0,200,255,.07),transparent 65%)' }} />

          {/* Arc */}
          <svg width="200" height="110" viewBox="-10 0 220 110" className="overflow-visible block mx-auto mb-3">
            <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="14" strokeLinecap="round"/>
            <motion.path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke={col} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={arc} initial={{ strokeDashoffset:arc }} animate={{ strokeDashoffset:offset }}
              transition={{ duration:1.4, ease:[.4,0,.2,1], delay:.2 }} />
          </svg>

          <motion.span className="block text-[3.8rem] font-black tracking-tighter leading-none mb-2" style={{ color:col }}
            initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.4, type:'spring', stiffness:200 }}>
            {pct}%
          </motion.span>
          <span className="block font-mono text-[.9rem] tracking-[.18em] uppercase font-bold mb-5" style={{ color:col }}>{lbl}</span>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[{val:hits,lbl:'Correctas',col:'#00e5a0'},{val:total-hits,lbl:'Incorrectas',col:'#ff3d5a'},{val:score,lbl:'Puntos',col:'#ffc844'}].map(s => (
              <div key={s.lbl} className="rounded-[12px] py-3 px-2 text-center" style={{ background:'#142040', border:'1px solid rgba(0,200,255,.08)' }}>
                <div className="text-[1.8rem] font-black" style={{ color:s.col }}>{s.val}</div>
                <div className="font-mono text-[.6rem] text-t3 uppercase tracking-wider mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>

          <div className="text-[.92rem] text-t2 leading-[1.7] p-4 rounded-[12px] text-left"
            style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(0,200,255,.08)' }}>
            {desc}
          </div>
        </motion.div>

        {/* Primeros Auxilios */}
        <motion.div {...fadeUp(.1)} className="rounded-2xl overflow-hidden mb-4" style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
          <button onClick={() => setAuxOpen(o => !o)}
            className="w-full flex items-center gap-3 p-4 hover:bg-white/[.02] transition-colors text-left">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ background:'rgba(0,200,255,.08)', border:'1px solid rgba(0,200,255,.18)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.12.96.32 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/></svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-[.92rem] text-t1">Primeros Auxilios Digitales</div>
              <div className="text-[.72rem] text-t3 mt-[2px]">Si te estafaron, hacé esto YA</div>
            </div>
            <motion.div animate={{ rotate: auxOpen ? 180 : 0 }} transition={{ duration:.3 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a6080" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.div>
          </button>
          <AnimatePresence>
            {auxOpen && (
              <motion.div initial={{ height:0 }} animate={{ height:'auto' }} exit={{ height:0 }} transition={{ duration:.35 }} className="overflow-hidden">
                <div className="px-4 pb-4 flex flex-col gap-2">
                  {AUX_ROWS.map(r => (
                    <div key={r[0]} className="flex items-center gap-3 p-3 rounded-[10px]" style={{ background:'#080f20', border:'1px solid rgba(0,200,255,.08)' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center font-mono text-[.65rem] font-semibold text-t3 flex-shrink-0"
                        style={{ background:'#142040', border:'1px solid rgba(0,200,255,.12)' }}>{r[0]}</div>
                      <div className="flex-1">
                        <div className="text-[.78rem] text-t2 mb-[2px]">{r[1]}</div>
                        <div className="font-mono text-[.95rem] font-semibold text-t1">{r[2]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* IM Card */}
        <motion.div {...fadeUp(.2)} className="rounded-2xl p-5 mb-4"
          style={{ background:'linear-gradient(135deg,rgba(230,51,18,.1),rgba(230,51,18,.04))', border:'1px solid rgba(230,51,18,.25)' }}>
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-[8px] font-mono text-[.62rem] font-bold text-[#e63312] tracking-wider uppercase mb-3"
            style={{ background:'rgba(230,51,18,.14)', border:'1px solid rgba(230,51,18,.28)' }}>
            IM · Intendencia de Montevideo
          </div>
          <div className="font-bold text-[1rem] text-t1 mb-1">Servicio de Atención a Personas Mayores</div>
          <div className="text-[.8rem] text-t2 mb-4 leading-relaxed">Si sufriste violencia, abuso, maltrato o una ciberestafa, podés comunicarte de forma gratuita y confidencial.</div>
          <div className="flex flex-col gap-2 mb-4">
            {[
              { lbl:'WhatsApp', val:'099 019 500', hrs:'Escribí la palabra "mayores"', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e63312" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
              { lbl:'Teléfono', val:'1950 5555', hrs:'L-V 8:00–19:00 · Sáb 8:00–14:00', icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e63312" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.12.96.32 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/></svg> }
            ].map(c => (
              <div key={c.lbl} className="flex items-center gap-3 p-3 rounded-[10px]" style={{ background:'rgba(0,0,0,.2)', border:'1px solid rgba(255,255,255,.06)' }}>
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(230,51,18,.1)', border:'1px solid rgba(230,51,18,.2)' }}>{c.icon}</div>
                <div>
                  <div className="font-mono text-[.6rem] text-t3 uppercase tracking-wider mb-[2px]">{c.lbl}</div>
                  <div className="font-bold text-[.97rem] text-t1">{c.val}</div>
                  <div className="text-[.7rem] text-t2 mt-[1px]">{c.hrs}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="https://montevideo.gub.uy/area-tematica/inclusion-social/personas-mayores/servicio-de-atencion-para-personas-mayores"
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-[12px] text-white font-bold text-[.9rem] transition-all active:scale-98"
            style={{ background:'#e63312' }}>
            Iniciar consulta en línea
          </a>
        </motion.div>

        {/* Action buttons */}
        <motion.div {...fadeUp(.3)} className="flex flex-col gap-3">
          <button onClick={share}
            className="flex items-center justify-center gap-2 w-full py-[17px] rounded-[14px] text-black font-bold text-[1rem] transition-all active:scale-98"
            style={{ background:'linear-gradient(135deg,#00c8ff,#0099cc)', boxShadow:'0 4px 20px rgba(0,200,255,.25)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Compartir con mi familia
          </button>
          <button onClick={go.quiz}
            className="w-full py-4 rounded-[14px] font-semibold text-[.95rem] text-t2 transition-all hover:text-t1 active:scale-98"
            style={{ background:'transparent', border:'1.5px solid rgba(0,200,255,.18)' }}>
            Volver a hacer el test
          </button>
        </motion.div>

        <footer className="text-center pt-8 pb-2 font-mono text-[.58rem] text-t3/60 tracking-wider leading-loose">
          ESCUDO DIGITAL FAMILIAR · PFC 2026<br/>
          EMANUEL LEONI · LDCV FADU UDELAR · MONTEVIDEO, URUGUAY
        </footer>
      </div>
    </div>
  )
}
