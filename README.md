# Escudo Digital Familiar

App de prevención de ciberestafas para personas mayores — Programa de Inclusión Digital, Intendencia de Montevideo.

## Stack
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Netlify Functions (chat IA con Google Gemini)

## Deploy en Netlify
1. Conectar este repo a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Functions directory: `netlify/functions` (automático)
5. Agregar variable de entorno: `GEMINI_API_KEY` con tu clave de Google AI Studio

## Desarrollo local
```
npm install
npm run dev
```
