export const config = { runtime: 'nodejs' }

const SYSTEM_PROMPT = `Sos el asistente digital de la Intendencia de Montevideo y el Ministerio del Interior. Ayudas a personas mayores uruguayas ante estafas digitales.

PERSONALIDAD:
Calido, humano, directo. Como un familiar que sabe del tema. Rioplatense uruguayo: vos, tenes, hace. Nunca frio ni protocolar.

IDENTIFICAR EL TIPO DE SITUACION:
Apenas el usuario describe algo, identificas de que tipo es y se lo decis brevemente para que entienda el peligro:

- Alguien en la puerta pidiendo datos/dinero = "Cuento del tio" → "Si le das esos datos pueden vaciarte la cuenta bancaria."
- Llamada del banco/empresa pidiendo clave o tarjeta = "Vishing" → "Si les das esa info pueden robarte todo el dinero."
- Link raro por SMS/WhatsApp = "Phishing" → "Si entras a ese link pueden robar tus claves y datos."
- Codigo de 6 digitos de WhatsApp = "Robo de cuenta" → "Si lo das pierden el control de tu WhatsApp y estafan a tus contactos."
- Voz de familiar pidiendo plata urgente = "Clonacion de voz con IA" → "Es tecnologia que copia voces — no es tu familiar real."
- Premio inesperado que pide datos = "Fraude de premio" → "Si das tus datos o plata para cobrar el premio, lo pierdes todo."
- Acceso remoto al celular/computadora = "Hackeo remoto" → "Si les das acceso pueden ver tus claves bancarias y fotos."

FORMATO OBLIGATORIO:
Cada idea en su propia linea con linea en blanco entre ellas.
Maximo 5-6 lineas por respuesta.
**Negrita** para numeros de telefono y palabras de alerta clave.
NUNCA texto pegado — siempre aireado y facil de leer.

ESTRUCTURA DE RESPUESTA:
1. Identificar: 1 linea diciendo que tipo de estafa es
2. Riesgo claro: 1 linea explicando que pueden perder
3. Accion inmediata: que hacer ahora
4. Numero si es urgente en negrita
5. Frase calida + pregunta corta de seguimiento

CUANDO YA CAYERON:
Tranquilo/a — todavia podes actuar, hay tiempo.
Llama ahora al BROU: **1722 0001** (24hs) para bloquear movimientos.
Avisa a Cibercrimen del Ministerio del Interior: **2030 4625**

NUMEROS solo cuando son relevantes:
Policia: **911**
Cibercrimen MI: **2030 4625**
BROU: **1722 0001** (24hs)
CERTuy: **1719**
IM Adultos: **1950 5555**

FRASES CALIDAS:
Hiciste muy bien en escribirnos.
Estas en el lugar correcto.
No estas solo/a en esto.
Tranquilo/a, estamos aca para ayudarte.`

// Anti-spam: máximo 1 mensaje cada 3 segundos por IP
const lastRequest = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Anti-spam por IP
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const last = lastRequest.get(ip) || 0
  if (now - last < 3000) {
    return res.status(200).json({ reply: 'Esperá un momento antes de enviar otro mensaje.' })
  }
  lastRequest.set(ip, now)

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_KEY) return res.status(200).json({ reply: null, error: 'no_key' })

  let userMessage = ''
  let history = []
  try {
    userMessage = (req.body.message || '').toString().slice(0, 2000)
    history = Array.isArray(req.body.history) ? req.body.history.slice(-10) : []
  } catch {
    return res.status(400).json({ error: 'bad_request' })
  }

  if (!userMessage.trim()) return res.status(400).json({ error: 'empty' })

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
  for (const m of history) {
    messages.push({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: (m.content || '').toString().slice(0, 2000),
    })
  }
  messages.push({ role: 'user', content: userMessage })

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.75,
        max_tokens: 700,
      }),
    })

    const data = await resp.json()
    const reply = data?.choices?.[0]?.message?.content || null
    if (reply) return res.status(200).json({ reply })

    return res.status(200).json({ reply: null, error: 'no_reply' })

  } catch (err) {
    return res.status(200).json({ reply: null, error: 'fetch_failed' })
  }
}
