// ============================================================
// ESCUDO DIGITAL FAMILIAR — steps.js
// 10 preguntas + 4 tarjetas ¿Sabías que?
// Imágenes referenciadas desde /public/imgs/
// ============================================================

export const STEPS = [

  // ─── PREGUNTA 1: Cuento del tío presencial ───────────────
  {
    type: 'q',
    id: 1,
    cat: '¿Quién toca el timbre?',
    icon: '🚪',
    txt: '⚠️ Un señor en la puerta con credencial del BROU dice que tu cuenta tiene un problema y necesita tu tarjeta y clave.\n\n¿Qué hacés?',
    opts: [
      'Le doy la tarjeta y la clave — tiene credencial y parece muy serio',
      'Cierro la puerta, llamo YO al BROU al 1722 0001 para verificar',
      'Le doy la tarjeta pero no la clave, así no puede hacer nada raro',
      'Lo hago pasar y llamamos juntos al banco desde mi casa'
    ],
    ok: 1,
    fc: '✅ ¡Correcto! Los bancos NUNCA mandan gente a tu casa. La urgencia es el truco. Cerrá y llamá vos al BROU: 1722 0001.',
    fw: '❌ Cuidado. Ningún banco manda empleados a tu puerta. Cerrá y llamá vos al BROU: 1722 0001.'
  },

  // ─── ¿SABÍAS QUE? 1: Canal 4 hombre ─────────────────────
  {
    type: 'fact',
    img: '<img src="/imgs/canal4_hombre.png" alt="Noticia Canal 4 - Hombre 90 años estafado" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '<div style="font-size:1.05rem;font-weight:800;color:#ef4444;margin-bottom:10px;letter-spacing:.01em">📺 CASO REAL — CANAL 4</div><div style="font-size:.9rem;line-height:1.6;color:#f0f6ff;margin-bottom:10px">Un hombre de <strong>90 años</strong> fue estafado con el <strong>cuento del tío</strong>. Se hicieron pasar por su nieto, le inventaron un accidente y le pidieron un préstamo urgente. El hombre entregó su tarjeta y datos personales perdiendo <strong style="color:#ef4444">$46.000 pesos</strong>.</div><div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:10px 12px;font-size:.85rem;line-height:1.55;color:#f0f6ff">🔒 Si alguien en la puerta pide datos o dinero → <strong>cerrá y llamá al 911</strong><br><br>💬 <strong style="color:#00e5a0">Consultá en nuestra web</strong> — te ayudamos enseguida ante cualquier situación.</div>',
  },

  // ─── PREGUNTA 2: WhatsApp falso nieto ───────────────────
  {
    type: 'q',
    id: 2,
    cat: 'El mensaje misterioso',
    icon: '📱',
    txt: '💬 WhatsApp de número desconocido:\n"Soy Matías, perdí el celu, tuve un accidente. Mandame $15.000 por Abitab urgente. No le digas a mamá."\n\n¿Qué hacés?',
    opts: [
      'Mando los $15.000 de inmediato — suena a que es mi nieto y lo necesita',
      'Le mando $5.000 nomás, por las dudas que sea verdad',
      'Llamo al número viejo de Matías para verificar que sea realmente él',
      'Le pido que me mande una foto para confirmar su identidad'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! Llamar al número conocido del familiar es la única forma segura. "No le digas a nadie" es siempre señal de estafa.',
    fw: '❌ "No le digas a nadie" es siempre estafa. Nunca mandes plata sin llamar primero al número guardado de tu familiar.'
  },

  // ─── PREGUNTA 3: Clonación de voz IA ────────────────────
  {
    type: 'q',
    id: 3,
    cat: '¿Esa voz es real?',
    icon: '🤖',
    txt: '📲 Te llama alguien con la voz de tu hija, llorando:\n"Tuve un accidente, mandame $10.000 ahora."\n\n¿Qué hacés?',
    opts: [
      'Transfiero de inmediato — reconozco perfectamente su voz, es ella',
      'Le pido más detalles del accidente antes de transferir',
      'Cuelgo y llamo YO al número guardado de mi hija para verificar',
      'Le digo que voy personalmente a verla al hospital'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! La IA puede copiar cualquier voz. La única defensa: colgá y llamá vos al número guardado de tu familiar.',
    fw: '❌ Se llama clonación de voz con IA. Colgá siempre y llamá vos al número guardado del familiar.'
  },


  // ─── ¿SABÍAS QUE? — Telenoche millón ────────────────────
  {
    type: 'fact',
    img: '<img src="/imgs/telenoche_millon.png" alt="Cuento del tío - un millón de pesos" style="width:100%;display:block;object-fit:cover;object-position:center top;max-height:200px;border-radius:10px;" />',
    txt: '<strong style="color:#ef4444">📺 Caso real — Cuento del tío telefónico</strong><br><br>Se hicieron pasar por policías y lograron que una víctima transfiriera <strong>más de un millón de pesos</strong>. Todo empezó con una llamada al teléfono de línea de su casa.<br><br><strong style="color:#f59e0b">⚠️ Recordá siempre:</strong><br>• La Policía <strong>NUNCA</strong> te va a llamar para pedirte dinero<br>• Ningún funcionario oficial pide transferencias por teléfono<br>• Ante cualquier llamada sospechosa, <strong>colgá y llamá al 911 vos</strong><br><br><div style="margin-top:12px;padding:10px 14px;border-radius:10px;background:rgba(0,229,160,.07);border:1px solid rgba(0,229,160,.2);color:#00e5a0;font-size:.85rem">💬 Si te pasa algo así, consultá en nuestro <strong>chat de Escudo Digital</strong> — te ayudamos a actuar paso a paso ante cualquier situación.</div>',
  },

  // ─── PREGUNTA 4: A2F Autenticación de dos factores ──────
  {
    type: 'q',
    id: 4,
    cat: '¿App amiga o enemiga?',
    icon: '🔐',
    img: '<img src="/imgs/A2F.png" alt="Aplicaciones A2F Google y Microsoft Authenticator" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '🛡️ ¿Instalarías alguna de estas apps en tu celular?\nSe llaman A2F, son de Google y Microsoft.',
    opts: [
      'No — pueden ser cualquier cosa peligrosa o un virus',
      'Sí, claro — es la galería de Google, la uso todos los días',
      'Sí, claro — instalo todas, son super seguras y necesarias',
      'No instalo nada en mi celu sin que me lo pida el banco primero'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! Son de Google y Microsoft — completamente seguras y muy necesarias. El A2F protege tus cuentas aunque alguien te robe la contraseña.',
    fw: '❌ Ojo — el A2F no es la galería de fotos ni algo del banco. Es una app de seguridad de Google y Microsoft, gratuita y muy útil para protegerte.'
  },

  // ─── PREGUNTA 5: SMS SUCIVE multa falsa ─────────────────
  {
    type: 'q',
    id: 5,
    cat: 'El SMS del millón',
    icon: '📨',
    txt: '✉️ SMS recibido:\n"SUCIVE: Multa vencida, si no pagás hoy aumenta. Ingresá acá: asucive.cc/uy/multa"\n\n¿Qué hacés?',
    opts: [
      'Entro rápido al link — no quiero que me aumenten la deuda',
      'Le muestro el SMS a un familiar para que entre él por mí',
      'Borro el SMS — SUCIVE nunca manda links y el sitio real es sucive.gub.uy',
      'Llamo al número que aparece en el SMS para consultar si es real'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! SUCIVE nunca manda links. Los sitios oficiales terminan en .gub.uy — cualquier otro es falso.',
    fw: '❌ Links que no terminan en .gub.uy son siempre falsos. Borrá el mensaje sin tocarlo.'
  },

  // ─── ¿SABÍAS QUE? 2: Canal 4 mujer ──────────────────────
  {
    type: 'fact',
    img: '<img src="/imgs/canal4_mujer.png" alt="Noticia Canal 4 - Mujer estafada por $90.000" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '<strong style="color:#ef4444">📺 Caso real — Canal 4</strong><br><br>Una mujer perdió <strong>casi $90.000</strong> con el cuento del tío.<br><br>🔒 Ningún banco ni funcionario pide dinero por teléfono o en la puerta. Si te pasó → <strong>911 o 0800 5050</strong>',
  },

  // ─── PREGUNTA 6: Antel virus router ─────────────────────
  {
    type: 'q',
    id: 6,
    cat: 'Antel te llama... o no',
    icon: '📞',
    txt: '📡 Te llaman de "Antel": detectaron un virus en tu router y necesitan acceso a tu Gmail para solucionarlo.\n\n¿Qué hacés?',
    opts: [
      'Les doy el Gmail — Antel es una empresa del Estado y es de confianza',
      'Les pido que me expliquen mejor qué virus encontraron',
      'Llamo a un familiar para contarle antes de dar cualquier dato',
      'Cuelgo y bloqueo el número — ninguna empresa pide el Gmail por teléfono'
    ],
    ok: 3,
    fc: '✅ ¡Muy bien! Ninguna empresa llama para pedir el Gmail. Si das acceso, pueden ver tus claves bancarias y fotos.',
    fw: '❌ Ninguna empresa pide el Gmail por teléfono. Es siempre estafa. Colgá y bloqueá el número.'
  },

  // ─── PREGUNTA 7: BROU + ANCAP descuento WhatsApp ────────
  {
    type: 'q',
    id: 7,
    cat: 'Oferta del siglo',
    icon: '💳',
    img: '<img src="/imgs/brou_ancap.png" alt="Publicidad falsa BROU ANCAP" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '💳 Te llega este WhatsApp con la imagen de arriba.\n\n¿Qué hacés?',
    opts: [
      'Entro y doy mis datos — es del BROU y ANCAP, parecen logos reales',
      'Le pregunto al banco más detalles antes de dar mis datos',
      'Cierro el WhatsApp y bloqueo — el BROU NUNCA regala beneficios así',
      'Reenvío el mensaje a un familiar para ver si él también lo recibió'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! El BROU nunca da beneficios por WhatsApp. La "llave digital" son tus claves bancarias — nunca las des.',
    fw: '❌ Fraude real en Uruguay. El BROU nunca da beneficios por WhatsApp. Bloqueá ese número.'
  },

  // ─── ¿SABÍAS QUE? 3: Correo Uruguayo falso ───────────────
  {
    type: 'fact',
    img: '<img src="/imgs/correo_uy.png" alt="Email falso Correo Uruguayo" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '<strong style="color:#ef4444">⚠️ Email falso — Correo Uruguayo</strong><br><br>Copian el diseño del Correo para cobrar gastos de envío falsos.<br><br>🔒 Si el link no termina en <strong>.gub.uy</strong> → es falso. No ingreses tu tarjeta.',
  },

  // ─── PREGUNTA 8: Premio falso Abitab ────────────────────
  {
    type: 'q',
    id: 8,
    cat: '¡Ganaste! ¿O no?',
    icon: '🎁',
    txt: '📩 Email recibido:\n"¡Ganaste un viaje a Punta del Este de Abitab! Ingresá tu tarjeta. Solo 24 horas."\n\n¿Qué hacés?',
    opts: [
      'Entro rápido al link — ¡un viaje a Punta del Este sería increíble!',
      'Reenvío el email a un familiar para que lo revise por mí',
      'Borro el email — Abitab nunca pide datos por email y no participé en ningún sorteo',
      'Llamo al número que aparece en el email para verificar el premio'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! Si no participaste, no ganaste nada. Nadie pide datos de tarjeta para entregar premios.',
    fw: '❌ Si no participaste en ningún sorteo, no podés ganar nada. Nunca des datos por email inesperado.'
  },


  // ─── ¿SABÍAS QUE? — Hombre estafado USD 18.000 ──────────
  {
    type: 'fact',
    img: '<img src="/imgs/cuento_tio_hombre.png" alt="Hombre estafado USD 18.000" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '<strong style="color:#ef4444">⚠️ Caso real — Cuento del tío: USD 18.000 y $350.000</strong><br><br>Un hombre de 67 años fue engañado por alguien que se hizo pasar por su hijo. Le dijeron que había tenido un accidente grave y necesitaba dinero urgente. Perdió <strong>USD 18.000 y $350.000 pesos</strong>.<br><br><strong style="color:#f59e0b">Antes de mandar cualquier dinero:</strong><br>• Llamá directamente al número guardado de tu familiar<br>• Consultá con otro familiar de confianza lo que está pasando<br>• Llamá al <strong style="color:#00c8ff">911</strong> si sentís presión o amenazas<br><br><div style="margin-top:12px;padding:10px 14px;border-radius:10px;background:rgba(0,229,160,.07);border:1px solid rgba(0,229,160,.2);color:#00e5a0;font-size:.85rem">💬 Ante cualquier situación de urgencia con dinero, usá nuestro <strong>chat de Escudo Digital</strong> — te orientamos antes de que tomes cualquier decisión.</div>',
  },

  // ─── PREGUNTA 9: DOS hombres con uniforme IM ────────────
  {
    type: 'q',
    id: 9,
    cat: 'Los inspectores',
    icon: '🚪',
    txt: '🔍 Dos hombres con uniforme de la Intendencia en la puerta:\n"Inspección obligatoria, necesitamos entrar ahora."\n\n¿Qué hacés?',
    opts: [
      'Los dejo pasar — tienen uniforme y dicen que es obligatorio',
      'Les pido el número de expediente y llamo a la Intendencia al 1950 0911 para verificar',
      'Los dejo pasar pero me quedo mirando todo lo que hacen',
      'Les digo que esperen afuera mientras llamo a un familiar'
    ],
    ok: 1,
    fc: '✅ ¡Bien! Cualquier inspector real puede esperar. Cerrá la puerta y llamá vos a la Intendencia: 1950 0911.',
    fw: '❌ Los uniformes se pueden falsificar. Nadie puede obligarte a abrir. Cerrá y llamá: 1950 0911.'
  },

  // ─── PREGUNTA 10: Señor con traje del Banco República ───
  {
    type: 'q',
    id: 10,
    cat: 'El señor del banco',
    icon: '🏦',
    txt: '🏛️ Hombre con traje del Banco República en la puerta:\n"Movimiento sospechoso en tu cuenta, necesito tu llave digital y CVV."\n\n¿Qué hacés?',
    opts: [
      'Le doy la llave digital y el CVV — quiero proteger mis ahorros',
      'Le doy solo el CVV y guardo la llave digital para mí',
      'Cierro la puerta y llamo al BROU al 1722 0001 — el banco nunca manda gente a pedir datos',
      'Le pido que me muestre más documentación antes de dar nada'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! El BROU nunca manda gente a pedir datos. Cerrá la puerta y llamá: 1722 0001.',
    fw: '❌ El CVV y la llave digital son las llaves de tu cuenta. El BROU nunca los pide en persona. Cerrá y llamá: 1722 0001.'
  },

  // ─── ¿SABÍAS QUE? 4: Talleres IM ─────────────────────────
  {
    type: 'fact',
    img: '<img src="/imgs/manosdigital.png" alt="Curso inclusión digital personas mayores" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '<strong style="color:#10b981">🏛️ Talleres digitales GRATIS — IM</strong><br><br>La Intendencia de Montevideo tiene talleres para personas mayores: aprendé a usar el celular y reconocer estafas.<br><br>📞 <strong style="color:#8b7cf8">1950 5555</strong> · Estafas digitales: <strong style="color:#00c8ff">2030 4625</strong>',
  }

]
