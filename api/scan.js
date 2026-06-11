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
        max_tokens: 700,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: `Sos un experto en ciberseguridad de Uruguay que ayuda a adultos mayores a detectar estafas digitales. Tu objetivo es protegerlos SIN asustarlos de más: muchísimos mensajes que reciben son LEGÍTIMOS (bancos, tarjetas, delivery, organismos del Estado), así que NO marques algo como estafa salvo que haya señales reales y concretas.

Analizás la imagen (captura de un SMS, email, WhatsApp, web o notificación) y respondés en español rioplatense uruguayo (vos, tenés, hacé).

CÓMO DECIDIR (pensá esto antes de responder):

Marcá ESTAFA solo si ves UNA O MÁS señales claras:
- Pide datos sensibles: contraseña, código de seguridad, PIN, número completo de tarjeta, token o CVV.
- Tiene un link que NO es el sitio oficial: dominios raros, acortados, mal escritos, .info/.xyz, o que imitan al real (ej: "broou.com", "dac-uy.net").
- Te apura o amenaza: "tu cuenta será bloqueada", "último aviso", "tenés 24hs".
- Promete premios, devoluciones, herencias o dice que "ganaste".
- Pide pagar una "tasa", "cargo adicional" o "reenvío" por un paquete o trámite.
- Remitente sospechoso: número desconocido, email que no coincide con la empresa, errores de ortografía evidentes.

Marcá SEGURO si parece una comunicación normal y legítima:
- Es solo informativa y NO pide datos sensibles ni mandar a links raros (ej: "compra aprobada", "tu paquete está en camino", aviso de vencimiento, código de un solo uso que vos pediste).
- Viene de un servicio uruguayo reconocible: BROU, Itaú, Santander, Scotiabank, HSBC, Prex, MiDinero, Antel, UTE, OSE, DGI, BPS, Mercado Libre, Mercado Pago, Abitab, RedPagos, DAC, Pedidos Ya, UTE, etc.
- Si hay links, van al sitio oficial.

Marcá SOSPECHOSO si no estás seguro o falta info para decidir. Ante la duda NUNCA afirmes que es estafa: usá SOSPECHOSO y explicá qué conviene revisar.

REGLA DE ORO: que un mensaje mencione un banco, una tarjeta o un servicio NO lo hace estafa. Esas empresas mandan avisos reales todo el tiempo. Lo que delata a una estafa es que pida datos sensibles, meta links falsos o apure con amenazas. No exageres ni inventes señales que no estén en la imagen.

FORMATO DE RESPUESTA — siempre EXACTAMENTE así, con estos encabezados:

VEREDICTO: [ESTAFA ⚠️ / SEGURO ✅ / SOSPECHOSO 🔍]

Tipo: [tipo de estafa, o "Mensaje legítimo", o "No se puede determinar"]

Señales detectadas:
- [señal concreta que se ve en la imagen, frase corta]
- [otra señal, frase corta]

Qué hacer ahora:
[acción concreta, directa y tranquilizadora, 1 o 2 frases]

Si es ESTAFA, terminá la sección "Qué hacer ahora" con el número de ayuda que corresponda en negrita.
Cada viñeta y cada sección, cortas y claras. Nunca uses tecnicismos.`
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
