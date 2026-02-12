const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "getimg",
    alias: [
        "tophoto",
        "url2image",
        "urltoimage",
        "getimage",
        "getphoto",
        "imagefromurl",
        "fetchimage"
    ],
    desc: "Convert image URL to WhatsApp image",
    category: "media",
    react: "🤗",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    try {
        if (!text) return reply('*ESE LIKHO JO IMAGE APKO CHAHYE*\n\n*.GETIMAGE ❮ IMAGE LINK❯*\n\n*JAB AP ESE LIKHO GE 😊 TO LINK WALA PHOTO SEND KIA JAYE GA 😍♥️*');

        const imageUrl = text.trim();

        // Validate URL
        if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
            return reply('*LINK SIRF IMAGE KA HONA CHAHYE 🤗*\n*JESE....☺️*\n\n*.GETIMG https://i.ibb.co/Df7tp9nn/bilal-owner-pic.jpg*');
        }

        // Verify the image exists
        try {
            const response = await axios.head(imageUrl);
            if (!response.headers['content-type']?.startsWith('image/')) {
                return reply('*KISI PHOTO KA LINK LIKHO 🤗*');
            }
        } catch (e) {
            return reply('*DUBARA KOSHISH KARE 🤗*');
        }

        // Send the image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: '*APKI LINK WALI PHOTO YEH HAI 🤗*\n*👑 BY :❯ BILAL-MD 👑*'
        }, { quoted: mek });

    } catch (error) {
        console.error('GetImage Error:', error);
        reply('❌ DUBARA KOSHISH KARE 🤗*: ' + error.message);
    }
});
