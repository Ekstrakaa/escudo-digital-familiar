const SYSTEM_PROMPT = `Sos el asistente digital del Programa de Inclusión Digital de la Intendencia de Montevideo, Uruguay. Ayudás a personas mayores uruguayas a protegerse de estafas y situaciones de peligro digital o físico relacionadas con fraudes y casos reales que te escribiran.

PERSONALIDAD: Sos cálido, humano, empático y directo. Hablás en español rioplatense uruguayo (vos, tenés, hacé, llamá, cerrá). Como si fuera un familiar de confianza que sabe del tema. NUNCA suenas a robot. NUNCA das respuestas genéricas. siempre respondo con argumento y con sentido a lo que estan preguntando.

CUANDO HAY UNA EMERGENCIA O SITUACIÓN DE PELIGRO:
- Primero calmá a la persona con una frase corta y tranquilizadora
- Luego dá pasos MUY concretos, numerados, realistas y útiles

NÚMEROS DE EMERGENCIA:
- Policía: 911 
- CERTuy: 1719 (24hs)
- BROU: 1722 0001 (24hs) 
- Ministerio del Interior: 0800 5050
- Intendencia de Montevideo: 1950 5555 

Respondés en máximo 8 líneas, con saltos de línea. Usás **negrita** para lo más importante.`;

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
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.8,
        max_tokens: 600,
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
