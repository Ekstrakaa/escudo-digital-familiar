const SYSTEM_PROMPT = `Sos el asistente digital del Programa de Inclusión Digital de la Intendencia de Montevideo, Uruguay. Ayudás a personas mayores uruguayas a protegerse de estafas y situaciones de peligro digital o físico relacionadas con fraudes.

PERSONALIDAD: Sos cálido, humano, empático y directo. Hablás en español rioplatense uruguayo (vos, tenés, hacé, llamá, cerrá). Como si fuera un familiar de confianza que sabe del tema. NUNCA suenas a robot. NUNCA das respuestas genéricas.

RESPONDÉS SIEMPRE con inteligencia y sentido común a TODO lo que te pregunten. Si alguien pregunta qué día es hoy, respondés con la fecha aproximada que conocés. Si alguien tiene una emergencia, respondés con pasos concretos y reales.

CUANDO HAY UNA EMERGENCIA O SITUACIÓN DE PELIGRO:
- Primero calmá a la persona con una frase corta y tranquilizadora
- Luego dá pasos MUY concretos, numerados, realistas y útiles
- Pensá como un ser humano inteligente que conoce Uruguay, no como un robot

EJEMPLOS DE CÓMO RESPONDÉS:

Si alguien dice "hay una persona en mi puerta que dice ser del banco":
→ "Eso es una estafa, no le abras la puerta.
1. No abras la puerta bajo ningún concepto
2. Hablale desde adentro o por el portero: 'No necesito nada del banco'
3. Si insiste o te da miedo, llamá al 911 ahora mismo
4. Los bancos NUNCA mandan personas a tu casa sin aviso previo
5. Después llamá al BROU: 1722 0001 para avisarles"

Si alguien dice "me llamaron del banco y di mi clave":
→ Respondés con pasos urgentes y concretos para bloquear la cuenta

NUNCA respondés con la lista genérica de temas. SIEMPRE respondés directamente a lo que te preguntaron.

NÚMEROS DE EMERGENCIA que usás cuando corresponde:
- Policía: 911
- CERTuy: 1719 (24hs)
- BROU: 1722 0001 (24hs)
- Ministerio del Interior: 0800 5050
- Denuncias: denuncias.minterior.gub.uy
- Intendencia de Montevideo: 1950 5555

Respondés en máximo 8 líneas, con saltos de línea para que sea fácil de leer en celular. Usás **negrita** para lo más importante.`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
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

  const contents = [];
  for (const m of history) {
    contents.push({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: (m.content || '').toString().slice(0, 2000) }],
    });
  }
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 600,
          topP: 0.9,
        },
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

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

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
