import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Ya estás registrado\n¿Quieres volver a registrarte? ${usedPrefix}unreg <NUMERO SERRIAL>`
  if (!Reg.test(text)) throw `Formato incorrecto\n*${usedPrefix}register nombre.edad*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'El nombre no puede estar vacío (alfanumérico)'
  if (!age) throw 'La edad no puede estar vacía (Número)'
  age = parseInt(age)
  if (age > 120) throw 'Demasiado viejo 😂'
  if (age < 16) throw 'Eres demasiado joven 😂'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
Registro completo!

╭─「 Info 」
│ Nombre: ${name}
│ Edad: ${age} Años 
╰────
Numero de serie: 
${sn}

> ${wm}
`.trim())
}

handler.help = ['reg', 'registrar'].map(v => v + ' <nombre>.<edad>')

handler.command = /^(registrar|reg(ister)?)$/i

export default handler