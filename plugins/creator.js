let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
  let name = await conn.getName(who)

  // Enviar contactos del dueño y del bot
  const sentMsg = await conn.sendContactArray(m.chat, [
    [
      `${nomorown}`,
      `${await conn.getName(nomorown + '@s.whatsapp.net')}`,
      '💌 Desarrollador del Bot',
      'No famoso',
      'sebasmd@gmail.com',
      '🇦🇷 Argentina',
      '📍 https://www.sebasmd.com',
      '👤 Dueño Sebas-MD'
    ],
    [
      `${conn.user.jid.split('@')[0]}`,
      `${await conn.getName(conn.user.jid)}`,
      '🎈 Bot de WhatsApp',
      '📵 No hagas spam',
      'botsebasmd@gmail.com',
      '🇦🇷 Argentina',
      '📍 https://github.com/SebasMD/Bot-MD',
      'Solo un bot que a veces falla ☺'
    ]
  ], fkontak)

  // Mensaje final mencionando al usuario
  await conn.reply(
    m.chat,
    `Hola @${m.sender.split('@')[0]}, este es el contacto de mi creador: *Sebas-MD*.\n\nPor favor, sé respetuoso si decides escribirle.\n*El spam resultará en un bloqueo automático.*`,
    m,
    { mentions: [m.sender] }
  )
}

handler.help = ['owner', 'creator']
handler.tags = ['main', 'info']
handler.command = /^(owner|creator)/i
export default handler
