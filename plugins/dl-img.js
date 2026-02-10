const { cmd } = require("../command");
const axios = require("axios");

const UNSPLASH_API_KEY = "TKwNF_gHeB4Z6ieR6sV_Q8gIkQW_VFOcmiNfD0AX0uM"; // Your Access Key

cmd({
    pattern: "img",
    alias: ["image", "searchimg", "photo"],
    react: "🤗",
    desc: "Search and download images from Unsplash",
    category: "fun",
    use: ".img <keywords> [number_of_images]",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        if (!args.length) 
            return reply("*AP NE KOI PHOTO DOWNLOAD KARNI HAI 🤔*\n*TO AP ESE LIKHO ☺️*\n\n*.IMG ❮PHOTO NAME❯*\n\n*JAB AP ESE LIKHO GE 🤗 TO APKI PHOTOS DOWNLOAD KAR KE 😃 YAHA PER BHEJ DE JAYE GE 😍*");

        // Determine count of images
        let count = parseInt(args[args.length - 1]);
        if (isNaN(count)) count = 3; // Default 3 images

        const query = args.slice(0, isNaN(args[args.length - 1]) ? args.length : -1).join(" ");

        await reply(`*DOWNLOADING :❯ "${query}"...*`);

        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_API_KEY}`;
        const { data } = await axios.get(url);

        if (!data.results || !data.results.length) 
            return reply("*PHOTOS NAHI MIL RAHI SORRY 😔*");

        // Randomize results
        const selectedImages = data.results.sort(() => 0.5 - Math.random()).slice(0, count);

        for (const image of selectedImages) {
            await conn.sendMessage(
                from,
                {
                    image: { url: image.urls.regular },
                    caption: `*👑 BY :❯ BILAL-MD 👑*`
                },
                { quoted: mek }
            );
            await new Promise(resolve => setTimeout(resolve, 1000)); // Avoid rate limit
        }

    } catch (error) {
        console.error("Image Search Error:", error);
        reply(`❌ Error fetching images: ${error.message || "Unknown error"}`);
    }
});
