import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXAMPLES = [
  { emoji: '💳', text: 'SMS del banco pidiendo verificar datos' },
  { emoji: '📦', text: 'Mensaje de correo con link de seguimiento' },
  { emoji: '🏆', text: 'WhatsApp diciendo que ganaste un premio' },
  { emoji: '🔐', text: 'Email pidiendo cambiar contraseña urgente' },
]

function PhoneBtn({ x, y, w, h }) {
  return (
    <motion.rect x={x} y={y} width={w} height={h} rx="2.5" fill="#00e5a0"
      animate={{ scaleY:[1,.65,1], opacity:[1,.5,1] }}
      transition={{ duration:1.2, repeat:Infinity, ease:'easeInOut', repeatDelay:0.3 }}
      style={{ transformOrigin:`${x+w/2}px ${y+h/2}px` }}
    />
  )
}
function RingAnim({ cx, cy }) {
  return (
    <motion.circle cx={cx} cy={cy} r="5" fill="none" stroke="#00e5a0" strokeWidth="1.5"
      animate={{ scale:[1,2.5], opacity:[.9,0] }}
      transition={{ duration:1.2, repeat:Infinity, ease:'easeOut', repeatDelay:0.3 }}
      style={{ transformOrigin:`${cx}px ${cy}px` }}
    />
  )
}
function FlashAnim({ x, y, w, h, rx }) {
  return (
    <motion.rect x={x} y={y} width={w} height={h} rx={rx} fill="rgba(255,255,255,.25)"
      animate={{ opacity:[0,0,0,1,0] }}
      transition={{ duration:1.5, repeat:Infinity, ease:'easeInOut', times:[0,.6,.75,.85,1] }}
    />
  )
}

function ScreenshotTutorial() {
  const btnStyle = { height:18, borderRadius:5, fontSize:9, fontWeight:800, padding:'0 6px', background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.35)', color:'#00e5a0', display:'flex', alignItems:'center' }
  return (
    <div style={{ background:'rgba(139,124,248,.06)', border:'1px solid rgba(139,124,248,.2)', borderRadius:16, padding:'12px 14px', marginBottom:14 }}>
      <div style={{ fontSize:'.68rem', fontWeight:800, color:'#8b7cf8', letterSpacing:'.06em', textTransform:'uppercase', textAlign:'center', marginBottom:3 }}>¿Cómo sacar una captura?</div>
      <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.35)', textAlign:'center', marginBottom:10 }}>Apretá estos dos botones al mismo tiempo</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>

        {/* iPhone */}
        <div style={{ background:'rgba(255,255,255,.04)', borderRadius:12, padding:'10px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <div style={{ fontSize:11, fontWeight:900, color:'#fff' }}>iPhone</div>
          <svg width="72" height="96" viewBox="0 0 72 96" style={{ overflow:'visible' }}>

            <rect x="12" y="2" width="44" height="88" rx="10" fill="#1a1a2e" stroke="rgba(255,255,255,.25)" strokeWidth="1.5"/>
            <rect x="24" y="5" width="20" height="6" rx="3" fill="#000"/>
            <rect x="15" y="14" width="38" height="64" rx="6" fill="#0a0a18"/>
            <FlashAnim x={15} y={14} w={38} h={64} rx={6}/>
            <g transform="translate(28,38)" fill="rgba(255,255,255,.18)">
              <path d="M8,0C9.5,0,11,.8,12,2C10.8,2.8,10,4.2,10,5.8C10,7.6,11,9.2,12.5,10C11.8,11.8,10.5,14,8.5,14C7.2,14,6.5,13.2,5,13.2C3.5,13.2,2.6,14,1.3,14C-.5,14,-2,11.6,-3,9C-4,6.5,-4.2,3.5,-2.5,1.5C-1.5,.5,-.2,0,1.2,0C2.5,0,3.5,.8,5,.8C6.4,.8,7.2,0,8,0Z"/>
              <path d="M8,-2C8.5,-4,10,-5,11.5,-5C11.2,-3.5,10.2,-2,8.5,-1.2Z"/>
            </g>
            <rect x="26" y="83" width="16" height="3" rx="1.5" fill="rgba(255,255,255,.15)"/>
            <rect x="6" y="13" width="5" height="7" rx="2.5" fill="rgba(255,255,255,.15)"/>
            <rect x="6" y="38" width="5" height="10" rx="2.5" fill="rgba(255,255,255,.15)"/>
            <PhoneBtn x={57} y={24} w={5} h={18}/><RingAnim cx={59.5} cy={33}/>
            <PhoneBtn x={6} y={22} w={5} h={13}/><RingAnim cx={8.5} cy={28.5}/>
            <text x="59.5" y="97" textAnchor="middle" fontSize="9" fontWeight="900" fill="#00e5a0" fontFamily="Nunito">1</text>
            <text x="8.5" y="97" textAnchor="middle" fontSize="9" fontWeight="900" fill="#00e5a0" fontFamily="Nunito">2</text>
          </svg>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', textAlign:'center', lineHeight:1.5 }}><strong style={{color:'#00e5a0'}}>1</strong> Lateral + <strong style={{color:'#00e5a0'}}>2</strong> Vol ▲<br/>¡juntos!</div>
          <div style={{ display:'flex', alignItems:'center', gap:3 }}>
            <div style={{ height:18, borderRadius:5, fontSize:9, fontWeight:800, padding:'0 6px', background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.35)', color:'#00e5a0', display:'flex', alignItems:'center' }}>lateral</div>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.25)', fontWeight:900 }}>+</span>
            <div style={{ height:18, borderRadius:5, fontSize:9, fontWeight:800, padding:'0 6px', background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.35)', color:'#00e5a0', display:'flex', alignItems:'center' }}>vol ▲</div>
          </div>
        </div>

        {/* Android */}
        <div style={{ background:'rgba(255,255,255,.04)', borderRadius:12, padding:'10px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <div style={{ fontSize:11, fontWeight:900, color:'#fff' }}>Android</div>
          <svg width="72" height="96" viewBox="0 0 72 96" style={{ overflow:'visible' }}>
            <rect x="12" y="2" width="44" height="88" rx="8" fill="#1a2035" stroke="rgba(255,255,255,.25)" strokeWidth="1.5"/>
            <circle cx="34" cy="8" r="3" fill="#111"/>
            <circle cx="34" cy="8" r="1.5" fill="#1a2035"/>
            <rect x="15" y="15" width="38" height="58" rx="4" fill="#0a0f1e"/>
            <FlashAnim x={15} y={15} w={38} h={58} rx={4}/>
            <g transform="translate(20,26)">
              <rect x="5" y="8" width="20" height="14" rx="7" fill="rgba(0,229,160,.2)" stroke="rgba(0,229,160,.4)" strokeWidth="1"/>
              <circle cx="11" cy="14" r="2" fill="rgba(0,229,160,.8)"/>
              <circle cx="19" cy="14" r="2" fill="rgba(0,229,160,.8)"/>
              <line x1="11" y1="8" x2="8" y2="3" stroke="rgba(0,229,160,.6)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="19" y1="8" x2="22" y2="3" stroke="rgba(0,229,160,.6)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="3" r="1.5" fill="rgba(0,229,160,.6)"/>
              <circle cx="22" cy="3" r="1.5" fill="rgba(0,229,160,.6)"/>
              <rect x="3" y="22" width="24" height="12" rx="4" fill="rgba(0,229,160,.15)" stroke="rgba(0,229,160,.3)" strokeWidth="1"/>
              <rect x="-2" y="23" width="4" height="8" rx="2" fill="rgba(0,229,160,.2)" stroke="rgba(0,229,160,.3)" strokeWidth="1"/>
              <rect x="28" y="23" width="4" height="8" rx="2" fill="rgba(0,229,160,.2)" stroke="rgba(0,229,160,.3)" strokeWidth="1"/>
            </g>
            <circle cx="26" cy="83" r="2.5" fill="rgba(255,255,255,.15)"/>
            <rect x="31" y="81" width="6" height="4" rx="1" fill="rgba(255,255,255,.15)"/>
            <path d="M40 85 L42 81 L44 85Z" fill="rgba(255,255,255,.15)"/>
            <PhoneBtn x={57} y={22} w={5} h={15}/><RingAnim cx={59.5} cy={29.5}/>
            <PhoneBtn x={57} y={40} w={5} h={16}/><RingAnim cx={59.5} cy={48}/>
            <text x="59.5" y="29" textAnchor="start" fontSize="9" fontWeight="900" fill="#00e5a0" fontFamily="Nunito" dx="8">1</text>
            <text x="59.5" y="48" textAnchor="start" fontSize="9" fontWeight="900" fill="#00e5a0" fontFamily="Nunito" dx="8">2</text>
          </svg>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', textAlign:'center', lineHeight:1.5 }}><strong style={{color:'#00e5a0'}}>1</strong> Encend. + <strong style={{color:'#00e5a0'}}>2</strong> Vol ▼<br/>¡juntos!</div>
          <div style={{ display:'flex', alignItems:'center', gap:3 }}>
            <div style={{ height:18, borderRadius:5, fontSize:9, fontWeight:800, padding:'0 6px', background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.35)', color:'#00e5a0', display:'flex', alignItems:'center' }}>encend.</div>
            <span style={{ fontSize:11, color:'rgba(255,255,255,.25)', fontWeight:900 }}>+</span>
            <div style={{ height:18, borderRadius:5, fontSize:9, fontWeight:800, padding:'0 6px', background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.35)', color:'#00e5a0', display:'flex', alignItems:'center' }}>vol ▼</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ScanScreen({ go }) {
  const [showTutorial, setShowTutorial] = useState(false)
  const [image, setImage]       = useState(null)
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [preview, setPreview]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    setResult(null); setError(null)
    setMimeType(file.type || 'image/jpeg')
    setPreview(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target.result.split(',')[1])
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0]
    if (file?.type?.startsWith('image/')) handleFile(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true); setResult(null); setError(null)
    try {
      const resp = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image, mimeType }),
      })
      const data = await resp.json()
      if (data?.result) setResult(data.result)
      else setError('No se pudo analizar la imagen. Intentá de nuevo.')
    } catch { setError('Error de conexión. Revisá tu internet e intentá de nuevo.') }
    setLoading(false)
  }

  const reset = () => { setImage(null); setPreview(null); setResult(null); setError(null) }

  const isScam    = result && (result.includes('ESTAFA') || result.includes('⚠️'))
  const isSafe    = result && (result.includes('SEGURO') || result.includes('✅'))
  const resultColor  = isScam ? '#ef4444' : isSafe ? '#00e5a0' : '#f59e0b'
  const resultBg     = isScam ? 'rgba(239,68,68,.06)' : isSafe ? 'rgba(0,229,160,.06)' : 'rgba(245,158,11,.06)'
  const resultBorder = isScam ? 'rgba(239,68,68,.25)' : isSafe ? 'rgba(0,229,160,.25)' : 'rgba(245,158,11,.25)'

  const formatResult = (text) => text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#00E5A0">$1</strong>')
    .replace(/\n/g,'<br/>')

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden"
      style={{ background:'linear-gradient(170deg,#060c1a 0%,#071626 50%,#060c1a 100%)', fontFamily:"'Nunito',system-ui,sans-serif" }}>

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
          <div style={{ fontSize:'.68rem', color:'#8b5cf6', marginTop:1 }}>Análisis IA · Privado · Sin guardar datos</div>
        </div>
      </div>

      <div className="flex flex-col px-4 py-5 gap-4" style={{ maxWidth:480, margin:'0 auto', width:'100%' }}>

        {/* Intro */}
        <div>
          <div style={{ fontSize:'1.4rem', fontWeight:900, color:'#fff', lineHeight:1.2, marginBottom:6 }}>¿Recibiste un mensaje raro?</div>
          <div style={{ fontSize:'.88rem', color:'rgba(255,255,255,.45)', lineHeight:1.6 }}>Sacale foto o subí la captura. La IA lo analiza en segundos y te dice si es una estafa.</div>
        </div>

        {/* Botón tutorial */}
        <motion.button
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.2 }}
          onClick={() => setShowTutorial(true)}
          style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(139,124,248,.08)', border:'1px solid rgba(139,124,248,.25)', borderRadius:12, padding:'10px 14px', cursor:'pointer', width:'100%' }}>
          <div style={{ width:32, height:32, borderRadius:9, background:'rgba(139,124,248,.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b7cf8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3"/></svg>
          </div>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontSize:'.88rem', fontWeight:800, color:'#fff' }}>¿Cómo saco la captura?</div>
            <div style={{ fontSize:'.72rem', color:'rgba(139,124,248,.7)', marginTop:1 }}>Ver tutorial para iPhone y Android</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,124,248,.5)" strokeWidth="2" strokeLinecap="round" style={{ marginLeft:'auto', flexShrink:0 }}><path d="M9 18l6-6-6-6"/></svg>
        </motion.button>

        {/* Modal tutorial */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 20px' }}
              onClick={() => setShowTutorial(false)}>
              <motion.div
                initial={{ opacity:0, scale:.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:.9, y:20 }}
                transition={{ type:'spring', damping:20, stiffness:300 }}
                onClick={e => e.stopPropagation()}
                style={{ background:'#0d1628', border:'1px solid rgba(139,124,248,.3)', borderRadius:24, padding:'20px 16px', width:'100%', maxWidth:360 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                  <div>
                    <div style={{ fontSize:'1rem', fontWeight:900, color:'#fff' }}>¿Cómo sacar una captura?</div>
                    <div style={{ fontSize:'.75rem', color:'rgba(255,255,255,.4)', marginTop:2 }}>Apretá estos dos botones al mismo tiempo</div>
                  </div>
                  <button onClick={() => setShowTutorial(false)}
                    style={{ width:32, height:32, borderRadius:9, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.1)', color:'rgba(255,255,255,.6)', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
                </div>
                <ScreenshotTutorial />
                <button onClick={() => setShowTutorial(false)}
                  style={{ width:'100%', padding:'14px', borderRadius:14, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#00e5a0,#00c48a)', fontWeight:900, fontSize:'1rem', color:'#000', marginTop:4 }}>
                  ¡Entendido!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zona de subida / resultado */}
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div key="upload"
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              onDrop={handleDrop} onDragOver={e => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center gap-4 rounded-[20px] cursor-pointer"
              style={{ border:'2px dashed rgba(0,229,160,.3)', padding:'36px 20px', background:'rgba(0,229,160,.03)', minHeight:180 }}>
              <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
                style={{ width:64, height:64, borderRadius:'50%', background:'rgba(0,229,160,.1)', border:'1.5px solid rgba(0,229,160,.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </motion.div>
              <div className="text-center">
                <div style={{ fontSize:'1rem', fontWeight:800, color:'#fff', marginBottom:5 }}>Subí la captura de pantalla</div>
                <div style={{ fontSize:'.83rem', color:'rgba(255,255,255,.4)', lineHeight:1.5 }}>Tocá acá para elegir una foto o sacar una nueva</div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <div style={{ background:'rgba(0,229,160,.12)', border:'1px solid rgba(0,229,160,.25)', borderRadius:10, padding:'8px 16px', fontSize:'.8rem', fontWeight:700, color:'#00e5a0' }}>📷 Sacar foto</div>
                <div style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', borderRadius:10, padding:'8px 16px', fontSize:'.8rem', fontWeight:700, color:'rgba(255,255,255,.6)' }}>🖼️ Galería</div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
            </motion.div>
          ) : (
            <motion.div key="preview" initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }} className="flex flex-col gap-3">
              <div style={{ position:'relative', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,.1)' }}>
                <img src={preview} alt="Imagen a analizar" style={{ width:'100%', maxHeight:260, objectFit:'contain', background:'#0a0f1e', display:'block' }} />
                <button onClick={reset} style={{ position:'absolute', top:10, right:10, width:32, height:32, borderRadius:8, background:'rgba(0,0,0,.6)', border:'1px solid rgba(255,255,255,.2)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' }}>✕</button>
              </div>

              {!result && !loading && (
                <motion.button initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} whileTap={{ scale:.97 }} onClick={analyze}
                  style={{ width:'100%', padding:'16px', borderRadius:16, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#00e5a0,#00c48a)', fontWeight:900, fontSize:'1.05rem', color:'#000', boxShadow:'0 4px 20px rgba(0,229,160,.35)' }}>
                  🔍 Analizar ahora
                </motion.button>
              )}

              {loading && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex flex-col items-center gap-3 py-6"
                  style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:16 }}>
                  <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1, ease:'linear' }}
                    style={{ width:38, height:38, borderRadius:'50%', border:'3px solid rgba(0,229,160,.2)', borderTopColor:'#00e5a0' }} />
                  <div style={{ fontSize:'.9rem', fontWeight:700, color:'rgba(255,255,255,.6)' }}>Analizando la imagen...</div>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                  style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', borderRadius:16, padding:'16px', fontSize:'.9rem', color:'#ef4444', textAlign:'center' }}>
                  {error}
                  <button onClick={reset} style={{ display:'block', margin:'10px auto 0', background:'none', border:'1px solid rgba(239,68,68,.4)', borderRadius:8, padding:'6px 16px', color:'#ef4444', cursor:'pointer', fontSize:'.85rem', fontWeight:700 }}>Intentar de nuevo</button>
                </motion.div>
              )}

              {result && (
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  style={{ background:resultBg, border:`1.5px solid ${resultBorder}`, borderRadius:20, padding:'18px' }}>
                  <div style={{ fontSize:'.68rem', fontWeight:700, color:resultColor, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10, opacity:.7 }}>Resultado del análisis</div>
                  <div style={{ fontSize:'.93rem', color:'#f0f6ff', lineHeight:1.8, fontFamily:"'Nunito',sans-serif" }} dangerouslySetInnerHTML={{ __html: formatResult(result) }} />
                  <div className="flex gap-2 mt-4">
                    <button onClick={reset} style={{ flex:1, padding:'11px', borderRadius:12, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', color:'rgba(255,255,255,.7)', fontWeight:700, fontSize:'.85rem', cursor:'pointer' }}>Analizar otra imagen</button>
                    {isScam && (
                      <button onClick={() => go.chat('Recibí un mensaje sospechoso y lo analicé, necesito más ayuda')}
                        style={{ flex:1, padding:'11px', borderRadius:12, background:'linear-gradient(135deg,#ef4444,#b91c1c)', border:'none', color:'#fff', fontWeight:700, fontSize:'.85rem', cursor:'pointer' }}>Hablar con asistente</button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy */}
        <div className="flex items-center gap-3 rounded-[14px] px-4 py-3"
          style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)' }}>
          <div style={{ fontSize:'1.1rem' }}>🔒</div>
          <div style={{ fontSize:'.75rem', color:'rgba(255,255,255,.35)', lineHeight:1.5 }}>Las imágenes se analizan en el momento y no se guardan. Tu privacidad está protegida.</div>
        </div>

      </div>
    </div>
  )
}
