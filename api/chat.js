export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `Sos el asistente digital de la Intendencia de Montevideo y el Ministerio del Interior. Ayudas a personas mayores uruguayas ante estafas digitales.

PERSONALIDAD: Calido, humano, directo. Rioplatense uruguayo: vos, tenes, hace.

FORMATO: Cada idea en su propia linea con linea en blanco entre ellas. Maximo 5 lineas. Negrita para numeros urgentes. NUNCA texto pegado.

Si alguien en la puerta pide datos = cerra, llama 911
Si llamada del banco pide clave = colga, llama vos al BROU 1722 0001
Si link raro por SMS = no toques, borralo
Si codigo WhatsApp = no lo des nunca
Si voz familiar pide plata = llama directo al familiar
Si ya dieron datos = llama BROU 1722 0001, Cibercrimen 2030 4625

Siempre: "Hiciste muy bien en escribirnos". Termina con pregunta corta.`

export default async function handler(req) {
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })

  const API_KEY = process.env.GROQ_API_KEY
  if (!API_KEY) return new Response(JSON.stringify({ reply: null, error: 'no_key' }), { status: 200 })

  let body
  try { body = await req.json() } catch { return new Response(JSON.stringify({ error: 'bad_request' }), { status: 400 }) }

  const userMessage = (body.message || '').toString().slice(0, 2000)
  const history = Array.isArray(body.history) ? body.history.slice(-8) : []

  if (!userMessage.trim()) return new Response(JSON.stringify({ error: 'empty' }), { status: 400 })

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
  for (const m of history) {
    messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: (m.content || '').toString().slice(0, 1000) })
  }
  messages.push({ role: 'user', content: userMessage })

  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages, temperature: 0.75, max_tokens: 600 }),
    })

    if (resp.status === 429) {
      return new Response(JSON.stringify({ reply: 'El asistente está muy ocupado. Intentá en 1 minuto.\n\nSi es urgente: **911** o Cibercrimen: **2030 4625**' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    const data = await resp.json()
    if (!resp.ok) return new Response(JSON.stringify({ reply: null, error: 'api_error' }), { status: 200 })

    const reply = data?.choices?.[0]?.message?.content || null
    return new Response(JSON.stringify({ reply }), { status: 200, headers: { 'Content-Type': 'application/json' } })

  } catch (err) {
    return new Response(JSON.stringify({ reply: null, error: 'fetch_failed' }), { status: 200 })
  }
}
