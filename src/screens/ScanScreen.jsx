export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_KEY) return res.status(200).json({ result: null, error: 'no_key' })

  const { imageBase64, mimeType } = req.body || {}
  if (!imageBase64) return res.status(400).json({ error: 'no_image' })

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 600,
        messages: [
          {
            role: 'system',
            content: `Sos un experto en ciberseguridad de Uruguay que ayuda a adultos mayores a detectar estafas digitales.

Analizás la imagen y respondés en español rioplatense uruguayo (vos, tenés, hacé).

FORMATO DE RESPUESTA — siempre así:

VEREDICTO: [ESTAFA ⚠️ / SEGURO ✅ / SOSPECHOSO 🔍]

Tipo: [nombre del tipo de estafa o "mensaje legítimo"]

Señales detectadas:
- [señal 1]
- [señal 2]

Qué hacer ahora:
[acción concreta y directa]

Si es estafa, incluí número de emergencia relevante en negrita.
Respondé siempre en 5-8 líneas, claro y directo. Nunca uses tecnicismos.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType || 'image/jpeg'};base64,${imageBase64}`,
                  detail: 'high'
                }
              },
              {
                type: 'text',
                text: 'Analizá esta imagen. ¿Es una estafa, mensaje sospechoso o legítimo? Explicame qué ves y qué debería hacer.'
              }
            ]
          }
        ]
      })
    })

    const data = await resp.json()
    const result = data?.choices?.[0]?.message?.content || null
    return res.status(200).json({ result })

  } catch (err) {
    return res.status(200).json({ result: null, error: 'fetch_failed' })
  }
}
