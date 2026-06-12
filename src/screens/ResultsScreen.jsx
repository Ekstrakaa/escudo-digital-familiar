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

  let col, col2, lbl, desc
  if(pct >= 80) { col='#00e5a0'; col2='#34f5c0'; lbl='BLINDADO';    desc='Excelente dominio sobre estafas digitales. Compartí este test con tu familia para protegerlos también.' }
  else if(pct >= 50) { col='#ffc844'; col2='#ffd97a'; lbl='EN PROCESO'; desc='Tenés conocimiento básico pero hay puntos ciegos. Revisá los feedbacks y practicá más.' }
  else               { col='#ff3d5a'; col2='#ff7a8f'; lbl='VULNERABLE'; desc='Tu nivel de blindaje es bajo. Activá el doble factor de autenticación en todos tus dispositivos hoy.' }

  const C = 527.79

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
        <motion.div {...fadeUp(0)} className="rounded-3xl p-6 text-center mb-4 relative overflow-hidden"
          style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at 50% -10%, ${col}1f, transparent 60%)` }} />

          {/* Anillo de puntaje */}
          <div className="relative mx-auto mb-4" style={{ width:196, height:196 }}>
            <svg width="196" height="196" viewBox="0 0 200 200" className="block">
              <defs>
                <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={col2} />
                  <stop offset="100%" stopColor={col} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="14" />
              <motion.circle cx="100" cy="100" r="84" fill="none" stroke="url(#gaugeGrad)" strokeWidth="14" strokeLinecap="round"
                transform="rotate(-90 100 100)" strokeDasharray={C}
                initial={{ strokeDashoffset:C }} animate={{ strokeDashoffset: C - C * pct / 100 }}
                transition={{ duration:1.4, ease:[.4,0,.2,1], delay:.2 }}
                style={{ filter:`drop-shadow(0 0 7px ${col}aa)` }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span className="text-[3.3rem] font-black leading-none tracking-tighter" style={{ color:col }}
                initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.5, type:'spring', stiffness:200 }}>
                {pct}%
              </motion.span>
              <span className="font-mono text-[.68rem] tracking-[.2em] uppercase font-bold mt-1.5" style={{ color:col }}>{lbl}</span>
            </div>
          </div>

          <div className="text-[.82rem] text-t3 mb-5">Acertaste {hits} de {total} situaciones</div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { val:hits, lbl:'Correctas', col:'#00e5a0', icon:<path d="M20 6L9 17l-5-5"/> },
              { val:total-hits, lbl:'Incorrectas', col:'#ff3d5a', icon:<path d="M18 6L6 18M6 6l12 12"/> },
              { val:score, lbl:'Puntos', col:'#ffc844', icon:<path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z"/> },
            ].map(s => (
              <div key={s.lbl} className="rounded-2xl py-4 px-1.5 text-center"
                style={{ background:`linear-gradient(180deg, ${s.col}14, rgba(20,32,64,.45))`, border:`1px solid ${s.col}33` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={s.col} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1.5">{s.icon}</svg>
                <div className="text-[1.7rem] font-black leading-none" style={{ color:s.col }}>{s.val}</div>
                <div className="font-mono text-[.55rem] text-t3 uppercase tracking-wider mt-1.5">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Recomendación */}
          <div className="flex items-start gap-3 p-4 rounded-2xl text-left"
            style={{ background:`${col}10`, border:`1px solid ${col}30` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-[1px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div className="text-[.9rem] text-t2 leading-[1.65]">{desc}</div>
          </div>
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
