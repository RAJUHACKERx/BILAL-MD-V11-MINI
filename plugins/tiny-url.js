const { cmd } = require("../command");
const fetch = require("node-fetch");
const axios = require("axios");

cmd({
    pattern: "tiny",
    alias: ['short', 'shorturl'],
    react: "✨",
    desc: "Makes URL tiny.",
    category: "convert",
    use: "<url>",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply, args }) => {
    console.log("Command tiny triggered"); // Ajoutez ceci pour vérifier si la commande est déclenchée

    if (!args[0]) {
        console.log("No URL provided"); // Ajoutez ceci pour vérifier si l'URL est fournie
        return reply("*APKE PAS KOI WEBSITE KA BARA LINK HAI 🤔 AUR AP NE USE CHOTA KARNA HAI 😊*\n*TO AP ESE LIKHO ☺️*\n*.TINY ❮WEBSITE BIG LINK❯*\n\n*JAB AP ESE LIKHO GE 🤗 TO APKA WEBSITE KA BARA LINK 😃 CHOTA KR KE YAHA PER BHEJ DE GE 😍*");
    }

    try {
        const link = args[0];
        console.log("URL to shorten:", link); // Ajoutez ceci pour vérifier l'URL fournie
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
        const shortenedUrl = response.data;

        console.log("Shortened URL:", shortenedUrl); // Ajoutez ceci pour vérifier l'URL raccourcie
        return reply(`*APKI WEBSITE KA BARA LINK CHOTA HO GAYA 😍*\n\n${shortenedUrl}\n\n*👑 BY :❯ BILAL-MD 👑*`);
    } catch (e) {
        console.error("*LINK CHOTA NAHI BAN RHA 😔:*", e);
        return reply("*THORI DER BAD KOSHISH KARE 🤗*.");
    }
});
