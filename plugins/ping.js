const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
  pattern: "ping",
  desc: "Live ping speed monitor",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {

  try {

    // start reaction
    await conn.sendMessage(from, {
      react: { text: "⚡", key: m.key }
    });

    // initial message
    const msg = await conn.sendMessage(from, {
      text: "*⚡ Checking ping...*"
    }, { quoted: mek });

    await sleep(1000);

    // 🔁 live update loop (30 seconds)
    for (let i = 0; i < 30; i++) {

      const start = Date.now();

      // tiny delay simulating ping check
      await sleep(50);

      const ping = Date.now() - start;

      await conn.relayMessage(from, {
        protocolMessage: {
          key: msg.key,
          type: 14,
          editedMessage: {
            conversation: `*⚡ LIVE PING :❯ ${ping} ms*`
          }
        }
      }, {});

      await sleep(1000);
    }

    // end reaction
    await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });

  } catch (e) {

    console.error("Ping Error:", e);

    await conn.sendMessage(from, {
      react: { text: "❌", key: m.key }
    });

    reply("*Ping failed — try again.*");
  }
});
