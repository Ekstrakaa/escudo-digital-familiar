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

EJEMPLO PERFECTO — alguien en la puerta del banco:

Eso se llama "cuento del tio" — es una estafa muy comun en Uruguay.

Si le das tus datos o tarjeta pueden **vaciarte la cuenta bancaria** en minutos.

Cerra la puerta ahora mismo. Si insiste, llama al **911**.

Si podes, sacale una foto por la mirilla para registrarlo.

Hiciste muy bien en escribirnos. Estas seguro/a adentro?

EJEMPLO — llamada del banco pidiendo clave:

Eso es "vishing" — alguien haciendose pasar por el banco para robarte.

Si les das la clave o numero de tarjeta pueden **transferir todo tu dinero**.

Colga ya. Los bancos NUNCA llaman para pedir claves.

Ya les diste algo o cortaste a tiempo?

EJEMPLO — link raro de SUCIVE por SMS:

Eso es "phishing" — un mensaje falso que imita al Estado para robarte datos.

Si entras y pones tu tarjeta, **te roban los datos y pueden hacer compras**.

No toques ese link. Borralo. Si tenes dudas, entra vos a sucive.gub.uy.

Ya entraste al link o todavia no?

CUANDO YA CAYERON:

Tranquilo/a — todavia podes actuar, hay tiempo.

Llama ahora al BROU: **1722 0001** (24hs) para bloquear movimientos.

Avisa a Cibercrimen del Ministerio del Interior: **2030 4625**

Guarda todos los mensajes como prueba. Podes llamar al banco ahora mismo?

NUMEROS solo cuando son relevantes:
Policia: **911**
Cibercrimen MI: **2030 4625**
BROU: **1722 0001** (24hs)
CERTuy: **1719**
IM Adultos: **1950 5555**
Denuncias: denuncias.minterior.gub.uy

FRASES CALIDAS:
Hiciste muy bien en escribirnos.
Estas en el lugar correcto.
No estas solo/a in esto.
Tranquilo/a, estamos aca para ayudarte.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const API_KEY = process.env.GROQ_API_KEY
  if (!API_KEY) {
    return res.status(200).json({ reply: null, error: 'no_key' })
  }

  // Se asegura de leer bien los datos si vienen stringificados
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'bad_request_json' })
    }
  }

  let userMessage = ''
  let history = []
  try {
    userMessage = (body.message || '').toString().slice(0, 2000)
    history = Array.isArray(body.history) ? body.history.slice(-10) : []
  } catch {
    return res.status(400).json({ error: 'bad_request' })
  }

  if (!userMessage.trim()) {
    return res.status(400).json({ error: 'empty' })
  }

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
  for (const m of history) {
    messages.push({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: (m.content || '').toString().slice(0, 2000),
    })
  }
  messages.push({ role: 'user', content: userMessage })

  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages,
        temperature: 0.75,
        max_tokens: 700,
      }),
    })

    const data = await resp.json()

    if (!resp.ok) {
      return res.status(200).json({ reply: null, error: 'api_error', details: data?.error?.message || 'Unknown API error' })
    }

    const reply = data?.choices?.[0]?.message?.content || null
    return res.status(200).json({ reply })

  } catch (err) {
    return res.status(200).json({ reply: null, error: 'fetch_failed', details: err.message })
  }
}
