// Test de Blindaje Digital — banco de preguntas
// Tipos: 'mcq' (opción múltiple) · 'real' (¿Estafa o real?) · 'tf' (Verdadero o Falso)
// Las tarjetas "¿Sabías que?" de la versión anterior quedan en el historial de Git.

export const STEPS = [
  {
    type: 'mcq', id: 1, cat: '¿Quién toca el timbre?', icon: '🚪',
    q: 'Un señor con credencial del BROU toca tu puerta y dice que tu cuenta tiene un problema. Te pide la <b>tarjeta y la clave</b>. ¿Qué hacés?',
    opts: [
      'Le doy la tarjeta y la clave',
      'Cierro y llamo yo al BROU (1722 0001)',
      'Le doy la tarjeta pero no la clave',
      'Lo hago pasar y llamamos juntos',
    ],
    ok: 1,
    okFb: ['¡Correcto!', 'Los bancos nunca mandan gente a tu casa. Cerrá y llamá vos al 1722 0001.'],
    noFb: ['Ojo con esto', 'Ningún banco manda empleados a tu puerta. Cerrá y llamá vos al BROU: 1722 0001.'],
  },
  {
    type: 'real', id: 2, channel: 'wa', sender: '+598 91 234 567', sub: 'número desconocido',
    text: 'Hola abu, soy Marti. Cambié de número, guardalo. Perdí la tarjeta y necesito que me hagas un giro de <b style="color:#ffd9a0">$8.000</b> por Abitab. No le digas a nadie por ahora',
    time: '11:42', answer: 'estafa',
    okFb: ['¡Bien visto!', 'Clásico del "cambié de número". Tu nieto de verdad no te pide plata por Abitab… y menos en secreto.'],
    noFb: ['Era estafa', '"Cambié de número + giro urgente + no le digas a nadie" es la receta del cuento del tío.'],
  },
  {
    type: 'tf', id: 3,
    statement: 'El BROU <b style="color:#7ff0c8">nunca</b> te va a pedir tu clave ni el código que llega por SMS, ni por teléfono ni en la puerta.',
    answer: 'verdadero',
    okFb: ['¡Tal cual!', 'El banco jamás pide tu clave ni el código. Quien te lo pida, es chorro. Cortá.'],
    noFb: ['Era verdadero', 'El banco nunca pide eso. Si alguien lo pide, es estafa segura.'],
  },
  {
    type: 'real', id: 4, channel: 'sms', sender: 'SUCIVE', sub: 'remitente: SMS',
    text: 'SUCIVE: Multa vencida. Si no pagás hoy aumenta. Ingresá acá: <span style="color:#7ab8ff;text-decoration:underline">asucive.cc/uy/multa</span>',
    time: '09:15', answer: 'estafa',
    okFb: ['¡Exacto!', 'Los sitios del Estado terminan en .gub.uy. Ese ".cc" es trucho de fábrica.'],
    noFb: ['Es estafa', 'SUCIVE no manda links por SMS. El sitio real es sucive.gub.uy — borralo sin tocar.'],
  },
  {
    type: 'mcq', id: 5, cat: 'La llamada inesperada', icon: '☎️',
    q: 'Te llaman de una "empresa de premios": ganaste y para cobrar necesitan el número y el <b>código de seguridad</b> de tu tarjeta. ¿Qué hacés?',
    opts: [
      'Le doy los datos, la oferta es buenísima',
      'Le doy el número pero el código no',
      'Cuelgo: nunca participé y nadie pide datos de tarjeta por teléfono',
      'Le pido que me llame más tarde',
    ],
    ok: 2,
    okFb: ['¡Perfecto!', 'Si no participaste, no ganaste. Y el código de la tarjeta no se da por teléfono jamás.'],
    noFb: ['Cuidado', 'Ningún premio real pide los datos de tu tarjeta. Cortá tranquila.'],
  },
  {
    type: 'tf', id: 6,
    statement: 'Si un <span style="background:linear-gradient(100deg,#c4b9ff,#7ad2ff);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:600">"príncipe"</span> de un país lejano te quiere regalar su fortuna por email, conviene aceptar antes de que se arrepienta.',
    answer: 'falso',
    okFb: ['¡Falso, obvio!', 'Jaja, ojalá. Ningún príncipe reparte herencias por mail: es el cuento más viejo de internet.'],
    noFb: ['Era falso', 'Si suena demasiado bueno para ser verdad, casi siempre es chamuyo.'],
  },
  {
    type: 'real', id: 7, channel: 'wa', sender: 'BROU Beneficios', sub: 'número desconocido',
    text: '🎉 ¡Felicitaciones! Por ser cliente del BROU tenés un beneficio de <b style="color:#ffd9a0">$10.000</b>. Activalo hoy en: <span style="color:#7ab8ff;text-decoration:underline">brou-beneficios.com</span>',
    time: '16:20', answer: 'estafa',
    okFb: ['¡Muy bien!', 'El BROU no regala plata por WhatsApp, y su sitio es brou.com.uy — no "brou-beneficios.com".'],
    noFb: ['Es estafa', 'El dominio "brou-beneficios.com" no es del banco. El BROU no regala beneficios por WhatsApp.'],
  },
  {
    type: 'mcq', id: 8, cat: 'Detectá la pista', icon: '🔍',
    q: 'Te llega un email del "Correo Uruguayo", con logo perfecto, para pagar un envío retenido. ¿Qué lo delata como falso?',
    opts: [
      'Nada, el logo está impecable',
      'El remitente es correo-uy@gmail.com (no termina en .gub.uy)',
      'Que tenga el logo',
      'Que hable de un paquete',
    ],
    ok: 1,
    okFb: ['¡Ojo de detective!', 'El logo se copia en 2 minutos. Lo que no se falsea es el dominio: el oficial termina en .gub.uy.'],
    noFb: ['La pista era el remitente', 'Un email oficial del Correo nunca sale de un @gmail.com. Mirá la dirección, no el logo.'],
  },
  {
    type: 'tf', id: 9,
    statement: 'Si quien te escribe sabe tu nombre y los <b>últimos 4 dígitos</b> de tu tarjeta, entonces seguro es tu banco de verdad.',
    answer: 'falso',
    okFb: ['¡Falso!', 'Esos datos se filtran y se compran. Saber algo tuyo no prueba nada: el banco igual no te pide claves.'],
    noFb: ['Era falso', 'Los estafadores muchas veces ya tienen algunos datos tuyos. Eso no los convierte en tu banco.'],
  },
  {
    type: 'mcq', id: 10, cat: 'La regla de oro', icon: '🛡️',
    q: 'En una frase: ¿cuál es la mejor defensa contra casi todas estas estafas?',
    opts: [
      'Tener una clave bien larga',
      'Frenar, no apurarme y verificar yo por un canal oficial',
      'No usar nunca el celular',
      'Contestar siempre para no quedar mal',
    ],
    ok: 1,
    okFb: ['¡Esa es!', 'El apuro es el arma del estafador. Frenar y verificar vos por un número oficial te salva casi siempre.'],
    noFb: ['La clave es frenar', 'Ninguna estafa resiste a que cortes y verifiques vos por un canal oficial. El apuro es su mejor arma.'],
  },
]

// Reglas de oro que muestra la pantalla de resultados
export const GOLDEN_RULES = [
  'El banco nunca pide tu clave ni los códigos que llegan por SMS.',
  'Si te apuran, frená: cortá y verificá vos por un número oficial.',
  'Los sitios del Estado terminan en .gub.uy. El logo no garantiza nada.',
]
