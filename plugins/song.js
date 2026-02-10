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
                "❌ Give me a song name or YouTube link!\n\n" +
                "Example:\n.song faded\n.song https://youtu.be/xxxx"
            );
        }

        const query = args.join(" ");
        const start = Date.now();

        await conn.sendMessage(from, {
            react: { text: "🎵", key: mek.key }
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

                return reply("❌ No results found.");
            }

            videoUrl = searchRes.data.results[0].url;
        }

        // 🎵 Download MP3
        const apiUrl =
            `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.result?.mp3) {
            return reply("❌ Failed to fetch audio.");
        }

        const title = data.result.title || "YouTube Audio";
        const audioUrl = data.result.mp3;

        const speed = Date.now() - start;

        await reply(
            `🎵 *YouTube Audio Downloader*\n\n` +
            `📌 *Title:* ${title}\n` +
            `⚡ *Speed:* ${speed} ms\n\n` +
            `⬇️ Sending audio...`
        );

        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error while processing audio request.");
    }
});
