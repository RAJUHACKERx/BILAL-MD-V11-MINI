const config = require('../config');
const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: 'fb',
  desc: 'Download Facebook videos',
  category: 'downloader',
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    if (!args[0]) {
      return reply('*AP NE KOI FACEBOOK VIDEO DOWNLOAD KARNI HAI 🤔 TO AP US FACEBOOK VIDEO KA LINK COPY KAR LO 🤗*\n*PHOR ESE LIKHO ☺️*\n\n*FB ❮FACEBOOK VIDEO LINK❯*\n\n*JAB AP ESE LIKHO GE 😊 TO APKI FACEBOOK VIDEO DOWNLOAD KAR KE 😃 YAHA PER BHEJ DE JAYE GE 😍♥️*');
    }

    const fbUrl = args[0];
    const api = `https://apis-starlights-team.koyeb.app/starlight/facebook?url=${encodeURIComponent(fbUrl)}`;

    await conn.sendMessage(from, {
      react: { text: '😃', key: mek.key }
    });

    const { data } = await axios.get(api);

    if (!data || !data.url) {
      return reply('*APKI FACEBOOK VIDEO NAHI MIL RAHI 😔*');
    }

    const caption = `
*👑 FB INFO 👑*
*👑 VIDEO NAME 👑*
${data.title || 'Facebook Video'}

*👑 CREATER NAME 👑*
${data.creator || 'Unknown'}


*👑 BY :❯ BILAL-MD 👑*
    `.trim();

    await conn.sendMessage(from, {
      video: { url: data.url },
      caption,
      contextInfo: {
        forwardingScore: 5,
        isForwarded: true,
        externalAdReply: {
          title: data.title || 'PROUD TO PAKISTAN 🇵🇰',
          body: 'MADE BY BILAL',
          thumbnailUrl: data.thumbnail || undefined,
          sourceUrl: fbUrl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: mek });

    await conn.sendMessage(from, {
      react: { text: '🤗', key: mek.key }
    });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
