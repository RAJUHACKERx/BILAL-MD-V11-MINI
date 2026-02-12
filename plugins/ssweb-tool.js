// code by ⿻ ⌜ ɪᴍᴍᴜ ⌟⿻⃮͛🇵🇰𖤐

const axios = require("axios");
const { cmd } = require("../command");
const { sleep } = require('../lib/functions');

cmd({
  pattern: "screenshot",
  react: "🌐",
  alias: ["ss", "ssweb"],
  desc: "Capture a full-page screenshot of a website.",
  category: "utility",
  use: ".screenshot <url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const url = args[0];
    if (!url) return reply("*APKO KISI WEBSITE KA SCREENSHOT DEKHNA HAI 🤔 TO AP US WEBSITE KA LINK COPY KAR LO 🤗*\n*PHIR ESE LIKHO ☺️*\n\n*SS ❮WEBSITE LINK❯*\n\n*JAB AP ESE LIKHO GE 😊 TO US WEBSITE KA SCREENSHOT LE KAR 😃 YAHA PER SEND KIA JAYE GA 😍♥️*");
    if (!url.startsWith("http")) return reply("*SIRF WEBSITE KA LINK LIKHO 🤗*\n*JESE.....*\n\n*.SS https://github.com/BILALTECH05/BILAL-MD*");

    // ASCII loading bars with percentage
    const loadingBars = [
        { percent: 10, bar: "*[▓░░░░░░░░░]*", text: "*✦ INITIALIZING CAPTURE.....*" },
        { percent: 20, bar: "*[▓▓░░░░░░░░]*", text: "*✦ ONNECTING TO WEBSITE.....*" },
        { percent: 30, bar: "*[▓▓▓░░░░░░░]*", text: "*✦ LOADING PAGE VIEW.....* " },
        { percent: 40, bar: "*[▓▓▓▓░░░░░░]*", text: "*✦ TESTING ELEMENTS.....*" },
        { percent: 50, bar: "*[▓▓▓▓▓░░░░░]*", text: "*✦ PROCESSING PAGE.....*" },
        { percent: 60, bar: "*[▓▓▓▓▓▓░░░░]*", text: "*✦ CHECKING PAGE.....*" },
        { percent: 70, bar: "*[▓▓▓▓▓▓▓░░░]*", text: "*✦ REDIRECTING SCREENSHOT...*" },
        { percent: 80, bar: "*[▓▓▓▓▓▓▓▓░░]*", text: "*✦ REPLACING.....*" },
        { percent: 90, bar: "*[▓▓▓▓▓▓▓▓▓░]*", text: "*✦ SENDING SCREENSHOT.....*" },
        { percent: 100, bar: "*[▓▓▓▓▓▓▓▓▓▓]*", text: "*SUCCESSFUL*" }
    ];

    // Send initial message
    const loadingMsg = await conn.sendMessage(from, {
        text: "*APNI WEBSITE KA SCREENSHOT DEKHE JIS KA LINK AP NE LIKHA THA 🤗*"
    }, { quoted: mek });

    // Animate loading progress
    for (const frame of loadingBars) {
        await sleep(800);
        await conn.relayMessage(from, {
            protocolMessage: {
                key: loadingMsg.key,
                type: 14,
                editedMessage: {
                    conversation: `📸 ${frame.bar} ${frame.percent}%\n${frame.text}`
                }
            }
        }, {});
    }

    // Final update before sending
    await sleep(800);
    await conn.relayMessage(from, {
        protocolMessage: {
            key: loadingMsg.key,
            type: 14,
            editedMessage: {
                conversation: "*SCREENSHOT SENDED ✅*"
            }
        }
    }, {});

    await sleep(1000);

    // Send the actual screenshot
    await conn.sendMessage(from, {
        image: { url: `https://image.thum.io/get/fullpage/${url}` },
        caption: "*👑 SCREENSHOT BY 👑*\n\n" +
                "*👑 BILAL-MD WHATSAPP BOT 👑*"
    }, { quoted: mek });

  } catch (error) {
    console.error("Error:", error);
    reply("*DUBARA KOSHISH KARE 🤗*");
  }
});

// ⿻ ⌜ popkid ⌟⿻⃮͛𖤐
