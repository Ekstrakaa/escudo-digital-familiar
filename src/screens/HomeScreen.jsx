import { motion } from 'framer-motion'
import { LOGO_IM } from '../data/assets'

const SITUATIONS = [
  { id:'bank',    color:'#ff3d5a', bg:'rgba(255,61,90,.12)',   border:'rgba(255,61,90,.2)',   label:'Llamada del banco',   sub:'Me piden datos o clave',        msg:'Me llamaron del banco y me pidieron mi clave, ¿qué hago?',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3d5a" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.12.96.32 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/></svg> },
  { id:'sms',     color:'#ffc844', bg:'rgba(255,200,68,.12)',   border:'rgba(255,200,68,.2)',   label:'SMS sospechoso',      sub:'Con link o pedido raro',         msg:'Me llegó un SMS con un link sospechoso, ¿qué hago?',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffc844" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id:'wa',      color:'#00e5a0', bg:'rgba(0,229,160,.12)',    border:'rgba(0,229,160,.2)',    label:'Código WhatsApp',     sub:'Me lo están pidiendo',           msg:'Me piden el código de 6 dígitos de WhatsApp, ¿qué hago?',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1.2" fill="#00e5a0"/></svg> },
  { id:'scam',    color:'#ff6b35', bg:'rgba(255,107,53,.12)',   border:'rgba(255,107,53,.2)',   label:'Caí en una estafa',   sub:'¿Qué hago ahora?',              msg:'Creo que caí en una estafa y me robaron dinero, ¿qué hago?',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round"/></svg> },
  { id:'door',    color:'#ff3d5a', bg:'rgba(255,61,90,.12)',    border:'rgba(255,61,90,.2)',    label:'Persona en la puerta', sub:'Pide datos o dinero',           msg:'Hay una persona en la puerta de mi casa que dice ser del banco y me pide mis datos y dinero, ¿qué hago?',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3d5a" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id:'family',  color:'#8b7cf8', bg:'rgba(139,124,248,.12)',  border:'rgba(139,124,248,.2)',  label:'Proteger familiar',   sub:'Guía para tu familia',          msg:'¿Cómo protejo a mi familiar mayor de los fraudes digitales?',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b7cf8" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
]

const NUMBERS = [
  { label:'Policía', val:'911', color:'var(--red-500, #ff3d5a)', desc:'Emergencias', bg:'rgba(255,61,90,.1)', border:'rgba(255,61,90,.18)',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff3d5a" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.12.96.32 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6z"/></svg> },
  { label:'CERTuy — Incidentes digitales', val:'1719', color:'#00c8ff', desc:'24 horas', bg:'rgba(0,200,255,.1)', border:'rgba(0,200,255,.18)',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="1.8"><path d="M12 2L20 6v6c0 5.5-3.5 10.7-8 12-4.5-1.3-8-6.5-8-12V6z"/></svg> },
  { label:'BROU — Bloquear cuenta', val:'1722 0001', color:'#00e5a0', desc:'24 horas', bg:'rgba(0,229,160,.1)', border:'rgba(0,229,160,.18)',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
  { label:'Min. Interior — Denuncias', val:'0800 5050', color:'#ffc844', desc:'denuncias.minterior.gub.uy', bg:'rgba(255,200,68,.1)', border:'rgba(255,200,68,.18)',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffc844" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
  { label:'Intendencia de Montevideo', val:'1950 5555', color:'#e63312', desc:'WhatsApp 099 019 500 · escribí "mayores"', bg:'rgba(230,51,18,.1)', border:'rgba(230,51,18,.18)',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e63312" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
]

const stagger = { animate: { transition: { staggerChildren: .07 } } }
const item    = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }

export default function HomeScreen({ go }) {
  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-[520px] px-4 pb-20">

        {/* Hero */}
        <motion.div className="text-center pt-10 pb-8" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5 }}>
          <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <motion.div className="absolute inset-0 rounded-full" style={{ background:'radial-gradient(circle,rgba(0,200,255,.22) 0%,transparent 70%)' }} animate={{ scale:[1,1.1,1], opacity:[.6,1,.6] }} transition={{ duration:3, repeat:Infinity }} />
            <div className="absolute inset-0 rounded-full border border-cyan/20 animate-pulse-glow" />
            <div className="absolute -inset-3 rounded-full border border-cyan/08" />
            <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,rgba(0,200,255,.15),rgba(0,229,160,.08))', border:'1px solid rgba(0,200,255,.25)' }}>
              <svg width="34" height="34" viewBox="0 0 52 52" fill="none">
                <path d="M26 4L44 12V28C44 38 26 48 26 48C26 48 8 38 8 28V12L26 4Z" fill="rgba(0,200,255,.12)" stroke="#00c8ff" strokeWidth="1.5" strokeLinejoin="round"/>
                <rect x="20" y="27" width="12" height="10" rx="2.5" fill="rgba(0,229,160,.15)" stroke="#00e5a0" strokeWidth="1.4"/>
                <path d="M23 27V24C23 21.8 29 21.8 29 24V27" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <circle cx="26" cy="32" r="1.5" fill="#00e5a0"/>
              </svg>
            </div>
          </div>

          <h1 className="text-[2rem] font-black tracking-tight leading-[1.05] mb-3">
            Escudo<br />
            Digital <span className="text-gradient">Familiar</span>
          </h1>
          <p className="text-t2 text-[.95rem] leading-relaxed max-w-[260px] mx-auto mb-4">
            Tu herramienta de orientación ante estafas digitales, disponible 24/7.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[.72rem] font-semibold text-green" style={{ background:'rgba(0,229,160,.08)', border:'1px solid rgba(0,229,160,.2)' }}>
            <div className="w-[6px] h-[6px] rounded-full bg-green animate-live" />
            Programa de Inclusión Digital · IM
          </div>
        </motion.div>

        {/* SOS Button — rojo */}
        <motion.button
          initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.15, duration:.4 }}
          whileTap={{ scale:.97 }}
          onClick={() => go.chat()}
          className="relative overflow-hidden w-full flex items-center justify-center gap-4 px-6 py-[22px] rounded-2xl text-white font-black text-[1.15rem] mb-3 glow-red"
          style={{ background:'linear-gradient(135deg,#ff1a3a,#cc0022)', boxShadow:'0 8px 40px rgba(255,29,58,.4),0 2px 0 rgba(255,100,120,.3) inset' }}
        >
          <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 50%)' }} />
          <motion.div className="w-3 h-3 rounded-full bg-white flex-shrink-0" animate={{ boxShadow:['0 0 0 0 rgba(255,255,255,.7)','0 0 0 10px rgba(255,255,255,0)','0 0 0 0 rgba(255,255,255,0)'] }} transition={{ duration:1.4, repeat:Infinity }} />
          <span className="relative">Necesito ayuda ahora</span>
          <svg className="relative opacity-80 flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.button>

        {/* Test de Blindaje — celeste */}
        <motion.button
          initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.2, duration:.4 }}
          whileTap={{ scale:.97 }}
          onClick={() => go.quiz()}
          className="relative overflow-hidden w-full flex items-center justify-center gap-4 px-6 py-[22px] rounded-2xl font-black text-[1.15rem] mb-4"
          style={{ background:'linear-gradient(135deg,#0099cc,#006699)', boxShadow:'0 8px 40px rgba(0,200,255,.3),0 2px 0 rgba(0,230,255,.2) inset', color:'#fff' }}
        >
          <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,rgba(255,255,255,.12) 0%,transparent 50%)' }} />
          <svg className="relative flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <span className="relative">Test de Blindaje</span>
          <svg className="relative opacity-80 flex-shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.button>

        {/* Section label */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.25 }} className="flex items-center gap-3 font-mono text-[.65rem] text-t3 tracking-[.14em] uppercase mb-4 mt-2">
          <span>¿Qué te está pasando?</span>
          <div className="flex-1 h-px" style={{ background:'rgba(0,200,255,.1)' }} />
        </motion.div>

        {/* Situation grid */}
        <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-2 gap-3 mb-2">
          {SITUATIONS.map(sit => (
            <motion.button key={sit.id} variants={item} whileTap={{ scale:.96 }}
              onClick={() => go.chat(sit.msg)}
              className="text-left flex flex-col gap-3 p-4 rounded-[18px] min-h-[110px] transition-all duration-200 active:brightness-90"
              style={{ background:`linear-gradient(135deg,${sit.bg},rgba(15,29,53,.8))`, border:`1px solid ${sit.border}` }}
            >
              <div className="w-11 h-11 rounded-[11px] flex items-center justify-center flex-shrink-0 transition-transform" style={{ background:sit.bg, border:`1px solid ${sit.border}` }}>
                {sit.icon}
              </div>
              <div>
                <div className="text-[.88rem] font-bold leading-tight text-t1">{sit.label}</div>
                <div className="text-[.7rem] text-t3 mt-1 leading-snug">{sit.sub}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Emergency numbers */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4 }}>
          <div className="flex items-center gap-3 font-mono text-[.65rem] text-t3 tracking-[.14em] uppercase mb-4 mt-7">
            <span>Números de emergencia</span>
            <div className="flex-1 h-px" style={{ background:'rgba(0,200,255,.1)' }} />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background:'#0f1d35', border:'1px solid rgba(0,200,255,.1)' }}>
            {NUMBERS.map((n, i) => (
              <div key={n.val} className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[.02] transition-colors ${i < NUMBERS.length-1 ? 'border-b border-white/[.05]' : ''}`}>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background:n.bg, border:`1px solid ${n.border}` }}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[.82rem] font-semibold text-t1 mb-[2px]">{n.label}</div>
                  <div className="font-mono text-[1.08rem] font-semibold" style={{ color:n.color }}>{n.val}</div>
                  {n.desc && <div className="text-[.68rem] text-t3 mt-[2px]">{n.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* IM panel */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5 }}
          className="mt-5 rounded-2xl p-5 text-center"
          style={{ background:'linear-gradient(135deg,rgba(230,51,18,.09),rgba(230,51,18,.04))', border:'1px solid rgba(230,51,18,.22)' }}
        >
          <img src={LOGO_IM} alt="Intendencia de Montevideo" className="h-7 mx-auto mb-3" style={{ filter:'invert(1)', opacity:.65 }} />
          <p className="text-[.78rem] text-t2 leading-relaxed">
            Programa de Inclusión Digital para Personas Mayores<br />
            <a href="https://montevideo.gub.uy/area-tematica/inclusion-social/personas-mayores/programa-de-inclusion-digital" target="_blank" rel="noreferrer" className="text-[#e63312] font-semibold hover:underline">
              montevideo.gub.uy
            </a>
          </p>
        </motion.div>

        <footer className="text-center pt-7 pb-2 font-mono text-[.58rem] text-t3/60 tracking-wider leading-loose">
          ESCUDO DIGITAL FAMILIAR &middot; PFC 2026<br />
          EMANUEL LEONI &middot; LDCV FADU UDELAR &middot; MONTEVIDEO, URUGUAY
        </footer>

      </div>
    </div>
  )
}
