const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "apk",
    alias: ["app"],
    react: "♥️",
    desc: "Download APK from Aptoide",
    category: "📁 Download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    try {
        if (!q) return reply("*AP NE KOI APP DOWNLOAD KARNI HAI 🤔*\n TO ESE LIKHO ☺️*\n\n*.APP ❮APP NAME❯*\n\n*JAB AP ESE LIKHO GE 🤗 TO APKI APP DOWNLOAD KAR KE 😃 YAHA PER BHEJ DE JAYE GE 😍♥️*");

        // ⏳ loading reaction
        await conn.sendMessage(from, {
            react: { text: '😃', key: m.key }
        });

        // 🔍 Search Aptoide
        const url =
            `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;

        const res = await axios.get(url);
        const app = res.data?.datalist?.list?.[0];

        if (!app || !app.file?.path) {
            await conn.sendMessage(from, {
                react: { text: '😔', key: m.key }
            });
            return reply("*APP NAHI MILI 😔*");
        }

        const apkUrl = app.file.path;
        const appName = app.name || q;

        // 📦 Send APK
        await conn.sendMessage(from, {
            document: { url: apkUrl },
            mimetype: "application/vnd.android.package-archive",
            fileName: `${appName}.apk`,
            caption: `*👑 APP NAME 👑*\n📱 ${appName}\n\n*👑 BY :❯ BILAL-MD 👑*`
        }, { quoted: mek });

        // ✅ success reaction
        await conn.sendMessage(from, {
            react: { text: '🤗', key: m.key }
        });

    } catch (error) {
        console.error("*APP DOWNLOAD NAHI HO RAHI 😔 SORRY*:", error);

        await conn.sendMessage(from, {
            react: { text: '😔', key: m.key }
        });

        reply("❌ Failed to fetch APK.");
    }
});
