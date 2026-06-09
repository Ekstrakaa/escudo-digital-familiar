import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Particles() {
  const canvasRef = useRef(null)
  const { useEffect } = require !== undefined ? { useEffect: window.__useEffect } : {}
  return null
}

const EXAMPLES = [
  { emoji: '💳', text: 'SMS del banco pidiendo verificar datos' },
  { emoji: '📦', text: 'Mensaje de correo con link de seguimiento' },
  { emoji: '🏆', text: 'WhatsApp diciendo que ganaste un premio' },
  { emoji: '🔐', text: 'Email pidiendo cambiar contraseña urgente' },
]

export default function ScanScreen({ go }) {
  const [image, setImage]       = useState(null)  // base64
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [preview, setPreview]   = useState(null)  // url para mostrar
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    setResult(null)
    setError(null)
    setMimeType(file.type || 'image/jpeg')
    const url = URL.createObjectURL(file)
    setPreview(url)
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1]
      setImage(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    if (file?.type?.startsWith('image/')) handleFile(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const resp = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image, mimeType }),
      })
      const data = await resp.json()
      if (data?.result) setResult(data.result)
      else setError('No se pudo analizar la imagen. Intentá de nuevo.')
    } catch {
      setError('Error de conexión. Revisá tu internet e intentá de nuevo.')
    }
    setLoading(false)
  }

  const reset = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  // Detectar si es estafa para el color del resultado
  const isScam    = result && (result.includes('ESTAFA') || result.includes('⚠️'))
  const isSafe    = result && (result.includes('SEGURO') || result.includes('✅'))
  const isSuspect = result && (result.includes('SOSPECHOSO') || result.includes('🔍'))

  const resultColor = isScam ? '#ef4444' : isSafe ? '#00e5a0' : '#f59e0b'
  const resultBg    = isScam ? 'rgba(239,68,68,.06)' : isSafe ? 'rgba(0,229,160,.06)' : 'rgba(245,158,11,.06)'
  const resultBorder = isScam ? 'rgba(239,68,68,.25)' : isSafe ? 'rgba(0,229,160,.25)' : 'rgba(245,158,11,.25)'

  // Formatear resultado
  const formatResult = (text) => {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#00E5A0">$1</strong>')
      .replace(/VEREDICTO:(.*)/g, '<div style="font-size:1.1rem;font-weight:900;margin-bottom:8px">VEREDICTO:$1</div>')
      .replace(/\n/g,'<br/>')
  }

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(170deg, #060c1a 0%, #071626 50%, #060c1a 100%)', fontFamily: "'Nunito', system-ui, sans-serif" }}>

      {/* Topbar */}
      <div className="flex items-center gap-3 px-4 sticky top-0 z-50 border-b"
        style={{ paddingTop:`calc(env(safe-area-inset-top,0px) + 12px)`, paddingBottom:'12px',
          background:'rgba(5,13,26,.95)', borderColor:'rgba(0,200,255,.12)', backdropFilter:'blur(20px)' }}>
        <button onClick={go.home}
          className="flex items-center gap-2 px-3 py-2 rounded-[10px] transition-all flex-shrink-0"
          style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.10)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          <span style={{ fontSize:'.75rem', fontWeight:700, color:'rgba(255,255,255,.6)' }}>Volver</span>
        </button>
        <div className="flex-1">
          <div style={{ fontWeight:800, fontSize:'1rem', color:'#fff' }}>Detector de Estafas</div>
          <div style={{ fontSize:'.68rem', color:'#00e5a0', marginTop:1 }}>📸 Analizá cualquier mensaje sospechoso</div>
        </div>
      </div>

      <div className="flex flex-col px-4 py-6 gap-5" style={{ maxWidth: 480, margin: '0 auto', width: '100%' }}>

        {/* Intro */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1 }}>
          <div style={{ fontSize:'1.5rem', fontWeight:900, color:'#fff', lineHeight:1.2, marginBottom:8 }}>
            ¿Recibiste un mensaje raro?
          </div>
          <div style={{ fontSize:'.95rem', color:'rgba(255,255,255,.5)', lineHeight:1.6 }}>
            Sacale una foto o subí la captura. La IA lo analiza en segundos y te dice si es una estafa.
          </div>
        </motion.div>

        {/* Ejemplos */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.2 }}
          className="grid grid-cols-2 gap-2">
          {EXAMPLES.map((e, i) => (
            <div key={i} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:12, padding:'10px 12px', fontSize:'.78rem', color:'rgba(255,255,255,.5)', display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:'1.1rem' }}>{e.emoji}</span>{e.text}
            </div>
          ))}
        </motion.div>

        {/* Zona de subida */}
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div key="upload"
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ delay:.25 }}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center gap-4 rounded-[20px] cursor-pointer"
              style={{ border:'2px dashed rgba(0,229,160,.3)', padding:'40px 20px', background:'rgba(0,229,160,.03)', minHeight:200 }}
            >
              <motion.div
                animate={{ scale:[1,1.08,1] }}
                transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
                style={{ width:72, height:72, borderRadius:'50%', background:'rgba(0,229,160,.1)', border:'1.5px solid rgba(0,229,160,.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </motion.div>
              <div className="text-center">
                <div style={{ fontSize:'1.05rem', fontWeight:800, color:'#fff', marginBottom:6 }}>Subí la captura de pantalla</div>
                <div style={{ fontSize:'.85rem', color:'rgba(255,255,255,.4)', lineHeight:1.5 }}>Tocá acá para elegir una foto o sacar una nueva</div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <div style={{ background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.25)', borderRadius:10, padding:'8px 16px', fontSize:'.8rem', fontWeight:700, color:'#00e5a0' }}>
                  📷 Sacar foto
                </div>
                <div style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', borderRadius:10, padding:'8px 16px', fontSize:'.8rem', fontWeight:700, color:'rgba(255,255,255,.6)' }}>
                  🖼️ Elegir imagen
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*"
                className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
            </motion.div>
          ) : (
            <motion.div key="preview"
              initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
              className="flex flex-col gap-3">
              {/* Preview imagen */}
              <div style={{ position:'relative', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,.1)' }}>
                <img src={preview} alt="Imagen a analizar" style={{ width:'100%', maxHeight:280, objectFit:'contain', background:'#0a0f1e', display:'block' }} />
                <button onClick={reset}
                  style={{ position:'absolute', top:10, right:10, width:32, height:32, borderRadius:8, background:'rgba(0,0,0,.6)', border:'1px solid rgba(255,255,255,.2)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' }}>
                  ✕
                </button>
              </div>

              {/* Botón analizar */}
              {!result && !loading && (
                <motion.button
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  whileTap={{ scale:.97 }}
                  onClick={analyze}
                  style={{ width:'100%', padding:'18px', borderRadius:16, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#00e5a0,#00c48a)', fontWeight:900, fontSize:'1.1rem', color:'#000', boxShadow:'0 4px 20px rgba(0,229,160,.35)' }}>
                  🔍 Analizar ahora
                </motion.button>
              )}

              {/* Loading */}
              {loading && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                  className="flex flex-col items-center gap-3 py-6"
                  style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:16 }}>
                  <motion.div
                    animate={{ rotate:360 }}
                    transition={{ repeat:Infinity, duration:1, ease:'linear' }}
                    style={{ width:40, height:40, borderRadius:'50%', border:'3px solid rgba(0,229,160,.2)', borderTopColor:'#00e5a0' }}
                  />
                  <div style={{ fontSize:'.95rem', fontWeight:700, color:'rgba(255,255,255,.6)' }}>Analizando la imagen...</div>
                  <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.3)' }}>La IA está revisando cada detalle</div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                  style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', borderRadius:16, padding:'16px', fontSize:'.9rem', color:'#ef4444', textAlign:'center' }}>
                  {error}
                  <button onClick={reset} style={{ display:'block', margin:'10px auto 0', background:'none', border:'1px solid rgba(239,68,68,.4)', borderRadius:8, padding:'6px 16px', color:'#ef4444', cursor:'pointer', fontSize:'.85rem', fontWeight:700 }}>
                    Intentar de nuevo
                  </button>
                </motion.div>
              )}

              {/* Resultado */}
              {result && (
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  style={{ background:resultBg, border:`1.5px solid ${resultBorder}`, borderRadius:20, padding:'20px', overflow:'hidden' }}>
                  <div style={{ fontSize:'.7rem', fontWeight:700, color:resultColor, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12, opacity:.7 }}>
                    Resultado del análisis
                  </div>
                  <div
                    style={{ fontSize:'.95rem', color:'#f0f6ff', lineHeight:1.8, fontFamily:"'Nunito',sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: formatResult(result) }}
                  />
                  <div className="flex gap-2 mt-4">
                    <button onClick={reset}
                      style={{ flex:1, padding:'12px', borderRadius:12, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'rgba(255,255,255,.7)', fontWeight:700, fontSize:'.85rem', cursor:'pointer' }}>
                      Analizar otra imagen
                    </button>
                    {isScam && (
                      <button onClick={() => go.chat('Recibí un mensaje sospechoso y lo analicé, necesito más ayuda')}
                        style={{ flex:1, padding:'12px', borderRadius:12, background:'linear-gradient(135deg,#ef4444,#b91c1c)', border:'none', color:'#fff', fontWeight:700, fontSize:'.85rem', cursor:'pointer' }}>
                        Hablar con el asistente
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info footer */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4 }}
          className="flex items-center gap-3 rounded-[14px] px-4 py-3"
          style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)' }}>
          <div style={{ fontSize:'1.2rem' }}>🔒</div>
          <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.35)', lineHeight:1.5 }}>
            Las imágenes se analizan en el momento y no se guardan. Tu privacidad está protegida.
          </div>
        </motion.div>

      </div>
    </div>
  )
}
