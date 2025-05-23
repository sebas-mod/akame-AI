import { uploadPomf } from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadPomf(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`;
    const memeBuffer = await (await fetch(meme)).buffer();
    let stiker = await sticker(memeBuffer, undefined, global.stickpack, global.wm);
    if (stiker) await conn.sendFile(m.chat, stiker, '', m, '', { asSticker: 1 });
}

handler.help = ['smeme <teks atas>|<teks bawah>']
handler.tags = ['tools']
handler.command = /^(smeme)$/i

handler.register = true

export default handler