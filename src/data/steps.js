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
    cat: 'Cuento del tío',
    icon: '🚪',
    txt: 'Son las 2 de la tarde.🚪 Tocan el timbre.\n\nAbre la puerta y hay un señor mayor, bien vestido, con corbata y una credencial del Banco República. Con cara preocupada dice:\n\n"Buenas tardes. Soy Carlos García, supervisor del BROU. Su cuenta tiene un problema grave y si no resolvemos esto hoy antes de las 5pm, sus ahorros quedan bloqueados. Necesito su tarjeta y su clave para reactivar el servicio."\n\n¿Qué hacés?',
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
    img: '<img src="/imgs/canal4_hombre.png" alt="Noticia Canal 4 - Hombre 90 años estafado" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: '<strong style="color:#ef4444">📺 Caso real Uruguay — Canal 4</strong><br><br>Un hombre de <strong>90 años fue estafado por $46.000</strong> con el cuento del tío. Se hicieron pasar por su nieto y le pidieron que sacara un préstamo del banco.<br><br><strong style="color:#f59e0b">⚠️ Ante cualquier persona en la puerta pidiendo datos o dinero:</strong><br>Cerrá la puerta y llamá al <strong style="color:#10b981">911</strong> o al Ministerio del Interior: <strong style="color:#10b981">0800 5050</strong>',
    stat: 'Las víctimas del cuento del tío en Uruguay pierden en promedio $40.000 pesos por caso denunciado.',
    src: 'Canal 4 Uruguay · Telenoche 2025'
  },

  // ─── PREGUNTA 2: WhatsApp falso nieto ───────────────────
  {
    type: 'q',
    id: 2,
    cat: 'Ingeniería social',
    icon: '📱',
    txt: '📱 Te llega este mensaje de WhatsApp de un número desconocido:\n\n"Hola abuela, soy Matías 😢 Perdí el celu, este es mi número nuevo. Tuve un accidente y necesito que me mandés $15.000 pesos por Abitab URGENTE, te los devuelvo mañana. No le digas nada a mamá todavía."\n\n¿Qué hacés?',
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
    cat: 'Clonación de voz IA',
    icon: '🤖',
    txt: '📞 Te llama alguien con la voz EXACTA de tu hija. Llorando te dice:\n\n"Mamá, tuve un accidente, estoy bien pero necesito que me girés $10.000 pesos AHORA MISMO a esta cuenta 00123792. Por favor mandalo ya, después te explico todo, está en trámite legal y no puedo hablar mucho."\n\n¿Qué hacés?',
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
    img: '<img src="/imgs/telenoche_millon.png" alt="Cuento del tío - un millón de pesos" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: '<strong style="color:#ef4444">📺 Caso real — Cuento del tío telefónico</strong><br><br>Se hicieron pasar por policías y lograron que una víctima transfiriera <strong>más de un millón de pesos</strong>. Todo empezó con una llamada al teléfono de línea de su casa.<br><br><strong style="color:#f59e0b">⚠️ Recordá siempre:</strong><br>• La Policía <strong>NUNCA</strong> te va a llamar para pedirte dinero<br>• Ningún funcionario oficial pide transferencias por teléfono<br>• Ante cualquier llamada sospechosa, <strong>colgá y llamá al 911 vos</strong><br><br><div style="margin-top:12px;padding:10px 14px;border-radius:10px;background:rgba(0,229,160,.07);border:1px solid rgba(0,229,160,.2);color:#00e5a0;font-size:.85rem">💬 Si te pasa algo así, consultá en nuestro <strong>chat de Escudo Digital</strong> — te ayudamos a actuar paso a paso ante cualquier situación.</div>',
    stat: 'En Uruguay los estafadores llaman al teléfono de línea haciéndose pasar por policías o familiares para crear pánico y conseguir transferencias.',
    src: 'Telenoche · Canal 4 Uruguay 2025'
  },

  // ─── PREGUNTA 4: Código 6 dígitos WhatsApp ──────────────
  {
    type: 'q',
    id: 4,
    cat: 'WhatsApp código',
    icon: '🔐',
    txt: '📱 Te llega este mensaje de WhatsApp de un número desconocido:\n\n"Hola, soy del soporte técnico de WhatsApp. Detectamos actividad inusual en tu cuenta. Por error te enviamos un código de seguridad de 6 dígitos a tu celular. ¿Me lo podés reenviar urgente para proteger tu cuenta?"\n\n¿Qué hacés?',
    opts: [
      'Reenvío el código — quiero que mi cuenta esté segura',
      'Le pido más información y documentación antes de enviarlo',
      'WhatsApp NUNCA escribe ni pide códigos — bloqueo ese número ahora mismo',
      'Llamo a un familiar para que me ayude a decidir qué hacer'
    ],
    ok: 2,
    fc: '✅ ¡Perfecto! WhatsApp nunca pide códigos. Ese código es la llave de tu cuenta — si lo das, pierden el control de tu WhatsApp.',
    fw: '❌ WhatsApp nunca pide códigos. Ese código activa tu cuenta en otro celular. Bloqueá ese número ya.'
  },

  // ─── PREGUNTA 5: SMS SUCIVE multa falsa ─────────────────
  {
    type: 'q',
    id: 5,
    cat: 'SMS falso (phishing)',
    icon: '📨',
    txt: '📨 Te llega este SMS al celular:\n\n"SUCIVE: Tenés una multa de tránsito vencida sin pagar. Si no regularizás HOY la deuda aumenta y puede ir a embargo. Ingresá acá para pagar: asucive.cc/uy/multa"\n\n¿Qué hacés?',
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
    img: '<img src="/imgs/canal4_mujer.png" alt="Noticia Canal 4 - Mujer estafada por $90.000" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: '<strong style="color:#ef4444">📺 Caso real Uruguay — Canal 4</strong><br><br>Una mujer fue <strong>estafada por casi $90.000</strong> con el cuento del tío. La denuncia policial muestra el monto exacto de lo robado.<br><br><strong style="color:#f59e0b">⚠️ Recordá siempre:</strong> Ningún banco, familiar ni funcionario tiene derecho a pedirte dinero o datos por teléfono, WhatsApp o en la puerta de tu casa.<br><br>Si creés que fuiste víctima llamá al <strong style="color:#10b981">911</strong> o al <strong style="color:#10b981">0800 5050</strong>',
    stat: 'En Uruguay se denuncian más de 50 casos de cuento del tío por mes — y muchos más no se denuncian.',
    src: 'Canal 4 Uruguay · Telenoche 2025'
  },

  // ─── PREGUNTA 6: Antel virus router ─────────────────────
  {
    type: 'q',
    id: 6,
    cat: 'Ingeniería social',
    icon: '📞',
    txt: '📞 Te llaman diciendo ser de Antel Soporte Técnico. Con tono profesional dicen:\n\n"Buenas tardes, llamamos porque detectamos un virus en el router de su hogar que puede comprometer sus datos bancarios. Para solucionarlo necesitamos que nos facilite acceso a su cuenta de Gmail para activar el servicio de seguridad remota."\n\n¿Qué hacés?',
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
    cat: 'Robo de datos bancarios',
    icon: '💳',
    img: '<img src="/imgs/brou_ancap.png" alt="Publicidad falsa BROU ANCAP" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: '📱 Te llega un mensaje de WhatsApp con esta imagen:\n\n"¡Beneficio exclusivo para clientes BROU! 35% de descuento en combustible en todas las estaciones ANCAP. Para activarlo hacé clic aquí, asociá tu tarjeta y validá con tu llave digital. ¡Solo hoy!"\n\n¿Qué hacés?',
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
    img: '<img src="/imgs/correo_uy.png" alt="Email falso Correo Uruguayo" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: '<strong style="color:#ef4444">⚠️ Phishing — Correo Uruguayo falso</strong><br><br>Los estafadores envían emails copiando el diseño oficial del <strong>Correo Uruguayo</strong> para cobrar un supuesto "gasto de envío" de un paquete pendiente.<br><br><strong style="color:#f59e0b">Cómo reconocer un email falso:</strong><br>• El dominio no termina en <strong>.gub.uy</strong><br>• Te piden datos de tarjeta para pagar<br>• Dice "paquete pendiente" sin que hayas pedido nada<br><br><strong style="color:#10b981">Ante cualquier duda, llamá al Correo: 2916 0010</strong>',
    stat: 'El phishing por email aumentó un 300% en Uruguay durante 2024-2025 según CERTuy.',
    src: 'CERTuy · Ministerio del Interior Uruguay 2025'
  },

  // ─── PREGUNTA 8: Premio falso Abitab ────────────────────
  {
    type: 'q',
    id: 8,
    cat: 'Premio falso',
    icon: '🎁',
    txt: '📧 Recibís este email:\n\n"¡Felicitaciones! Resultaste ganador de un viaje a Punta del Este sorteado por Abitab Fidelidad. Para reclamar el premio hacé clic en el link, ingresá tus datos personales y el número de tu tarjeta. ¡Tenés solo 24 horas o el premio se cancela!"\n\n¿Qué hacés?',
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
    img: '<img src="/imgs/cuento_tio_hombre.png" alt="Hombre estafado USD 18.000" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: '<strong style="color:#ef4444">⚠️ Caso real — Cuento del tío: USD 18.000 y $350.000</strong><br><br>Un hombre de 67 años fue engañado por alguien que se hizo pasar por su hijo. Le dijeron que había tenido un accidente grave y necesitaba dinero urgente. Perdió <strong>USD 18.000 y $350.000 pesos</strong>.<br><br><strong style="color:#f59e0b">Antes de mandar cualquier dinero:</strong><br>• Llamá directamente al número guardado de tu familiar<br>• Consultá con otro familiar de confianza lo que está pasando<br>• Llamá al <strong style="color:#00c8ff">911</strong> si sentís presión o amenazas<br><br><div style="margin-top:12px;padding:10px 14px;border-radius:10px;background:rgba(0,229,160,.07);border:1px solid rgba(0,229,160,.2);color:#00e5a0;font-size:.85rem">💬 Ante cualquier situación de urgencia con dinero, usá nuestro <strong>chat de Escudo Digital</strong> — te orientamos antes de que tomes cualquier decisión.</div>',
    stat: 'La mayoría de las víctimas del cuento del tío dicen que "la voz sonaba exactamente igual". Hoy la IA puede clonar cualquier voz con solo 3 segundos de audio.',
    src: 'El País Uruguay · 31 de mayo de 2026'
  },

  // ─── PREGUNTA 9: DOS hombres con uniforme IM ────────────
  {
    type: 'q',
    id: 9,
    cat: 'Persona en la puerta',
    icon: '🚪',
    txt: '🚪 Tocan el timbre. Abrís la puerta y hay DOS hombres con uniforme verde de la Intendencia de Montevideo. Con actitud seria dicen:\n\n"Buenas tardes. Somos inspectores municipales. Hay una inspección obligatoria por humedad en el edificio, es urgente. Necesitamos entrar ahora mismo a revisar su apartamento. El acceso es obligatorio por ordenanza."\n\n¿Qué hacés?',
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
    cat: 'Cuento del tío',
    icon: '🏦',
    txt: '🏦 Tocan el timbre. Un hombre con traje y maletín, muy formal, dice:\n\n"Buenas tardes. Soy representante del Banco República. Detectamos un movimiento sospechoso en su cuenta. Para proteger sus ahorros necesito que me entregue su llave digital y el CVV de su tarjeta. Es un trámite de seguridad urgente, si no lo hace ahora su cuenta queda bloqueada."\n\n¿Qué hacés?',
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
    img: '<img src="/imgs/manosdigital.png" alt="Curso inclusión digital personas mayores" style="width:100%;display:block;border-radius:12px 12px 0 0;object-fit:contain;max-height:160px;background:#0a1628;" />',
    txt: `<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><img src="/imgs/logo_im.png" alt="Intendencia Montevideo" style="height:32px;object-fit:contain" /><strong style="color:#10b981;font-size:1.05rem">Intendencia de Montevideo</strong></div><strong style="color:#10b981">🏛️ ¿Sabías que la IM tiene talleres GRATIS?</strong><br><br>La <strong>Intendencia de Montevideo</strong> tiene un Programa de Inclusión Digital especial para personas mayores donde podés aprender a usar el celular de forma segura, reconocer estafas y navegar internet con confianza.<br><br><strong style="color:#f59e0b">Son gratuitos, en tu barrio, y para todas las edades.</strong><br><br>Inscribite o consultá: <strong style="color:#10b981">montevideo.gub.uy/personas-mayores</strong><br>O llamá al <strong style="color:#8b7cf8">1950 5555</strong> (IM Adultos Mayores)<br><br><div style="margin-top:14px;padding:12px 14px;border-radius:12px;background:rgba(0,200,255,.07);border:1px solid rgba(0,200,255,.2)"><strong style="color:#00c8ff">🕵️ ¿Fuiste víctima de una estafa digital?</strong><br><br>Llamá al <strong style="color:#00c8ff;font-size:1.1rem">2030 4625</strong><br><span style="color:#8fa8cc;font-size:.85rem">Dirección General de Cibercrimen<br>Ministerio del Interior — Uruguay<br>Comisario Gral. Paulo Danilo Rocha Martínez</span></div>`,
    stat: 'Más de 2.000 personas mayores participaron en talleres de inclusión digital de la IM en 2024.',
    src: 'Intendencia de Montevideo · Programa de Inclusión Digital 2025'
  }

]
