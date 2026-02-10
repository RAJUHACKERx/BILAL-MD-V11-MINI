const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "song",
    alias: ["audio", "mp3", "yta"],
    desc: "Download YouTube audio by name or link",
    category: "main",
    filename: __filename
}, async (conn, m, mek, { from, args, reply }) => {
    try {
        if (!args[0]) {
            return reply(
                "*AP NE KOI YOUTUBE AUDIO DOWNLOAD KARNA HAI 🤔*\n*TO AP ESE LIKHO 😊*\n\n*.AUDIO ❮AUDIO NAME❯* \n\n*JAB AP ESE LIKHO GE 🤗 TO APKI YOUTUBE AUDIO DOWNLOAD KAR KE 😃 YAHA PER BHEJ DE JAYE GA 😍♥️*\n\n" +
                "*👑 BILAL-MD WHATSAPP BOT 👑*"
            );
        }

        const query = args.join(" ");
        const start = Date.now();

        await conn.sendMessage(from, {
            react: { text: "🤗", key: mek.key }
        });

        let videoUrl = query;

        // 🔍 If not a link → search first
        if (!query.includes("youtube.com") && !query.includes("youtu.be")) {

            const searchUrl =
                `https://api.yupra.my.id/api/search/youtube?q=${encodeURIComponent(query)}`;

            const searchRes = await axios.get(searchUrl);

            if (!searchRes.data.status ||
                !searchRes.data.results ||
                searchRes.data.results.length === 0) {

                return reply("*APKA AUDIO NAHI MIL RAHA 😔*.");
            }

            videoUrl = searchRes.data.results[0].url;
        }

        // 🎵 Download MP3
        const apiUrl =
            `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.result?.mp3) {
            return reply("*APKA AUDIO NAHI MILA 😔*");
        }

        const title = data.result.title || "YouTube Audio";
        const audioUrl = data.result.mp3;

        const speed = Date.now() - start;

        await reply(
            `*👑 YT AUDIO INFO 👑*\n\n` +
            `*👑 AUDIO NAME 👑*\n ${title}\n` +
            `*👑 DOWNLOADING....*\n\n` +
            `*👑 BY :❯ BILAL-MD 👑*`
        );

        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("*APKA AUDIO NAHI MIL RAHA SORRY 😔*");
    }
});
