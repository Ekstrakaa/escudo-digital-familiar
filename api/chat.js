export const config = { runtime: 'nodejs' }

const SYSTEM_PROMPT = `Sos el asistente digital de la Intendencia de Montevideo y el Ministerio del Interior. Ayudas a personas mayores uruguayas ante estafas digitales.

PERSONALIDAD: Calido, humano, directo. Rioplatense uruguayo: vos, tenes, hace.

FORMATO: Cada idea en su propia linea con linea en blanco entre ellas. Maximo 5 lineas. Negrita para numeros urgentes. NUNCA texto pegado.

IDENTIFICAR ESTAFA Y RESPONDER:
- Alguien en la puerta = Cuento del tio → cerra la puerta, llama al 911
- Llamada del banco = Vishing → colga, llama vos al banco
- Link SMS/WhatsApp = Phishing → no toques el link
- Codigo WhatsApp = Robo de cuenta → no lo des nunca
- Voz familiar pidiendo plata = Clonacion de voz IA → llama directamente al familiar
- Ya dieron datos/plata → llama BROU 1722 0001, Cibercrimen 2030 4625

Frases calidas: "Hiciste muy bien en escribirnos", "No estas solo/a", "Tranquilo/a estamos aca"
Termina siempre con una pregunta corta de seguimiento.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const API_KEY = process.env.GROQ_API_KEY
  if (!API_KEY) return res.status(200).json({ reply: null, error: 'no_key' })

  let userMessage = '', history = []
  try {
    userMessage = (req.body.message || '').toString().slice(0, 2000)
    history = Array.isArray(req.body.history) ? req.body.history.slice(-10) : []
  } catch { return res.status(400).json({ error: 'bad_request' }) }

  if (!userMessage.trim()) return res.status(400).json({ error: 'empty' })

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
  for (const m of history) {
    messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: (m.content || '').toString().slice(0, 2000) })
  }
  messages.push({ role: 'user', content: userMessage })

  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages, temperature: 0.75, max_tokens: 600 }),
    })

    if (resp.status === 429) {
      return res.status(200).json({ reply: 'El asistente está muy ocupado ahora. Intentá en 1 minuto.\n\nSi es urgente llamá al **911** o a Cibercrimen: **2030 4625**' })
    }

    const data = await resp.json()
    if (!resp.ok) return res.status(200).json({ reply: null, error: 'api_error' })

    const reply = data?.choices?.[0]?.message?.content || null
    return res.status(200).json({ reply })

  } catch (err) {
    return res.status(200).json({ reply: null, error: 'fetch_failed' })
  }
}
