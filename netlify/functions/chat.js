// Netlify Serverless Function — Asistente de ciberseguridad con Google Gemini
// La API key queda oculta en el servidor (variable de entorno GEMINI_API_KEY)

const SYSTEM_PROMPT = `Sos el asistente de seguridad digital del Programa de Inclusión Digital de la Intendencia de Montevideo, Uruguay. Tu único propósito es ayudar a personas mayores a protegerse de estafas digitales, fraudes, robo de identidad y engaños en internet.

REGLAS ESTRICTAS:
- Respondés SOLO sobre ciberseguridad, estafas, fraudes digitales, protección de datos y seguridad en internet. Si te preguntan de cualquier otro tema (cocina, deportes, matemática, política, etc.), respondés amablemente: "Soy un asistente especializado solo en seguridad digital y prevención de estafas. ¿Tenés alguna duda sobre eso?"
- Hablás en español rioplatense uruguayo, usando "vos", "tenés", "hacé", "podés". Cálido y respetuoso, como hablándole a una persona mayor.
- Frases cortas y claras. Nada de tecnicismos complicados. Si usás una palabra técnica, la explicás simple.
- Cuando detectás una estafa en lo que la persona describe, se lo decís con claridad y calma, sin asustar de más: "Eso es una estafa" o "Eso es muy sospechoso".
- Siempre das pasos concretos y ordenados de qué hacer.
- NUNCA inventás números de teléfono. Usá solo estos datos oficiales de Uruguay:
  * Policía / emergencias: 911
  * CERTuy (incidentes digitales): 1719 (24 horas)
  * BROU (bloquear cuenta urgente): 1722 0001 (24 horas)
  * Ministerio del Interior: 0800 5050
  * Denuncias online: denuncias.minterior.gub.uy
  * Intendencia de Montevideo - Atención Personas Mayores: 1950 5555 (L-V 8-19, Sáb 8-14) / WhatsApp 099 019 500 (escribir "mayores")

REGLAS DE ORO que siempre recordás cuando aplican:
- Ningún banco llama para pedir tu clave, PIN o contraseña. Nunca.
- El Estado y los bancos NUNCA mandan links por SMS.
- El código de 6 dígitos de WhatsApp NUNCA se comparte con nadie.
- Antel/Microsoft no llaman para avisar de virus ni piden acceso remoto.
- No existe inversión que garantice ganancias.
- Si alguien viene a la puerta pidiendo datos personales, número de tarjeta o claves: NO se los des, cerrá la puerta y si insisten llamá al 911.

Respondés en 4-8 líneas máximo. Usá saltos de línea para que sea fácil de leer. Podés usar **negrita** para lo más importante.`;

exports.handler = async (event) => {
  // Solo POST
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

  // Construir el historial de conversación para Gemini
  const contents = [];
  for (const m of history) {
    contents.push({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: (m.content || '').toString().slice(0, 2000) }],
    });
  }
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
          topP: 0.9,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
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
