export function getSmartReply(text) {
  var t = (text || '').toLowerCase();
  var nl = '\n';

  if (/hola|buenas|como est/.test(t)) {
    return '\u00a1Hola! Soy el asistente de seguridad digital de la Intendencia de Montevideo.' + nl + nl + 'Estoy ac\u00e1 para ayudarte. Cont\u00e1me si recibiste un mensaje raro, te llamaron del banco, o ten\u00e9s cualquier duda sobre estafas digitales.' + nl + nl + '\u00bfQu\u00e9 pas\u00f3?';
  }
  if (/sms|mensaje.*texto|link|enlace|sucive|multa/.test(t) || (t.indexOf('brou') >= 0 && t.indexOf('link') >= 0)) {
    return '\u00a1Eso es una estafa! Los bancos y el Estado NUNCA mandan links por SMS.' + nl + nl + 'Hac\u00e9 esto ahora:' + nl + '\u2022 NO hagas clic en ning\u00fan link' + nl + '\u2022 Borr\u00e1 el mensaje' + nl + '\u2022 Si ten\u00e9s dudas llam\u00e1 al BROU: 1722 0001' + nl + nl + 'El BROU real siempre usa brou.com.uy. Cualquier otro dominio es falso.';
  }
  if (/llam.*(banco|brou|santander)|banco.*llam|vishing/.test(t)) {
    return 'Eso es vishing: una llamada falsa del banco.' + nl + nl + 'Regla de oro: Ning\u00fan banco llama para pedirte tu clave. Nunca.' + nl + nl + 'Qu\u00e9 hac\u00e9s:' + nl + '\u2022 Colg\u00e1 de inmediato' + nl + '\u2022 Llam\u00e1 vos al BROU: 1722 0001' + nl + '\u2022 Nunca digas tu clave por tel\u00e9fono' + nl + nl + '\u00bfTe pidieron datos en esa llamada?';
  }
  if (/estaf|me rob|perdi plata|perd\u00ed|transfer.*hicieron|me hacke/.test(t)) {
    return '\u00a1Tranquilo/a, pod\u00e9s actuar ahora!' + nl + nl + 'Hac\u00e9 esto YA:' + nl + '1. Llam\u00e1 al banco: BROU 1722 0001 (24hs)' + nl + '2. Llam\u00e1 al CERTuy: 1719' + nl + '3. Si diste acceso al celular: apag\u00e1lo ahora' + nl + '4. Den\u00fanci\u00e1 en denuncias.minterior.gub.uy' + nl + '5. Avis\u00e1le a un familiar';
  }
  if (/whatsapp|codigo.*6|clonaron|robaron.*cuenta/.test(t)) {
    return 'Eso es el robo de cuenta de WhatsApp, muy com\u00fan en Uruguay.' + nl + nl + 'El c\u00f3digo de 6 d\u00edgitos es la llave de tu cuenta. Si lo das, el estafador toma el control y le pide dinero a tus contactos.' + nl + nl + 'NUNCA compartas ese c\u00f3digo con nadie.' + nl + nl + 'Para protegerte: Ajustes > Cuenta > Verificaci\u00f3n en dos pasos > Activar' + nl + 'Si ya te robaron la cuenta, llam\u00e1 al CERTuy: 1719';
  }
  if (/antel|soporte.*tecnico|virus|anydesk|teamviewer|acceso.*remoto/.test(t)) {
    return 'Eso es la estafa del soporte t\u00e9cnico falso, muy peligrosa.' + nl + nl + 'Antel y ninguna empresa llama para decirte que ten\u00e9s un virus.' + nl + nl + 'Si ya le diste acceso:' + nl + '\u2022 Apag\u00e1 el celular ahora mismo' + nl + '\u2022 Llam\u00e1 al CERTuy: 1719' + nl + '\u2022 Cambi\u00e1 todas tus claves desde otro dispositivo' + nl + nl + 'Si todav\u00eda no le diste acceso: colg\u00e1 y listo.';
  }
  if (/facebook|instagram|inversion|dolares|cripto|ganar.*plata/.test(t)) {
    return 'Eso suena a la estafa de inversi\u00f3n garantizada.' + nl + nl + 'Se\u00f1ales cl\u00e1sicas:' + nl + '\u2022 Perfil nuevo con "oportunidad \u00fanica"' + nl + '\u2022 Prometen ganancias r\u00e1pidas y seguras' + nl + '\u2022 Piden que env\u00edes dinero o datos' + nl + nl + 'No existe inversi\u00f3n que garantice ganancias. Es una trampa.' + nl + 'Si ya enviaste plata, llam\u00e1 al CERTuy: 1719.';
  }
  if (/contrase|clave|password|2fa|dos pasos|verificacion/.test(t)) {
    return 'Excelente que pienses en protegerte.' + nl + nl + 'Para WhatsApp: Ajustes > Cuenta > Verificaci\u00f3n en dos pasos > Activar' + nl + nl + 'Para tus claves:' + nl + '\u2022 Nunca uses la misma clave en varios servicios' + nl + '\u2022 No compartas claves con nadie, ni con el banco' + nl + '\u2022 No las guardes en el navegador del celular';
  }
  if (/mayor|abuela|abuelo|familiar|mama|papa|prot.*familiar/.test(t)) {
    return 'Qu\u00e9 bueno que penses en proteger a tus seres queridos.' + nl + nl + 'Lo m\u00e1s importante:' + nl + '\u2022 Nunca dar datos por tel\u00e9fono ni hacer clic en links' + nl + '\u2022 Guardar juntos: BROU 1722 0001, CERTuy 1719, Polic\u00eda 911' + nl + '\u2022 Activar verificaci\u00f3n en dos pasos en WhatsApp' + nl + nl + 'La Intendencia tiene talleres gratuitos. Llam\u00e1 al 1950 int. 4110.';
  }
  if (/numero|n\u00famero|llamar|contacto|denunci|emergencia/.test(t)) {
    return 'N\u00fameros importantes:' + nl + nl + 'CERTuy (incidentes): 1719 (24hs)' + nl + 'BROU (bloquear cuenta): 1722 0001 (24hs)' + nl + 'Polic\u00eda: 911' + nl + 'Min. Interior: 0800 5050' + nl + 'Denuncias: denuncias.minterior.gub.uy' + nl + nl + 'Intendencia de Montevideo:' + nl + 'Tel\u00e9fono: 1950 5555 (L-V 8-19, S\u00e1b 8-14)' + nl + 'WhatsApp: 099 019 500 (escrib\u00ed "mayores")';
  }
  if (/gracias|ok|entend|perfecto/.test(t)) {
    return 'De nada! Para eso estoy ac\u00e1.' + nl + nl + 'Ante cualquier cosa sospechosa, siempre mejor no hacer nada y consultar primero.' + nl + nl + '\u00bfAlgo m\u00e1s en lo que te pueda ayudar?';
  }
  return '\u00a1Hola! Estoy ac\u00e1 para ayudarte.' + nl + nl + 'Pod\u00e9s preguntarme sobre:' + nl + '\u2022 SMS o emails sospechosos' + nl + '\u2022 Llamadas del banco' + nl + '\u2022 C\u00f3mo proteger tu WhatsApp' + nl + '\u2022 Qu\u00e9 hacer si te estafaron' + nl + '\u2022 N\u00fameros de emergencia' + nl + nl + '\u00bfQu\u00e9 necesit\u00e1s?';
}