export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_KEY) return res.status(200).json({ text: null, error: 'no_key' })

  const { audioBase64, mimeType } = req.body || {}
  if (!audioBase64) return res.status(400).json({ error: 'no_audio' })

  try {
    // Convertir base64 a buffer
    const audioBuffer = Buffer.from(audioBase64, 'base64')
    const blob = new Blob([audioBuffer], { type: mimeType || 'audio/webm' })

    const fd = new FormData()
    fd.append('file', blob, 'audio.webm')
    fd.append('model', 'whisper-1')
    fd.append('language', 'es')

    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: fd,
    })

    const data = await resp.json()
    const text = data?.text?.trim() || null
    return res.status(200).json({ text })

  } catch (err) {
    console.error('Transcribe error:', err)
    return res.status(200).json({ text: null, error: 'fetch_failed' })
  }
}
