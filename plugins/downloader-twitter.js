import axios from 'axios'

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Proporcione un link de Twitter';
  const sender = m.sender.split('@')[0];
  const url = args[0];

let ouh = await fetch(`https://fastrestapis.fasturl.cloud/downup/twdown/simple?url=${url}`)
  let gyh = await ouh.json()

  m.reply(wait);
let textcap = `${gyh.result.desc}

> ${wm}`
await conn.sendMessage(
        m.chat,
        {
          video: { url: gyh.result.videohd },
          mimetype: 'video/mp4',
          fileName: 'video.mp4',
          caption: textcap,
          mentions: [m.sender],
        },
        { quoted: m }
      );

};

handler.help = ['twitter <url>'];
handler.tags = ['downloader'];
handler.command = /^(x|twt|twitter(dl)?)$/i;

export default handler
