import axios from 'axios'
import fetch from "node-fetch"

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Uso: ${usedPrefix + command} <url>`

    let url = args[0]

    m.reply(wait)

        let response = await fetch(`https://fastrestapis.fasturl.cloud/downup/spotifydown?url=${encodeURIComponent(url)}`)
         let gyh = await response.json()
         let data = gyh.result

                // Jika URL yang diberikan adalah track tunggal
                let { title, artists, album, cover, releaseDate } = data.metadata
                let link = data.link  // Mengambil link dari response utama

                // Mengirim file audio sebagai dokumen
                await conn.sendMessage(m.chat, {
                    document: { url: link }, // Buffer langsung dimasukkan di sini
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`,
                    caption: `
*Título:* ${title}
*Artista:* ${artists}
*Album:* ${album}
*Publicado:* ${releaseDate}

> ${wm}
                    `,
                }, { quoted: m })
}

handler.help = ['spotify <link>']
handler.tags = ['downloader']
handler.command = /^(spotify(dl)?)$/i

export default handler
