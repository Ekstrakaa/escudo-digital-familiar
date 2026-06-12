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
    txt: '⚠️ Un señor en la puerta con credencial del BROU dice que tu cuenta tiene un problema y necesita tu tarjeta y clave. ¿Qué hacés?',
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
    txt: '💬 WhatsApp de número desconocido: "Soy Matías, perdí el celu, tuve un accidente. Mandame $15.000 por Abitab urgente. No le digas a mamá." ¿Qué hacés?',
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
  // ─── PREGUNTA 3: Vishing call center ────────────────────
  {
    type: 'q',
    id: 3,
    cat: '¿Esa voz es real?',
    icon: '📞',
    txt: '📲 Te llama alguien de "Claro" ofreciendo internet gratis. Para activarlo te pide tu cédula y los datos de tu tarjeta. Pero vos sos cliente de Tigo y nunca pediste nada. ¿Qué hacés?',
    opts: [
      'Le doy los datos — suena muy profesional y la oferta es buena',
      'Le doy el nombre y cédula nomás, pero no los datos de la tarjeta',
      'Cuelgo de inmediato — nunca solicité nada y ninguna empresa pide datos de tarjeta por teléfono',
      'Le pido que me llame en otro momento cuando tenga tiempo'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! Esto se llama Vishing — estafa por llamada. Nunca des datos personales ni bancarios por teléfono a alguien que llamó sin que vos lo pidieras. Colgá siempre.',
    fw: '❌ Esto es Vishing — estafa por teléfono. Con tu nombre, cédula y datos de tarjeta pueden robarte dinero y suplantar tu identidad. Colgá siempre ante llamadas no solicitadas que pidan datos.'
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
    txt: '🛡️ ¿Instalarías alguna de estas apps en tu celular? Se llaman A2F, son de Google y Microsoft.',
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
    txt: '✉️ SMS recibido: "SUCIVE: Multa vencida, si no pagás hoy aumenta. Ingresá acá: asucive.cc/uy/multa" ¿Qué hacés?',
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
    cat: 'La llamada de Antel',
    icon: '📞',
    txt: '📞 Te llaman de "Antel": dicen que la tarjeta con la que pagás el teléfono fue rechazada y que, para no cortarte el servicio, necesitan que les confirmes el PIN de tu tarjeta. ¿Qué hacés?',
    opts: [
      'Les doy el PIN — no quiero que me corten el teléfono',
      'Les doy el número de la tarjeta pero el PIN no',
      'Cuelgo: el PIN no se dice por teléfono a nadie. Si tengo dudas, llamo yo a Antel',
      'Les pido que me manden un mail con la deuda antes de pagar'
    ],
    ok: 2,
    fc: '✅ ¡Exacto! El PIN es secreto y NUNCA se dice por teléfono — ni a Antel, ni al banco, ni a nadie. Si dudás, colgá y llamá vos a Antel.',
    fw: '❌ Ojo: el PIN de tu tarjeta es secreto. Ninguna empresa de verdad te lo pide por teléfono. Colgá y verificá llamando vos a Antel.'
  },

  // ─── PREGUNTA 7: BROU + ANCAP descuento WhatsApp ────────
  {
    type: 'q',
    id: 7,
    cat: 'Oferta del siglo',
    icon: '💳',
    img: '<img src="/imgs/brou_ancap.png" alt="Publicidad falsa BROU ANCAP" style="width:100%;display:block;object-fit:cover;max-height:200px;border-radius:10px;" />',
    txt: '💳 Te llega este WhatsApp con la imagen de arriba. ¿Qué hacés?',
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
    txt: '📩 Email recibido: "¡Ganaste un viaje a Punta del Este de Abitab! Ingresá tu tarjeta. Solo 24 horas." ¿Qué hacés?',
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
    cat: 'El nieto en problemas',
    icon: '📞',
    txt: '📞 Un "abogado" y un "policía" te llaman: tu nieto chocó a una embarazada, hay un juicio y tenés que mandar $60.000 YA para que no quede preso. No te dejan hablar con él. ¿Qué hacés?',
    opts: [
      'Mando los $60.000 enseguida — no quiero que mi nieto quede preso',
      'Pido más datos del juicio y del policía antes de decidir',
      'Corto y llamo yo al número guardado de mi nieto (o a otro familiar) para verificar',
      'Mando una parte ahora y el resto cuando pueda hablar con él'
    ],
    ok: 2,
    fc: '✅ ¡Correcto! Es el cuento del tío. La Justicia y la Policía NUNCA piden dinero por teléfono. Cortá y llamá vos al número de tu nieto o a otro familiar para confirmar.',
    fw: '❌ Es el cuento del tío. Ni un abogado ni la Policía piden plata urgente por teléfono. Cortá y llamá vos al número guardado de tu familiar antes de hacer nada.'
  },

  // ─── PREGUNTA 10: Señor con traje del Banco República ───
  {
    type: 'q',
    id: 10,
    cat: 'El señor del banco',
    icon: '🏦',
    txt: '🏛️ Hombre con traje del Banco República en la puerta: "Movimiento sospechoso en tu cuenta, necesito tu llave digital y CVV." ¿Qué hacés?',
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
