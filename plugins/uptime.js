const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
    pattern: "uptime",
    alias: ["runtime", "status"],
    desc: "Live uptime monitor",
    category: "main",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {

    try {

        // start reaction
        await conn.sendMessage(from, {
            react: { text: "👑", key: m.key }
        });

        // initial message
        const msg = await conn.sendMessage(from, {
            text: "*TESTING....☺️*"
        }, { quoted: mek });

        await sleep(2000);

        // uptime formatter
        const format = (sec) => {
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = Math.floor(sec % 60);
            return `${h}ʜ ${m}ᴍ ${s}s`;
        };

        // 🔁 live update loop (30 sec — change if needed)
        for (let i = 0; i < 30; i++) {

            const uptime = format(process.uptime());

            await conn.relayMessage(from, {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: `*👑 UPTIME:❯ * ${uptime} 👑*`
                    }
                }
            }, {});

            await sleep(1000);
        }

        // end reaction
        await conn.sendMessage(from, {
            react: { text: "😍", key: m.key }
        });

    } catch (e) {

        console.error("Uptime error:", e);

        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });

        reply("❌ Failed to update uptime.");
    }
});
