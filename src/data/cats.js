export const CATS = {
  'Phishing':{
    color:'#ef4444',
    bg:'rgba(239,68,68,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    tip:'Los estafadores imitan marcas reales con urgencia artificial. Verificá siempre el dominio real antes de hacer click en cualquier link.'
  },
  'Clonación de voz IA':{
    color:'#a855f7',
    bg:'rgba(168,85,247,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    tip:'Con 3 segundos de audio, la IA puede clonar cualquier voz. Si hay urgencia y pedido de dinero, siempre cortá y verificá.'
  },
  'Autenticación':{
    color:'#06b6d4',
    bg:'rgba(6,182,212,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    tip:'El 2FA bloquea el 99% de los ataques automatizados. Activalo siempre en WhatsApp, email y redes sociales.'
  },
  'Ingeniería social':{
    color:'#f59e0b',
    bg:'rgba(245,158,11,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>',
    tip:'Ninguna empresa legítima llama sin aviso pidiendo acceso remoto. La presión y urgencia son señales de alarma.'
  },
  'Contraseñas':{
    color:'#10b981',
    bg:'rgba(16,185,129,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    tip:'Un gestor de contraseñas genera y recuerda claves únicas por cada sitio. Es gratis y elimina el mayor riesgo de seguridad.'
  },
  'WhatsApp':{
    color:'#10b981',
    bg:'rgba(16,185,129,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    tip:'El código de 6 dígitos de WhatsApp es tu llave. Quien lo tenga, controla tu cuenta. Nunca lo compartas con nadie.'
  },
  'Primeros auxilios':{
    color:'#ef4444',
    bg:'rgba(239,68,68,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    tip:'Ante una estafa, cada minuto es crítico. CERTuy (1719) y tu banco pueden bloquear transacciones si actuás rápido.'
  },
  'Cuento del tío':{
    color:'#ef4444',
    bg:'rgba(239,68,68,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    tip:'El cuento del tío usa urgencia y disfraces para que no tengas tiempo de pensar. Ante cualquier presión, cerrá la puerta y llamá vos al banco.'
  },

  'SMS falso (phishing)':{
    color:'#f59e0b',
    bg:'rgba(245,158,11,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    tip:'Los links oficiales del Estado uruguayo siempre terminan en .gub.uy. Cualquier otra dirección es falsa.'
  },
  'Robo de datos bancarios':{
    color:'#06b6d4',
    bg:'rgba(6,182,212,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    tip:'El BROU nunca contacta por WhatsApp para ofrecer beneficios ni pedir tu llave digital. Bloqueá ese contacto.'
  },
  'Premio falso':{
    color:'#a855f7',
    bg:'rgba(168,85,247,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    tip:'Si no participaste en ningún sorteo, no podés ganar nada. Todo premio inesperado que pide datos es una estafa.'
  },
  'Persona en la puerta':{
    color:'#8b7cf8',
    bg:'rgba(139,124,248,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    tip:'Cualquier inspector o funcionario real puede esperar afuera mientras verificás. Nadie puede obligarte a abrir tu puerta.'
  },
  '¿Quién toca el timbre?':{ color:'#ef4444', bg:'rgba(239,68,68,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', tip:'' },
  'El mensaje misterioso':{ color:'#f59e0b', bg:'rgba(245,158,11,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', tip:'' },
  '¿Esa voz es real?':{ color:'#a855f7', bg:'rgba(168,85,247,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>', tip:'' },
  '¿App amiga o enemiga?':{ color:'#06b6d4', bg:'rgba(6,182,212,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', tip:'' },
  'El SMS del millón':{ color:'#f59e0b', bg:'rgba(245,158,11,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>', tip:'' },
  'Antel te llama... o no':{ color:'#f97316', bg:'rgba(249,115,22,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>', tip:'' },
  'Oferta del siglo':{ color:'#06b6d4', bg:'rgba(6,182,212,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>', tip:'' },
  '¡Ganaste! ¿O no?':{ color:'#a855f7', bg:'rgba(168,85,247,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>', tip:'' },
  'Los inspectores':{ color:'#8b7cf8', bg:'rgba(139,124,248,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', tip:'' },
  'El señor del banco':{ color:'#ef4444', bg:'rgba(239,68,68,.1)', svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', tip:'' },
  'Reconocimiento':{
    color:'#f59e0b',
    bg:'rgba(245,158,11,.1)',
    svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    tip:'Si no participaste en nada, no podés ganar nada. Toda oferta no solicitada que pide datos personales es una trampa.'
  }
};
