import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function now() {
  const d = new Date()
  return d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0')
}

function BotBubble({ text }) {
  const fmt = text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
  return (
    <div className="msg-in max-w-[88%] self-start">
      <div className="rounded-2xl rounded-bl-[4px] px-4 py-[13px] text-[.97rem] leading-relaxed text-t1 whitespace-pre-wrap"
        style={{ background:'#142040', border:'1px solid rgba(0,200,255,.1)' }}
        dangerouslySetInnerHTML={{ __html: fmt }}
      />
      <div className="text-[.62rem] text-t3 mt-[5px] pl-1">Asistente · {now()}</div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="msg-in max-w-[88%] self-end">
      <div className="rounded-2xl rounded-br-[4px] px-4 py-[13px] text-[.97rem] leading-relaxed font-medium text-black"
        style={{ background:'linear-gradient(135deg,#00c8ff,#0099cc)' }}>
        {text}
      </div>
      <div className="text-[.62rem] text-t3 mt-[5px] text-right pr-1">{now()}</div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="msg-in max-w-[88%] self-start">
      <div className="rounded-2xl rounded-bl-[4px] px-5 py-[15px]" style={{ background:'#142040', border:'1px solid rgba(0,200,255,.1)' }}>
        <div className="flex gap-[5px] items-center">
          {[0,1,2].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full bg-t3 dot-${i+1}`} />
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
      if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }, 60)
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

    let reply = null

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)

      const resp = await fetch('/.netlify/functions/chat', {
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
      console.log('Error al conectar con el asistente:', e)
    }

    historyRef.current = [...historyRef.current, { role:'assistant', content: reply || '' }]

    setTimeout(() => {
      setTyping(false)
      if(reply) {
        addBot(reply)
      } else {
        addBot('Lo siento, en este momento no puedo conectarme. Por favor intentá de nuevo en unos segundos.\n\nSi es una emergencia llamá al 911 o al CERTuy: 1719.')
      }
      setBtnOff(false)
    }, 400)
  }

  useEffect(() => {
    setTimeout(() => {
      addBot('¡Hola! Soy el asistente digital del Programa de Inclusión Digital de la Intendencia de Montevideo.\n\nEstoy acá para orientarte ante cualquier situación de riesgo digital. Contame qué pasó o preguntá lo que necesitás.\n\n¿En qué te puedo ayudar?')
    }, 200)
    if(seed) setTimeout(() => sendMsg(seed), 800)
  }, [])

  const handleSend = () => {
    const t = input.trim()
    if(!t) return
    setInput('')
    if(taRef.current) taRef.current.style.height = ''
    sendMsg(t)
  }

  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-bg">
      {/* Topbar */}
      <div className="glass flex items-center gap-3 px-4 sticky top-0 z-50 border-b border-white/[.06]"
        style={{ paddingTop:`calc(env(safe-area-inset-top,0px) + 12px)`, paddingBottom:'12px' }}>
        <button onClick={go.home}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center text-t2 transition-all hover:text-cyan hover:border-cyan/50 flex-shrink-0"
          style={{ background:'#142040', border:'1px solid rgba(0,200,255,.18)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[1rem] text-t1">Asistente Digital</div>
          <div className="flex items-center gap-[5px] text-[.7rem] text-t3 mt-[1px]">
            <div className="w-[6px] h-[6px] rounded-full bg-green animate-live flex-shrink-0" />
            En línea · Intendencia de Montevideo
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={msgsRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:.25 }}>
              {m.role === 'bot' ? <BotBubble text={m.text} /> : <UserBubble text={m.text} />}
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex gap-3 items-end border-t border-white/[.06]"
        style={{ background:'rgba(5,10,24,.97)', paddingBottom:`calc(env(safe-area-inset-bottom,0px) + 12px)` }}>
        <div className="flex-1 rounded-[16px] px-4 py-3 transition-all"
          style={{ background:'#0f1d35', border:'2px solid rgba(0,200,255,.25)' }}
          onFocus={e => e.currentTarget.style.borderColor='#00c8ff'}
          onBlur={e => e.currentTarget.style.borderColor='rgba(0,200,255,.25)'}
        >
          <div className="font-mono text-[.58rem] text-cyan/50 tracking-widest uppercase mb-1">Tu consulta</div>
          <textarea ref={taRef} value={input} onChange={e => { setInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,100)+'px' }}
            onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); handleSend() }}}
            rows={1} placeholder="Contame qué pasó..."
            className="w-full bg-transparent outline-none resize-none text-t1 font-sans text-[1rem] leading-relaxed placeholder:text-t3"
            style={{ minHeight:'24px', maxHeight:'100px' }}
          />
        </div>
        <button onClick={handleSend} disabled={btnOff}
          className="w-[52px] h-[52px] flex-shrink-0 rounded-[14px] flex items-center justify-center transition-all text-black active:scale-94 disabled:opacity-50"
          style={{ background:'#00c8ff', boxShadow:'0 4px 20px rgba(0,200,255,.35)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  )
}
