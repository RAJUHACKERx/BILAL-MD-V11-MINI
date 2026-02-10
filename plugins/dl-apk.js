const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "apk",
    alias: ["app"],
    react: "📲",
    desc: "Download APK from Aptoide",
    category: "📁 Download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    try {
        if (!q) return reply("❌ Please provide an app name!");

        // ⏳ loading reaction
        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        // 🔍 Search Aptoide
        const url =
            `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;

        const res = await axios.get(url);
        const app = res.data?.datalist?.list?.[0];

        if (!app || !app.file?.path) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });
            return reply("❌ App not found.");
        }

        const apkUrl = app.file.path;
        const appName = app.name || q;

        // 📦 Send APK
        await conn.sendMessage(from, {
            document: { url: apkUrl },
            mimetype: "application/vnd.android.package-archive",
            fileName: `${appName}.apk`,
            caption: `✅ APK downloaded\n📱 ${appName}`
        }, { quoted: mek });

        // ✅ success reaction
        await conn.sendMessage(from, {
            react: { text: '✅', key: m.key }
        });

    } catch (error) {
        console.error("Aptoide APK error:", error);

        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });

        reply("❌ Failed to fetch APK.");
    }
});
