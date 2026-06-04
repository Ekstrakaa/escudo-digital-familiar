import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    const dots = Array.from({ length: 55 }, () => ({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height,
      vx:  (Math.random() - 0.5) * 0.28,
      vy:  (Math.random() - 0.5) * 0.28,
      r:   Math.random() * 1.6 + 0.4,
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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

function now() {
  const d = new Date()
  return d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0')
}

const EMERGENCY_NUMBERS = [
  { label: '🚨 911', sub: 'Policía', color: '#ef4444' },
  { label: '🕵️ 2030 4625', sub: 'Cibercrimen MI', color: '#00c8ff' },
  { label: '🟣 1950 5555', sub: 'IM Adultos', color: '#8b7cf8'  },
  { label: '🛡️ 1719', sub: 'CERTuy', color: '#10b981' },
  { label: '🏦 1722 0001', sub: 'BROU 24hs', color: '#f59e0b' },
]

function RobotAvatar({ typing }) {
  return (
    <div className="flex-shrink-0 w-9 h-9 relative">
      <motion.div
        animate={typing ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ repeat: typing ? Infinity : 0, duration: 0.8 }}
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f3460, #16213e)', border: '2px solid rgba(0,200,255,.35)' }}
      >
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
          {/* Head */}
          <rect x="8" y="10" width="24" height="20" rx="6" fill="#1e3a5f" stroke="#00c8ff" strokeWidth="1.5"/>
          {/* Eyes */}
          <motion.circle
            animate={typing ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
            transition={{ repeat: typing ? Infinity : 0, duration: 0.6, delay: 0 }}
            cx="15" cy="19" r="3" fill="#00c8ff"
          />
          <motion.circle
            animate={typing ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
            transition={{ repeat: typing ? Infinity : 0, duration: 0.6, delay: 0.3 }}
            cx="25" cy="19" r="3" fill="#00c8ff"
          />
          {/* Mouth */}
          <path d="M15 25 Q20 28 25 25" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          {/* Antenna */}
          <line x1="20" y1="10" x2="20" y2="6" stroke="#00c8ff" strokeWidth="1.5"/>
          <circle cx="20" cy="5" r="2" fill="#f59e0b"/>
          {/* Ears */}
          <rect x="4" y="17" width="4" height="6" rx="2" fill="#1e3a5f" stroke="#00c8ff" strokeWidth="1"/>
          <rect x="32" y="17" width="4" height="6" rx="2" fill="#1e3a5f" stroke="#00c8ff" strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>
  )
}

function BotBubble({ text, isTyping }) {
  const fmt = text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
  return (
    <div className="flex items-end gap-2 max-w-[90%] self-start">
      <RobotAvatar typing={false} />
      <div>
        <div className="rounded-2xl rounded-bl-[4px] px-4 py-3 text-[.95rem] leading-relaxed text-white whitespace-pre-wrap"
          style={{ background: 'linear-gradient(135deg, #0d2137, #0f2d4a)', border: '1px solid rgba(0,200,255,.2)', boxShadow: '0 4px 20px rgba(0,0,0,.3)' }}
          dangerouslySetInnerHTML={{ __html: fmt }}
        />
        <div className="text-[.6rem] text-slate-500 mt-1 pl-1">Asistente · {now()}</div>
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="max-w-[85%] self-end">
      <div className="rounded-2xl rounded-br-[4px] px-4 py-3 text-[.95rem] leading-relaxed font-medium text-white"
        style={{ background: 'linear-gradient(135deg, #0077aa, #00c8ff)', boxShadow: '0 4px 15px rgba(0,200,255,.25)' }}>
        {text}
      </div>
      <div className="text-[.6rem] text-slate-500 mt-1 text-right pr-1">{now()}</div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 max-w-[90%] self-start">
      <RobotAvatar typing={true} />
      <div className="rounded-2xl rounded-bl-[4px] px-5 py-4"
        style={{ background: 'linear-gradient(135deg, #0d2137, #0f2d4a)', border: '1px solid rgba(0,200,255,.2)' }}>
        <div className="flex gap-[5px] items-center">
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
              className="w-2 h-2 rounded-full"
              style={{ background: '#00c8ff' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatScreen({ go, seed }) {
  const [messages, setMessages] = useState([])
  const [typing, setTyping]     = useState(false)
  const [input, setInput]       = useState('')
  const [btnOff, setBtnOff]     = useState(false)
  const msgsRef = useRef(null)
  const taRef   = useRef(null)
  const historyRef = useRef([])

  const scrollDown = () => {
    setTimeout(() => {
      if(msgsRef.current) {
        msgsRef.current.scrollTo({ top: msgsRef.current.scrollHeight, behavior: 'smooth' })
      }
    }, 100)
  }

  const addBot = (text) => {
    setMessages(m => [...m, { role:'bot', text }])
    scrollDown()
  }

  const addUser = (text) => {
    setMessages(m => [...m, { role:'user', text }])
    scrollDown()
  }

  const sendMsg = async (text) => {
    if(!text?.trim()) return
    addUser(text)
    const newHistory = [...historyRef.current, { role:'user', content:text }]
    historyRef.current = newHistory
    setBtnOff(true)
    setTyping(true)
    scrollDown()

    let reply = null

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 20000)

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: newHistory.slice(0, -1) }),
        signal: controller.signal
      })
      clearTimeout(timeout)

      if(resp.ok) {
        const data = await resp.json()
        if(data && data.reply) reply = data.reply
      }
    } catch(e) {
      console.log('Error:', e)
    }

    historyRef.current = [...historyRef.current, { role:'assistant', content: reply || '' }]

    setTimeout(() => {
      setTyping(false)
      if(reply) {
        addBot(reply)
      } else {
        addBot('Lo siento, en este momento no puedo conectarme. Por favor intentá de nuevo en unos segundos.\n\nSi es una emergencia llamá al **911** o al **CERTuy: 1719**.')
      }
      setBtnOff(false)
    }, 400)
  }

  useEffect(() => {
    setTimeout(() => {
      addBot('¡Hola! 👋 Soy tu asistente digital de la **Intendencia de Montevideo**.\n\nEstoy acá para ayudarte ante cualquier situación de riesgo digital. Contame qué pasó o hacé clic en una de las opciones de abajo.')
    }, 300)
    if(seed) setTimeout(() => sendMsg(seed), 900)
  }, [])

  const handleSend = () => {
    const t = input.trim()
    if(!t) return
    setInput('')
    if(taRef.current) taRef.current.style.height = ''
    sendMsg(t)
  }

  return (
    <div className="flex flex-col min-h-screen max-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #050d1a 0%, #071525 50%, #050d1a 100%)' }}>
      {/* Partículas RGB de fondo */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Particles />
      </div>

      {/* Todo el contenido sobre las partículas */}
      {/* Topbar */}
      <div className="flex items-center gap-3 px-4 sticky top-0 z-50 border-b"
        style={{ paddingTop:`calc(env(safe-area-inset-top,0px) + 12px)`, paddingBottom:'12px',
          background: 'rgba(5,13,26,.95)', borderColor: 'rgba(0,200,255,.12)',
          backdropFilter: 'blur(20px)' }}>
        <button onClick={go.home}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:text-cyan-400 flex-shrink-0"
          style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <RobotAvatar typing={typing} />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[.98rem] text-white">Asistente Digital</div>
          <div className="flex items-center gap-[5px] text-[.68rem] text-slate-400 mt-[1px]">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: '#10b981' }}
            />
            En línea · Intendencia de Montevideo
          </div>
        </div>
      </div>

      {/* Emergency numbers bar */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto" style={{ background: 'rgba(0,0,0,.2)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        {EMERGENCY_NUMBERS.map((n, i) => (
          <a key={i} href={`tel:${n.label.replace(/\D/g,'')}`}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white no-underline transition-all active:scale-95"
            style={{ background: `${n.color}22`, border: `1px solid ${n.color}55`, fontSize: '.72rem' }}>
            <span className="font-bold" style={{ color: n.color }}>{n.label}</span>
            <span className="text-slate-400">{n.sub}</span>
          </a>
        ))}
      </div>

      {/* Messages */}
      <div ref={msgsRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 relative" style={{ zIndex: 1 }}>

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.25 }}>
              {m.role === 'bot' ? <BotBubble text={m.text} /> : <UserBubble text={m.text} />}
            </motion.div>
          ))}

          {typing && (
            <motion.div key="typing" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      {/* Input */}
      <div className="px-4 py-3 flex gap-3 items-end"
        style={{ background:'rgba(5,13,26,.85)', borderTop:'1px solid rgba(255,255,255,.06)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', position:'relative', zIndex: 2,
          paddingBottom:`calc(env(safe-area-inset-bottom,0px) + 12px)` }}>
        <div className="flex-1 rounded-2xl px-4 py-3 transition-all"
          style={{ background:'rgba(255,255,255,.05)', border:'1.5px solid rgba(0,200,255,.2)' }}>
          <div className="font-mono text-[.55rem] text-cyan-500/50 tracking-widest uppercase mb-1">Tu consulta</div>
          <textarea
            ref={taRef}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height='auto'
              e.target.style.height=Math.min(e.target.scrollHeight,100)+'px'
            }}
            onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); handleSend() }}}
            rows={1}
            placeholder="Contame qué pasó..."
            className="w-full bg-transparent outline-none resize-none text-white font-sans text-[.97rem] leading-relaxed placeholder:text-slate-600"
            style={{ minHeight:'24px', maxHeight:'100px' }}
          />
        </div>
        <motion.button
          onClick={handleSend}
          disabled={btnOff}
          whileTap={{ scale: 0.92 }}
          className="w-[52px] h-[52px] flex-shrink-0 rounded-[14px] flex items-center justify-center transition-all text-white disabled:opacity-40"
          style={{ background:'linear-gradient(135deg, #0099cc, #00c8ff)', boxShadow:'0 4px 20px rgba(0,200,255,.3)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
