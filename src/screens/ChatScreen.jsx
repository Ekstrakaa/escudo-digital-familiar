import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VOICE_KEY = 'edf_voice'
const JUNK_VOICE = /shelley|grandma|grandpa|rocko|flo|sandy|eddy|reed|junior|kathy|ralph|fred|albert|bahh|bells|boing|bubbles|cellos|wobble|jester|organ|superstar|trinoids|whisper|zarvox|good news|bad news|novelty/i
function spanishVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  const all = window.speechSynthesis.getVoices().filter(v => (/^es/i.test(v.lang) || /español|spanish/i.test(v.name)) && !JUNK_VOICE.test(v.name))
  const seen = new Set()
  return all.filter(v => { const k = v.name.toLowerCase().trim(); if (seen.has(k)) return false; seen.add(k); return true })
}
function bestVoice(list) {
  const score = v => {
    const n = (v.name + ' ' + v.lang).toLowerCase()
    let s = 0
    if (n.includes('google')) s += 6
    if (n.includes('microsoft')) s += 4
    if (/m[oó]nica|paulina|jorge|juan|diego|marisol|catalina|enhanced|natural|premium|neural|wavenet/.test(n)) s += 6
    if (v.localService === false) s += 2
    if (/es-(es|us|mx|419)/.test(v.lang.toLowerCase())) s += 1
    if (/espeak|compact|default|veena|albert|fred/.test(n)) s -= 6
    return s
  }
  return [...list].sort((a, b) => score(b) - score(a))[0] || null
}
function chosenVoice() {
  const list = spanishVoices()
  if (!list.length) return null
  let saved = null
  try { saved = localStorage.getItem(VOICE_KEY) } catch {}
  if (saved) { const m = list.find(v => v.voiceURI === saved); if (m) return m }
  return bestVoice(list)
}

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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
}

function now() {
  const d = new Date()
  return d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0')
}

const EMERGENCY_NUMBERS = [
  { label: '🚨 911', sub: 'Policía', color: '#ef4444' },
  { label: '🕵️ 2030 4625', sub: 'Cibercrimen MI', color: '#00c8ff' },
  { label: '🏦 1722 0001', sub: 'BROU 24hs', color: '#f59e0b' },
  { label: '🛡️ 1719', sub: 'CERTuy', color: '#10b981' },
  { label: '🟣 1950 5555', sub: 'IM Adultos', color: '#8b7cf8' },
]

function RobotAvatar({ typing }) {
  return (
    <div className="flex-shrink-0 relative" style={{ width:58, height:58 }}>
      <motion.div
        animate={typing ? { scale:[1, 1.06, 1] } : { scale:1 }}
        transition={{ repeat: typing ? Infinity : 0, duration:1, ease:'easeInOut' }}
        style={{ width:58, height:58 }}
      >
        <svg width="46" height="46" viewBox="0 0 110 110" fill="none">
          {/* Sombra */}
          <ellipse cx="57" cy="84" rx="24" ry="6" fill="#050810" opacity="0.5"/>
          {/* Cabeza redonda */}
          <circle cx="55" cy="52" r="38" fill="#0f2a20" stroke="#00E5A0" strokeWidth="2"/>
          {/* Brillo 3D */}
          <ellipse cx="43" cy="28" rx="14" ry="8" fill="rgba(255,255,255,.08)"/>
          {/* Pantalla cara */}
          <circle cx="55" cy="52" r="30" fill="#071a10"/>
          {/* Ojos */}
          <circle cx="40" cy="47" r="11" fill="#00E5A0" opacity="0.9"/>
          <circle cx="40" cy="47" r="7" fill="#071a10"/>
          <motion.circle
            animate={typing ? { opacity:[1,0.2,1] } : { opacity:1 }}
            transition={{ repeat: typing ? Infinity : 0, duration:0.8 }}
            cx="40" cy="47" r="4" fill="#00E5A0"
          />
          <circle cx="42" cy="44" r="2.5" fill="white" opacity="0.9"/>
          <circle cx="70" cy="47" r="11" fill="#00E5A0" opacity="0.9"/>
          <circle cx="70" cy="47" r="7" fill="#071a10"/>
          <motion.circle
            animate={typing ? { opacity:[1,0.2,1] } : { opacity:1 }}
            transition={{ repeat: typing ? Infinity : 0, duration:0.8, delay:0.1 }}
            cx="70" cy="47" r="4" fill="#00E5A0"
          />
          <circle cx="72" cy="44" r="2.5" fill="white" opacity="0.9"/>
          {/* Boca */}
          {!typing && (
            <path d="M40 63 Q55 73 70 63" stroke="#00E5A0" strokeWidth="3" strokeLinecap="round" fill="none"/>
          )}
          {typing && (
            <>
              <motion.circle animate={{ opacity:[1,.2,1] }} transition={{ duration:.5, repeat:Infinity, delay:0 }} cx="44" cy="67" r="3" fill="#00E5A0"/>
              <motion.circle animate={{ opacity:[1,.2,1] }} transition={{ duration:.5, repeat:Infinity, delay:.15 }} cx="55" cy="67" r="3" fill="#00E5A0"/>
              <motion.circle animate={{ opacity:[1,.2,1] }} transition={{ duration:.5, repeat:Infinity, delay:.3 }} cx="66" cy="67" r="3" fill="#00E5A0"/>
            </>
          )}
          {/* Cachetes */}
          <circle cx="25" cy="58" r="7" fill="#00E5A0" opacity="0.15"/>
          <circle cx="85" cy="58" r="7" fill="#00E5A0" opacity="0.15"/>
          {/* Orejas */}
          <circle cx="16" cy="52" r="7" fill="#0f2a20" stroke="#00E5A0" strokeWidth="1.5"/>
          <circle cx="94" cy="52" r="7" fill="#0f2a20" stroke="#00E5A0" strokeWidth="1.5"/>
        </svg>
      </motion.div>
      {/* Punto online */}
      <div style={{ position:'absolute', bottom:1, right:1, width:10, height:10, borderRadius:'50%', background:'#00e5a0', border:'2px solid #050d1a' }} />
    </div>
  )
}


function cleanForSpeech(t) {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/[•·▪]/g, ' ').replace(/\s+/g, ' ').trim()
}

function BotBubble({ text, isTyping }) {
  // Formatear texto — párrafos, negritas, pasos numerados
  const fmt = text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    // Negritas en verde
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#00E5A0;font-size:1rem">$1</strong>')
    // Párrafos doble salto
    .replace(/\n\n/g,'</p><p style="margin:10px 0 0 0">')
    // Pasos numerados — cada uno destacado
    .replace(/\n(\d+)\.\s/g, '</p><p style="margin:10px 0 0 0"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#00E5A0;color:#000;font-weight:800;font-size:.78rem;margin-right:8px;flex-shrink:0">$1</span>')
    // Salto simple
    .replace(/\n/g,'<br/>')
    // Emoji 💡 en su propia línea destacada
    .replace(/💡/g,'<br/><span style="color:#f59e0b;font-size:.9rem">💡</span>')

  const [speaking, setSpeaking] = useState(false)
  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(cleanForSpeech(text))
    u.rate = 0.95; u.pitch = 1
    const v = chosenVoice()
    if (v) { u.voice = v; u.lang = v.lang } else { u.lang = 'es-ES' }
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="flex items-start gap-3 w-full self-start">
      <div className="flex-shrink-0 mt-1"><RobotAvatar typing={false} /></div>
      <div className="flex-1 min-w-0">
        {/* Burbuja */}
        <div className="relative">
          <div style={{
            position:'absolute', left:-7, top:14,
            width:0, height:0,
            borderTop:'7px solid transparent',
            borderRight:'8px solid #1a2a3a',
            borderBottom:'7px solid transparent',
          }} />
          <div
            className="rounded-2xl rounded-tl-[4px] px-4 py-4 text-white"
            style={{
              background:'#1a2a3a',
              boxShadow:'0 2px 8px rgba(0,0,0,.3)',
              fontSize:'.97rem',
              lineHeight:'1.8',
              wordBreak:'break-word',
              fontFamily:"'Outfit',sans-serif",
            }}
            dangerouslySetInnerHTML={{ __html: '<p style="margin:0">' + fmt + '</p>' }}
          />
        </div>
        <div className="flex items-center gap-2 mt-1 pl-1">
          <span className="text-[.6rem] text-slate-500">Asistente · {now()}</span>
          <button onClick={speak} aria-label={speaking ? 'Detener lectura' : 'Escuchar en voz alta'}
            style={{ display:'inline-flex', alignItems:'center', gap:5, height:26, padding:'0 11px', borderRadius:99, border:'1px solid rgba(0,229,160,.4)', background:'rgba(0,229,160,.12)', color:'#00E5A0', fontSize:'.72rem', fontWeight:800, cursor:'pointer', fontFamily:"'Nunito',sans-serif" }}>
            {speaking
              ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>Detener</>
              : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>Escuchar</>}
          </button>
        </div>
      </div>
    </div>
  )
}

function UserBubble({ text }) {
  return (
    <div className="w-[92%] self-end">
      <div className="relative">
        {/* Triángulo esquina derecha */}
        <div style={{
          position:'absolute', right:-7, bottom:8,
          width:0, height:0,
          borderTop:'8px solid transparent',
          borderLeft:'8px solid #00b377',
          borderBottom:'0 solid transparent',
        }} />
        <div
          className="rounded-2xl rounded-br-[4px] px-4 py-3 text-[.95rem] leading-relaxed font-medium text-black"
          style={{
            background:'linear-gradient(135deg, #059669, #00E5A0)',
            boxShadow:'0 1px 4px rgba(0,0,0,.3)',
          }}
        >
          {text}
        </div>
      </div>
      <div className="text-[.6rem] text-slate-500 mt-1 text-right pr-1 flex items-center justify-end gap-1">
        {now()}
        {/* Ticks de lectura estilo WhatsApp */}
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M1 5l3 3 5-7" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 5l3 3 5-7" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 w-full self-start">
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
              style={{ background: '#00E5A0' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MicButton({ onTranscript, disabled }) {
  const [recording, setRecording] = useState(false)
  const [loading, setLoading]     = useState(false)
  const mediaRef  = useRef(null)
  const chunksRef = useRef([])

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      const mr = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4' })
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        setLoading(true)
        try {
          const blob = new Blob(chunksRef.current, { type: mr.mimeType })
          // Convertir a base64 para mandar al backend seguro
          const reader = new FileReader()
          reader.onload = async (e) => {
            const base64 = e.target.result.split(',')[1]
            const resp = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64, mimeType: mr.mimeType }),
            })
            const data = await resp.json()
            if (data?.text) onTranscript(data.text)
            setLoading(false)
          }
          reader.readAsDataURL(blob)
        } catch(e) {
          console.error('Transcribe error:', e)
          setLoading(false)
        }
      }
      mr.start()
      mediaRef.current = mr
      setRecording(true)
    } catch(e) {
      alert('No se pudo acceder al micrófono. Activalo en la configuración del navegador.')
    }
  }

  const stop = () => {
    if (mediaRef.current && mediaRef.current.state !== 'inactive') mediaRef.current.stop()
    setRecording(false)
  }

  return (
    <motion.button
      onClick={() => recording ? stop() : start()}
      disabled={disabled || loading}
      whileTap={{ scale: 0.9 }}
      className="w-[52px] h-[52px] flex-shrink-0 rounded-[14px] flex items-center justify-center transition-all disabled:opacity-40"
      style={{
        background: recording ? 'linear-gradient(135deg, #b91c1c, #7f1d1d)' : 'linear-gradient(135deg, #ef4444, #b91c1c)',
        border: 'none',
        boxShadow: recording ? '0 0 20px rgba(239,68,68,.7)' : '0 0 14px rgba(239,68,68,.4)',
      }}
      title={recording ? 'Tocar para detener' : 'Tocar para hablar'}
    >
      {loading ? (
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          style={{ width:20, height:20, borderRadius:'50%', border:'2px solid #00E5A0', borderTopColor:'transparent' }} />
      ) : recording ? (
        <motion.div animate={{ scale:[1,1.15,1] }} transition={{ repeat:Infinity, duration:0.7 }}
          style={{ width:16, height:16, borderRadius:3, background:'white' }} />
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="2" width="6" height="12" rx="3"/>
          <path d="M5 10a7 7 0 0 0 14 0"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="8" y1="22" x2="16" y2="22"/>
        </svg>
      )}
    </motion.button>
  )
}

export default function ChatScreen({ go, seed }) {
  const [messages, setMessages] = useState([])
  const [typing, setTyping]     = useState(false)
  const [input, setInput]       = useState('')
  const [btnOff, setBtnOff]     = useState(false)
  const [connStatus, setConnStatus] = useState('connecting') // 'connecting' | 'establishing' | 'online'
  const [voices, setVoices]     = useState([])
  const [voiceURI, setVoiceURI] = useState(() => { try { return localStorage.getItem(VOICE_KEY) || '' } catch { return '' } })
  const [voiceMenu, setVoiceMenu] = useState(false)
  const [voiceHelp, setVoiceHelp] = useState(false)
  useEffect(() => {
    const load = () => setVoices(spanishVoices())
    load()
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.onvoiceschanged = load
    return () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null }
  }, [])
  const sampleVoice = (uri) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance('Hola, soy tu asistente. Estoy acá para ayudarte a cuidarte de las estafas.')
    u.rate = 0.95
    const list = spanishVoices()
    const v = uri ? list.find(x => x.voiceURI === uri) : bestVoice(list)
    if (v) { u.voice = v; u.lang = v.lang } else { u.lang = 'es-ES' }
    window.speechSynthesis.speak(u)
  }
  const pickVoice = (uri) => {
    setVoiceURI(uri)
    try { localStorage.setItem(VOICE_KEY, uri) } catch {}
    sampleVoice(uri)
    setVoiceMenu(false)
  }

  useEffect(() => {
    const t1 = setTimeout(() => setConnStatus('establishing'), 1400)
    const t2 = setTimeout(() => setConnStatus('online'), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Mostrar mensaje SOLO cuando termina el loading, con typing animation
  useEffect(() => {
    if (connStatus !== 'online') return
    // 1. Mostrar typing indicator
    setTimeout(() => setTyping(true), 400)
    // 2. Después de 2 segundos, ocultar typing y mostrar mensaje
    setTimeout(() => {
      setTyping(false)
      setTimeout(() => {
        addBot('¡Hola! Soy **Escudo Digital**, una herramienta independiente de ayuda contra las ciberestafas.\n\nContame qué te pasó —un mensaje, una llamada o un correo sospechoso— y te ayudo a saber si es real o un engaño.\n\n🔒 _Privado y seguro: no guardo tus datos._')
      }, 150)
    }, 2200)
    if(seed) setTimeout(() => sendMsg(seed), 4000)
  }, [connStatus])
  const msgsRef = useRef(null)
  const taRef   = useRef(null)
  const historyRef = useRef([])

  const scrollDown = () => {
    // Solo scroll al fondo para MENSAJES DEL USUARIO
    if(msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }
    setTimeout(() => {
      if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }, 300)
  }

  const addBot = (text) => {
    setMessages(m => [...m, { role:'bot', text }])
    // NO scrollDown aquí — el useEffect se encarga de ir al INICIO del mensaje
  }

  const addUser = (text) => {
    setMessages(m => [...m, { role:'user', text }])
    // Usuario → fondo para ver el input
    setTimeout(() => {
      if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    }, 50)
  }

  const lastMsgRef = useRef(null)
  const prevMsgCount = useRef(0)
  const prevTyping = useRef(false)

  // Función que scrollea al INICIO del último mensaje del bot
  const scrollToLastMsg = () => {
    if(!lastMsgRef.current || !msgsRef.current) return
    const container = msgsRef.current
    const el = lastMsgRef.current
    // Posición del elemento relativa al contenedor
    const elTop = el.offsetTop
    container.scrollTo({ top: elTop - 12, behavior: 'smooth' })
  }

  useEffect(() => {
    const isNewMsg = messages.length > prevMsgCount.current
    const lastMsg = messages[messages.length - 1]
    prevMsgCount.current = messages.length
    if(!isNewMsg) return

    setTimeout(() => {
      if(lastMsg?.role === 'bot') {
        scrollToLastMsg()
      } else {
        // Mensaje del usuario → fondo para ver input
        if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
      }
    }, 100)
  }, [messages])

  // Cuando el bot termina de escribir → inicio de su respuesta
  useEffect(() => {
    if(prevTyping.current && !typing) {
      setTimeout(scrollToLastMsg, 150)
    }
    prevTyping.current = typing
  }, [typing])

  const sendMsg = async (text) => {
    if(!text?.trim()) return
    addUser(text)
    const newHistory = [...historyRef.current, { role:'user', content:text }]
    historyRef.current = newHistory
    setBtnOff(true)
    setTyping(true)
    // No scroll aquí — addUser ya lo hace

    let reply = null

    // Intentar hasta 2 veces si falla
    for(let attempt = 0; attempt < 2; attempt++) {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 25000)

        const resp = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: newHistory.slice(0, -1) }),
          signal: controller.signal
        })
        clearTimeout(timeout)

        if(resp.ok) {
          const data = await resp.json()
          if(data?.reply) {
            reply = data.reply
            break
          }
          // Rate limit específico
          if(data?.error === 'rate_limit') {
            reply = 'El asistente está ocupado ahora mismo. Intentá de nuevo en 1-2 minutos.\n\nSi es urgente llamá al **911** o a Cibercrimen: **2030 4625**'
            break
          }
        }
      } catch(e) {
        console.log(`Intento ${attempt + 1} fallido:`, e)
        if(attempt === 0) await new Promise(r => setTimeout(r, 1500)) // Esperar antes de reintentar
      }
    }

    historyRef.current = [...historyRef.current, { role:'assistant', content: reply || '' }]

    setTimeout(() => {
      setTyping(false)
      if(reply) {
        addBot(reply)
      } else {
        addBot('Tuve un problema de conexión. ¿Podés escribirme de nuevo?\n\nSi es una emergencia llamá ya al **911** o a Cibercrimen MI: **2030 4625**')
      }
      setBtnOff(false)
    }, 400)
  }


  useEffect(() => {
    setTimeout(() => {
      if(msgsRef.current) msgsRef.current.scrollTop = 0
    }, 200)
  }, [])

  const handleSend = () => {
    const t = input.trim()
    if(!t) return
    setInput('')
    if(taRef.current) taRef.current.style.height = ''
    sendMsg(t)
  }

  const handleTranscript = (text) => {
    setInput(text)
    setTimeout(() => {
      setInput('')
      if(taRef.current) taRef.current.style.height = ''
      sendMsg(text)
    }, 800)
  }

  return (
    <div className="flex flex-col relative" style={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden', position: 'fixed', inset: 0, background: 'linear-gradient(160deg, #050d1a 0%, #071525 50%, #050d1a 100%)' }}>
      {/* Partículas RGB de fondo */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Particles />
      </div>

      {/* Todo el contenido sobre las partículas */}
      {/* Overlay de conexión animado */}
      <AnimatePresence>
        {connStatus !== 'online' && (
          <motion.div
            initial={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:.6 }}
            className="absolute inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background:'linear-gradient(160deg,#050d1a,#071a2e)' }}
          >
            {/* Robot grande */}
            <motion.div
              animate={{ scale:[1, 1.08, 1] }}
              transition={{ duration:1.2, repeat:Infinity, ease:'easeInOut' }}
              className="mb-6"
            >
              <svg width="90" height="90" viewBox="0 0 110 110" fill="none">
                <circle cx="55" cy="52" r="38" fill="#0f2a20" stroke="#00E5A0" strokeWidth="2"/>
                <ellipse cx="47" cy="38" rx="14" ry="8" fill="rgba(255,255,255,.06)"/>
                <circle cx="55" cy="52" r="30" fill="#071a10"/>
                <circle cx="40" cy="47" r="11" fill="#00E5A0" opacity="0.9"/>
                <circle cx="40" cy="47" r="7" fill="#071a10"/>
                <circle cx="40" cy="47" r="4" fill="#00E5A0"/>
                <circle cx="42" cy="44" r="2.5" fill="white" opacity="0.9"/>
                <circle cx="70" cy="47" r="11" fill="#00E5A0" opacity="0.9"/>
                <circle cx="70" cy="47" r="7" fill="#071a10"/>
                <circle cx="70" cy="47" r="4" fill="#00E5A0"/>
                <circle cx="72" cy="44" r="2.5" fill="white" opacity="0.9"/>
                <path d="M40 63 Q55 73 70 63" stroke="#00E5A0" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <circle cx="25" cy="58" r="7" fill="#00E5A0" opacity="0.15"/>
                <circle cx="85" cy="58" r="7" fill="#00E5A0" opacity="0.15"/>
                <circle cx="16" cy="52" r="7" fill="#0f2a20" stroke="#00E5A0" strokeWidth="1.5"/>
                <circle cx="94" cy="52" r="7" fill="#0f2a20" stroke="#00E5A0" strokeWidth="1.5"/>
              </svg>
            </motion.div>

            {/* Texto de estado animado */}
            <AnimatePresence mode="wait">
              {connStatus === 'connecting' && (
                <motion.div key="c1"
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                  transition={{ duration:.4 }}
                  className="text-center px-8">
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'1.15rem', fontWeight:700, color:'#f0f6ff', marginBottom:6 }}>
                    Conectando...
                  </div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:'#4a6080', letterSpacing:'.1em' }}>
                    ESCUDO DIGITAL · IA
                  </div>
                </motion.div>
              )}
              {connStatus === 'establishing' && (
                <motion.div key="c2"
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                  transition={{ duration:.4 }}
                  className="text-center px-8">
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:'1.15rem', fontWeight:700, color:'#f0f6ff', marginBottom:6 }}>
                    ¡Estás en un lugar seguro!
                  </div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:'#00E5A0', letterSpacing:'.1em' }}>
                    🔒 CANAL CIFRADO · EN LÍNEA
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Barra de progreso */}
            <div className="mt-6 w-52 h-[3px] rounded-full overflow-hidden" style={{ background:'#142040' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background:'linear-gradient(90deg,#00E5A0,#00c8ff)' }}
                animate={{ width: connStatus === 'connecting' ? '45%' : '100%' }}
                transition={{ duration:1, ease:'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Topbar */}
      <div className="flex items-center gap-3 px-4 sticky top-0 z-50 border-b"
        style={{ paddingTop:`calc(env(safe-area-inset-top,0px) + 12px)`, paddingBottom:'12px',
          background: 'rgba(5,13,26,.95)', borderColor: 'rgba(0,200,255,.12)',
          backdropFilter: 'blur(20px)' }}>
        <button onClick={go.home}
          className="flex items-center gap-2 px-3 py-2 rounded-[10px] transition-all flex-shrink-0"
          style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.10)', backdropFilter:'blur(8px)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          <span style={{ fontSize:'.75rem', fontWeight:600, color:'rgba(255,255,255,.6)', fontFamily:"'Outfit',sans-serif" }}>Volver</span>
        </button>
        <RobotAvatar typing={typing} />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[.98rem] text-white truncate">Asistente Digital</div>
          <div className="flex items-center gap-[5px] text-[.68rem] text-slate-400 mt-[1px] min-w-0">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: '#10b981' }}
            />
            <span className="truncate">En línea</span>
          </div>
        </div>
        <button onClick={() => setVoiceMenu(o => !o)} aria-label="Elegir voz"
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width:38, height:38, borderRadius:11, background: voiceMenu ? 'rgba(0,229,160,.2)' : 'rgba(0,229,160,.1)', border:'1px solid rgba(0,229,160,.35)', cursor:'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        </button>
        {voiceMenu && (
          <>
            <div onClick={() => setVoiceMenu(false)} style={{ position:'fixed', inset:0, zIndex:60 }} />
            <div style={{ position:'absolute', top:'100%', right:12, marginTop:6, zIndex:61, width:230, maxHeight:'58vh', overflowY:'auto', background:'#0c1730', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, boxShadow:'0 16px 40px rgba(0,0,0,.5)', padding:6 }}>
              <div style={{ fontSize:'.62rem', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'.08em', textTransform:'uppercase', color:'#5a76a0', padding:'6px 8px 5px' }}>Elegí una voz · se escucha al tocar</div>
              <button onClick={() => pickVoice('')} className="w-full text-left"
                style={{ display:'block', padding:'11px 10px', borderRadius:9, background: voiceURI==='' ? 'rgba(0,229,160,.14)' : 'transparent', border:'none', color: voiceURI==='' ? '#00E5A0' : '#e6eefb', fontFamily:"'Nunito',sans-serif", fontSize:'.88rem', fontWeight:700, cursor:'pointer' }}>
                Voz automática (recomendada)
              </button>
              {voices.map(v => (
                <button key={v.voiceURI} onClick={() => pickVoice(v.voiceURI)} className="w-full text-left"
                  style={{ display:'block', padding:'11px 10px', borderRadius:9, background: voiceURI===v.voiceURI ? 'rgba(0,229,160,.14)' : 'transparent', border:'none', color: voiceURI===v.voiceURI ? '#00E5A0' : '#e6eefb', fontFamily:"'Nunito',sans-serif", fontSize:'.88rem', fontWeight:600, cursor:'pointer' }}>
                  {v.name.replace(/Google |Microsoft /,'')}
                </button>
              ))}
              {voices.length === 0 && <div style={{ padding:'10px', fontSize:'.8rem', color:'#8fa8cc', lineHeight:1.5 }}>No hay voces en español instaladas en este celular.</div>}
              <div style={{ height:1, background:'rgba(255,255,255,.08)', margin:'7px 6px' }} />
              <button onClick={() => setVoiceHelp(h => !h)} className="w-full text-left"
                style={{ display:'flex', alignItems:'center', gap:7, padding:'10px', borderRadius:9, background:'transparent', border:'none', color:'#00c8ff', fontFamily:"'Nunito',sans-serif", fontSize:'.82rem', fontWeight:800, cursor:'pointer' }}>
                <span style={{ fontSize:'1.1rem', lineHeight:1, marginTop:-2 }}>＋</span> Agregar voces de hombre (gratis)
              </button>
              {voiceHelp && (
                <div style={{ padding:'2px 12px 10px', fontSize:'.8rem', color:'#c4d4ee', lineHeight:1.7, fontFamily:"'Nunito',sans-serif" }}>
                  {/iphone|ipad|ipod/i.test(typeof navigator!=='undefined'?navigator.userAgent:'') ? (
                    <>Una sola vez en tu iPhone:<br/>
                    <b>1.</b> Ajustes › Accesibilidad<br/>
                    <b>2.</b> Contenido hablado › Voces › Español<br/>
                    <b>3.</b> Bajá <b style={{color:'#7cc4ff'}}>Jorge</b>, <b style={{color:'#7cc4ff'}}>Juan</b> o <b style={{color:'#7cc4ff'}}>Diego</b> (voces de hombre). Tocá la nube ☁️ y elegí la versión <b>Mejorada</b> o <b>Premium</b> — esas suenan naturales, no robot.<br/>
                    <b>4.</b> Volvé acá: aparecen solas en la lista.</>
                  ) : (
                    <>Una sola vez en tu Android:<br/>
                    <b>1.</b> Ajustes › Accesibilidad › Texto a voz<br/>
                    <b>2.</b> Motor de Google › Instalar voces › Español<br/>
                    <b>3.</b> Bajá las voces disponibles.<br/>
                    <b>4.</b> Volvé acá: aparecen solas en la lista.</>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div ref={msgsRef} className="flex-1 px-4 py-4 flex flex-col gap-3 relative" style={{ zIndex: 1, overflowY: 'scroll', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i} ref={i === messages.length - 1 ? lastMsgRef : null} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.25 }}>
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

      {/* Emergency numbers bar (abajo) */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto" style={{ background: 'rgba(0,0,0,.25)', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        {EMERGENCY_NUMBERS.map((n, i) => (
          <a key={i} href={`tel:${n.label.replace(/\D/g,'')}`}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white no-underline transition-all active:scale-95"
            style={{ background: `${n.color}22`, border: `1px solid ${n.color}55`, fontSize: '.72rem' }}>
            <span className="font-bold" style={{ color: n.color }}>{n.label}</span>
            <span className="text-slate-400">{n.sub}</span>
          </a>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex gap-2 items-end"
        style={{ background:'rgba(5,13,26,.85)', borderTop:'1px solid rgba(255,255,255,.06)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', position:'relative', zIndex: 2,
          paddingBottom:`calc(env(safe-area-inset-bottom,0px) + 12px)` }}>

        {/* Micrófono */}
        <MicButton onTranscript={handleTranscript} disabled={btnOff} />

        {/* Texto */}
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
            onFocus={() => { setTimeout(scrollDown, 300) }}
            rows={1}
            placeholder="Hablá o escribí acá..."
            className="w-full bg-transparent outline-none resize-none text-white font-sans text-[.97rem] leading-relaxed placeholder:text-slate-600"
            style={{ minHeight:'24px', maxHeight:'100px' }}
          />
        </div>

        {/* Enviar */}
        <motion.button
          onClick={handleSend}
          disabled={btnOff}
          whileTap={{ scale: 0.92 }}
          className="w-[52px] h-[52px] flex-shrink-0 rounded-[14px] flex items-center justify-center transition-all text-white disabled:opacity-40"
          style={{ background:'linear-gradient(135deg, #059669, #00E5A0)', boxShadow:'0 4px 20px rgba(0,229,160,.35)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
