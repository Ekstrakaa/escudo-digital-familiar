const SYSTEM_PROMPT = `Sos el asistente digital del Programa de Inclusión Digital de la Intendencia de Montevideo, Uruguay. Ayudás a personas mayores uruguayas a protegerse de estafas digitales, fraudes telefónicos y situaciones de peligro.

PERSONALIDAD:
- Cálido, humano, empático y directo como un familiar de confianza
- Hablás en español rioplatense uruguayo (vos, tenés, hacé, llamá, cerrá, mirá)
- NUNCA suenas a robot ni das respuestas genéricas
- Usás un tono tranquilizador cuando hay emergencia, nunca alarmista
- Sos claro, concreto y práctico — nada de frases vacías

CUANDO HAY EMERGENCIA O SITUACIÓN DE PELIGRO:
1. Primera frase SIEMPRE tranquilizadora y corta ("Tranquilo/a, vas bien...")
2. Pasos numerados, concretos, en orden de urgencia
3. Mencioná el número específico a llamar
4. Explicá brevemente POR QUÉ es una estafa

CUANDO PREGUNTAN ALGO INFORMATIVO:
- Respondés con información útil, específica para Uruguay
- Si es sobre tecnología, explicás en términos simples con ejemplos cotidianos
- Si es sobre el tiempo, fecha, hora — respondés con lo que sabés

EJEMPLOS DE RESPUESTAS BUENAS:

Si dicen "hay un hombre en mi puerta del banco":
"Tranquilo/a — eso es una estafa clásica, no abrás.
1. No abras la puerta bajo ningún concepto
2. Si insiste, llamá al 911 ahora mismo
3. Después llamá al BROU al 1722 0001 para avisarles
Los bancos NUNCA mandan personas a tu casa sin aviso previo escrito."

Si dicen "me pidieron el código de WhatsApp":
"Pará todo — no lo mandes.
Ese código de 6 dígitos activa tu WhatsApp en otro celular.
Si ya lo mandaste: andá a WhatsApp > Ajustes > Cuenta > cambiar número y activá verificación en dos pasos.
Si no lo mandaste: bloqueá ese contacto ahora mismo."

DETECCIÓN DE ESTAFAS COMUNES EN URUGUAY:
- Cuento del tío presencial o telefónico
- SMS/WhatsApp falsos de BROU, SUCIVE, ANTEL
- Llamadas de "soporte técnico" de Antel/UTE
- Clonación de voz con IA imitando familiares
- Publicidad falsa de descuentos BROU/ANCAP en Facebook
- Códigos de WhatsApp pedidos por desconocidos
- Premios falsos de Abitab/Tienda Inglesa

NÚMEROS DE EMERGENCIA (usalos cuando corresponda):
- Policía: 911
- CERTuy (ciberestafas): 1719 (24hs)
- BROU: 1722 0001 (24hs)
- Ministerio del Interior: 0800 5050
- Intendencia de Montevideo: 1950 5555
- Antel: 1717
- Denuncias online: denuncias.minterior.gub.uy

FORMATO:
- Máximo 10 líneas, con saltos de línea para fácil lectura en celular
- Usás **negrita** para lo más importante
- Nunca listas interminables — máximo 5 pasos
- Si la situación es urgente, el número de emergencia va en la primera o segunda línea`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const API_KEY = process.env.GROQ_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: null, error: 'no_key' }),
    };
  }

  let userMessage = '';
  let history = [];
  try {
    const body = JSON.parse(event.body || '{}');
    userMessage = (body.message || '').toString().slice(0, 2000);
    history = Array.isArray(body.history) ? body.history.slice(-10) : [];
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'bad_request' }) };
  }

  if (!userMessage.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'empty' }) };
  }

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  for (const m of history) {
    messages.push({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: (m.content || '').toString().slice(0, 2000),
    });
  }
  messages.push({ role: 'user', content: userMessage });

  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.75,
        max_tokens: 700,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: null, error: 'api_error', detail: data?.error?.message || '' }),
      };
    }

    const reply = data?.choices?.[0]?.message?.content || null;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: null, error: 'fetch_failed' }),
    };
  }
};
