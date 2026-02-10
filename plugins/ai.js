const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "yupra",
    alias: ["gpt5", "smartai"],
    desc: "Chat with Yupra GPT-5 AI",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { q, reply, react }) => {
    try {
        if (!q) {
            return reply("Example:\n.yupra Hello");
        }

        const apiUrl = `https://api.yupra.my.id/api/ai/gpt5?text=${encodeURIComponent(q)}`;

        const { data } = await axios.get(apiUrl, {
            timeout: 30000
        });

        console.log("YUPRA RAW:", data);

        if (!data || !data.result) {
            await react("❌");
            return reply("AI did not return a response.");
        }

        await reply(`🤖 *GPT-5 Smart:*\n\n${data.result}`);
        await react("✅");

    } catch (err) {
        console.error("Yupra AI error:", err);
        await react("❌");
        reply("Failed to reach Yupra AI.");
    }
});
